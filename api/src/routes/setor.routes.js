import { Router } from "express";
import {
    listarSetores,
    criarSetor,
    buscarSetor,
    atualizarSetor,
    deletarSetor,
} from "../controllers/setor.controller.js"

export const setorRoutes = Router();

setorRoutes.get("/", listarSetores)
setorRoutes.post("/", criarSetor)
setorRoutes.get("/:id", buscarSetor)
setorRoutes.put("/:id", atualizarSetor)
setorRoutes.delete("/:id", deletarSetor)