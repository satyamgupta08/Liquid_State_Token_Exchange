const express=require('express')
const app=express()
const cors=require('cors')
// const {mintToken} =require('./src/mintToken.jsx')
const {
    Connection,
    Keypair,
    PublicKey,
    clusterApiUrl,
    sendAndConfirmTransaction
  } =require ("@solana/web3.js");
  const {
    createMint,
    getOrCreateAssociatedTokenAccount,
    mintTo,
  } =require ("@solana/spl-token");
const { mintToken } = require('./src/mintToken.jsx');
const { burn_And_Send_Native_Token } = require('./src/burn_And_Send_Native_Token.jsx');
const { getSplTokenBalances, getMintAmount, getNativeSolAmount } = require('./src/utils.js');
 

require('dotenv').config();

app.use(express.json());


app.use(cors({
  origin: "*",
//   origin: FRONTEND_URL,

  optionsSuccessStatus: 200,
  credentials: true 
}));


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


 





app.post('/getPSOL',async(req,res)=>{
  const amount=req.body.sol;
  const psol = getLSTFromSolana(amount);
  return res.send({psol})
  
})


app.post('/getSOL',async(req,res)=>{
  // console.log(req.body)
  const amount=req.body.psol;
  console.log("amount = ",amount)
  const sol = getSolanaFromLST(amount);
  console.log(sol)

  return res.send({sol})

})

app.get('/makeItLive',async(req,res)=>{
  res.send("Chalu hogya server")
})



 
app.post('/helius',async(req,res)=>{



  

  // console.log(req.body[0])
 if(!req.body[0]){
  
return res.send("TRANSACTION SUCCESSFULL !!!!! YAYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYY")
}
if(!req.body[0].description&&req.body[0].description!=""){
   console.log("hooo")
  
return res.send("TRANSACTION SUCCESSFULL !!!!! YAYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYY")
 }


 if(req.body[0].description!=""){
  
  
  const arr=req.body[0].description.split(" ")
  const fromAddress= arr[0]
  const toUserAccount= arr[5]
  let amount= arr[2]
const tokenType=arr[3]
 
amount*=1e9 
// amount=amount/3;

// amount=Math.floor(amount)

// console.log(amount)
// return res.send("jii")

console.log(arr)
    if(amount>0&&toUserAccount=="AkJwrYJtXMyWCFksYr9ist8L2iuUgbZDmu4kpMwf3aLf."&&tokenType=="SOL"){
       await mintToken(fromAddress,amount)
        console.log("mint karo laude")
        
    }
}
    
else {



  console.log("-----------------------------------------------------------------------")

console.log(req.body)

  console.log("-----------------------------------------------------------------------")
// console.log(req.body[0].accountData[1].account)
// console.log(req.body[0].accountData[2].account)

if(!req.body[0]){
  
  return res.send("TRANSACTION SUCCESSFULL !!!!! YAYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYY")
   }
   if(!req.body[0].accountData[0]){
  
    return res.send("TRANSACTION SUCCESSFULL !!!!! YAYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYY")
     }
   if(!req.body[0].accountData[0].account){
  
    return res.send("TRANSACTION SUCCESSFULL !!!!! YAYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYY")
     }
   if(!req.body[0].accountData[2].tokenBalanceChanges[0]){
  
    return res.send("TRANSACTION SUCCESSFULL !!!!! YAYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYY")
     }
   if(!req.body[0].accountData[2].tokenBalanceChanges[0].rawTokenAmount){
  
    return res.send("TRANSACTION SUCCESSFULL !!!!! YAYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYY")
     }

const fromAddress= req.body[0].accountData[0].account
const toUserAccount= req.body[0].accountData[1].account
const amount= req.body[0].accountData[1].tokenBalanceChanges[0].rawTokenAmount.tokenAmount
const tokenType= req.body[0].accountData[1].tokenBalanceChanges[0].mint

console.log(fromAddress)
console.log(toUserAccount)
console.log(amount)
console.log(tokenType)

    if(tokenType=="926TKECn5TFmncbYwjNbKtMcbQPYXn7foBbw147oemBj"&&toUserAccount=="AX9rgeYTNB3wCTNEGr8YyfcTRptqnFozkyumuJhfNMWp")
    {
    console.log("burnnn")
     await burn_And_Send_Native_Token(fromAddress,amount)
      // console.log("burn and send bhadu")
    
    }  
    



}

return res.send("TRANSACTION SUCCESSFULL !!!!! YAYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYY")
})
 
//-------------server started---------------------

app.listen(3000,()=>{
console.log(`server started at port 3000`)
})
