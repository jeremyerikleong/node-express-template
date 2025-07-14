import express from 'express';

const router = express.Router();

let products = [
    { id: 1, name: "item 1" },
    { id: 2, name: "item 2" }
]

// get all products
router.get('/', (req, res, next) => {
    res.status(200).json({
        status: 'success',
        data: products
    })
});

// get single product
router.get('/:id', (req, res, next) => {
    const id = +req.params.id;
    const product = products.find(product => product.id === id);

    if (!product) {
        const error = new Error(`A product with the id of ${id} was not found`);
        error.status = 404;
        return next(error);
    }

    res.status(200).json({ status: 'success', data: product });
});

// create new product
router.post('/', (req, res, next) => {
    const { name } = req.body;

    const newProduct = {
        id: products.length + 1,
        name: name
    }

    if (!newProduct.name) {
        const error = new Error('this field cannot be empty');
        error.status = 400;
        return next(error);
    }

    products.push(newProduct);
    res.status(201).json(products);
});

// update existing product
router.put('/:id', (req, res, next) => {
    const id = +req.params.id;
    const product = products.find(product => product.id === id);

    if (!product) {
        const error = new Error(`A product with the id of ${id} was not found`);
        error.status = 404;
        return next(error);
    }

    product.name = req.body.name;
    res.status(200).json({ status: 'success', message: 'Successfully update product detail' });
});

// delete selected product
router.delete('/:id', (req, res, next) => {
    const id = +req.params.id;
    const product = products.find(product => product.id === id);

    if (!product) {
        const error = new Error(`A product with the id of ${id} was not found`);
        error.status = 404;
        return next(error);
    }

    products = products.filter(product => product.id !== id);
    res.status(200).json({
        status: 'success',
        data: products,
        message: 'Delete product successfully'
    });
});

export default router;