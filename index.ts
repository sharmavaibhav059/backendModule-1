import express,{Response, Request} from "express"
import authUser from "./routes/auth"
import faculty from "./routes/faculty"

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
const PORT = 8080;
app.use("/", authUser)
app.use("/facultyApi",faculty)
app.listen(PORT,()=>{
    console.log("Server is listening at port 8080");
})