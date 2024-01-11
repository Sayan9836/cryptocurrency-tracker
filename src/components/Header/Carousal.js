import styled from '@emotion/styled';
import { Typography } from '@mui/material';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import AliceCarousel from 'react-alice-carousel';
import 'react-alice-carousel/lib/alice-carousel.css';
import { Link } from 'react-router-dom';
import { TrendingCoin } from '../../config/api';
import { ContextState } from '../../contexts/CryptoContext';

const Carousel = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    width: '80vw',
    padding: '2rem',
    background: 'transparent',
    position: 'absolute',
    bottom: '2rem'
}))

const CarouselItems = styled('div')(({ theme }) => ({
    display: 'flex',
    flexDirection: 'column',
    padding: '1rem',
    alignItems: 'center',
    color: 'white',
    listStyle: 'none',

}))

export function numberWithCommas(x) {
    return x?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

export const TOUPPERCASE=(x)=>{
    return x.toUpperCase();
}

export const Carousal = () => {  
    const [trending, setTrending] = useState([]);
    const { currency, symbol } = ContextState();

    const fetchTrendingCoins = async () => {
        const { data } = await axios.get(TrendingCoin(currency))
        setTrending(data)
    }
    useEffect(() => {
        fetchTrendingCoins();
    }, [currency])

    const items = trending?.map((coin) => {
        let profit = coin?.price_change_percentage_24h;
        return (
            <CarouselItems>
                <Link to={`/coin/${coin.id}`}>
                    <img src={coin?.image} alt={coin?.name} height='80' style={{ marginBottom: '1rem' }} />
                    <Typography sx={{textDecoration:'none',color:'white'}}>{TOUPPERCASE(coin?.symbol)}&nbsp;&nbsp;<span style={{
                        color:`${profit>0?"green":"red"}`, textDecoration: 'none',
                    }}>{profit>0?"+":''}{profit}</span></Typography>
                    <Typography sx={{textDecoration:'none',marginTop:'0.2rem',color:'white'}}>{symbol}{" "}{numberWithCommas(coin.current_price)}</Typography>
                </Link>
            </CarouselItems>

        )
    });

    const responsive = {
        0: {
            items: 2
        },
        512: {
            items: 4,
        }
    }
    return (
        <Carousel>
            <AliceCarousel
                mouseTracking
                items={items}
                autoPlay
                animationDuration={1500}
                responsive={responsive}
                disableDotsControls
                disableButtonsControls
                autoPlayInterval={1000}
                infinite
            />
        </Carousel>
    );
}        
