import express from 'express';
import logger from 'morgan';
import path from 'path';
import Hotel from './router/HotelRouter.js';
import Admin from './router/AdminRouter.js';
import User from './router/UserRouter.js';
import Owner from './router/ownerRouter.js';
const port = 4000;
import * as mongooseDef from "mongoose";
let mongoose = mongooseDef.default;
let   dbURI = 'mongodb://localhost:27017/myDB';
const config = {
    database: dbURI,
    userMongoClient: true,
    connectOptions: {   useNewUrlParser: true,
                        useUnifiedTopology: true,
                        useCreateIndex:true,
                        useFindAndModify: false
                    }
}
mongoose.connect(config.database, config.connectOptions);
mongoose.connection.on("connected", () => {
    console.log("Connected to database " + config.database);
});
mongoose.connection.on("error", (err) => {
    console.log("Database error");
});
mongoose.connection.on("disconnected", () => 
console.log("Disconnected from " + config.database));
process.on("SIGINT", function () {
    mongoose.connection.close(function () {
        console.log("Disconnected from " + config.database + " through app termination");
        process.exit(0);
    });
});

const errorHandler = (err, req, res, next) => {
    if (res.headersSent) {
        return next();
    }
    res.status(500).json({ error: err });
}
var app = express();
app.use('/public', express.static(path.join(process.cwd(), 'Public')));
app.use(logger("short"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json({limit: "50mb", extended: false, parameterLimit:50000}));
app.use(express.urlencoded({limit: "50mb", extended: false, parameterLimit:50000}));
app.use(errorHandler);
app.use('/hotel' , Hotel);
app.use('/admin', Admin);
app.use('/user', User);
app.use('/owner', Owner);
app.get('/', (req, res) => {
    res.send("Invalid Endport");
})
app.get('/', (req, res)=> res.status(404).send("Not Found"));

app.listen(port, ()=> console.log(`Start http server at port: ${port}`));