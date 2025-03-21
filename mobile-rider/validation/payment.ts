export const formatCardNumber = (text: string): string => {
    let cleaned = text.replace(/\D/g, "");
    cleaned = cleaned.slice(0, 16);
    let formatted = cleaned.replace(/(\d{4})/g, "$1-").trim();
    formatted = formatted.endsWith("-") ? formatted.slice(0, -1) : formatted;
    return formatted;
};

export const formatCardExpiry = (text: string): string => {
    let cleaned = text.replace(/\D/g, "");
    cleaned = cleaned.slice(0, 4);
    let formatted = cleaned.replace(/(\d{2})(\d{2})/, "$1/$2");

    return formatted;
};