export const generateId = () => {
    return Date.now().toString(36) + Math.random().toString(36).substring(2);
}

export const TIMEOUT_TIME = 1500