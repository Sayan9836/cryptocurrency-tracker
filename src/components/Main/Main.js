// import * as React from 'react';
import React, { useEffect, useState } from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import axios from 'axios';
import { CoinList } from '../../config/api';
import { ContextState } from '../../contexts/CryptoContext';
import { createTheme, Pagination, TextField, ThemeProvider, Typography } from '@mui/material';
import { green } from '@mui/material/colors';
import { Link } from 'react-router-dom';
import { numberWithCommas } from '../Header/Carousal';
import { useNavigate } from 'react-router-dom';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: '#f9a825',
    color: theme.palette.common.black,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 18,
    // color: theme.palette.common.white
  },
}));


const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
  '&:hover': {
    backgroundColor: '#1e272e'
  }
}));

const SearchField = styled(TextField)(({ theme }) => ({
  variant: 'outlined',
  '& input:valid + fieldset': {
    borderColor: 'wheat',
    borderWidth: 2,
  },
  'label': {
    color: 'white',
    letterSpacing: '.2ch'
  },
  'input': {
    color: 'white'
  },

  '&:hover': {
    '& input:valid + fieldset': {
      borderColor: 'wheat',
      borderWidth: 2,
    },
  },
  marginBottom: '2rem'
}))


export default function Main() {
  const [page, setPage] = useState(1);
  const [list, setList] = useState([]);
  const [text, setText] = useState("");
  const { currency, symbol } = ContextState();

  const navigate = useNavigate();
  const fetchAllCoins = async () => {
    const { data } = await axios.get(CoinList(currency));
    setList(data);
  }

  useEffect(() => {
    fetchAllCoins();
  }, [currency])

  // const upperCase = (symbol) => {
  //   return symbol.toUpperCase();
  // }

  const HandleSearch = () => {
    return list.filter(
      (coin) =>
        coin.name.toLowerCase().includes(text) ||
        coin.symbol.toLowerCase().includes(text)
    );
  };



  return (
    <div style={{ padding: '1rem 2rem' }}>
      <Typography variant='h4' sx={{ margin: '2rem 0', color: 'white', textAlign: 'center' }}>Cryptocurrency Prices by Market Cap</Typography>
      <SearchField id="demo-helper-text-aligned" placeholder='Search here......' fullWidth onChange={(e) => setText(e.target.value)} />
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 700, backgroundColor: 'black' }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>Coin</StyledTableCell>
              <StyledTableCell align="right">Price</StyledTableCell>
              <StyledTableCell align="right">24 change</StyledTableCell>
              <StyledTableCell align="right">Market cap</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {
              HandleSearch().slice((page - 1) * 10, (page - 1) * 10 + 10).map((row) => {
                const profit = row.price_change_percentage_24h;
                return (
                  <StyledTableRow key={row.name} onClick={() => navigate(`/coin/${row.id}`)}>
                    <StyledTableCell component="th" scope="row" sx={{ display: 'flex', alignItems: 'center', gap: '1rem', color: 'white' }}>
                      <img src={row.image} alt={row.name} height='50' />
                      <div style={{ display: 'flex', flexDirection: 'column' }}>
                        <span style={{ fontSize: '1.4rem' }}>{row.symbol}</span>
                        <span>{row.name}</span>
                      </div>
                    </StyledTableCell>
                    <StyledTableCell align="right" sx={{ color: 'white' }}>{symbol}{" "}{numberWithCommas(row.current_price)}</StyledTableCell>
                    <StyledTableCell align="right" sx={{ color: `${profit > 0 ? 'green' : 'red'}` }}>{profit > 0 ? "+" : ""}{" "}{profit}</StyledTableCell>
                    <StyledTableCell align="right" sx={{ color: 'white' }}>{numberWithCommas(row.market_cap)}</StyledTableCell>
                  </StyledTableRow>

                )
              }
              )
            }

          </TableBody>
        </Table>
      </TableContainer>

      
        <Pagination
          count={HandleSearch()?.length / 10}
          color="primary"
          onChange={(_, value) => {
            setPage(value);
            window.scroll(0, 450);
          }}
          sx={{
            padding:'1.2rem 0',
            width: "100%",
            display: "flex",
            justifyContent: 'center',
            "& .MuiPaginationItem-root":{
               color:'gold'
            },
          }}
        />
      
    </div>
  );
}