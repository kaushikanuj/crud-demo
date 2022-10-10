const express = require('express')
const db = require('./db/conn')
const Student = require('./models/students')
var bodyParser = require('body-parser')

const app = express()

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Create a new Student
/*app.post('/students', (req, res)=>{
 const users = new Student(req.body)
 users.save().then(()=>{
     res.status(201).send(users)
 }).catch((e)=>{
     res.status(404).send(e)
 })
})*/

// using async and await 
app.post('/students', async(req, res)=>{
    try{
        const users = new Student(req.body)
        const createUser = await users.save()
        res.status(201).send(createUser)
    }catch(e){
        res.status(404).send(e)
    }
   })

// Get All Information of Students
app.get('/students', async(req, res)=>{
    try{
        const AllStudentData = await Student.find()
        res.status(201).send(AllStudentData)
    }catch(e){
        res.status(404).send(e)
    }
   })

// Get Student data by id 
app.get('/students/:id', async(req, res)=>{
    try{
        const _id = req.params.id
        const studentById = await Student.findById(_id)
        if(!studentById){
            res.status(404).send()
        }else{
            res.send(studentById)
        }
    }catch(e){
        res.status(500).send(e)
    }
   })  

app.delete('/students/:id', async(req, res)=>{
    try{
        const _id = req.params.id
        const studentDeleteById = await Student.findByIdAndDelete(_id)
        if(!req.params.id){
            res.status(400).send()
        }
            res.send(studentDeleteById)
    }catch(e){
        res.status(500).send(e)
    }
}) 
   
// update the student by it id
app.patch('/students/:id', async(req, res)=>{
    try{
        const _id = req.params.id
        const UpdateStudentById = await Student.findByIdAndUpdate(_id, req.body,{new:true})
        res.send(UpdateStudentById)
    }catch(e){
        res.status(500).send(e)
    }
}) 



app.listen(4000, function(){
    console.log('port is connected on 4000')
})