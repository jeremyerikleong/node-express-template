let products = [
    { id: 1, name: "item 1" },
    { id: 2, name: "item 2" }
]

function getAllProducts(req, res, next) {
    res.status(200).json({
        status: 'success',
        data: products
    })
}

function getProduct(req, res, next) {
    const id = +req.params.id;
    const product = products.find(product => product.id === id);

    if (!product) {
        const error = new Error(`A product with the id of ${id} was not found`);
        error.status = 404;
        return next(error);
    }

    res.status(200).json({
        status: 'success',
        data: product
    });
}

function addNewProduct(req, res, next) {
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
    res.status(201).json({
        status: 'success',
        data: products
    });
}

function updateProduct(req, res, next) {
    const id = +req.params.id;
    const product = products.find(product => product.id === id);

    if (!product) {
        const error = new Error(`A product with the id of ${id} was not found`);
        error.status = 404;
        return next(error);
    }

    product.name = req.body.name;
    res.status(200).json({
        status: 'success',
        message: 'Successfully update product detail'
    });
}

function deleteProduct(req, res, next) {
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
}

export { getAllProducts, getProduct, addNewProduct, updateProduct, deleteProduct };