const { app } = require("@azure/functions");
const openai = require("../../lib/openai");

app.http("getChatGPTSuggestion", {
  methods: ["GET"],
  authLevel: "anonymous",
  handler: async (request, context) => {
    const completion = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: `Create a random text prompt for DALL-E to generate an image, this prompt will be shown to the user,
            include details such as the genre, what the type of painting it should be, example options can be: 
            oil painting, watercolor, abstract, portrait, landscape, still life, surrealism, cubism, impressionism,4k, modern. Do not wrap the anser in quotes.`,
      max_tokens: 100,
      temperature: 0.8,
    });
    console.log(completion.data.choices[0].text);
    return { body: `${completion.data.choices[0].text}` };
  },
});
