import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    addToCartReducer,
    deteleProductReducer,
    updateCalculationReducer,
    updateQtyReducer,
} from "./store/features/productSlice";

const App = () => {
    const selectProduct = useSelector((state) => state.product.products);
    const selectCart = useSelector((state) => state.product.carts);
    const selectTotal = useSelector((state) => state.product.total);
    const selectShipping = useSelector((state) => state.product.shipping);
    const dispatch = useDispatch();

    // add to cart
    const addToCartHandler = (id) => {
        const productSingleData = selectProduct.filter((item) => {
            return item.id === id;
        });
        dispatch(addToCartReducer(productSingleData[0]));
    };

    // qty increase
    const qtyIncreaseHandler = (id) => {
        dispatch(updateQtyReducer({ id: id, type: "increase" }));
    };

    // qty decrease
    const qtyDecreaseHandler = (id) => {
        dispatch(updateQtyReducer({ id: id, type: "decrease" }));
    };

    // delete from cart
    const deleteCartHandler = (id) => {
        dispatch(deteleProductReducer(id));
    };

    // total price
    useEffect(() => {
        let total = 0;
        if (selectCart.length !== 0) {
            for (const product of selectCart) {
                const totalPrice = product.price * product.qty;
                total = total + totalPrice;
            }
        }
        dispatch(updateCalculationReducer(total));
    }, [dispatch, selectCart]);

    return (
        <div>
            {selectProduct.map((item, index) => {
                return (
                    <div key={index}>
                        <p>{item.productName}</p>
                        <p>$ {item.price}</p>
                        <p
                            style={
                                item.stock > 0
                                    ? { color: "green" }
                                    : { color: "red" }
                            }
                        >
                            <b>
                                {item.stock > 0 ? "In Stock" : "Out Of Stock"}
                            </b>
                        </p>
                        {item.stock > 0 ? (
                            <button
                                onClick={() => {
                                    addToCartHandler(item.id);
                                }}
                            >
                                Add To Cart
                            </button>
                        ) : (
                            <button disabled>Add To Cart</button>
                        )}
                    </div>
                );
            })}
            <br />
            <table border="1">
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Product Name</th>
                        <th>Price</th>
                        <th>Quantity</th>
                        <th>Total</th>
                        <th>Delete</th>
                    </tr>
                </thead>
                <tbody>
                    {selectCart.length !== 0 &&
                        selectCart.map((item, index) => {
                            return (
                                <tr key={index}>
                                    <td>{index + 1}</td>
                                    <td>{item.productName}</td>
                                    <td>$ {item.price}</td>
                                    <td>
                                        <button
                                            onClick={() => {
                                                qtyDecreaseHandler(item.id);
                                            }}
                                        >
                                            -
                                        </button>
                                        <span>{item.qty}</span>
                                        <button
                                            onClick={() => {
                                                qtyIncreaseHandler(item.id);
                                            }}
                                        >
                                            +
                                        </button>
                                    </td>
                                    <td>$ {item.price * item.qty}</td>
                                    <td>
                                        <button
                                            onClick={() => {
                                                deleteCartHandler(item.id);
                                            }}
                                        >
                                            X
                                        </button>
                                    </td>
                                </tr>
                            );
                        })}
                </tbody>
            </table>
            <br />
            <table border="1">
                <tbody>
                    <tr>
                        <td>Subtotal</td>
                        <td>$ {selectTotal}</td>
                    </tr>
                    <tr>
                        <td>Shipping</td>
                        <td>$ {selectTotal !== 0 ? selectShipping : 0}</td>
                    </tr>
                </tbody>
                <tfoot>
                    <tr>
                        <th>Total </th>
                        <th>
                            $
                            {selectTotal !== 0
                                ? selectTotal + selectShipping
                                : 0}
                        </th>
                    </tr>
                </tfoot>
            </table>
        </div>
    );
};

export default App;
