const { selectCategories } = require('../models/categories.models')

exports.getCategories = async (req,res) => {
   const categories = await selectCategories()
   console.log({categories})
   res.status(200).send({categories});
};










/*
const postRestaurant = async (req, res, next) => {
    const restaurant = req.body;
  try {
    const restaurant = await insertRestaurant(restaurant)
    res.status(201).send({ restaurant });
  } catch (err) {
      next(err);
  };
}
*/
