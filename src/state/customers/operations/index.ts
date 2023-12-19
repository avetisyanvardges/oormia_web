import fetchCustomers from './fetchCustomers';
import fetchCustomerByUpdate from './fetchCustomerByUpdate';
import createCustomer from './createCustomer';
import updateCustomer from './updateCustomer';
import deleteCustomer from './deleteCustomer';

const customersOperations = [
    fetchCustomers,
    fetchCustomerByUpdate,
    createCustomer,
    updateCustomer,
    deleteCustomer,
];

export default customersOperations;