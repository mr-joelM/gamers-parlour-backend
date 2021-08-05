const request = require('supertest')
const db = require('../db/connection.js');
const testData = require('../db/data/test-data/index.js');
const  seed  = require('../db/seeds/seed.js');
const app = require('../app');

beforeEach(() => seed(testData));
afterAll(() => db.end());

describe('GET/api/categories', () => {
    it('should return status 200 , showing all categories', () => {
        return request(app)
        .get('/api/categories')
        .expect(200)
        .then(({body})=>{
            //console.log(body)
            body.categories.forEach(category=>{
                expect(category).toMatchObject({
                    slug: expect.any(String),
                    description: expect.any(String)
                })
            })
            
        })
    });
});

describe('GET/api/reviews', () => {
    it('should return status 200 , showing all reviews ', () => {
        return request(app)
        .get('/api/reviews')
        .expect(200)
        .then(({body})=>{
            //console.log(body)
            expect(body.reviews).not.toHaveLength(0)
            body.reviews.forEach(review=>{
                expect(review).toMatchObject({
                    review_id: expect.any(Number),
                    title: expect.any(String),
                    review_body: expect.any(String),
                    designer: expect.any(String),
                    review_img_url: expect.any(String),
                    votes: expect.any(Number),
                    category: expect.any(String),
                    owner: expect.any(String)
                })
            })
            
        })
    });
});
describe.only('GET/api/reviews/:review_id',()=>{
    it('should return 200, showing the review requested by id', ()=>{
        return request(app)
        .get('/api/reviews/2')
        .expect(200)
        .then(({body})=>{
           expect(body.review).toMatchObject({
            review_id: 2,
            title: expect.any(String),
            review_body: expect.any(String),
            designer: expect.any(String),
            review_img_url: expect.any(String),
            votes: expect.any(Number),
            category: expect.any(String),
            owner: expect.any(String)
           })
        })
    })
    it('should return 400, if review requested by id doesnt exist ', () => {
        return request(app) 
        .get('/api/reviews/2000')
        .expect(400)
        .then(({body})=>{
            console.log(body)
            expect(body.msg).toBe('wrong id number')
        })
    });
    it('return 400, if review_id is not a number', () => {
        return request(app)
        .get('/api/reviews/whatever')
        .expect(400)
        .then(({body})=>{
            expect(body.msg).toBe('Bad Request: wrong type value')
        })
    });
})