export const STATUS = {
    IN_PROCESS: "in_process",
    CONFIRM: "confirmed",
    REJECT: "rejected",
    PICKED_UP: "picked_up",
    AT_WAREHOUSE: "at_warehouse",
    ON_WAY: "on_the_way",
    IN_COURIER: "at_courier",
    RETURN: "returned",
    FAILED: "failed",
    RECEIVED: "received",
    DISTRIBUTION_CENTER: 'at_distribution_center'
};

export const STATUS_NAME: any = {
    [STATUS.IN_PROCESS]: "Մշակվում է",
    [STATUS.CONFIRM]: "Հաստատված",
    [STATUS.REJECT]: "Մերժված",
    [STATUS.PICKED_UP]: "Առաքիչի մոտ",
    [STATUS.AT_WAREHOUSE]: "Պահեստում",
    [STATUS.ON_WAY]: "Ճանապարհին",
    [STATUS.DISTRIBUTION_CENTER]: "Պատրաստ է առաքման",
    [STATUS.IN_COURIER]: "Առաքվում է",
    [STATUS.RETURN]: "Վերադարձ",
    [STATUS.FAILED]: "Չի հանձնվել",
    [STATUS.RECEIVED]: "Առաքված",
};


export const PAYMENT_TYPE = {
    RECIPIENT: 'recipient',
    SENDER: 'sender',
    ONLINE: 'online',
}

export const ORDER_STATUSES = [
    {
        value: STATUS.IN_PROCESS,
        label: STATUS_NAME[STATUS.IN_PROCESS],
    },
    {
        value: STATUS.CONFIRM,
        label: STATUS_NAME[STATUS.CONFIRM],
    },
    {
        value: STATUS.REJECT,
        label: STATUS_NAME[STATUS.REJECT],
    },
    {
        value: STATUS.PICKED_UP,
        label: STATUS_NAME[STATUS.PICKED_UP],
    },
    {
        value: STATUS.AT_WAREHOUSE,
        label: STATUS_NAME[STATUS.AT_WAREHOUSE],
    },
    {
        value: STATUS.ON_WAY,
        label: STATUS_NAME[STATUS.ON_WAY],
    },
    {
        value: STATUS.DISTRIBUTION_CENTER,
        label:STATUS_NAME[STATUS.DISTRIBUTION_CENTER],
    },
    {
        value: STATUS.IN_COURIER,
        label: STATUS_NAME[STATUS.IN_COURIER],
    },
    {
        value: STATUS.RETURN,
        label: STATUS_NAME[STATUS.RETURN],
    },
    {
        value: STATUS.FAILED,
        label: STATUS_NAME[STATUS.FAILED],
    },
    {
        value: STATUS.RECEIVED,
        label:STATUS_NAME[STATUS.RECEIVED],
    },

];

export const ORDER_PAYMENT_TYPES = [
    {
        key: PAYMENT_TYPE.SENDER,
        label: 'Ուղարկող',
    },
    {
        key: PAYMENT_TYPE.RECIPIENT,
        label: 'Ստացող',
    },
    {
        key: PAYMENT_TYPE.ONLINE,
        label: 'Օնլայն',
    },
]



