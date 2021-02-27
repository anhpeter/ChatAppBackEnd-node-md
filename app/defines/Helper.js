const ErrorMessage = require("./Messages/ErrorMessage");
const MyResponse = require("./MyResponse");

const Helper = {
    isFn: fn => typeof fn === 'function',

    checkParamsNotNull: function (...args) {
        let result = true;
        args.forEach((arg) => {
            if (arg === null) result = false;
        })
        return result;
    },

    runIfParamsNotNull: function (res, callback, ...args) {
        if (this.checkParamsNotNull(...args)) {
            if (this.isFn(callback)) callback()
        } else MyResponse.error(res, ErrorMessage.paramsInvalid);

    },

    getArrayOfFieldValue: function (items, field, type) {
        const arrayOfFieldValue = items.map((item) => {
            if (type === 'string') return item[field].toString();
            return item[field];
        })
        return arrayOfFieldValue;
    }
}
module.exports = Helper;