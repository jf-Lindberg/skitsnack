import express from "express";
import {v1Router} from "./routes/v1/v1.router";

const api = express.Router();
api.use('/v1', v1Router);

export {api};
