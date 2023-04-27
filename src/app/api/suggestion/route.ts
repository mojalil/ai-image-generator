// If running locally for dev, use dev url otherwise use production url
// const devUrl = "http://localhost:7071/api/getChatGPTSuggestion";

// const devUrl = "http://localhost:7071/api/getChatGPTSuggestion"

//  replace localhost with ip of localhost

const devUrl = "http://127.0.0.1:7071/api/getChatGPTSuggestion"

const testUrl = "http://localhost:3000/api/alive"

const url = devUrl


export async function GET(request: Request) {

    console.log("GET request received")
  // Connect to endpont and get response from GPT-3

    const response = await fetch(url, {
        cache: "no-store",
    })

    const text = await response.text()

    console.log("Response from GPT-3: ", text)

    return new Response(JSON.stringify(text), {
        status: 200,
    });


}

