import { MUDChain, latticeTestnet } from "@latticexyz/common/chains";
import { foundry } from "@wagmi/chains";

const zkEVM = {
  name: "zkEVM Testnet",
  id: 13403,
  network: "zkevm-testnet",
  nativeCurrency: { decimals: 18, name: "Immutable", symbol: "IMX" },
  rpcUrls: {
    default: {
      http: ["https://zkevm-rpc.dev.x.immutable.com"],
    },
    public: {
      http: ["https://zkevm-rpc.dev.x.immutable.com"],
    },
  },
} as const satisfies MUDChain;


// If you are deploying to chains other than anvil or Lattice testnet, add them here
export const supportedChains: MUDChain[] = [foundry, latticeTestnet, zkEVM];
