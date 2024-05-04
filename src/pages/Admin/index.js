import { React, useEffect, useState } from 'react';
import { ethers } from 'ethers';
import Contract from '../../abis/Contract.json'
import Navigation from '../../components/Navigation';
import useContractStore, { setAccount, getAccount } from '../../store'
import { AppstoreOutlined, HomeOutlined, RobotOutlined,GiftOutlined,ShoppingOutlined } from '@ant-design/icons';
import { Menu } from 'antd';
import { useNavigate, useLocation, Link, Outlet } from "react-router-dom";


const items = [
    {
        key: 'Main',
        label: '详情',
        icon: <HomeOutlined />,
    },
    {
        label: '商品管理',
        icon: <AppstoreOutlined />,
        children: [
            {
                key: 'Orders',
                label: '商品列表',
                icon: <ShoppingOutlined />
            },
            {
                key: 'PutOrder',
                label: '商品上架',
                icon: <GiftOutlined />,
            }
        ]
    },
    {
        key: 'Users',
        label: '用户列表',
        icon: <RobotOutlined />,
    }
];
const Admin = () => {
    const [provider, setProvider] = useState(null)
    const [contract, setContract] = useState(null)

    const tokens = (n) => {
        return ethers.utils.parseUnits(n.toString(), 'ether')
    }
    const loadBlockchainData = async () => {
        const provider = new ethers.providers.Web3Provider(window.ethereum)
        setProvider(provider)
        const contract = new ethers.Contract(`${process.env.REACT_APP_CONTRACTS_ADDRESS}`, Contract, provider)
        let address = await contract.owner();
        // console.warn(address)

        if (localStorage.getItem("list")) {
            let data = JSON.parse(localStorage.getItem("list"));
            console.warn(data)
            let id = await contract.getShops();
            const signer = await provider.getSigner()
            console.warn(id.length)
            const transaction = await contract.connect(signer).list(
                id.length,
                data.name,
                data.category,
                data.image,
                tokens(data.cost),
                data.rating,
                data.stock
            )

            await transaction.wait();
            localStorage.removeItem("list");
        }

        if (localStorage.getItem("withdraw")) {
            localStorage.removeItem("withdraw");
            const signer = await provider.getSigner()
            const transaction = await contract.connect(signer).withdraw();

            await transaction.wait();
            
        }



        let users = await contract.getUsers();
        let usersList = [...new Set(users)];
        localStorage.setItem("users", JSON.stringify(usersList));
        // console.warn(users)
        let shops = await contract.getShops();
        localStorage.setItem("shops", JSON.stringify(shops));
        // console.warn(shops)

        let orders1 = []
        for (let i = 0; i < users.length; i++) {
            let address = users[i];
            let orderCount = await contract.orderCount(address);
            for (let j = 0; j < orderCount; j++) {
                let order = await contract.orders(address, j);
                if (order.item[2] !== '' || order.item[3] !== '') {
                    let orderDetail = {
                        id: order.item[0],
                        name: order.item[1],
                        category: order.item[2],
                        image: order.item[3],
                        cost: order.item[4],
                        rating: order.item[5],
                        stock: order.item[6],
                        time: order.time['_hex']
                    }
                    orders1.push(orderDetail);
                    // console.warn("================", orderDetail)
                }

            }
        }
        localStorage.setItem("orders", JSON.stringify(orders1));
    }
    useEffect(() => {
        loadBlockchainData();
    }, [])

    const navigate = useNavigate();
    const onClick = (e) => {
        console.log('click ', e.key);
        console.log(e.key);
        navigate(e.key); // 跳转到指定路由
    };

    let account = getAccount();

    return (
        <div>
            <Navigation account={account} setAccount={setAccount} />
            <div style={{
                display: "flex",
                justifyContent: "space-between",
                height: "90vh   ",
            }}>
                <Menu
                    onClick={onClick}
                    mode="inline"
                    items={items}
                    style={{
                        width: "15%",
                        fontSize: "16px",
                    }}
                />
                <div style={{
                    width: "85%",
                    height: "100%",
                    border: "1px solid #000",
                    borderRadius: "10px",
                    padding: "30px",
                }}>
                    <Outlet />
                </div>
            </div>


        </div>
    );
};
export default Admin;