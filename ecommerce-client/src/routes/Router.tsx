import { createBrowserRouter } from "react-router-dom";
import Layout from "../components/Layout";
import HomePage from "../pages/HomePage";
import ProductsPage from "../pages/ProductsPage";
import SingleProductPage from "../pages/SingleProductPage";
import Admin from "../pages/Admin/Admin";
import Cart from "../pages/Cart";
import ManageProducts from "../pages/Admin/ManageProducts";
import ManageOrders from "../pages/Admin/ManageOrders";
import ManageCustomers from "../pages/Admin/ManageCustomers";
import CreateProduct from "../pages/Admin/CreateProduct";
import UpdateProductSingle from "../pages/Admin/UpdateProductSingle";
import CreateCustomer from "../pages/Admin/CreateCustomer";
import UpdateCustomer from "../pages/Admin/UpdateCustomer";
import OrderUpdate from "../pages/Admin/OrderUpdate";
import Checkout from "../pages/Checkout";
import OrderConfirmation from "../pages/OrderConfirmation";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <Layout />,
        children: [
            {
                path: "/",
                element: <HomePage />
            }, {
                path: "/products",
                element: <ProductsPage />
            }, {
                path: "/product/:id",
                element: <SingleProductPage />
            }, {
                path: "/admin",
                element: <Admin />
            }, {
                path: "/cart",
                element: <Cart />
            }, {
                path: "/manage_products",
                element: <ManageProducts />
            }, {
                path: "/manage_orders",
                element: <ManageOrders />
            }, {
                path: "/manage_customers",
                element: <ManageCustomers />
            }, {
                path: "/create_product",
                element: <CreateProduct />
            },
            {
                path: "/update_product/:id",
                element: <UpdateProductSingle />
            }, {
                path: "/create_customer",
                element: <CreateCustomer />
            }, {
                path: "/update_customer/:id",
                element: <UpdateCustomer />
            }, {
                path: "/update_order/:id",
                element: <OrderUpdate />
            }, {
                path: "/checkout",
                element: <Checkout />
            }, {
                path: "/order-confirmation",
                element: <OrderConfirmation />
            },
        ]
    }
])