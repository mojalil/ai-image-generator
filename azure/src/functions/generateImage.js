const { app } = require("@azure/functions");
const openai = require("../../lib/openai");
const axios = require("axios");
const generateSASToken = require("../../lib/generateSASToken");

const { BlobServiceClient } = require("@azure/storage-blob");

const accountName = process.env.AZURE_STORAGE_ACCOUNT_NAME;

const containerName = process.env.AZURE_STORAGE_CONTAINER_NAME;

app.http("generateImage", {
  methods: ["POST"],
  authLevel: "anonymous",
  handler: async (request, context) => {
    const { prompt } = await request.json();

    console.log(`Prompt: ${prompt}`);

    const response = await openai.createImage({
      prompt: prompt,
      n: 1,
      size: "1024x1024",
    });

    const image_url = response.data.data[0].url;

    const res = await axios.get(image_url, {
      responseType: "arraybuffer",
    });

    console.log(`Image downloaded`)

    const arraybuffer = res.data;

    console.log(`Image converted to arraybuffer with length of ${arraybuffer.length}`)



    const sasToken = await generateSASToken();

    const blobServiceClient = new BlobServiceClient(
      `https://${accountName}.blob.core.windows.net?${sasToken}`
    );

    const containerClient = blobServiceClient.getContainerClient(containerName);

    const timestamp = new Date().getTime();
    const file_name = `${prompt}_${timestamp}.png`;

    const blockBlobClient = containerClient.getBlockBlobClient(file_name);

    try {
      await blockBlobClient.uploadData(arraybuffer)
      console.log("Image uploaded successfully");
    } catch (error) {
      console.log("Error uploading image");
      console.log(error);
    }

    return { body: `Sucessfully uploaded image: ${file_name} with url ${image_url}` };
  },
});
