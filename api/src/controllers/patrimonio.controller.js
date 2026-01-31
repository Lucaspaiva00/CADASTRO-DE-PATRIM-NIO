import { prisma } from "../prisma.js";

const STATUS_VALIDOS = ["ATIVO", "MANUTENCAO", "BAIXADO"];

export async function listarPatrimonios(req, res, next) {
    try {
        const { setorId, q } = req.query;

        const where = {};

        if (setorId) where.setorId = Number(setorId);

        if (q && String(q).trim()) {
            const query = String(q).trim();
            where.OR = [
                { nome: { contains: query } },
                { ni: { contains: query } },
            ];
        }

        const itens = await prisma.patrimonio.findMany({
            where,
            include: { setor: true },
            orderBy: { patrimonioid: "desc" },
        });

        return res.json(itens);
    } catch (e) { next(e); }
}

export async function criarPatrimonio(req, res, next) {
    try {
        const { nome, ni, setorId, status } = req.body;

        if (!nome || !nome.trim()) return res.status(400).json({ error: "nome é obrigatório" });
        if (!ni || !ni.trim()) return res.status(400).json({ error: "ni é obrigatório" });
        if (!setorId) return res.status(400).json({ error: "setorId é obrigatório" });

        const st = status ? String(status).toUpperCase() : "ATIVO";
        if (!STATUS_VALIDOS.includes(st)) {
            return res.status(400).json({ error: `status inválido. Use: ${STATUS_VALIDOS.join(", ")}` });
        }

        // valida setor existente
        const setor = await prisma.setor.findUnique({ where: { setorid: Number(setorId) } });
        if (!setor) return res.status(404).json({ error: "Setor não encontrado" });

        const item = await prisma.patrimonio.create({
            data: {
                nome: nome.trim(),
                ni: ni.trim(),
                setorId: Number(setorId),
                status: st,
            },
            include: { setor: true },
        });

        return res.status(201).json(item);
    } catch (e) { next(e); }
}

export async function buscarPatrimonio(req, res, next) {
    try {
        const id = Number(req.params.id);

        const item = await prisma.patrimonio.findUnique({
            where: { patrimonioid: id },
            include: { setor: true },
        });

        if (!item) return res.status(404).json({ error: "Patrimônio não encontrado" });
        return res.json(item);
    } catch (e) { next(e); }
}

export async function atualizarPatrimonio(req, res, next) {
    try {
        const id = Number(req.params.id);
        const { nome, ni, setorId, status } = req.body;

        const existe = await prisma.patrimonio.findUnique({ where: { patrimonioid: id } });
        if (!existe) return res.status(404).json({ error: "Patrimônio não encontrado" });

        if (!nome || !nome.trim()) return res.status(400).json({ error: "nome é obrigatório" });
        if (!ni || !ni.trim()) return res.status(400).json({ error: "ni é obrigatório" });
        if (!setorId) return res.status(400).json({ error: "setorId é obrigatório" });

        const st = status ? String(status).toUpperCase() : existe.status;
        if (!STATUS_VALIDOS.includes(st)) {
            return res.status(400).json({ error: `status inválido. Use: ${STATUS_VALIDOS.join(", ")}` });
        }

        const setor = await prisma.setor.findUnique({ where: { setorid: Number(setorId) } });
        if (!setor) return res.status(404).json({ error: "Setor não encontrado" });

        const item = await prisma.patrimonio.update({
            where: { patrimonioid: id },
            data: {
                nome: nome.trim(),
                ni: ni.trim(),
                setorId: Number(setorId),
                status: st,
            },
            include: { setor: true },
        });

        return res.json(item);
    } catch (e) { next(e); }
}

export async function deletarPatrimonio(req, res, next) {
    try {
        const id = Number(req.params.id);

        await prisma.patrimonio.delete({ where: { patrimonioid: id } });
        return res.status(204).send();
    } catch (e) { next(e); }
}
