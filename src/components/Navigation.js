import { ethers } from 'ethers'
import { useEffect } from 'react';
import { getAddress, setAccount as _setAccount } from '../store';
import { useNavigate, useLocation } from "react-router-dom";

const Navigation = ({ account, setAccount }) => {
    const connectHandler = async () => {
        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
        const account = ethers.utils.getAddress(accounts[0])
        setAccount(account);
        _setAccount(account);
        // localStorage.setItem("account", account);
        // localStorage.setItem('owner', account);
        // console.warn("Address:", account);
    }
    const navigate = useNavigate(); // 获取历史对象

    const location = useLocation();
    const handleButtonClick = () => {
        if (location.pathname === '/Admin') {
            navigate('/'); // 跳转到首页
        } else {
            navigate('/Admin'); // 跳转到详情页
        }
    };

    useEffect(() => {
        // setAccount(localStorage.getItem("account"))
    }, [account])


    return (
        <nav>
            <div className='nav__brand'>
                <h1>去中心化商铺</h1>
            </div>

            {!location.pathname.includes('/Admin') ? (<input
                type="text"
                className="nav__search"
            />) : (
                <div className='nav__search' style={{
                    fontFamily: "Lalezar",
                    fontSize: "1.25em",
                    fontWeight: 600,
                    margin: "0 auto",
                }}>后台管理系统</div>
            )
            }
            {
                getAddress() === account && (
                    <button
                        type="button"
                        className='nav__admin'
                        onClick={handleButtonClick}
                    >{location.pathname.includes('/Admin') ? '返回前台' : '管理员后台'}</button>
                )
            }

            {
                account ? (
                    <button
                        type="button"
                        className='nav__connect'
                    >
                        {account.slice(0, 6) + '...' + account.slice(38, 42)}
                    </button>
                ) : (
                    <button
                        type="button"
                        className='nav__connect'
                        onClick={connectHandler}
                    >
                        Connect
                    </button>
                )
            }
            {
                !location.pathname.includes('/Admin') && (
                    <ul className='nav__links'>
                        <li><a href="#Electronics & Gadgets">电子产品</a></li>
                        <li><a href="#Clothing & Jewelry">服装</a></li>
                        <li><a href="#Toys & Gaming">玩具</a></li>
                    </ul>)
            }
        </nav >
    );
}

export default Navigation;