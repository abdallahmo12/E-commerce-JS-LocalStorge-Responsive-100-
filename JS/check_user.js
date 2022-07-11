let links = document.getElementById("log_reg");
let userDom = document.getElementById("user_info");
let username = document.getElementById("user");
let avatarURL = localStorage.getItem("profileImage") ?  localStorage.getItem("profileImage") : "imges/avatar.png";


let _username = localStorage.getItem("username");
let logout = document.getElementById("logout");

if(_username)
{
    links.style.display = "none";
    userDom.style.display = "flex";
    username.innerHTML = 
    "<img src="+avatarURL+" alt='avater'/>"+_username;
}
logout.addEventListener('click',function(){
    localStorage.clear();
    setTimeout(function(){
        window.location = "register.html";
    },2000);
});
