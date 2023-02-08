class ProductManager{
    constructor(){
        this.products = [];
    }
    addProduct(title, description, price, thumbnail, code, stock){
        if ( this.getProducts().find((p)=> p.code === code)){
            console.log(`The Code ${code} of the product you are trying to add, already exists in our Data Base. Please try with another Code`);
        } else if ( !title || !description || !price || !thumbnail || !code || !stock) {
            console.log("Please add a value for every Key");
        } else {
            const prodId = this.products.length + 1;
            this.products.push({title, description, price, thumbnail, code, stock, prodId});
        }
    }
    getProducts(){
        return this.products;
    }

    getProductById(id){
        if( this.getProducts().find((p)=> p.prodId === id)){
            console.log(this.getProducts().find((p)=> p.prodId === id))
        } else{
            console.log("Non-existant")
        }
    }
}

const prod = new ProductManager();

prod.addProduct("test", "test", 5, 6,"one" ,50 );
prod.addProduct("test2", "test2", 6 , 7, "two",65);
prod.addProduct("test3", "test3", 7 , 8, "three",80);
prod.addProduct("test4", "test4", 8 , 9, "four",95);

console.log(prod.getProducts());

prod.getProductById(3)