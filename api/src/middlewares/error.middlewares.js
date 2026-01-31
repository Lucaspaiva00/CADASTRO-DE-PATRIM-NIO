export function errorMiddlewares(err, req, res, net) {
    console.error(err);

    if (err?.code === "P2002") {
        return res.status(409).json({ error: "Resgistro duplicado (campo único)." })
    }

    return res.status(err.status || 500).json({
        error: err.message || "Erro interno do servidor"
    })

}
// Foca em erros comuns
// P2002 = unique constraint