import * as React from "react";
import { Configuration, OpenAIApi } from "openai";
//TODO - add your OpenAI API key in .env file (figure out why it's not working)
import { OPENAI_API_KEY } from "../../utils/openAI/config";
import { Link } from "react-router-dom";

const configuration = new Configuration({
      apiKey: OPENAI_API_KEY,
    //  apiKey: process.env.OPENAI_API_KEY,  

});
const openai = new OpenAIApi(configuration);


const GenerateText = () => {
    const [recipeName, setRecipeName] = React.useState("");
    const [result, setResult] = React.useState();
  

    async function onSubmit(event) {
      event.preventDefault();

      if (!configuration.apiKey) {
        console.error("No OpenAI API key found. Please add your key to the .env file.");
        return;
      }
    
      try {
        const completion = await openai.createCompletion({
          model: "text-davinci-003",
          prompt: generatePrompt(recipeName),
          temperature: 0.6,
          max_tokens: 1000,
        });
        setResult(completion.data.choices[0].text);
        // console.log(completion.data.choices[0].text);
      } catch(error) {
        if (error.response) {
          console.error(error.response.status, error.response.data);
        } else {
          console.error(`Error with OpenAI API request: ${error.message}`);
        }
      }

    }

    function generatePrompt(recipe) {
  
      const capitalizedRecipe =
        recipe[0].toUpperCase() + recipe.slice(1).toLowerCase();
      return `Suggest three names for a dish that is a superhero.
    
    Dish: Pizza
    Names: Slice-Man, Pizza Power, The Dough Avenger
    Dish: Burger
    Names: Burger Man, Captain Bun, The Beefy Hero
    Dish: ${capitalizedRecipe}
    Names: `;
    }
  // TODO: add spinner
    return (
      <div className="generateText">
          <img className="generateText__logo" src="/img/food.png" alt='logo'/>
          <h3 className="generateText__title" >Get a Cool Name</h3>
          <form className="generateText__form" onSubmit={onSubmit}>
            <input
              className="generateText__form__input"
              type="text"
              name="animal"
              placeholder="Enter e.a: Pizza"
              value={recipeName}
              onChange={(e) => setRecipeName(e.target.value)}
            />
            <input className="generateText__form__submit" type="submit" value="Generate names" />
          </form>
          <Link className="generateText__link" to='/addRecipe'>
              Go to Add Recipe
          </Link>
          <div className="generateText__textArea"  >{result}</div>
      </div>
    );
  }

  export default GenerateText;