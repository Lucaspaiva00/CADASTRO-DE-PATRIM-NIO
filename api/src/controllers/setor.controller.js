import { prisma } from "../prisma.js";

export async function listarSetores(req, res, next) {
    try {
        const setores = await prisma.setor.findMany({
            orderBy: { setorid: "desc" },
        });
        return res.json(setores);
    } catch (e) { next(e); }
}

export async function criarSetor(req, res, next) {
    try {
        const { nome } = req.body;
        if (!nome || !nome.trim()) {
            return res.status(400).json({ error: "nome é obrigatório" });
        }

        const setor = await prisma.setor.create({
            data: { nome: nome.trim() },
        });

        return res.status(201).json(setor);
    } catch (e) { next(e); }
}

export async function buscarSetor(req, res, next) {
    try {
        const id = Number(req.params.id);
        const setor = await prisma.setor.findUnique({
            where: { setorid: id },
        });

        if (!setor) return res.status(404).json({ error: "Setor não encontrado" });
        return res.json(setor);
    } catch (e) { next(e); }
}

export async function atualizarSetor(req, res, next) {
    try {
        const id = Number(req.params.id);
        const { nome } = req.body;

        const existe = await prisma.setor.findUnique({ where: { setorid: id } });
        if (!existe) return res.status(404).json({ error: "Setor não encontrado" });

        if (!nome || !nome.trim()) {
            return res.status(400).json({ error: "nome é obrigatório" });
        }

        const setor = await prisma.setor.update({
            where: { setorid: id },
            data: { nome: nome.trim() },
        });

        return res.json(setor);
    } catch (e) { next(e); }
}

export async function deletarSetor(req, res, next) {
    try {
        const id = Number(req.params.id);

        // regra de negócio (boa pra banca)
        const total = await prisma.patrimonio.count({
            where: { setorId: id },
        });

        if (total > 0) {
            return res.status(400).json({
                error: "Não é possível excluir: setor possui patrimônios vinculados.",
            });
        }

        await prisma.setor.delete({ where: { setorid: id } });
        return res.status(204).send();
    } catch (e) { next(e); }
}
