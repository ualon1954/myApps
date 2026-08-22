let api = "https://script.google.com/macros/s/AKfycbzksZvOnvmmTHnb4Zf87b2W_AJu8LksAwqkdpUL3eNGgOOZTLZx0EAsHPGV4WatbNE2/exec",
form = document.querySelector("form"),
userName = document.querySelector("form #user-name"),
password = document.querySelector("form #password");
eyes = document.querySelectorAll(".eye");
class Login {
	
	constructor(form, fields) {
		this.form = form;
		this.fields = fields;
		//this.validateonSubmit();
	}

	}

function home () {
    $("#loginModal").classList.remove("open");
    
}

// function login () {
//     // alert(form[0].value);
//     document.querySelector(".submit").innerHTML = "מתחבר...";
//     fetch(api+`?login=true&username=${form[0].value}&passwd=${form[1].value}`)
    
//           .then(res => res.text())
//           .then(data=> {
//             //alert(data);
//             if (data === 'Logged In') {
//                 login = true;
//                 localStorage.setItem("auth", 1);
//                 localStorage.setItem("username", form[0].value);
                
//                 home();
//                 }
//             else {
                
//                 alert(data);
//             }  
//             document.querySelector(".submit").innerHTML = "כניסה";
//           })

// }

// PASSWORD HIDE AND SHOW
eyes.forEach((eye) => {
  eye.addEventListener("click", (e) => {
    // alert(e.target.parentElement.parentElement.children[1].children[0]);
    let input = e.target.parentElement.parentElement.children[1].children[0];
    let eye = e.target.parentElement;
    // input.type = "password";
    // alert(eye);
    if (input.type === "password") {
      input.type = "text";
      eye.innerHTML = `<i class="fa-regular fa-eye"></i>`;
    } else {
      input.type = "password";
      eye.innerHTML = `<i class="fa-regular fa-eye-slash"></i>`;
    }
  });
});



$("#loginForm").onsubmit = e => {
    e.preventDefault();
    document.querySelector(".submit").innerHTML = "מתחבר...";
    fetch(api+`?login=true&username=${form[0].value}&passwd=${form[1].value}`)
    
          .then(res => res.text())
          .then(data=> {
            //alert(data);
            if (data === 'Logged In') {
                login = true;
                localStorage.setItem("auth", 1);
                localStorage.setItem("username", form[0].value);
                
                home();
                }
            else {
                
                alert(data);
            }  
            document.querySelector(".submit").innerHTML = "כניסה";
          })
};
if (localStorage.getItem("vistoraUser")) $("#profileBtn").textContent = localStorage.getItem("username");

function logout() {
    // alert("logout")
    localStorage.setItem("auth", 0);
    location.reload();
}
// if (form) {
// 	const fields = ["username", "password"];
// 	const validator = new login(form, fields);
// }