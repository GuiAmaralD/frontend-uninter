function previewImages(event) {
    var previewContainer = document.getElementById('imagePreviews');
    var files = event.target.files;

    if (!files || files.length === 0) {
        return; // Se não houver arquivos, sair da função
    }

    var file = files[0]; // Acessa apenas o primeiro arquivo

    // Verificar se é um Blob válido
    if (!(file instanceof Blob)) {
        console.error('O arquivo não é um Blob válido:', file);
        return; // Sair da função se o arquivo não for válido
    }

    var reader = new FileReader();

    reader.onload = function(event) {
        var imageUrl = event.target.result;

        var imageDiv = document.createElement('div');
        imageDiv.classList.add('image-preview');

        var img = document.createElement('img');
        img.src = imageUrl;

        var deleteIcon = document.createElement('div');
        deleteIcon.classList.add('delete-icon');
        deleteIcon.innerHTML = '&#10006;';

        deleteIcon.onclick = function () {
            imageDiv.remove();
        };
        imageDiv.onmouseover = function () {
            deleteIcon.style.display = 'block';
        };

        imageDiv.onmouseout = function () {
            deleteIcon.style.display = 'none';
        };

        imageDiv.appendChild(img);
        imageDiv.appendChild(deleteIcon);
        previewContainer.innerHTML = ''; // Limpa as pré-visualizações antigas
        previewContainer.appendChild(imageDiv);
    };

    reader.readAsDataURL(file);
}

function submitForm() {
    // Coletando os dados do formulário
    var especie = document.getElementById('especie').value;
    var apelido = document.getElementById('apelido').value;
    var sexo = document.getElementById('sexo').value;
    var porte = document.getElementById('porte').value;
    var descricao = document.getElementById('descricao').value;

    var input = document.getElementById('imagens');
    var file = input.files[0]; // Acessa apenas o primeiro arquivo selecionado

    if (!especie || !sexo || !porte || !file) {
        alert('Por favor, preencha todas as opções do formulário e selecione uma imagem.');
        return; // Impede o envio do formulário se algum campo estiver faltando
    }

    var formData = new FormData();
    formData.append('specie', especie);
    formData.append('nickname', apelido);
    formData.append('sex', sexo);
    formData.append('size', porte);
    formData.append('description', descricao);
    formData.append('file', file);

    // Recuperando o token do localStorage
    var token = localStorage.getItem('token');
    if (!token) {
        alert('Token não encontrado. Por favor, faça login.');
        return;
    }

    var submitButton = document.querySelector('button[onclick="verificarLoginEEnviar()"]');
    submitButton.disabled = true;

    document.body.style.cursor = 'wait';

    // Enviando a requisição POST usando fetch
    var url = 'https://sistema-adocao-uninter.onrender.com/pet';

    fetch(url, {
        method: 'POST',
        headers: {
            'Authorization': 'Bearer ' + token
        },
        body: formData
    })
    .then(function(response) {
        if (!response.ok) {
            throw new Error('Erro ao registrar o pet.');
        }
        if (response.status === 204 || response.headers.get('content-length') === '0') {
            return null; // Sem conteúdo na resposta
        }
        return response.json();
    })
    .then(function(data) {
        alert('Pet registrado com sucesso!');
        // Limpar o formulário ou redirecionar para outra página, se necessário
        document.getElementById('petForm').reset();
        mostrarMensagemSucesso('Animal registrado com sucesso!');
       
    })
    .catch(function(error) {
        alert('Erro ao registrar o pet: ' + error.message);
    })
    .finally(function() {
        // Reativar o botão de envio
        submitButton.disabled = false;
        document.body.style.cursor = 'default';
    });
}

function mostrarMensagemSucesso(mensagem) {
    // Remover o formulário da tela
    var container = document.querySelector('.container');
    container.innerHTML = ''; // Limpa o conteúdo do container

    // Criar o círculo com o V no meio e a mensagem de sucesso
    var sucessoDiv = document.createElement('div');
    sucessoDiv.style.display = 'flex';
    sucessoDiv.style.flexDirection = 'column';
    sucessoDiv.style.alignItems = 'center';
    sucessoDiv.style.justifyContent = 'center';
    sucessoDiv.style.height = '100%';

    var circulo = document.createElement('div');
    circulo.style.width = '100px';
    circulo.style.height = '100px';
    circulo.style.borderRadius = '50%';
    circulo.style.backgroundColor = '#d4edda';
    circulo.style.display = 'flex';
    circulo.style.alignItems = 'center';
    circulo.style.justifyContent = 'center';
    circulo.style.marginBottom = '20px';

    var checkMark = document.createElement('div');
    checkMark.innerHTML = '&#10003;'; // Código HTML para o símbolo de checkmark
    checkMark.style.fontSize = '50px';
    checkMark.style.color = '#28a745';

    var mensagemDiv = document.createElement('div');
    mensagemDiv.innerText = mensagem;
    mensagemDiv.style.fontFamily = 'Roboto, sans-serif';
    mensagemDiv.style.fontSize = '18px';
    mensagemDiv.style.color = '#155724';

    circulo.appendChild(checkMark);
    sucessoDiv.appendChild(circulo);
    sucessoDiv.appendChild(mensagemDiv);

    container.appendChild(sucessoDiv);
}