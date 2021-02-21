const Model = {
    getUpdatedResult: function (err, result) {
        err = err || (result.nModified == 0) ? 'not-updated' : null;
        return { err, result };
    },
    getResultByMultiUpdatedResult: function (inputResults) {
        let errs = [];
        let results = [];
        inputResults.forEach((result) => {
            if (result.err) errs.push(result.err);
            results.push(result.result);
        })
        return {
            err: errs.length > 0 ? errs : null,
            result: results,
        }
    }
}
module.exports = Model;