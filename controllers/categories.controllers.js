const { selectCategories } = require('../models/categories.models')

exports.getCategories = async (req,res) => {
   const categories = await selectCategories()
   console.log({categories})
   res.status(200).send({categories});
};