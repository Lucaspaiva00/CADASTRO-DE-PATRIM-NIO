import { apiFetch, API_BASE } from "./api.js";
import { showToast, downloadFile, escapeHtml } from "./ui.js";

const tbody = document.getElementById("tbodyPatrimonios");
const statusLinha = document.getElementById("statusLinha");

const busca = document.getElementById("busca");
const filtroSetor = document.getElementById("filtroSetor");
const btnAtualizar = document.getElementById("btnAtualizar");
const btnNovo = document.getElementById("btnNovo");
const btnExportExcel = document.getElementById("btnExportExcel");

const modalEl = document.getElementById("modalPatrimonio");
const modal = new bootstrap.Modal(modalEl);

const form = document.getElementById("formPatrimonio");
const modalTitulo = document.getElementById("modalTitulo");
const inputId = document.getElementById("patrimonioId");
const inputNome = document.getElementById("nome");
const inputNi = document.getElementById("ni");
const inputStatus = document.getElementById("status");
const selectSetor = document.getElementById("setorId");

let cacheSetores = [];
let cachePatrimonios = [];

function formatDate(iso) {
    if (!iso) return "-";
    const d = new Date(iso);
    return d.toLocaleString("pt-BR");
}

function statusLabel(s) {
    const map = {
        ATIVO: "ATIVO",
        MANUTENCAO: "MANUTENÇÃO",
        BAIXADO: "BAIXADO",
    };
    return map[s] || s;
}

function render(pats) {
    tbody.innerHTML = "";

    pats.forEach((p) => {
        const setorNome = p?.setor?.nome || "-";
        const tr = document.createElement("tr");
        tr.innerHTML = `
      <td>${p.patrimonioid}</td>
      <td>${escapeHtml(p.nome)}</td>
      <td>${escapeHtml(p.ni)}</td>
      <td>${escapeHtml(setorNome)}</td>
      <td><span class="badge-status">${escapeHtml(statusLabel(p.status))}</span></td>
      <td>${formatDate(p.createdAt)}</td>
      <td class="d-flex gap-2">
        <button class="btn btn-sm btn-outline-light" data-action="edit" data-id="${p.patrimonioid}">Editar</button>
        <button class="btn btn-sm btn-outline-danger" data-action="del" data-id="${p.patrimonioid}">Excluir</button>
      </td>
    `;
        tbody.appendChild(tr);
    });

    statusLinha.textContent = `Total: ${pats.length}`;
}

async function carregarSetores() {
    cacheSetores = await apiFetch("/setores");
    // filtro de listagem
    filtroSetor.innerHTML = `<option value="">Todos os setores</option>` +
        cacheSetores.map(s => `<option value="${s.setorid}">${escapeHtml(s.nome)}</option>`).join("");

    // select do modal
    selectSetor.innerHTML = cacheSetores
        .map(s => `<option value="${s.setorid}">${escapeHtml(s.nome)}</option>`)
        .join("");

    if (!cacheSetores.length) {
        showToast("Cadastre ao menos 1 setor antes de criar patrimônios.", "warn");
    }
}

async function carregarPatrimonios() {
    const q = (busca.value || "").trim();
    const setorId = filtroSetor.value;

    const params = new URLSearchParams();
    if (q) params.set("q", q);
    if (setorId) params.set("setorId", setorId);

    const path = params.toString()
        ? `/patrimonios?${params.toString()}`
        : `/patrimonios`;

    cachePatrimonios = await apiFetch(path);
    render(cachePatrimonios);
}

async function carregarTudo() {
    try {
        statusLinha.textContent = "Carregando...";
        await carregarSetores();
        await carregarPatrimonios();
    } catch (e) {
        showToast(e.message, "error");
        statusLinha.textContent = "Erro ao carregar";
    }
}

btnAtualizar.addEventListener("click", carregarTudo);
busca.addEventListener("input", () => {
    // debounce simples
    clearTimeout(window.__t);
    window.__t = setTimeout(carregarPatrimonios, 350);
});
filtroSetor.addEventListener("change", carregarPatrimonios);

btnNovo.addEventListener("click", () => {
    modalTitulo.textContent = "Novo Patrimônio";
    inputId.value = "";
    inputNome.value = "";
    inputNi.value = "";
    inputStatus.value = "ATIVO";
    if (cacheSetores.length) selectSetor.value = String(cacheSetores[0].setorid);
    inputNome.focus();
});

tbody.addEventListener("click", async (e) => {
    const btn = e.target.closest("button");
    if (!btn) return;

    const id = Number(btn.dataset.id);
    const action = btn.dataset.action;

    if (action === "edit") {
        const p = cachePatrimonios.find(x => x.patrimonioid === id);
        if (!p) return;

        modalTitulo.textContent = `Editar Patrimônio #${id}`;
        inputId.value = id;
        inputNome.value = p.nome || "";
        inputNi.value = p.ni || "";
        inputStatus.value = p.status || "ATIVO";
        selectSetor.value = String(p.setorId);
        modal.show();
    }

    if (action === "del") {
        const ok = confirm("Deseja excluir este patrimônio?");
        if (!ok) return;

        try {
            await apiFetch(`/patrimonios/${id}`, { method: "DELETE" });
            showToast("Patrimônio excluído", "success");
            await carregarPatrimonios();
        } catch (err) {
            showToast(err.message, "error");
        }
    }
});

form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const nome = (inputNome.value || "").trim();
    const ni = (inputNi.value || "").trim();
    const status = inputStatus.value;
    const setorId = Number(selectSetor.value);

    if (!nome) return showToast("Informe o nome.", "warn");
    if (!ni) return showToast("Informe o NI.", "warn");
    if (!setorId) return showToast("Selecione um setor.", "warn");

    const id = inputId.value ? Number(inputId.value) : null;

    try {
        if (!id) {
            await apiFetch("/patrimonios", {
                method: "POST",
                body: JSON.stringify({ nome, ni, status, setorId }),
            });
            showToast("Patrimônio criado", "success");
        } else {
            await apiFetch(`/patrimonios/${id}`, {
                method: "PUT",
                body: JSON.stringify({ nome, ni, status, setorId }),
            });
            showToast("Patrimônio atualizado", "success");
        }

        modal.hide();
        await carregarPatrimonios();
    } catch (err) {
        showToast(err.message, "error");
    }
});

// Exportação Excel
btnExportExcel.addEventListener("click", async () => {
    try {
        await downloadFile(`${API_BASE}/export/patrimonios/excel`, "patrimonio.xlsx");

        showToast("Exportação iniciada", "success");
    } catch (e) {
        showToast("Endpoint de exportação não disponível ainda.", "warn");
    }
});

carregarTudo();
