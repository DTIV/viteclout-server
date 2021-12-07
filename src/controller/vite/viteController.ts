//@ts-ignore
import { WS_RPC } from "@vite/vitejs-ws";
import { ViteAPI } from "@vite/vitejs";
import config from "../../config";

const { RPC_URL } = config;

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

export default {
  getSnapshotChainHeight,
};
