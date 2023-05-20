import { useEffect, useState } from "react";
import ContextProvider from "src/utils/ContextProvider";
import GlobalStyles from "@assets/styles/GlobalStyles";
import { RecoilRoot } from "recoil";
import { chain, WagmiConfig, createClient, configureChains } from "wagmi";
// import { alchemyProvider } from "wagmi/providers/alchemy";
import { publicProvider } from "wagmi/providers/public";
import { CoinbaseWalletConnector } from "wagmi/connectors/coinbaseWallet";
import { InjectedConnector } from "wagmi/connectors/injected";
import { MetaMaskConnector } from "wagmi/connectors/metaMask";
import { WalletConnectConnector } from "wagmi/connectors/walletConnect";
import { QueryClient, QueryClientProvider } from "react-query";

const queryClient = new QueryClient();

const { chains, provider, webSocketProvider } = configureChains(
  [chain.mainnet, chain.polygon],
  [publicProvider()]
);

// Set up wagmi config
const config = createClient({
  autoConnect: true,
  connectors: [
    new MetaMaskConnector({ chains }),
    new CoinbaseWalletConnector({
      chains,
      options: {
        appName: "wagmi",
      },
    }),
    new WalletConnectConnector({
      chains,
      options: {
        qrcode: true,
      },
    }),
    new InjectedConnector({
      chains,
      options: {
        name: "Injected",
        shimDisconnect: true,
      },
    }),
  ],
  provider,
  webSocketProvider,
});

const App = ({ Component, pageProps }) => {
  const [showChild, setShowChild] = useState(false);

  useEffect(() => {
    setShowChild(true);
  }, []);

  if (!showChild) {
    return null;
  }

  return (
    <RecoilRoot>
      <WagmiConfig client={config}>
        <QueryClientProvider client={queryClient}>
          <ContextProvider>
            <GlobalStyles />
            <Component {...pageProps} />
          </ContextProvider>
        </QueryClientProvider>
      </WagmiConfig>
    </RecoilRoot>
  );
};

export default App;
