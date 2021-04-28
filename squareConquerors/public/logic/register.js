
function savePlayer(){
    let newUsername = document.forms["register-form"]["username"].value;
    let newAvatar = document.forms["register-form"]["selectedAvatar"].value;

    localStorage.setItem('username',newUsername);
    localStorage.setItem('avatar', newAvatar);
    let playersRegistered = window.localStorage.getItem("players");
    console.log("playersRegistered", playersRegistered)
    let savedPlayers = JSON.parse(playersRegistered);
    let newPlayerUsername = savedPlayers.find(player => player.username == newUsername);

    //Checking the user already exists with that username or not before allowing register
    if (newPlayerUsername == undefined){
        newPlayer = true
    } else{
        newPlayer = false;
        alert("This player is already registered. Please choose a different username in order to register!");
    }

    return newPlayer;
}