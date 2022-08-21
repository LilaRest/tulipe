import { dapp } from "../index.js";

export default async function initWatchers () {

  dapp.provider.onSafe(() => {

    // Update watchers on new block.
    dapp.provider.on("block", async function (blockNumber) {
      const block = await dapp.provider.getBlockWithTransactions(blockNumber);

      for (const transaction of block.transactions) {
        if (Object.keys(dapp._chainWatchers).includes(transaction.to)) {
          await dapp._chainWatchers[transaction.to].update();
        }
        if (dapp.signer.status.is("CONNECTED")) {
          if (await dapp.signer.getAddress() === transaction.from) {
          //   // signer.sync(blockNumber); // blockNumber is used to prevent syncing multiple times of the data has already been synced at this block. Maybe it could be managed internally by sync without having to  pass it manually
          }
        }
      }
    })
  })
}
