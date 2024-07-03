import React, { useState, useEffect } from 'react';
import { useAuth } from '../../AuthContext';
import { db } from '../../firebaseConfig';
import { collection, getDocs, query, where, updateDoc, doc, deleteDoc, addDoc, getDoc } from 'firebase/firestore';
import NavBar from './NavBar';
import './Cart.css';

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const { currentUser } = useAuth();

  useEffect(() => {
    const fetchCartItems = async () => {
      const q = query(collection(db, 'cart'), where('user_email', '==', currentUser.email));
      const querySnapshot = await getDocs(q);
      const cartList = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

      // Fetch product details
      const productsPromises = cartList.map(async (item) => {
        const productRef = doc(db, 'products', item.product_id);
        const productSnap = await getDoc(productRef);
        return { ...item, product: productSnap.data() };
      });

      const cartWithProductDetails = await Promise.all(productsPromises);
      setCartItems(cartWithProductDetails);
    };

    fetchCartItems();
  }, [currentUser.email]);

  const updateQuantity = async (item, quantity) => {
    const itemRef = doc(db, 'cart', item.id);
    await updateDoc(itemRef, { quantity });
    setCartItems(cartItems.map(cartItem => (cartItem.id === item.id ? { ...cartItem, quantity } : cartItem)));
  };

  const removeFromCart = async (item) => {
    const itemRef = doc(db, 'cart', item.id);
    await deleteDoc(itemRef);
    setCartItems(cartItems.filter(cartItem => cartItem.id !== item.id));
  };

  const placeOrder = async () => {
    try {
      const orders = await Promise.all(cartItems.map(async (item) => {
        const productRef = doc(db, 'products', item.product_id);
        const productSnap = await getDoc(productRef);
        const productData = productSnap.data();

        return {
          user_email: currentUser.email,
          product_id: item.product_id,
          quantity: item.quantity,
          status: 'Pending',
          timestamp: new Date(),
          seller_email: productData.seller_email
        };
      }));

      for (const order of orders) {
        await addDoc(collection(db, 'orders'), order);
      }

      for (const item of cartItems) {
        const itemRef = doc(db, 'cart', item.id);
        await deleteDoc(itemRef);
      }

      setCartItems([]);
      alert('Order placed successfully');
    } catch (error) {
      console.error('Error placing order:', error);
      alert('Error placing order');
    }
  };

  const calculateTotal = () => {
    return cartItems.reduce((total, item) => total + item.quantity * item.product.price, 0);
  };

  return (
    <div>
      <NavBar />
      <div className="cart">
        <h1>Cart</h1>
        {cartItems.length === 0 ? (
          <p>Your cart is empty.</p>
        ) : (
          <div className="cart-list">
            {cartItems.map((item) => (
              <div key={item.id} className="cart-item">
                <img src={item.product.imageUrl} alt={item.product.title} />
                <div className="cart-item-details">
                  <h2>{item.product.title}</h2>
                  <p>Price: ${item.product.price}</p>
                  <p>Quantity: 
                    <input
                      type="number"
                      min="1"
                      value={item.quantity}
                      onChange={(e) => updateQuantity(item, parseInt(e.target.value, 10))}
                    />
                  </p>
                  <p>Total: ${item.quantity * item.product.price}</p>
                  <button onClick={() => removeFromCart(item)}>Remove</button>
                </div>
              </div>
            ))}
            <div className="cart-summary">
              <h2>Total Amount: ${calculateTotal()}</h2>
              <button className="place-order" onClick={placeOrder}>Place Order</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;
