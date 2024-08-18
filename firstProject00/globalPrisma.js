//Singleton OOP pattern is used here to create single instance of global prisma client.

const {PrismaClient} = require('@prisma/client');

class PrismaSingleton{
    constructor(){
if(!PrismaSingleton.instance){
    PrismaSingleton.instance = new PrismaClient();
}
    }

    getInstance(){
        return PrismaSingleton.instance;
    }
}


const prisma = new PrismaSingleton().getInstance();
module.exports= prisma;