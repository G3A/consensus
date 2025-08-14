class InteractiveTour {
    constructor(config) {
        this.steps = config.steps || [];
        this.currentStep = 0;
        this.onComplete = config.onComplete || (() => {});
        this.autoFill = config.autoFill !== false;
        
        // Elementos DOM
        this.overlay = document.getElementById('tourOverlay');
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
        this.overlay.addEventListener('click', () => this.finish());
        
        // Prevenir que los clicks en el tooltip cierren el tour
        this.tooltip.addEventListener('click', (e) => e.stopPropagation());
    }
    
    start() {
        this.currentStep = 0;
        this.overlay.classList.add('active');
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
            this.fillField(step.element, step.value, step.animate);
        }
        
        // Posicionar tooltip
        this.positionTooltip(step.element, step.position);
        
        // Ejecutar callback personalizado si existe
        if (step.onShow) {
            step.onShow(step.element);
        }
    }
    
    fillField(selector, value, animate = true) {
        const element = document.querySelector(selector);
        if (!element) return;
        
        if (animate) {
            // Animación de escritura
            this.animateTyping(element, value);
        } else {
            // Llenar instantáneamente
            if (element.tagName === 'SELECT') {
                element.value = value;
            } else if (element.type === 'checkbox' || element.type === 'radio') {
                element.checked = value;
            } else {
                element.value = value;
            }
            
            // Disparar evento de cambio
            element.dispatchEvent(new Event('change', { bubbles: true }));
        }
    }
    
    animateTyping(element, text) {
        element.value = '';
        element.focus();
        
        let index = 0;
        const typeInterval = setInterval(() => {
            if (index < text.length) {
                element.value += text[index];
                index++;
                
                // Disparar evento input para validaciones en tiempo real
                element.dispatchEvent(new Event('input', { bubbles: true }));
            } else {
                clearInterval(typeInterval);
                element.dispatchEvent(new Event('change', { bubbles: true }));
            }
        }, 50);
    }
    
    highlightElement(selector) {
        // Remover highlight anterior
        document.querySelectorAll('.tour-highlight').forEach(el => {
            el.classList.remove('tour-highlight');
        });
        
        // Agregar highlight al elemento actual
        const element = document.querySelector(selector);
        if (element) {
            element.classList.add('tour-highlight');
            
            // Scroll al elemento si es necesario
            element.scrollIntoView({
                behavior: 'smooth',
                block: 'center'
            });
        }
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
        });
        
        // Ocultar overlay y tooltip
        this.overlay.classList.remove('active');
        this.tooltip.classList.remove('active');
        
        // Ejecutar callback de finalización
        this.onComplete();
    }
}