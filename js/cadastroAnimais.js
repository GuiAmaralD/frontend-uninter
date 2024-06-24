function previewImages(event) {
    var previewContainer = document.getElementById('imagePreviews');
    var files = event.target.files;

    if (!files || files.length === 0) {
        return; // Se não houver arquivos, sair da função
    }

    // Iterar sobre cada arquivo
    for (var i = 0; i < files.length; i++) {
        var file = files[i];

        // Verificar se é um Blob válido
        if (!(file instanceof Blob)) {
            console.error('O arquivo não é um Blob válido:', file);
            continue; // Passar para o próximo arquivo
        }

        var reader = new FileReader();

        reader.onload = (function(image) {
            return function(event) {
                var imageUrl = event.target.result;

                var imageDiv = document.createElement('div');
                imageDiv.classList.add('image-preview');

                var img = document.createElement('img');
                img.src = imageUrl;

                img.onclick = function () {
                    var zoomedImage = document.createElement('img');
                    zoomedImage.src = imageUrl;
                    zoomedImage.classList.add('zoomed-image');
                    document.body.appendChild(zoomedImage);

                    // Adiciona evento de clique para fechar a visualização em zoom
                    zoomedImage.onclick = function () {
                        document.body.removeChild(zoomedImage);
                    };
                };

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
                previewContainer.appendChild(imageDiv);
            };
        })(file);

        reader.readAsDataURL(file);
    }
}

function submitForm() {
    // Coletando os dados do formulário
    var especie = document.getElementById('especie').value;
    var apelido = document.getElementById('apelido').value;
    var sexo = document.getElementById('sexo').value;
    var porte = document.getElementById('porte').value;
    var descricao = document.getElementById('descricao').value;

    // Coletando as URLs das imagens já adicionadas
    var imageUrls = [];
    var existingImages = document.querySelectorAll('#imagePreviews img');
    existingImages.forEach(function(existingImage) {
        imageUrls.push(existingImage.src);
    });

    // Montando o objeto de dados a ser enviado como JSON
    var data = {
        especie: especie,
        apelido: apelido,
        sexo: sexo,
        porte: porte,
        descricao: descricao,
        imagens: imageUrls  // Envie as URLs das imagens, se necessário
    };

    // Enviando a requisição POST usando fetch
    fetch('http://localhost:8080/pet', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    .then(function(response) {
        if (!response.ok) {
            throw new Error('Erro ao registrar o pet.');
        }
        return response.json();
    })
    .then(function(data) {
        alert('Pet registrado com sucesso!');
        // Limpar o formulário ou redirecionar para outra página, se necessário
        document.getElementById('petForm').reset();
        document.getElementById('imagePreviews').innerHTML = ''; // Limpar as pré-visualizações de imagem
    })
    .catch(function(error) {
        alert('Erro ao registrar o pet: ' + error.message);
    });
}
