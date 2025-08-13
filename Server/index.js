import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import { router } from "./routes/routeSearchCnpj.js";

dotenv.config()

const app = express();
app.use(cors());
app.use(express.json());

const PORT = 5000;

app.get("/", (req, res) => {
    res.send("API is working")    
});

app.use('/api', router)

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
