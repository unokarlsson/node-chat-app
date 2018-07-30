const generateMessage = (from, text) => {
    return {
        from,
        text,
        createdAt: new Date().getTime() // or Date.now();
    };
};

// https://www.google.com/maps?q=59.267967299999995,18.1317616
const generateLocationMessage = (from,latitude,longitude) => {
    return {
        from,
        url: `https://www.google.com/maps?q=${latitude},${longitude}`,
        createdAt: new Date().getTime()
    };
};

module.exports = {generateMessage,generateLocationMessage};