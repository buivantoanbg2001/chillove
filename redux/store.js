import {configureStore} from '@reduxjs/toolkit';
import layoutReducer from './reducers/layoutReducer';
import tabBarStyleReducer from './reducers/tabBarStyleReducer';
import usersReducer from './reducers/usersReducer';

const store = configureStore({
  reducer: {
    usersReducer: usersReducer,
    layoutReducer: layoutReducer,
    tabBarStyleReducer: tabBarStyleReducer,
  },
});

export default store;
