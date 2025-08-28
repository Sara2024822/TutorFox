document.addEventListener('DOMContentLoaded', function() {
    console.log('Script de recuperação de senha carregado!');
    
    // Elementos do DOM
    const steps = document.querySelectorAll('.step');
    const emailForm = document.getElementById('emailForm');
    const codeForm = document.getElementById('codeForm');
    const newPasswordForm = document.getElementById('newPasswordForm');
    const resendLink = document.getElementById('resendCode');
    const userEmailSpan = document.getElementById('userEmail');
    
    // Variáveis para armazenar dados temporários
    let userEmail = '';
    let verificationCode = '';
    let countdown = 60;
    let countdownInterval;
    
    // Mostrar primeiro passo
    showStep(0);
    
    // Envio do formulário de e-mail
    emailForm.addEventListener('submit', function(e) {
        e.preventDefault();
        console.log('Formulário de e-mail enviado');
        
        const email = document.getElementById('recoveryEmail').value.trim();
        
        if (!validateEmail(email)) {
            showError('Por favor, insira um e-mail válido.', emailForm);
            return;
        }
        
        // Simular envio de código
        userEmail = email;
        userEmailSpan.textContent = maskEmail(email);
        verificationCode = generateVerificationCode();
        
        // Em produção, aqui você enviaria o código por e-mail
        console.log('Código de verificação para', email, ':', verificationCode);
        
        // Mostrar código na tela (apenas para demonstração)
        alert(`PARA DEMONSTRAÇÃO: Seu código de verificação é ${verificationCode}`);
        
        // Iniciar contagem regressiva para reenvio
        startCountdown();
        
        // Mostrar próximo passo
        showStep(1);
    });
    
    // Envio do formulário de código
    codeForm.addEventListener('submit', function(e) {
        e.preventDefault();
        console.log('Formulário de código enviado');
        
        const code = document.getElementById('verificationCode').value.trim();
        
        if (code !== verificationCode) {
            showError('Código inválido. Por favor, tente novamente.', codeForm);
            return;
        }
        
        // Parar contagem regressiva
        clearInterval(countdownInterval);
        
        // Mostrar próximo passo
        showStep(2);
    });
    
    // Reenviar código
    resendLink.addEventListener('click', function(e) {
        e.preventDefault();
        console.log('Reenviar código clicado');
        
        // Verificar se ainda está no período de espera
        if (countdown > 0) {
            showError(`Aguarde ${countdown} segundos para reenviar.`, codeForm);
            return;
        }
        
        // Gerar novo código
        verificationCode = generateVerificationCode();
        
        // Em produção, aqui você reenviaria o código por e-mail
        console.log('Novo código de verificação:', verificationCode);
        
        // Mostrar código na tela (apenas para demonstração)
        alert(`PARA DEMONSTRAÇÃO: Seu novo código de verificação é ${verificationCode}`);
        
        // Reiniciar contagem regressiva
        countdown = 60;
        startCountdown();
        
        // Feedback para o usuário
        showMessage('Código reenviado com sucesso! Verifique seu e-mail.', codeForm, 'success');
    });
    
    // Validação de senha em tempo real
    const newPasswordInput = document.getElementById('newPassword');
    if (newPasswordInput) {
        newPasswordInput.addEventListener('input', validatePasswordStrength);
    }
    
    // Envio do formulário de nova senha
    if (newPasswordForm) {
        newPasswordForm.addEventListener('submit', function(e) {
            e.preventDefault();
            console.log('Formulário de nova senha enviado');
            
            const newPassword = document.getElementById('newPassword').value;
            const confirmPassword = document.getElementById('confirmNewPassword').value;
            
            if (!validatePassword(newPassword)) {
                showError('A senha não atende aos requisitos mínimos.', newPasswordForm);
                return;
            }
            
            if (newPassword !== confirmPassword) {
                showError('As senhas não coincidem.', newPasswordForm);
                return;
            }
            
            // Simular redefinição de senha
            const submitButton = newPasswordForm.querySelector('button[type="submit"]');
            const originalText = submitButton.textContent;
            submitButton.textContent = 'Redefinindo...';
            submitButton.disabled = true;
            
            setTimeout(() => {
                // Mostrar passo de sucesso
                showStep(3);
                
                // Restaurar botão
                submitButton.textContent = originalText;
                submitButton.disabled = false;
            }, 1500);
        });
    }
    
    // Função para mostrar um passo específico
    function showStep(stepIndex) {
        console.log('Mostrando passo', stepIndex);
        steps.forEach((step, index) => {
            if (index === stepIndex) {
                step.classList.add('active');
            } else {
                step.classList.remove('active');
            }
        });
    }
    
    // Função para gerar código de verificação
    function generateVerificationCode() {
        const code = Math.floor(100000 + Math.random() * 900000).toString();
        console.log('Código gerado:', code);
        return code;
    }
    
    // Função para mascarar e-mail (proteção de privacidade)
    function maskEmail(email) {
        const parts = email.split('@');
        const username = parts[0];
        const domain = parts[1];
        
        if (username.length <= 2) {
            return username.charAt(0) + '***@' + domain;
        }
        
        return username.charAt(0) + '***' + username.charAt(username.length - 1) + '@' + domain;
    }
    
    // Função para validar e-mail
    function validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }
    
    // Função para validar força da senha
    function validatePassword(password) {
        const hasMinLength = password.length >= 8;
        const hasUpperCase = /[A-Z]/.test(password);
        const hasNumber = /\d/.test(password);
        const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);
        
        return hasMinLength && hasUpperCase && hasNumber && hasSpecialChar;
    }
    
    // Função para validar força da senha em tempo real
    function validatePasswordStrength() {
        const password = newPasswordInput.value;
        
        const requirements = {
            length: password.length >= 8,
            uppercase: /[A-Z]/.test(password),
            number: /\d/.test(password),
            special: /[!@#$%^&*(),.?":{}|<>]/.test(password)
        };
        
        // Atualizar interface
        if (document.getElementById('req-length')) {
            document.getElementById('req-length').classList.toggle('valid', requirements.length);
            document.getElementById('req-uppercase').classList.toggle('valid', requirements.uppercase);
            document.getElementById('req-number').classList.toggle('valid', requirements.number);
            document.getElementById('req-special').classList.toggle('valid', requirements.special);
        }
    }
    
    // Função para iniciar contagem regressiva
    function startCountdown() {
        clearInterval(countdownInterval);
        
        countdownInterval = setInterval(() => {
            countdown--;
            
            if (countdown <= 0) {
                clearInterval(countdownInterval);
                resendLink.textContent = 'Reenviar código';
                resendLink.style.color = '';
            } else {
                resendLink.textContent = `Reenviar (${countdown}s)`;
                resendLink.style.color = '#999';
            }
        }, 1000);
    }
    
    // Função para mostrar erro
    function showError(message, form) {
        // Remover mensagens existentes
        removeMessages(form);
        
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
    
    // Função para mostrar mensagem de sucesso
    function showMessage(message, form, type = 'success') {
        // Remover mensagens existentes
        removeMessages(form);
        
        // Criar elemento de mensagem
        const messageElement = document.createElement('div');
        messageElement.className = type === 'success' ? 'success-message' : 'error-message';
        messageElement.textContent = message;
        
        // Inserir após o formulário
        form.appendChild(messageElement);
        
        // Remover após 5 segundos
        setTimeout(() => {
            if (messageElement.parentNode) {
                messageElement.remove();
            }
        }, 5000);
    }
    
    // Função para remover mensagens
    function removeMessages(form) {
        const existingMessages = form.querySelectorAll('.error-message, .success-message');
        existingMessages.forEach(msg => msg.remove());
    }
});