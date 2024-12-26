import React, { useEffect, useState } from 'react'
import {
    WalletModalProvider,
    WalletDisconnectButton,
    WalletMultiButton,
} from "@solana/wallet-adapter-react-ui";
import "@solana/wallet-adapter-react-ui/styles.css";
import { useConnection, useWallet } from '@solana/wallet-adapter-react';
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify';
import { Connection, PublicKey, SystemProgram, Transaction } from '@solana/web3.js';
import { ASSOCIATED_TOKEN_PROGRAM_ID, createTransferInstruction, getAssociatedTokenAddress, TOKEN_2022_PROGRAM_ID } from '@solana/spl-token';

// import { Token } from '@solana/spl-token';
import { createMemoInstruction } from '@solana/spl-memo';

export const Solana = () => {
  
  const [server,setServer]=useState(0)

  const [isLoading1,setIsloading1]=useState(0)
  const [isLoading2,setIsloading2]=useState(0)
   

    const {connection}=useConnection()
    const wallet=useWallet()
    const [sol, setSol] = useState("");  
    const [psol, setPsol] = useState(""); 
    const [psolData, setPsolData] = useState(null);
    const [solData, setSolData] = useState(null);
   
    const [debouncedSol, setDebouncedSol] = useState(sol);
    const [debouncedPsol, setDebouncedPsol] = useState(psol);
  
     
    useEffect(() => {
      const timeoutId = setTimeout(() => {
        setDebouncedSol(sol);  
      }, 500);  
  
      return () => clearTimeout(timeoutId);  
    }, [sol]);
  
   
    useEffect(() => {
      const timeoutId = setTimeout(() => {
        setDebouncedPsol(psol); 
      }, 500);  
  
      return () => clearTimeout(timeoutId);  
    }, [psol]);
  
    
    useEffect(() => {
      if (debouncedSol) {

        let tx=debouncedSol;
        tx=0.95*tx


        axios
          .post(import.meta.env.VITE_API_KEY+"/getPSOL", { sol: tx })
          .then((response) => {
            console.log(response);
            setPsolData(response.data.psol);
          })
          .catch((error) => {
            console.error(error);
          });
      }
    }, [debouncedSol]);
   
    useEffect(() => {
      if (debouncedPsol) {

        let tx=debouncedPsol;
         

        axios
          .post(import.meta.env.VITE_API_KEY+"/getSOL", { psol: tx })
          .then((response) => {
            console.log(response);
            setSolData(response.data.sol);
          })
          .catch((error) => {
            console.error(error);
          });
      }
    }, [debouncedPsol]);









    async function RequestSol() {

      
      
      
      console.log(wallet)
      
      if(!wallet.connected){
        
        
        toast.error("Please Connect Your Wallet")
        return;
      }
      if(isLoading1){
        toast.error("Please Wait")
        return
      }
      setIsloading1(1);


        let amt=document.getElementById("sol").value
 

        const transaction=new Transaction();

        transaction.add(
          SystemProgram.transfer({
             
                fromPubkey: wallet.publicKey,
                
                toPubkey: new PublicKey("AkJwrYJtXMyWCFksYr9ist8L2iuUgbZDmu4kpMwf3aLf"),
                
                lamports: (amt*1e9),
          })
        )

        await wallet.sendTransaction(transaction,connection)
        .then(()=>{

toast.success("Transaction successfull !!!!!")
        })
//----------------
 
setIsloading1(0)

document.getElementById("sol").value=0


    }

async function RequestPSol() {


  if(!wallet.connected){


    toast.error("Please Connect Your Wallet")
                return;
              }


              if(isLoading2){
                toast.error("Please Wait !!!!")
              }

              setIsloading2(1)
              // return;
    
let amt=document.getElementById("psol").value

          const userATA=await  getAssociatedTokenAddress(
            new PublicKey("926TKECn5TFmncbYwjNbKtMcbQPYXn7foBbw147oemBj"),
            wallet.publicKey,
            false,
            TOKEN_2022_PROGRAM_ID,
            ASSOCIATED_TOKEN_PROGRAM_ID
            

          )


          const myATA=await  getAssociatedTokenAddress(
            new PublicKey("926TKECn5TFmncbYwjNbKtMcbQPYXn7foBbw147oemBj"),
           new PublicKey("AkJwrYJtXMyWCFksYr9ist8L2iuUgbZDmu4kpMwf3aLf"),
            false,
            TOKEN_2022_PROGRAM_ID,
            ASSOCIATED_TOKEN_PROGRAM_ID
            

          )

          console.log(myATA)

          const transaction=new Transaction();
          // const token = (connection, tokenMintAddress, TOKEN_PROGRAM_ID, wallet);
 
          transaction.add(
            createTransferInstruction(
              userATA,
              myATA,
              wallet.publicKey,
              amt * 1e9 ,// SPL tokens are usually divisible by 10^9
              [],
                TOKEN_2022_PROGRAM_ID,
            )
        );

       
        const recentBlockhash = await connection.getLatestBlockhash();
        transaction.recentBlockhash = recentBlockhash.blockhash;
        transaction.feePayer = wallet.publicKey;

        // const keyp   
        // Send the transaction
         await wallet.sendTransaction(transaction, connection)
         .then(()=>{
          toast.success("Transaction Successfull !!!!")
         })
       
 
      document.getElementById("psol").value=0;
      setIsloading2(0)


//  if()
// MemoProgram



}
    




useEffect(() => {
  
  const checkServerStatus = () => {
    axios.get(import.meta.env.VITE_API_KEY+"/makeItLive")
    .then((res) => {
        // console.log( import.meta.env.VITE_API_KEY+"/makeItLive")
        if (res.data === "Chalu hogya server") {
          setServer(1);
           
          
        }
        else{

          setServer(0)
        }
        console.log(res)
      })
      .catch((error) => {
        setServer(0)
        console.error("Error fetching makeItLive:", error);
      });
  };
 
  const intervalId = setInterval(checkServerStatus, 5000);

   
  return () => clearInterval(intervalId);
}, []); 



  return (
    <div className="bg-gradient-to-br from-blue-600 to-purple-700 min-h-screen flex flex-col justify-center items-center text-white p-6">
    <div className="text-4xl font-bold mb-6">
      Welcome To <span className="text-yellow-400">P_SOL</span>, Stake Your Solana
    </div>
    <div className="text-lg mb-8 font-medium">
      Make sure you are connected to <span className="text-yellow-400">Devnet Mode</span>
    </div>

    <div className="flex flex-row space-x-14">
      {/* SOL Staking Section */}
      <div className="w-full max-w-md">
        <input
          type="text"
          placeholder="Enter SOL Amount"
          className={`w-full mb-4 p-4 rounded-lg border-2 border-yellow-400 bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-yellow-400 ${
            !server ? 'opacity-50 cursor-not-allowed' : ''
          }`}
          id="sol"
          value={sol}
          onChange={(e) => setSol(e.target.value)} // Update SOL state on input change
          disabled={!server} // Disable the input if server is false
        />
        <input
          type="text"
          placeholder="You Will get"
          className={`w-full mb-4 p-4 rounded-lg border-2 border-yellow-400 bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-yellow-400 ${
            !server ? 'opacity-50 cursor-not-allowed' : ''
          }`}
          value={psolData || ""} // Show PSOL data after debounce
          readOnly
          disabled={!server} // Disable the input if server is false
        />
        <button
          className={`w-full bg-yellow-400 text-gray-900 font-semibold py-4 rounded-lg mt-6 transition-transform transform hover:scale-105 hover:bg-yellow-500 ${
            !server ? 'opacity-50 cursor-not-allowed' : ''
          }`}
          onClick={RequestSol}
          disabled={!server} // Disable the button if server is false
        >
         {
          server ? (isLoading1 ? "Please Wait ...":"Stake SOL") : "Connecting To Server, Please Wait ..."
         }
        </button>
      </div>

      {/* -------------------------------------------------------- */}

      {/* PSOL Unstaking Section */}
      <div className="w-full max-w-md">
        <input
          type="text"
          placeholder="Enter P-SOL Amount"
          className={`w-full mb-4 p-4 rounded-lg border-2 border-yellow-400 bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-yellow-400 ${
            !server ? 'opacity-50 cursor-not-allowed' : ''
          }`}
          id="psol"
          value={psol}
          onChange={(e) => setPsol(e.target.value)} // Update PSOL state on input change
          disabled={!server} // Disable the input if server is false
        />
        <input
          type="text"
          placeholder="You Will Get "
          className={`w-full mb-4 p-4 rounded-lg border-2 border-yellow-400 bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-yellow-400 ${
            !server ? 'opacity-50 cursor-not-allowed' : ''
          }`}
          value={solData || ""} // Show SOL data after debounce
          readOnly
          disabled={!server} // Disable the input if server is false
        />
        <button
          onClick={RequestPSol}
          className={`w-full bg-yellow-400 text-gray-900 font-semibold py-4 rounded-lg mt-6 transition-transform transform hover:scale-105 hover:bg-yellow-500 ${
            !server ? 'opacity-50 cursor-not-allowed' : ''
          }`}
          disabled={!server} // Disable the button if server is false
        >
        {
          server ? (isLoading2 ? "Please Wait ...":"Unstake PSOL") : "Connecting To Server, Please Wait ..."
        }
        </button>
      </div>
    </div>
    <ToastContainer />
  </div>

  )
}
