document.addEventListener('DOMContentLoaded', function() {
    // Configuración específica del tour para Consensus
    const tourConfig = {
        autoFill: true,
        progress: true,
        keyboard: true,
        storage: true,
        steps: [
            {
                element: '#visionGeneral',
                title: '🌟 Visión General',
                description: 'Define la visión estratégica de tu proyecto. Esta será la guía principal para todos los objetivos y funcionalidades.',
                value: 'Ser la plataforma líder en gestión de consenso colaborativo, permitiendo a equipos de desarrollo crear software de calidad mediante especificaciones BDD claras y consensuadas',
                position: 'bottom',
                animate: true,
                onShow: function(element) {
                    TourEffects.pulse(element);
                }
            },
            {
                element: '#btnLimpiar',
                title: '🧹 Gestión del Workspace',
                description: 'Puedes limpiar todo el trabajo actual para empezar desde cero cuando lo necesites.',
                position: 'bottom',
                animate: false,
                onShow: function() {
                    TourMessages.showInfo('También puedes cargar demos predefinidos desde el selector');
                }
            },
            {
                element: 'button[onclick="agregarObjetivo()"]',
                title: '➕ Agregar Objetivo de Negocio',
                description: 'Haz clic aquí para agregar tu primer objetivo de negocio. Cada objetivo puede contener múltiples funcionalidades.',
                position: 'top',
                animate: false,
                onShow: function() {
                    // Agregar automáticamente un objetivo para el tour
                    if (document.querySelectorAll('[id^="objetivo-"]').length === 0) {
                        window.agregarObjetivo({
                            id: "OBJ-001",
                            descripcion: "Implementar sistema de gestión de usuarios con autenticación segura",
                            kpi: "100% de usuarios autenticados de forma segura",
                            prioridad: "Alta",
                            responsable: "Equipo de Seguridad",
                            estado: "En Progreso",
                            notas: "Prioridad máxima para Q1 2024",
                            funcionalidades: []
                        });
                    }
                }
            },
            {
                element: '.objetivo-id',
                title: '🎯 ID del Objetivo',
                description: 'Asigna un identificador único para cada objetivo. Esto facilita el seguimiento y la trazabilidad.',
                value: 'OBJ-001',
                position: 'right',
                animate: true,
                waitFor: true,
                selector: '.objetivo-id'
            },
            {
                element: '.objetivo-desc',
                title: '📝 Descripción del Objetivo',
                description: 'Describe claramente qué se quiere lograr con este objetivo de negocio.',
                value: 'Implementar sistema de gestión de usuarios con autenticación segura y roles personalizables',
                position: 'right',
                animate: true,
                waitFor: true,
                selector: '.objetivo-desc'
            },
            {
                element: '.objetivo-kpi',
                title: '📊 KPI del Objetivo',
                description: 'Define indicadores medibles para evaluar el éxito del objetivo.',
                value: '100% de usuarios autenticados, 0% de brechas de seguridad',
                position: 'right',
                animate: true,
                waitFor: true,
                selector: '.objetivo-kpi'
            },
            {
                element: 'button[onclick*="agregarFuncionalidad"]',
                title: '🔧 Agregar Funcionalidad',
                description: 'Cada objetivo puede tener múltiples funcionalidades. Vamos a agregar una funcionalidad de ejemplo.',
                position: 'top',
                animate: false,
                waitFor: true,
                selector: 'button[onclick*="agregarFuncionalidad"]',
                onShow: function() {
                    // Agregar automáticamente una funcionalidad
                    const btnFuncionalidad = document.querySelector('button[onclick*="agregarFuncionalidad"]');
                    if (btnFuncionalidad) {
                        btnFuncionalidad.click();
                    }
                }
            },
            {
                element: '.func-id',
                title: '🔑 ID de Funcionalidad',
                description: 'Identificador único para la funcionalidad dentro del objetivo.',
                value: 'FUNC-LOGIN-001',
                position: 'right',
                animate: true,
                waitFor: true,
                selector: '.func-id'
            },
            {
                element: '.nombre',
                title: '📌 Nombre de la Funcionalidad',
                description: 'Nombre descriptivo de la funcionalidad que se va a implementar.',
                value: 'Autenticación de Usuarios',
                position: 'right',
                animate: true,
                waitFor: true,
                selector: '.nombre'
            },
            {
                element: '.actor',
                title: '👤 Actor Principal',
                description: 'Define quién es el usuario o sistema que utilizará esta funcionalidad.',
                value: 'Usuario del Sistema',
                position: 'right',
                animate: true,
                waitFor: true,
                selector: '.actor'
            },
            {
                element: '.impacto',
                title: '💡 Impacto de Negocio',
                description: 'Explica el valor o beneficio que aporta esta funcionalidad.',
                value: 'acceder de forma segura a las funcionalidades del sistema según mi rol',
                position: 'right',
                animate: true,
                waitFor: true,
                selector: '.impacto'
            },
            {
                element: '.background',
                title: '📋 Background (Contexto)',
                description: 'Define el contexto común para todos los escenarios de esta funcionalidad.',
                value: 'el sistema tiene usuarios registrados\nla base de datos está disponible\nel servicio de autenticación está activo',
                position: 'bottom',
                animate: true,
                waitFor: true,
                selector: '.background'
            },
            {
                element: 'button[onclick*="agregarHistoria"]',
                title: '📚 Agregar Historia de Usuario',
                description: 'Las historias de usuario detallan casos específicos de uso de la funcionalidad.',
                position: 'top',
                animate: false,
                waitFor: true,
                selector: 'button[onclick*="agregarHistoria"]',
                onShow: function() {
                    const btnHistoria = document.querySelector('button[onclick*="agregarHistoria"]');
                    if (btnHistoria) {
                        btnHistoria.click();
                    }
                }
            },
            {
                element: '.historia-id',
                title: '📖 ID de Historia',
                description: 'Identificador único para la historia de usuario.',
                value: 'HU-001',
                position: 'right',
                animate: true,
                waitFor: true,
                selector: '.historia-id'
            },
            {
                element: '.historia-desc',
                title: '✍️ Descripción de la Historia',
                description: 'Describe en detalle qué necesita el usuario en esta historia específica.',
                value: 'Como usuario registrado\nQuiero poder iniciar sesión con mi email y contraseña\nPara acceder a mi cuenta personal',
                position: 'right',
                animate: true,
                waitFor: true,
                selector: '.historia-desc'
            },
            {
                element: 'button[onclick*="agregarCriterio"]',
                title: '✅ Agregar Criterio de Aceptación',
                description: 'Los criterios de aceptación definen cuándo una historia está completa.',
                position: 'top',
                animate: false,
                waitFor: true,
                selector: 'button[onclick*="agregarCriterio"]',
                onShow: function() {
                    const btnCriterio = document.querySelector('button[onclick*="agregarCriterio"]');
                    if (btnCriterio) {
                        btnCriterio.click();
                    }
                }
            },
            {
                element: '.criterio-comentario',
                title: '💬 Comentario del Criterio',
                description: 'Breve descripción del criterio de aceptación.',
                value: 'Login exitoso con credenciales válidas',
                position: 'right',
                animate: true,
                waitFor: true,
                selector: '.criterio-comentario'
            },
            {
                element: '.criterio-titulo',
                title: '🏷️ Título del Escenario',
                description: 'Título del escenario Gherkin que se va a probar.',
                value: 'Usuario inicia sesión correctamente',
                position: 'right',
                animate: true,
                waitFor: true,
                selector: '.criterio-titulo'
            },
            {
                element: '.criterio-given',
                title: '🎬 Given (Dado)',
                description: 'Define el estado inicial o precondiciones del escenario.',
                value: 'un usuario registrado con email "usuario@ejemplo.com"\nla contraseña es "Password123"',
                position: 'right',
                animate: true,
                waitFor: true,
                selector: '.criterio-given'
            },
            {
                element: '.criterio-when',
                title: '⚡ When (Cuando)',
                description: 'Describe la acción que el usuario realiza.',
                value: 'el usuario ingresa su email "usuario@ejemplo.com"\ningresa su contraseña "Password123"\nhace clic en el botón "Iniciar Sesión"',
                position: 'right',
                animate: true,
                waitFor: true,
                selector: '.criterio-when'
            },
            {
                element: '.criterio-then',
                title: '✔️ Then (Entonces)',
                description: 'Define el resultado esperado después de la acción.',
                value: 'el sistema valida las credenciales\nel usuario es redirigido al dashboard\nse muestra un mensaje de "Bienvenido"',
                position: 'right',
                animate: true,
                waitFor: true,
                selector: '.criterio-then'
            },
            {
                element: '.criterio-tags',
                title: '🏷️ Tags del Escenario',
                description: 'Etiquetas para categorizar y filtrar los escenarios de prueba.',
                value: '@login @authentication @smoke',
                position: 'right',
                animate: true,
                waitFor: true,
                selector: '.criterio-tags'
            },
            {
                element: 'button[onclick="verPrevisualizacion()"]',
                title: '👁️ Previsualización',
                description: 'Puedes ver cómo quedará tu archivo .feature antes de descargarlo.',
                position: 'bottom',
                animate: false,
                onShow: function() {
                    TourMessages.showInfo('La previsualización muestra el formato Gherkin final');
                }
            },
            {
                element: 'button[onclick="descargarFeatures()"]',
                title: '⬇️ Descargar Features',
                description: 'Descarga todos tus archivos .feature listos para usar con Cucumber o cualquier framework BDD.',
                position: 'bottom',
                animate: false
            },
            {
                element: 'button[onclick="guardarTrabajo()"]',
                title: '💾 Guardar Trabajo',
                description: 'Guarda tu progreso en formato JSON para continuar más tarde.',
                position: 'bottom',
                animate: false,
                onShow: function() {
                    TourMessages.showSuccess('¡Tour completado! Ahora puedes continuar agregando más objetivos, funcionalidades e historias.');
                }
            }
        ],
        onComplete: function() {
            console.log('Tour de Consensus completado!');
            showCompletionMessage();
        }
    };
    
    // Función helper para esperar a que exista un elemento
    function waitForElement(selector, callback, maxAttempts = 50) {
        let attempts = 0;
        const interval = setInterval(() => {
            const element = document.querySelector(selector);
            attempts++;
            if (element || attempts >= maxAttempts) {
                clearInterval(interval);
                if (element) {
                    callback(element);
                }
            }
        }, 100);
    }
    
    // Extender la clase del tour para manejar elementos dinámicos
    class ConsensusTour extends AdvancedTour {
        showStep() {
            const step = this.steps[this.currentStep];
            if (!step) return;
            
            if (step.waitFor && step.selector) {
                waitForElement(step.selector, () => {
                    super.showStep();
                });
            } else {
                super.showStep();
            }
        }
    }
    
    // Crear instancia del tour
    const tour = new ConsensusTour(tourConfig);
    
    // Iniciar tour al hacer clic en el botón
    document.getElementById('startTour').addEventListener('click', function() {
        // Limpiar todo antes de empezar el tour
        if (confirm('El tour limpiará el contenido actual y mostrará un ejemplo completo. ¿Deseas continuar?')) {
            window.limpiarTodo();
            setTimeout(() => {
                tour.start();
                showKeyboardHint();
            }, 500);
        }
    });
    
    // Función para mostrar mensaje de finalización
    function showCompletionMessage() {
        const message = document.createElement('div');
        message.className = 'completion-message';
        message.innerHTML = `
            <h3>🎉 ¡Tour Completado!</h3>
            <p>Has aprendido a usar el sistema Consensus para crear especificaciones BDD.</p>
            <p>Ahora puedes:</p>
            <ul style="text-align: left; margin: 10px 0;">
                <li>Continuar agregando más criterios de aceptación</li>
                <li>Crear nuevas historias de usuario</li>
                <li>Agregar más funcionalidades y objetivos</li>
                <li>Descargar tus archivos .feature</li>
            </ul>
            <button onclick="this.parentElement.remove()" class="btn-close-message">Entendido</button>
        `;
        document.body.appendChild(message);
        
        setTimeout(() => {
            if (message.parentElement) {
                message.remove();
            }
        }, 10000);
    }
    
    // Función para mostrar hint de teclado
    function showKeyboardHint() {
        const hint = document.createElement('div');
        hint.className = 'keyboard-hint';
        hint.innerHTML = `
            Usa <kbd>←</kbd> <kbd>→</kbd> para navegar y <kbd>ESC</kbd> para salir del tour
        `;
        document.body.appendChild(hint);
        
        setTimeout(() => {
            hint.remove();
        }, 5000);
    }
});

// Efectos adicionales específicos para Consensus
class TourEffects {
    static pulse(element) {
        const el = document.querySelector(element);
        if (!el) return;
        
        el.classList.add('pulse-effect');
        setTimeout(() => {
            el.classList.remove('pulse-effect');
        }, 1000);
    }
    
    static highlight(element, color = '#ffd700') {
        const el = document.querySelector(element);
        if (!el) return;
        
        const originalBackground = el.style.backgroundColor;
        el.style.backgroundColor = color;
        el.style.transition = 'background-color 0.5s';
        
        setTimeout(() => {
            el.style.backgroundColor = originalBackground;
        }, 1000);
    }
}

// Mensajes personalizados
class TourMessages {
    static showSuccess(message) {
        this.showNotification(message, 'success');
    }
    
    static showError(message) {
        this.showNotification(message, 'error');
    }
    
    static showInfo(message) {
        this.showNotification(message, 'info');
    }
    
    static showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `tour-notification tour-notification-${type}`;
        notification.textContent = message;
        
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.classList.add('show');
        }, 100);
        
        setTimeout(() => {
            notification.classList.remove('show');
            setTimeout(() => {
                notification.remove();
            }, 300);
        }, 3000);
    }
}