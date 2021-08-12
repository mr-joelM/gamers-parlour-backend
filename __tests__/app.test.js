const request = require("supertest");
const db = require("../db/connection.js");
const testData = require("../db/data/test-data/index.js");
const seed = require("../db/seeds/seed.js");
const app = require("../app");
require("jest-sorted"); // it allow to test something that has been sorted/ordered.

beforeEach(() => seed(testData));
afterAll(() => db.end());

describe("Get/api", () => {
  it("should return a list of all endpoints", () => {
    return request(app)
      .get("/api")
      .expect(200)
      .then(({ body }) => {
        expect(body).toEqual({
          "GET /api": {
            description:
              "serves up a json representation of all the available endpoints of the api",
          },
          "GET /api/categories": {
            description: "serves an array of all categories",
            queries: [],
            exampleResponse: {
              categories: [
                {
                  description:
                    "Players attempt to uncover each other's hidden role",
                  slug: "Social deduction",
                },
              ],
            },
          },
          "GET /api/reviews": {
            description: "serves an array of all reviews",
            queries: ["category", "sort_by", "order"],
            exampleResponse: {
              reviews: [
                {
                  title: "One Night Ultimate Werewolf",
                  designer: "Akihisa Okui",
                  owner: "happyamy2016",
                  review_img_url:
                    "https://images.pexels.com/photos/5350049/pexels-photo-5350049.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
                  category: "hidden-roles",
                  created_at: 1610964101251,
                  votes: 5,
                },
              ],
            },
          },
        });
      });
  });
});

describe("categories", () => {
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
});

describe("reviews", () => {
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
          //console.log(body.review);
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
          expect(body.msg).toBe("Not found: review id not found");
        });
    });
    it("return 404, if review_id is not a number", () => {
      return request(app)
        .get("/api/reviews/whatever")
        .expect(404)
        .then(({ body }) => {
          expect(body.msg).toBe("Not found: review id not found");
        });
    });
  });

  describe("PATCH/api/reviews/:review_id", () => {
    it("should return a 200 and should increment the current review's vote property by 1", () => {
      return request(app)
        .patch("/api/reviews/2")
        .send({ inc_votes: 1 })
        .expect(200)
        .then(({ body }) => {
          //console.log(body.updatedVote, "body");
          expect(body.updatedVote).toEqual({
            review_id: 2,
            title: "Jenga",
            review_body: "Fiddly fun for all the family",
            designer: "Leslie Scott",
            review_img_url:
              "https://www.golenbock.com/wp-content/uploads/2015/01/placeholder-user.png",
            votes: 6,
            category: "dexterity",
            owner: "philippaclaire9",
            created_at: "2021-01-18T10:01:41.251Z",
          });
        });
    });
    it("should return a 200 and should decrement the current review's vote property by 3", () => {
      return request(app)
        .patch("/api/reviews/2")
        .send({ inc_votes: -3 })
        .expect(200)
        .then(({ body }) => {
          //console.log(body.updatedVote, "body");
          expect(body.updatedVote).toEqual({
            review_id: 2,
            title: "Jenga",
            review_body: "Fiddly fun for all the family",
            designer: "Leslie Scott",
            review_img_url:
              "https://www.golenbock.com/wp-content/uploads/2015/01/placeholder-user.png",
            votes: 2,
            category: "dexterity",
            owner: "philippaclaire9",
            created_at: "2021-01-18T10:01:41.251Z",
          });
        });
    });
    it("should return a 400 and error message if inc_votes is not a number", () => {
      return request(app)
        .patch("/api/reviews/2")
        .send({ inc_votes: "whatever" })
        .expect(400)
        .then(({ body }) => {
          //console.log(body.msg, "body.msg");
          expect(body.msg).toBe("Bad request: wrong type value");
        });
    });
    it("should return a 404 and error message if review_id is not a number", () => {
      return request(app)
        .patch("/api/reviews/whatever")
        .send({ inc_votes: 1 })
        .expect(404)
        .then(({ body }) => {
          //console.log(body.msg, "body.msg");
          expect(body.msg).toBe("Not found: review id not found");
        });
    });
    it("should return a 404 and error message if review_id is not found", () => {
      return request(app)
        .patch("/api/reviews/99999")
        .send({ inc_votes: 1 })
        .expect(404)
        .then(({ body }) => {
          //console.log(body, "body");
          expect(body.msg).toBe("Not found: review id not found");
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
    it("return 404, if review_id is not a number", () => {
      return request(app)
        .get("/api/reviews/whatever/comments")
        .expect(404)
        .then(({ body }) => {
          expect(body.msg).toBe("Not found: review id not found");
        });
    });
    it("return 404, if review_id does not exist", () => {
      return request(app)
        .get("/api/reviews/9999/comments")
        .expect(404)
        .then(({ body }) => {
          expect(body.msg).toBe("Not found: review id not found");
        });
    });
  });

  describe.only("POST/api/reviews/:reviews_id/comments", () => {
    it("should post a new comment to the given id review with a 201 status code", () => {
      return request(app)
        .post("/api/reviews/2/comments")
        .send({
          username: `bainesface`,
          body: `better than playing lego for sure!`,
        })
        .expect(201)
        .then(({ body }) => {
          //console.log(body, "<-- body");
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
    it("should return a 404 if id is not a number", () => {
      return request(app)
        .post("/api/reviews/whatever/comments")
        .send({
          username: `bainesface`,
          body: `better than playing lego for sure!`,
        })
        .expect(404)
        .then(({ body }) => {
          expect(body.msg).toBe("Not found: review id not found");
        });
    });
    it("should return a 404 if id does not exist", () => {
      return request(app)
        .post("/api/reviews/9999/comments")
        .send({
          username: `bainesface`,
          body: `better than playing lego for sure!`,
        })
        .expect(404)
        .then(({ body }) => {
          expect(body.msg).toBe("Not found: review id not found");
        });
    });
  });
});

describe("users", () => {
  describe("GET/api/users", () => {
    it("should return status 200 an array of object with all users username", () => {
      return request(app)
        .get("/api/users")
        .expect(200)
        .then(({ body }) => {
          //console.log(body);
          body.allUsersUsernames.forEach((object) => {
            expect(object).toMatchObject({
              username: expect.any(String),
            });
          });
        });
    });
  });
  describe("GET/api/users/:username", () => {
    it("should return 200, showing the user requested by username", () => {
      return request(app)
        .get("/api/users/mallionaire")
        .expect(200)
        .then(({ body }) => {
          //console.log(body.user);
          expect(body.user).toMatchObject({
            username: expect.any(String),
            avatar_url: expect.any(String),
            name: expect.any(String),
          });
        });
    });
    it("should return 404, if user requested by username does not exist ", () => {
      return request(app)
        .get("/api/users/bob")
        .expect(404)
        .then(({ body }) => {
          //console.log(body);
          expect(body.msg).toBe("Not found: username not found");
        });
    });
  });
});

describe("comments", () => {
  describe("GET/api/comments/:comment_id", () => {
    it("should return 200, showing the comment requested by id", () => {
      return request(app)
        .get("/api/comments/2")
        .expect(200)
        .then(({ body }) => {
          //console.log(body.comment);
          expect(body.comment).toMatchObject({
            comment_id: 2,
            author: expect.any(String),
            review_id: expect.any(Number),
            votes: expect.any(Number),
            created_at: expect.any(String),
            body: expect.any(String),
          });
        });
    });
    it("return 404, if comment_id does not exist", () => {
      return request(app)
        .get("/api/comments/9999")
        .expect(404)
        .then(({ body }) => {
          expect(body.msg).toBe("Not found: comment id not found");
        });
    });
  });
  describe("PATCH/api/comments/:comment_id", () => {
    it("should return a 200 and should increment the current comment's vote property by 1", () => {
      return request(app)
        .patch("/api/comments/2")
        .send({ inc_votes: 1 })
        .expect(200)
        .then(({ body }) => {
          //console.log(body.updatedComment, "body");
          expect(body.updatedComment).toEqual({
            comment_id: 2,
            author: "mallionaire",
            review_id: 3,
            votes: 14,
            created_at: "2021-01-18T10:09:05.410Z",
            body: "My dog loved this game too!",
          });
        });
    });
    it("should return a 200 and should decrement the current comment's vote property by 3", () => {
      return request(app)
        .patch("/api/comments/2")
        .send({ inc_votes: -3 })
        .expect(200)
        .then(({ body }) => {
          //console.log(body.updatedComment, "body");
          expect(body.updatedComment).toEqual({
            comment_id: 2,
            author: "mallionaire",
            review_id: 3,
            votes: 10,
            created_at: "2021-01-18T10:09:05.410Z",
            body: "My dog loved this game too!",
          });
        });
    });
    it("should return a 400 and error message if inc_votes is not a number", () => {
      return request(app)
        .patch("/api/comments/2")
        .send({ inc_votes: "whatever" })
        .expect(400)
        .then(({ body }) => {
          //console.log(body.msg, "body.msg");
          expect(body.msg).toBe("Bad request: wrong type value");
        });
    });
    it("should return a 404 and error message if comment_id is not a number", () => {
      return request(app)
        .patch("/api/comments/whatever")
        .send({ inc_votes: 1 })
        .expect(404)
        .then(({ body }) => {
          //console.log(body.msg, "body.msg");
          expect(body.msg).toBe("Not found: comment id not found");
        });
    });
    it("should return a 404 and error message if comment_id is not found", () => {
      return request(app)
        .patch("/api/comments/99999")
        .send({ inc_votes: 1 })
        .expect(404)
        .then(({ body }) => {
          //console.log(body, "body");
          expect(body.msg).toBe("Not found: comment id not found");
        });
    });
  });
});
