const dateformat = require('dateformat')
const MyTime = {

    getUTCNow: function () {
        var now = new Date();
        var time = now.getTime();
        var offset = now.getTimezoneOffset();
        offset = offset * 60000;
        return time - offset;
    },

    getCurrentTimeByUTCTime: function (utcTime) {
        let now = new Date();
        let offset = now.getTimezoneOffset();
        offset = offset * 60000;
        return utcTime + offset;
    },

    getMessageTimeString: function (time) {
        let itemDate = new Date(time);
        let now = new Date();
        let result
        if (
            (
                now.getFullYear() === itemDate.getFullYear() &&
                now.getMonth() === itemDate.getMonth() &&
                now.getDate() === itemDate.getDate()
            )

        )
            result = dateformat(time, 'HH:MM');
        else
            result = dateformat(time, 'dd/mm/yyyy HH:MM');
        return result;
    },
}
module.exports = MyTime;