import express,{Response, Request} from "express"
import authUser from "./routes/auth"
import faculty from "./routes/faculty"
import cors from "cors"

import sequelize from "./models/indexModels";

// (async()=>{
//     try {
//         await sequelize.authenticate();
//         console.log('database connected');
//     } catch (error) {
//         console.log(error);        
//     } 
// })
sequelize.authenticate().then(()=>{
    try {
        sequelize.sync();
        console.log("database (re)connected");
        
    } catch (erro) {
        console.log(erro);
        
    }
})
const app =express();
app.use(express.json())


const allowedOrigins = ['http://localhost:3000'];

const options: cors.CorsOptions = {
  origin: allowedOrigins
};

// Then pass these options to cors:
app.use(cors(options));
const PORT = 8080;
app.use("/api", authUser)
app.use("/facultyApi",faculty)
app.listen(PORT,()=>{
    console.log("Server is listening at port 8080");
})