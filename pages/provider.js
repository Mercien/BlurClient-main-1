import { Sepolia } from "@thirdweb-dev/chains";
import { ThirdwebProvider } from "@thirdweb-dev/react";

export default function Provider({ children }) {
  return <ThirdwebProvider activeChain={Sepolia}>{children}</ThirdwebProvider>;
}
