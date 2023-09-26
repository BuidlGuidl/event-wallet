import * as fs from "fs";
import * as path from "path";

const target = path.join(__dirname, "../../../nextjs/generated/deployedContracts.ts");
const dest = path.join(__dirname, "/deployedContracts.ts");
console.log(target);
console.log(dest);

fs.copyFile(target, dest, err => {
  if (err) throw err;
  console.log("File Copied");
});
