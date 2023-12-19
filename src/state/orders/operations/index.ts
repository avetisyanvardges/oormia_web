import fetchOrders from './fetchOrders';
import createOrder from './createOrder';
import updateOrder from './updateOrder';
import deleteOrder from './deleteOrder';
import fetchOrderById from "./fetchOrderById";
import acceptOrder from "./acceptOrder";
import receiveOrder from "./receiveOrder";
import fetchPickupOrders from "./fetchPickupOrders";
import fetchDeliveryOrders from "./fetchDeliveryOrders";
import confirmOrder from "./confirmOrder";
import rejectOrder from "./rejectOrder";
import sortOrder from "./sortOrder";

const regionsOperations = [
    fetchOrders,
    createOrder,
    updateOrder,
    deleteOrder,
    fetchOrderById,
    acceptOrder,
    receiveOrder,
    fetchPickupOrders,
    fetchDeliveryOrders,
    confirmOrder,
    rejectOrder,
    sortOrder

];

export default regionsOperations;
