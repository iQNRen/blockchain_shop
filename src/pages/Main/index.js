import { React, useEffect, useState } from 'react';
import BarChart from '../../components/charts'
import { Button } from 'antd';
import { useNavigate } from 'react-router-dom';


const main = () => {
    
    
    const withdraw = ()=>{
        localStorage.setItem("withdraw", true);
        window.location.reload()
    }

    return (
        <>
        <Button type='primary' onClick={withdraw} style={{ 
            float:"right"
         }}>将链上资金提现</Button>
            <div style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                marginTop: '10%',
            }}>


                <BarChart />

            </div>
        </>
    )
}

export default main;