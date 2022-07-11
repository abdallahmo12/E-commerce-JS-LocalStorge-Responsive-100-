// setUp variables

// inputs
let username = document.getElementById("username");
let email = document.getElementById("email");
let password = document.getElementById("password");

//button
let registerBtn = document.querySelector("#sign_up");


registerBtn.addEventListener('click' , function(e){
    // console.dir(e);
    e.preventDefault();
    if(username.value === "" || email.value === "" || password.value === "")
    {
        alert("please Enter Empty Data");
    }
    else{
        localStorage.setItem("username",username.value);
        localStorage.setItem("email" , email.value);
        localStorage.setItem("password" , password.value);

        setTimeout(function(){
            window.location = "login.html";
        },2000);
    }
})
