import mongoose from "mongoose";

import { MongoMemoryServer } from "mongodb-memory-server";


async function connect(){

    const mongod = await MongoMemoryServer.create(); //Craete nnew mongo db instance when you start the server
    const getUri = mongod.getUri(); //getUri will contain mongo db url

    mongoose.set('strictQuery', true)    
    const db = await mongoose.connect(getUri);
    console.log("Database Connected")
    return db;
}

export default connect;