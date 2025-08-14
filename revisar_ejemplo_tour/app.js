document.addEventListener('DOMContentLoaded', function() {
    // Configuración de los pasos del tour
    const tourConfig = {
        autoFill: true,
        progress: true,
        keyboard: true,
        storage: true,
        steps: [
            {
                element: '#nombre',
                title: 'Campo Nombre',
                description: 'Ingrese su nombre completo. Este campo es obligatorio para identificar al participante.',
                value: 'Juan Pérez',
                position: 'right',
                animate: true,
                onShow: function(element) {
                    TourEffects.pulse(element);
                }
            },
            {
                element: '#email',
                title: 'Correo Electrónico',
                description: 'Proporcione un email válido para recibir notificaciones sobre el consenso.',
                value: 'juan.perez@ejemplo.com',
                position: 'right',
                animate: true,
                onShow: function(element) {
                    const el = document.querySelector(element);
                    el.addEventListener('change', function() {
                        const isValid = TourValidation.validateEmail(this.value);
                        TourValidation.addValidationFeedback(element, isValid);
                    });
                }
            },
            {
                element: '#propuesta',
                title: 'Su Propuesta',
                description: 'Describa detalladamente su propuesta para el consenso. Sea claro y conciso.',
                value: 'Propongo implementar un sistema de votación digital para mejorar la participación ciudadana.',
                position: 'bottom',
                animate: true
            },
            {
                element: '#prioridad',
                title: 'Nivel de Prioridad',
                description: 'Seleccione la prioridad que considera debe tener su propuesta.',
                value: 'alta',
                position: 'right',
                animate: false,
                onShow: function(element) {
                    TourEffects.highlight(element);
                }
            },
            {
                element: '#fecha',
                title: 'Fecha de Implementación',
                description: 'Indique la fecha sugerida para implementar esta propuesta.',
                value: '2024-06-01',
                position: 'right',
                animate: false,
                onShow: function(element) {
                    console.log('Mostrando paso de fecha');
                    TourMessages.showInfo('Este es el último paso del tour');
                }
            }
        ],
        onComplete: function() {
            console.log('Tour completado!');
            showCompletionMessage();
            TourMessages.showSuccess('¡Tour completado exitosamente!');
        }
    };
    
    // Crear instancia del tour avanzado
    const tour = new AdvancedTour(tourConfig);
    
    // Iniciar tour al hacer clic en el botón
    document.getElementById('startTour').addEventListener('click', function() {
        tour.start();
        // Mostrar hint de teclado
        showKeyboardHint();
    });
    
    // Función para mostrar mensaje de finalización
    function showCompletionMessage() {
        const message = document.createElement('div');
        message.className = 'completion-message';
        message.innerHTML = `
            <h3>¡Tour Completado!</h3>
            <p>Ahora puede revisar los datos ingresados y enviar el formulario.</p>
            <button onclick="this.parentElement.remove()" class="btn-close-message">Cerrar</button>
        `;
        document.body.appendChild(message);
        
        setTimeout(() => {
            if (message.parentElement) {
                message.remove();
            }
        }, 5000);
    }
    
    // Función para mostrar hint de teclado
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
    
    // Validación del formulario
    document.getElementById('consensusForm').addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Obtener valores del formulario
        const formData = new FormData(this);
        const data = Object.fromEntries(formData);
        
        // Validar campos
        let isValid = true;
        const requiredFields = ['nombre', 'email', 'propuesta', 'prioridad', 'fecha'];
        
        requiredFields.forEach(field => {
            const element = document.getElementById(field);
            if (!element.value) {
                isValid = false;
                TourEffects.shake(`#${field}`);
                element.classList.add('error');
            } else {
                element.classList.remove('error');
            }
        });
        
        if (isValid) {
            console.log('Datos del formulario:', data);
            TourMessages.showSuccess('Formulario enviado exitosamente!');
            
            // Aquí puedes agregar la lógica para enviar los datos al servidor
            // fetch('/api/consensus', { method: 'POST', body: JSON.stringify(data) })
        } else {
            TourMessages.showError('Por favor complete todos los campos requeridos');
        }
    });
    
    // Limpiar errores al escribir
    document.querySelectorAll('.form-control').forEach(input => {
        input.addEventListener('input', function() {
            this.classList.remove('error');
        });
    });
});