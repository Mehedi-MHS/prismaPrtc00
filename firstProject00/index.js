const {PrismaClient} = require('@prisma/client')

const prisma = new PrismaClient()

async function main(){
    //insert data
    await prisma.user.create({
        data:{
            name:'Alice',
            email:'alice@prisma.io',
            posts:{
                create:{title:"Hello world"}
            },
            profile:{
                create:{bio:'I like turtles'},
            },
        },
    })

//update data
const post = await prisma.post.update({
    where:{id:1},
    data:{published:true},
})

    //query database
const allUsers = await prisma.user.findMany({
    include:{
        posts:true,
        profile:true
    }
})

//console data
console.dir(allUsers,{depth:null})
}

main().then(
    async ()=>{
        await prisma.$disconnect()
    }
).catch(
    async(e)=>{
        console.error(e)
        await prisma.$disconnect()
        process.exit(1)
    }
)