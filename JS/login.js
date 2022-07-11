// setup variables

// inputs
let username = document.getElementById("username");
let password = document.getElementById("password");

//button
let loginBtn = document.querySelector("#sign_in");

loginBtn.addEventListener('click',function(e){

    e.preventDefault();
    let _username = localStorage.getItem("username");
    let _password = localStorage.getItem("password");
    if(_username == null || _password == null)
    {
        alert("your account is not found please create account");
    }
    else{
        if(!username.value)
        {
            alert("please Enter Username");
        }
        else if(!password.value)
        {
            alert("please enter password");
        }
        else{
            if( username.value.trim() != _username.trim() || password.value != _password )
            {
                alert("account or password is not valid");
            }
            else{
                setTimeout(function(){
                    window.location = "index.html";
                },1500);
            }
        }
    }
});
