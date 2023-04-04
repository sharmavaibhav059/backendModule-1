import { Sequelize } from "sequelize";

const sequelize = new Sequelize('app',"","",{
    host:"localhost",
    dialect:"sqlite",
    storage:"./database.sqlite3",
    logging:false
})

export default sequelize