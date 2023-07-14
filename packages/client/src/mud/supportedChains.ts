import { MUDChain, latticeTestnet } from "@latticexyz/common/chains";
import { foundry } from "@wagmi/chains";

// If you are deploying to chains other than anvil or Lattice testnet, add them here
const sepolia = {
    name: "Sepolia",
    id: 11155111,
    network: "sepolia",
    nativeCurrency: { decimals: 18, name: "Ether", symbol: "ETH" },
    rpcUrls: {
      default: {
        http: ["https://eth-sepolia.g.alchemy.com/v2/yaWHtnolBT_q8n8h03J4aSBsoGnDfWIv"],
      },
      public: {
        http: ["https://eth-sepolia.g.alchemy.com/v2/yaWHtnolBT_q8n8h03J4aSBsoGnDfWIv"],
      },
    },
  } as const satisfies MUDChain;


export const supportedChains: MUDChain[] = [foundry, latticeTestnet, sepolia];
