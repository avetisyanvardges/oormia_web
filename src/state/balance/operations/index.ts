import fetchBalance from './fetchBalance';
import transfer from './transfer';
import deleteBalance from './deleteBalance';

const balanceOperations = [
    fetchBalance,
    transfer,
    deleteBalance,
];

export default balanceOperations;
