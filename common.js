const ERC20_ABI = require("./abi/erc20.json");
const TOKENDEPLOYER_ABI = require("./abi/tidetokendeployer.json");
const address_testnet = require("./config/address_testnet.json")

async function cloneToken(web3main,web3test,mainAddress){
	
	//clone token
	const info = await getTokenInfo(web3main,mainAddress);
	const deployer = new web3test.eth.Contract(TOKENDEPLOYER_ABI,address_testnet.token_deployer);
	const prevCount = await deployer.methods.totalTokens().call();
	const rt = await deployer.methods.deployNewToken(info.erc20,info.symbol,info.name,info._totalSupply,info.decimals);
	const lastCount = await deployer.methods.totalTokens().call();
	const cloneAddress = await deployer.methods.tokenInfo(lastCount-1).call();


	//transfer all to owner
	const cloneToken = new web3test.eth.Contract(ERC20_ABI,cloneAddress);
	await cloneToken.methods.transfer(address_testnet.tokenowner,info._totalSupply);

	console.log(`Cloned token ${cloneAddress}`);
	console.log(info);
	return cloneAddress;

}

async function getTokenInfo(web3main,tokenAddress){
	const erc20 = new web3main.eth.Contract(ERC20_ABI,tokenAddress);
	const symbol = await erc20.methods.symbol().call();
	const name = await erc20.methods.name().call();
	const _totalSupply = await erc20.methods._totalSupply().call();
	const decimals = await erc20.methods.decimals().call();
	return {erc20,symbol,name,_totalSupply,decimals};
}

module.exports = {
	cloneToken
}