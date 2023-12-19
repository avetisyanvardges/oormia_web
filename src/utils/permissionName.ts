const permissionName = (name: string) => {
    let splitArr = name.split('-');
    return `${splitArr[0][0].toUpperCase()}${splitArr[0].substring(1)} ${splitArr.slice(1).join(' ')}`;
};

export default permissionName;