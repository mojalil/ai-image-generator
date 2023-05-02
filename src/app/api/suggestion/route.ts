

const devUrl = "http://127.0.0.1:7071/api/getChatGPTSuggestion"
const prodUrl = "https://ai-image-generator-mo.azurewebsites.net/api/getchatgptsuggestion"

// Check environment if running locally use devUrl else use prodUrl
const url = process.env.NODE_ENV === "development" ? devUrl : prodUrl

export async function GET(request: Request) {

    console.log("GET request received")
  // Connect to endpont and get response from GPT-3

    const response = await fetch(url, {
        cache: "no-store",
    })

    const text = await (await response.text()).trim()

    console.log("Response from GPT-3: ", text)

    return new Response(JSON.stringify(text), {
        status: 200,
    });


}

