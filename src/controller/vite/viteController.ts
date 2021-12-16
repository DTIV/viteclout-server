//@ts-ignore
import { WS_RPC } from "@vite/vitejs-ws";
import { ViteAPI, accountBlock, constant, wallet, utils, keystore} from "@vite/vitejs";
import config from "../../config";
import { abi, code } from "./vuilderTokenAbi";

const { createAccountBlock } = accountBlock;
const { RPC_URL, CONTRACT_ADDRESS } = config;
const { Contracts, Vite_TokenId } = constant;

// test account
const seed = "want topic together book banana inherit health chunk hard solve fetch tag devote grain aisle spring tube coil state orchard crowd write horn humble";

// Connect to node
let WS_service = new WS_RPC("wss://buidl.vite.net/gvite/ws");
let provider = new ViteAPI(WS_service, () => {
  console.log("Connected");
});

// derive account from seed phrase
const myAccount = wallet.getWallet(seed).deriveAddress(0);
const recipientAccount = wallet.getWallet(seed).deriveAddress(1);

// fill in contract info
const CONTRACT = {
  binary: '608060405234801561001057600080fd5b50610141806100206000396000f3fe608060405260043610610041576000357c0100000000000000000000000000000000000000000000000000000000900463ffffffff16806391a6cb4b14610046575b600080fd5b6100896004803603602081101561005c57600080fd5b81019080803574ffffffffffffffffffffffffffffffffffffffffff16906020019092919050505061008b565b005b8074ffffffffffffffffffffffffffffffffffffffffff164669ffffffffffffffffffff163460405160405180820390838587f1505050508074ffffffffffffffffffffffffffffffffffffffffff167faa65281f5df4b4bd3c71f2ba25905b907205fce0809a816ef8e04b4d496a85bb346040518082815260200191505060405180910390a25056fea165627a7a7230582095190ce167757b6308031ed4b9893929f96d866542f660a6918457a96dac7d870029',    // binary code
  abi: [{"constant":false,"inputs":[{"name":"addr","type":"address"}],"name":"sayHello","outputs":[],"payable":true,"stateMutability":"payable","type":"function"},{"anonymous":false,"inputs":[{"indexed":true,"name":"addr","type":"address"},{"indexed":false,"name":"amount","type":"uint256"}],"name":"transfer","type":"event"}],                    // JSON ABI
  offChain: '',  // binary offchain code
  address: 'vite_8b624a79672e2f49732935bb19420324c9021236bf28e8de62',   // contract address
}

CONTRACT.address = 'vite_8b624a79672e2f49732935bb19420324c9021236bf28e8de62';

async function receiveTransaction(account:any) {
  // get the first unreceived tx
  const data = await provider.request('ledger_getUnreceivedBlocksByAddress', account.address, 0, 1);
  if (!data || !data.length) {
      console.log('[LOG] No Unreceived Blocks');
      return;
  }
  // create a receive tx
  const ab = accountBlock.createAccountBlock('receive', {
      address: account.address,
      sendBlockHash: data[0].hash
  }).setProvider(provider).setPrivateKey(account.privateKey);

  await ab.autoSetPreviousAccountBlock();
  const result = await ab.sign().send();
  console.log('receive success', result);
}

async function sendTx(account:any, address:any ,amount:any) {
  const ab = accountBlock.createAccountBlock('send', {
      address: account.address,
      toAddress: address,
      amount
  }).setProvider(provider).setPrivateKey(account.privateKey);

  await ab.autoSetPreviousAccountBlock();
  const result = await ab.sign().send();
  console.log('send success', result);
}

async function callContract(account:any, methodName:any, abi:any, params:any, amount:any) {
  const block = accountBlock.createAccountBlock('callContract', {
      address: account.address,
      abi,
      methodName,
      amount,
      toAddress: CONTRACT.address,
      params
  }).setProvider(provider).setPrivateKey(account.privateKey);

  await block.autoSetPreviousAccountBlock();
  const result = await block.sign().send();
  console.log('call success', result);
}

async function main() {
  // call the contract we deployed and send over 150 VITE
  await callContract(myAccount, 'sayHello', CONTRACT.abi, [recipientAccount.address], '150000000000000000000');
  // send 10 VITE 
  await sendTx(myAccount, recipientAccount.address, '10000000000000000000');
  // recipient receives the tx
  await receiveTransaction(recipientAccount);
}

main().then(res => {}).catch(err => console.error("ERROR",err));




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
