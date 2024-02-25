export const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}
export const validatePassword = (password) => {
    const passwordRegex = /^(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?])(?=.*[0-9])(?=.*[A-Z]).{6,}$/;

    return passwordRegex.test(password);
}

export const validateMobileNumber = (number) => {
    // Regular expression to validate 10-digit phone numbers
    const regex = /^\d{10}$/;
    return regex.test(number);
}