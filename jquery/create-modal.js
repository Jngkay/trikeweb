$(document).ready(function() {
    // Get the modal and the buttons
    var modal = $(".modal-wrapper");
    var openModalBtn = $("#addDriverBtn");

    var viewQR = $("#viewQR");

    var closeModalBtn = $("#closeModalBtn");
    var cancelBtn = $("#cancel-btn");
  
    // Open the modal
    openModalBtn.click(function() {
      modal.show();
    });
  
    // Close the modal
    closeModalBtn.click(function() {
      modal.hide();
    });

    cancelBtn.click(function(){
        modal.hide();
    });
  
    // Close the modal if the user clicks outside of it
    $(window).click(function(event) {
      if (event.target === modal[0]) {
        modal.hide();
      }
    });
  });

  

  /*Firebase Function */


  