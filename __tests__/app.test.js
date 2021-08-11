const request = require("supertest");
const db = require("../db/connection.js");
const testData = require("../db/data/test-data/index.js");
const seed = require("../db/seeds/seed.js");
const app = require("../app");
require("jest-sorted"); // it allow to test something that has been sorted/ordered.

beforeEach(() => seed(testData));
afterAll(() => db.end());

describe("GET/api/categories", () => {
  it("should return status 200 , showing all categories", () => {
    return request(app)
      .get("/api/categories")
      .expect(200)
      .then(({ body }) => {
        //console.log(body)
        expect(body.categories).not.toHaveLength(0);
        body.categories.forEach((category) => {
          expect(category).toMatchObject({
            slug: expect.any(String),
            description: expect.any(String),
          });
        });
      });
  });
});

describe("GET/api/reviews", () => {
  it("should return status 200 , showing all reviews ", () => {
    return request(app)
      .get("/api/reviews")
      .expect(200)
      .then(({ body }) => {
        //console.log(body);
        expect(body.reviews).not.toHaveLength(0);
        body.reviews.forEach((review) => {
          expect(review).toMatchObject({
            review_id: expect.any(Number),
            title: expect.any(String),
            review_body: expect.any(String),
            designer: expect.any(String),
            review_img_url: expect.any(String),
            votes: expect.any(Number),
            category: expect.any(String),
            owner: expect.any(String),
          });
        });
      });
  });
  describe("GET/api/reviews sorted_by /order / category", () => {
    describe("sorted_by", () => {
      it('should sorted by any valid column with a default by "created_at".', () => {
        return request(app)
          .get("/api/reviews?sorted_by=votes")
          .expect(200)
          .then(({ body }) => {
            //console.log(body.reviews);
            expect(body.reviews).toBeSortedBy("votes", {
              descending: true,
            });
          });
      });
      it('should return a 400 and msg "Bad request: Invalid sort query" if wrong query input for sorted_by', () => {
        return request(app)
          .get("/api/reviews?sorted_by=whatever")
          .expect(400)
          .then(({ body }) => {
            expect(body.msg).toBe("Bad request: Invalid sort query");
          });
      });
    });
    describe("order", () => {
      it("should order by ascending or descending and defaults to descending", () => {
        return request(app)
          .get("/api/reviews?order=asc")
          .expect(200)
          .then(({ body }) => {
            //console.log(body.reviews);
            expect(body.reviews).toBeSortedBy("created_at", {
              ascending: true,
            });
          });
      });
      it('should return a 400 and msg "Bad request: Invalid order query" if wrong query input for sorted_by', () => {
        return request(app)
          .get("/api/reviews?order=whatever")
          .expect(400)
          .then(({ body }) => {
            expect(body.msg).toBe("Bad request: Invalid order query");
          });
      });
    });
    describe("filtered by category", () => {
      it("should filtered by category", () => {
        return request(app)
          .get("/api/reviews?category=dexterity")
          .expect(200)
          .then(({ body }) => {
            //console.log(body.reviews);
            body.reviews.forEach((object) => {
              expect(object.category).toBe("dexterity");
            });
          });
      });
      it('should return a 400 and msg "Bad request: Invalid category query" if wrong query input for sorted_by', () => {
        return request(app)
          .get("/api/reviews?category=whatever")
          .expect(400)
          .then(({ body }) => {
            expect(body.msg).toBe("Bad request: Invalid category query");
          });
      });
    });
  });
});

describe("GET/api/reviews/:review_id", () => {
  it("should return 200, showing the review requested by id", () => {
    return request(app)
      .get("/api/reviews/2")
      .expect(200)
      .then(({ body }) => {
        expect(body.review).toMatchObject({
          review_id: 2,
          title: expect.any(String),
          review_body: expect.any(String),
          designer: expect.any(String),
          review_img_url: expect.any(String),
          votes: expect.any(Number),
          category: expect.any(String),
          owner: expect.any(String),
        });
      });
  });
  it("should return 404, if review requested by id does not exist ", () => {
    return request(app)
      .get("/api/reviews/2000")
      .expect(404)
      .then(({ body }) => {
        //console.log(body);
        expect(body.msg).toBe("Not found: id number does not exist");
      });
  });
  it("return 400, if review_id is not a number", () => {
    return request(app)
      .get("/api/reviews/whatever")
      .expect(400)
      .then(({ body }) => {
        expect(body.msg).toBe("Bad request: wrong type value");
      });
  });
});
describe("GET/api/reviews/:review_id/comments", () => {
  it("should an array of comments for the given `review_id`", () => {
    return request(app)
      .get("/api/reviews/2/comments")
      .expect(200)
      .then(({ body }) => {
        //console.log(body.comments, "<= TEST");
        body.comments.forEach((object) => {
          expect(object).toMatchObject({
            review_id: 2,
            comment_id: expect.any(Number),
            votes: expect.any(Number),
            author: expect.any(String),
            body: expect.any(String),
          });
        });
      });
  });
  it("return 400, if review_id is not a number", () => {
    return request(app)
      .get("/api/reviews/whatever/comments")
      .expect(400)
      .then(({ body }) => {
        expect(body.msg).toBe("Bad request: check your query");
      });
  });
  it("return 404, if review_id does not exist", () => {
    return request(app)
      .get("/api/reviews/9999/comments")
      .expect(404)
      .then(({ body }) => {
        expect(body.msg).toBe("Not found: id number does not exist");
      });
  });
});
describe("POST/api/reviews/:reviews_id/comments", () => {
  it("should post a new comment to the given id review with a 201 status code", () => {
    return request(app)
      .post("/api/reviews/2/comments")
      .send({
        username: `bainesface`,
        body: `better than playing lego for sure!`,
      })
      .expect(201)
      .then(({ body }) => {
        console.log(body, "<-- body");
        expect(body.newComment).toEqual({
          comment_id: 7,
          author: "bainesface",
          review_id: 2,
          votes: 0,
          created_at: expect.any(String),
          body: "better than playing lego for sure!",
        });
      });
  });
  it("should return a 400 and msg:Bad request: incomplete data", () => {
    return request(app)
      .post("/api/reviews/2/comments")
      .send({ username: `bainesface` })
      .expect(400)
      .then(({ body }) => {
        expect(body.msg).toBe("Bad request: incomplete data");
      });
  });
  it("should return a 400 and msg:Bad request: invalid data", () => {
    return request(app)
      .post("/api/reviews/2/comments")
      .send({
        username: `bob the builder`,
        body: `better than playing lego for sure!`,
      })
      .expect(400)
      .then(({ body }) => {
        expect(body.msg).toBe("Bad request: invalid data");
      });
  });
  it("should return a 400 and msg:Bad request: invalid data", () => {
    return request(app)
      .post("/api/reviews/2/comments")
      .send({
        username: `bob the builder`,
        body: `better than playing lego for sure!`,
      })
      .expect(400)
      .then(({ body }) => {
        expect(body.msg).toBe("Bad request: invalid data");
      });
  });
  it("should return a 400 and msg:Bad request: wrong type value", () => {
    return request(app)
      .post("/api/reviews/whatever/comments")
      .send({
        username: `bainesface`,
        body: `better than playing lego for sure!`,
      })
      .expect(400)
      .then(({ body }) => {
        expect(body.msg).toBe("Bad request: wrong type value");
      });
  });
  it("should return a 400 and msg:Bad request: Bad request: invalid data", () => {
    return request(app)
      .post("/api/reviews/9999/comments")
      .send({
        username: `bainesface`,
        body: `better than playing lego for sure!`,
      })
      .expect(400)
      .then(({ body }) => {
        expect(body.msg).toBe("Bad request: invalid data");
      });
  });
});
