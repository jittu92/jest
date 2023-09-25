const mongoose = require("mongoose");

mongoose.connect(process.env.MONGODB_URI, {dbName:process.env.MONGO_DATABASE}).then(()=>{
    console.log("Connected to MongoDB");
}).catch((e)=>{
    console.log(`Unable to connect to db ${e}`);
});
