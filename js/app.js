async function getData() {
  try {
    const response = await fetch(
      "https://www.thecocktaildb.com/api/json/v1/1/search.php?s=margarita"
    );

    if (!response.ok) {
      throw new Error(`Estado de la respuesta: ${response.status}`);
    }

    const result = await response.json();
    console.log(result);

    const container = document.querySelector("#contenedor-cocktails");

    result.drinks.forEach(cocktail => {
      const cocktailCard = document.createElement("div");
      cocktailCard.classList.add("cocktailCard");

      cocktailCard.innerHTML = `
        <h3>${cocktail.strDrink}</h3>
        <img src="${cocktail.strDrinkThumb}" alt="${cocktail.strDrink}">
      `;

      container.appendChild(cocktailCard);
    });

  } catch (error) {
    console.error(error.message);
  }
}

getData();