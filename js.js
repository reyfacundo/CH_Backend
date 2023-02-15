const fs = require('fs');

class ProductManager{
    constructor(path){
        this.path = path;
    }
    async addProduct({title, description, price, thumbnail, code, stock}){
        try{
            const prodId = this.getProducts.length + 1;
            await fs.promises.writeFile(this.path, "");
            await fs.promises.appendFile(this.path, JSON.stringify({title, description, price, thumbnail, code, stock, prodId}));

        } catch ( error ){
            console.error("Couldn't log the products")
        }
    }
    async getProducts(){
        // const products = await fs.promises.readFile(this.path);
        // const productsJson = JSON.parse(products);
        // return productsJson;
        try{
            const products = await fs.promises.readFile(this.path);
            const productsObj = JSON.parse(products);
            return [productsObj];
        } catch(error){
            console.error(`Couldn't find any products`);
        }
    }
    async getProductById(id){
        try{
            if( this.getProducts().find((p)=> p.prodId === id)){
                console.log(this.getProducts().find((p)=> p.prodId === id));
            }
        }catch(error){
            console.error("Non existant");
        }
    }
    async updateProduct(id, {title, description, price, thumbnail, code, stock}){
        if ( this.getProducts().find((p)=> p.prodId === id)){
            await fs.promises.appendFile(this.path, JSON.stringify({title, description, price, thumbnail, code, stock }));
        }
    }
    async deleteProduct(id){
        if ( this.getProducts().find((p)=> p.prodId === id)){ 
            
        }
    }
}

const prod = new ProductManager('products.json');

prod.addProduct({title:"test", description:"test", price:5, thumbnail:6 ,code:"one" , stock:50});
prod.addProduct({title:"test2", description:"test2", price:6 , thumbnail:7 , code:"two" ,stock:65});
prod.addProduct({title:"test3", description:"test3", price:7 , thumbnail:8 , code:"three" ,stock:80});
prod.addProduct({title:"test4", description:"test4", price:8 , thumbnail:9 , code:"four" ,stock:95});


console.log(prod.getProducts())
console.log(prod.getProductById(1))