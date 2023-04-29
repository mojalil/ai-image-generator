const { app } = require("@azure/functions");

const {
    BlobServiceClient,
    StorageSharedKeyCredential,
} = require("@azure/storage-blob");

const generateSASToken = require("../../lib/generateSASToken");

const accountName = process.env.AZURE_STORAGE_ACCOUNT_NAME;
const accountKey = process.env.AZURE_STORAGE_ACCOUNT_KEY;

const containerName = process.env.AZURE_STORAGE_CONTAINER_NAME;

const sharedKeyCredential = new StorageSharedKeyCredential(
    accountName,
    accountKey
);

const blobServiceClient = new BlobServiceClient(
    `https://${accountName}.blob.core.windows.net`,
    sharedKeyCredential
);


app.http("getImages", {
    methods: ["GET"],
    authLevel: "anonymous",
    handler: async (request, context) => {
        const sasToken = await generateSASToken();

        const containerClient = blobServiceClient.getContainerClient(containerName);

        const imageUrls = [];

        for await (const blob of containerClient.listBlobsFlat()) {
            const url = `https://${accountName}.blob.core.windows.net/${containerName}/${blob.name}?${sasToken}`;
            imageUrls.push({url, name: blob.name});
        }

        // sort imageurls by timestamp in the name of the blob which is after the _ in the name
        const sortedImageUrls = imageUrls.sort((a, b) => {
            //  when doing the split count from the end of the string
            const aTimestamp = a.name.split("_")[1].split(".")[0];
            const bTimestamp = b.name.split("_")[1].split(".")[0];
            return bTimestamp - aTimestamp;
        });

        context.log(`Images were processed successfully. ${sortedImageUrls.length} images were found.`);

        return { jsonBody: sortedImageUrls };
    }
});
