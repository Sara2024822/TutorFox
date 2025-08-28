document.addEventListener('DOMContentLoaded', function() {
    // Referências aos elementos do formulário
    const registerForm = document.getElementById('registerForm');
    const firstNameInput = document.getElementById('firstName');
    const lastNameInput = document.getElementById('lastName');
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');
    const confirmPasswordInput = document.getElementById('confirmPassword');
    const userTypeInput = document.getElementById('userType');
    const termsCheckbox = document.getElementById('terms');
    const newsletterCheckbox = document.getElementById('newsletter');
    
    // Elementos de força da senha
    const strengthBar = document.querySelector('.strength-bar');
    const strengthText = document.querySelector('.strength-text');
    
    // Opções de tipo de conta
    const accountOptions = document.querySelectorAll('.account-type-option');
    
    // Selecionar tipo de conta
    accountOptions.forEach(option => {
        option.addEventListener('click', function() {
            // Remover seleção anterior
            accountOptions.forEach(opt => opt.classList.remove('selected'));
            
            // Adicionar seleção atual
            this.classList.add('selected');
            
            // Definir valor do input hidden
            userTypeInput.value = this.getAttribute('data-value');
        });
    });
    
    // Verificar força da senha em tempo real
    passwordInput.addEventListener('input', checkPasswordStrength);
    
    // Adicionar evento de submit ao formulário
    registerForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Obter valores dos campos
        const firstName = firstNameInput.value.trim();
        const lastName = lastNameInput.value.trim();
        const email = emailInput.value.trim();
        const password = passwordInput.value;
        const confirmPassword = confirmPasswordInput.value;
        const userType = userTypeInput.value;
        const termsAccepted = termsCheckbox.checked;
        
        // Validar campos
        if (!validateName(firstName)) {
            showError('Por favor, insira um nome válido (mínimo 2 caracteres).', firstNameInput);
            return;
        }
        
        if (!validateName(lastName)) {
            showError('Por favor, insira um sobrenome válido (mínimo 2 caracteres).', lastNameInput);
            return;
        }
        
        if (!validateEmail(email)) {
            showError('Por favor, insira um e-mail válido.', emailInput);
            return;
        }
        
        if (!validatePassword(password)) {
            showError('A senha deve ter pelo menos 6 caracteres, incluindo letras e números.', passwordInput);
            return;
        }
        
        if (password !== confirmPassword) {
            showError('As senhas não coincidem.', confirmPasswordInput);
            return;
        }
        
        if (!userType) {
            showError('Por favor, selecione um tipo de conta.', document.querySelector('.account-type-selector'));
            return;
        }
        
        if (!termsAccepted) {
            showError('Você deve aceitar os Termos de Serviço para continuar.', termsCheckbox);
            return;
        }
        
        // Se todas as validações passarem, enviar formulário
        submitRegistration({
            firstName,
            lastName,
            email,
            password,
            userType,
            newsletter: newsletterCheckbox.checked
        });
    });
    
    // Função para verificar força da senha
    function checkPasswordStrength() {
        const password = passwordInput.value;
        let strength = 0;
        let message = 'Força da senha';
        let color = '#dc3545';
        
        if (password.length > 0) {
            // Verificar comprimento
            if (password.length > 5) strength += 20;
            if (password.length > 7) strength += 20;
            
            // Verificar se tem números
            if (/\d/.test(password)) strength += 20;
            
            // Verificar se tem letras maiúsculas e minúsculas
            if (/[a-z]/.test(password) && /[A-Z]/.test(password)) strength += 20;
            
            // Verificar se tem caracteres especiais
            if (/[^a-zA-Z0-9]/.test(password)) strength += 20;
            
            // Definir mensagem e cor com base na força
            if (strength < 40) {
                message = 'Fraca';
                color = '#dc3545';
            } else if (strength < 80) {
                message = 'Média';
                color = '#ffc107';
            } else {
                message = 'Forte';
                color = '#28a745';
            }
        }
        
        // Atualizar barra e texto
        strengthBar.querySelector('::after').style.width = strength + '%';
        strengthBar.querySelector('::after').style.backgroundColor = color;
        strengthText.textContent = message;
        strengthText.style.color = color;
    }
    
    // Função para validar nome
    function validateName(name) {
        return name.length >= 2;
    }
    
    // Função para validar e-mail
    function validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }
    
    // Função para validar senha
    function validatePassword(password) {
        return password.length >= 6 && /[a-zA-Z]/.test(password) && /\d/.test(password);
    }
    
    // Função para mostrar erro
    function showError(message, element) {
        // Remover mensagens de erro existentes
        removeErrors();
        
        // Criar elemento de erro
        const errorElement = document.createElement('div');
        errorElement.className = 'error-message';
        errorElement.textContent = message;
        
        // Inserir após o elemento
        if (element.parentNode) {
            element.parentNode.appendChild(errorElement);
        }
        
        // Destacar campo com erro
        element.style.borderColor = '#dc3545';
        element.focus();
        
        // Rolagem suave para o campo com erro
        element.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
    
    // Função para remover erros
    function removeErrors() {
        const errorMessages = document.querySelectorAll('.error-message');
        errorMessages.forEach(msg => msg.remove());
        
        // Remover destaque de erro dos campos
        const formControls = document.querySelectorAll('.form-control');
        formControls.forEach(control => {
            control.style.borderColor = '#ddd';
        });
    }
    
    // Função para enviar registro
    function submitRegistration(userData) {
        // Mostrar indicador de carregamento
        const submitButton = registerForm.querySelector('button[type="submit"]');
        const originalText = submitButton.textContent;
        submitButton.textContent = 'Criando conta...';
        submitButton.disabled = true;
        
        // Simular atraso de rede
        setTimeout(() => {
            // Em uma implementação real, aqui você faria uma requisição para o servidor
            console.log('Dados de registro:', userData);
            
            // Simular resposta bem-sucedida
            showSuccess('Conta criada com sucesso! Redirecionando para o login...');
            
            // Redirecionar para login após 2 segundos
            setTimeout(() => {
                window.location.href = 'login.html';
            }, 2000);
            
            // Restaurar botão
            submitButton.textContent = originalText;
            submitButton.disabled = false;
        }, 1500);
    }
    
    // Função para mostrar mensagem de sucesso
    function showSuccess(message) {
        // Remover mensagens existentes
        const existingMessages = document.querySelectorAll('.error-message, .success-message');
        existingMessages.forEach(msg => msg.remove());
        
        // Criar elemento de sucesso
        const successElement = document.createElement('div');
        successElement.className = 'success-message';
        successElement.textContent = message;
        
        // Inserir antes do formulário
        registerForm.parentNode.insertBefore(successElement, registerForm);
        
        // Rolagem suave para a mensagem
        successElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
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
});