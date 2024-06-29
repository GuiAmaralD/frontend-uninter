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

function submitLoginForm(event) {
  event.preventDefault(); // Evita que o formulário seja enviado da maneira padrão

  var username = document.getElementById('username').value;
  var password = document.getElementById('password').value;

  var formData = {
      email: username,
      password: password
  };

  //var url = 'https://sistema-adocao-uninter.onrender.com/auth/login';
  var url = 'https://sistema-adocao-uninter.onrender.com/auth/login'
  
  var requestOptions = {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData)
  };

  console.log('Dados a serem enviados:', formData);

  fetch(url, requestOptions)
      .then(response => {
        if (response.ok) {
            document.getElementById('login-error-message').innerHTML = '';
            return response.json();
        } else {
            document.getElementById('login-error-message').innerHTML = 'E-mail ou senha incorretos!';
            document.getElementById('login-error-message').classList.remove('hidden');
            throw new Error('Erro na requisição');
        }
    })
      .then(data => {
          // Aqui você pode lidar com a resposta da requisição
        localStorage.setItem('token', data.token);

            // Redireciona o usuário para a página principal
        window.location.href = 'index.html';
      })
      .catch(error => {
          console.error('Erro ao fazer a requisição:', error);
      });
    
}

function isTokenValid(token) {
    const decodedToken = decodeToken(token);
    return decodedToken && decodedToken.exp * 1000 > Date.now();
}

function decodeToken(token) {
    try {
        const base64Url = token.split('.')[1];
        const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        const jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
            return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        }).join(''));

        return JSON.parse(jsonPayload);
    } catch (error) {
        return null;
    }
}

function usuarioEstaLogado() {
    const token = localStorage.getItem('token');
    if (token) {
        if (isTokenValid(token)) {
            return true;
        }
        return false;
    }
    return false;
}

document.addEventListener('DOMContentLoaded', function() {
    if(usuarioEstaLogado()){
        window.location.href = 'index.html'
    }
});