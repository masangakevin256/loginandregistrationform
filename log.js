const LoginBtn1 = document.getElementById('Login-Btn1');
const Email1 = document.getElementById('email-1');
const showPassword1 = document.getElementById('show-password');
const password1 = document.getElementById('password1');
const showpass = document.getElementById('show-reg-password');
const LoginBtn2 = document.getElementById('submit2');
const LoginBtn3 = document.getElementById('Login-Btn3');
const password2 = document.getElementById('password2');
const p = document.getElementById('p');
const preg = document.querySelector('.register-error-msg');
const Email2 = document.querySelector('#email-reg');
const username = document.querySelector('#username');
const LoginInfor = document.querySelector('#login-form');
const RegistrationForm = document.querySelector('#register-form');
const signUpLink = document.querySelector('#no-account');
const LoginLink = document.querySelector('#an-account');
const closeUp = document.querySelector('.close-icon');
const closeReg = document.querySelector('.close-reg');
const content = document.querySelector(".content");
const navLinks = document.querySelector(".nav-links");
const popMsg = document.querySelector(".pop-msg");
const agree = document.querySelector("#agree");

// Initialize users array from localStorage or empty array
let users = JSON.parse(localStorage.getItem("users")) || [];
const MAX_USERS = 10; // Set your maximum users limit

// Display current user count in console whenever the page loads
console.log(`Currently registered users: ${users.length}/${MAX_USERS}`);
if (users.length > 0) {
    console.log("Registered users list:");
    users.forEach((user, index) => {
        console.log(`${index + 1}. Username: ${user.username}, Email: ${user.email}`);
    });
}

document.addEventListener("DOMContentLoaded", function() {
    // Toggle login form
    LoginBtn1.addEventListener("click", function() {
        LoginInfor.style.display = LoginInfor.style.display === "none" ? "block" : "none";
        if (RegistrationForm.style.display === 'block') {
            RegistrationForm.style.display = 'none';
        }
    });

    // Show registration form
    signUpLink.addEventListener("click", function() {
        RegistrationForm.style.display = 'block';
        LoginInfor.style.display = "none";
        clearMessages();
    });

    // Show login form
    LoginLink.addEventListener("click", function() {
        LoginInfor.style.display = 'block';
        RegistrationForm.style.display = "none";
        clearMessages();
    });

    // Close forms
    closeUp.addEventListener("click", function() {
        LoginInfor.style.display = "none";
        clearMessages();
    });

    closeReg.addEventListener("click", function() {
        RegistrationForm.style.display = "none";
        clearMessages();
    });


    content.addEventListener("click", function() {
    if (navLinks.style.display === 'none') {
        // Show menu
        navLinks.style.display = 'flex';
        setTimeout(() => {
            navLinks.style.transform = 'translateX(0)';
        }, 100);

        if(navLinks.style.display==='flex'){
            document.querySelectorAll(".nav-links").forEach(item =>{
                item.addEventListener("click", function(){
                    navLinks.style.transform = 'translateX(-100%)';
                         setTimeout(() => {
                            navLinks.style.display = 'none';
                        }, 3000); 
                })
            })
        }
    } else {
        // Hide menu
        navLinks.style.transform = 'translateX(100%)';
        setTimeout(() => {
            navLinks.style.display = 'none';
        }, 300); // Match this with your CSS transition duration
    }
    if(navLinks.style.display==='flex'){
        document.querySelectorAll(".nav-links").forEach(item =>{
            item.addEventListener("click", function(){
                navLinks.style.transform = 'translateX(-100%)';
                     setTimeout(() => {
                        navLinks.style.display = 'none';
                    }, 3000); 
            })
        })
    }
   
});



    // Show/hide password for login
    showPassword1.addEventListener("click", function() {
        password1.type = showPassword1.checked ? "text" : "password";
    });

    // Show/hide password for registration
    showpass.addEventListener("click", function() {
        password2.type = showpass.checked ? "text" : "password";
    });

    // Login functionality
    LoginBtn2.addEventListener("click", function() {
        let emailValue = Email1.value.trim();
        let passwordValue = password1.value.trim();
    
        // Validate inputs
        if (emailValue.length === 0) {
            showError(p, "Please enter a valid email");
            return;
        }
    
        if (!emailValue.includes("@gmail.com")) {
            showError(p, "Your email must include @gmail.com!");
            return;
        }
    
        if (passwordValue.length < 8) {
            showError(p, "Password must be at least 8 characters!");
            return;
        }
    
        // Check if user exists
        let user = users.find(user => user.email === emailValue && user.password === passwordValue);
    
        if (!user) {
            showError(p, "Incorrect log in credentials!");
            popMsg.style.display = 'block';
            popMsg.textContent = "If you haven't registered yet please do so!";
            popMsg.style.color = 'red';
            popMsg.style.margin = 'auto';
            return;
        }
    
        // Successful login
        showSuccess(popMsg, "Logged in successfully,redirecting...!");
        popMsg.style.background = 'lightblue';
        
        // Store current user in sessionStorage
        sessionStorage.setItem("currentUser", JSON.stringify(user));
        
        // Redirect after 3 seconds
        setTimeout(function() {
            window.location.href = "https://portfoliomasangakevin.netlify.app/";
        }, 2000);
    });
    
    // Registration functionality
    LoginBtn3.addEventListener("click", function() {
        let emailValue = Email2.value.trim();
        let usernameValue = username.value.trim();
        let passwordValue = password2.value.trim();
    
        // Validate inputs
        if (emailValue.length === 0 || usernameValue.length === 0) {
            showError(preg, "Please enter a valid email and username!");
            return;
        }
    
        if (!emailValue.includes("@gmail.com")) {
            showError(preg, "Your email must include @gmail.com!");
            return;
        }
    
        if (passwordValue.length < 8) {
            showError(preg, "Password must be at least 8 characters");
            return;
        }
    
        if (!agree.checked) {
            showError(preg, "Please agree to the terms and conditions to continue!");
            return;
        }
    
        // Check if user already exists
        if (users.some(user => user.email === emailValue)) {
            showError(preg, "This email is already registered!");
            return;
        }
    
        if (users.some(user => user.username === usernameValue)) {
            showError(preg, "This username is already taken!");
            return;
        }
    
        // Check user limit
        // if (users.length >= MAX_USERS) {
        //     let userList = users.map(user => 
        //         `<li>Username: ${user.username}, Email: ${user.email}</li>`
        //     ).join("");
            
        //     alert(`User limit reached (${MAX_USERS})! Registered users:\n${userList}`);
        //     return;
        // }
        if (users.length >= MAX_USERS) {
            let userList = users.map((user, index) => 
                `${index + 1}. Username: ${user.username}, Email: ${user.email}`
            ).join("\n");
            
            alert(`User limit reached (maximum ${MAX_USERS} users allowed)!\n\nRegistered users:\n${userList}`);
            return;
        }
    
        // Add new user
        let newUser = { 
            username: usernameValue, 
            email: emailValue, 
            password: passwordValue 
        };
        
        users.push(newUser);
        localStorage.setItem("users", JSON.stringify(users));
        
        // Update console with new user count
        console.log(`New user registered. Total users: ${users.length}/${MAX_USERS}`);
        console.log(`New user details: Username: ${usernameValue}, Email: ${emailValue}`);
        
        showSuccess(preg, `${usernameValue} was registered successfully!`);
        
        // If reached max users, show alert with user list
        if (users.length === MAX_USERS) {
            let userList = users.map(user => 
                `Username: ${user.username}, Email: ${user.email}`
            ).join(" , ");
            
            setTimeout(() => {
                alert(`Maximum users reached (${MAX_USERS})! Registered users:\n${userList}`);
            }, 500);
        }
        
        // Clear form
        Email2.value = "";
        username.value = "";
        password2.value = "";
        agree.checked = false;
    });

    // Helper functions
    function showError(element, message) {
        element.innerHTML = message;
        element.style.color = "red";
        element.style.display = "block";
    }
    
    function showSuccess(element, message) {
        element.innerHTML = message;
        element.style.color = "green";
        element.style.display = "block";
    }
    
    function clearMessages() {
        p.style.display = "none";
        preg.style.display = "none";
        popMsg.style.display = "none";
    }
});
// Get the Remember Me checkbox element
const rememberMe = document.getElementById('remember-me');

// Check if there are saved credentials and the checkbox was checked
document.addEventListener("DOMContentLoaded", function() {
    const savedEmail = localStorage.getItem('rememberedEmail');
    const savedPassword = localStorage.getItem('rememberedPassword');
    const rememberStatus = localStorage.getItem('rememberMeStatus');
    
    if (savedEmail && savedPassword && rememberStatus === 'true') {
        Email1.value = savedEmail;
        password1.value = savedPassword;
        rememberMe.checked = true;
    }
});

// Modify your existing login button event handler
LoginBtn2.addEventListener("click", function() {
    let emailValue = Email1.value.trim();
    let passwordValue = password1.value.trim();

    // ... (your existing validation code)

    // If login is successful and "Remember Me" is checked
    if (rememberMe.checked) {
        // Save credentials to localStorage
        localStorage.setItem('rememberedEmail', emailValue);
        localStorage.setItem('rememberedPassword', passwordValue);
        localStorage.setItem('rememberMeStatus', 'true');
    } else {
        // Clear saved credentials if "Remember Me" is not checked
        localStorage.removeItem('rememberedEmail');
        localStorage.removeItem('rememberedPassword');
        localStorage.setItem('rememberMeStatus', 'false');
    }

    // ... (rest of your login logic)
});

// Optional: Add a "Forgot Password" link handler
document.getElementById('forgot-password')?.addEventListener('click', function(e) {
    e.preventDefault();
    localStorage.removeItem('rememberedEmail');
    localStorage.removeItem('rememberedPassword');
    localStorage.setItem('rememberMeStatus', 'false');
    alert('Saved credentials have been cleared. Please enter your email to reset your password.');
});