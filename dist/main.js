"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const dbConnection_1 = require("./src/Shared/DB/dbConnection");
const Client_routes_1 = __importDefault(require("./src/Infraestructure/Routers/Client.routes"));
const Vehicle_routes_1 = __importDefault(require("./src/Infraestructure/Routers/Vehicle.routes"));
const Reparation_routes_1 = __importDefault(require("./src/Infraestructure/Routers/Reparation.routes"));
dotenv_1.default.config();
const app = (0, express_1.default)();
express_1.default.json();
//Middlewares
var cors = require('cors');
app.use(express_1.default.json());
app.use(cors());
//test connection DB
try {
    dbConnection_1.sequelize.authenticate();
    console.log("Connection has been established successfully.");
}
catch (error) {
    console.log("Error: ", error);
}
//create tables
dbConnection_1.sequelize.sync({ alter: true });
//Server
const PORT = process.env.PORT;
app.get("/", (request, response) => {
    response.status(200).send("Hello World");
});
app.listen(PORT, () => {
    console.log("Server running at PORT: ", PORT);
})
    .on("error", (error) => {
    console.log("Error: ", error.message);
});
//Routes
app.use("/client", Client_routes_1.default);
app.use("/vehicle", Vehicle_routes_1.default);
app.use("/reparation", Reparation_routes_1.default);
