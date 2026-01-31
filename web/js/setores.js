import { apiFetch, API_BASE } from "./api.js";
import { showToast, downloadFile, escapeHtml } from "./ui.js";

const tbody = document.getElementById("tbodySetores");
const filtroNome = document.getElementById("filtroNome");
const statusLinha = document.getElementById("statusLinha");

const modalEl = document.getElementById("modalSetor");
const modal = new bootstrap.Modal(modalEl);

const form = document.getElementById("formSetor");
const modalTitulo = document.getElementById("modalTitulo");
const inputId = document.getElementById("setorId");
const inputNome = document.getElementById("nome");

const btnAtualizar = document.getElementById("btnAtualizar");
const btnNovo = document.getElementById("btnNovo");
const btnExportExcel = document.getElementById("btnExportExcel");

let cacheSetores = [];

function formatDate(iso) {
    if (!iso) return "-";
    const d = new Date(iso);
    return d.toLocaleString("pt-BR");
}

function render(setores) {
    tbody.innerHTML = "";

    setores.forEach((s) => {
        const tr = document.createElement("tr");
        tr.innerHTML = `
      <td>${s.setorid}</td>
      <td>${escapeHtml(s.nome)}</td>
      <td>${formatDate(s.createdAt)}</td>
      <td class="d-flex gap-2">
        <button class="btn btn-sm btn-outline-light" data-action="edit" data-id="${s.setorid}">Editar</button>
        <button class="btn btn-sm btn-outline-danger" data-action="del" data-id="${s.setorid}">Excluir</button>
      </td>
    `;
        tbody.appendChild(tr);
    });

    statusLinha.textContent = `Total: ${setores.length}`;
}

async function carregar() {
    try {
        statusLinha.textContent = "Carregando...";
        const setores = await apiFetch("/setores");
        cacheSetores = setores;
        applyFilter();
    } catch (e) {
        showToast(e.message, "error");
        statusLinha.textContent = "Erro ao carregar";
    }
}

function applyFilter() {
    const q = (filtroNome.value || "").trim().toLowerCase();
    const filtered = !q
        ? cacheSetores
        : cacheSetores.filter(s => (s.nome || "").toLowerCase().includes(q));
    render(filtered);
}

btnAtualizar.addEventListener("click", carregar);
filtroNome.addEventListener("input", applyFilter);

btnNovo.addEventListener("click", () => {
    modalTitulo.textContent = "Novo Setor";
    inputId.value = "";
    inputNome.value = "";
    inputNome.focus();
});

tbody.addEventListener("click", async (e) => {
    const btn = e.target.closest("button");
    if (!btn) return;

    const id = Number(btn.dataset.id);
    const action = btn.dataset.action;

    if (action === "edit") {
        const setor = cacheSetores.find(s => s.setorid === id);
        if (!setor) return;

        modalTitulo.textContent = `Editar Setor #${id}`;
        inputId.value = id;
        inputNome.value = setor.nome || "";
        modal.show();
    }

    if (action === "del") {
        const ok = confirm("Deseja excluir este setor?");
        if (!ok) return;

        try {
            await apiFetch(`/setores/${id}`, { method: "DELETE" });
            showToast("Setor excluído", "success");
            await carregar();
        } catch (err) {
            showToast(err.message, "error");
        }
    }
});

form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const nome = (inputNome.value || "").trim();
    if (!nome) return showToast("Informe o nome do setor.", "warn");

    const id = inputId.value ? Number(inputId.value) : null;

    try {
        if (!id) {
            await apiFetch("/setores", {
                method: "POST",
                body: JSON.stringify({ nome }),
            });
            showToast("Setor criado com sucesso", "success");
        } else {
            await apiFetch(`/setores/${id}`, {
                method: "PUT",
                body: JSON.stringify({ nome }),
            });
            showToast("Setor atualizado com sucesso", "success");
        }

        modal.hide();
        await carregar();
    } catch (err) {
        showToast(err.message, "error");
    }
});

// Exportação Excel (front)
btnExportExcel.addEventListener("click", async () => {
    try {
        await downloadFile(`${API_BASE}/export/setores/excel`, "setores.xlsx");

        showToast("Exportação iniciada", "success");
    } catch (e) {
        showToast("Endpoint de exportação não disponível ainda.", "warn");
    }
});

carregar();
