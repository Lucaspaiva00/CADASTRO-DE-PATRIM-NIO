export function showToast(message, type = "info") {
    const container = document.getElementById("toastContainer");
    if (!container) return alert(message);

    const id = `t_${Date.now()}`;
    const colors = {
        success: "text-bg-success",
        error: "text-bg-danger",
        info: "text-bg-primary",
        warn: "text-bg-warning",
    };

    const div = document.createElement("div");
    div.className = `toast align-items-center ${colors[type] || colors.info}`;
    div.id = id;
    div.role = "alert";
    div.ariaLive = "assertive";
    div.ariaAtomic = "true";
    div.innerHTML = `
    <div class="d-flex">
      <div class="toast-body">${escapeHtml(message)}</div>
      <button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast"></button>
    </div>
  `;

    container.appendChild(div);
    const toast = new bootstrap.Toast(div, { delay: 2600 });
    toast.show();

    div.addEventListener("hidden.bs.toast", () => div.remove());
}

export function escapeHtml(str) {
    return String(str)
        .replaceAll("&", "&amp;")
        .replaceAll("<", "&lt;")
        .replaceAll(">", "&gt;")
        .replaceAll('"', "&quot;")
        .replaceAll("'", "&#039;");
}

// para exportação excel (download via fetch)
export async function downloadFile(url, filename) {
    const res = await fetch(url);
    if (!res.ok) throw new Error("Falha ao baixar arquivo");
    const blob = await res.blob();
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(a.href);
}
