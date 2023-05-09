import * as dotenv from "dotenv";
dotenv.config();
import pinataSDK from "@pinata/sdk";
import * as fs from "fs";
import dataJson from "../../nfts/data.json" assert { type: "json" };

async function main() {
	const pinataJWTKey = process.env.PINATA_JWT_KEY;

	if (!pinataJWTKey) {
		console.log("🚫️ You need to set a Pinata JWT key (PINATA_JWT_KEY) first");
		return;
	}

	const pinata = new pinataSDK({ pinataJWTKey: pinataJWTKey });
	const dirname = "../nfts/images/";

	console.log("dataJson: ", dataJson);

	pinata.testAuthentication().then((result) => {
		//handle successful authentication here
		console.log(result);

		fs.readdir(dirname, async function (err, filenames) {
			if (err) {
				console.log("Error reading directory: ", err);
				return;
			}

			const imagesPinned = {};

			for (let i = 0; i < filenames.length; i++) {
				const filename = filenames[i];
				console.log("filename: ", filename);
				const readableStreamForFile = fs.createReadStream(dirname + filename);
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
				imagesPinned[filename] = resultPin.IpfsHash;
			};

			console.log("imagesPinned: ", imagesPinned);

			fs.writeFileSync("../nfts/imagesPinned.json", JSON.stringify(imagesPinned, null, 2));

			const metadatas = [];

			for (let i = 0; i < dataJson.length; i++) {
				const item = dataJson[i];
				const image = item.image;
				const imagePinned = imagesPinned[image];
				console.log("image: ", image);
				console.log("imagePinned: ", imagePinned);
				const name = item.name;
				const talk = item.talk;
				const metadata = {
					name: item.name + " at EDCON: " + item.talk,
					description: item.name + " at EDCON: " + item.talk,
					image: "ipfs://" + imagePinned,
					attributes: [
						{ trait_type: "speaker", value: name },
						{ trait_type: "talk", value: talk },
					],
				};
				metadatas.push(metadata);
				const options = {
					pinataMetadata: {
						name: item.name + " at EDCON: " + item.talk,
					},
					pinataOptions: {
						cidVersion: 0
					}
				};
				const resultPin = await pinata.pinJSONToIPFS(metadata, options);
				console.log("resultPin: ", resultPin);
				dataJson[i]["metadata"] = resultPin.IpfsHash;
			}

			console.log("metadatas: ", metadatas);

			fs.writeFileSync("../nfts/metadatas.json", JSON.stringify(metadatas, null, 2));

			console.log("dataJson: ", dataJson);

			fs.writeFileSync("../nfts/metadata.json", JSON.stringify(dataJson, null, 2));
		});

	}).catch((err) => {
		//handle error here
		console.log(err);
	});
}

main().catch(error => {
	console.error(error);
	process.exitCode = 1;
});
