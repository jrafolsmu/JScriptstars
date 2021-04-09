class Player {
    constructor(username, password, avatar){
        this.username = username;
        this.password = password;
        this.avatar = avatar;
    }

    //Getters
    get getUsername(){
        return this.username;
      }

    get getPassword(){
        return this.password;
    }

    get getAvatar(){
        return this.avatar;
    }

    //Setters
    set setUsername(username){
      this.username = username;
    }

    set setPassword(password){
        this.password = password;
    }

    set setAvatar(avatar){
        this.avatar = avatar;
    }

}