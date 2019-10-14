import { combineReducers } from "redux";
import { authReducer } from './auth';
import { accountReducer } from './account';
import { companyReducer } from './company'
import { SalesFormReducer } from './salesForm';
import { StateReducer } from './States';
import { BrandReducer } from './Brands';
import { RegisterReducer } from './Register';
import { ReferralReducer } from './Referral';
import { PriceListReducer } from './PriceList';
import { EmailNotificationReducer } from './EmailNotification';
import { UserReducer } from './Users';
import { StoreReducer } from './Stores';
import { CardReducer } from './Cards';
import { CustomerReducer } from './Customer';
import { PromoCodeReducer } from './PromoCode';
import { TaxesReducer } from './Taxes';
import { OrderReducer } from './Order';
import { OrderHistoryReducer } from './OrderHistory';
import { NotificationReducer } from './Notification'



const appReducers = combineReducers({
    auth: authReducer,
    account: accountReducer,
    company: companyReducer,
    salesform: SalesFormReducer,
    states: StateReducer,
    brands: BrandReducer,
    register: RegisterReducer,
    referral: ReferralReducer,
    priceList: PriceListReducer,
    emailNotificationList: EmailNotificationReducer,
    stores: StoreReducer,
    card: CardReducer,
    customer: CustomerReducer,
    promoCode: PromoCodeReducer,
    taxes: TaxesReducer,
    order: OrderReducer,
    orderhistory: OrderHistoryReducer,
    users: UserReducer,
    notification: NotificationReducer
    // but its referenced here     
});

const VisualbitlizerApp = (state, action) => {
    return appReducers(state, action);
};

export default VisualbitlizerApp; 