import { useEffect, useState } from 'react'
import { ethers } from 'ethers'

// Components
import Rating from './Rating'

import close from '../assets/close.svg'

const Product = ({ item, provider, account, contract, togglePop }) => {
  const [order, setOrder] = useState(null)
  const [hasBought, setHasBought] = useState(false)

  const fetchDetails = async () => {
    const events = await contract.queryFilter("Buy")
    const orders = events.filter(
      (event) => event.args.buyer === account && event.args.itemId.toString() === item.id.toString()
    )

    if (orders.length === 0) return

    const order = await contract.orders(account, orders[0].args.orderId)
    setOrder(order)
  }

  const buyHandler = async () => {
    const signer = await provider.getSigner()
    // Buy item...
    let transaction = await contract.connect(signer).buy(item.id, { value: item.cost })
    await transaction.wait()

    setHasBought(true)
  }

  useEffect(() => {
    fetchDetails()
  }, [hasBought])

  return (
    <div className="product">
      <div className="product__details">
        <div className="product__image">
          <img src={item.image} alt="Product" />
        </div>
        <div className="product__overview">
          <h1>{item.name}</h1>

          <Rating value={item.rating} />

          <hr />

          <p>{item.address}</p>

          <h2>{ethers.utils.formatUnits(item.cost.toString(), 'ether')} ETH</h2>

          <hr />

          <h2>介绍</h2>

          <p>
            {item.description}

            该公司本身是一家非常成功的公司。最小的事情，只是，
            将由发明者遵循，他打开了那些被假定的人的大门，
            将遭受同类方便错误的痛苦！离婚权是从什么时候开始的？选项！
          </p>
        </div>

        <div className="product__order">
          <h1>{ethers.utils.formatUnits(item.cost.toString(), 'ether')} ETH</h1>

          <p>
            免费送货 <br />
            <strong>
              {new Date(Date.now() + 345600000).toLocaleDateString(undefined, { weekday: 'long', month: 'long', day: 'numeric' })}
            </strong>
          </p>

          {item.stock > 0 ? (
            <p>有库存</p>
          ) : (
            <p>缺货</p>
          )}

          <button className='product__buy' onClick={buyHandler}>
            {hasBought? '已购买':'立即购买'}
          </button>

          {/* <p><small>Ships from</small> Dappazon</p>
          <p><small>Sold by</small> Dappazon</p> */}

          {order && (
            <div className='product__bought'>
              购买的物品 <br />
              <strong>
                {new Date(Number(order.time.toString() + '000')).toLocaleDateString(
                  undefined,
                  {
                    weekday: 'long',
                    hour: 'numeric',
                    minute: 'numeric',
                    second: 'numeric'
                  })}
              </strong>
            </div>
          )}
        </div>


        <button onClick={togglePop} className="product__close">
          <img src={close} alt="Close" />
        </button>
      </div>
    </div >
  );
}

export default Product;