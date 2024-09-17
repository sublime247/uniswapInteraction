import { ethers } from "hardhat";
const helpers = require("@nomicfoundation/hardhat-network-helpers");
async function main() {

    /*---------------swapExactTokensForTokens-----------------*/
    

    const ROUTER_ADDRESS = "0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D"
    const USDC = "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48";
    const DAI = "0x6B175474E89094C44Da98b954EedeAC495271d0F";
    const TOKEN_HOLDER = "0xf584F8728B874a6a5c7A8d4d387C9aae9172D621";

    await helpers.impersonateAccount(TOKEN_HOLDER);

    const impersonatedSigner = await ethers.getSigner(TOKEN_HOLDER);
    const DESIRED_USDC = ethers.parseUnits("100", 6);
    
    const DESIRED_DAI = ethers.parseUnits("10", 18);


    const USDC_Contract = await ethers.getContractAt("IERC20", USDC, impersonatedSigner);
    const DAI_Contract = await ethers.getContractAt("IERC20", DAI, impersonatedSigner);
    const ROUTER_CONTRACT = await ethers.getContractAt("IUniswapV2Router", ROUTER_ADDRESS, impersonatedSigner);

    await USDC_Contract.approve(ROUTER_CONTRACT, DESIRED_USDC);
    await DAI_Contract.approve(ROUTER_CONTRACT, DESIRED_DAI);

    


    const usdcBal =await  USDC_Contract.balanceOf(impersonatedSigner.address);
    const DAIBal = await DAI_Contract.balanceOf(impersonatedSigner.address);

    const deadline = Math.floor(Date.now() / 1000) + (60 * 10);
    console.log("=========================================================");
    console.log("impersonated signer usdc bal before swap::", Number(usdcBal));

    console.log("impersonated signer DAI bal before swap::", Number(DAIBal));

    console.log("=========================================================");
    await ROUTER_CONTRACT.swapExactTokensForTokens(
        DESIRED_USDC,
        DESIRED_DAI,
        [USDC, DAI],
        impersonatedSigner.address,
        deadline
    )
    const usdcBalAfter = await USDC_Contract.balanceOf(impersonatedSigner.address);

    const daiBalAfter = await DAI_Contract.balanceOf(impersonatedSigner.address);
    console.log("swapExactTokensForTokens")
    console.log("=========================================================");
    
    console.log("impersonated signer usdc bal after swap::", Number(usdcBalAfter));
    console.log("impersonated signer DAI bal after swap::", Number(daiBalAfter));

    console.log("=========================================================");

   




    
}
main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
