import { useState, useEffect, useCallback } from "react";
import styled from "styled-components";
import { Heading, Button, DataTable, Text, Image } from "grommet";
import Bitcoin from "./img/Bitcoin.png";
import Ethereum from "./img/Ethereum.png";
import Cake from "./img/Cake.png";
import graph from "./img/graph.png";
import pie from "./img/pie.png";
import TradeModal from "./TradeModal";

import { useWeb3React } from '@web3-react/core'
import { ethers } from 'ethers'
import contractUtil from './contractUtil'


const kak = {
  Bitcoin: Bitcoin,
  Ethereum: Ethereum,
  Cake: Cake,
};

const Page = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  margin: 50px;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
`;

const Body = styled.div``;

const StyledButton = styled(Button)`
  margin-left: 20px;
`;

function Fund() {
  const [show, setShow] = useState();
  const [buyOrSell, setBuyOrSell] = useState();
  const [giveValue, setGiveValue] = useState("");
  const [tokenOwned, setTokenOwned] = useState(0)
  const { account, library } = useWeb3React()

  const updateBalance = async () => {
    if (!account || !library) {
      return
    }
    const contract = contractUtil.getFundTokenContractWithSigner(library)
    const r = await contract.balanceOf(account)
    console.log(r)
    setTokenOwned(parseFloat(ethers.utils.formatEther(r)).toFixed(3))
  }

  useEffect(async () => {
    updateBalance()
  }, [])

  const setShowBuy = useCallback(() => {
    setShow(true);
    setBuyOrSell("buy");
  }, [setShow, setBuyOrSell]);
  const setShowSell = useCallback(() => {
    setShow(true);
    setBuyOrSell("sell");
  }, [setShow, setBuyOrSell]);
  return (
    <Page>
      <Body>
        <Header>
          <Heading level={2}>Growth Fund</Heading>
          <div>
            <StyledButton
              primary
              label="Buy"
              onClick={setShowBuy}
              style={{ width: "150px" }}
            />
            <StyledButton label="Sell"
              onClick={setShowSell} style={{ width: "150px" }} />
          </div>
        </Header>
        <div style={{ display: "flex", justifyContent: 'space-between' }}>
          <div style={{ display: 'flex' }}>
            <div>
              Current Price
            <Heading style={{ marginTop: "10px", marginBottom: "10px" }}>
                $108.81
            </Heading>
            </div>
            <div style={{ marginLeft: "50px" }}>
              APY
            <Heading
                level={2}
                style={{
                  marginTop: "10px",
                  marginBottom: "10px",
                  marginTop: "10px",
                }}
              >
                150%
            </Heading>
            </div>
          </div>
          <div style={{ padding: '0 16px' }}>
            <div style={{ textAlign: 'right' }}>You own:</div>
            <Heading
              level={2}
              style={{
                marginTop: "10px",
                marginBottom: "10px",
                marginTop: "10px",
                textAlign: 'right',
              }}
            >
              {tokenOwned}
            </Heading> Growth Fund Token
          </div>
        </div>
        <Image src={graph} width={1000} style={{ marginTop: "20px" }} />
        <Heading level={2}>Fund Description</Heading>
        High Growth cryptocurrencies with good fundamental selected from Top 100
        cyptocurrencies by market cap
        <div
          style={{
            display: "flex",
            marginTop: "50px",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "flex-start",
              flexDirection: "column",
            }}
          >
            <Heading level={2}>Asset Allocation</Heading>
            <DataTable
              columns={[
                {
                  property: "asset",
                  header: <Text>Asset</Text>,
                  render: (data) => {
                    return (
                      <div style={{ display: "flex", alignItems: "Cente" }}>
                        {data.asset}
                        <img
                          style={{ marginLeft: "5px" }}
                          src={kak[data.asset]}
                          width={20}
                          height={20}
                        />
                      </div>
                    );
                  },
                },
                {
                  property: "apy",
                  header: <Text>APY</Text>,
                },
                {
                  property: "farm",
                  header: <Text>Farm</Text>,
                },
                {
                  property: "allocation",
                  header: <Text>Allocation</Text>,
                  render: (value) => {
                    return <div>{value.allocation} %</div>;
                  },
                },
              ]}
              data={[
                {
                  asset: "Bitcoin",
                  apy: "150%",
                  farm: "Venus",
                  allocation: 60.4,
                },
                {
                  asset: "Ethereum",
                  apy: "160%",
                  farm: "Autofarm",
                  allocation: 19.6,
                },
                {
                  asset: "Cake",
                  apy: "100%",
                  farm: "Autofarm",
                  allocation: 10.0,
                },
              ]}
            />
          </div>
          <Image
            src={pie}
            width={275}
            height={200}
            style={{ marginTop: "20px" }}
          />
        </div>
      </Body>
      {show && (
        <TradeModal
          onClose={() => setShow(false)}
          buyOrSell={buyOrSell}
          giveValue={giveValue}
          setGiveValue={setGiveValue}
          updateBalance={updateBalance}
        />
      )}
    </Page>
  );
}

export default Fund;
