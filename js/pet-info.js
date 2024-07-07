import { capitalizeFirstLetter, capitalizeDescription} from './utils.js';

document.addEventListener('DOMContentLoaded', function() {
    // Função para obter o ID do animal da URL
    function getAnimalIdFromUrl() {
        const urlParams = new URLSearchParams(window.location.search);
        return urlParams.get('id');
    }

    // Função para buscar os detalhes do animal pelo ID
    async function fetchAnimalDetails(animalId) {
        const baseUrl = 'https://sistema-adocao-uninter.onrender.com'; // Substitua pela sua URL de backend
        const localbaseUrl = 'http://localhost:8080'
        const url = `${baseUrl}/pet/${animalId}`;

        try {
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error('Erro ao buscar detalhes do animal');
            }
            const animal = await response.json();
            console.log('Detalhes do animal:', animal);
            displayAnimalDetails(animal);
        } catch (error) {
            console.error('Erro ao buscar detalhes do animal:', error);
            // Tratar o erro conforme necessário (ex: exibir uma mensagem de erro na página)
        }
    }

    // Função para exibir os detalhes do animal na página
    function displayAnimalDetails(animal) {
        const animalImgContainer = document.querySelector('.animal-img');
        const animalInfosContainer = document.querySelector('.animal-infos');
        const ownerInfoContainer = document.querySelector('.owner-info');

        // Exibir imagem do animal
        const animalImage = document.createElement('img');
        if (animal.imageBase64) {
            const imageSrc = `data:image/jpeg;base64,${animal.imageBase64}`;
            animalImage.src = imageSrc;
        } else {
            animalImage.src = 'path/to/placeholder/image.jpg'; // Caminho para uma imagem de placeholder
            animalImage.alt = 'Imagem não disponível';
        }
        animalImgContainer.appendChild(animalImage);

        // Exibir informações do animal
        const animalName = document.createElement('h2');
        animalName.textContent = capitalizeFirstLetter(animal.nickname);
        animalInfosContainer.appendChild(animalName);

        const animalSize = document.createElement('p');
        animalSize.textContent = `Porte: ` + capitalizeFirstLetter(animal.size.name);
        animalInfosContainer.appendChild(animalSize);

        const animalSex = document.createElement('p');
        animalSex.textContent = `Sexo: ${animal.sex === 'f' ? 'Fêmea' : 'Macho'}`;
        animalInfosContainer.appendChild(animalSex);

        const animalRegisteredAt = document.createElement('p');
        animalRegisteredAt.textContent = `Data de Registro: ${new Date(animal.registeredAt).toLocaleDateString()}`;
        animalInfosContainer.appendChild(animalRegisteredAt);


        const descriptionTitle = document.createElement('h2');
        descriptionTitle.textContent = 'Conheça melhor este pet';
        animalInfosContainer.appendChild(descriptionTitle);
        
        const animalDescription = document.createElement('p');
        animalDescription.textContent = capitalizeDescription(animal.description);
        animalDescription.classList.add('animal-description'); // Adiciona a classe para centralizar
        animalInfosContainer.appendChild(animalDescription);

        // Exibir informações do dono
        const ownerName = document.createElement('p');
        ownerName.textContent = `Publicado por ${animal.user.name}`;
        //ownerName.innerHTML = `Publicado por <a href="perfil.html?id=${animal.user.id}" style="color: blue; text-decoration: none;">${animal.user.name}</a>`;
        ownerInfoContainer.appendChild(ownerName);

        const ownerPhoneNumber = document.createElement('p');
        ownerPhoneNumber.textContent = `Telefone para contato: ${animal.user.phoneNumber}`;
        ownerInfoContainer.appendChild(ownerPhoneNumber);

        const ownerEmail = document.createElement('p');
        ownerEmail.textContent = `Email para contato: ${animal.user.email}`;
        ownerInfoContainer.appendChild(ownerEmail);
    }

    // Quando a página é carregada, buscar os detalhes do animal pelo ID na URL
    const animalId = getAnimalIdFromUrl();
    if (animalId) {
        fetchAnimalDetails(animalId);
    } else {
        console.error('ID do animal não encontrado na URL');
        // Tratar o caso em que o ID não está presente na URL
    }
});