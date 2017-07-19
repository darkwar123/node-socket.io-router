const flatten = require('array-flatten');

class Route {
    /**
     * @param {String} path - the route path
     * @param {...[Function]} handles - the route handles (req, res, next) => {}
     * @constructor
     * */
    constructor(path, ...handles){
        this.path = path;
        this.stack = [];

        handles = flatten(handles);

        for (let i = 0; i < handles.length; i++) {
            let handle = handles[i];

            if (typeof handle !== 'function') {
                const type = handle.toString();
                const msg = 'Route requires callback functions but got a ' + type;
                throw new Error(msg);
            }

            this.stack.push(handle);
        }
    }
}

module.exports = Route;
