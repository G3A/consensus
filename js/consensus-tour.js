document.addEventListener('DOMContentLoaded', function() {
    
    // Variable global para almacenar el JSON cargado
    let jsonDataCargado = null;
    
    // Función mejorada para esperar elementos
    function waitForElement(selector, callback, maxAttempts = 100) {
        let attempts = 0;
        const interval = setInterval(() => {
            const element = document.querySelector(selector);
            attempts++;
            
            if (element) {
                clearInterval(interval);
                setTimeout(() => callback(element), 100);
            } else if (attempts >= maxAttempts) {
                clearInterval(interval);
                console.warn(`No se pudo encontrar el elemento: ${selector}`);
                callback(null);
            }
        }, 100);
    }
    
    // Función para generar pasos del tour PROGRESIVOS
    function generarPasosDesdeJSON(jsonData) {
        const pasos = [];
        
        // Guardar el JSON para uso progresivo
        jsonDataCargado = jsonData;
        
        // Contadores para rastrear índices reales
        let contadorFuncionalidades = [];
        let contadorHistorias = {};
        
        // Paso 1: Visión
        pasos.push({
            element: '#visionGeneral',
            title: '🔭 Visión General',
            description: 'Define la visión estratégica de tu proyecto.',
            value: jsonData.vision || '',
            position: 'bottom',
            animate: true,
            onShow: function(element) {
                const visionInput = document.getElementById('visionGeneral');
                if (visionInput) {
                    visionInput.value = '';
                    TourEffects.pulse(element);
                }
                TourMessages.showInfo('Comenzaremos agregando elementos uno por uno');
            }
        });
        
/*
        pasos.push({
            element: '#btnLimpiar',
            title: '🧹 Preparando el Workspace',
            description: 'El tour te guiará paso a paso por cada elemento del proyecto.',
            position: 'bottom',
            animate: false,
            onShow: function() {
                TourMessages.showInfo('Comenzaremos agregando elementos uno por uno');
            }
        });
        */
        
        // Recorrer cada objetivo
        jsonData.objetivos_de_negocio.forEach((objetivo, objIndex) => {
            
            // Inicializar contador de funcionalidades para este objetivo
            contadorFuncionalidades[objIndex] = 0;
            
            // Paso para MOSTRAR dónde se agrega el objetivo
            pasos.push({
                element: 'button[onclick="agregarObjetivo()"]',
                title: `🎯🏆➕ Agregar Objetivo ${objIndex + 1}`,
                description: `Vamos a agregar: "${objetivo.descripcion}"`,
                position: 'top',
                animate: false,
                onShow: function() {
                    TourEffects.pulse('button[onclick="agregarObjetivo()"]');
                }
            });
            
            // Paso para agregar el objetivo con estructura vacía
            pasos.push({
                element: 'button[onclick="agregarObjetivo()"]',
                title: 'Agregando el objetivo...',
                description: 'Click para agregar el objetivo de negocio',
                position: 'top',
                animate: false,
                onShow: function() {
                    if (document.querySelectorAll('[id^="objetivo-"]').length <= objIndex) {
                        window.agregarObjetivo();
                    }
                }
            });
            
            // Llenar campos del objetivo
            if (objetivo.id) {
                pasos.push({
                    element: `#objetivo-${objIndex} .objetivo-id`,
                    title: '🎯🏆🔑 ID del Objetivo',
                    description: 'Asignando identificador único',
                    value: objetivo.id,
                    position: 'right',
                    animate: true,
                    waitFor: true,
                    selector: `#objetivo-${objIndex} .objetivo-id`,
                    delayBefore: 500
                });
            }
            
            if (objetivo.descripcion) {
                pasos.push({
                    element: `#objetivo-${objIndex} .objetivo-desc`,
                    title: '🎯🏆📄 Descripción del Objetivo',
                    description: 'Definiendo qué queremos lograr',
                    value: objetivo.descripcion,
                    position: 'right',
                    animate: true,
                    waitFor: true,
                    selector: `#objetivo-${objIndex} .objetivo-desc`
                });
            }
            
            if (objetivo.kpi) {
                pasos.push({
                    element: `#objetivo-${objIndex} .objetivo-kpi`,
                    title: '🎯🏆📏📊 KPI del Objetivo',
                    description: 'Métricas para medir el éxito',
                    value: objetivo.kpi,
                    position: 'right',
                    animate: true,
                    waitFor: true,
                    selector: `#objetivo-${objIndex} .objetivo-kpi`
                });
            }
            
            if (objetivo.prioridad) {
                pasos.push({
                    element: `#objetivo-${objIndex} .objetivo-prioridad`,
                    title: '🎯🏆🔥❗️ Prioridad',
                    description: 'Nivel de importancia',
                    value: objetivo.prioridad,
                    position: 'right',
                    animate: false,
                    waitFor: true,
                    selector: `#objetivo-${objIndex} .objetivo-prioridad`
                });
            }
            
            if (objetivo.responsable) {
                pasos.push({
                    element: `#objetivo-${objIndex} .objetivo-responsable`,
                    title: '🎯🏆👤 Responsable',
                    description: 'Quién está a cargo',
                    value: objetivo.responsable,
                    position: 'right',
                    animate: true,
                    waitFor: true,
                    selector: `#objetivo-${objIndex} .objetivo-responsable`
                });
            }

            if (objetivo.estado) {
                pasos.push({
                    element: `#objetivo-${objIndex} .objetivo-estado`,
                    title: '🎯🏆🚦📌 Estado',
                    description: 'Cuál es el estado actual',
                    value: objetivo.estado,
                    position: 'right',
                    animate: true,
                    waitFor: true,
                    selector: `#objetivo-${objIndex} .objetivo-estado`
                });
            }

            if (objetivo.notas) {
                pasos.push({
                    element: `#objetivo-${objIndex} .objetivo-notas`,
                    title: '🎯🏆📝 Notas',
                    description: '¿Qué información adicional o aclaraciones hay?',
                    value: objetivo.notas,
                    position: 'right',
                    animate: true,
                    waitFor: true,
                    selector: `#objetivo-${objIndex} .objetivo-notas`
                });
            }
            
            // Para cada funcionalidad
            objetivo.funcionalidades.forEach((func, funcJsonIndex) => {
                
                // El índice real de la funcionalidad será el contador actual
                const funcRealIndex = contadorFuncionalidades[objIndex];
                
                // Mostrar dónde agregar funcionalidad
                pasos.push({
                    element: `#objetivo-${objIndex} button[onclick*="agregarFuncionalidad"]`,
                    title: `⚙️🧩➕ Agregar Funcionalidad`,
                    description: `Agregaremos: "${func.nombre}"`,
                    position: 'top',
                    animate: false,
                    waitFor: true,
                    selector: `#objetivo-${objIndex} button[onclick*="agregarFuncionalidad"]`,
                    onShow: function() {
                        TourEffects.pulse(`#objetivo-${objIndex} button[onclick*="agregarFuncionalidad"]`);
                    }
                });
                
                // Agregar funcionalidad
                pasos.push({
                    element: `#objetivo-${objIndex} button[onclick*="agregarFuncionalidad"]`,
                    title: 'Agregando funcionalidad...',
                    description: 'Click para crear la funcionalidad',
                    position: 'top',
                    animate: false,
                    waitFor: true,
                    selector: `#objetivo-${objIndex} button[onclick*="agregarFuncionalidad"]`,
                    onShow: function() {
                        window.agregarFuncionalidad(objIndex);
                        
                        // Incrementar contador
                        contadorFuncionalidades[objIndex]++;
                        
                        // Inicializar contador de historias para esta funcionalidad
                        const key = `${objIndex}-${funcRealIndex}`;
                        contadorHistorias[key] = 0;
                    }
                });
                
                // Llenar campos de la funcionalidad usando el índice real
                if (func.id) {
                    pasos.push({
                        element: `#func-${objIndex}-${funcRealIndex} .func-id`,
                        title: '⚙️🧩🔑 ID de Funcionalidad',
                        description: 'Identificador único',
                        value: func.id,
                        position: 'right',
                        animate: true,
                        waitFor: true,
                        selector: `#func-${objIndex}-${funcRealIndex} .func-id`,
                        delayBefore: 500
                    });
                }
                
                if (func.nombre) {
                    pasos.push({
                        element: `#func-${objIndex}-${funcRealIndex} .nombre`,
                        title: '⚙️🧩🏷️ Nombre de la Funcionalidad',
                        description: 'Nombre descriptivo',
                        value: func.nombre,
                        position: 'right',
                        animate: true,
                        waitFor: true,
                        selector: `#func-${objIndex}-${funcRealIndex} .nombre`
                    });
                }
                
                if (func.namespace) {
                    pasos.push({
                        element: `#func-${objIndex}-${funcRealIndex} .func-namespace`,
                        title: '⚙️🧩📦 Namespace/Package',
                        description: 'Estructura del código',
                        value: func.namespace,
                        position: 'right',
                        animate: true,
                        waitFor: true,
                        selector: `#func-${objIndex}-${funcRealIndex} .func-namespace`
                    });
                }
                if (func.actor) {
                    pasos.push({
                        element: `#func-${objIndex}-${funcRealIndex} .actor`,
                        title: '⚙️🧩🎭 Actor Principal',
                        description: 'Quién usará esta funcionalidad',
                        value: func.actor,
                        position: 'right',
                        animate: true,
                        waitFor: true,
                        selector: `#func-${objIndex}-${funcRealIndex} .actor`
                    });
                }
                
                if (func.impacto) {
                    pasos.push({
                        element: `#func-${objIndex}-${funcRealIndex} .impacto`,
                        title: '⚙️🧩💥 Impacto de Negocio',
                        description: 'El valor que aporta',
                        value: func.impacto,
                        position: 'right',
                        animate: true,
                        waitFor: true,
                        selector: `#func-${objIndex}-${funcRealIndex} .impacto`
                    });
                }
                
                if (func.tags) {
                    pasos.push({
                        element: `#func-${objIndex}-${funcRealIndex} .func-tags`,
                        title: '⚙️🧩#️⃣ Tags',
                        description: 'Etiquetas para categorización',
                        value: func.tags,
                        position: 'right',
                        animate: true,
                        waitFor: true,
                        selector: `#func-${objIndex}-${funcRealIndex} .func-tags`
                    });
                }

                if (func.estado) {
                    pasos.push({
                        element: `#func-${objIndex}-${funcRealIndex} .func-estado`,
                        title: '⚙️🧩🚦📌 Estado',
                        description: 'Cuál es el estado actual',
                        value: func.estado,
                        position: 'right',
                        animate: true,
                        waitFor: true,
                        selector: `#func-${objIndex}-${funcRealIndex} .func-estado`
                    });
                }

                if (func.responsable) {
                    pasos.push({
                        element: `#func-${objIndex}-${funcRealIndex} .func-responsable`,
                        title: '⚙️🧩👤 Responsable',
                        description: 'Quién está a cargo',
                        value: func.responsable,
                        position: 'right',
                        animate: true,
                        waitFor: true,
                        selector: `#func-${objIndex}-${funcRealIndex} .func-responsable`
                    });
                }

                if (func.notas) {
                    pasos.push({
                        element: `#func-${objIndex}-${funcRealIndex} .func-notas`,
                        title: '⚙️🧩📝 Notas',
                        description: '¿Qué información adicional o aclaraciones hay?',
                        value: func.notas,
                        position: 'right',
                        animate: true,
                        waitFor: true,
                        selector: `#func-${objIndex}-${funcRealIndex} .func-notas`
                    });
                }

                if (func.enlace_doc) {
                    pasos.push({
                        element: `#func-${objIndex}-${funcRealIndex} .func-enlace-doc`,
                        title: '⚙️🧩🔗 Enlace a documentación',
                        description: '¿Dónde encuentro más información o recursos?',
                        value: func.enlace_doc,
                        position: 'right',
                        animate: true,
                        waitFor: true,
                        selector: `#func-${objIndex}-${funcRealIndex} .func-enlace-doc`
                    });
                }
                
                if (func.background) {
                    pasos.push({
                        element: `#func-${objIndex}-${funcRealIndex} .background`,
                        title: '⚙️🧩🧠 Background (Contexto)',
                        description: 'Condiciones previas',
                        value: func.background,
                        position: 'bottom',
                        animate: true,
                        waitFor: true,
                        selector: `#func-${objIndex}-${funcRealIndex} .background`
                    });
                }
                
                // Solo agregar la primera historia como ejemplo
                if (func.historias && func.historias.length > 0) {
                    const hist = func.historias[0];
                    const histKey = `${objIndex}-${funcRealIndex}`;
                    const histRealIndex = contadorHistorias[histKey] || 0;
                    
                    // Mostrar dónde agregar historia
                    pasos.push({
                        element: `#func-${objIndex}-${funcRealIndex} button[onclick*="agregarHistoria"]`,
                        title: `📖➕ Agregar Historia de Usuario`,
                        description: 'Agregaremos una historia de usuario',
                        position: 'top',
                        animate: false,
                        waitFor: true,
                        selector: `#func-${objIndex}-${funcRealIndex} button[onclick*="agregarHistoria"]`,
                        onShow: function() {
                            TourEffects.pulse(`#func-${objIndex}-${funcRealIndex} button[onclick*="agregarHistoria"]`);
                        }
                    });
                    
                    // Agregar historia
                    pasos.push({
                        element: `#func-${objIndex}-${funcRealIndex} button[onclick*="agregarHistoria"]`,
                        title: 'Agregando historia...',
                        description: 'Click para crear la historia',
                        position: 'top',
                        animate: false,
                        waitFor: true,
                        selector: `#func-${objIndex}-${funcRealIndex} button[onclick*="agregarHistoria"]`,
                        onShow: function() {
                            window.agregarHistoria(objIndex, funcRealIndex);
                            
                            // Incrementar contador
                            contadorHistorias[histKey] = (contadorHistorias[histKey] || 0) + 1;
                        }
                    });
                    
                    // El selector de la historia basado en su posición en el DOM
                    const histSelector = `#historias-${objIndex}-${funcRealIndex} .section:nth-child(${histRealIndex + 1})`;
                    
                    // Llenar campos de la historia
                    if (hist.id) {
                        pasos.push({
                            element: `${histSelector} .historia-id`,
                            title: '📖🔑 ID de Historia',
                            description: 'Identificador de la historia',
                            value: hist.id,
                            position: 'right',
                            animate: true,
                            waitFor: true,
                            selector: `${histSelector} .historia-id`,
                            delayBefore: 500
                        });
                    }
                    
                    if (hist.descripcion) {
                        pasos.push({
                            element: `${histSelector} .historia-desc`,
                            title: '📖📄 Descripción de la Historia',
                            description: 'Qué necesita el usuario',
                            value: hist.descripcion,
                            position: 'right',
                            animate: true,
                            waitFor: true,
                            selector: `${histSelector} .historia-desc`
                        });
                    }
                    
                    if (hist.package) {
                        pasos.push({
                            element: `${histSelector} .historia-package`,
                            title: '📖📦 Package/Vertical Slice',
                            description: 'Paquete contenedor del código',
                            value: hist.package,
                            position: 'right',
                            animate: true,
                            waitFor: true,
                            selector: `${histSelector} .historia-package`
                        });
                    }
                    
                    if (hist.dependencias) {
                        pasos.push({
                            element: `${histSelector} .historia-dependencias`,
                            title: '📖🔌 Dependencias',
                            description: '¿De qué depende esta historia?',
                            value: hist.dependencias,
                            position: 'right',
                            animate: true,
                            waitFor: true,
                            selector: `${histSelector} .historia-dependencias`
                        });
                    }

                    if (hist.estado) {
                        pasos.push({
                            element: `${histSelector} .historia-estado`,
                            title: '📖🚦📌 Estado',
                            description: 'Cuál es el estado actual',
                            value: hist.estado,
                            position: 'right',
                            animate: true,
                            waitFor: true,
                            selector: `${histSelector} .historia-estado`
                        });
                    }

                    if (hist.responsable) {
                        pasos.push({
                            element: `${histSelector} .historia-responsable`,
                            title: '📖👤 Responsable',
                            description: 'Quién está a cargo',
                            value: hist.responsable,
                            position: 'right',
                            animate: true,
                            waitFor: true,
                            selector: `${histSelector} .historia-responsable`
                        });
                    }

                    if (hist.notas) {
                        pasos.push({
                            element: `${histSelector} .historia-notas`,
                            title: '📖📝 Notas',
                            description: '¿Qué información adicional o aclaraciones hay?',
                            value: hist.notas,
                            position: 'right',
                            animate: true,
                            waitFor: true,
                            selector: `${histSelector} .historia-notas`
                        });
                    }
                    
                    // Solo el primer criterio como ejemplo
                    if (hist.criterios && hist.criterios.length > 0) {
                        const crit = hist.criterios[0];
                        
                        
                        pasos.push({
                            element: `${histSelector} button[onclick*="agregarCriterio"]`,
                            title: '✅➕ Agregar Criterio de Aceptación',
                            description: `Agregaremos: "${crit.titulo}"`,
                            position: 'top',
                            animate: false,
                            waitFor: true,
                            selector: `${histSelector} button[onclick*="agregarCriterio"]`,
                            onShow: function() {
                                window.agregarCriterio(objIndex, funcRealIndex, histRealIndex);
                            }
                        });
                        
                        // El criterio se renderiza en el contenedor de criterios
                        const critSelector = `#criterios-${objIndex}-${funcRealIndex}-${histRealIndex} .section:first-child`;
                        
                        if (crit.comentario) {
                            pasos.push({
                                element: `${critSelector} .criterio-comentario`,
                                title: '✅💬 Comentario',
                                description: 'Descripción del criterio',
                                value: crit.comentario,
                                position: 'right',
                                animate: true,
                                waitFor: true,
                                selector: `${critSelector} .criterio-comentario`
                            });
                        }
                        
                        if (crit.tags) {
                            pasos.push({
                                element: `${critSelector} .criterio-tags`,
                                title: '✅#️⃣ Tags',
                                description: 'Etiquetas para categorización',
                                value: crit.tags,
                                position: 'right',
                                animate: true,
                                waitFor: true,
                                selector: `${critSelector} .criterio-tags`
                            });
                        }

                        if (crit.titulo) {
                            pasos.push({
                                element: `${critSelector} .criterio-titulo`,
                                title: '✅📰 Título del Escenario',
                                description: 'Nombre del caso de prueba',
                                value: crit.titulo,
                                position: 'right',
                                animate: true,
                                waitFor: true,
                                selector: `${critSelector} .criterio-titulo`,
                                delayBefore: 500
                            });
                        }

                        if (crit.estado) {
                            pasos.push({
                                element: `${critSelector} .criterio-estado`,
                                title: '✅🚦📌 Estado',
                                description: 'Cuál es el estado actual',
                                value: crit.estado,
                                position: 'right',
                                animate: true,
                                waitFor: true,
                                selector: `${critSelector} .criterio-estado`
                            });
                        }
                        
                        if (crit.notas) {
                            pasos.push({
                                element: `${critSelector} .criterio-notas`,
                                title: '✅📝 Notas',
                                description: '¿Qué información adicional o aclaraciones hay?',
                                value: crit.notas,
                                position: 'right',
                                animate: true,
                                waitFor: true,
                                selector: `${critSelector} .criterio-notas`
                            });
                        }

                        
                        if (crit.given) {
                            pasos.push({
                                element: `${critSelector} .criterio-given`,
                                title: '✅🎬 Given (Dado)',
                                description: 'Precondiciones',
                                value: crit.given,
                                position: 'right',
                                animate: true,
                                waitFor: true,
                                selector: `${critSelector} .criterio-given`
                            });
                        }
                        
                        if (crit.when) {
                            pasos.push({
                                element: `${critSelector} .criterio-when`,
                                title: '✅▶️⚡ When (Cuando)',
                                description: 'Acción a realizar',
                                value: crit.when,
                                position: 'right',
                                animate: true,
                                waitFor: true,
                                selector: `${critSelector} .criterio-when`
                            });
                        }
                        
                        if (crit.then) {
                            pasos.push({
                                element: `${critSelector} .criterio-then`,
                                title: '✅✔️ Then (Entonces)',
                                description: 'Resultado esperado',
                                value: crit.then,
                                position: 'right',
                                animate: true,
                                waitFor: true,
                                selector: `${critSelector} .criterio-then`
                            });
                        }
                        
                        // Mensaje sobre criterios adicionales
                        if (hist.criterios.length > 1) {
                            pasos.push({
                                element: `${histSelector}`,
                                title: `📊 ${hist.criterios.length - 1} criterios adicionales`,
                                description: `Esta historia tiene ${hist.criterios.length} criterios en total.`,
                                position: 'top',
                                animate: false,
                                onShow: function() {
                                    TourMessages.showInfo(`Puedes agregar los ${hist.criterios.length - 1} criterios restantes después del tour`);
                                }
                            });
                        }
                    }
                    
                    // Mensaje sobre historias adicionales
                    if (func.historias.length > 1) {
                        pasos.push({
                            element: `#func-${objIndex}-${funcRealIndex}`,
                            title: `📚 ${func.historias.length - 1} historias adicionales`,
                            description: `Esta funcionalidad tiene ${func.historias.length} historias en total.`,
                            position: 'top',
                            animate: false,
                            onShow: function() {
                                TourMessages.showInfo('Puedes agregar las historias restantes después del tour');
                            }
                        });
                    }
                }
            });
        });
        
        // Pasos finales
        pasos.push({
            element: 'button[onclick="verPrevisualizacion()"]',
            title: '👁️ Previsualización',
            description: 'Puedes ver cómo queda el archivo .feature',
            position: 'bottom',
            animate: false,
            onShow: function() {
                // Actualizar datos desde el DOM antes de previsualizar
                window.actualizarDatosDesdeDOM();
                TourMessages.showInfo('El proyecto se ha cargado paso a paso');
            }
        });
        
        pasos.push({
            element: 'button[onclick="guardarTrabajo()"]',
            title: '💾 Guardar Trabajo',
            description: 'Guarda tu progreso en formato JSON',
            position: 'bottom',
            animate: false,
            onShow: function() {
                TourMessages.showSuccess('¡Tour completado! Has visto cómo se construye el proyecto paso a paso.');
            }
        });
        
        return pasos;
    }
    
    // Resto del código permanece igual...
    
    // Clase del tour mejorada
    class ConsensusTour extends InteractiveTour {
        constructor(config) {
            super(config);
            this.isWaiting = false;
            
            if (config.keyboard) {
                this.initKeyboardNav();
            }
        }
        
        initKeyboardNav() {
            document.addEventListener('keydown', (e) => {
                if (!document.body.classList.contains('tour-active')) return;
                
                switch(e.key) {
                    case 'ArrowLeft':
                        e.preventDefault();
                        this.previousStep();
                        break;
                    case 'ArrowRight':
                        e.preventDefault();
                        this.nextStep();
                        break;
                    case 'Escape':
                        e.preventDefault();
                        this.finish();
                        break;
                }
            });
        }
        
        showStep() {
            const step = this.steps[this.currentStep];
            if (!step) return;
            
            if (step.delayBefore) {
                setTimeout(() => {
                    this.executeStep(step);
                }, step.delayBefore);
            } else {
                this.executeStep(step);
            }
        }
        
        executeStep(step) {
            if (step.waitFor && step.selector) {
                this.isWaiting = true;
                waitForElement(step.selector, (element) => {
                    this.isWaiting = false;
                    if (element) {
                        super.showStep();
                    } else {
                        console.warn(`Elemento no encontrado: ${step.selector}, continuando...`);
                        setTimeout(() => this.nextStep(), 500);
                    }
                });
            } else {
                super.showStep();
            }
        }
        
        nextStep() {
            if (this.isWaiting) {
                console.log('Esperando a que se complete el paso actual...');
                return;
            }
            
            if (this.currentStep < this.steps.length - 1) {
                this.currentStep++;
                this.showStep();
            }
        }
        
        previousStep() {
            if (this.isWaiting) return;
            
            if (this.currentStep > 0) {
                this.currentStep--;
                this.showStep();
            }
        }
    }
    
    // JSON de ejemplo simplificado
    const jsonEjemplo = {
        "vision": "Sistema de gestión eficiente y escalable",
        "objetivos_de_negocio": [
            {
                "id": "OBJ-001",
                "descripcion": "Implementar gestión básica de usuarios",
                "kpi": "100% de funcionalidad básica cubierta",
                "prioridad": "Alta",
                "responsable": "Equipo de Desarrollo",
                "estado": "En desarrollo",
                "notas": "Prioridad Q1 2024",
                "funcionalidades": [
                    {
                        "id": "FUNC-001",
                        "nombre": "Gestión de Usuarios",
                        "namespace": "com.empresa.usuarios",
                        "actor": "Administrador del Sistema",
                        "impacto": "permitir control total sobre los usuarios",
                        "tags": "@usuarios @admin",
                        "estado": "En análisis",
                        "responsable": "Juan Pérez",
                        "notas": "",
                        "enlace_doc": "",
                        "background": "el sistema está inicializado con datos básicos",
                        "historias": [
                            {
                                "id": "HU-001",
                                "descripcion": "Como administrador\nQuiero gestionar usuarios\nPara mantener el control del acceso",
                                "package": "user.management",
                                "dependencias": "",
                                "estado": "Pendiente",
                                "responsable": "Ana García",
                                "notas": "",
                                "criterios": [
                                    {
                                        "titulo": "Crear usuario nuevo",
                                        "comentario": "Validar creación de usuarios",
                                        "tags": "@crear @usuario @smoke",
                                        "estado": "Pendiente",
                                        "notas": "",
                                        "given": "que soy administrador del sistema",
                                        "when": "creo un nuevo usuario con datos válidos",
                                        "then": "el usuario se guarda correctamente en el sistema",
                                        "clases_unitarias": {
                                            "contexto": "UserCreationTest.java",
                                            "especificacion": ["testCreateUserWithValidData", "testCreateUserWithInvalidData"]
                                        }
                                    },
                                    {
                                        "titulo": "Editar usuario existente",
                                        "comentario": "Validar edición de usuarios",
                                        "tags": "@editar @usuario",
                                        "given": "un usuario existente en el sistema",
                                        "when": "modifico sus datos",
                                        "then": "los cambios se guardan correctamente"
                                    }
                                ]
                            }
                        ]
                    }
                ]
            }
        ]
    };
    
    let tourActual = null;
    
    // Función para crear tour desde JSON
    function crearTourDesdeJSON(jsonData) {
        const pasos = generarPasosDesdeJSON(jsonData);
        
        return new ConsensusTour({
            autoFill: true,
            progress: true,
            keyboard: true,
            storage: false,
            steps: pasos,
            onComplete: function() {
                console.log('Tour completado!');
                showCompletionMessage();
            }
        });
    }
    
    // Función para cargar JSON desde archivo
    function cargarJSONParaTour(file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            try {
                const jsonData = JSON.parse(e.target.result);
                tourActual = crearTourDesdeJSON(jsonData);
                
                if (confirm('JSON cargado correctamente. ¿Iniciar el tour paso a paso?')) {
                    window.limpiarTodo();
                    setTimeout(() => {
                        tourActual.start();
                        showKeyboardHint();
                    }, 500);
                }
            } catch (error) {
                TourMessages.showError('Error en el JSON: ' + error.message);
            }
        };
        reader.readAsText(file);
    }
    
    // Botón de inicio del tour
    document.getElementById('startTour').addEventListener('click', function() {
        if (!tourActual) {
            tourActual = crearTourDesdeJSON(jsonEjemplo);
        }
        
        if (confirm('¿Iniciar el tour interactivo con el ejemplo?')) {
            window.limpiarTodo();
            setTimeout(() => {
                tourActual.start();
                showKeyboardHint();
            }, 500);
        }
    });
    
    // Botón para cargar JSON
    const btnCargarJSON = document.createElement('button');
    btnCargarJSON.innerHTML = '📁 Cargar JSON para Tour';
    btnCargarJSON.className = 'btn-tour-json';
    btnCargarJSON.style.cssText = `
        position: fixed;
        bottom: 30px;
        right: 250px;
        padding: 14px 28px;
        background: linear-gradient(135deg, #00b09b, #96c93d);
        color: white;
        border: none;
        border-radius: 50px;
        font-size: 16px;
        font-weight: 700;
        cursor: pointer;
        box-shadow: 0 6px 20px rgba(0, 176, 155, 0.4);
        transition: all 0.3s;
        z-index: 1000;
    `;
    document.body.appendChild(btnCargarJSON);
    
    // Input oculto para cargar archivo
    const inputJSON = document.createElement('input');
    inputJSON.type = 'file';
    inputJSON.accept = '.json';
    inputJSON.style.display = 'none';
    inputJSON.onchange = function(e) {
        if (e.target.files[0]) {
            cargarJSONParaTour(e.target.files[0]);
        }
    };
    document.body.appendChild(inputJSON);
    
    btnCargarJSON.addEventListener('click', () => {
        inputJSON.click();
    });
    
    // Funciones de UI
    function showCompletionMessage() {
        const message = document.createElement('div');
        message.className = 'completion-message';
        message.innerHTML = `
            <h3>🎉 ¡Tour Completado!</h3>
            <p>Has aprendido cómo se construye un proyecto paso a paso.</p>
            <p>Ahora puedes:</p>
            <ul style="text-align: left;">
                <li>Completar los elementos restantes manualmente</li>
                <li>Modificar los valores ingresados</li>
                <li>Descargar los archivos .feature</li>
                <li>Guardar tu trabajo en JSON</li>
            </ul>
            <button onclick="this.parentElement.remove()" class="btn-close-message">Entendido</button>
        `;
        document.body.appendChild(message);
        
        setTimeout(() => {
            if (message.parentElement) message.remove();
        }, 10000);
    }
    
    function showKeyboardHint() {
        const hint = document.createElement('div');
        hint.className = 'keyboard-hint';
        hint.innerHTML = `
            Usa <kbd>←</kbd> <kbd>→</kbd> para navegar y <kbd>ESC</kbd> para salir
        `;
        document.body.appendChild(hint);
        
        setTimeout(() => {
            hint.remove();
        }, 5000);
    }
});

