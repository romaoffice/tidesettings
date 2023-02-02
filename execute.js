const Web3 = require("web3");
const ethers = require("ethers");
const config = require("./config/config.json")
const ERC20_ABI = require("./abi/erc20.json");
const TOKENDEPLOYER_ABI = require("./abi/tidetokendeployer.json");
const STAKE_ABI = require("./abi/stake.json");
const commandLineArgs = require('command-line-args')
const fs = require("fs")

const {renew_quote} = require("./manage_quote")
let web3test,web3main;

function beforeRunnung(mainnet){
	executor = process.env.EXECUTOR
	if(executor==undefined) {
		console.log("Please set EXECUTOR for private key.");
		return false
	}

	web3Test = new Web3(new Web3.providers.HttpProvider(config.testnetrpc));
	web3Main = new Web3(new Web3.providers.HttpProvider(config.mainnetrpc));
	if(mainnet){
		
		account = web3Main.eth.accounts.privateKeyToAccount('0x' + executor);
		web3Main.eth.accounts.wallet.add(account);
		web3Main.eth.defaultAccount = account.address;

	}else{
		
		account = web3Test.eth.accounts.privateKeyToAccount('0x' + executor);
		web3Test.eth.accounts.wallet.add(account);
		web3Test.eth.defaultAccount = account.address;

	}
	
	return true;

}
function log(memo){
	console.log(memo)
}

async function change_lendingfee(mainnet,web3Main,web3Test){

}
async function sync_pairs(mainnet,web3Main,web3Test){

}
async function main(){
	

	const optionDefinitions = [
	  { name: 'mainnet', alias: 'm', type: Boolean, defaultOption: false  },
	  { name: 'cmd', type: String},
	]
	const options = commandLineArgs(optionDefinitions)

	log(`Process with ${options.mainnet?"mainnet":"testnet"}.`);

	const rtInit = beforeRunnung(options.mainnet);
	if(rtInit){
		if(options.cmd=="renew_quote"){
			await renew_quote(options.mainnet,web3Main,web3Test);
		}else if(options.cmd=="lendingfee"){
			await change_lendingfee(options.mainnet,web3Main,web3Test);
		}else if(options.cmd=="sync_pairs"){
			await sync_pairs(options.mainnet,web3Main,web3Test);
		}
	
	}else{
		console.log("Failed to init");
	}

	console.log("Completed process")
}

main();