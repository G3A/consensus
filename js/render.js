// js/render.js

import { mostrarModalAyuda } from './helpers.js';

// ========== RENDER OBJETIVOS ==========

export function renderObjetivos(vision, objetivos) {
  const cont = document.getElementById("objetivos");
  cont.innerHTML = "";
  document.getElementById("btnLimpiar").disabled = (objetivos && objetivos.length === 0 && !vision);
  objetivos.forEach((obj, idx) => {
    const div = document.createElement("div");
    div.className = "section objetivo-section";
    div.id = `objetivo-${idx}`;
    div.innerHTML = `
      <div class="objetivo-header">
        <h2>
          🎯 Objetivo de Negocio ${idx + 1}
          <span class="tooltip-icon" onclick="window.mostrarModalAyuda('Objetivo de negocio')">❓</span>
        </h2>
        <div>
          <button class="expand-btn" aria-expanded="true" onclick="window.toggleSection(this, 'objetivo-body-${idx}')">▼</button>
          <button class="borrar-btn" onclick="window.borrarObjetivo(${idx})">🗑️ Borrar Objetivo</button>
        </div>
      </div>
      <div class="objetivo-body" id="objetivo-body-${idx}">
        <label>ID Objetivo <span class="tooltip-icon" onclick="window.mostrarModalAyuda('ID Objetivo')">❓</span></label>
        <input class="objetivo-id" value="${obj.id}" />
        <label>Descripción <span class="tooltip-icon" onclick="window.mostrarModalAyuda('Descripción Objetivo')">❓</span></label>
        <input class="objetivo-desc" value="${obj.descripcion}" />
        <label>KPI / Métrica de éxito <span class="tooltip-icon" onclick="window.mostrarModalAyuda('KPI')">❓</span></label>
        <input class="objetivo-kpi" value="${obj.kpi || ''}" placeholder="Ej: Retención > 85%" />
        <label>Prioridad <span class="tooltip-icon" onclick="window.mostrarModalAyuda('Prioridad')">❓</span></label>
        <select class="objetivo-prioridad">
          <option value="">Selecciona</option>
          <option value="Alta" ${obj.prioridad === "Alta" ? "selected" : ""}>Alta</option>
          <option value="Media" ${obj.prioridad === "Media" ? "selected" : ""}>Media</option>
          <option value="Baja" ${obj.prioridad === "Baja" ? "selected" : ""}>Baja</option>
        </select>
        <label>Responsable <span class="tooltip-icon" onclick="window.mostrarModalAyuda('Responsable')">❓</span></label>
        <input class="objetivo-responsable" value="${obj.responsable || ''}" placeholder="Ej: Líder de Producto" />
        <label>Estado <span class="tooltip-icon" onclick="window.mostrarModalAyuda('Estado')">❓</span></label>
        <select class="objetivo-estado">
          <option value="">Selecciona</option>
          <option value="Pendiente" ${obj.estado === "Pendiente" ? "selected" : ""}>Pendiente</option>
          <option value="En análisis" ${obj.estado === "En análisis" ? "selected" : ""}>En análisis</option>
          <option value="En desarrollo" ${obj.estado === "En desarrollo" ? "selected" : ""}>En desarrollo</option>
          <option value="Listo para QA" ${obj.estado === "Listo para QA" ? "selected" : ""}>Listo para QA</option>
          <option value="Desplegado en producción" ${obj.estado === "Desplegado en producción" ? "selected" : ""}>Desplegado en producción</option>
          <option value="Completado" ${obj.estado === "Completado" ? "selected" : ""}>Completado</option>
        </select>
        <label>Notas <span class="tooltip-icon" onclick="window.mostrarModalAyuda('Notas')">❓</span></label>
        <textarea class="objetivo-notas" placeholder="Notas, supuestos, decisiones, etc.">${obj.notas || ''}</textarea>
        <div id="funcionalidades-${idx}"></div>
        <button onclick="window.agregarFuncionalidad(${idx})">➕ Añadir Característica</button>
      </div>
    `;
    cont.appendChild(div);

    // Renderiza funcionalidades
    if (obj.funcionalidades && obj.funcionalidades.length) {
      obj.funcionalidades.forEach((func, fidx) => {
        renderFuncionalidad(idx, func, fidx);
      });
    }
  });
}

// ========== RENDER FUNCIONALIDAD ==========

export function renderFuncionalidad(objetivoIdx, func, id) {
  const div = document.createElement("div");
  div.className = "section";
  div.id = `func-${objetivoIdx}-${id}`;
  div.innerHTML = `
    <div class="func-header">
      <h3>
        💡 Característica/Funcionalidad ${id + 1}
        <span class="tooltip-icon" onclick="window.mostrarModalAyuda('Característica')">❓</span>
      </h3>
      <div>
        <button class="expand-btn" aria-expanded="true" onclick="window.toggleSection(this, 'func-body-${objetivoIdx}-${id}')">▼</button>
        <button class="borrar-btn" onclick="window.borrarFuncionalidad(${objetivoIdx}, ${id})">🗑️ Borrar</button>
      </div>
    </div>
    <div class="func-body" id="func-body-${objetivoIdx}-${id}">
      <label>ID Funcionalidad <span class="tooltip-icon" onclick="window.mostrarModalAyuda('ID Funcionalidad')">❓</span></label>
      <input class="func-id" value="${func.id}" />
      <label>Nombre <span class="tooltip-icon" onclick="window.mostrarModalAyuda('Nombre de la Funcionalidad')">❓</span></label>
      <input class="nombre" value="${func.nombre}" />
      <label>Nombre namespace/base package <span class="tooltip-icon" onclick="window.mostrarModalAyuda('Namespace/Base Package')">❓</span></label>
      <input class="func-namespace" value="${func.namespace || ''}" placeholder="codebase. Ej: com.empresa.caracteristica | com.empresa.modulo.caracteristica" />
      <label>Actor <span class="tooltip-icon" onclick="window.mostrarModalAyuda('Actor')">❓</span></label>
      <input class="actor" value="${func.actor}" />
      <label>Impacto <span class="tooltip-icon" onclick="window.mostrarModalAyuda('Impacto')">❓</span></label>
      <input class="impacto" value="${func.impacto}" />
      <label>Tags <span class="tooltip-icon" onclick="window.mostrarModalAyuda('Tags')">❓</span></label>
      <input class="func-tags" value="${func.tags}" placeholder="Ej: progreso, dashboard" />
      <label>Estado <span class="tooltip-icon" onclick="window.mostrarModalAyuda('Estado')">❓</span></label>
      <select class="func-estado">
        <option value="">Selecciona</option>
        <option value="Pendiente" ${func.estado === "Pendiente" ? "selected" : ""}>Pendiente</option>
        <option value="En análisis" ${func.estado === "En análisis" ? "selected" : ""}>En análisis</option>
        <option value="En desarrollo" ${func.estado === "En desarrollo" ? "selected" : ""}>En desarrollo</option>
        <option value="Listo para QA" ${func.estado === "Listo para QA" ? "selected" : ""}>Listo para QA</option>
        <option value="Desplegado en producción" ${func.estado === "Desplegado en producción" ? "selected" : ""}>Desplegado en producción</option>
        <option value="Completado" ${func.estado === "Completado" ? "selected" : ""}>Completado</option>
      </select>
      <label>Responsable <span class="tooltip-icon" onclick="window.mostrarModalAyuda('Responsable')">❓</span></label>
      <input class="func-responsable" value="${func.responsable}" placeholder="Ej: Desarrollador" />
      <label>Notas <span class="tooltip-icon" onclick="window.mostrarModalAyuda('Notas')">❓</span></label>
      <textarea class="func-notas" placeholder="Notas, supuestos, decisiones, etc.">${func.notas}</textarea>
      <label>Enlace a documentación <span class="tooltip-icon" onclick="window.mostrarModalAyuda('Enlace a documentación')">❓</span></label>
      <input class="func-enlace-doc" type="url" value="${func.enlace_doc}" placeholder="https://..." />
      <label>Antecedentes <span class="tooltip-icon" onclick="window.mostrarModalAyuda('Antecedentes')">❓</span></label>
      <textarea class="background">${func.background}</textarea>
      <div class="historias" id="historias-${objetivoIdx}-${id}"></div>
      <button onclick="window.agregarHistoria(${objetivoIdx}, ${id})">➕ Añadir Historia de Usuario</button>
    </div>
  `;
  document.getElementById(`funcionalidades-${objetivoIdx}`).appendChild(div);

  // Renderiza historias
  if (func.historias && func.historias.length) {
    func.historias.forEach((hist, hidx) => {
      renderHistoria(objetivoIdx, id, hist, hidx);
    });
  }
}

// ========== RENDER HISTORIA ==========

export function renderHistoria(objetivoIdx, funcId, historia, idx) {
  const contenedor = document.getElementById(`historias-${objetivoIdx}-${funcId}`);
  const div = document.createElement("div");
  div.className = "section";
  div.style.borderColor = "#17a2b8";
  div.innerHTML = `
    <div class="hist-header">
      <h4>
        📘 Historia de Usuario ${idx + 1}
        <span class="tooltip-icon" onclick="window.mostrarModalAyuda('Descripción Historia de Usuario')">❓</span>
      </h4>
      <div>
        <button class="expand-btn" aria-expanded="true" onclick="window.toggleSection(this, 'hist-body-${objetivoIdx}-${funcId}-${idx}')">▼</button>
        <button class="borrar-btn" onclick="window.borrarHistoria(${objetivoIdx}, ${funcId}, ${idx})">🗑️ Borrar</button>
      </div>
    </div>
    <div class="hist-body" id="hist-body-${objetivoIdx}-${funcId}-${idx}">
      <label>ID Historia <span class="tooltip-icon" onclick="window.mostrarModalAyuda('ID Historia')">❓</span></label>
      <input class="historia-id" value="${historia.id}" />
      <label>Descripción <span class="tooltip-icon" onclick="window.mostrarModalAyuda('Descripción Historia de Usuario')">❓</span></label>
      <textarea class="historia-desc">${historia.descripcion}</textarea>
      <label>Nombre package/vertical slice <span class="tooltip-icon" onclick="window.mostrarModalAyuda('Package/Vertical Slice')">❓</span></label>
      <input class="historia-package" value="${historia.package || ''}" placeholder="Ej: , internal.query.consultarusuario, internal.command.registrarusuario, internal.command.actualizarusuario, internal.command.eliminarusuario" />
      <label>Dependencias <span class="tooltip-icon" onclick="window.mostrarModalAyuda('Dependencias')">❓</span></label>
      <input class="historia-dependencias" value="${historia.dependencias}" placeholder="Ej: HIST-1-1-0" />
      <label>Estado <span class="tooltip-icon" onclick="window.mostrarModalAyuda('Estado')">❓</span></label>
      <select class="historia-estado">
        <option value="">Selecciona</option>
        <option value="Pendiente" ${historia.estado === "Pendiente" ? "selected" : ""}>Pendiente</option>
        <option value="En análisis" ${historia.estado === "En análisis" ? "selected" : ""}>En análisis</option>
        <option value="En desarrollo" ${historia.estado === "En desarrollo" ? "selected" : ""}>En desarrollo</option>
        <option value="Listo para QA" ${historia.estado === "Listo para QA" ? "selected" : ""}>Listo para QA</option>
        <option value="Desplegado en producción" ${historia.estado === "Desplegado en producción" ? "selected" : ""}>Desplegado en producción</option>
        <option value="Completado" ${historia.estado === "Completado" ? "selected" : ""}>Completado</option>
      </select>
      <label>Responsable <span class="tooltip-icon" onclick="window.mostrarModalAyuda('Responsable')">❓</span></label>
      <input class="historia-responsable" value="${historia.responsable}" placeholder="Ej: Analista de requisitos" />
      <label>Notas <span class="tooltip-icon" onclick="window.mostrarModalAyuda('Notas')">❓</span></label>
      <textarea class="historia-notas" placeholder="Notas, supuestos, decisiones, etc.">${historia.notas}</textarea>
      <div class="criterios" id="criterios-${objetivoIdx}-${funcId}-${idx}"></div>
      <div id="criterios"></div>
      <button onclick="window.agregarCriterio(${objetivoIdx}, ${funcId}, ${idx})">➕ Añadir Criterio de Aceptación</button>
    </div>
  `;
  contenedor.appendChild(div);

  // Renderiza criterios
  if (historia.criterios && historia.criterios.length) {
    historia.criterios.forEach((crit, cidx) => {
      window.agregarCriterio(objetivoIdx, funcId, idx, crit);
    });
  }
}


// ========== RENDER CRITERIO BASICO ==========

export function renderCriterioBasico(container, data) {
  container.innerHTML = `
    <label>Comentario <span class="tooltip-icon" onclick="mostrarModalAyuda('Comentario Criterio de Aceptación')">❓</span></label>
    <input class="criterio-comentario" value="${data.comentario}" />
    <label>Tags <span class="tooltip-icon" onclick="mostrarModalAyuda('Tags Escenario')">❓</span></label>
    <input class="criterio-tags" value="${data.tags}" />
    <label>Título Escenario <span class="tooltip-icon" onclick="mostrarModalAyuda('Título Escenario')">❓</span></label>
    <input class="criterio-titulo" value="${data.titulo}" />
    <label>Estado <span class="tooltip-icon" onclick="mostrarModalAyuda('Estado')">❓</span></label>
    <select class="criterio-estado">
      <option value="">Selecciona</option>
      <option value="Pendiente" ${data.estado === "Pendiente" ? "selected" : ""}>Pendiente</option>
      <option value="En análisis" ${data.estado === "En análisis" ? "selected" : ""}>En análisis</option>
      <option value="En desarrollo" ${data.estado === "En desarrollo" ? "selected" : ""}>En desarrollo</option>
      <option value="Listo para QA" ${data.estado === "Listo para QA" ? "selected" : ""}>Listo para QA</option>
      <option value="Desplegado en producción" ${data.estado === "Desplegado en producción" ? "selected" : ""}>Desplegado en producción</option>
      <option value="Completado" ${data.estado === "Completado" ? "selected" : ""}>Completado</option>
    </select>
    <label>Notas <span class="tooltip-icon" onclick="mostrarModalAyuda('Notas')">❓</span></label>
    <textarea class="criterio-notas" placeholder="Notas, supuestos, decisiones, etc.">${data.notas}</textarea>
    <label>🟢 Given <span class="tooltip-icon" onclick="mostrarModalAyuda('Pasos del Escenario')">❓</span></label>
    <textarea class="criterio-given">${data.given}</textarea>
    <label>🟡 When <span class="tooltip-icon" onclick="mostrarModalAyuda('Pasos del Escenario')">❓</span></label>
    <textarea class="criterio-when">${data.when}</textarea>
    <label>🔵 Then <span class="tooltip-icon" onclick="mostrarModalAyuda('Pasos del Escenario')">❓</span></label>
    <textarea class="criterio-then">${data.then}</textarea>
  `;
}

// ========== RENDER PRUEBAS UNITARIAS ==========

export function renderPruebasUnitarias(container, clases_unitarias) {
  const uniqueId = Math.random().toString(36).substr(2, 9);
  container.innerHTML = `
    <div class="pruebas-header" style="display:flex;align-items:center;justify-content:space-between;">
      <b style="color:#007bff;">Pruebas Unitarias: <span class="tooltip-icon" onclick="mostrarModalAyuda('pruebas unitarias')">❓</span></b>
      <button class="expand-btn" aria-expanded="true" onclick="toggleSection(this, 'pruebas-unitarias-body-${uniqueId}')">▼</button>
    </div>
    <div class="pruebas-unitarias-body" id="pruebas-unitarias-body-${uniqueId}">
      <div>
        <b>Contexto (Clase Java) <span class="tooltip-icon" onclick="mostrarModalAyuda('Contexto (Clase Java)')">❓</span></b>
        <input class="clase-contexto" value="${clases_unitarias.contexto || ''}" placeholder="Ej: CuandoElEstudianteHaFinalizadoElCurso.java" />
      </div>
      <div>
        <b>Especificación (Métodos) <span class="tooltip-icon" onclick="mostrarModalAyuda('Especificación (Métodos)')">❓</span></b>
        <ul class="clases-especificacion"></ul>
        <button type="button" class="add" onclick="agregarClaseUnitariaEspecificacion(this)">+ Método de Especificación</button>
      </div>
    </div>
  `;
  const ul = container.querySelector('.clases-especificacion');
  (clases_unitarias.especificacion || []).forEach(metodo => {
    const li = document.createElement('li');
    li.innerHTML = `<input value="${metodo}" style="width:80%"/><button onclick="borrarClaseUnitaria(this)">🗑️</button>`;
    ul.appendChild(li);
  });
}


// ========== RENDER DISEÑO TECNICO ==========

export function renderDisenoTecnicoCriterio(disenoDiv, diseno_tecnico, uniqueId) {
  // --- Lista de tipos Java ---
  const tiposJava = [
    "String", "int", "Integer", "long", "Long", "double", "Double", "float", "Float",
    "boolean", "Boolean", "char", "Character", "Date", "LocalDate", "LocalDateTime",
    "BigDecimal", "List", "Set", "Map", "void", "Object", "Custom..."
  ];
  function selectTipoDatoJava(selected, className = "param-tipo") {
    let html = `<select class="${className}" style="width:90px;">`;
    tiposJava.forEach(tipo => {
      html += `<option value="${tipo}" ${selected === tipo ? "selected" : ""}>${tipo}</option>`;
    });
    html += `</select>`;
    return html;
  }

  // Recursivo: renderiza propiedades de un tipo personalizado, con colapsar
  function renderCustomPropiedades(container, propiedades, onChange) {
    container.innerHTML = `<b>Propiedades del tipo personalizado:</b>`;
    const list = document.createElement('div');
    propiedades.forEach((prop, idx) => {
      const isCustom = prop.tipo === "Custom...";
      const propUniqueId = Math.random().toString(36).substr(2, 9);
      const propDiv = document.createElement('div');
      propDiv.style.margin = "4px 0";
      propDiv.innerHTML = `
        <div style="display:flex;align-items:center;justify-content:space-between;">
          <div style="flex:1;">
            ${selectTipoDatoJava(prop.tipo || "", "prop-tipo")}
            <input class="prop-nombre" value="${prop.nombre||''}" placeholder="Nombre de la propiedad" style="width:110px;" />
            <input class="prop-custom" value="${isCustom ? (prop.custom||"") : ""}" placeholder="Tipo personalizado" style="width:140px;${isCustom ? '' : 'display:none;'}" />
            <input class="prop-desc" value="${prop.descripcion||''}" placeholder="Descripción" style="width:120px;" />
            <button type="button" class="del-prop">🗑️</button>
          </div>
          ${isCustom ? `<button class="expand-btn" aria-expanded="false" onclick="toggleSection(this, 'custom-propiedades-block-${propUniqueId}')">►</button>` : ""}
        </div>
        <div class="custom-propiedades-block" id="custom-propiedades-block-${propUniqueId}" style="display:none; margin-top:8px; background:#f9f9f9; border:1px solid #b3d8fd; border-radius:5px; padding:8px;"></div>
      `;
      // Eventos para tipo y custom
      propDiv.querySelector('.prop-tipo').onchange = function() {
        prop.tipo = this.value;
        if (this.value === "Custom...") {
          propDiv.querySelector('.prop-custom').style.display = "inline-block";
        } else {
          propDiv.querySelector('.prop-custom').style.display = "none";
          prop.custom = "";
          prop.propiedades = [];
          propDiv.querySelector('.custom-propiedades-block').style.display = "none";
        }
        onChange([...propiedades]);
      };
      propDiv.querySelector('.prop-nombre').oninput = function() {
        prop.nombre = this.value;
        onChange([...propiedades]);
      };
      propDiv.querySelector('.prop-custom').oninput = function() {
        prop.custom = this.value;
        onChange([...propiedades]);
      };
      propDiv.querySelector('.prop-desc').oninput = function() {
        prop.descripcion = this.value;
        onChange([...propiedades]);
      };
      propDiv.querySelector('.del-prop').onclick = function() {
        propiedades.splice(idx, 1);
        onChange([...propiedades]);
        renderCustomPropiedades(container, propiedades, onChange);
      };
      // Colapsar/expandir propiedades anidadas
      if (isCustom) {
        const btnExpand = propDiv.querySelector('.expand-btn');
        const propsBlock = propDiv.querySelector('.custom-propiedades-block');
        btnExpand.onclick = function() {
          if (propsBlock.style.display === "none") {
            propsBlock.style.display = "block";
            btnExpand.textContent = "▼";
            btnExpand.setAttribute("aria-expanded", "true");
            prop.propiedades = prop.propiedades || [];
            renderCustomPropiedades(propsBlock, prop.propiedades, (nuevasPropiedades) => {
              prop.propiedades = nuevasPropiedades;
              onChange([...propiedades]);
            });
          } else {
            propsBlock.style.display = "none";
            btnExpand.textContent = "►";
            btnExpand.setAttribute("aria-expanded", "false");
          }
        };
      }
      list.appendChild(propDiv);
    });
    container.appendChild(list);

    // Formulario para agregar nueva propiedad
    const addDiv = document.createElement('div');
    addDiv.style.marginTop = "6px";
    addDiv.innerHTML = `
      ${selectTipoDatoJava("", "new-prop-tipo")}
      <input class="new-prop-nombre" placeholder="Nombre de la propiedad" style="width:110px;" />
      <input class="new-prop-custom" placeholder="Tipo personalizado" style="width:140px;display:none;" />
      <input class="new-prop-desc" placeholder="Descripción" style="width:120px;" />
      <button type="button" class="add-prop">+ Añadir propiedad</button>
    `;
    const newPropTipo = addDiv.querySelector('.new-prop-tipo');
    const newPropCustom = addDiv.querySelector('.new-prop-custom');
    newPropTipo.onchange = function() {
      if (this.value === "Custom...") {
        newPropCustom.style.display = "inline-block";
        newPropCustom.focus();
      } else {
        newPropCustom.style.display = "none";
        newPropCustom.value = "";
      }
    };
    addDiv.querySelector('.add-prop').onclick = function() {
      const tipo = newPropTipo.value;
      const nombre = addDiv.querySelector('.new-prop-nombre').value.trim();
      const custom = newPropCustom.value.trim();
      const descripcion = addDiv.querySelector('.new-prop-desc').value.trim();
      if (!nombre || !tipo) return;
      let nuevaProp = { tipo, nombre, descripcion };
      if (tipo === "Custom...") {
        nuevaProp.custom = custom;
        nuevaProp.propiedades = [];
      }
      propiedades.push(nuevaProp);
      onChange([...propiedades]);
      renderCustomPropiedades(container, propiedades, onChange);
      newPropTipo.selectedIndex = 0;
      newPropCustom.value = '';
      newPropCustom.style.display = "none";
      addDiv.querySelector('.new-prop-nombre').value = '';
      addDiv.querySelector('.new-prop-desc').value = '';
    };
    container.appendChild(addDiv);
  }

  let clases = diseno_tecnico?.clases ? JSON.parse(JSON.stringify(diseno_tecnico.clases)) : [];
  const disenoUniqueId = Math.random().toString(36).substr(2, 9);

  disenoDiv.innerHTML = `
    <div class="diseno-header" style="display:flex;align-items:center;justify-content:space-between;">
      <b style="color:#0056b3;">🛠️ Diseño Técnico (Clases, Métodos y Parámetros) <span class="tooltip-icon" onclick="mostrarModalAyuda('Diseño técnico paso a paso')">❓</span></b>
      <button class="expand-btn" aria-expanded="true" onclick="toggleSection(this, 'diseno-tecnico-body-${disenoUniqueId}')">▼</button>
    </div>
    <div class="diseno-tecnico-body" id="diseno-tecnico-body-${disenoUniqueId}">
      <div class="clases-list"></div>
      <div style="margin-top:10px;">
        <input class="nueva-clase" placeholder="Nombre de la clase (Ej: PoliticaService)" style="width:60%;" />
        <button type="button" class="add-clase-btn" style="margin-left:5px;">+ Añadir clase</button>
      </div>
      <div style="margin-top:15px;">
        <label>Patrones de diseño o arquitectura:</label>
        <input class="diseno-patrones" placeholder="Ej: Repository, Service, CQRS, Singleton" style="width:95%;" value="${diseno_tecnico?.patrones || ''}" />
      </div>
      <div style="margin-top:10px;">
        <label>Relaciones/Diagrama:</label>
        <textarea class="diseno-diagrama" placeholder="Describe el flujo, relaciones o pega aquí un enlace a un diagrama." style="width:95%;">${diseno_tecnico?.diagrama || ''}</textarea>
      </div>
      <div style="margin-top:10px;">
        <label>Notas técnicas:</label>
        <textarea class="diseno-notas" placeholder="Decisiones técnicas, dependencias, supuestos, etc." style="width:95%;">${diseno_tecnico?.notas || ''}</textarea>
      </div>
    </div>
  `;

  function renderClasesYMetodos() {
    const clasesList = disenoDiv.querySelector('.clases-list');
    clasesList.innerHTML = '';
    clases.forEach((clase, cidx) => {
      const claseUniqueId = Math.random().toString(36).substr(2, 9);
      const claseDiv = document.createElement('div');
      claseDiv.innerHTML = `
        <div style="display:flex;align-items:center;justify-content:space-between;">
          <b style="font-size:1.1em;">${clase.nombre}</b>
          <div>
            <button class="expand-btn" aria-expanded="false" onclick="toggleSection(this, 'metodos-list-${claseUniqueId}')">►</button>
            <button type="button" style="margin-left:10px;" onclick="eliminarClase_${uniqueId}(${cidx})">🗑️ Eliminar clase</button>
          </div>
        </div>
        <div class="metodos-list" id="metodos-list-${claseUniqueId}" style="display:none;"></div>
        <div style="margin-top:8px;">
          <input class="nuevo-metodo-nombre" placeholder="Nombre del método" style="width:16%;" />
          <input class="nuevo-metodo-desc" placeholder="Descripción del método" style="width:28%;" />
          ${selectTipoDatoJava("", "nuevo-metodo-salida-tipo")}
          <input class="nuevo-metodo-custom" placeholder="Nombre tipo personalizado" style="width:140px;display:none;" />
          <input class="nuevo-metodo-salida-desc" placeholder="Descripción salida" style="width:20%;" />
          <button type="button" onclick="agregarMetodo_${uniqueId}(${cidx})">+ Añadir método</button>
          <button type="button" class="btn-propiedades-salida" style="display:none;margin-left:5px;">⚙️ Definir propiedades</button>
          <div class="custom-propiedades-block-salida" style="display:none; margin-top:8px; background:#f9f9f9; border:1px solid #b3d8fd; border-radius:5px; padding:8px;"></div>
        </div>
      `;
      clasesList.appendChild(claseDiv);

      // Métodos de la clase
      const metodosList = claseDiv.querySelector('.metodos-list');
      clase.metodos = clase.metodos || [];
      clase.metodos.forEach((metodo, midx) => {
        const metodoUniqueId = Math.random().toString(36).substr(2, 9);
        const salidaTipo = metodo.salida?.tipo || "";
        const salidaIsCustom = salidaTipo === "Custom...";
        const salidaCustom = salidaIsCustom ? (metodo.salida?.custom || "") : "";
        const salidaProps = salidaIsCustom ? (metodo.salida?.propiedades || []) : [];
        const metodoDiv = document.createElement('div');
        metodoDiv.className = "metodo-block";
        metodoDiv.innerHTML = `
          <div style="display:flex;align-items:center;justify-content:space-between;">
            <div style="flex:1;">
              <input class="metodo-nombre" value="${metodo.nombre}" placeholder="Nombre del método" style="width:16%;" onchange="actualizarMetodo_${uniqueId}(${cidx},${midx},'nombre',this.value)" />
              <input class="metodo-desc" value="${metodo.descripcion||''}" placeholder="Descripción del método" style="width:28%;" onchange="actualizarMetodo_${uniqueId}(${cidx},${midx},'descripcion',this.value)" />
              ${selectTipoDatoJava(salidaTipo, "salida-tipo")}
              <input class="salida-custom" placeholder="Nombre tipo personalizado" style="width:140px;${salidaIsCustom ? '' : 'display:none;'}" value="${salidaCustom}" />
              <input class="salida-desc" value="${metodo.salida?.descripcion||''}" placeholder="Descripción salida" style="width:20%;" onchange="actualizarMetodoSalida_${uniqueId}(${cidx},${midx},'descripcion',this.value)" />
              <button type="button" style="margin-left:5px;" onclick="eliminarMetodo_${uniqueId}(${cidx},${midx})">🗑️</button>
              <button type="button" class="btn-propiedades-salida" style="display:${salidaIsCustom ? 'inline-block' : 'none'};margin-left:5px;">⚙️ Definir propiedades</button>
            </div>
            <button class="expand-btn" aria-expanded="false" onclick="toggleSection(this, 'parametros-list-${metodoUniqueId}')">►</button>
          </div>
          <div class="custom-propiedades-block-salida" style="display:none; margin-top:8px; background:#f9f9f9; border:1px solid #b3d8fd; border-radius:5px; padding:8px;"></div>
          <div class="parametros-list" id="parametros-list-${metodoUniqueId}" style="display:none;margin-top:5px; margin-left:10px;">
            <b>Parámetros:</b>
            <div class="parametros-items"></div>
            <div style="margin-top:5px;">
              ${selectTipoDatoJava("", "nuevo-param-tipo")}
              <input class="nuevo-param-custom" placeholder="Nombre tipo personalizado" style="width:140px;display:none;" />
              <input class="nuevo-param-nombre" placeholder="Nombre del parámetro" style="width:110px;" />
              <input class="nuevo-param-desc" placeholder="Descripción" style="width:120px;" />
              <button type="button" onclick="agregarParametro_${uniqueId}(${cidx},${midx})">+ Añadir parámetro</button>
            </div>
          </div>
        `;
        metodosList.appendChild(metodoDiv);

        // --- Salida: eventos ---
        const salidaTipoSelect = metodoDiv.querySelector('.salida-tipo');
        const salidaCustomInput = metodoDiv.querySelector('.salida-custom');
        const btnPropsSalida = metodoDiv.querySelector('.btn-propiedades-salida');
        const propsBlockSalida = metodoDiv.querySelector('.custom-propiedades-block-salida');
        if (salidaTipoSelect) {
          salidaTipoSelect.onchange = function() {
            window['actualizarMetodoSalida_' + uniqueId](cidx, midx, 'tipo', this.value);
            if (this.value === "Custom...") {
              salidaCustomInput.style.display = "";
              btnPropsSalida.style.display = "inline-block";
              salidaCustomInput.focus();
            } else {
              salidaCustomInput.style.display = "none";
              btnPropsSalida.style.display = "none";
              window['actualizarMetodoSalida_' + uniqueId](cidx, midx, 'custom', "");
              window['actualizarMetodoSalida_' + uniqueId](cidx, midx, 'propiedades', []);
              propsBlockSalida.style.display = "none";
            }
          };
        }
        if (salidaCustomInput) {
          salidaCustomInput.oninput = function() {
            window['actualizarMetodoSalida_' + uniqueId](cidx, midx, 'custom', this.value);
          };
        }
        if (btnPropsSalida) {
          btnPropsSalida.onclick = function() {
            propsBlockSalida.style.display = propsBlockSalida.style.display === "none" ? "block" : "none";
            if (propsBlockSalida.style.display === "block") {
              renderCustomPropiedades(propsBlockSalida, salidaProps, (nuevasPropiedades) => {
                window['actualizarMetodoSalida_' + uniqueId](cidx, midx, 'propiedades', nuevasPropiedades);
              });
            }
          };
        }

        // Parámetros del método
        const parametrosItems = metodoDiv.querySelector('.parametros-items');
        metodo.parametros = metodo.parametros || [];
        metodo.parametros.forEach((param, pidx) => {
          const tipo = param.tipo || "";
          const isCustom = tipo === "Custom...";
          const customValue = isCustom ? (param.custom || "") : "";
          const propiedades = isCustom ? (param.propiedades || []) : [];
          const paramUniqueId = Math.random().toString(36).substr(2, 9);
          const paramDiv = document.createElement('div');
          paramDiv.style.display = "inline-block";
          paramDiv.style.marginRight = "10px";
          paramDiv.innerHTML = `
            <div style="display:flex;align-items:center;justify-content:space-between;">
              <div style="flex:1;">
                ${selectTipoDatoJava(tipo, "param-tipo")}
                <input class="param-nombre" value="${param.nombre||''}" placeholder="Nombre del parámetro" style="width:110px;" onchange="actualizarParametro_${uniqueId}(${cidx},${midx},${pidx},'nombre',this.value)" />
                <input class="param-custom" value="${customValue}" placeholder="Tipo personalizado" style="width:140px;${isCustom ? '' : 'display:none;'}" onchange="actualizarParametro_${uniqueId}(${cidx},${midx},${pidx},'custom',this.value)" />
                <input class="param-desc" value="${param.descripcion||''}" placeholder="Descripción" style="width:120px;" onchange="actualizarParametro_${uniqueId}(${cidx},${midx},${pidx},'descripcion',this.value)" />
                <button type="button" onclick="eliminarParametro_${uniqueId}(${cidx},${midx},${pidx})">🗑️</button>
              </div>
              ${isCustom ? `<button class="expand-btn" aria-expanded="false" onclick="toggleSection(this, 'custom-propiedades-block-${paramUniqueId}')">►</button>` : ""}
            </div>
            <div class="custom-propiedades-block" id="custom-propiedades-block-${paramUniqueId}" style="display:none; margin-top:8px; background:#f9f9f9; border:1px solid #b3d8fd; border-radius:5px; padding:8px;"></div>
          `;
          // Eventos para tipo y custom
          paramDiv.querySelector('.param-tipo').onchange = function() {
            window['actualizarParametro_' + uniqueId](cidx, midx, pidx, 'tipo', this.value);
            const customInput = paramDiv.querySelector('.param-custom');
            if (this.value === "Custom...") {
              customInput.style.display = "inline-block";
              customInput.focus();
            } else {
              customInput.style.display = "none";
              window['actualizarParametro_' + uniqueId](cidx, midx, pidx, 'custom', "");
              window['actualizarParametro_' + uniqueId](cidx, midx, pidx, 'propiedades', []);
              paramDiv.querySelector('.custom-propiedades-block').style.display = "none";
            }
          };
          paramDiv.querySelector('.param-custom').oninput = function() {
            window['actualizarParametro_' + uniqueId](cidx, midx, pidx, 'custom', this.value);
          };
          // Colapsar/expandir propiedades anidadas
          if (isCustom) {
            const btnExpand = paramDiv.querySelector('.expand-btn');
            const propsBlock = paramDiv.querySelector('.custom-propiedades-block');
            btnExpand.onclick = function() {
              if (propsBlock.style.display === "none") {
                propsBlock.style.display = "block";
                btnExpand.textContent = "▼";
                btnExpand.setAttribute("aria-expanded", "true");
                renderCustomPropiedades(propsBlock, propiedades, (nuevasPropiedades) => {
                  window['actualizarParametro_' + uniqueId](cidx, midx, pidx, 'propiedades', nuevasPropiedades);
                });
              } else {
                propsBlock.style.display = "none";
                btnExpand.textContent = "►";
                btnExpand.setAttribute("aria-expanded", "false");
              }
            };
          }
          parametrosItems.appendChild(paramDiv);
        });

        // --- Nuevo parámetro: eventos para custom ---
        const nuevoParamTipo = metodoDiv.querySelector('.nuevo-param-tipo');
        const nuevoParamCustom = metodoDiv.querySelector('.nuevo-param-custom');
        if (nuevoParamTipo) {
          nuevoParamTipo.onchange = function() {
            if (this.value === "Custom...") {
              nuevoParamCustom.style.display = "inline-block";
              nuevoParamCustom.focus();
            } else {
              nuevoParamCustom.style.display = "none";
              nuevoParamCustom.value = "";
            }
          };
        }
      });
    });
  }

  // Funciones para manipular clases y métodos (con nombres únicos por instancia)
  window['agregarClase_' + uniqueId] = function() {
    const input = disenoDiv.querySelector('.nueva-clase');
    const nombre = input.value.trim();
    if (!nombre) return;
    clases.push({ nombre, metodos: [] });
    input.value = '';
    renderClasesYMetodos();
  };
  window['eliminarClase_' + uniqueId] = function(cidx) {
    clases.splice(cidx, 1);
    renderClasesYMetodos();
  };
  window['agregarMetodo_' + uniqueId] = function(cidx) {
    const claseDiv = disenoDiv.querySelectorAll('.clases-list > div')[cidx];
    const nombre = claseDiv.querySelector('.nuevo-metodo-nombre').value.trim();
    const descripcion = claseDiv.querySelector('.nuevo-metodo-desc').value.trim();
    const salidaTipo = claseDiv.querySelector('.nuevo-metodo-salida-tipo').value;
    const salidaCustom = claseDiv.querySelector('.nuevo-metodo-custom').value.trim();
    const salidaDesc = claseDiv.querySelector('.nuevo-metodo-salida-desc').value.trim();
    let salida = { tipo: salidaTipo, custom: "", descripcion: salidaDesc, propiedades: [] };
    if (salidaTipo === "Custom...") {
      salida.custom = salidaCustom;
      salida.propiedades = [];
    }
    if (!nombre) return;
    clases[cidx].metodos.push({
      nombre,
      descripcion,
      parametros: [],
      salida: salida
    });
    claseDiv.querySelector('.nuevo-metodo-nombre').value = '';
    claseDiv.querySelector('.nuevo-metodo-desc').value = '';
    claseDiv.querySelector('.nuevo-metodo-salida-tipo').selectedIndex = 0;
    claseDiv.querySelector('.nuevo-metodo-custom').value = '';
    claseDiv.querySelector('.nuevo-metodo-custom').style.display = "none";
    claseDiv.querySelector('.nuevo-metodo-salida-desc').value = '';
    renderClasesYMetodos();
  };
  window['eliminarMetodo_' + uniqueId] = function(cidx, midx) {
    clases[cidx].metodos.splice(midx, 1);
    renderClasesYMetodos();
  };
  window['actualizarMetodo_' + uniqueId] = function(cidx, midx, campo, valor) {
    clases[cidx].metodos[midx][campo] = valor;
  };
  window['actualizarMetodoSalida_' + uniqueId] = function(cidx, midx, campo, valor) {
    clases[cidx].metodos[midx].salida = clases[cidx].metodos[midx].salida || {};
    clases[cidx].metodos[midx].salida[campo] = valor;
  };
  window['agregarParametro_' + uniqueId] = function(cidx, midx) {
    const claseDiv = disenoDiv.querySelectorAll('.clases-list > div')[cidx];
    const metodoDiv = claseDiv.querySelectorAll('.metodo-block')[midx];
    const tipo = metodoDiv.querySelector('.nuevo-param-tipo').value;
    const custom = metodoDiv.querySelector('.nuevo-param-custom').value.trim();
    const nombre = metodoDiv.querySelector('.nuevo-param-nombre').value.trim();
    const descripcion = metodoDiv.querySelector('.nuevo-param-desc').value.trim();
    let param = { tipo: tipo, custom: "", nombre: nombre, descripcion: descripcion, propiedades: [] };
    if (tipo === "Custom...") {
      param.custom = custom;
      param.propiedades = [];
    }
    if (!nombre || !tipo) return;
    clases[cidx].metodos[midx].parametros.push(param);
    metodoDiv.querySelector('.nuevo-param-tipo').selectedIndex = 0;
    metodoDiv.querySelector('.nuevo-param-custom').value = '';
    metodoDiv.querySelector('.nuevo-param-custom').style.display = "none";
    metodoDiv.querySelector('.nuevo-param-nombre').value = '';
    metodoDiv.querySelector('.nuevo-param-desc').value = '';
    renderClasesYMetodos();
  };
  window['eliminarParametro_' + uniqueId] = function(cidx, midx, pidx) {
    clases[cidx].metodos[midx].parametros.splice(pidx, 1);
    renderClasesYMetodos();
  };
  window['actualizarParametro_' + uniqueId] = function(cidx, midx, pidx, campo, valor) {
    clases[cidx].metodos[midx].parametros[pidx][campo] = valor;
  };

  // Botón para agregar clase
  disenoDiv.querySelector('.add-clase-btn').onclick = window['agregarClase_' + uniqueId];

  // Para guardar los datos en tu estructura principal:
  window['getDisenoTecnico_' + uniqueId] = function() {
    return {
      clases: clases,
      patrones: disenoDiv.querySelector('.diseno-patrones').value,
      diagrama: disenoDiv.querySelector('.diseno-diagrama').value,
      notas: disenoDiv.querySelector('.diseno-notas').value
    };
  };

  // Render inicial
  renderClasesYMetodos();
}