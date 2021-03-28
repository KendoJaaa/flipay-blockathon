import { ethers } from 'ethers'

const contractAddresses = {
  // PIKA: '0x1C76e0FC510c33c2804f4362fa9197AEeADc9fF2', // testnet
  // PIKA: '0x39F5839d4E20d252f90d20FB7f8228372a26601c', // local
  FUNDTOKEN: '0xD68439519E66Ef616c2Ca67AB700E52d06EE9e33', // local 2

  WBTC: '0x6F065a63600f6c7A9eF121993B0151b89EFA795E',
  WETH: '0x2170Ed0880ac9A755fd29B2688956BD959F933F8',
  WBNB: '0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c',
  BUSD: '0xe9e7cea3dedca5984780bafc599bd69add087d56',
  CAKE: '0x05fF2B0DB69458A0750badebc4f9e13aDd608C7F',
}

const contractAbis = {
  PIKA: './abi/bep20abi.json',
  FUNDTOKEN: './abi/FundToken.abi.json',
  WBNB: './abi/WBNB.abi.json',
}

export function getWBNBContractWithSigner(library, symbol) {
  const contractAddress = contractAddresses[symbol]
  const abi = require('./abi/WBNB.abi.json')
  const contract = new ethers.Contract(contractAddress, abi, library);
  const contractWithSigner = contract.connect(library.getSigner());

  return contractWithSigner
}

export function getFundTokenContractWithSigner(library) {
  const contractAddress = contractAddresses['FUNDTOKEN']
  const fundTokenAbi = require('./abi/FundToken.abi.json')
  const fundTokenContract = new ethers.Contract(contractAddress, fundTokenAbi, library);
  const fundTokenWithSigner = fundTokenContract.connect(library.getSigner());

  return fundTokenWithSigner
}

export function getBep20ContractWithSigner(library, symbol) {
  const contractAddress = contractAddresses[symbol]
  const bep20Abi = require('./abi/bep20abi.json')
  const bep20Contract = new ethers.Contract(contractAddress, bep20Abi, library);
  const bep20WithSigner = bep20Contract.connect(library.getSigner());

  return bep20WithSigner
}

export async function tryApproveBep20Token(library, symbol, addressSpender) {
  const contractAddress = contractAddresses[symbol]
  const bep20Abi = require('./abi/bep20abi.json')
  const bep20Contract = new ethers.Contract(contractAddress, bep20Abi, library);
  const bep20WithSigner = bep20Contract.connect(library.getSigner());

  const minAllowance = '20000000000000000000000';
  const allowance = await bep20WithSigner.allowance(contractAddress, addressSpender)

  if (allowance.lt(minAllowance)) {
    console.log('allowance not enough, getting approval')
    const tx = await bep20WithSigner.approve(addressSpender, minAllowance)
    await library.waitForTransaction(tx.hash)
    console.log('approved tx: ', tx)
  } else {
    console.log('allowance enough, skipped approval')
  }
}

export default {
  contractAddresses,
  getWBNBContractWithSigner,
  getBep20ContractWithSigner,
  getFundTokenContractWithSigner,
  tryApproveBep20Token,
}