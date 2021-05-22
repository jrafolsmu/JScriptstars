function allowDrop(ev) {
    ev.preventDefault();
}

function drag(ev) {
    ev.dataTransfer.setData("text", ev.target.id);
}

function drop(ev) {
    ev.preventDefault();
    var data = ev.dataTransfer.getData("text");
    ev.target.appendChild(document.getElementById(data));
    console.log(ev.target);
    var url = ev.target.getAttribute('url');
    let userID = window.localStorage.getItem('userID');

    console.log(">>>>>>", userID);
    $.ajax({
        method: "PATCH",
        url: `http://localhost:3000/api/players/${userID}`,
        data: { favoriteRoom: url }
    })
    window.location.href = url;
}

function getUsername() {
    let username = window.localStorage.getItem('username');
    document.getElementById("username").innerHTML = username;
}

function getUsernameNavBar() {
    let username = window.localStorage.getItem('username');
    document.getElementById("usernameNavBar").innerHTML = username;
}

function getAvatar() {
    let username = window.localStorage.getItem('username');
    let avatar = window.localStorage.getItem('avatar');
    document.getElementById("avatar").setAttribute("src", avatar);
    if (avatar == null) {
        playersRegistered = window.localStorage.getItem('players');
        let savedPlayers = JSON.parse(playersRegistered);
        let playerLoggedIn = savedPlayers.find(player => player.username == username);
        avatar = playerLoggedIn.avatar;
        document.getElementById("avatar").setAttribute("src", avatar);
    }
}

function logout() {
    localStorage.clear();
    location.assign("login.pug");
}

async function favoriteRoom() {
    let userID = window.localStorage.getItem("userID");
    let favoriteRoom = "./room.pug?id=otaku";
    await $.get(`http://localhost:3000/api/players/${userID}`)
        .done(function (data) {
            console.log(data.response.favoriteRoom);
            favoriteRoom = data.response.favoriteRoom
        })
    window.location.href = favoriteRoom;
}
