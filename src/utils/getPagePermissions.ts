const fullPermissions = {
    create: true,
    edit: true,
    remove: true,
    add_order: true,
    remove_order: true,
    send: true,
    set_to_parcel: true,
    courier_list: true,
    pickupList: true,
    courierDeliveryList: true,
    balanceTransfer: true,
    parcelReceived: true,
    order_accepted: true,
    order_confirm: true,
    order_reject: true,
    order_set_to_at_warehouse: true,
    order_set_to_on_way: true,
    order_return: true,
    order_failed: true,
    order_received: true,
    order_list_by_status: true,
}

export const getPagePermissions = (userPermissions: any, permissions: any) => {
    if(userPermissions?.includes(permissions?.full)) {
        return fullPermissions;
    }
    return Object.keys(fullPermissions).reduce((acc: any, item) => {
        acc[item] = userPermissions?.includes(permissions?.[item])
        return acc;
    }, {});
}
