import {BasketItem} from './BasketItem'
function BasketList(props) {
    const {order = [],
        handleBasketShow = Function.prototype,
        removeFromBasket = Function.prototype,
        decQuantity,
        incQuantity
    } = props;
    const totalPrice = order.reduce((sum, el)=> {
        return sum + el.price.finalPrice * el.quantity
    },0)
    return <ul className="collection basket-list">
        <li  className="collection-item active">Basket</li>
        {
            order.length ? order.map(item => (
                <BasketItem
                    key={item.mainId} {...item}
                    removeFromBasket={removeFromBasket}
                    decQuantity={decQuantity}
                    incQuantity={incQuantity}
                />
            )) : <li className="collection-item">Basket Empty</li>
        }
        <li  className="collection-item active">
            Total Cost: ${totalPrice}
            <button className='secondary-content btn-small'>Place an Order</button>
        </li>
        <i className='material-icons basket-close'
           onClick={handleBasketShow}
        >
            close</i>
    </ul>
}

export {BasketList}