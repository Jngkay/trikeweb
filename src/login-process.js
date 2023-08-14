/* START: Login Function */
document.getElementById("login-form").addEventListener("submit", function(event) {
    event.preventDefault();
    var email = document.getElementById("email").value;
    var password = document.getElementById("pword").value;
            
    firebase.auth().signInWithEmailAndPassword(email, password)
        .then(function(userCredential) {
            // Handle successful login
            var user = userCredential.user;
            console.log("Logged in:", user.email);
            // You can redirect the user to another page or perform other actions here
            window.location.href = "pages/main.html";

             // Clear browser history
            window.history.replaceState({}, document.title, window.location.href);
        })
        .catch(function(error) {
            // Handle login error
            var errorMessage = error.message;
            console.error("Login error:", errorMessage);
            alert(errorMessage);
            });
});
/*END: Login Function */