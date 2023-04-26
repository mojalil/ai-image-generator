
// If running locally for dev, use dev url otherwise use production url
const devUrl = 'http://localhost:7071/api/getChatGPTSuggestion';
const prodUrl = 'https://gpt-suggestion.azurewebsites.net/api/getChatGPTSuggestion';
const url = process.env.NODE_ENV === 'production' ? prodUrl : devUrl;


export async function GET(request: Request) {
    // Connect to microsoft azure endpont
    const response = await fetch(url, {
        cache: 'no-store',
})


    const textData = await response.json();

    // turn json to string
    const text = JSON.stringify(textData.trim());

    return new Response(text, {
        status: 200})
  }
  