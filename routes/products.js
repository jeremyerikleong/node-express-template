import express from 'express';
import { products } from '../db/index.js';

const router = express.Router();

// get all products
router.get('/', (req, res) => {
    res.status(200).json({
        status: 'success',
        data: products
    })
});

// get single product
router.get('/:id', (req, res) => {
    const id = +req.params.id;
    const product = products.find(product => product.id === id);

    if (!product) {
        return res.status(404).json({ status: 'fail', message: `A product with the id of ${id} was not found` });
    }

    res.status(200).json({ status: 'success', data: product });
});

// create new product
router.post('/', (req, res) => {
    const { name } = req.body.name;

    const newProduct = {
        id: products.length + 1,
        name: name
    }

    if (!newProduct.name) {
        return res.status(400).json({ message: 'this field cannot be empty.' })
    }

    products.push(newProduct);
    res.status(201).json(products);
});

// update existing product
router.put('/:id', (req, res) => {

});

// delete selected product
router.delete('/:id', (req, res) => {

});

export default router;