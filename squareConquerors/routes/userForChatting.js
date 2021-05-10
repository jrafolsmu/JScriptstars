let users = [];
function joinUser(socketId, username, roomname, usernumber) {
    const user = {
        socketID: socketId,
        username: username,
        roomname: roomname, 
        usernumber: usernumber
    }
    users.push(user)
    return user;
}
function removeUser(id) {
    const getID = users => users.socketID === id;
    const index = users.findIndex(getID);
    if (index !== -1) {
        return users.splice(index, 1)[0];
    }
}

function getUsers(room) {
    return users.filter(user => user.roomname === room)
}
module.exports = { joinUser, removeUser, getUsers }