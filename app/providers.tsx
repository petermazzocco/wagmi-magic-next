"use client";

import { useState, useEffect } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { createConfig, http, WagmiProvider } from "wagmi";
import { bsc } from "wagmi/chains";
import { dedicatedWalletConnector } from "@magiclabs/wagmi-connector";
// tanstack query
export const queryClient = new QueryClient();

// PASS ALL PROVIDERS HERE
export default function Providers({ children }: { children: React.ReactNode }) {
  // Wagmi Config
  const config = createConfig({
    chains: [bsc],
    connectors: [
      // Magic wallet connector
      dedicatedWalletConnector({
        chains: [bsc],
        options: {
          apiKey: process.env.NEXT_PUBLIC_MAGIC_API_KEY as string,
          isDarkMode: true,
          networks: [{ chainId: bsc.id, rpcUrl: bsc.rpcUrls.default.http[0] }],
          oauthOptions: {
            providers: ["google"],
            callbackUrl: "http://localhost:3000",
          },
          magicSdkConfiguration: {
            network: {
              rpcUrl: bsc.rpcUrls.default.http[0],
              chainId: bsc.id,
            },
          },
        },
      }),
    ],
    transports: {
      [bsc.id]: http(bsc.rpcUrls.default.http[0]),
    },
  });

  // fix hydration errors
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  return (
    isMounted && (
      <WagmiProvider config={config}>
        <QueryClientProvider client={queryClient}>
          {children}
        </QueryClientProvider>
      </WagmiProvider>
    )
  );
}
