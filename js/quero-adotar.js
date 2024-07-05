const baseUrl = 'https://sistema-adocao-uninter.onrender.com';
const localbaseUrl = 'http://localhost:8080'

async function fetchAllAnimals() {
    try {
        const response = await fetch(`${baseUrl}/pet`);
        const animals = await response.json();
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
        animalImage.src = `${baseUrl}/static/images/${animal.imagePath}`;
        animalImage.alt = 'Imagem do animal';
        animalCard.appendChild(animalImage);

        const animalName = document.createElement('h3');
        animalName.textContent = animal.nickname;
        animalCard.appendChild(animalName);

        const animalDescription = document.createElement('p');
        animalDescription.textContent = animal.description;
        animalCard.appendChild(animalDescription);

        animalList.appendChild(animalCard);
    });
}

document.addEventListener('DOMContentLoaded', function() {
    fetchAllAnimals();
});