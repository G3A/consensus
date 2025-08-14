import { ayudas } from './ayudas.js';
import { demoGestionConocimientos, demoInventarios, cargarDemoDesdeJson } from './demos.js';

export function mostrarModalAyuda(titulo) {
  const mensaje = ayudas[titulo] || 'No se ha definido ayuda para esta sección.';
  document.getElementById('modalTitulo').textContent = `🛈 ${titulo}`;
  document.getElementById('modalContenido').textContent = mensaje;
  document.getElementById('modalAyuda').style.display = 'block';
}

export function cerrarModalAyuda() {
  document.getElementById('modalAyuda').style.display = 'none';
}

export function limpiarTodo() {
  if (!confirm("¿Seguro que deseas limpiar todo? Se perderán los cambios no guardados.")) return;
  vision = "";
  objetivos = [];
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

export function javaPackage(str) {
  // Convierte a minúsculas y puntos
  return (str || "")
    .replace(/[^a-zA-Z0-9]+/g, ".")
    .replace(/^\.+|\.+$/g, "")
    .replace(/\.+/g, ".")
    .toLowerCase();
}

export function javaClassName(str) {
  // Convierte a PascalCase y quita .java si lo tiene
  return (str || "")
    .replace(/\.java$/i, "")
    .replace(/(^|_|\s|-)(\w)/g, (_, __, c) => c ? c.toUpperCase() : "")
    .replace(/[^a-zA-Z0-9]/g, "");
}

export function toggleSection(btn, bodyId) {
  const body = document.getElementById(bodyId);
  if (body.style.display === "none") {
    body.style.display = "";
    btn.textContent = "▼";
    btn.setAttribute("aria-expanded", "true");
  } else {
    body.style.display = "none";
    btn.textContent = "►";
    btn.setAttribute("aria-expanded", "false");
  }
}

export function toCamelCaseStep(prefix, text) {
  // Quita palabras Gherkin y espacios extra
  let clean = text.trim()
    .replace(/^(Given|When|Then|And|Y|Pero)\s+/i, '')
    .replace(/[^a-zA-Z0-9áéíóúÁÉÍÓÚüÜñÑ ]/g, '')
    .replace(/\s+/g, ' ')
    .trim();

  // Elimina acentos y reemplaza ñ/Ñ por nn/NN
  clean = clean.normalize("NFD")
    .replace(/[\u0300-\u036f]/g, '') // quita acentos
    .replace(/ñ/g, 'nn')
    .replace(/Ñ/g, 'NN');

  let words = clean.split(' ');
  let camel = words.map((w, i) => {
    if (i === 0) return w.charAt(0).toLowerCase() + w.slice(1);
    return w.charAt(0).toUpperCase() + w.slice(1);
  }).join('');
  return prefix + camel.charAt(0).toUpperCase() + camel.slice(1);
}




