const mongoose = require("mongoose")

let isConnected = false; {/* track the connection */}

async function connectToDB () {
    mongoose.set('strictQuery', true)
    
    if(isConnected) {
        console.log('MongoDB is already connected');
        return;
    }
    
    try {
        
        await mongoose.connect(process.env.MONGODB_URI,{
            dbName: "EazilyHired",
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })
        isConnected = true;
        console.log('Connected To MongoDB')
    } catch (error) {
        console.log(error)        
    }
}
module.exports = connectToDB;