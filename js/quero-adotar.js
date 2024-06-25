function mockLoadAnimals() {
    return new Promise((resolve) => {
        setTimeout(() => {
            const animals = [
                {
                    name: "Bichano",
                    image: "https://placekitten.com/200/300",
                    description: "Gato simpático e brincalhão",
                },
                {
                    name: "Rex",
                    image: "https://placedog.net/200/300",
                    description: "Cachorro fiel e amigável",
                },
                {
                    name: "Luna",
                    image: "https://placekitten.com/201/300",
                    description: "Gata carinhosa e quieta",
                },
                {
                    name: "Polly",
                    image: "https://placekitten.com/202/300",
                    description: "Pássaro colorido e alegre",
                },
            ];
            resolve(animals);
        }, 1000); // Simula um tempo de resposta de 1 segundo (1000 ms)
    });
}

async function loadAnimals() {
    try {
        const animals = await mockLoadAnimals(); // Chamada para carregar os animais (mock)
        renderAnimalCards(animals); // Chama a função para renderizar os cards com os dados recebidos
    } catch (error) {
        console.error('Erro:', error);
    }
}

// Função para renderizar os cards de animais
function renderAnimalCards(animals) {
  const animalList = document.getElementById("animal-list");
  animalList.innerHTML = "";

  animals.forEach((animal) => {
    const animalCard = document.createElement("div");
    animalCard.className = "animal-card";
    animalCard.innerHTML = `
            <img src="${animal.image}" alt="${animal.name}">
            <h3>${animal.name}</h3>
            <p>${animal.description}</p>
        `;
    animalList.appendChild(animalCard);
  });
}

/*function filterAnimals() {
  const species = document.getElementById("species").value;
  const gender = document.getElementById("gender").value;
  const size = document.getElementById("size").value;

  // Chame a API ou backend para obter os animais filtrados
  fetch(`/api/animals?species=${species}&gender=${gender}&size=${size}`)
    .then((response) => response.json())
    .then((data) => {
      const animalList = document.getElementById("animal-list");
      animalList.innerHTML = "";

      data.forEach((animal) => {
        const animalCard = document.createElement("div");
        animalCard.className = "animal-card";
        animalCard.innerHTML = `
                            <img src="${animal.image}" alt="${animal.name}">
                            <h3>${animal.name}</h3>
                            <p>${animal.description}</p>
                        `;
        animalList.appendChild(animalCard);
      });
    });
}*/

function filterAnimals() {
    const species = document.getElementById("species").value;
    const gender = document.getElementById("gender").value;
    const size = document.getElementById("size").value;

    // Filtrar os dados de exemplo com base nos critérios selecionados
    const filteredAnimals = animals.filter((animal) => {
        return (
            (species === "" || animal.species === species) &&
            (gender === "" || animal.gender === gender) &&
            (size === "" || animal.size === size)
        );
    });

    // Atualizar a lista de animais na página
    const animalList = document.getElementById("animal-list");
    animalList.innerHTML = "";

    filteredAnimals.forEach((animal) => {
        const animalCard = document.createElement("div");
        animalCard.className = "animal-card";
        animalCard.innerHTML = `
            <img src="${animal.image}" alt="${animal.name}">
             <h3>${animal.name}</h3>
            <p>${animal.description}</p>
         `;
        animalList.appendChild(animalCard);
    });
}

// Chamada para carregar os animais ao carregar a página
document.addEventListener("DOMContentLoaded", () => {
  loadAnimals();
});
