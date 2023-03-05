import { Configuration, OpenAIApi } from "openai";
//TODO - add your OpenAI API key in .env file
import { OPENAI_API_KEY } from "./config";


const configuration = new Configuration({
      apiKey: OPENAI_API_KEY,
    //  apiKey: process.env.OPENAI_API_KEY,  

});
const openai = new OpenAIApi(configuration);

const fetchData = async  (formInput) => {

  if (!configuration.apiKey) {
    console.error("No OpenAI API key found. Please add your key to the .env file.");
    return;
  }

  try {
    const completion = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: formInput,
      temperature: 0.6,
      max_tokens: 20,
    });
    console.log(completion.data.choices[0].text);
  } catch(error) {
    if (error.response) {
      console.error(error.response.status, error.response.data);
    } else {
      console.error(`Error with OpenAI API request: ${error.message}`);
    }
  }
}

export default fetchData;
