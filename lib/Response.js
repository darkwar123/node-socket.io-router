class Response{
    constructor(socket, args = []){
        const _io = socket.client;

        this.emit = _io.emit.bind(_io);
        this.to = _io.to.bind(_io);
        this.in = this.to;


        this._arguments = [];
        this._callback = () => {};

        for(let i = 0; i < args.length; i++){
            if(typeof args === 'function'){
                return this._callback = args[i];
            }

            this._arguments.push(args[i]);
        }

        this.params = {};

        if(this._arguments.length === 1 && this._arguments[0] != null
            && typeof this._arguments === 'object'){
            this.params = this._arguments[0];
        }else{
            this.params = this._arguments.reduce(function (acc, cur, i) {
                acc[i] = cur;
                return acc;
            }, {});
        }
    }
    end(err, data){
        return this._callback(err, data);
    }
    send(data){
        return this.end(null, data);
    }
    error(err){
        return this.end(err);
    }
    param(name){
        return this.params[name];
    }
}

module.exports = Response;