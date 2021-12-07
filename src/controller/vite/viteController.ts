//@ts-ignore
import { WS_RPC } from "@vite/vitejs-ws";
import { ViteAPI, accountBlock } from "@vite/vitejs";
import config from "../../config";

const { createAccountBlock } = accountBlock;
const { RPC_URL, CONTRACT_ADDRESS } = config;
let WS_service = new WS_RPC(RPC_URL);
let provider = new ViteAPI(WS_service, () => {
  console.log("Connected");
});

export const getSnapshotChainHeight = async () => {
  try {
    const height = await provider.request("ledger_getSnapshotChainHeight");
    return {
      height,
    };
  } catch (err) {
    console.log("Error while retrieving snapshot chain height");
    console.log(err);
  }
};

export const createToken = async () => {
  try {
    const accountBlock = createAccountBlock("issueToken", {
      address: CONTRACT_ADDRESS,
      tokenName: "TestToken2",
      isReIssuable: true,
      maxSupply: "1000000000000000000000000",
      isOwnerBurnOnly: false,
      totalSupply: "10000000000000000000000",
      decimals: 3,
      tokenSymbol: "TTK2",
    });
    return accountBlock.tokenId;
  } catch (err) {
    console.log("Error while retrieving snapshot chain height");
    console.log(err);
  }
};

export default {
  getSnapshotChainHeight,
  createToken,
};
