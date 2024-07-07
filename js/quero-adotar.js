const baseUrl = 'https://sistema-adocao-uninter.onrender.com';
const localbaseUrl = 'http://localhost:8080';

async function fetchAllAnimals() {
    try {
        const response = await fetch(`${baseUrl}/pet`);
        const animals = await response.json();
        console.log('Animais recebidos:', animals); // Log para verificar os dados recebidos
        displayAnimals(animals);
    } catch (error) {
        console.error('Erro ao buscar animais:', error);
    }
}

async function fetchFilteredAnimals() {
    const species = document.getElementById('species').value;
    const gender = document.getElementById('gender').value;
    const size = document.getElementById('size').value;

    try {
        let url = `${baseUrl}/pet?`;
        if (species) url += `species=${species}&`;
        if (gender) url += `gender=${gender}&`;
        if (size) url += `size=${size}&`;

        const response = await fetch(url.slice(0, -1)); // Remove o último '&'
        const animals = await response.json();
        console.log('Animais filtrados recebidos:', animals); // Log para verificar os dados recebidos
        displayAnimals(animals);
    } catch (error) {
        console.error('Erro ao buscar animais filtrados:', error);
    }
}

function displayAnimals(animals) {
    const animalList = document.getElementById('animal-list');
    animalList.innerHTML = '';

    animals.forEach(animal => {
        const animalCard = document.createElement('div');
        animalCard.classList.add('animal-card');

        const animalImage = document.createElement('img');
        if (animal.imageBase64) {
            const imageSrc = `data:image/jpeg;base64,${animal.imageBase64}`;
            console.log(`Animal ID: ${animal.id}, Base64 Image: ${animal.imageBase64}`); // Log do Base64
            animalImage.src = imageSrc;
        } else {
            console.error(`Imagem não disponível para o animal com ID: ${animal.id}`);
            animalImage.src = 'path/to/placeholder/image.jpg'; // Caminho para uma imagem de placeholder
            animalImage.alt = 'Imagem não disponível';
        }
        animalImage.onerror = () => console.error(`Erro ao carregar a imagem para o animal com ID: ${animal.id}`);
        animalCard.appendChild(animalImage);

        const animalName = document.createElement('h3');
        animalName.textContent = animal.nickname;
        animalCard.appendChild(animalName);

        const animalDescription = document.createElement('p');
        animalDescription.textContent = animal.description;
        animalCard.appendChild(animalDescription);

        // Adicionar evento de clique para redirecionar para animal.html com o ID do animal
        animalCard.addEventListener('click', () => redirectToAnimalPage(animal.id));

        animalList.appendChild(animalCard);
    });
}

function redirectToAnimalPage(animalId) {
    // Redirecionar para animal.html passando o ID do animal como parâmetro na URL
    window.location.href = `pet-info.html?id=${animalId}`;
}

document.addEventListener('DOMContentLoaded', function() {
    fetchAllAnimals();
});