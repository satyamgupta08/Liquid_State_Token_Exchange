
import {  getOrCreateAssociatedTokenAccount, mintTo, TOKEN_2022_PROGRAM_ID } from "@solana/spl-token"
import { Connection, Keypair, PublicKey } from "@solana/web3.js"
import bs58 from 'bs58'

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
  const lstValue = 1 + (0.00000001* daysPassed);
  const solanaEquivalent = lstAmount * lstValue;
  return solanaEquivalent;
}

function getLSTFromSolana(solanaAmount) {
  const daysPassed = getDaysSince();
  const lstValue = 1 + (0.00000001 * daysPassed);
  const lstEquivalent = solanaAmount / lstValue;
  return lstEquivalent;
}


 
const connection=new Connection("https://api.devnet.solana.com")


export const mintToken=async(fromAddress,amount)=>{

  console.log("mintiiiiiiii")
  const payer=  Keypair.fromSecretKey(bs58.decode(process.env.PRIVATE_KEY  ))


console.log(payer.publicKey)

const dest=new PublicKey(fromAddress);
const mintAdress=new PublicKey("926TKECn5TFmncbYwjNbKtMcbQPYXn7foBbw147oemBj")



let x = getLSTFromSolana(0.95*amount)
 
// console.log(Date.now())

// console.log("hiii ",x)
x= Math.floor(x)
console.log("hiii  ",x)
 
// console.log(x)

// return

const destPDA=await getOrCreateAssociatedTokenAccount(
   connection,
  payer,
  mintAdress,
  dest,
  true,
  "confirmed",
  undefined,
  TOKEN_2022_PROGRAM_ID
)
console.log("PDA = "+destPDA.address)
// amount=getMintAmount(amount)



  await mintTo(connection,payer,mintAdress,destPDA.address,payer,x,[],{
    skipPreflight: false,               
    commitment: "finalized",          
    preflightCommitment: "finalized",   
    maxRetries: 1,            
    minContextSlot: undefined           
  },TOKEN_2022_PROGRAM_ID)
  .then((res)=>{
    console.log("TRANSXN DONE + " +res)
    console.log("fff")
  })
.catch((e)=>{
  console.log(e)
  console.log("Transaxn cancelled")
})

//  console.log(pp)
}