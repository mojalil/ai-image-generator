export async function GET(request: Request) {


    // Connect to microsoft azure endpont
    const response = await fetch('https://api.openai.com/v1/engines/davinci/completions', {
        cache: 'no-cache',
})


    const textData = await response.json();

    // turn json to string
    const text = JSON.stringify(textData.trim());

    return new Response(text, {
        status: 200})
  }
  