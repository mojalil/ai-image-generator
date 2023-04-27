
export async function GET(request: Request) {

    console.log("GET request received")

    //  Return i am alive 

    const text = "I am alive";

    return new Response(text, {
        status: 200,
    });
    
}

