import { ethers } from "ethers";
import * as fs from "fs";
import QRCode from "qrcode";
import { PDFDocument, rgb } from "pdf-lib";
import { createCanvas } from "canvas";
import { createRequire } from "module";

const require = createRequire(import.meta.url);
const canvas = createCanvas(300, 300);
const url = "https://event-wallet.vercel.app/pk#";

const outputDirectory = "generated";

/**
 * Generate list of new random private key and write it to a json file
 */
async function main() {
  // Check if amount argument is provided
  const [amount] = process.argv.slice(2);
  if (!amount) {
    console.error("🚫️ Please provide an amount. E.g. yarn generate-pdfs 200");
    return;
  }

  console.log("🖨 Generating " + amount + " pdfs...");

  const wallets = {};
  for (let i = 0; i < +amount; i++) {
    const randomWallet = ethers.Wallet.createRandom();
    console.log("Created 🧍 " + randomWallet.address);
    wallets[randomWallet.address] = randomWallet.privateKey;

    try {
      const dataUrl = await QRCode.toDataURL(url + randomWallet.privateKey, {
        type: "image/png",
        rendererOpts: { quality: 1 },
      });
      const base64Data = dataUrl.replace(/^data:image\/\w+;base64,/, "");
      const buffer = Buffer.from(base64Data, "base64");

      const pdfDoc = await PDFDocument.create();
      const page = pdfDoc.addPage([350, 350]);
      const qrCodeImage = await pdfDoc.embedPng(buffer);
      const { width, height } = qrCodeImage.scale(2);

      page.drawImage(qrCodeImage, {
        x: (page.getWidth() - width) / 2,
        y: (page.getHeight() - height) / 2,
        width,
        height,
      });

      if (!fs.existsSync(outputDirectory)) {
        fs.mkdirSync(outputDirectory);
      }

      const pdfBytes = await pdfDoc.save();
      const filename = outputDirectory + "/" + randomWallet.address.substring(2, 8) + ".pdf";
      fs.writeFileSync(filename, pdfBytes);

      console.log("💾 " + filename + "");
    } catch (err) {
      console.error(err);
    }
  }

  // Dump wallets into a json file
  fs.writeFileSync("./accounts.json", JSON.stringify(wallets, null, 2));
  console.log("📄 Account and its private keys saved to packages/hardhat/accounts.json file");
}

main().catch(error => {
  console.error(error);
  process.exitCode = 1;
});
