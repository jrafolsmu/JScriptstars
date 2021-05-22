
function savePlayer() {
    let newUsername = document.forms["register-form"]["username"].value;
    let newPassword = document.forms["register-form"]["password"].value;
    let newAvatar = document.forms["register-form"]["selectedAvatar"].value;

    //AJAX to create player in mongoDB players via API

    $.post("http://localhost:3000/api/players",
    {
        username: newUsername,
        password: newPassword,
        avatar: newAvatar
    })
    .done(function(data){ 
        alert(data.message);
        localStorage.setItem('username', newUsername);
        localStorage.setItem('avatar', newAvatar);
        window.location.href = '/selectrooms.pug';
     })
    .fail(function(xhr, status, error) {
        alert(xhr.responseJSON.message);
    });
}
