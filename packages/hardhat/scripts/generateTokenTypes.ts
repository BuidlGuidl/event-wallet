import * as dotenv from "dotenv";
dotenv.config();
import * as fs from "fs";

async function main() {
  function getRandomDigit() {
    return Math.floor(Math.random() * 10);
  }

  function getRandomNumberString() {
    let random = "";
    for (let i = 0; i < 10; i++) {
      const randomDigit = getRandomDigit();
      if (!(i === 0 && randomDigit === 0)) {
        random += randomDigit.toString();
      }
    }
    return random;
  }

  const imagesDirname = "../nfts/images/";
  const outputImagesDirname = "../nextjs/public/assets/nfts/";

  fs.readdir(imagesDirname, async function (err, filenames) {
    if (err) {
      console.log("Error reading directory: ", err);
      return;
    }

    const metadata = {};

    for (let i = 0; i < filenames.length; i++) {
      const filename = filenames[i];
      console.log("filename: ", filename);

      const randomNumberString = getRandomNumberString();
      const randomName = randomNumberString + ".jpg";

      fs.copyFileSync(imagesDirname + filename, outputImagesDirname + randomName);

      metadata[randomNumberString] = {
        name: filename.split(".")[0],
        talk: "",
        description: "Description",
      };
    }

    fs.writeFileSync("../nfts/metadata.json", JSON.stringify(metadata, null, 2));
  });
}

main().catch(error => {
  console.error(error);
  process.exitCode = 1;
});
