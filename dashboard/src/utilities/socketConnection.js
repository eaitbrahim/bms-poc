import io from 'socket.io-client';

let socket = io.connect('http://localhost:8181');
socket.emit('clientAuth', 'hghhg7878dfdfdfd232xcv');
export default socket;
