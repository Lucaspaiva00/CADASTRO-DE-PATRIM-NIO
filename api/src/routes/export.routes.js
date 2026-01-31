import { Router } from "express";
import {
    exportSetoresExcel,
    exportPatrimoniosExcel,
} from "../controllers/export.controller.js";

export const exportRoutes = Router();

exportRoutes.get("/setores/excel", exportSetoresExcel);
exportRoutes.get("/patrimonios/excel", exportPatrimoniosExcel);
