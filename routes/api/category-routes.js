const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', (req, res) => {
  // find all categories
 Category.findAll({
    attributes: ['id', 'category_name'],
    include: [{
      model: Product,
      attributes: ['id', 'product_name', 'price', 'stock', 'category_id']
    }]
  })
  .then((categories) => {
    res.json(categories);
  })
  .catch((err) => {
    res.json(err);
  });

  // be sure to include its associated Products
});

router.get('/:id', (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products
   Category.findByPk(req.params.id, {
    attributes: ['id', 'category_name'],
		include: [
			{
				model: Product,
        attributes: ['id', 'product_name', 'price', 'stock', 'category_id'],
			}
		],
	})
  .then((category) => {
    res.json(category);
  })
  .catch((err) => {
    res.json(err);
  });
});

router.post('/',  (req, res) => {
  // create a new category
  Category.create(req.body)
		.then((newCategory) => res.status(200).json(newCategory))
		.catch((err) => {
			console.log(err);
			res.status(400).json(err);
		});
});

router.put('/:id', (req, res) => {
  // update category by `id` value
  Category.update(req.body, {
		where: {
			id: req.params.id,
		},
	})
  .then(cat => Category.findByPk(req.params.id))
  .then((updatedCategory) => res.status(200).json(updatedCategory))
  .catch((err) => {res.json(err);});
});

router.delete('/:id', (req, res) => {
  // delete category by `id` value
	 Category.destroy({
		where: {git 
			id: req.params.id,
		},
	})
	.then((rmvdCategory) => {
		res.json(`The category was removed from the database`);
	})
	.catch((err) => {
		res.json(err);
	});
});

module.exports = router;