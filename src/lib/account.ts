import {ICurrentAdmin} from "state/admins/types";

class Account {
    static getAccessToken(): string {
        return localStorage.getItem('accessToken') || '';
    }

    static setAccessToken(accessToken: string) {
        localStorage.setItem('accessToken', accessToken);
    }

    static setAccount(data: ICurrentAdmin) {
        localStorage.setItem('account', JSON.stringify(data));
    }

    static getAccount(): ICurrentAdmin | {} {
        const account: string | null = localStorage.getItem('account');
        return account ? JSON.parse(account) : {};
    }

    static delete() {
        localStorage.removeItem('accessToken');
        localStorage.removeItem('account');
    }
}

export default Account;

