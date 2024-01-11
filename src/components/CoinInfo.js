import { ThemeProvider } from '@emotion/react'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Line } from 'react-chartjs-2'
import { HistoricalChart } from '../config/api'
import { ContextState } from '../contexts/CryptoContext'
import { chartDays } from '../config/data'      
import Button from '@mui/material/Button';
import { Stack } from '@mui/material'
const CoinInfo = ({ coin, id }) => {
    const [days, setDays] = useState(1);
    const { currency } = ContextState();
    const [HistoricalData, SetHistoricalData] = useState([]);
    // const [selected, setSelected] = useState(false);
    const [bgColor,setBgColor]=useState()
    //  const id=coin?.id;
    //  console.log(id);
    const fetchHistoryData = async () => {
        const { data } = await axios.get(HistoricalChart(id, days, currency));
        SetHistoricalData(data.prices)
        console.log(data);
    }
    const HandleClick = (item) => {
        setDays(item.value)
    }

    useEffect(() => {
        fetchHistoryData();
    }, [days])

    return (
        <div className='coin_container_right'>
            <Line
                data={{
                    labels: HistoricalData.map((coin) => {
                        const date = new Date(coin[0]);     
                        const time = date.getHours > 12
                            ? `${date.getHours() - 12}:${date.getMinutes()}PM`
                            : `${date.getHours()}:${date.getMinutes()}AM`
                        return days == 1 ? time : date.toLocaleDateString()
                    }),
                    datasets: [
                        {
                            data: HistoricalData.map((coin) => coin[1]),
                            label: `Price (past ${days} Days) in ${currency}`,
                            borderColor: '#EEBC1D',
                        }
                    ],
                }}
                options={{
                    elements: {
                        point: {
                            radius: 1,

                        },
                    },
                }}
            />

            <div style={{ display: 'flex', margin: '1rem 0 0 0', justifyContent: 'space-evenly' }}>
                {chartDays?.map((item) => (
                    <Stack>
                        <Button  onClick={() => HandleClick(item)} variant="outlined" sx={{ color: 'white', borderColor:`yellow`,backgroundColor:`${bgColor}` }}>{item.label}</Button>
                    </Stack>
                ))
                }
            </div>
        </div>
    )
}

export default CoinInfo

