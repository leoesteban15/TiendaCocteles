let cart = [];
let cocktails = [];

if(localStorage.getItem("cart") != null){
  cart = JSON.parse(localStorage.getItem("cart"));
  console.log(cart);
}

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
        <img src="${cocktail.strDrinkThumb}" alt="${cocktail.strDrink}">
        <div>
          <p>${cocktail.strAlcoholic}</p>
          <h3>${cocktail.strDrink}</h3>
          <button data-id = "${cocktail.idDrink}">Comprar</button>
        </div>
      `;

      const buyButton = cocktailCard.querySelector("button");

      // Añadir el cocktail a cart y subir el cart a LocalStorage
      buyButton.addEventListener("click", () => {
        cart.push(cocktail)
        localStorage.setItem("cart", JSON.stringify(cart));
        console.log(cart);
      })

      container.appendChild(cocktailCard);
    });

  } catch (error) {
    console.error(error.message);
  }
}

getData();