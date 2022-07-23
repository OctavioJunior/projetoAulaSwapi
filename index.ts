import cors from "cors";
import express from "express";
import { config } from "dotenv";

import routes from "./src/routes/routes";

const app = express();

config({ path: ".env" });

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

app.use("/", routes);

app.listen(process.env.PORT, () => {
    console.log(`Servidor iniciado na porta ${process.env.PORT}`);
});
