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

		this.headers = this.handshake.headers;
		this.ip = this.handshake.address;
        this.fullPath = route.path;
        this.socket = socket;
    }
}

module.exports = Request;