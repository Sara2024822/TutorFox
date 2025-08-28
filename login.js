document.addEventListener('DOMContentLoaded', function() {
    console.log('Página de login carregada!');
    
    // Referências aos elementos do formulário
    const loginForm = document.getElementById('loginForm');
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');
    const rememberCheckbox = document.getElementById('remember');
    
    // Verificar se há credenciais salvas
    const savedEmail = localStorage.getItem('tutorFoxEmail');
    const savedPassword = localStorage.getItem('tutorFoxPassword');
    const rememberMe = localStorage.getItem('tutorFoxRemember') === 'true';
    
    if (savedEmail && rememberMe) {
        emailInput.value = savedEmail;
        rememberCheckbox.checked = true;
    }
    
    if (savedPassword && rememberMe) {
        passwordInput.value = savedPassword;
    }
    
    // Adicionar evento de submit ao formulário
    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const email = emailInput.value;
            const password = passwordInput.value;
            const remember = rememberCheckbox.checked;
            
            // Validação básica
            if (!validateEmail(email)) {
                showError('Por favor, insira um e-mail válido.', loginForm);
                return;
            }
            
            if (password.length < 6) {
                showError('A senha deve ter pelo menos 6 caracteres.', loginForm);
                return;
            }
            
            // Salvar credenciais se "Lembrar-me" estiver marcado
            if (remember) {
                localStorage.setItem('tutorFoxEmail', email);
                localStorage.setItem('tutorFoxPassword', password);
                localStorage.setItem('tutorFoxRemember', 'true');
            } else {
                localStorage.removeItem('tutorFoxEmail');
                localStorage.removeItem('tutorFoxPassword');
                localStorage.removeItem('tutorFoxRemember');
            }
            
            // Simular processo de login
            simulateLogin(email, password);
        });
    }
    
    // Adicionar funcionalidade ao link "Esqueci minha senha"
    const forgotPasswordLink = document.querySelector('.forgot-password');
    if (forgotPasswordLink) {
        forgotPasswordLink.addEventListener('click', function(e) {
            e.preventDefault();
            console.log('Redirecionando para recuperação de senha...');
            window.location.href = 'password-recovery.html';
        });
    }
    
    // Adicionar funcionalidade ao link "Cadastre-se agora"
    const registerLink = document.querySelector('.register-link a');
    if (registerLink) {
        registerLink.addEventListener('click', function(e) {
            e.preventDefault();
            console.log('Redirecionando para cadastro...');
            window.location.href = 'register.html';
        });
    }
    
    // Adicionar efeitos interativos aos campos
    const inputs = document.querySelectorAll('.form-control');
    inputs.forEach(input => {
        input.addEventListener('focus', () => {
            input.parentElement.classList.add('focused');
        });
        
        input.addEventListener('blur', () => {
            if (input.value === '') {
                input.parentElement.classList.remove('focused');
            }
        });
    });
    
    // Adicionar eventos aos botões de mídia social
    const socialButtons = document.querySelectorAll('.social-btn');
    socialButtons.forEach(button => {
        button.addEventListener('click', function() {
            const type = this.querySelector('svg').getAttribute('fill') === '#4285F4' ? 'Google' :
                        this.querySelector('svg').getAttribute('fill') === '#1877F2' ? 'Facebook' : 'Twitter';
            alert(`Login com ${type} selecionado. Em uma implementação real, isso redirecionaria para a autenticação do ${type}.`);
        });
    });
    
    // Função para validar e-mail
    function validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }
    
    // Função para mostrar erro
    function showError(message, form) {
        // Remover mensagens de erro existentes
        const existingError = document.querySelector('.error-message');
        if (existingError) {
            existingError.remove();
        }
        
        // Criar elemento de erro
        const errorElement = document.createElement('div');
        errorElement.className = 'error-message';
        errorElement.textContent = message;
        
        // Inserir após o formulário
        form.appendChild(errorElement);
        
        // Remover após 5 segundos
        setTimeout(() => {
            if (errorElement.parentNode) {
                errorElement.remove();
            }
        }, 5000);
    }
    
    // Simular processo de login
    function simulateLogin(email, password) {
        // Mostrar indicador de carregamento
        const submitButton = loginForm.querySelector('button[type="submit"]');
        const originalText = submitButton.textContent;
        submitButton.textContent = 'Entrando...';
        submitButton.disabled = true;
        
        // Simular atraso de rede
        setTimeout(() => {
            // Em uma implementação real, aqui você faria uma requisição para o servidor
            console.log('Tentativa de login com:', { email, password });
            
            // Simular resposta bem-sucedida
            showSuccess('Login realizado com sucesso! Redirecionando para o dashboard...', loginForm);
            
            // Redirecionar (em uma implementação real)
            setTimeout(() => {
                // window.location.href = 'dashboard.html';
                alert('Redirecionando para o dashboard...');
            }, 1500);
            
            // Restaurar botão
            submitButton.textContent = originalText;
            submitButton.disabled = false;
        }, 1500);
    }
    
    // Função para mostrar mensagem de sucesso
    function showSuccess(message, form) {
        // Remover mensagens existentes
        const existingMessages = form.querySelectorAll('.error-message, .success-message');
        existingMessages.forEach(msg => msg.remove());
        
        // Criar elemento de sucesso
        const successElement = document.createElement('div');
        successElement.className = 'success-message';
        successElement.textContent = message;
        
        // Inserir após o formulário
        form.appendChild(successElement);
        
        // Remover após 5 segundos
        setTimeout(() => {
            if (successElement.parentNode) {
                successElement.remove();
            }
        }, 5000);
    }
});