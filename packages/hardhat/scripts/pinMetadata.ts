import * as dotenv from "dotenv";
dotenv.config();
import pinataSDK from "@pinata/sdk";
import * as fs from "fs";
import { ASSETS } from "../../nextjs/assets";

async function main() {
	const pinataJWTKey = process.env.PINATA_JWT_KEY;

	if (!pinataJWTKey) {
		console.log("🚫️ You need to set a Pinata JWT key (PINATA_JWT_KEY) first");
		return;
	}

	const pinata = new pinataSDK({ pinataJWTKey: pinataJWTKey });
	const imagesDirname = "../nextjs/public/assets/nfts/";

	pinata.testAuthentication().then(async (result) => {
		//handle successful authentication here
		console.log(result);

		const tokenTypeIds = Object.keys(ASSETS);

		const imagesPinned = {};

		for (let i = 0; i < tokenTypeIds.length; i++) {
			const tokenTypeId = tokenTypeIds[i];
			const filename = tokenTypeId + ".jpg";
			console.log("filename: ", filename);
			const readableStreamForFile = fs.createReadStream(imagesDirname + filename);
			const options = {
				pinataMetadata: {
					name: filename,
				},
				pinataOptions: {
					cidVersion: 0
				}
			};
			const resultPin = await pinata.pinFileToIPFS(readableStreamForFile, options);
			console.log("resultPin: ", resultPin);
			imagesPinned[tokenTypeId] = resultPin.IpfsHash;
		};

		console.log("imagesPinned: ", imagesPinned);

		fs.writeFileSync("../nfts/imagesPinned.json", JSON.stringify(imagesPinned, null, 2));

		const metadatas = [];
		const metadataHashes = {};
		let tokenMapping = "";

		for (let i = 0; i < tokenTypeIds.length; i++) {
			const tokenTypeId = tokenTypeIds[i];
			const item = ASSETS[tokenTypeId];
			const imagePinned = imagesPinned[tokenTypeId];
			console.log("tokenTypeId: ", tokenTypeId);
			console.log("imagePinned: ", imagePinned);
			const name = item.name;
			const talk = item.talk;
			const metadata = {
				name: name + " at EDCON: " + talk,
				description: name + " at EDCON: " + talk,
				image: "ipfs://" + imagePinned,
				attributes: [
					{ trait_type: "speaker", value: name },
					{ trait_type: "talk", value: talk },
				],
			};
			metadatas.push(metadata);
			const options = {
				pinataMetadata: {
					name: name + " at EDCON: " + talk,
				},
				pinataOptions: {
					cidVersion: 0
				}
			};
			const resultPin = await pinata.pinJSONToIPFS(metadata, options);
			console.log("resultPin: ", resultPin);
			metadataHashes[resultPin.IpfsHash] = tokenTypeId;
			tokenMapping += `_tokenMappings[${tokenTypeId}] = "${resultPin.IpfsHash}";\n`;
		}

		console.log("metadatas: ", metadatas);

		fs.writeFileSync("../nfts/metadatas.json", JSON.stringify(metadatas, null, 2));

		console.log("metadataHashes: ", metadataHashes);

		fs.writeFileSync("../nextjs/metadataHashes.json", JSON.stringify(metadataHashes, null, 2));

		fs.writeFileSync("../nfts/tokenMapping.txt", tokenMapping);

	}).catch((err) => {
		//handle error here
		console.log(err);
	});
}

main().catch(error => {
	console.error(error);
	process.exitCode = 1;
});
