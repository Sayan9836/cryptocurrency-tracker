import { Divider, Typography } from '@mui/material';
import axios from 'axios';
import HTMLReactParser from 'html-react-parser';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import CoinInfo from '../components/CoinInfo';
import { numberWithCommas } from '../components/Header/Carousal';
import Navbar from '../components/navbar/Navbar';
import { SingleCoin } from '../config/api';
import { ContextState } from '../contexts/CryptoContext';

import './style.css'

const IndivitualCoinPage = () => {
  const { id } = useParams();
  const [coin, setCoin] = useState();
  const { currency, symbol } = ContextState();
  const fetchSingleCoin = async () => {
    const { data } = await axios.get(SingleCoin(id))
    console.log(data);
    setCoin(data);
    console.log(coin);
  }

  const descShortner = (desc) => {
    return desc.slice(0, 190)
  }

  useEffect(() => {
    fetchSingleCoin();
  }, [])

  return (
    <>
      <Navbar />
      <div className='coin_container' style={{ color: 'white' }}>
        <div className='coin_container_left'>
          <div>
            <img src={coin?.image.large} alt={coin?.symbol} height='200' width='200' />
            <Typography variant='h2'>{coin?.name}</Typography>
            <Typography >{HTMLReactParser(`${coin?.description.en.split(". ")[0]}`)}</Typography>
            <Typography variant='h4' fontWeight={700}>Rank: {coin?.market_cap_rank} </Typography>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <Typography variant='h4' fontWeight={700}>Current Price: </Typography>
              <Typography variant='h5'>{symbol}{" "}{numberWithCommas(coin?.market_data.current_price[currency.toLowerCase()])}</Typography>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <Typography variant='h4' fontWeight={700}>Market Cap: </Typography>
              <Typography variant='h5'>{symbol}{" "}{numberWithCommas(coin?.market_data.market_cap[currency.toLowerCase()].toString().slice(0, -6))}</Typography>
            </div>
          </div>
        </div>
        <Divider sx={{ width: '2px', backgroundColor: 'white', opacity: '0.6', height: '80vh', margin: '1rem 1rem 0 0', }} />
        <CoinInfo coin={coin} id={id} />

      </div>
    </>
  )
}

export default IndivitualCoinPage
