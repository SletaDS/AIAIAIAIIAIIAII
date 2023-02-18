import { Configuration, OpenAIApi } from "openai";


const configuration = new Configuration({
  apiKey:ск-дюЛамGnuW6TDPdYvveUT3BlbkFJPIC4DtYFJyG5dv3y7Lun,
});
const openai = new OpenAIApi(configuration);

export default async function (req, res) {
  if (!configuration.apiKey) {
    res.status(500).json({
      error: {
        message: "OpenAI API key not configured, please follow instructions in README.md",
      }
    });
    return;
  }

  const animal = req.body.animal || '';
  if (animal.trim().length === 0) {
    res.status(400).json({
      error: {
        message: "Please enter a valid prompt",
      }
    });
    return;
  }
  try {
    const completion = await openai.createCompletion(
        {
          model: "text-davinci-003",
          temperature: 0.9,
          max_tokens: 2000,
          prompt:`${animal}`,
          top_p: 1,
          frequency_penalty: 0.0,
          presence_penalty: 0.6,
          stop: [" Human:", " AI:"],
        }
    );
    res.status(200).json({ result: completion.data.choices[0].text });
  } catch(error) {
    // Consider adjusting the error handling logic for your use case
    if (error.response) {
      console.error(error.response.status, error.response.data);
      res.status(error.response.status).json(error.response.data);
    } else {
      console.error(`Error with OpenAI API request: ${error.message}`);
      res.status(500).json({
        error: {
          message: 'An error occurred during your request.',
        }
      });
    }
  }
}

