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
    var url=ev.target.getAttribute('url');
    console.log("url",url);
    window.localStorage.setItem("favoriteRoom", url) //guardamos sala favorita
    window.location.href = url;

}

function getUsername(){
    let username = window.localStorage.getItem('username');
    document.getElementById("username").innerHTML = username;
}

function getUsernameNavBar(){
    let username = window.localStorage.getItem('username');
    document.getElementById("usernameNavBar").innerHTML = username;
}

function getAvatar(){
    let username = window.localStorage.getItem('username');
    let avatar = window.localStorage.getItem('avatar');
    document.getElementById("avatar").setAttribute("src", avatar);
    if (avatar == null){
    playersRegistered = window.localStorage.getItem('players');
    let savedPlayers = JSON.parse(playersRegistered);
    let playerLoggedIn = savedPlayers.find(player => player.username == username);
    avatar = playerLoggedIn.avatar; 
    document.getElementById("avatar").setAttribute("src", avatar);
    }
}  

function logout() {
    localStorage.clear();
    location.assign("login.html");
}

function favoriteRoom(){
  let favoriteRoom = window.localStorage.getItem("favoriteRoom");
  console.log("favoriteRoom", favoriteRoom);
  if (favoriteRoom === null){
    favoriteRoom = "./room.html?id=otaku"; //en caso de que no haya entrado el jugador nunca antes
  }
  document.getElementById("favorite").setAttribute("href", favoriteRoom);
}
