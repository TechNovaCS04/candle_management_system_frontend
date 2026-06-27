import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../reducers/authSlice";
import productsReducer from "../reducers/productsSlice";
import rawMaterialsReducer from "../reducers/rawMaterialsSlice";
import productionReducer from "../reducers/productionSlice";
import salesReducer from "../reducers/salesSlice";
import customersReducer from "../reducers/customersSlice";
import suppliersReducer from "../reducers/suppliersSlice";
import employeesReducer from "../reducers/employeesSlice";
import attendanceReducer from "../reducers/attendanceSlice";
import expensesReducer from "../reducers/expensesSlice";
import revenueReducer from "../reducers/revenueSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    products: productsReducer,
    rawMaterials: rawMaterialsReducer,
    production: productionReducer,
    sales: salesReducer,
    customers: customersReducer,
    suppliers: suppliersReducer,
    employees: employeesReducer,
    attendance: attendanceReducer,
    expenses: expensesReducer,
    revenue: revenueReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
