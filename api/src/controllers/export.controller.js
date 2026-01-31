import ExcelJS from "exceljs";
import { prisma } from "../prisma.js";

function setDownloadHeaders(res, filename) {
    res.setHeader(
        "Content-Type",
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    );
    res.setHeader("Content-Disposition", `attachment; filename="${filename}"`);
    // evita cache na demo
    res.setHeader("Cache-Control", "no-store");
}

export async function exportSetoresExcel(req, res, next) {
    try {
        const setores = await prisma.setor.findMany({
            orderBy: { setorid: "asc" },
        });

        const wb = new ExcelJS.Workbook();
        wb.creator = "Cadastro de Patrimônio";
        wb.created = new Date();

        const ws = wb.addWorksheet("Setores");

        ws.columns = [
            { header: "ID", key: "id", width: 10 },
            { header: "Nome", key: "nome", width: 35 },
            { header: "Criado em", key: "createdAt", width: 22 },
        ];

        ws.getRow(1).font = { bold: true };

        for (const s of setores) {
            ws.addRow({
                id: s.setorid,
                nome: s.nome,
                createdAt: s.createdAt ? new Date(s.createdAt) : null,
            });
        }

        ws.getColumn("createdAt").numFmt = "dd/mm/yyyy hh:mm";

        setDownloadHeaders(res, "setores.xlsx");
        await wb.xlsx.write(res);
        res.end();
    } catch (e) {
        next(e);
    }
}

export async function exportPatrimoniosExcel(req, res, next) {
    try {
        const patrimonios = await prisma.patrimonio.findMany({
            include: { setor: true },
            orderBy: { patrimonioid: "asc" },
        });

        const wb = new ExcelJS.Workbook();
        wb.creator = "Cadastro de Patrimônio";
        wb.created = new Date();

        const ws = wb.addWorksheet("Patrimonios");

        ws.columns = [
            { header: "ID", key: "id", width: 10 },
            { header: "Nome", key: "nome", width: 35 },
            { header: "NI", key: "ni", width: 18 },
            { header: "Status", key: "status", width: 14 },
            { header: "Setor", key: "setor", width: 28 },
            { header: "Criado em", key: "createdAt", width: 22 },
        ];

        ws.getRow(1).font = { bold: true };

        for (const p of patrimonios) {
            ws.addRow({
                id: p.patrimonioid,
                nome: p.nome,
                ni: p.ni,
                status: p.status,
                setor: p?.setor?.nome || "",
                createdAt: p.createdAt ? new Date(p.createdAt) : null,
            });
        }

        ws.getColumn("createdAt").numFmt = "dd/mm/yyyy hh:mm";

        setDownloadHeaders(res, "patrimonios.xlsx");
        await wb.xlsx.write(res);
        res.end();
    } catch (e) {
        next(e);
    }
}
