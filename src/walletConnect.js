import React from 'react'
import { useWeb3React } from "@web3-react/core";
import { InjectedConnector } from "@web3-react/injected-connector";

const injectedConnector = new InjectedConnector({
  supportedChainIds: [
    97, // BSC Testnet
    1337, // BSC Local
  ],
});

function WalletConnect() {
  const { chainId, account, activate, active } = useWeb3React();

  React.useEffect(() => {
    activate(injectedConnector);
  });

  const onClick = () => {
    activate(injectedConnector);
  };

  if (account) {
    return <span style={{ padding: '0 8px' }}> Account: {formatShortAddress(account)} </span>;
  } else {
    return (
      <a href="#" onClick={onClick} style={{ color: "white", padding: '0 8px' }}>
        Connect
      </a>
    );
  }
}

function formatShortAddress(address) {
  return address.substring(0, 6) + "..." + address.slice(-4);
}

export default WalletConnect;
