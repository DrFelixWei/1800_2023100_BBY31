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
            window.location.href = "/html/login.html";
        }
    });
}
doAll();

// Get savedTips
function insertSavedTips() {
    currentUser.get().then(userDoc => {
        //get the user name
        var bookmarks = userDoc.data().bookmarks;

        for (let i = 0; i < bookmarks.length; i++) {
            console.log(bookmarks[i]);


            saveListPlaceholderReplacement += `<div id="${alert}Placeholder" class="alertPlaceholder"></div>`; 
            // "<button onclick=\""+bookmarks[i]+"()\""+">"+bookmarks[i]+"</button>" + "\n" +
            // "<script>" + "\n" +
            //     "function "+bookmarks[i]+"() {" + "\n" +
            //       "const firebaseTipID = \""+bookmarks[i]+"\";" + "\n" +
            //       "localStorage.setItem('firebaseTipID', firebaseTipID);" + "\n" +
            //       "window.location.href = "+"\"/html/tips.html\""+";" + "\n" +
            //     "}" + "\n" +
            // "</script>";


        }

        console.log(saveListPlaceholderReplacement);

        // replace saveListPlaceholder
        document.getElementById("saveListPlaceholder").innerHTML = saveListPlaceholderReplacement; 
      



    })
}



