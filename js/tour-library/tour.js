class InteractiveTour {
    constructor(config) {
        this.steps = config.steps || [];
        this.currentStep = 0;
        this.onComplete = config.onComplete || (() => {});
        this.autoFill = config.autoFill !== false;
        
        // Elementos DOM
        this.tooltip = document.getElementById('tourTooltip');
        this.prevBtn = this.tooltip.querySelector('.tour-prev');
        this.nextBtn = this.tooltip.querySelector('.tour-next');
        this.finishBtn = this.tooltip.querySelector('.tour-finish');
        this.closeBtn = this.tooltip.querySelector('.tour-close');
        this.stepCounter = this.tooltip.querySelector('.tour-step-counter');
        this.tourTitle = this.tooltip.querySelector('.tour-title');
        this.tourDescription = this.tooltip.querySelector('.tour-description');
        
        this.init();
    }
    
    init() {
        // Event listeners
        this.prevBtn.addEventListener('click', () => this.previousStep());
        this.nextBtn.addEventListener('click', () => this.nextStep());
        this.finishBtn.addEventListener('click', () => this.finish());
        this.closeBtn.addEventListener('click', () => this.finish());
        
        // Prevenir que los clicks en el tooltip cierren el tour
        this.tooltip.addEventListener('click', (e) => e.stopPropagation());
        
        // Click fuera del elemento destacado para cerrar
        document.addEventListener('click', (e) => {
            if (this.tooltip.classList.contains('active')) {
                const highlighted = document.querySelector('.tour-highlight');
                if (highlighted && !highlighted.contains(e.target) && !this.tooltip.contains(e.target)) {
                    this.finish();
                }
            }
        });
    }
    
    start() {
        this.currentStep = 0;
        document.body.classList.add('tour-active');
        this.tooltip.classList.add('active');
        this.showStep();
    }
    
    showStep() {
        const step = this.steps[this.currentStep];
        if (!step) return;
        
        // Actualizar contador de pasos
        this.stepCounter.textContent = `Paso ${this.currentStep + 1} de ${this.steps.length}`;
        
        // Actualizar contenido
        this.tourTitle.textContent = step.title;
        this.tourDescription.textContent = step.description;
        
        // Actualizar botones
        this.updateButtons();
        
        // Resaltar elemento
        this.highlightElement(step.element);
        
        // Auto-llenar el campo si está configurado
        if (this.autoFill && step.value !== undefined) {
            setTimeout(() => {
                this.fillField(step.element, step.value, step.animate);
            }, 300);
        }
        
        // Posicionar tooltip
        this.positionTooltip(step.element, step.position);
        
        // Ejecutar callback personalizado si existe
        if (step.onShow) {
            setTimeout(() => {
                step.onShow(step.element);
            }, 100);
        }
    }
    
    highlightElement(selector) {
        // Remover highlight anterior
        document.querySelectorAll('.tour-highlight').forEach(el => {
            el.classList.remove('tour-highlight');
            // Restaurar estilos
            if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA' || el.tagName === 'SELECT') {
                el.style.removeProperty('color');
                el.style.removeProperty('background-color');
            }
        });
        
        // Agregar highlight al elemento actual
        const element = document.querySelector(selector);
        if (element) {
            element.classList.add('tour-highlight');
            
            // Asegurar visibilidad del texto
            if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA' || element.tagName === 'SELECT') {
                element.style.color = '#333';
                element.style.backgroundColor = 'white';
            }
            
            // Scroll al elemento si es necesario
            element.scrollIntoView({
                behavior: 'smooth',
                block: 'center'
            });
        }
    }
    
    fillField(selector, value, animate = true) {
        const element = document.querySelector(selector);
        if (!element) return;
        
        // Asegurar que el elemento es visible
        element.style.color = '#333';
        element.style.backgroundColor = 'white';
        
        if (animate && element.tagName !== 'SELECT') {
            this.animateTyping(element, value);
        } else {
            if (element.tagName === 'SELECT') {
                element.value = value;
            } else if (element.type === 'checkbox' || element.type === 'radio') {
                element.checked = value;
            } else {
                element.value = value;
            }
            
            element.dispatchEvent(new Event('change', { bubbles: true }));
            element.dispatchEvent(new Event('input', { bubbles: true }));
        }
    }
    
    animateTyping(element, text) {
        element.value = '';
        element.focus();
        
        // Agregar clase de animación
        element.classList.add('typing-animation');
        
        const lines = text.split('\n');
        let currentLine = 0;
        let currentChar = 0;
        let fullText = '';
        
        const typeInterval = setInterval(() => {
            if (currentLine < lines.length) {
                if (currentChar < lines[currentLine].length) {
                    fullText += lines[currentLine][currentChar];
                    element.value = fullText;
                    currentChar++;
                } else {
                    if (currentLine < lines.length - 1) {
                        fullText += '\n';
                        element.value = fullText;
                    }
                    currentLine++;
                    currentChar = 0;
                }
                
                element.dispatchEvent(new Event('input', { bubbles: true }));
                
                if (element.tagName === 'TEXTAREA') {
                    element.scrollTop = element.scrollHeight;
                }
            } else {
                clearInterval(typeInterval);
                element.classList.remove('typing-animation');
                element.dispatchEvent(new Event('change', { bubbles: true }));
            }
        }, 30);
    }
    
    positionTooltip(targetSelector, position = 'right') {
        const target = document.querySelector(targetSelector);
        if (!target) return;
        
        const targetRect = target.getBoundingClientRect();
        const tooltipRect = this.tooltip.getBoundingClientRect();
        
        let top, left;
        
        switch(position) {
            case 'top':
                top = targetRect.top - tooltipRect.height - 10;
                left = targetRect.left + (targetRect.width - tooltipRect.width) / 2;
                break;
            case 'bottom':
                top = targetRect.bottom + 10;
                left = targetRect.left + (targetRect.width - tooltipRect.width) / 2;
                break;
            case 'left':
                top = targetRect.top + (targetRect.height - tooltipRect.height) / 2;
                left = targetRect.left - tooltipRect.width - 10;
                break;
            case 'right':
            default:
                top = targetRect.top + (targetRect.height - tooltipRect.height) / 2;
                left = targetRect.right + 10;
                break;
        }
        
        // Ajustar si se sale de la pantalla
        if (left < 10) left = 10;
        if (left + tooltipRect.width > window.innerWidth - 10) {
            left = window.innerWidth - tooltipRect.width - 10;
        }
        if (top < 10) top = 10;
        if (top + tooltipRect.height > window.innerHeight - 10) {
            top = window.innerHeight - tooltipRect.height - 10;
        }
        
        this.tooltip.style.top = `${top}px`;
        this.tooltip.style.left = `${left}px`;
    }
    
    updateButtons() {
        this.prevBtn.style.display = this.currentStep > 0 ? 'inline-block' : 'none';
        this.nextBtn.style.display = this.currentStep < this.steps.length - 1 ? 'inline-block' : 'none';
        this.finishBtn.style.display = this.currentStep === this.steps.length - 1 ? 'inline-block' : 'none';
    }
    
    nextStep() {
        if (this.currentStep < this.steps.length - 1) {
            this.currentStep++;
            this.showStep();
        }
    }
    
    previousStep() {
        if (this.currentStep > 0) {
            this.currentStep--;
            this.showStep();
        }
    }
    
    finish() {
        // Remover highlights
        document.querySelectorAll('.tour-highlight').forEach(el => {
            el.classList.remove('tour-highlight');
            el.classList.remove('typing-animation');
            if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA' || el.tagName === 'SELECT') {
                el.style.removeProperty('color');
                el.style.removeProperty('background-color');
            }
        });
        
        // Remover clase del body
        document.body.classList.remove('tour-active');
        
        // Ocultar tooltip
        this.tooltip.classList.remove('active');
        
        // Ejecutar callback de finalización
        this.onComplete();
    }
}