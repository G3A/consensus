import { renderObjetivos, 
         renderFuncionalidad,
		 renderHistoria, 
		 renderCriterioBasico,
		 renderPruebasUnitarias,
		 renderDisenoTecnicoCriterio} from './render.js';
import { mostrarModalAyuda,
         cerrarModalAyuda,
         javaPackage,
         javaClassName, 
         toggleSection,
         cleanFileName,
         toCamelCaseStep} from './helpers.js';
import { demoGestionConocimientos, demoInventarios, cargarDemoDesdeJson } from './demos.js';         
//import { agregarObjetivo } from './agregarSeccion.js';

// Variables globales
let vision = "";
let objetivos = [];

// Asigna funciones globales para los onclick del HTML
window.mostrarModalAyuda = mostrarModalAyuda;
window.cerrarModalAyuda = cerrarModalAyuda;
window.limpiarTodo = function limpiarTodo() {
  if (!confirm("¿Seguro que deseas limpiar todo? Se perderán los cambios no guardados.")) return;
  vision = "";
  objetivos = [];
  document.getElementById("visionGeneral").value = "";
  document.getElementById("fileName").textContent = "";
  renderObjetivos(vision,objetivos);
};
window.toggleSection = toggleSection;
window.cargarDemoSeleccionado = function cargarDemoSeleccionado() {
  const demo = document.getElementById("demoSelector").value;
  if (!demo) return;
  if (!confirm("¿Seguro que deseas cargar este demo? Se perderán los cambios no guardados.")) {
    document.getElementById("demoSelector").value = "";
    return;
  }
  if (demo === "gestionConocimientos") cargarDemoDesdeJson(demoGestionConocimientos, v => vision = v, o => objetivos = o, () => renderObjetivos(vision, objetivos));
  if (demo === "inventarios") cargarDemoDesdeJson(demoInventarios, v => vision = v, o => objetivos = o, () => renderObjetivos(vision, objetivos));
  document.getElementById("demoSelector").value = "";
};
window.cargarTrabajo = function cargarTrabajo(input) {
  const file = input.files[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = function(e) {
    const data = JSON.parse(e.target.result);
    vision = data.vision || '';
    document.getElementById("visionGeneral").value = vision;
    // REEMPLAZA el array, no lo sumes
    objetivos = Array.isArray(data.objetivos_de_negocio) ? data.objetivos_de_negocio : [];
    renderObjetivos(vision,objetivos);
  };
  reader.readAsText(file);
}



// Inicializa la app
window.onload = () => {
  renderObjetivos(vision, objetivos);
  document.getElementById('fileInput').addEventListener('change', function() {
    document.getElementById('fileName').textContent = this.files[0] ? this.files[0].name : '';
  });
};


window.agregarObjetivo= function agregarObjetivo(obj = null) {
  if (!obj) {
    objetivos.push({
      id: "",
      descripcion: "",
      kpi: "",
      prioridad: "",
      responsable: "",
      estado: "",
      notas: "",
      funcionalidades: []
    });
  } else {
    objetivos.push(obj);
  }
  renderObjetivos(vision, objetivos);
}

window.borrarObjetivo= function borrarObjetivo(idx) {
  if (!confirm("¿Seguro que deseas borrar este objetivo de negocio y todo su contenido?")) return;
  objetivos.splice(idx, 1);
  renderObjetivos(vision, objetivos);
}


window.agregarFuncionalidad= function agregarFuncionalidad(objetivoIdx, func = null) {
  let id;
  let data;
  if (!func) {
    data = {
      id: '',
      nombre: '',
      actor: '',
      impacto: '',
      tags: '',
      estado: '',
      responsable: '',
      notas: '',
      enlace_doc: '',
      background: '',
      historias: []
    };
    id = objetivos[objetivoIdx].funcionalidades.length;
    objetivos[objetivoIdx].funcionalidades.push(data);
  } else {
    data = func;
    id = objetivos[objetivoIdx].funcionalidades.indexOf(func);
    if (id === -1) id = objetivos[objetivoIdx].funcionalidades.length;
  }
  renderFuncionalidad(objetivoIdx, data, id);
}



window.borrarFuncionalidad= function borrarFuncionalidad(objetivoIdx, funcId) {
  if (!confirm("¿Seguro que deseas borrar esta funcionalidad y todo su contenido?")) return;
  objetivos[objetivoIdx].funcionalidades.splice(funcId, 1);
  renderObjetivos(vision, objetivos);
}

window.agregarHistoria= function agregarHistoria(objetivoIdx, funcId, historia = null) {
  const idx = objetivos[objetivoIdx].funcionalidades[funcId].historias.length;
  let data;
  if (!historia) {
    data = {
      id: '',
      descripcion: '',
      package: '',
      dependencias: '',
      estado: '',
      responsable: '',
      notas: '',
      criterios: []
    };
    objetivos[objetivoIdx].funcionalidades[funcId].historias.push(data);
  } else {
    data = historia;
  }
  renderHistoria(objetivoIdx, funcId, data, idx);
}


window.borrarHistoria= function borrarHistoria(objetivoIdx, funcId, histId) {
  if (!confirm("¿Seguro que deseas borrar esta historia y todo su contenido?")) return;
  objetivos[objetivoIdx].funcionalidades[funcId].historias.splice(histId, 1);
  renderObjetivos(vision, objetivos);
}


window.agregarCriterio= function agregarCriterio(objetivoIdx, funcId, histId, criterio = null) {
  const contenedor = document.getElementById(`criterios-${objetivoIdx}-${funcId}-${histId}`);
  const data = crearDataCriterio(criterio);
  objetivos[objetivoIdx].funcionalidades[funcId].historias[histId].criterios.push(data);

  const div = document.createElement("div");
  div.className = "section";
  div.style.borderColor = "#6f42c1";
  const uniqueId = Math.random().toString(36).substr(2, 9);

  div.innerHTML = `
    <div class="crit-header">
      <h5>
        📝 Criterio de Aceptación
        <span class="tooltip-icon" onclick="mostrarModalAyuda('Comentario Criterio de Aceptación')">❓</span>
      </h5>
      <div>
        <button class="expand-btn" aria-expanded="true" onclick="toggleSection(this, 'crit-body-${objetivoIdx}-${funcId}-${histId}-${contenedor.children.length}')">▼</button>
        <button class="borrar-btn" onclick="borrarCriterio(${objetivoIdx}, ${funcId}, ${histId}, this)">🗑️ Borrar</button>
      </div>
    </div>
    <div class="crit-body" id="crit-body-${objetivoIdx}-${funcId}-${histId}-${contenedor.children.length}">
      <div class="criterio-basico"></div>
      <div class="pruebas-unitarias-block"></div>
      <div class="diseno-tecnico-block" data-uniqueid="${uniqueId}"></div>
    </div>
  `;
  contenedor.appendChild(div);

  renderCriterioBasico(div.querySelector('.criterio-basico'), data);
  renderPruebasUnitarias(div.querySelector('.pruebas-unitarias-block'), data.clases_unitarias);
  renderDisenoTecnicoCriterio(div.querySelector('.diseno-tecnico-block'), data.diseno_tecnico, uniqueId);
}

window.crearDataCriterio= function crearDataCriterio(criterio) {
  return {
    comentario: criterio?.comentario || '',
    tags: criterio?.tags || '',
    titulo: criterio?.titulo || '',
    estado: criterio?.estado || '',
    notas: criterio?.notas || '',
    given: criterio?.given || '',
    when: criterio?.when || '',
    then: criterio?.then || '',
    clases_unitarias: criterio?.clases_unitarias || { contexto: "", especificacion: [] },
    diseno_tecnico: criterio?.diseno_tecnico || {
      clases: [],
      patrones: "",
      diagrama: "",
      notas: ""
    }
  };
}

window.agregarClaseUnitariaEspecificacion= function agregarClaseUnitariaEspecificacion(btn) {
  const ul = btn.parentNode.querySelector('.clases-especificacion');
  const li = document.createElement('li');
  li.innerHTML = `<input value="" style="width:80%"/><button onclick="borrarClaseUnitaria(this)">🗑️</button>`;
  ul.appendChild(li);
}

window.borrarClaseUnitaria= function borrarClaseUnitaria(btn) {
  if (!confirm("¿Seguro que deseas borrar esta especificación?")) return;
  btn.parentNode.remove();
}




window.verPrevisualizacion=function verPrevisualizacion() {
  actualizarDatosDesdeDOM();
  const wrapper = document.getElementById("previsualizacion");
  const content = document.getElementById("previewContent");
  content.innerHTML = '';
  objetivos.forEach((objetivo, oidx) => {
    objetivo.funcionalidades.forEach((func, i) => {
      let text = `# Visión: ${vision}\n# Objetivo ID: ${objetivo.id}\n# Objetivo: ${objetivo.descripcion}\n\n`;
      text += `Feature: ${func.nombre}\n`;
      text += `  Como ${func.actor}\n`;
      text += `  Quiero ${func.nombre.toLowerCase()}\n`;
      text += `  Para ${func.impacto}\n`;

      if (func.background.trim()) {
        text += `\n  Background:\n`;
        func.background.split('\n').forEach((line, idx) => {
          const prefix = idx === 0 ? 'Given' : 'And';
          text += `    ${prefix} ${line.trim()}\n`;
        });
      }

      func.historias.forEach(hist => {
        text += `\n  # HISTORIA DE USUARIO: ${hist.id}\n`;
        hist.descripcion.split('\n').forEach(line => {
          text += `  # ${line.trim()}\n`;
        });
        hist.criterios.forEach((crit, idx) => {
          text += `\n  # CRITERIO DE ACEPTACIÓN ${idx + 1}: ${crit.comentario}\n`;
          if (crit.tags) text += `  ${crit.tags}\n`;
          text += `  Scenario: ${crit.titulo}\n`;
          crit.given.split('\n').forEach((line, i) => {
            if (line.trim()) text += `    ${i === 0 ? 'Given' : 'And'} ${line.trim().replace(/^(Given|And)\s+/i, '')}\n`;
          });
          crit.when.split('\n').forEach((line, i) => {
            if (line.trim()) text += `    ${i === 0 ? 'When' : 'And'} ${line.trim().replace(/^(When|And)\s+/i, '')}\n`;
          });
          crit.then.split('\n').forEach((line, i) => {
            if (line.trim()) text += `    ${i === 0 ? 'Then' : 'And'} ${line.trim().replace(/^(Then|And)\s+/i, '')}\n`;
          });
          if (crit.clases_unitarias) {
            text += `    # pruebas unitarias:\n`;
            if (crit.clases_unitarias.contexto) {
              text += `    #   Contexto:\n`;
              text += `    #     - ${crit.clases_unitarias.contexto}\n`;
            }
            if (crit.clases_unitarias.especificacion && crit.clases_unitarias.especificacion.length) {
              text += `    #   Especificación:\n`;
              crit.clases_unitarias.especificacion.forEach(metodo => {
                text += `    #     - ${metodo}\n`;
              });
            }
          }
        });
      });

      const pre = document.createElement("pre");
      pre.textContent = text;
      content.appendChild(pre);
      content.appendChild(document.createElement("hr"));
    });
  });
  wrapper.style.display = "block";
}

window.actualizarDatosDesdeDOM=function actualizarDatosDesdeDOM() {
  vision = document.getElementById("visionGeneral").value.trim();
  const objetivoDivs = document.querySelectorAll('[id^="objetivo-"]');
  objetivos = [];
  objetivoDivs.forEach((objDiv, oidx) => {
    const obj = {
      id: objDiv.querySelector('.objetivo-id').value.trim(),
      descripcion: objDiv.querySelector('.objetivo-desc').value.trim(),
      kpi: objDiv.querySelector('.objetivo-kpi')?.value.trim() || "",
      prioridad: objDiv.querySelector('.objetivo-prioridad')?.value.trim() || "",
      responsable: objDiv.querySelector('.objetivo-responsable')?.value.trim() || "",
      estado: objDiv.querySelector('.objetivo-estado')?.value.trim() || "",
      notas: objDiv.querySelector('.objetivo-notas')?.value.trim() || "",
      funcionalidades: []
    };
    const funcDivs = objDiv.querySelectorAll('[id^="func-"]');
    funcDivs.forEach((funcDiv, fidx) => {
      const func = {
        id: funcDiv.querySelector('.func-id').value.trim(),
        nombre: funcDiv.querySelector('.nombre').value.trim(),
        namespace: funcDiv.querySelector('.func-namespace')?.value.trim() || "",
        actor: funcDiv.querySelector('.actor').value.trim(),
        impacto: funcDiv.querySelector('.impacto').value.trim(),
        tags: funcDiv.querySelector('.func-tags')?.value.trim() || "",
        estado: funcDiv.querySelector('.func-estado')?.value.trim() || "",
        responsable: funcDiv.querySelector('.func-responsable')?.value.trim() || "",
        notas: funcDiv.querySelector('.func-notas')?.value.trim() || "",
        enlace_doc: funcDiv.querySelector('.func-enlace-doc')?.value.trim() || "",
        background: funcDiv.querySelector('.background').value.trim(),
        historias: []
      };
      const historiaDivs = funcDiv.querySelectorAll('.historias > .section');
      historiaDivs.forEach((histDiv, hIdx) => {
        const historia = {
          id: histDiv.querySelector('.historia-id').value.trim(),
          descripcion: histDiv.querySelector('.historia-desc').value.trim(),
          package: histDiv.querySelector('.historia-package')?.value.trim() || "",
          dependencias: histDiv.querySelector('.historia-dependencias')?.value.trim() || "",
          estado: histDiv.querySelector('.historia-estado')?.value.trim() || "",
          responsable: histDiv.querySelector('.historia-responsable')?.value.trim() || "",
          notas: histDiv.querySelector('.historia-notas')?.value.trim() || "",
          criterios: []
        };
        const criterioDivs = histDiv.querySelectorAll('.criterios > .section');
        criterioDivs.forEach(critDiv => {
          const crit = {
            comentario: critDiv.querySelector('.criterio-comentario').value.trim(),
            tags: critDiv.querySelector('.criterio-tags').value.trim(),
            titulo: critDiv.querySelector('.criterio-titulo').value.trim(),
            estado: critDiv.querySelector('.criterio-estado')?.value.trim() || "",
            notas: critDiv.querySelector('.criterio-notas')?.value.trim() || "",
            given: critDiv.querySelector('.criterio-given').value.trim(),
            when: critDiv.querySelector('.criterio-when').value.trim(),
            then: critDiv.querySelector('.criterio-then').value.trim(),
            clases_unitarias: {
              contexto: critDiv.querySelector('.clase-contexto')?.value.trim() || "",
              especificacion: Array.from(critDiv.querySelectorAll('.clases-especificacion input')).map(inp => inp.value.trim()).filter(Boolean)
            }
          };

          // ========== DISEÑO TÉCNICO ==========
          const disenoDiv = critDiv.querySelector('.diseno-tecnico-block');
          let diseno_tecnico = {
            clases: [],
            patrones: "",
            diagrama: "",
            notas: ""
          };
          if (disenoDiv) {
            // Si usas la función getDisenoTecnico_[uniqueId]():
            if (disenoDiv.dataset.uniqueid && window['getDisenoTecnico_' + disenoDiv.dataset.uniqueid]) {
              diseno_tecnico = window['getDisenoTecnico_' + disenoDiv.dataset.uniqueid]();
            } else {
              // Manual (por si acaso)
              const clasesList = disenoDiv.querySelectorAll('.clases-list > div');
              clasesList.forEach(claseDiv => {
                const nombreClase = claseDiv.querySelector('b')?.textContent.trim() || "";
                const metodos = [];
                const metodosList = claseDiv.querySelectorAll('.metodo-block');
                metodosList.forEach(metodoDiv => {
                  const nombreMetodo = metodoDiv.querySelector('.metodo-nombre')?.value.trim() || "";
                  const descripcionMetodo = metodoDiv.querySelector('.metodo-desc')?.value.trim() || "";
                  const salidaTipo = metodoDiv.querySelector('.salida-tipo')?.value.trim() || "";
                  const salidaDesc = metodoDiv.querySelector('.salida-desc')?.value.trim() || "";
                  const parametros = [];
                  const parametrosList = metodoDiv.querySelectorAll('.parametros-list > div');
                  parametrosList.forEach(paramDiv => {
                    parametros.push({
                      tipo: paramDiv.querySelector('.param-tipo')?.value.trim() || "",
                      nombre: paramDiv.querySelector('.param-nombre')?.value.trim() || "",
                      descripcion: paramDiv.querySelector('.param-desc')?.value.trim() || ""
                    });
                  });
                  metodos.push({
                    nombre: nombreMetodo,
                    descripcion: descripcionMetodo,
                    parametros: parametros,
                    salida: { tipo: salidaTipo, descripcion: salidaDesc }
                  });
                });
                diseno_tecnico.clases.push({
                  nombre: nombreClase,
                  metodos: metodos
                });
              });
              diseno_tecnico.patrones = disenoDiv.querySelector('.diseno-patrones')?.value.trim() || "";
              diseno_tecnico.diagrama = disenoDiv.querySelector('.diseno-diagrama')?.value.trim() || "";
              diseno_tecnico.notas = disenoDiv.querySelector('.diseno-notas')?.value.trim() || "";
            }
          }
          crit.diseno_tecnico = diseno_tecnico;
          // ========== FIN DISEÑO TÉCNICO ==========

          historia.criterios.push(crit);
        });
        func.historias.push(historia);
      });
      obj.funcionalidades.push(func);
    });
    objetivos.push(obj);
  });
}

window.descargarFeatures=function descargarFeatures() {
  let totalDescargados = 0;
  const nombresDescargados = new Set(); // Para evitar duplicados

  objetivos.forEach((objetivo, oidx) => {
    if (!objetivo.funcionalidades) return;
    objetivo.funcionalidades.forEach((func, fidx) => {
      let content = `# Visión: ${vision}\n# Objetivo ID: ${objetivo.id}\n# Objetivo: ${objetivo.descripcion}\n\n`;
      content += `Feature: ${func.nombre || `Funcionalidad ${fidx+1}`}\n`;
      content += `  Como ${func.actor || ""}\n`;
      content += `  Quiero ${(func.nombre || `Funcionalidad ${fidx+1}`).toLowerCase()}\n`;
      content += `  Para ${func.impacto || ""}\n`;

      if (func.background && func.background.trim()) {
        content += `\n  Background:\n`;
        func.background.split('\n').forEach((line, idx) => {
          const prefix = idx === 0 ? 'Given' : 'And';
          content += `    ${prefix} ${line.trim()}\n`;
        });
      }

      if (func.historias) {
        func.historias.forEach(hist => {
          content += `\n  # HISTORIA DE USUARIO: ${hist.id}\n`;
          if (hist.descripcion) {
            hist.descripcion.split('\n').forEach(line => {
              content += `  # ${line.trim()}\n`;
            });
          }
          if (hist.criterios) {
            hist.criterios.forEach((crit, cidx) => {
              content += `\n  # CRITERIO DE ACEPTACIÓN ${cidx + 1}: ${crit.comentario}\n`;
              if (crit.tags) content += `  ${crit.tags}\n`;
              content += `  Scenario: ${crit.titulo}\n`;
              if (crit.given) crit.given.split('\n').forEach((line, i) => {
                if (line.trim()) content += `    ${i === 0 ? 'Given' : 'And'} ${line.trim().replace(/^(Given|And)\s+/i, '')}\n`;
              });
              if (crit.when) crit.when.split('\n').forEach((line, i) => {
                if (line.trim()) content += `    ${i === 0 ? 'When' : 'And'} ${line.trim().replace(/^(When|And)\s+/i, '')}\n`;
              });
              if (crit.then) crit.then.split('\n').forEach((line, i) => {
                if (line.trim()) content += `    ${i === 0 ? 'Then' : 'And'} ${line.trim().replace(/^(Then|And)\s+/i, '')}\n`;
              });
              if (crit.clases_unitarias) {
                content += `    # pruebas unitarias:\n`;
                if (crit.clases_unitarias.contexto) {
                  content += `    #   Contexto:\n`;
                  content += `    #     - ${crit.clases_unitarias.contexto}\n`;
                }
                if (crit.clases_unitarias.especificacion && crit.clases_unitarias.especificacion.length) {
                  content += `    #   Especificación:\n`;
                  crit.clases_unitarias.especificacion.forEach(metodo => {
                    content += `    #     - ${metodo}\n`;
                  });
                }
              }
            });
          }
        });
      }

      const objId = cleanFileName(objetivo.id) || `obj${oidx+1}`;
      const funcId = cleanFileName(func.id) || `func${fidx+1}`;
      const funcName = cleanFileName(func.nombre) || `funcionalidad${fidx+1}`;
      const filename = `${objId}_${funcId}_${funcName}.feature`;

      // Evita duplicados
      if (nombresDescargados.has(filename)) return;
      nombresDescargados.add(filename);

      const blob = new Blob([content], { type: 'text/plain' });
      const link = document.createElement('a');
      link.href = URL.createObjectURL(blob);
      link.download = filename;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      totalDescargados++;
    });
  });
  alert(`Se descargaron ${totalDescargados} archivos de características.`);
}




window.guardarTrabajo=function guardarTrabajo() {
  actualizarDatosDesdeDOM();
  const data = {
    vision,
    objetivos_de_negocio: objetivos
  };
  const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
  const link = document.createElement('a');
  link.href = URL.createObjectURL(blob);
  link.download = "mi_trabajo_guardado.json";
  link.click();
}

window.descargarEspecificacionTecnicaZip=function descargarEspecificacionTecnicaZip() {
  const zip = new JSZip();
  const baseTestDir = "src/main/tests/";
  const baseFeatureDir = "resources/features/";

  objetivos.forEach(objetivo => {
    if (!objetivo.funcionalidades) return;
    objetivo.funcionalidades.forEach(func => {
      const basePackage = func.namespace || "com.empresa";
      const basePackagePath = basePackage.replace(/\./g, "/");
      if (!func.historias) return;
      func.historias.forEach(hist => {
        const verticalSlice = hist.package || "verticalslice";
        const fullPackage = javaPackage(basePackage + "." + verticalSlice);
        const testPackagePath = baseTestDir + fullPackage.replace(/\./g, "/") + "/";
        const featurePackagePath = baseFeatureDir + basePackagePath + "/";

        // 1. Pruebas unitarias
        if (hist.criterios) {
          hist.criterios.forEach(crit => {
            // Unitarias
            if (crit.clases_unitarias && crit.clases_unitarias.contexto) {
              const className = javaClassName(crit.clases_unitarias.contexto) + "UnitTest";
              let javaFile = "";
              javaFile += `package ${fullPackage};\n\n`;
              javaFile += "import org.junit.jupiter.api.Test;\nimport static org.junit.jupiter.api.Assertions.*;\n\n";
              javaFile += `public class ${className} {\n`;
              (crit.clases_unitarias.especificacion || []).forEach(metodo => {
                javaFile += `    @Test\n    public void ${metodo}() {\n        // TODO: Implementar prueba unitaria\n    }\n\n`;
              });
              javaFile += "}\n";
              zip.file(testPackagePath + className + ".java", javaFile);
            }

            // Integración (si existe)
            if (crit.clases_integracion && crit.clases_integracion.contexto) {
              const className = javaClassName(crit.clases_integracion.contexto) + "IntegrationTest";
              let javaFile = "";
              javaFile += `package ${fullPackage};\n\n`;
              javaFile += "import org.junit.jupiter.api.Test;\nimport static org.junit.jupiter.api.Assertions.*;\n\n";
              javaFile += `public class ${className} {\n`;
              (crit.clases_integracion.especificacion || []).forEach(metodo => {
                javaFile += `    @Test\n    public void ${metodo}() {\n        // TODO: Implementar prueba de integración\n    }\n\n`;
              });
              javaFile += "}\n";
              zip.file(testPackagePath + className + ".java", javaFile);
            }

            // Aceptación (Gherkin)
            if (crit.titulo) {
              const className = javaClassName(crit.titulo) + "AcceptanceTest";
              let javaFile = "";
              javaFile += `package ${fullPackage};\n\n`;
              javaFile += "import org.junit.jupiter.api.Test;\nimport static org.junit.jupiter.api.Assertions.*;\n\n";
              javaFile += `public class ${className} {\n`;

              // Métodos para cada step Gherkin, en camelCase, sin comentarios
              if (crit.given) {
                crit.given.split('\n').forEach((line) => {
                  if (line.trim()) {
                    const methodName = toCamelCaseStep('given', line);
                    javaFile += `    @Test\n    public void ${methodName}() {\n        // TODO: Implementar Given\n    }\n\n`;
                  }
                });
              }
              if (crit.when) {
                crit.when.split('\n').forEach((line) => {
                  if (line.trim()) {
                    const methodName = toCamelCaseStep('when', line);
                    javaFile += `    @Test\n    public void ${methodName}() {\n        // TODO: Implementar When\n    }\n\n`;
                  }
                });
              }
              if (crit.then) {
                crit.then.split('\n').forEach((line) => {
                  if (line.trim()) {
                    const methodName = toCamelCaseStep('then', line);
                    javaFile += `    @Test\n    public void ${methodName}() {\n        // TODO: Implementar Then\n    }\n\n`;
                  }
                });
              }

              javaFile += "}\n";
              zip.file(testPackagePath + className + ".java", javaFile);
            }
          });
        }

        // 2. Archivos .feature (igual que antes)
        let featureContent = `Feature: ${func.nombre}\n`;
        featureContent += `  Como ${func.actor}\n`;
        featureContent += `  Quiero ${func.nombre.toLowerCase()}\n`;
        featureContent += `  Para ${func.impacto}\n`;

        if (func.background && func.background.trim()) {
          featureContent += `\n  Background:\n`;
          func.background.split('\n').forEach((line, idx) => {
            const prefix = idx === 0 ? 'Given' : 'And';
            featureContent += `    ${prefix} ${line.trim()}\n`;
          });
        }

        if (func.historias) {
          func.historias.forEach(historia => {
            featureContent += `\n  # HISTORIA DE USUARIO: ${historia.id}\n`;
            if (historia.descripcion) {
              historia.descripcion.split('\n').forEach(line => {
                featureContent += `  # ${line.trim()}\n`;
              });
            }
            if (historia.criterios) {
              historia.criterios.forEach((crit, cidx) => {
                featureContent += `\n  # CRITERIO DE ACEPTACIÓN ${cidx + 1}: ${crit.comentario}\n`;
                if (crit.tags) featureContent += `  ${crit.tags}\n`;
                featureContent += `  Scenario: ${crit.titulo}\n`;
                if (crit.given) crit.given.split('\n').forEach((line, i) => {
                  if (line.trim()) featureContent += `    ${i === 0 ? 'Given' : 'And'} ${line.trim().replace(/^(Given|And)\s+/i, '')}\n`;
                });
                if (crit.when) crit.when.split('\n').forEach((line, i) => {
                  if (line.trim()) featureContent += `    ${i === 0 ? 'When' : 'And'} ${line.trim().replace(/^(When|And)\s+/i, '')}\n`;
                });
                if (crit.then) crit.then.split('\n').forEach((line, i) => {
                  if (line.trim()) featureContent += `    ${i === 0 ? 'Then' : 'And'} ${line.trim().replace(/^(Then|And)\s+/i, '')}\n`;
                });
              });
            }
          });
        }

        const featureFileName = cleanFileName(func.nombre) + ".feature";
        zip.file(featurePackagePath + featureFileName, featureContent);
      });
    });
  });

  zip.generateAsync({ type: "blob" }).then(function(content) {
    const link = document.createElement("a");
    link.href = URL.createObjectURL(content);
    link.download = "especificacion_tecnica.zip";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  });
}


window.filtrarBusqueda = function filtrarBusqueda() {
    // 1. Obtener el texto del buscador y normalizarlo (minúsculas, sin espacios extra).
    const query = document.getElementById("buscador").value.toLowerCase().trim();
    
    // 2. Obtener una referencia a todos los divs de objetivos en el DOM.
    //    Se asume que el orden de estos divs coincide con el del array `objetivos`.
    const objetivosDivs = document.querySelectorAll('#objetivos > .objetivo-section');

    // 3. CORRECCIÓN CLAVE: Si el campo de búsqueda está vacío...
    if (query === "") {
        // ...simplemente mostramos todos los objetivos y terminamos.
        // Esto restaura la vista a su estado original de forma eficiente.
        objetivosDivs.forEach(div => div.style.display = 'block');
        return;
    }

    // 4. Si hay texto, recorremos cada objetivo para decidir si se muestra u oculta.
    objetivosDivs.forEach((objDiv, index) => {
        // Obtenemos los datos completos del objetivo correspondiente del array de datos.
        const objData = objetivos[index];
        let found = false;

        // Función auxiliar para no repetir la lógica de búsqueda de texto.
        const searchInData = (text) => text && text.toLowerCase().includes(query);

        // Buscar en los datos del propio objetivo.
        if (searchInData(objData.id) || searchInData(objData.descripcion) || searchInData(objData.responsable)) {
            found = true;
        }

        // Si no se encontró, buscar de forma anidada en funcionalidades, historias y criterios.
        if (!found && objData.funcionalidades) {
            for (const func of objData.funcionalidades) {
                if (searchInData(func.id) || searchInData(func.nombre) || searchInData(func.namespace) || searchInData(func.tags) || searchInData(func.responsable)) {
                    found = true;
                    break;
                }
                if (!found && func.historias) {
                    for (const hist of func.historias) {
                        if (searchInData(hist.id) || searchInData(hist.descripcion) || searchInData(hist.package) || searchInData(hist.responsable)) {
                            found = true;
                            break;
                        }
                        if (!found && hist.criterios) {
                            for (const crit of hist.criterios) {
                                if (searchInData(crit.comentario) || searchInData(crit.titulo) || searchInData(crit.tags)) {
                                    found = true;
                                    break;
                                }
                            }
                        }
                        if (found) break;
                    }
                }
                if (found) break;
            }
        }
        
        // 5. Finalmente, mostrar u ocultar el div completo del objetivo según si se encontró una coincidencia.
        objDiv.style.display = found ? 'block' : 'none';
    });
}

