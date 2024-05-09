const express = require("express")
const mongoose = require('mongoose')
const cors = require("cors")
const EmployeeModel = require('./models/Employee')
const UserModel = require('./models/user')
const multer = require('multer')
const path = require('path')
const FileModel = require('./models/user_file')
const { MongoClient } = require('mongodb');

const session = require('express-session');

const app = express()
app.use(express.json())
app.use(cors())
app.use(express.static('upload'))
//app.use("giit",express.static(".",'upload'))
const client = new MongoClient('mongodb://0.0.0.0:27017/', { useNewUrlParser: true, useUnifiedTopology: true });
 
const db1 = client.db('employee');
mongoose.connect("mongodb://0.0.0.0:27017/employee").then(
   console.log("database connected")
)


app.use(
    session({
      secret: 'your-secret-key',
      resave: false,
      saveUninitialized: true,
      cookie: { secure: false }, // Set to true if using HTTPS
    })
  );





app.post("/login", async (req, res) => {
    const { email, password } = req.body;
    console.log(req.body);
    const Collection =db1.collection('employees')

    try {
        const user = await Collection.findOne({ email: email });

        if (user) {
            if (user.password === password) {
                req.session.user = user.email; // Set the user in the session
                res.json("success");
            } else {
                res.json("Password Is Incorrect");
            }
        } else {
            res.json("No record");
        }
    } catch (error) {
        console.error("Error finding user:", error);
        res.status(500).json("Internal Server Error");
    }
});


app.post('/register',async(req, res) =>{
   await EmployeeModel.create(req.body)
   res.json("success")
})




const storage = multer.diskStorage({
    destination:(req,file,cb) =>{
        cb(null, 'upload/img')
    },
    filename:(req,file,cb)=>{
        cb(null,file.fieldname+"_"+Date.now()+path.extname(file.originalname))
    }
})

const upload = multer({
    storage:storage
})


app.post('/upload',upload.single('file'),async(req,res)=>{
    console.log(req.body)
   await UserModel.create({image:req.file.filename,...req.body})
    .then(result =>res.json(result))
    .catch(err => console.log(err))
})


// app.get('/users',(req,res)=>{
//     UserModel.find({})
//     //console.log(req.session.user)
//    //res.json({ user: req.session.user })
  
//     .then(user => res.json(user))
//     .catch(err => res.json(err))
// })

app.get('/users', (req, res) => {
    UserModel.find({})
        .then(users => {
            // Log the users to the console for debugging
            console.log(req.session.users);
            // Send the users as a JSON response
            res.json(users);
        })
        .catch(err => {
            // Log the error to the console if there's an issue with the database query
            console.error("Error fetching users:", err);
            // Send the error as a JSON response
            res.json({ error: err.message });
        });
});

app.get('/getUser/:id',(req, res)=>{
    const id = req.params.id;
    //console.log(req.body)
    UserModel.findById({_id:id})
    .then(user => res.json(user))
    .catch(err => res.json(err))
})



const storage_upt = multer.diskStorage({
    destination:(req,file,cb) =>{
        cb(null, 'upload/img')
    },
    filename:(req,file,cb)=>{
        cb(null,file.fieldname+"_"+Date.now()+path.extname(file.originalname))
    }
})

const upload_upt = multer({
    storage:storage_upt
})


app.put('/updateUser/:id', upload_upt.single('image'), async (req, res) => {
    console.log(req.body);
    const id = req.params.id;

    try {
        let updateData = {
            name: req.body.name,
            email: req.body.email,
            age: req.body.age,
            mobile: req.body.mobile
        };

        // Check if there is a file in the request
        if (req.file) {
           // updateData.image = req.file.filename;
            updateData.image = path.join('img', req.file.fieldname + "_" + Date.now() + path.extname(req.file.originalname));
        }

        const updatedUser = await UserModel.findByIdAndUpdate({ _id: id }, updateData, { new: true });

        if (updatedUser) {
            res.json(updatedUser);
        } else {
            res.status(404).json({ error: 'User not found' });
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});




// app.put('/updateUser/:id',(req,res)=>{
//     const id = req.params.id;
//     UserModel.findByIdAndUpdate({_id:id,},{
//         name:req.body.name,
//         email:req.body.email,
//         age:req.body.age,
//         mobile:req.body.mobile
//     })
//     .then(user => res.json(user))
//     .catch(err => res.json(err))
// })


app.delete('/deleteUser/:id',(req,res)=>{
    const id = req.params.id;
    UserModel.findByIdAndDelete({_id:id})
    .then(res => res.json(res))
    .catch(err => res.json(err))
})



app.listen(3001, () =>{
    console.log("server is running")
})