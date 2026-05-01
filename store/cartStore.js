import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useCartStore = create(

persist(

(set, get) => ({

cart: [],


/*
ADD TO CART
*/

addToCart: (product) => {

const exists = get().cart.find(
item => item._id === product._id
);

if (exists) {

set({

cart: get().cart.map(item =>
item._id === product._id
? { ...item, qty: item.qty + 1 }
: item
)

});

return;

}


/*
NORMALIZED CART STRUCTURE
*/

set({

cart: [

...get().cart,

{

_id: product._id,

name: product.name,

sellingPrice: product.sellingPrice,

actualPrice: product.actualPrice || 0,

image: product.image || "",

qty: 1

}

]

});

},



/*
CLEAR CART
*/

clearCart: () => set({ cart: [] }),



/*
INCREASE QTY
*/

increaseQty: (id) => {

set({

cart: get().cart.map(item =>
item._id === id
? { ...item, qty: item.qty + 1 }
: item
)

});

},



/*
DECREASE QTY
*/

decreaseQty: (id) => {

set({

cart: get().cart
.map(item =>
item._id === id
? { ...item, qty: item.qty - 1 }
: item
)
.filter(item => item.qty > 0)

});

},



/*
REMOVE ITEM
*/

removeItem: (id) => {

set({

cart: get().cart.filter(
item => item._id !== id
)

});

}

}),

{
name: "midnight-cart"
}

)

);