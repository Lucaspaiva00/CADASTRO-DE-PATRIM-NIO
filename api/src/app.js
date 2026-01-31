import express from "express"
import cors from "cors"
import { setorRoutes } from "./routes/setor.routes.js"
import { patrimonioRoutes } from "./routes/patrimonio.routes.js"
import { errorMiddlewares } from "./middlewares/error.middlewares.js"
import { exportRoutes } from "./routes/export.routes.js";

export const app = express();

app.use(express.json())

app.use(cors({
    origin: "*"
}))

app.get("/health", (req, res) => res.json({ ok: true }));

app.use("/api/setores", setorRoutes)
app.use("/api/patrimonios", patrimonioRoutes)
app.use("/api/export", exportRoutes);
app.use(errorMiddlewares)
