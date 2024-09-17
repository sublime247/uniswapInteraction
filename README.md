## UniswapV2Rouer interaction
<!-- list of steps -->
1. Import the IUniswapV2Router02 interface from the UniswapV2Router02.sol file.
2. Create a new instance of the IUniswapV2Router02 interface.
3. Call the swapExactTokensForETH function on the IUniswapV2Router02 instance.
4. Pass the following parameters to the swapExactTokensForETH function:
    - The amount of tokens to swap.
    - The minimum amount of ETH to receive.
    - An array of token addresses that represent the path to the destination token.
    - The address of the recipient of the ETH.
    - The deadline for the transaction.
5. Wait for the transaction to be confirmed.
6. Check the transaction status to ensure that the swap was successful.

## for the script
<!-- list of steps -->
1. Get the contract address of the UniswapV2Router02 contract.
2. Get the contract address of the token you want to swap.
3. Get the address of the impersonated signer.


## To run the script
<!-- list of steps -->
# For swapExactTokensForTokens run the script below:
   Run the script with the following command:
        ```
        npx hardhat run scripts/eths-forking.ts
        ```
        
# For swapExactTokensForETH run the script below:
    Run the script with the following command:
          ```
          npx hardhat run scripts/token-forking.ts
          ```