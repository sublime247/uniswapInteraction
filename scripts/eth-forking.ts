
import { ethers } from "hardhat";
const helpers = require("@nomicfoundation/hardhat-network-helpers");


/*---------------swapTokensForExactETH-----------------*/

async function main() {
	const ROUTER_ADDRESS = "0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D";
	const USDC = "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48";
	const WETH = "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2";

	const TOKEN_HOLDER = "0xf584F8728B874a6a5c7A8d4d387C9aae9172D621";

	await helpers.impersonateAccount(TOKEN_HOLDER);
	const impersonatedSigner = await ethers.getSigner(TOKEN_HOLDER);

	const amountOut = ethers.parseUnits("0.1", 18);
	const amountInMax = ethers.parseUnits("500", 6);

	const USDC_Contract = await ethers.getContractAt(
		"IERC20",
		USDC,
		impersonatedSigner
	);

	const WETH_Contract = await ethers.getContractAt(
		"IERC20",
		WETH,
		impersonatedSigner
	);

	const ROUTER_CONTRACT = await ethers.getContractAt(
		"IUniswapV2Router",
		ROUTER_ADDRESS,
		impersonatedSigner
	);
  await USDC_Contract.approve(ROUTER_ADDRESS, amountInMax);
	

	const deadline2 = Math.floor(Date.now() / 1000) + 60 * 10;


	const ETHERSBALANCEBEFORESWAP = await ethers.provider.getBalance(
		TOKEN_HOLDER
	);
    console.log("swapTokenForExactEth")
    console.log("=========================================================");
    console.log("impersonated signer Ether bal before swap::", Number(ETHERSBALANCEBEFORESWAP));

    console.log("=========================================================");
 await ROUTER_CONTRACT.swapTokensForExactETH(
		amountOut,
		amountInMax,
		[USDC, WETH],
		TOKEN_HOLDER,
		deadline2
	);
	const ETHERSBALANCEAFTERSWAP = await ethers.provider.getBalance(TOKEN_HOLDER);
    console.log("swapTokenForExactEth")
    console.log("=========================================================");
    console.log("impersonated signer Ether bal after swap::", Number(ETHERSBALANCEAFTERSWAP));
    console.log("=========================================================");

}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
	console.error(error);
	process.exitCode = 1;
});