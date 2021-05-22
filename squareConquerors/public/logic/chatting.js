const socket = io();
const btnSend = document.getElementById("btnSend")
const message = document.getElementById("input")
const messages = document.getElementById("messages")
const membersBox = document.getElementById("members");
const startBtn = document.querySelector(".start");

let username = window.localStorage.getItem('username');

const qString = window.location.search;
const params = new URLSearchParams(qString);
let roomname = params.get('id');
let currentUser = {};
let joinedUsers = [];

socket.emit("join room", { username: username, roomname: roomname });


const userColor = ['blue', 'red', 'green', 'yellow'];
const addToUsersBox = (user) => {
    const userBox = `
          <div class="member_item" id="${user.socketID}-userlist">
            <h5 style="color:${userColor[user.usernumber]};">${user.username}: <span id = "${userColor[user.usernumber]}_score"></span></h5>
          </div>
        `;
    membersBox.innerHTML += userBox;
};
socket.on('user list', (users) => {
    membersBox.innerHTML = ""
    joinedUsers = users;
    users.map((user, key) => {
        addToUsersBox(user)
    })
})
socket.on("user disconnected", function (userID) {
    const removeItem = document.getElementById(`${userID}-userlist`)
    if (removeItem) removeItem.remove();
});

//receive data from server.
socket.on('send user data', (data) => {
    currentUser = data;

    if (currentUser.usernumber == 0) {
        startBtn.style.display = "block";
    }
    else startBtn.style.display = "none";
})

socket.on('error message', (data) => {
    if (data.error === 'cannot join') {
        alert(data.message);
        window.location.href = '/selectrooms.pug';
    }
})

const displayMessage = (data) => {
    const receivedMsg = `
            <li class="left">
            <div class="message-item">
            ${data.data.user} : ${data.data.value}
            </div>
            </li>`;

    const myMsg = `
            <li class="right">
            <div class="message-item">
            ${data.data.user} : ${data.data.value}
            </div>
            </li>`;

    messages.innerHTML += data.id === currentUser.socketID ? myMsg : receivedMsg;
};

//Emit message
function onClickBtnSend() {
    if (message.value) {
        socket.emit('chat message', { value: message.value, user: username, roomname: roomname })
        message.value = ""
    }
}
socket.on("chat message", (data) => {
    displayMessage(data);
});
