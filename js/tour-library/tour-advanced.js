// Extensión avanzada del tour con más funcionalidades
class AdvancedTour extends InteractiveTour {
    constructor(config) {
        super(config);
        this.progress = config.progress || false;
        this.keyboard = config.keyboard !== false;
        this.storage = config.storage !== false;
        
        if (this.keyboard) {
            this.initKeyboardNavigation();
        }
        
        if (this.storage) {
            this.loadProgress();
        }
    }
    
    initKeyboardNavigation() {
        document.addEventListener('keydown', (e) => {
            if (!this.overlay.classList.contains('active')) return;
            
            switch(e.key) {
                case 'ArrowLeft':
                    this.previousStep();
                    break;
                case 'ArrowRight':
                    this.nextStep();
                    break;
                case 'Escape':
                    this.finish();
                    break;
            }
        });
    }
    
    saveProgress() {
        if (!this.storage) return;
        
        const progress = {
            currentStep: this.currentStep,
            completed: false,
            timestamp: new Date().toISOString()
        };
        
        localStorage.setItem('tourProgress', JSON.stringify(progress));
    }
    
    loadProgress() {
        if (!this.storage) return;
        
        const saved = localStorage.getItem('tourProgress');
        if (saved) {
            const progress = JSON.parse(saved);
            
            // Si el tour no se completó, preguntar si desea continuar
            if (!progress.completed && progress.currentStep > 0) {
                const daysSince = Math.floor((new Date() - new Date(progress.timestamp)) / (1000 * 60 * 60 * 24));
                if (daysSince < 7) { // Solo preguntar si han pasado menos de 7 días
                    if (confirm('¿Desea continuar el tour donde lo dejó?')) {
                        this.currentStep = progress.currentStep;
                        this.start();
                    }
                }
            }
        }
    }
    
    showStep() {
        super.showStep();
        
        if (this.storage) {
            this.saveProgress();
        }
        
        if (this.progress) {
            this.updateProgressBar();
        }
    }
    
    updateProgressBar() {
        let progressBar = document.getElementById('tourProgressBar');
        
        if (!progressBar) {
            progressBar = document.createElement('div');
            progressBar.id = 'tourProgressBar';
            progressBar.className = 'tour-progress-bar';
            progressBar.innerHTML = `
                <div class="tour-progress-fill"></div>
                <span class="tour-progress-text"></span>
            `;
            document.body.appendChild(progressBar);
        }
        
        const fill = progressBar.querySelector('.tour-progress-fill');
        const text = progressBar.querySelector('.tour-progress-text');
        const percentage = ((this.currentStep + 1) / this.steps.length) * 100;
        
        fill.style.width = `${percentage}%`;
        text.textContent = `${Math.round(percentage)}% completado`;
    }
    
    finish() {
        super.finish();
        
        if (this.storage) {
            const progress = {
                currentStep: this.currentStep,
                completed: true,
                timestamp: new Date().toISOString()
            };
            localStorage.setItem('tourProgress', JSON.stringify(progress));
        }
        
        // Remover barra de progreso si existe
        const progressBar = document.getElementById('tourProgressBar');
        if (progressBar) {
            progressBar.remove();
        }
    }
}