function togglePasswordVisibility() {
    var passwordField = document.getElementById('password');
    var toggleButton = document.querySelector('.toggle-password');
  
    if (passwordField.type === 'password') {
        passwordField.type = 'text';
        toggleButton.innerHTML = '<i class="fas fa-eye-slash"></i>';
    } else {
        passwordField.type = 'password';
        toggleButton.innerHTML = '<i class="fas fa-eye"></i>';
    }
  }

function submitRegisterForm(event) {
    event.preventDefault(); // Evita que o formulário seja enviado da maneira padrão
  
    var name = document.getElementById('name').value.trim();
    var phone = document.getElementById('phone').value.replace(/\D/g, '');;
    var username = document.getElementById('email').value.trim();
    var password = document.getElementById('password').value.trim();
  
    var formData = {
        name: name,
        phoneNumber: phone,
        email: username,
        password: password
    };
  
    var url = 'https://sistema-adocao-uninter.onrender.com/auth/register';
    
    var requestOptions = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
    };

    document.body.style.cursor = 'wait';
  
    console.log('Dados a serem enviados para registro:', formData);
  
    fetch(url, requestOptions)
        .then(response => {
            if (response.ok) {
                document.getElementById('register-form').style.display = 'none';
                document.getElementById('cadastro-success-message').style.display = 'block';
            } 
            if (response.status === 409){
                errMessage = document.getElementById('cadastro-error-message');
                errMessage.style.display = 'block';
                errMessage.innerHTML = 'O e-mail já está em uso. Por favor, escolha outro.';
            }
        })
        .catch(error => {
            console.error('Erro ao fazer a requisição:', error);
            alert(error.message);
        })
        .finally(function(){
            document.body.style.cursor = 'default';
        });
      
  }

var phoneInput = document.getElementById('phone');

phoneInput.addEventListener('input', function(event) {
    var inputValue = event.target.value;

    var sanitizedValue = inputValue.replace(/\D/g, '');

    var formattedValue = '';
    if (sanitizedValue.length > 2) {
        formattedValue += '(' + sanitizedValue.substring(0, 2) + ') ';
        if (sanitizedValue.length > 7) {
            formattedValue += sanitizedValue.substring(2, 7) + '-';
            formattedValue += sanitizedValue.substring(7, 11);
        } else {
            formattedValue += sanitizedValue.substring(2);
        }
    } else {
        formattedValue = sanitizedValue;
    }

    event.target.value = formattedValue;
});

var nomeInput = document.getElementById('name');

nomeInput.addEventListener('input', function(event) {
    var inputValue = event.target.value;

    var sanitizedValue = inputValue.replace(/[^A-Za-zÀ-ú\s]/g, '');

    event.target.value = sanitizedValue;
});