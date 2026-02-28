export const toast = (message, type = 'success') => {
    window.dispatchEvent(new CustomEvent('preppath:toast', { detail: { message, type } }));
};

export const notifyAppChanged = () => {
    window.dispatchEvent(new CustomEvent('preppath:app-changed'));
};
