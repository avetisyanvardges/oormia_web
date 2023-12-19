const sliceText = (text?: string, length?: number, prefix?: string) => {
    if(!text || !length) return;

    if (text.length > length){
        return text.slice(0, length) + (prefix || '...');
    }

    return text;
};

export default sliceText;