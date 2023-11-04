const mongoose =require("mongoose") ;

mongoose.connect( "mongodb://127.0.0.1:27017/empReg" , {
//     useCreateIndex: true,
//     useNewUrlParser:true,
//     useUnifiedTopology:true,
//    useFindAndModify :false

}) .then( ()=>{
    console.log("connction established..") ;
}).catch( (e)=>{
    console.log("not connected");
}) ;
 
