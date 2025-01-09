import express from "express";
import { create, deleteUser, getAllUser, getOneUser, updateUser } from "../controller/userController.js";

const route=express.Router();
route.post("/create",create);
route.get("/getAllUser",getAllUser);
route.get("/getOneUser/:id",getOneUser);
route.put("/updateUser/:id",updateUser);
route.delete("/deleteUser/:id",deleteUser);
export default route;