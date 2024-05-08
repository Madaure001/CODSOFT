function handleErrorInput (data)  {
    const username = data.username;
    const password = data.password;
    const confirmPassword = data.confirmPassword;
    const email = data.email;
    const type = data.type;
    
    if (!username || !password || !confirmPassword || !email || !type) {
        console.log({ error: "Please fill in all fields" });        
        return false;
    };
    if (password.length < 8) {          //check password lengthz
        console.log({ error: "Password must be at least 8 characters" });
        return false;
    };
    if (password !== confirmPassword) { //check if passwords match
        console.log({ error: "Passwords do not match" });
        return false;
    };  
    if (!type ) { //check if passwords match
        console.log({ error: "Account type cannont be empty" });
        return false;
    }; 
      
    if (username.length < 6) {          //check username length
        console.log({ error: "username must be at least 6 characters" });
        return false;
    };
    const pattern = /^[a-zA-Z0-9]+$/;
    const patternName = /^[a-zA-Z ]+$/;

    if (!pattern.test(username)) {      //check username for special characters
        console.log({ error: "Username cannot have special characters" });        
        return false;
    };
    return true; 
}
module.exports = handleErrorInput;