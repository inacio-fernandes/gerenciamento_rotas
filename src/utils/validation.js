const validator = {
    isEmail: (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    },

    isEmpty: (value) => {
        return value === null || value === undefined || value.toString().trim() === '';
    },

    isNumber: (value) => {
        return !isNaN(parseFloat(value)) && isFinite(value);
    },

    isLength: (value, min, max) => {
        if (typeof value !== 'string') return false;
        const length = value.length;
        return length >= min && length <= max;
    }
};

export default validator;