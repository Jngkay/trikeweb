$(document).ready(function() {
    // Get the modal and the buttons
    var allModal = $(".modal-wrapper");
    var modal = $("#AddDriverModal");
    var qrmodal = $("#qrModalView");

    var openModalBtn = $("#addDriverBtn");
    var viewQR = $(".viewQR");

    var closeModalBtn = $("#closeModalBtn");
    var cancelBtn = $("#cancel-btn");
  
    // Open the modal
    openModalBtn.click(function() {
      modal.show();
    });

    viewQR.click(function() {
      qrmodal.show();
    });
  
    // Close the modal
    closeModalBtn.click(function() {
      allModal.hide();
    });

    cancelBtn.click(function(){
      allModal.hide();
    });
  
    // Close the modal if the user clicks outside of it
    $(window).click(function(event) {
      if (event.target === allModal[0]) {
        allModal.hide();
      }
    });
  });

  

  /*Firebase Function */


  