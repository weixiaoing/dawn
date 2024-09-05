import { Action, configureStore } from "@reduxjs/toolkit";
interface CounterState {
  value: number;
}
const initState = { value: 0 };
const counterReducer = (state = initState, action: Action) => {
  switch (action) {
    default: {
      return {
        ...state,
        value: state.value + 1,
      };
    }
  }
};
// const store = configureStore({
//   reducer: {
//     users: usersReducers,
//   },
// });

// console.log(store.getState());
