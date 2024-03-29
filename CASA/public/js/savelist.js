// @author Felix
//Global variable pointing to the current user's Firestore document
var currentUser;   
var bookmarks;
var saveListPlaceholderReplacement = "";

//Function that calls everything needed for the main page  
function doAll() {
    firebase.auth().onAuthStateChanged(user => {
        if (user) {
            currentUser = db.collection("user").doc(user.uid); //global
            console.log("user.uid: " + user.uid);


            insertSavedTips();
        } else {
            // No user is signed in.
            console.log("No user is signed in");
            window.location.href = "../../app/html/login.html"; //redirects to the login page
        }
    });
}
doAll();

// Display user's saved tips
function insertSavedTips() {
    currentUser.get().then(userDoc => {
        var bookmarks = userDoc.data().bookmarks; // holds the array of saved tips firebase IDs

        for (let i = 0; i < bookmarks.length; i++) {
            // console.log(bookmarks[i]);
            let buttonText = bookmarks[i].substring(0,1).toUpperCase() + bookmarks[i].substring(1,3) 
            + "s for " + bookmarks[i].substring(3);
            saveListPlaceholderReplacement += "<button title=\"Read Tip\" id=\""+bookmarks[i]+"\" class=\"goToTipButton\">"
            + buttonText + "</button>"; 
        }

        // console.log(saveListPlaceholderReplacement);

        // replace saveListPlaceholder
        document.getElementById("saveListPlaceholder").innerHTML = saveListPlaceholderReplacement; 
      
        makeTipButtonsClickable(); // calls next function
    })
}

// add event listeners to the tip buttons
function makeTipButtonsClickable() {
    // Get all the buttons with class="tip"
    const tipButtons = document.querySelectorAll('button.goToTipButton');
  
    // Add an event listener to each tip button
    tipButtons.forEach(button => {

      button.addEventListener('click', function() {
        
        // Get the ID of the button's parent element
        let buttonId = button.id;
  
        // Push the button ID to local storage
        localStorage.setItem('firebaseTipID', buttonId);
  
        // Redirect to the tips page
        window.location.href = `../../app/html/tips.html`;
      });
    });
  }
