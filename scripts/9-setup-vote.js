import sdk from "./1-initialize-sdk.js";

// This is our governance contract.
const vote = sdk.getVote("0x0DDD57e029f6C80F55c7aFe6f42D0294781580dD");

// This is our ERC-20 contract.
const token = sdk.getToken("0x117dFD0B1B9a9F10d88e4Feb47C0b2ad8DDf04AE");

(async () => {
  try {
    // Give our treasury the power to mint additional token if needed.
    await token.roles.grant("minter", vote.getAddress());

    console.log(
      "Successfully gave vote contract permissions to act on token contract"
    );
  } catch (error) {
    console.error(
      "failed to grant vote contract permissions on token contract",
      error
    );
    process.exit(1);
  }

  try {
    // Grab our wallet's token balance, remember -- we hold basically the entire supply right now!
    const ownedTokenBalance = await token.balanceOf(
      process.env.WALLET_ADDRESS
    );

    // Grab 90% of the supply that we hold.
    const ownedAmount = ownedTokenBalance.displayValue;
    const percent90 = Number(ownedAmount) / 100 * 90;

    // Transfer 90% of the supply to our voting contract.
    await token.transfer(
      vote.getAddress(),
      percent90
    ); 

    console.log("✅ Successfully transferred " + percent90 + " tokens to vote contract");
  } catch (err) {
    console.error("failed to transfer tokens to vote contract", err);
  }
})();