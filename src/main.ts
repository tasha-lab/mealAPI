import axios from "axios";
let btn = document.getElementById("thebutton") as HTMLButtonElement;
let theInput = document.getElementById("input") as HTMLInputElement;
let theresult = document.getElementById("theoutput") as HTMLParagraphElement;
let theList = document.getElementById("list") as HTMLUListElement;

btn.addEventListener(`click`, async (e) => {
  e.preventDefault();

  const value = theInput.value;
  console.log(value);

  theInput.value = "";

  if (value === ``) {
    theresult.innerHTML = "you did not add an input";
    theresult.style.fontFamily = "Roboto";
    theresult.style.textDecoration = "none";
    theList.style.display = "none";
    return;
  } else {
    theresult.innerHTML = ``;
    theresult.style.fontFamily = "Roboto";
    theresult.style.textDecoration = "none";
    theList.style.display = "none";
  }

  try {
    const response = await axios.get(
      `https://www.themealdb.com/api/json/v1/1/search.php?s=${value}`,
    );
    const myresult = response.data.meals;
    console.log(myresult);
    if (!myresult) {
      theresult.innerHTML = "<p>No meals found for your search!</p>";
      return;
    }

    const output = myresult.map((item: any) => {
      return `
<div class="output">
              <h3>${item.strMeal}</h3>
              <h4>Origin: ${item.strArea} | Category: ${item.strCategory}</h4>
              <p class"instructions" >${item.strInstructions}</p>
              <div class="output-img">
                 <img src="${item.strMealThumb}" alt="${item.strMeal}" class="meal-image">
              </div>
              <ul meal="meal-list">
                <li>${item.strIngredient1}</li>
                <li>${item.strIngredient2}</li>
                <li>${item.strIngredient3}</li>
                <li>${item.strIngredient4}</li>
                <li>${item.strIngredient5}</li>
                <li>${item.strIngredient6}</li>
                <li>${item.strIngredient7}</li>
                <li>${item.strIngredient8}</li>
              </ul>
            </div>
          `;
    });

    theList.innerHTML = output.join("");
    theList.style.display = "block";
  } catch (error) {
    console.log("Something went wrong!", error);
  }
});
