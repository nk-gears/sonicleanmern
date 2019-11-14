import React from 'react'
import DefaultLayout from '../containers/DefaultLayout'

const SalesForm = React.lazy(() => import('../views/SalesForm'))
const Profile = React.lazy(() => import ('../views/Profile'))
const Orders = React.lazy(() => import('../views/Orders'))
const OrderDetail = React.lazy(() => import('../views/OrderDetail'))
const Dealers = React.lazy(() => import('../views/Dealers'))

const routes = [
  { path: "/", exact: true, name: "Soniclean", component: DefaultLayout, private: true },
  { path: "/sales/:id", name: "Sales", component: SalesForm, private: true },
  // { path: "/profile/:id", exact: false, name: "Profile", component: Profile, private: true },
  { path: "/profile/account/:id", exact: false, name: "Profile", component: Profile, private: true },
  { path: "/profile/company/:id", exact: false, name: "Profile", component: Profile, private: true },
  { path: "/profile/users/:id", exact: false, name: "Profile", component: Profile, private: true },
  { path: "/profile/store/:id", exact: false, name: "Profile", component: Profile, private: true },
  { path: "/profile/billing/:id", exact: false, name: "Profile", component: Profile, private: true },
  { path: "/orders/:id", exact: true, name: "Orders", component: Orders, private: true },
  { path: "/order/:id", exact: true, name: "OrderDetail", component: OrderDetail, private: true },
  { path: "/dealers", exact: true, name: "Dealers", component: Dealers, private: true },
];

export default routes