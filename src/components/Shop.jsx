import { useState, useEffect } from 'react';
import { API_KEY, API_URL } from '../config';

import { Preloader } from './Preloader';
import { GoodsList } from './GoodsList';
import { Cart } from './Cart';
import {BasketList} from "./BasketList";
import {Alert} from "./Alert";

function Shop() {
    const [goods, setGoods] = useState([]);
    const [loading, setLoading] = useState(true);
    const [order, setOrder] = useState([]);
    const [isBasketShow, setBasketShow] = useState(false);
    const[alertName, setAlertName] = useState('');

    console.log(order); // Проверяем, обновляется ли order

    const addToBasket = (item) => {
        setOrder((prevOrder) => {
            // Копируем массив, чтобы React увидел обновление
            const updatedOrder = [...prevOrder];

            // Ищем индекс товара в массиве
            const itemIndex = updatedOrder.findIndex(orderItem => orderItem.mainId === item.mainId);

            if (itemIndex >= 0) {
                // Если товар уже есть, увеличиваем его количество
                updatedOrder[itemIndex] = {
                    ...updatedOrder[itemIndex], // Создаём новый объект
                    quantity: updatedOrder[itemIndex].quantity + 1
                };
            } else {
                // Если товара нет в корзине, добавляем его
                updatedOrder.push({ ...item, quantity: 1 });
            }

            return updatedOrder; // Возвращаем новый массив

        });
        if (item.displayName) {
            setAlertName(item.displayName);
        }
    };

    const removeFromBasket = (itemId) => {
        console.log("Удаляем ID:", itemId);
        console.log("Текущая корзина:", order);
        const newOrder = order.filter((el) => el.mainId !== itemId);
        setOrder(newOrder);
        console.log("Обновленная корзина:", newOrder);
    };

    const incQuantity = (itemId) => {
            const newOrder = order.map ((el) => {
                if(el.mainId === itemId) {
                    const newQuantity = el.quantity + 1;
                    return {
                        ...el,
                        quantity: newQuantity,
                    };
                } else {
                    return  el;
                }
            });
            setOrder(newOrder);
    };
    const decQuantity = (itemId) => {
        const newOrder = order.map ((el) => {
            if(el.mainId === itemId) {
                const newQuantity = el.quantity - 1;
                return {
                    ...el,
                    quantity: newQuantity >= 0 ? newQuantity : 0,
                };
            } else {
                return  el;
            }
        });
        setOrder(newOrder);
    };
    const totalItems = order.reduce((sum, item) => sum + item.quantity, 0);
    const handleBasketShow = () => {
        setBasketShow(!isBasketShow);
    };

    const closeAlert = () => {
        setAlertName('');
    }


    useEffect(() => {
        fetch(API_URL, {
            headers: {
                Authorization: API_KEY,
            },
        })
            .then((response) => response.json())
            .then((data) => {
                console.log('Fetched data:', data);
                if (data.shop) {
                    setGoods(data.shop);
                }
                setLoading(false);
            })
            .catch((error) => {
                console.error('Error fetching data:', error);
                setLoading(false);
            });
    }, []);
    useEffect(() => {
        console.log("Текущая корзина:", order);
    }, [order]);


    return (
        <main className="container content">
            <Cart quantity={totalItems} handleBasketShow={handleBasketShow} />
            {loading ? <Preloader /> : <GoodsList goods={goods} addToBasket={addToBasket} />}
            {
                isBasketShow && <BasketList
                    order={order}
                    handleBasketShow={handleBasketShow}
                    removeFromBasket={removeFromBasket}
                    incQuantity={incQuantity}
                    decQuantity={decQuantity}

                />
            }
            {
                alertName && <Alert name={alertName} closeAlert={closeAlert}/>
            }
        </main>
    );
}

export { Shop };
