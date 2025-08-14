// Validaciones específicas para Consensus
class TourValidation {
    static validateStep(step, element) {
        const el = document.querySelector(element);
        if (!el) return false;
        
        // Validaciones específicas por tipo de campo
        if (el.classList.contains('objetivo-id')) {
            return this.validateObjectiveId(el.value);
        }
        
        if (el.classList.contains('func-id')) {
            return this.validateFunctionalityId(el.value);
        }
        
        if (el.classList.contains('historia-id')) {
            return this.validateStoryId(el.value);
        }
        
        if (el.type === 'email') {
            return this.validateEmail(el.value);
        }
        
        if (el.required && !el.value) {
            return false;
        }
        
        return true;
    }
    
    static validateObjectiveId(id) {
        // Formato esperado: OBJ-XXX
        const pattern = /^OBJ-\d{3}$/;
        return pattern.test(id);
    }
    
    static validateFunctionalityId(id) {
        // Formato esperado: FUNC-XXX-NNN
        const pattern = /^FUNC-[A-Z]+-\d{3}$/;
        return pattern.test(id);
    }
    
    static validateStoryId(id) {
        // Formato esperado: HU-NNN
        const pattern = /^HU-\d{3}$/;
        return pattern.test(id);
    }
    
    static validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }
    
    static validateGherkinStep(step, type) {
        if (!step) return false;
        
        const lines = step.split('\n').filter(line => line.trim());
        if (lines.length === 0) return false;
        
        // Validar que no empiece con keywords de Gherkin
        const keywords = ['Given', 'When', 'Then', 'And', 'But'];
        for (let line of lines) {
            for (let keyword of keywords) {
                if (line.trim().startsWith(keyword + ' ')) {
                    return false; // No debe incluir las keywords
                }
            }
        }
        
        return true;
    }
    
    static addValidationFeedback(element, isValid, message = '') {
        const el = document.querySelector(element);
        if (!el) return;
        
        const parent = el.parentElement;
        let feedback = parent.querySelector('.validation-feedback');
        
        if (!feedback) {
            feedback = document.createElement('div');
            feedback.className = 'validation-feedback';
            parent.appendChild(feedback);
        }
        
        if (isValid) {
            feedback.className = 'validation-feedback valid';
            feedback.textContent = message || '✓ Campo válido';
        } else {
            feedback.className = 'validation-feedback invalid';
            feedback.textContent = message || '✗ Campo requerido o formato inválido';
        }
        
        setTimeout(() => {
            feedback.remove();
        }, 3000);
    }
}

// Helpers específicos para Consensus
class ConsensusHelpers {
    static generateObjectiveId() {
        const count = document.querySelectorAll('[id^="objetivo-"]').length;
        return `OBJ-${String(count + 1).padStart(3, '0')}`;
    }
    
    static generateFunctionalityId(prefix = 'FUNC') {
        const count = document.querySelectorAll('.func-id').length;
        return `${prefix}-${String(count + 1).padStart(3, '0')}`;
    }
    
    static generateStoryId() {
        const count = document.querySelectorAll('.historia-id').length;
        return `HU-${String(count + 1).padStart(3, '0')}`;
    }
    
    static formatGherkinStep(text, type) {
        const lines = text.split('\n').filter(line => line.trim());
        return lines.map((line, index) => {
            const prefix = index === 0 ? type : 'And';
            return `${prefix} ${line.trim()}`;
        }).join('\n');
    }
}