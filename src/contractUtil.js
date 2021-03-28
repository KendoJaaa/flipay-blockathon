import { ethers } from 'ethers'

const contractAddresses = {
  // PIKA: '0x1C76e0FC510c33c2804f4362fa9197AEeADc9fF2', // testnet
  // PIKA: '0x39F5839d4E20d252f90d20FB7f8228372a26601c', // local
  FUNDTOKEN: '0xF6E8fef041b45cFC625EE6fE92409cB7Ae94bE98', // local 2

  WBTC: '0x6F065a63600f6c7A9eF121993B0151b89EFA795E',
  WETH: '0x2170Ed0880ac9A755fd29B2688956BD959F933F8',
  WBNB: '0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c',
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

  const minAllowance = '0x100000000000000000000';
  const allowance = await bep20WithSigner.allowance(contractAddress, addressSpender)

  if (allowance.lt(minAllowance)) {
    console.log('allowance not enough, getting approval')
    const tx = await bep20WithSigner.approve(addressSpender, minAllowance)
    console.log('approve: ', tx)
  } else {
    console.log('allowance enough, skipped approval')
  }
}

export default {
  contractAddresses,
  getWBNBContractWithSigner,
  getBep20ContractWithSigner,
  tryApproveBep20Token,
}