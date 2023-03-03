const fs = require('fs');

class ProductManager{
    static Autoid = 1;
    constructor(path){
        this.path = path;
    }
    async addProduct({title, description, price, thumbnail, code, stock}){
        try{
            if( await this.getProducts().find((p)=> p.code === code)){
                throw new Error(`The code ${code} of the product you are trying to add, already exists in our Data Base. Please try with a different code `);
            } else if( !title || !description || !price || !thumbnail || !code || !stock ){
                throw new Error('Please add a value for every key')
            } else{
                const pastProducts = await this.getProducts();
                const newProduct = {title, description, price, thumbnail, code, stock};
                const productsArray = [...pastProducts, newProduct, ProductManager.Autoid++];
                await fs.promises.writeFile(this.path, JSON.stringify(productsArray));
            }
        } catch ( error ){
            console.error("Couldn't log the products");
        }
    }
    async getProducts(){
        try{
            const productsRead = await fs.promises.readFile(this.path);
            const productsReadParse = await JSON.parse(productsRead);
            return [productsReadParse]; 
        } catch(error){
            return error;
        }
    }
    async getProductById(id){
        try {
            if( await this.getProducts().find((p)=> p.autoId === id)){
                console.log( await this.getProducts().find((p)=> p.autoId === id))
            }
        } catch (error) {
            console.log("Non-existant")
        }
    }
}


async function main(){
    const prod = new ProductManager('products.json');
    await prod.addProduct({title:"1", description:"22", price:5, thumbnail:6 ,code:"one" , stock:20});
    await prod.addProduct({title:"2", description:"33", price:5, thumbnail:67 ,code:"two" , stock:40});
    await prod.addProduct({title:"2", description:"33", price:5, thumbnail:67 ,code:"two" , stock:40});
    await prod.addProduct({title:"3", description:"44", price:5, thumbnail:13 ,code:"three" , stock:50});
    console.log(await prod.getProducts())
}

main()
