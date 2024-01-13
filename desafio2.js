const fs = require('fs');

class ProductManager {
    constructor(filePath) {
        this.path = filePath;
        this.products = this.readFromFile();
    }

    addProduct(product) {
        // Validar que no se repita el código
        if (this.products.find((p) => p.code === product.code)) {
            throw new Error("El código del producto ya existe");
        }

        // Validar que todos los campos sean obligatorios
        if (!product.title || !product.description || !product.price || !product.code || !product.stock) {
            throw new Error("Todos los campos son obligatorios");
        }

        // Crear el producto con un id autoincrementable
        const id = this.products.length + 1;
        product.id = id;

        // Guardar el producto en el arreglo
        this.products.push(product);

        // Guardar el arreglo en el archivo
        this.writeToFile();

        return product;
    }

    getProducts() {
        // Leer el archivo de productos
        const products = this.readFromFile();

        return products;
    }

    getProductById(id) {
        // Leer el archivo de productos
        const products = this.readFromFile();

        // Buscar el producto con el id especificado
        const product = products.find((p) => p.id === id);

        return product;
    }

    updateProduct(id, product) {
        // Validar que el producto exista
        const existingProduct = this.getProductById(id);
        if (!existingProduct) {
            throw new Error("El producto no existe");
        }

        // Actualizar el producto
        existingProduct.title = product.title;
        existingProduct.description = product.description;
        existingProduct.price = product.price;
        existingProduct.thumbnail = product.thumbnail;
        existingProduct.stock = product.stock;

        // Guardar el arreglo en el archivo
        this.writeToFile();

        return existingProduct;
    }

    deleteProduct(id) {
        // Validar que el producto exista
        const existingProduct = this.getProductById(id);
        if (!existingProduct) {
            throw new Error("El producto no existe");
        }

        // Eliminar el producto del arreglo
        this.products = this.products.filter((p) => p.id !== id);

        // Guardar el arreglo en el archivo
        this.writeToFile();
    }

    readFromFile() {
        try {
            const data = fs.readFileSync(this.path, 'utf8');
            return JSON.parse(data);
        } catch (error) {
            return [];
        }
    }

    writeToFile() {
        const data = JSON.stringify(this.products, null, 2);
        fs.writeFileSync(this.path, data);
    }
}

const productManager = new ProductManager("./products.json");

// Agregar un producto
const product = productManager.addProduct({
    title: "Producto prueba",
    description: "Este es un producto prueba",
    price: 100,
    thumbnail: "Sin imagen",
    code: "abc123",
    stock: 10,
});

// Obtener todos los productos
const products = productManager.getProducts();
console.log(products);

// Obtener un producto por id
const productById = productManager.getProductById(1);
console.log(productById);

// Actualizar un producto
productManager.updateProduct(1, {
    title: "Producto actualizado",
});

// Eliminar un producto
//productManager.deleteProduct(1);