const express = require('express');
const app = express();
const prisma = require('./globalPrisma')
const dummyData = require('./dummyData');
app.use(express.json());
app.use(express.urlencoded({extended:false}))

//Insert Data
app.post('/createUser', async(req,res)=>{

try {
   const newUser = await prisma.user.create({
    data:{
        name : 'User1',
        email:'one@mail.com',
        role : 'USER',
        profile:{
            create:{
                bio:"This is User1's bio"
            }
        },
        posts:{
            create:[
                {
                title:'User1 Post 1',
                category:{
                    create:{
                        name:'Technology'
                    }
                }
            },
                {title:'User1 Post 2',
                category:{
                    create:{
                        name : 'Lifestyle'
                    }
                }}
            ]
        }

    }
   });
   console.log('User Created successfully :',newUser);

} catch (error) {
    console.log(error)
}finally{
    await prisma.$disconnect()
}

})



//get user data
app.get('/user',async(req,res)=>{
    const users = await prisma.user.findMany();
    return res.json(users);
})


app.listen(3000,()=>{
    console.log('server running at http://localhost:3000')
})