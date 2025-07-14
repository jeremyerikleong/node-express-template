const result = document.getElementById('result');
const btnGetProducts = document.getElementById('btnGetProducts');
const userInput = document.querySelector("input[name='name']");
const submitForm = document.getElementById('formContainer');

async function displayProducts() {
    try {
        const response = await fetch('http://localhost:8080/api/v1/products');
        let resultDisplay = '';

        if (!response.ok) throw new Error('Failed to fetch products');
        const products = await response.json();

        products['data'].forEach(product => {
            resultDisplay += `<p id='${product.id}'>${product.name}</p>`
        });
        result.innerHTML = resultDisplay;
    } catch (error) {
        console.error('Error fetching product lists:', error);
    }
}

async function addProduct(evt) {
    evt.preventDefault();

    const formData = new FormData(this);
    const name = formData.get('name');

    try {
        const response = await fetch('http://localhost:8080/api/v1/products', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name })
        });

        if (!response.ok) throw new Error('Failed to create new product');

        const newProduct = await response.json();

        const newProductDisplay = document.createElement('div');
        newProductDisplay.textContent = newProduct.name;
        result.appendChild(newProductDisplay);

        userInput.value = "";
        displayProducts();
    } catch (error) {
        console.error('Failed creating new product:', error);
    }
}

btnGetProducts.addEventListener('click', displayProducts);
submitForm.addEventListener('submit', addProduct);