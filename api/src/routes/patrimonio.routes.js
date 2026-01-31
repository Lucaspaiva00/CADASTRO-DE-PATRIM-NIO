import { Router } from "express";
import {
    listarPatrimonios,
    criarPatrimonio,
    buscarPatrimonio,
    atualizarPatrimonio,
    deletarPatrimonio,
} from "../controllers/patrimonio.controller.js"

export const patrimonioRoutes = Router();

patrimonioRoutes.get("/", listarPatrimonios);
patrimonioRoutes.post("/", criarPatrimonio);
patrimonioRoutes.get("/:id", buscarPatrimonio);
patrimonioRoutes.put("/:id", atualizarPatrimonio);
patrimonioRoutes.delete("/:id", deletarPatrimonio);