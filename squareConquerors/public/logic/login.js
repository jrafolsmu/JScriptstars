 //Comprobamos si los jugadores existen o no para permitir el login
function isUserRegistered(){

    let newUsername = document.forms["login-form"]["username"].value;
    let newPassword = document.forms["login-form"]["password"].value;

    localStorage.setItem('username',newUsername);

    let playersRegistered = window.localStorage.getItem("players");
    console.log("playersRegistered", playersRegistered)
    let savedPlayers = JSON.parse(playersRegistered);

    let newPlayerUsername = savedPlayers.find(player => player.username == newUsername);
    let newPlayerPassword = savedPlayers.find(player => player.password == newPassword); 

    if (newPlayerUsername !== undefined && newPlayerPassword !== undefined){
        userRegistered = true
    } else if(newPlayerUsername !== undefined && newPlayerPassword == undefined){
        userRegistered = false;
        alert("The password you have introduced is not correct. Please, try again.")
    } else{
        userRegistered = false;
        alert("This player is not registered. Please register first in order to play the game!");
    }

    return userRegistered;
}
     
 //Como el login.html es lo primero que se ejecuta. Guardamos aquí los usurios creados a fuego en localstorage
 function createPlayers(){
    let player1 = {username: 'Paco', password: 'Password12345', avatar: "../images/vegeta.jpg"};
    let player2 = {username: 'Javascripstars', password: 'Password12345', avatar: "../images/mickey.jpg"};
    let player3 = {username: 'Superman', password: 'Password12345', avatar: "../images/naruto.jpg"};
    let players = [player1, player2, player3];
    localStorage.setItem('players', JSON.stringify(players));
    console.log("players", players)
    return players;
}


