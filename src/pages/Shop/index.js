import { useEffect, useState } from 'react'
import { ethers } from 'ethers'

// Components
import Navigation from '../../components/Navigation'
import Section from '../../components/Section'
import Product from '../../components/Product'

// ABIs
import Contract from '../../abis/Contract.json'
import { setAddress } from '../../store'

const Shop = () => {
    const [provider, setProvider] = useState(null)
    const [contract, setContract] = useState(null)

    const [account, setAccount] = useState(null)

    const [electronics, setElectronics] = useState(null)
    const [clothing, setClothing] = useState(null)
    const [toys, setToys] = useState(null)

    const [item, setItem] = useState({})
    const [toggle, setToggle] = useState(false)
    const [isLoading, setIsLoading] = useState(true); // 设置加载状态

    const togglePop = (item) => {
        setItem(item)
        toggle ? setToggle(false) : setToggle(true)
    }

    const loadBlockchainData = async () => {
        try {


            const provider = new ethers.providers.Web3Provider(window.ethereum)

            setProvider(provider)

            // const network = await provider.getNetwork()
            // console.warn("network.chainId:" + network.chainId, "network.name:" + network.name)

            const contract = new ethers.Contract(`${process.env.REACT_APP_CONTRACTS_ADDRESS}`, Contract, provider)
            console.log(contract)
            setContract(contract)

            const tx = await contract.owner();
            setAddress(tx)
            localStorage.setItem("owner", tx)

            const items = []

            let len = await contract.getShops();
            console.warn(len)
            for (var i = 0; i < len.length; i++) {
                const item = await contract.items(i + 1)
                items.push(item)
            }

            console.warn(items)
            const electronics = len.filter((item) => item.category === '电子产品')
            const clothing = len.filter((item) => item.category === '服装')
            const toys = len.filter((item) => item.category === '玩具')

            setElectronics(electronics)
            setClothing(clothing)
            setToys(toys)
            setIsLoading(false);
        } catch (err) {
            console.error("请先按照钱包")
        }
    }
    // const doWithdraw = async () => {
    //     const signer = await provider.getSigner()
    //     const tx = await contract.connect(signer).withdraw();
    //     // await tx.wait()
    //     console.log(tx);
    // }
    // const doList = async () => {
    //     const signer = await provider.getSigner()
    //     const tx = await contract.connect(signer).list();
    //     console.log(tx);
    // }

    useEffect(() => {
        loadBlockchainData()
    }, [])

    return (
        <div>
            <Navigation account={account} setAccount={setAccount} />

            <h2>热门推荐</h2>
            {/* <button onClick={doWithdraw}>收钱</button>
            <button onClick={doList}>收钱</button> */}
            {/* <button onClick={getOwner}>用户</button> */}

            {isLoading && (<div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', fontSize: '48px' }}>加载中...</div>)}
            {electronics && clothing && toys && (
                <>
                    <Section title={"服装"} items={clothing} togglePop={togglePop} />
                    <Section title={"电子产品"} items={electronics} togglePop={togglePop} />
                    <Section title={"玩具"} items={toys} togglePop={togglePop} />
                </>
            )}
            {toggle && (
                <Product item={item} provider={provider} account={account} contract={contract} togglePop={togglePop} />
            )}
        </div>
    );
}

export default Shop;
