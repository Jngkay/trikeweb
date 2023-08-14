/*Sidebar dashboard and driver */
$(document).ready(function() {
    $('.reveal-content').click(function(event) {
        event.preventDefault();
        var target = $(this).data('target');

        $('.page').removeClass('active');
        $('#' + target).addClass('active');
    });

    $('#dashboard').addClass('active');
});

// Logout button click event
$(document).ready(function() {
    // Logout button click event
    $("#logout").click(function() {
        firebase.auth().signOut()
            .then(function() {
                // Successful logout
                console.log("Logged out successfully");
                window.location.href = "../index.html"; // Redirect to the login page
            })
            .catch(function(error) {
                // Handle logout error
                console.error("Logout error:", error);
            });
    });
});

/* */






