import { ayudas } from './ayudas.js';

export function mostrarModalAyuda(titulo) {
  const mensaje = ayudas[titulo] || 'No se ha definido ayuda para esta sección.';
  document.getElementById('modalTitulo').textContent = `🛈 ${titulo}`;
  document.getElementById('modalContenido').textContent = mensaje;
  document.getElementById('modalAyuda').style.display = 'block';
}

export function cerrarModalAyuda() {
  document.getElementById('modalAyuda').style.display = 'none';
}

export function limpiarTodo(setVision, setObjetivos, renderObjetivos) {
  if (!confirm("¿Seguro que deseas limpiar todo? Se perderán los cambios no guardados.")) return;
  setVision("");
  setObjetivos([]);
  document.getElementById("visionGeneral").value = "";
  document.getElementById("fileName").textContent = "";
  renderObjetivos();
}


export function cleanFileName(str) {
  return (str || '')
    .toString()
    .normalize("NFD").replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-zA-Z0-9]+/g, '_')
    .replace(/^_+|_+$/g, '')
    .replace(/_+/g, '_')
    .toLowerCase();
}

export function javaClassName(str) {
  // Convierte a PascalCase y quita .java si lo tiene
  return (str || "")
    .replace(/\.java$/i, "")
    .replace(/(^|_|\s|-)(\w)/g, (_, __, c) => c ? c.toUpperCase() : "")
    .replace(/[^a-zA-Z0-9]/g, "");
}

