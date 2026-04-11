const mongoose = require("mongoose");

const connectDB =async()=>{
    try{
        await mongoose.connect(process.env.MONGO_URL);
        console.log("Connected to database successfully");
    }catch(error){
        console.log("MongoDb server failed ");
        console.error(error.message);
        process.exit(1);
    }
};


module.exports =connectDB;


//The configuration of database ie establishing a connectino between the database and our backend 

