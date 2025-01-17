export const formatAmount=(amount) =>{
    const amountParts = amount.toString().split(".");
    let integerPart = amountParts[0];
    const decimalPart = amountParts.length > 1 ? "." + amountParts[1] : "";

    const lastThreeDigits = integerPart.slice(-3);
    const otherDigits = integerPart.slice(0, -3);
    if (otherDigits !== '') {
        integerPart = otherDigits.replace(/\B(?=(\d{2})+(?!\d))/g, ",") + "," + lastThreeDigits;
    } else {
        integerPart = lastThreeDigits;
    }
    
    return `₹${integerPart}${decimalPart}`;
}