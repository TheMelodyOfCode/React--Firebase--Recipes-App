import * as React from "react";
import { Configuration, OpenAIApi } from "openai";
//TODO - add your OpenAI API key in .env file (figure out why it's not working)
import { OPENAI_API_KEY } from "../../utils/openAI/config";


const configuration = new Configuration({
      apiKey: OPENAI_API_KEY,
    //  apiKey: process.env.OPENAI_API_KEY,  

});
const openai = new OpenAIApi(configuration);


const GenerateText = () => {
    const [animalInput, setAnimalInput] = React.useState("");
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
          prompt: animalInput,
          temperature: 0.6,
          max_tokens: 1000,
        });
        setResult(completion.data.choices[0].text);
        console.log(completion.data.choices[0].text);
      } catch(error) {
        if (error.response) {
          console.error(error.response.status, error.response.data);
        } else {
          console.error(`Error with OpenAI API request: ${error.message}`);
        }
      }

    }
  
    return (
      <div className="recipeForm">
        <header>
          <title>OpenAI Quickstart</title>
          <link rel="icon" href="/dog.png" />
        </header>
  
        <main >
          <img src="/dog.png" alt='logo'/>
          <h3>Ask a Question</h3>
          <form onSubmit={onSubmit}>
            <input
              type="text"
              name="animal"
              placeholder="Enter an animal"
              value={animalInput}
              onChange={(e) => setAnimalInput(e.target.value)}
            />
            <input type="submit" value="Generate names" />
          </form>
          <div  >{result}</div>
        </main>
      </div>
    );
  }

  export default GenerateText;