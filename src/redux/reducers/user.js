import { createReducer } from "@reduxjs/toolkit";

const initialState = {
  isAuthenticated: false,
  userWishlist: [],
  userCart: [],
  userOrder: [],
};

export const userReducer = createReducer(initialState, {
  //laod user
  LoadUserRequest: (state) => {
    state.loading = true;
  },
  LoadUserSuccess: (state, action) => {
    state.isAuthenticated = true;
    state.loading = false;
    state.user = action.payload;
  },
  LoadUserFail: (state, action) => {
    state.loading = false;
    state.error = action.payload;
    state.isAuthenticated = false;
  },

  // update user information
  updateUserInfoRequest: (state) => {
    state.loading = true;
  },
  updateUserInfoSuccess: (state, action) => {
    state.loading = false;
    state.user = action.payload;
    state.successMessage = action.successMessage;
  },
  updateUserInfoFailed: (state, action) => {
    state.loading = false;
    state.error = action.payload;
  },

  // get all users --- admin
  getAllUsersRequest: (state) => {
    state.usersLoading = true;
  },
  getAllUsersSuccess: (state, action) => {
    state.usersLoading = false;
    state.users = action.payload;
  },
  getAllUsersFailed: (state, action) => {
    state.usersLoading = false;
    state.error = action.payload;
  },

  //user wishlist
  getUserWishlistRequest: (state) => {
    state.isLoading = true;
  },
  getUserWishlistSuccess: (state, action) => {
    state.isLoading = false;
    state.success = true;
    state.userWishlist = action.payload;
  },
  getUserWishlistFailed: (state, action) => {
    state.isLoading = false;
    state.error = action.payload;
    state.success = false;
  },

  // user cart
  getUserCartRequest: (state) => {
    state.isLoading = true;
  },
  getUserCartSuccess: (state, action) => {
    state.isLoading = false;
    state.success = true;
    state.userCart = action.payload;
  },
  getUserCartFailed: (state, action) => {
    state.isLoading = false;
    state.error = action.payload;
    state.success = false;
  },

  increaseCartItemQuantity: (state, action) => {
    const productId = action.payload;
    const productIndex = state.userCart.findIndex(
      (item) => item._id === productId
    );

    if (productIndex !== -1) {
      const updatedUserCart = [...state.userCart];
      updatedUserCart[productIndex] = {
        ...updatedUserCart[productIndex],
        quantity: updatedUserCart[productIndex].quantity + 1,
      };
      return {
        ...state,
        userCart: updatedUserCart,
      };
    }
    return state;
  },

  decreaseCartItemQuantity: (state, action) => {
    const productId = action.payload;
    const productIndex = state.userCart.findIndex(
      (item) => item._id === productId
    );

    if (productIndex !== -1) {
      const updatedUserCart = [...state.userCart];
      updatedUserCart[productIndex] = {
        ...updatedUserCart[productIndex],
        quantity: updatedUserCart[productIndex].quantity - 1,
      };
      return {
        ...state,
        userCart: updatedUserCart,
      };
    }
    return state;
  },

  removeAllFromCart: (state) => {
    state.userCart = [];
  },

  clearErrors: (state) => {
    state.error = null;
  },

  clearMessages: (state) => {
    state.successMessage = null;
  },

  // get user order

  getUserOrderRequest: (state) => {
    state.isLoading = true;
  },
  getUserOrderSuccess: (state, action) => {
    state.isLoading = false;
    state.success = true;
    state.userOrder = action.payload;
  },
  getUserOrderFailed: (state, action) => {
    state.isLoading = false;
    state.error = action.payload;
    state.success = false;
  },
});