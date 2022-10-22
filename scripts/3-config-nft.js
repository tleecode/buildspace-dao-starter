import sdk from "./1-initialize-sdk.js";
import { readFileSync } from "fs";

const editionDrop = await sdk.getEditionDrop("0xADb30D8207615B0b30D275972A97E3230EBc2B6A");

(async () => {
  try {
    await editionDrop.createBatch([
      {
        name: "Iceland",
        description: "This NFT will give you access to Iceland!",
        image: readFileSync("scripts/assets/iceland.png"),
      },
    ]);
    console.log("✅ Successfully created a new NFT in the drop!");
  } catch (error) {
    console.error("failed to create the new NFT", error);
  }
})();