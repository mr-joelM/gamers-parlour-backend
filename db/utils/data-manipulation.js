// extract any functions you are using to manipulate your data, into this file
exports.formatCategoriesData = (array)=>{
 const newArr = array.map(({slug, description }) => [slug, description])
 return newArr
}


exports.formatUsersData = (array)=>{
    const newArr = array.map(({username, name , avatar_url }) => [username, name , avatar_url])
    return newArr
   }

exports.formatReviewsData = (array)=>{
    const newArr = array.map(({title, review_body, designer, review_img_url, votes, category, owner, created_at }) => [title, review_body, designer, review_img_url, votes, category, owner, created_at])
    return newArr
   }
   
exports.formatCommentsData = (commentsData, reviewsData)=>{
    if(commentsData.length === 0)return [];

    const {body, belongs_to, created_by, votes, created_at} = commentsData[0]
    const {review_id} = reviewsData.find(review =>{
        review.title === belongs_to
    })

    const newArray = []

    newArray.push([created_by, review_id, votes, created_at, body])
    return newArray
}


/*
[[author, review_id, votes, created_at, body]]

{
    body: 'My dog loved this game too!',
    belongs_to: 'Ultimate Werewolf',
    created_by: 'mallionaire',
    votes: 13,
    created_at: new Date(1610964545410)
  }

  {
    review_id: 22,
    title: 'Yahtzee',
    review_body: `Often thought of as the ultimate roll-and-write game, You'll find it hard to overlook Yahtzee's appeal. Yahtzee is quick to teach and quick to play. Think of it as an essential "palate-cleanser" game to have in your store cupboard for those times when chunkier games leave a bitter taste in players mouths.`,
    designer: 'Edwin S. Lowe',
    review_img_url: 'https://images.pexels.com/photos/33968/pexels-photo.jpg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
    votes: 18,
    category: 'roll-and-write',
    owner: 'grumpy19',
    created_at: 2020-09-12T23:00:00.000Z
  }

*/