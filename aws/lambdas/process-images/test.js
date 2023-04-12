const { getClient, getOriginalImage, processImage, uploadProcessedImage } = require('./s3-image-processing.js')

async function main() {
    client = getClient()
    const srcBucket = 'assets.annleefores.cloud'
    const srcKey = 'avatar/original/data.jpg'
    const dstBucket = 'assets.annleefores.cloud'
    const dstKey = 'avatar/processed/data.png'
    const width = 256
    const height = 256

    const originalImage = await getOriginalImage(client, srcBucket, srcKey)
    console.log(originalImage)
    const processedImage = await processImage(originalImage, width, height)
    await uploadProcessedImage(client, dstBucket, dstKey, processedImage)
}

main()