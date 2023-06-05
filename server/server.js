import express from 'express' /**Import cmd works when we add "type": "module" in JASON file */
import cors from 'cors';
import morgan from 'morgan';
import connect from './Database/conn.js' /**MAke sure to add .js */
import router from './router/route.js'

const app = express();

/** middlewares - The middleware in node. js is a function that will have all the access for requesting an object, responding to an object, and moving to the next middleware function in the application request-response cycle. */
app.use(express.json());
app.use(cors());
app.use(morgan('tiny'));
app.disable('x-powered-by'); // less hackers know about our stack

const port = 8080;

/** HTTP GET Request */
app.get('/', (req, res) => {
    res.status(201).json("Home GET Request");
});

/**API routes */
app.use('/api', router) /**Whenever you want to access the routes you need to specify api prefix */

/**Start Server only when we have valid conncetion*/
connect().then(()=>{ //Successful promise then func m aata h aur else catch m (connect m promise aata h )

    try {
        app.listen(port, ()=>{
            console.log(`Server connected to http://localhost:${port}`)
        })
    } catch (error) {
        console.log(`Cannot connect to the server`)
    }
}).catch(error =>{
    console.log("Invalid Database connection")
})