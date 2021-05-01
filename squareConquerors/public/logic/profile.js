    function updatePlayer(){
        let username = window.localStorage.getItem("username");
        console.log("username", username);
        let newUsername = document.forms["profile-form"]["username"].value;
        let newPassword = document.forms["profile-form"]["password"].value;
        let newAvatar = document.forms["profile-form"]["selectedAvatar"].value;
        console.log(newAvatar, "newAvatar")
        if (newAvatar === ""){
            newAvatar = "../images/mickey.jpg" //ponemos un avatar por default en caso de que el usaurio no seleccione ninguno
        }
        let playersRegistered = window.localStorage.getItem("players");
        let savedPlayers = JSON.parse(playersRegistered);
        for (let i= 0; i < savedPlayers.length; i++){
            console.log("playersRegistered", savedPlayers[i].username)
            if(username == savedPlayers[i].username){
                savedPlayers[i].username = newUsername; 
                savedPlayers[i].password = newPassword; 
                savedPlayers[i].avatar = newAvatar; 
            }
        }
        localStorage.setItem('players', JSON.stringify(savedPlayers));
        localStorage.setItem('username', newUsername);
    
        return true;
    }
    
          
   
    function logout() {
        localStorage.clear();
        location.assign("login.pug");
    }
    
    function getAvatar(){
        let username = window.localStorage.getItem('username');
        console.log("username", username)
        playersRegistered = window.localStorage.getItem('players');
        let savedPlayers = JSON.parse(playersRegistered);
        let playerLoggedIn = savedPlayers.find(player => player.username == username);
        let savedAvatar = playerLoggedIn.avatar; 
        document.getElementById("photo_avatar").setAttribute("src", savedAvatar);
    }
    
    function getUsernameNavBar(){
          let username = window.localStorage.getItem('username');
          document.getElementById("usernameNavBar").innerHTML = username;
    }

    function getUsername(){
        let username = window.localStorage.getItem('username');
        document.getElementById("username_change").setAttribute("placeholder", username);
    }
    
