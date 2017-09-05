class Request{
    /**
     * @param {Socket} socket
     * @param {Route} route
     * @constructor
     * */
    constructor(socket, route){
        Object.assign(this, socket.handshake
			, socket.request
			, socket.conn);

        this.fullPath = route.path;
		this.ip = this.address;
        this.socket = socket;
    }
}

module.exports = Request;