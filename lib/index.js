/**
 * Modules
 * @private
 * */
const async = require('async');
const flatten = require('array-flatten');
const debug = require('debug')('socket.io-router');

/**
 * Modules
 * @public
 * */
const Request = require('./Request');
const Response = require('./Response');
const Route = require('./Route');

class Router {
    constructor(){
        this.stack = [];

        const synonyms = [
            'all',
            'get',
            'post',
            'put',
            'head',
            'delete',
            'options',
            'search'
        ];

        for(let i = 0; i < synonyms.length; i++){
            this[synonyms[i]] = function(){
                return this.use(...arguments);
            }
        }
    }
    /**
     * Creates new instance of Route and push it to stack]
     * @param {String} path - the route path, default is "/"
     * @param {Function[]} handles - the route handles (req, res, next) => {}
     * @public
     * */
    use(path = '/', ...handles){
        /* Transform path to this template /${1}/${2}, prepend and append one "/", remove repeats slashes */
        path = path.replace(/\/?(.*)/i, '/$1').replace(/\/{2,}/ig, '/').replace(/^(.+)\/+$/i, '$1');

        if(handles.length === 1 && handles[0] instanceof Router){
            return handles[0].stack.forEach(route => {
                this.use(path + route.path, route.stack);
            });
        }

        debug('new %s', path);

        this.stack.push(new Route(path, ...handles));
    }/**
     * Handle all socket requests
     * @param {Route} route
     * @param {Socket} socket
     * @private
     * */
    _handle_request(route, socket){
        const req = new Request(socket, route);

        socket.on(route.path, function (){
            const res = new Response(socket, Array.from(arguments));

            async.eachSeries(route.stack, (handle, next) => handle(req, res, next), (err) => {
                if(err) return res.error(err);
            });
        });
    }
    handle(){
        return function (socket, next) {
            for(let i = 0; i < this.stack.length; i++){
                const route = this.stack[i];

                this._handle_request(route, socket);
            }

            next();
        }.bind(this)
    }
}

/**
 * Express Router call without "new" constructor therefore we use _wrapper to call Router()*/
function _wrapper(){
    return new Router();
}

module.exports = _wrapper;

