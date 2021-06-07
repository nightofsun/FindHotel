let isBlank = str => (!str || /^\s*$/.test(str));

const logError = err => {
    let error = { errors: { global: {} } };
    if (typeof err === 'object') {
        try {
            if (err.name)
                if (err.name === 'MongoError')
                    error.errors['global'] = `${err.errmsg.slice(0, err.errmsg.indexOf(':'))} ${JSON.stringify(err.keyValue, '\"', 1)}`;
                else error.errors['global'] = err.message;
            else {
                let msgs = [];
                Object.keys(err.errors).map(e => error.errors.global[e] = err.errors[e].message)
            }
        } catch (err) { return error.errors['global'] = "Error: unknown reason"; }
    } else if (typeof err === 'string') error.errors['global'] = err;
    else error.errors['global'] = "Error: unknown reason";

    return error;
};
export {
    isBlank,
    logError
}