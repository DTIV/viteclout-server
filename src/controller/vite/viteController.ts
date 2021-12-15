//@ts-ignore
import { WS_RPC } from "@vite/vitejs-ws";
import { ViteAPI, accountBlock } from "@vite/vitejs";
import config from "../../config";
import { abi, code } from "./vuilderTokenAbi";

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
    return err;
  }
};

export const deployTokenContract = async () => {
  const accountBlock = createAccountBlock("createContract", {
    address: CONTRACT_ADDRESS,
    abi,
    code,
    responseLatency: 2,
  });
  console.log(accountBlock);
  try {
  } catch (err) {
    console.log("Error while retrieving snapshot chain height");
    return err;
  }
};

export default {
  getSnapshotChainHeight,
  deployTokenContract,
};
