
const {cloneToken} = require("./common.js")
const fs = require("fs")
async function renew_quote(mainnet,web3Main,web3Test){
	
	console.log("Renew quote.");
	
	let tokens_path = `./config/tokens_${mainnet?"mainnet":"testnet"}`
	let rawdata = fs.readFileSync(tokens_path);
	const tokens = JSON.parse(rawdata);

	const tokenAddress = await cloneToken(web3Main,web3Test,tokens.quotetoken.address);
	//setStakeInfo
	//Stake
	//Transfer
}

async function updateLendingFee(mainnet,web3Main,web3Test){
	//update stkae lending fee
}
module.exports ={
	renew_quote
}