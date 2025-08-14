// Validaciones y efectos adicionales
class TourValidation {
    static validateStep(step, element) {
        const el = document.querySelector(element);
        if (!el) return false;
        
        // Validaciones específicas por tipo de campo
        if (el.type === 'email') {
            return this.validateEmail(el.value);
        }
        
        if (el.required && !el.value) {
            return false;
        }
        
        return true;
    }
    
    static validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }
    
    static addValidationFeedback(element, isValid) {
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
            feedback.textContent = '✓ Campo válido';
        } else {
            feedback.className = 'validation-feedback invalid';
            feedback.textContent = '✗ Campo requerido o inválido';
        }
        
        setTimeout(() => {
            feedback.remove();
        }, 3000);
    }
}

// Efectos visuales adicionales
class TourEffects {
    static pulse(element) {
        const el = document.querySelector(element);
        if (!el) return;
        
        el.classList.add('pulse-effect');
        setTimeout(() => {
            el.classList.remove('pulse-effect');
        }, 1000);
    }
    
    static shake(element) {
        const el = document.querySelector(element);
        if (!el) return;
        
        el.classList.add('shake-effect');
        setTimeout(() => {
            el.classList.remove('shake-effect');
        }, 500);
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