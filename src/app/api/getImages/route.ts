const devUrl = "http://127.0.0.1:7071/api/getImages"
const prodUrl = "https://ai-image-generator-mo.azurewebsites.net/api/getimages"

// Check environment if running locally use devUrl else use prodUrl
const url = process.env.NODE_ENV === "development" ? devUrl : prodUrl

export async function GET(request: Request) {
    const response = await fetch(url, {
        cache: "no-store",
    })

    const blob = await response.blob()
    const textData = await blob.text()

    const data = JSON.parse(textData)

    return new Response(JSON.stringify(data), {
        status: 200,
    });
}
