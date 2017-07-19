class Request{
    constructor(socket, route){
        Object.assign(this, socket.handshake);
        Object.assign(this, socket.request);
        Object.assign(this, socket.conn);

        this.fullPath = route.path;
        this.socket = socket;
    }
}

module.exports = Request;