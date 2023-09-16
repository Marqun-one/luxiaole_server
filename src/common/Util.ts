export const combineDateSearchString = (year: string, month: string) : string => {
    if(month.length == 1) {
        return year + '-0' + month + '%'; 
    }
    return year + '-' + month + '%'; 
}

export const processString = (str: string) : string => {
    // str = str.replace('"', '');
    // if (str.startsWith('0')) {
    //     str =str.substring(1);
    // }
    return str;
}