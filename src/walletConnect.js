import { useWeb3React } from '@web3-react/core'
import { InjectedConnector } from '@web3-react/injected-connector'

const injectedConnector = new InjectedConnector({
  supportedChainIds: [
    97, // BSC Testnet
  ],
})

function WalletConnect() {
  const { chainId, account, activate, active } = useWeb3React()

  const onClick = () => {
    activate(injectedConnector)
  }

  if (account) {
    return <span> Account: {formatShortAddress(account)} </span>
  } else {
    return <a href="#" onClick={onClick}>Connect</a>
  }
}

function formatShortAddress(address) {
  return address.substring(0, 6) + '...' + address.slice(-4);
}

export default WalletConnect