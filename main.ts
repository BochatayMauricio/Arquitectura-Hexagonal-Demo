import express, { ErrorRequestHandler, NextFunction, Request, Response } from "express";
import dotenv from "dotenv";
import { sequelize } from "./src/Shared/DB/dbConnection";
import clientRouter from "./src/Infraestructure/Routers/Client.routes";
import vehicleRouter from "./src/Infraestructure/Routers/Vehicle.routes";
import reparationRouter from "./src/Infraestructure/Routers/Reparation.routes";

dotenv.config();
const app = express();
express.json();

//Middlewares
var cors = require('cors');
app.use(express.json());
app.use(cors());


//test connection DB
try{
  sequelize.authenticate();
  console.log("Connection has been established successfully.");
}
catch(error){
  console.log("Error: ", error);
}

//create tables
sequelize.sync({alter:true});

//Server
const PORT = process.env.PORT;

app.get("/", (request: Request, response: Response) => { 
  
  response.status(200).send("Hello World");
}); 

app.listen(PORT, () => { 
  console.log("Server running at PORT: ", PORT); 
})
.on("error", (error: Error) => {
  console.log("Error: ", error.message);
});

//Routes
app.use("/client",clientRouter);
app.use("/vehicle",vehicleRouter);
app.use("/reparation",reparationRouter);