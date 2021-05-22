//Comprobamos si los jugadores existen o no para permitir el login
function isUserRegistered() {

    let newUsername = document.forms["login-form"]["username"].value;
    let newPassword = document.forms["login-form"]["password"].value;

    $.post("http://localhost:3000/api/auth",
    {
        username: newUsername,
        password: newPassword
    })
    .done(function(data){ 
        alert(data.message);
        console.log(data);
        localStorage.setItem('username', data.response.username);
        localStorage.setItem('avatar', data.response.avatar);
        localStorage.setItem('userID', data.response._id);
        window.location.href = '/selectrooms.pug';
     })
    .fail(function(xhr, status, error) {
        alert(xhr.responseJSON.message);
    });

}



