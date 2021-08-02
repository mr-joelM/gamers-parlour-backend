const {formatCategoriesData, formatUsersData , formatReviewsData, formatCommentsData}= require('../db/utils/data-manipulation');


describe('formatedCategoriesData',()=>{
    it('should return an new array',()=>{
        const input = []
        expect(formatCategoriesData(input)).not.toBe(input)
        expect(Array.isArray(formatCategoriesData(input))).toBe(true);
    })
    it('should return an array of arrays with the values of the input objects ',()=>{
        const array = [{ slug: "children's games", description: 'Games suitable for children' }]
        expect(formatCategoriesData(array)).toEqual([ ["children's games", 'Games suitable for children']])
    })
    it('should not mutate original array',()=>{
        const array = [{ slug: "children's games", description: 'Games suitable for children' }]
        formatCategoriesData(array);
        expect(array).toEqual([{ slug: "children's games", description: 'Games suitable for children' }])
    })
    
})
describe('formatUsersData', () => {
    it('should return an new array',()=>{
        const input = []
        expect(formatUsersData(input)).not.toBe(input)
        expect(Array.isArray(formatUsersData(input))).toBe(true);
    })
    it('should return an array of arrays with the values of the input objects ',()=>{
        const array = [{
            username: 'dav3rid',
            name: 'dave',
            avatar_url:
              'https://www.golenbock.com/wp-content/uploads/2015/01/placeholder-user.png'
          }]
        expect(formatUsersData(array)).toEqual([ ['dav3rid','dave' , 'https://www.golenbock.com/wp-content/uploads/2015/01/placeholder-user.png']])
    })
    it('should not mutate original array',()=>{
        const array = [{
            username: 'dav3rid',
            name: 'dave',
            avatar_url:
              'https://www.golenbock.com/wp-content/uploads/2015/01/placeholder-user.png'
          }]
        formatUsersData(array);
        expect(array).toEqual([{
            username: 'dav3rid',
            name: 'dave',
            avatar_url:
              'https://www.golenbock.com/wp-content/uploads/2015/01/placeholder-user.png'
          }])
    })
});
describe('formatedReviewsData',()=>{
    it('should return an new array',()=>{
        const input = []
        expect(formatReviewsData(input)).not.toBe(input)
        expect(Array.isArray(formatReviewsData(input))).toBe(true);
    })
    it('should return an array of arrays with the values of the input objects ',()=>{
        const array = [{ title: 'One Night Ultimate Werewolf',
        designer: 'Akihisa Okui',
        owner: 'mallionaire',
        review_img_url:
          'https://images.pexels.com/photos/5350049/pexels-photo-5350049.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
        review_body: "We couldn't find the werewolf!",
        category: 'social deduction',
        created_at: new Date(1610964101251),
        votes: 5 }]
        expect(formatReviewsData(array)).toEqual([ ['One Night Ultimate Werewolf', "We couldn't find the werewolf!",'Akihisa Okui', 'https://images.pexels.com/photos/5350049/pexels-photo-5350049.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260', 5,'social deduction','mallionaire',
        new Date(1610964101251)]])
    })
    it('should not mutate original array',()=>{
        const array = [{ title: 'One Night Ultimate Werewolf',
        designer: 'Akihisa Okui',
        owner: 'mallionaire',
        review_img_url:
          'https://images.pexels.com/photos/5350049/pexels-photo-5350049.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
        review_body: "We couldn't find the werewolf!",
        category: 'social deduction',
        created_at: new Date(1610964101251),
        votes: 5}]
        formatReviewsData(array);
        expect(array).toEqual([{title: 'One Night Ultimate Werewolf',
        designer: 'Akihisa Okui',
        owner: 'mallionaire',
        review_img_url:
          'https://images.pexels.com/photos/5350049/pexels-photo-5350049.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
        review_body: "We couldn't find the werewolf!",
        category: 'social deduction',
        created_at: new Date(1610964101251),
        votes: 5 }])
    })
    
})
describe('formatCommentsData', () => {
    it('should return a new array', () => {
        const commentsData = []
        const reviewsData = []
        expect(formatCommentsData(commentsData,reviewsData)).not.toBe(commentsData)
        expect(formatCommentsData(commentsData,reviewsData)).not.toBe(reviewsData)
        expect(Array.isArray(formatCommentsData(commentsData,reviewsData))).toBe(true);
    });
    it('should return formated data when passed an array of length1 ', () => {
        const commentsData = [{
            body: 'My dog loved this game too!',
            belongs_to: 'Ultimate Werewolf',
            created_by: 'mallionaire',
            votes: 13,
            created_at: new Date(1610964545410)
          }]
        const reviewsData = [{
            review_id: 5,
            title: 'Ultimate Werewolf',
            review_body: `Often thought of as the ultimate roll-and-write game, You'll find it hard to overlook Yahtzee's appeal. Yahtzee is quick to teach and quick to play. Think of it as an essential "palate-cleanser" game to have in your store cupboard for those times when chunkier games leave a bitter taste in players mouths.`,
            designer: 'Edwin S. Lowe',
            review_img_url: 'https://images.pexels.com/photos/33968/pexels-photo.jpg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
            votes: 18,
            category: 'roll-and-write',
            owner: 'grumpy19',
            created_at: new Date(1610964545410)
          },{
            review_id: 22,
            title: 'Yahtzee',
            review_body: `Often thought of as the ultimate roll-and-write game, You'll find it hard to overlook Yahtzee's appeal. Yahtzee is quick to teach and quick to play. Think of it as an essential "palate-cleanser" game to have in your store cupboard for those times when chunkier games leave a bitter taste in players mouths.`,
            designer: 'Edwin S. Lowe',
            review_img_url: 'https://images.pexels.com/photos/33968/pexels-photo.jpg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
            votes: 18,
            category: 'roll-and-write',
            owner: 'grumpy19',
            created_at: new Date(1610964545410)
          }]
        expect(formatCommentsData(commentsData,reviewsData)).toEqual([['mallionaire', 5 ,13, new Date(1610964545410), 'My dog loved this game too!' ]])
    });
});
