class Response{
    /**
     * @param {Socket} socket
     * @constructor
     * */
    constructor(socket){
        const _io = socket.client.server;
        
        this.emit = _io.emit.bind(_io);
        this.to = _io.to.bind(_io);
        this.in = this.to;
		
        this._callback = () => {};
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
}

module.exports = Response;