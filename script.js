// ===== Menu Responsivo =====
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');
const navLinkItems = document.querySelectorAll('.nav-links a');

hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    hamburger.classList.toggle('active');
});

// Fechar menu ao clicar em um link
navLinkItems.forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
        hamburger.classList.remove('active');
    });
});

// ===== CTA Button =====
document.querySelector('.cta-btn').addEventListener('click', () => {
    document.getElementById('solucoes').scrollIntoView({ behavior: 'smooth' });
});

// ===== Formulário de Contato =====
const contactForm = document.getElementById('contactForm');

contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Obter valores do formulário
    const nome = contactForm.querySelector('input[type="text"]').value;
    const email = contactForm.querySelector('input[type="email"]').value;
    const propriedade = contactForm.querySelectorAll('input[type="text"]')[1].value;
    const mensagem = contactForm.querySelector('textarea').value;
    
    // Validação básica
    if (nome && email && mensagem) {
        // Simular envio
        console.log({
            nome,
            email,
            propriedade,
            mensagem,
            timestamp: new Date()
        });
        
        // Feedback ao usuário
        showNotification('Mensagem enviada com sucesso! 🎉', 'success');
        contactForm.reset();
    } else {
        showNotification('Por favor, preencha todos os campos obrigatórios', 'error');
    }
});

// ===== Notificação =====
function showNotification(message, type) {
    const notification = document.createElement('div');
    notification.textContent = message;
    notification.className = `notification ${type}`;
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        padding: 15px 20px;
        border-radius: 8px;
        color: white;
        font-weight: 600;
        z-index: 2000;
        animation: slideIn 0.3s ease;
        ${type === 'success' 
            ? 'background-color: #7bc043;' 
            : 'background-color: #e74c3c;'
        }
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// ===== Animação de Scroll (Reveal Elements) =====
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.animation = 'fadeInUp 0.6s ease forwards';
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observar elementos
document.querySelectorAll('.solucao-card, .beneficio-item, .stat-card').forEach(el => {
    el.style.opacity = '0';
    observer.observe(el);
});

// ===== Contador de Estatísticas =====
const stats = document.querySelectorAll('.stat-card h3');
const countersStarted = false;

function animateCounter(element, target) {
    const increment = target / 50;
    let current = 0;
    
    const updateCounter = () => {
        current += increment;
        if (current < target) {
            element.textContent = Math.floor(current) + '+';
            requestAnimationFrame(updateCounter);
        } else {
            element.textContent = target + '+';
        }
    };
    
    updateCounter();
}

// Iniciar contadores quando entrar em view
const statsSection = document.querySelector('.stats');
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting && !countersStarted) {
            stats.forEach(stat => {
                const target = parseInt(stat.textContent);
                animateCounter(stat, target);
            });
            statsObserver.unobserve(statsSection);
        }
    });
}, { threshold: 0.5 });

statsObserver.observe(statsSection);

// ===== Suavizar transição de páginas =====
document.addEventListener('DOMContentLoaded', () => {
    document.body.style.opacity = '1';
});

// ===== Evento de resize para melhor responsividade =====
window.addEventListener('resize', () => {
    if (window.innerWidth > 768) {
        navLinks.classList.remove('active');
        hamburger.classList.remove('active');
    }
});

// ===== Animação CSS adicional =====
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(400px);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(400px);
            opacity: 0;
        }
    }

    .hamburger.active span:nth-child(1) {
        transform: rotate(45deg) translate(10px, 10px);
    }

    .hamburger.active span:nth-child(2) {
        opacity: 0;
    }

    .hamburger.active span:nth-child(3) {
        transform: rotate(-45deg) translate(7px, -7px);
    }
`;
document.head.appendChild(style);

// ===== Log para verificação =====
console.log('✅ Script carregado com sucesso!');
console.log('🌱 Agro Forte - Futuro Sustentável');
