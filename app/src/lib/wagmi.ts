import { Chain, configureChains, createClient } from 'wagmi';
import { jsonRpcProvider } from 'wagmi/providers/jsonRpc';
import { MetaMaskConnector } from 'wagmi/connectors/metaMask';
import { WalletConnectConnector } from 'wagmi/connectors/walletConnect';
// import { alchemyProvider } from 'wagmi/providers/alchemy';
// import { publicProvider } from 'wagmi/providers/public';

const celoChain: Chain = {
  id: 42220,
  name: 'Celo',
  network: 'celo',
  nativeCurrency: {
    decimals: 18,
    name: 'Celo',
    symbol: 'CELO',
  },
  rpcUrls: {
    default: 'https://forno.celo.org/',
  },
  blockExplorers: {
    default: { name: 'Celo Explorer', url: 'https://explorer.celo.org/' },
  },
  testnet: false,
};

const { chains, provider, webSocketProvider } = configureChains(
  [celoChain],
  [
    // alchemyProvider({ apiKey: process.env.NEXT_PUBLIC_ALCHEMY_PROVIDER_KEY }),
    // publicProvider(),
    jsonRpcProvider({
      rpc: (chain) => {
        if (chain.id !== celoChain.id) return null;
        return { http: chain.rpcUrls.default };
      },
    }),
  ]
);

export const WagmiClient = createClient({
  autoConnect: true,
  provider,
  webSocketProvider,
  connectors: [
    new MetaMaskConnector({
      chains,
    }),
    new WalletConnectConnector({
      chains,
      options: {
        qrcode: true,
      },
    }),
  ],
});
