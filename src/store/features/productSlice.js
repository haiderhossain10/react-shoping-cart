import { createSlice } from "@reduxjs/toolkit";

export const productSlice = createSlice({
    name: "product",
    initialState: {
        products: [
            { id: 1, productName: "Product 1", price: 100, stock: 50 },
            { id: 2, productName: "Product 2", price: 140, stock: 12 },
            { id: 3, productName: "Product 3", price: 110, stock: 23 },
        ],
        carts: [],
        shipping: 50,
        total: 0,
    },
    reducers: {
        addToCartReducer: (state, action) => {
            let isAdded = false;
            state.carts.find((item) => {
                return item.id === action.payload.id
                    ? (isAdded = true)
                    : (isAdded = false);
            });
            if (!isAdded) {
                state.carts = [...state.carts, { ...action.payload, qty: 1 }];
            } else {
                alert("Product already added to cart");
            }
        },

        updateQtyReducer: (state, action) => {
            if (action.payload.type === "increase") {
                state.carts.filter((item) => {
                    return item.id === action.payload.id
                        ? item.qty < 10
                            ? (item.qty += 1)
                            : alert("Quantity cannot exceed 10")
                        : "";
                });
            }
            if (action.payload.type === "decrease") {
                state.carts.filter((item) => {
                    return item.id === action.payload.id
                        ? item.qty > 1
                            ? (item.qty -= 1)
                            : alert("Quantity cannot be less than 1")
                        : "";
                });
            }
        },
        deteleProductReducer: (state, action) => {
            state.carts = state.carts.filter((item) => {
                return item.id !== action.payload;
            });
        },
        updateCalculationReducer: (state, action) => {
            state.total = action.payload;
        },
    },
});

export const {
    addToCartReducer,
    updateQtyReducer,
    deteleProductReducer,
    updateCalculationReducer,
} = productSlice.actions;
export default productSlice.reducer;
