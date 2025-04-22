// Configuração do EmailJS
(function() {
    emailjs.init("L3hUgL_MrW-99nq4p");
})();

// Esconder o loader quando a página carrega
window.addEventListener('load', function() {
    document.body.classList.add('loaded');
});

// Tema toggle
const themeToggle = document.getElementById('theme-toggle');

// Verificar se já existe um tema salvo
const savedTheme = localStorage.getItem('theme');
if (savedTheme) {
    document.documentElement.setAttribute('data-theme', savedTheme);
    themeToggle.checked = savedTheme === 'light';
}

// Alternar tema ao clicar no toggle
themeToggle.addEventListener('change', function() {
    if (this.checked) {
        document.documentElement.setAttribute('data-theme', 'light');
        localStorage.setItem('theme', 'light');
    } else {
        document.documentElement.setAttribute('data-theme', 'dark');
        localStorage.setItem('theme', 'dark');
    }
});

// Animações na rolagem da página
document.addEventListener('DOMContentLoaded', function() {
    // Existir algum tema salvo
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
        document.documentElement.setAttribute('data-theme', savedTheme);
        document.getElementById('theme-toggle').checked = savedTheme === 'light';
    }
    
    // classe de animação às tecnologias
    const techs = document.querySelectorAll('.tecnologias div');
    techs.forEach((tech, index) => {
        tech.style.setProperty('--i', index + 1);
    });

    //  elementos quando entrarem no viewport
    const animateOnScroll = () => {
        const elements = document.querySelectorAll('.titulo-desenvolvedor, .titulo-web, .sobre-min p, .tecnologias div, .projeto01');
        
        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const screenPosition = window.innerHeight / 1.2;
            
            if (elementPosition < screenPosition) {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }
        });
    };

    window.addEventListener('scroll', animateOnScroll);
    // Chamar uma vez para animar elementos que já estão visíveis
    animateOnScroll();

    // Validação e envio de formulário
    const form = document.getElementById('contact-form');
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const message = document.getElementById('message').value;
            
            // Validação básica
            if (name.length < 2) {
                showError('name', 'Nome deve ter pelo menos 2 caracteres');
                return;
            }
            
            if (!isValidEmail(email)) {
                showError('email', 'Email inválido');
                return;
            }
            
            if (message.length < 10) {
                showError('message', 'Mensagem deve ter pelo menos 10 caracteres');
                return;
            }
            
            // Animação de envio
            const button = form.querySelector('button[type="submit"]');
            button.innerHTML = 'Enviando...';
            button.disabled = true;
            
            // Preparar  EmailJS
            const templateParams = {
                from_name: name,
                from_email: email,
                message: message,
                title: 'Mensagem do site'
            };
            
            // Enviar o  EmailJS
            emailjs.send('service_rqev9hr', 'template_eslo4xl', templateParams)
                .then(function(response) {
                    console.log('EMAIL ENVIADO!', response.status, response.text);
                    form.reset();
                    button.innerHTML = 'Enviado! ✓';
                    setTimeout(() => {
                        button.innerHTML = 'Enviar';
                        button.disabled = false;
                    }, 2000);
                }, function(error) {
                    console.log('FALHA NO ENVIO...', error);
                    button.innerHTML = 'Erro no envio ✗';
                    setTimeout(() => {
                        button.innerHTML = 'Enviar';
                        button.disabled = false;
                    }, 2000);
                });
        });
    }
});

// Função para validar email
function isValidEmail(email) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

// Função para mostrar erro
function showError(fieldId, message) {
    const field = document.getElementById(fieldId);
    const errorDiv = field.parentNode.querySelector('.error-message') || document.createElement('div');
    
    errorDiv.className = 'error-message';
    errorDiv.textContent = message;
    
    if (!field.parentNode.querySelector('.error-message')) {
        field.parentNode.insertBefore(errorDiv, field.nextSibling);
    }
    
    field.style.borderColor = '#ff3860';
    
    // Remover erro quando o campo recebe foco
    field.addEventListener('focus', function() {
        field.style.borderColor = '#A68A56';
        if (errorDiv.parentNode) {
            errorDiv.parentNode.removeChild(errorDiv);
        }
    });
}

// Adicionar animação ao menu
document.querySelectorAll('.nav-bar-lista a').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        const targetId = this.getAttribute('href');
        
        if (targetId.startsWith('#')) {
            e.preventDefault();
            
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 100,
                    behavior: 'smooth'
                });
            }
        }
    });
});

// animação ícones de tecnologia
document.querySelectorAll('.tecnologias div').forEach(tech => {
    tech.addEventListener('mouseenter', function() {
        this.style.animation = 'pulse 1s ease infinite';
    });
    
    tech.addEventListener('mouseleave', function() {
        this.style.animation = '';
    });
});

// Adicionar animação de carregamento ao clicar nos projetos
document.addEventListener('DOMContentLoaded', function() {
    document.querySelectorAll('.projeto01').forEach(projeto => {
        projeto.addEventListener('click', function(e) {
            // Verificar se o clique foi no card e não em um link interno
            if (e.target.tagName === 'A' || e.target.closest('a') !== this.closest('a')) {
                return;
            }
            
            // Se o projeto tiver um link, pegamos o href
            const linkElement = this.closest('a');
            if (!linkElement) return;
            
            const link = linkElement.getAttribute('href');
            if (!link || link === '#') return;
            
            // Prevenir a navegação padrão
            e.preventDefault();
            
            // Criar e mostrar o loader
            const loader = document.createElement('div');
            loader.classList.add('project-loader-wrapper');
            loader.innerHTML = `
                <div class="loader">
                    <div class="loader-circle"></div>
                    <div class="loader-name">JG</div>
                </div>
            `;
            document.body.appendChild(loader);
            
            // Após um pequeno delay, navegar para o link
            setTimeout(() => {
                window.location.href = link;
            }, 800);
        });
    });
});
