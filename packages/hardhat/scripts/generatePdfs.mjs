import { ethers, Wallet } from "ethers";
import * as fs from "fs";
import QRCode from "qrcode";
import { PDFDocument, rgb } from "pdf-lib";
import { createCanvas } from "canvas";
import { createRequire } from "module";

const require = createRequire(import.meta.url);
const canvas = createCanvas(300, 300);
const EVENT_URL = "https://wallet.edcon.io/pk#";

const outputDirectory = "generated";

/**
 * Henerate PDFs for each account.
 */
async function main() {
  // Check if amount argument is provided
  let accounts;
  try {
    accounts = JSON.parse(fs.readFileSync("accounts.json", "utf8"));
  } catch (e) {
    console.error("🚫️ packages/hardhat/accounts.json not found");
    return;
  }
  const amount = Object.keys(accounts).length;
  console.log("🖨 Generating " + amount + " pdfs...");

  const values = Object.values(accounts);
  for (const privateKey of values) {
    const generatedWallet = new Wallet(privateKey);
    console.log("Created 🧍 " + generatedWallet.address);

    try {
      const dataUrl = await QRCode.toDataURL(EVENT_URL + generatedWallet.privateKey, {
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
      const filename = outputDirectory + "/" + generatedWallet.address.substring(2, 8) + ".pdf";
      fs.writeFileSync(filename, pdfBytes);

      console.log("💾 " + filename + "");
    } catch (err) {
      console.error(err);
    }
  }
}

main().catch(error => {
  console.error(error);
  process.exitCode = 1;
});
