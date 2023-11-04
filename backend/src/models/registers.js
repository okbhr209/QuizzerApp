const mongoose = require("mongoose") ;
const bcrypt =require("bcryptjs") ;
const jwt =require("jsonwebtoken") ;

const employeeSchema =  new mongoose.Schema( {

    firstname : {
        type : String ,
        required :true 
    } ,
    lastname :{
        type : String ,
        required :true 
    } ,
    email : {
        type:String ,
        required:true ,
        unique :true 
    },
    gender :{
        type : String ,
        required :true 
    },
    phone : {
        type:Number ,
        required:true ,
        unique :true 
    },
    password :{
        type : String ,
        required :true 
    },
    confirmpassword :{
        type : String ,
        required :true 
    } ,
    tokens: [{
        token:{
            type:String ,
            required: true 
        }
    }]

}) ;
//again another middleware
employeeSchema.methods.generateAuthToken= async function(req,res){
    try{
        const token =   jwt.sign({_id:this._id.toString() } , process.env.SECRET) ;
        this.tokens =   this.tokens.concat({token:token}) ;

        // console.log(token) ;
        await this.save() ;
        return token ;
    }
    catch(err){
        res.send(err) ;
    }
} ;

//middleware
employeeSchema.pre( "save" , async function(next){
//this part is where i got stucj for a very long time ...
    if( this.isModified("password") ){
        this.password = await  bcrypt.hash( this.password ,12 ) ;
        this.confirmpassword = await  bcrypt.hash( this.confirmpassword ,12 ) ;

        // this.confirmpassword = undefined ;// no need to store this attribute in the database from now onwards.
    }
    next() ;
}) ;


const Register = new mongoose.model("Register" , employeeSchema ) ;
module.exports = Register ;