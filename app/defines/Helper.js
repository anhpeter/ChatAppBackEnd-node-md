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

    }

}
module.exports = Helper;