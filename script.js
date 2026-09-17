(function () {
  'use strict';

  const form = document.getElementById('contact-form');
  const toast = document.getElementById('toast');

  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  function setError(inputElement, errorElement, message) {
    errorElement.textContent = message;
    if (inputElement) {
      inputElement.classList.add('is-invalid');
      inputElement.setAttribute('aria-invalid', 'true');
      inputElement.setAttribute('aria-describedby', errorElement.id);
    }
  }

  function clearError(inputElement, errorElement) {
    errorElement.textContent = '';
    if (inputElement) {
      inputElement.classList.remove('is-invalid');
      inputElement.removeAttribute('aria-invalid');
      inputElement.removeAttribute('aria-describedby');
    }
  }

  function validateForm() {
    let isValid = true;

    // 1. Validar Primeiro Nome
    const firstName = document.getElementById('first-name');
    const errFirstName = document.getElementById('err-first-name');
    if (!firstName.value.trim()) {
      setError(firstName, errFirstName, 'Este campo é obrigatório');
      isValid = false;
    } else {
      clearError(firstName, errFirstName);
    }

    // 2. Validar Sobrenome
    const lastName = document.getElementById('last-name');
    const errLastName = document.getElementById('err-last-name');
    if (!lastName.value.trim()) {
      setError(lastName, errLastName, 'Este campo é obrigatório');
      isValid = false;
    } else {
      clearError(lastName, errLastName);
    }

    // 3. Validar E-mail
    const email = document.getElementById('email');
    const errEmail = document.getElementById('err-email');
    if (!email.value.trim()) {
      setError(email, errEmail, 'Este campo é obrigatório');
      isValid = false;
    } else if (!emailRegex.test(email.value.trim())) {
      setError(email, errEmail, 'Por favor, insira um endereço de e-mail válido');
      isValid = false;
    } else {
      clearError(email, errEmail);
    }

    // 4. Validar Radio Button (Query Type)
    const queryTypeSelected = document.querySelector('input[name="queryType"]:checked');
    const errQueryType = document.getElementById('err-query-type');
    if (!queryTypeSelected) {
      setError(null, errQueryType, 'Por favor, selecione um tipo de consulta');
      isValid = false;
    } else {
      clearError(null, errQueryType);
    }

    // 5. Validar Mensagem
    const message = document.getElementById('message');
    const errMessage = document.getElementById('err-message');
    if (!message.value.trim()) {
      setError(message, errMessage, 'Este campo é obrigatório');
      isValid = false;
    } else {
      clearError(message, errMessage);
    }

    // 6. Validar Checkbox de Consentimento
    const consent = document.getElementById('consent');
    const errConsent = document.getElementById('err-consent');
    if (!consent.checked) {
      setError(consent, errConsent, 'Para enviar este formulário, autorize o contato');
      isValid = false;
    } else {
      clearError(consent, errConsent);
    }

    return isValid;
  }

  form.addEventListener('submit', function (e) {
    e.preventDefault();

    if (validateForm()) {
      toast.classList.remove('hidden');
      form.reset();

      // Scroll suave até a notificação se estiver no mobile
      toast.scrollIntoView({ behavior: 'smooth', block: 'center' });

      setTimeout(() => {
        toast.classList.add('hidden');
      }, 5000);
    }
  });
})();