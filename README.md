# Router class for socket.io
Router class for socket.io as an express.Router class.
# Example
Example of the server-side code:
```javascript
const router = require('node-socket.io-router').Router();

router.use('/', function (req, res, next) {
    if(req.params.name){
        return next();
    }
    
    next(new MyErrorClass('You didn't attach your name'));//You should create your Class or use String, don't use Error class
}, function (req, res, next) {
    res.send('Hello Mr. ' + req.params.name);
})

const io = require('socket.io').listen(3000);
io.use(router.handle());
```
Example of the client-side code:
```javascript
var io = new io();

io.emit('/', {name: 'darkwar123'}, function (err, response) {
    if(err){
        return console.error(err.message); 
    }
    
    console.info(response);//Writes 'Hello Mr. darkwar123'
})
```
