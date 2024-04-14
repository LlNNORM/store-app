import {createContext, useEffect, useState} from "react";

export const BasketContext = createContext({});

export const BasketProvider = ({children}) => {
    const headphones = [
        {
            img: './icons/headphones/headphones1.png',
            title: 'Apple BYZ S852I',
            price: 2927,
            rate: 4.7,
            id : 1,
        },
        {
            img: './icons/headphones/headphones2.png',
            title: 'Apple EarPods',
            price: 2327,
            rate: 4.5,
            id : 2,
        },
        {
            img: './icons/headphones/headphones3.png',
            title: 'Apple EarPods',
            price: 2927,
            rate: 4.7,
            id : 3,
        },
        {
            img: './icons/headphones/headphones1.png',
            title: 'Apple BYZ S852I',
            price: 2927,
            rate: 4.7,
            id : 4,
        },
        {
            img: './icons/headphones/headphones2.png',
            title: 'Apple EarPods',
            price: 2327,
            rate: 4.5,
            id : 5,
        },
        {
            img: './icons/headphones/headphones3.png',
            title: 'Apple EarPods',
            price: 2927,
            rate: 4.7,
            id : 6,
        },
    ];
    const wirelessHeadphones = [
        {
            img: './icons/wireless-headphones/headphones1.png',
            title: 'Apple AirPods',
            price: 9527,
            rate: 4.7,
            id : 7,
        },
        {
            img: './icons/wireless-headphones/headphones2.png',
            title: 'GERLAX GH-04',
            price: 6527,
            rate: 4.5,
            id : 8,
        },
        {
            img: './icons/wireless-headphones/headphones3.png',
            title: 'BOROFONE BO4',
            price: 7527,
            rate: 4.7,
            id : 9,
        },
    ];
    const allProducts = [...headphones, ...wirelessHeadphones];
    const [count, setCount] = useState(0);

    const onPurchase = (id) => {
        setCount(count+1);
        if (!sessionStorage.getItem(id)) {
            sessionStorage.setItem(id, 1)
        } else {for (let key in sessionStorage) {
            if (+key===id) {sessionStorage.setItem(id, +sessionStorage.getItem(key)+1)}
        }}
        console.log(Object.keys(sessionStorage))
        // sessionStorage.clear();
        console.log(sessionStorage);
    };

    const onAmountIncrease = (id) => {
        setCount(count+1);
        for (let key in sessionStorage) {
            if (+key===id) {sessionStorage.setItem(id, +sessionStorage.getItem(key)+1)}
        }
    };

    const onAmountDecrease = (id)=>{
        setCount(count-1);
        for (let key in sessionStorage) {
            if (+key===id) {sessionStorage.setItem(id, +sessionStorage.getItem(key)-1)}
        }
    };
    let orderPrice = 0;

    const calculateOrderPrice = (allProducts)=> {
        allProducts.forEach (item => {
            const {id, price} = item;
            for (let key in sessionStorage) {
                if (+key===id) {orderPrice += +sessionStorage.getItem(key)*price}}
            return orderPrice;
            }
        )
        return orderPrice;
    };

    orderPrice = calculateOrderPrice(allProducts);

    

//   const [values, setValues] = useState(() => {
//     const storedValuesJSON = sessionStorage.getItem('cart');
//     try {
//       return JSON.parse(storedValuesJSON) ?? {};
//     } catch (e) {
//       return {};
//     }
//   });

//   useEffect(() => {
//     sessionStorage.setItem('cart', JSON.stringify(values));
//   }, [values]);

//   console.log(values);

//   const addProduct = (id) => {
//     setValues(prev => {
//       if (prev[id]) {
//         return {...prev, [id]: prev[id] + 1};
//       }

//       return {...prev, [id]: 1};
//     });
//   }

//   const removeProduct = (id) => {
//     setValues(prev => {
//       if (prev[id]) {
//         return {...prev, [id]: prev[id] - 1};
//       }

//       return {...prev, [id]: 0};
//     });
//   }

//   const deleteProduct = (id) => {
//     setValues(prev => {
//       return {...prev, [id]: undefined};
//     });
//   }

  return (
    <BasketContext.Provider
      value={{
        count,
        onPurchase,
        onAmountDecrease,
        onAmountIncrease,
        headphones,
        wirelessHeadphones,
        allProducts,
        orderPrice,
      }}
    >
      {children}
    </BasketContext.Provider>
  )
}
