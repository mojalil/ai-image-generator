import { NextResponse } from "next/server"

const devUrl = "http://127.0.0.1:7071/api/generateImage"

const url = devUrl

export async function POST(request: Request) {
    const promptResponse = await request.json();
    const prompt = promptResponse.prompt;

    const response = await fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ prompt }),
    });

    const text = await response.text();

    return NextResponse.json( text );

}
