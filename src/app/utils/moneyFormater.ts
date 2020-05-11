

export const formatCrypto = (amount:number) : string => {

    let maximumFractionDigits = (amount >= 1) ? 2 : 8;

    return amount.toLocaleString('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 2, maximumFractionDigits});
}