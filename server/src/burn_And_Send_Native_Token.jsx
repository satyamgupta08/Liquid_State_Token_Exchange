import { createBurnInstruction, getOrCreateAssociatedTokenAccount, TOKEN_2022_PROGRAM_ID } from "@solana/spl-token"
import { Connection, Keypair, PublicKey, sendAndConfirmTransaction, SendTransactionError, SystemProgram, Transaction } from "@solana/web3.js"
import bs58 from 'bs58'
// import { getNativeSolAmount } from "./utils.jsx"

 



function getDaysSince() 
{
  
  let startDate=Date.parse("2024-12-20T14:24:51.225Z")
  const currentDate = new Date();
  const timeDiff = currentDate - new Date(startDate);
  const daysDiff = timeDiff / (1000 * 60 * 60 * 24);
  return  (daysDiff);
}

function getSolanaFromLST(lstAmount) {
  const daysPassed = getDaysSince();
  const lstValue = 1 + (0.00000001 * daysPassed);
  const solanaEquivalent = lstAmount * lstValue;
  return solanaEquivalent;
}

function getLSTFromSolana(solanaAmount) {
  const daysPassed = getDaysSince();
  const lstValue = 1 + (0.00000001 * daysPassed);
  const lstEquivalent = solanaAmount / lstValue;
  return lstEquivalent;
}





export const burn_And_Send_Native_Token = async(fromAddress,amount) => {

 
 if(amount<0){
  amount=amount*(-1);
 }

  let x =  getSolanaFromLST(amount)
  
  
  console.log("burn it fukker  "+amount);
  x= Math.floor(x)
  console.log("hhiii "+x);
  // return
    const dest=new PublicKey(fromAddress);
const payer=  Keypair.fromSecretKey(bs58.decode(process.env.PRIVATE_KEY  ))
const mintAdress=new PublicKey("926TKECn5TFmncbYwjNbKtMcbQPYXn7foBbw147oemBj")
// console.log(payer)

const connection=new Connection("https://api.devnet.solana.com")



const payerPDA=await getOrCreateAssociatedTokenAccount(
   connection,
  payer,
  mintAdress,
  payer.publicKey, 
  true,
  "confirmed",
  undefined,
  TOKEN_2022_PROGRAM_ID
) 

const transaction=new Transaction()
.add(
    
    createBurnInstruction( payerPDA.address,mintAdress,payer.publicKey,amount,[],TOKEN_2022_PROGRAM_ID)
     
)
.add(

    // console.log("tmkc11111")
    SystemProgram.transfer(
        {
            
            fromPubkey: payer.publicKey,
            
            toPubkey: dest,
            
            lamports: x,
        }
    )
) 



try {
    await sendAndConfirmTransaction(connection, transaction, [payer]);
} catch (error) {
    if (error instanceof SendTransactionError) {
        const logs = await error.getLogs();
        console.error("Transaction failed with logs:", logs);
    } else {
        console.error("An unexpected error occurred:", error);
    }
}

}
