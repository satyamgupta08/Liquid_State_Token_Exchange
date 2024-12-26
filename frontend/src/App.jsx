 
import {
  ConnectionProvider,
  WalletProvider,
} from "@solana/wallet-adapter-react";
import {
  WalletModalProvider,
  WalletDisconnectButton,
  WalletMultiButton,
} from "@solana/wallet-adapter-react-ui";
import "@solana/wallet-adapter-react-ui/styles.css";
import { Solana } from "./components/Solana.jsx";

function App() {
 

  return (
    <>
      <ConnectionProvider endpoint="https://api.devnet.solana.com">
        <WalletProvider wallets={[]}>
          <WalletModalProvider>
            {/* Wallet buttons at the top-center */}
            <div className="absolute top-0 left-1/2 transform -translate-x-1/2 mt-32 z-10 flex flex-row space-x-4 ">
              <WalletMultiButton className="!bg-blue-500 !text-white !py-2 !px-4 !rounded-md mr-2" />
              <WalletDisconnectButton className="!bg-red-500 !text-white !py-2 !px-4 !rounded-md" />
            </div>

           <Solana/>

           
          </WalletModalProvider>
        </WalletProvider>
      </ConnectionProvider>
    </>
  );
}

export default App;
