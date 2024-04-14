import BasketListItem from '../basket-list-item/BasketListItem';
import BasketOrder from '../basket-price/BasketOrder';
import { useContext } from 'react';
import { BasketContext } from '../context';
import './BasketList.css'

const BasketList = () => {
    const {allProducts} = useContext(BasketContext);
    const {orderPrice} = useContext(BasketContext);
    const purchasedItems = Object.keys(sessionStorage);

    const elements = allProducts.map (item => {
        const {id, ...itemProps} = item;
        let quantity=sessionStorage.getItem(id);
        if (purchasedItems.includes(String(id)) && quantity>0)
            return (
            <BasketListItem key = {id} id={id} quantity={quantity} {...itemProps} />
            )
    })
    if (orderPrice) {return (
        <div className="basket">
            <div className="basket__title">Корзина</div>
            <div className="basket__wrapper">
                {elements}
                <BasketOrder/>
            </div>
        </div>
    );} else return (
        <div className="basket">
            <div className="basket__title">Корзина</div>
            <div className="basket__wrapper">
                <h1>Корзина пуста</h1>
            </div>
        </div>
    )
};

export default BasketList;
