const isRealString = (string) => {
    return typeof string ==='string' && string.trimLeft().length>0;
};

module.exports = {isRealString};