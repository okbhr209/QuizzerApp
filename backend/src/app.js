require('dotenv').config() ;

const express = require("express") ;
const app =express() ;
//
const cors = require('cors'); // Import the cors middleware
// Set up CORS with the specific origin (replace with your React app's URL)
const allowedOrigins = ['http://localhost:3000'];

const corsOptions = {
  origin: function (origin, callback) {
    if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
};

app.use(cors(corsOptions));

// // Define your API routes and handle requests
// app.get('/api/data', (req, res) => {
//   // Handle the request and send a response
// });

// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => {
//   console.log(`Server is running on port ${PORT}`);
// });


//
// const hbs =require("hbs") ;
const Register = require("./models/registers") ;
const bcrypt =require("bcryptjs") ;
const jwt =require("jsonwebtoken") ;
const cookieParser = require("cookie-parser") ;
const auth =require("./middleware/auth") ;
 
require("./db/conn") ;

const port = process.env.PORT || 5000 ;
 
// const path =require("path") ;
// const static_path = path.join(__dirname,"./public") ;
// const template_path =path.join(__dirname,"../templates/views") ;
// const partials_path =path.join(__dirname,"../templates/partials") ;


// hbs.registerPartials(partials_path) ;

app.use(express.json() ) ;
app.use(express.urlencoded({extended: false})) ;

// app.use( express.static(static_path)) ;
// app.set("view engine" ,"hbs") ;
// app.set("views" ,template_path) ;
app.use( cookieParser() ) ;

//create a new user 
app.post("/register", async(req,res)=>{

    try {

        console.log( req.body ) ;

        const passwd =  await req.body.password ;
        const cpasswd = await req.body.confirmpassword ;

        if(passwd === cpasswd ){
            const registerEmployee = new Register({
                firstname : req.body.firstname ,
                lastname : req.body.lastname ,
                email : req.body.email ,
                gender : req.body.gender ,
                phone : req.body.phone ,
                password : req.body.password ,
                confirmpassword : req.body.confirmpassword
            }) ;
            
            const token = await registerEmployee.generateAuthToken() ;

            res.cookie("jwt",token ,{
                expires : new Date( Date.now() +60000 ) ,
                httpOnly : true // now the client will not be able delete the cookie ..
            }) ;

            const registered = await registerEmployee.save() ;
            // res.status(201).render("index");
            // secure: true 

            console.log("success Ceeated..") ;
            res.status(200).json({
                  firstname :"OM" ,
                  lastname :"KUMAR",
            }) ;

        } ;
        // else {
        //     res.status(401).json({ error : " Password Mismatched.   "}) ;
        // }
    } 
    catch (error) {
        res.status(400).json({ error : "Credentials Already exists."}) ;
        console.log(error) ;

    }
}) ;

// checking the credentials 
app.post("/login", async(req,res)=>{

    try {
       const email = req.body.email  ;
       const password =req.body.password ;

       console.log( email);
       console.log(password) ;

       const userEmail = await Register.findOne({email}) ;
       const isMatch = await bcrypt.compare(password , userEmail.password ) ;

       const token = await userEmail.generateAuthToken() ;
       res.cookie("jwt",token ,{
        expires : new Date( Date.now() +600000 ) ,
        httpOnly : true // now the client will not be able delete the cookie ..
    }) ;


       if( isMatch ){
            // res.status(201).send({email ,password}) ;
            res.json({
                firstname : userEmail.firstname  ,
                lastname : userEmail.lastname ,
            }) ;
       }
       else {
        console.log("Invalid Password.") ;
        // res.send("Invalid Password.") ;
        res.status(401).json({ error : "Authentication failed"}) ;
       }
    } 
    catch (error) {
        console.log("Invalid Credentials") ;
        // res.send("Invalid Credentials") ;
        res.status(401).json({ error : "Authentication failed"}) ;
    }
}) ;

    app.get("/", (req,res)=> {
        res.render("home") ;
    });

    app.get("/secret", auth , (req,res)=> {
        res.render("secret") ;
    });

    app.get("/logout", auth , async(req,res)=>{
        try {
            req.user.tokens  =  req.user.tokens.filter( (currElement)=>{
                console.log( currElement.token) ;
                return currElement.token !== req.token 
            }) 

            // console.log(x) ;

            // req.user.tokens = []  ;
            
            res.clearCookie("jwt") ;
            await req.user.save() ;
            console.log("Logout Successfully..") ;
            res.render("logout") ;
        } catch (error) {
            res.status(500).send(error);
        }
    } ) ;

// app.get("/login", (req,res)=>{
//     res.render("login") ;
// } ) ;

// app.get("/register", (req,res)=>{
//     res.render("register") ;
// } ) ;

app.listen( port, ()=>{
    console.log(`server is running at port ${port}`) ;
}) ;
