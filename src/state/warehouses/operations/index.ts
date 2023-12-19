import fetchWarehouses from './fetchWarehouses';
import fetchWarehouseByUpdate from './fetchWarehouseByUpdate';
import createWarehouse from './createWarehouse';
import updateWarehouse from './updateWarehouse';
import deleteWarehouse from './deleteWarehouse';
import fetchWarehouse from './fetchWarehouse';
import setToWarehouse from "./setToWarehouse";
import setToCourier from "./setToCourier";

const warehousesOperations = [
    fetchWarehouses,
    fetchWarehouseByUpdate,
    createWarehouse,
    updateWarehouse,
    deleteWarehouse,
    fetchWarehouse,
    setToWarehouse,
    setToCourier
];

export default warehousesOperations;
