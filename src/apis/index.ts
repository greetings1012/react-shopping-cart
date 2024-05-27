import type { CartItem } from '../types/CartItem.ts';
import { ERROR_MESSAGE } from '../constants/MESSAGES';
import generateBasicToken from '../utils/auth';

import type { Coupon } from '../types/Coupon.ts';

const API_URL = import.meta.env.VITE_API_URL;
const USER_PASSWORD = import.meta.env.VITE_USER_PASSWORD;
const USER_ID = import.meta.env.VITE_USER_ID;

const fetchCartItemList = async (): Promise<CartItem[]> => {
  const token = generateBasicToken(USER_ID, USER_PASSWORD);

  const response = await fetch(`${API_URL}/cart-items`, {
    method: 'GET',
    headers: { Authorization: token },
  });

  if (!response.ok) {
    alert(ERROR_MESSAGE.FETCH_CART_ITEMS);
    throw new Error(ERROR_MESSAGE.FETCH_CART_ITEMS);
  }

  const data = await response.json();

  return data.content;
};

const addCartItem = async (cartItemId: number): Promise<void> => {
  const token = generateBasicToken(USER_ID, USER_PASSWORD);

  const response = await fetch(`${API_URL}/cart-items`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: token,
    },
    body: JSON.stringify({ id: cartItemId }),
  });

  if (!response.ok) {
    alert(ERROR_MESSAGE.ADD_CART_ITEMS);
    throw new Error(ERROR_MESSAGE.ADD_CART_ITEMS);
  }
};
const removeCartItem = async (cartItemId: number): Promise<void> => {
  const token = generateBasicToken(USER_ID, USER_PASSWORD);

  const response = await fetch(`${API_URL}/cart-items/${cartItemId}`, {
    method: 'DELETE',
    headers: { Authorization: token },
  });

  if (!response.ok) {
    alert(ERROR_MESSAGE.REMOVE_CART_ITEMS);
    throw new Error(ERROR_MESSAGE.REMOVE_CART_ITEMS);
  }
};

const updateCartItemQuantity = async (cartItemId: number, quantity: number): Promise<void> => {
  const token = generateBasicToken(USER_ID, USER_PASSWORD);

  const response = await fetch(`${API_URL}/cart-items/${cartItemId}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      Authorization: token,
    },
    body: JSON.stringify({ quantity: quantity }),
  });

  if (!response.ok) {
    alert(ERROR_MESSAGE.UPDATE_PRODUCT_QUANTITY);
    throw new Error(ERROR_MESSAGE.UPDATE_PRODUCT_QUANTITY);
  }
};

const fetchCouponList = async (): Promise<Coupon[]> => {
  const token = generateBasicToken(USER_ID, USER_PASSWORD);

  const response = await fetch(`${API_URL}/coupons`, {
    method: 'GET',
    headers: { Authorization: token },
  });

  if (!response.ok) {
    alert(ERROR_MESSAGE.FETCH_COUPONS);
    throw new Error(ERROR_MESSAGE.FETCH_COUPONS);
  }

  const data = await response.json();

  return data;
};

const createOrder = async (cartItemIds: number[]): Promise<void> => {
  const token = generateBasicToken(USER_ID, USER_PASSWORD);

  const response = await fetch(`${API_URL}/orders`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: token,
    },
    body: JSON.stringify({ cartItemIds: cartItemIds }),
  });

  if (!response.ok) {
    alert(ERROR_MESSAGE.CREATE_ORDER);
    throw new Error(ERROR_MESSAGE.CREATE_ORDER);
  }
};

export { fetchCartItemList, addCartItem, removeCartItem, updateCartItemQuantity, fetchCouponList, createOrder };
