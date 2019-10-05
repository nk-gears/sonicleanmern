import React from 'react'
import DefaultLayout from '../containers/DefaultLayout'

const SalesForm = React.lazy(() => import('../views/SalesForm'))
const Profile = React.lazy(() => import ('../views/Profile'))
const Account = React.lazy(() => import('../views/Profile/components/Account'))
const Company = React.lazy(() => import('../views/Profile/components/Company'))
const PaymentMethods = React.lazy(() => import('../views/Profile/components/PaymentMethods'))
const OrderHistory = React.lazy(() => import('../views/OrderHistory'))
const OrderDetail = React.lazy(() => import('../views/OrderDetail'))

const routes = [
  { path: "/", exact: true, name: "Soniclean", component: DefaultLayout, private: true },
  { path: "/sales", name: "Sales", component: SalesForm, private: true },
  { path: "/profile", exact: false, name: "Profile", component: Profile, private: true },
  { path: "/profile/account", exact: true, name: "Profile", component: Account, private: true },
  { path: "/profile/company", exact: true, name: "Profile", component: Company, private: true },
  { path: "/profile/billing", exact: true, name: "Profile", component: PaymentMethods, private: true },
  { path: "/order-history", exact: true, name: "OrderHistory", component: OrderHistory, private: true },
  { path: "/order-detail/:id", exact: true, name: "OrderDetail", component: OrderDetail, private: true },
];

export default routes