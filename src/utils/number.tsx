export const convertNumber = (value: string | number | null | undefined) => {
    let _value = String(value).replaceAll(",", "");
    if (!Number(_value)) return 0;
    return Number(_value);
};

export const convertCurrent = (value: number | string) => {
    var val = value.toString().split(".");
    val[0] = val[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return val.join(".");
};
