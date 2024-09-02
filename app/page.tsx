"use client";

import { useConnect, useDisconnect, useAccount } from "wagmi";
export default function Home() {
  const { connect, connectors, isPending, isIdle } = useConnect();
  const { disconnect } = useDisconnect();
  const { address, isConnected } = useAccount();
  return (
    <main className="flex flex-col items-center justify-center h-screen">
      <button
        onClick={() => connect({ connector: connectors[0] })}
        className="bg-blue-500 text-white p-2 rounded-md"
        disabled={isPending || isConnected}
      >
        {isPending ? "Loading..." : isIdle ? "Connect" : "Connecting..."}
      </button>
      {address && (
        <div className="flex flex-col items-center justify-center">
          Connected to {address}
          <button
            onClick={() => disconnect()}
            className="bg-red-500 text-white p-2 rounded-md"
          >
            Disconnect
          </button>
        </div>
      )}
      {isConnected ? (
        <div>Yes, we are connected</div>
      ) : (
        <div>No, we are not connected</div>
      )}
    </main>
  );
}
