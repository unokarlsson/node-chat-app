const generateMessage = (from, text) => {
    return {
        from,
        text,
        createdAt: new Date().getTime() // or Date.now();
    };
};

module.exports = {generateMessage};