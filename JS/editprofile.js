let proImageURL = localStorage.getItem("profileImage") ? localStorage.getItem("profileImage") :
"imges/avatar.png";
let userName = localStorage.getItem("username");
let userEmail = localStorage.getItem("email");
let imgURL = localStorage.getItem("profileImage") ? localStorage.getItem("profileImage") : "imges/avatar.png";

let inputName = document.getElementById("inputTitle");
let inputEmail = document.getElementById("inputDesc");

inputName.value = userName;
inputEmail.value = userEmail;

let inputImageProfile = document.getElementById("inputFile");
inputImageProfile.addEventListener("change" ,catchProfileImage);
function catchProfileImage(){
    let imgFile = this.files[0];
    console.log(imgFile);
    let types = ["image/jpeg","image/jpg","image/png"];
    if(types.indexOf(imgFile.type) == -1){
        alert("image file has different extension");
        return;
    }
    if(imgFile.size > 5 * 1024 * 1024){
        alert("image exceeded 5MG");
        return;
    }
    getBase64(imgFile);

    // let imgURL = URL.createObjectURL(imgFile);
    // console.log(imgURL);
}
function getBase64 (f){
    let reader = new FileReader();
    reader.readAsDataURL(f);
    reader.onload = function (){
        imgURL = reader.result;
    }
    reader.onerror = function(){
        alert("Something Went Wrong !! ");
    }
}

let updateProfileBtn = document.getElementById("submitBtn");

updateProfileBtn.addEventListener("click" , updateProfile);

function updateProfile(e){
    e.preventDefault();
    localStorage.setItem("username" , inputName.value);
    localStorage.setItem("email", inputEmail.value);
    localStorage.setItem("profileImage", imgURL);

    setTimeout(()=>{
        window.location = "profile.html";
    },500);
}