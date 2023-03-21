// use API to git list of triggers such as temperature and time of year
    // two types of alertTriggers: 1. weather API forecast event based. 2. time/date of year based

const alertTriggers = ["alertFreeze", "alertHeat"];  // later fill this up based on API, testing right now

// $.ajax({
//     url: '/alerts/',
//     async: false,
//     success: function(data) {
//     $(data).find('a[href$=".html"]').each(function(){
//         const url = $(this).attr('href');
//         $.ajax({
//         url: url,
//         async: false,
//         success: function(data){
//             if($(data).find(TRIGGER).length){
//             alertTriggers.push(url);
//             }
//         }
//         });
//     });
//     }
// });


// determine number of alerts needed to display = number of placeholders need to create
let alertsPlaceholder = "";
for (let alert of alertTriggers) {
    // after iterating through list of alertTriggers, add each one to the placeholder html
    alertsPlaceholder += `<div id="${alert}Placeholder" class="alertPlaceholder"></div>`; 
}


// load individual placeholders inside main weatherAlertPlaceholder
document.getElementById("weatherAlertPlaceholder").innerHTML = alertsPlaceholder;


// replace each placeholder with the actual alert
setTimeout(function() {  // delay function to give time for placeholders to load in
    
    // Get all elements with class="alertPlaceholder"
    const placeholders = document.querySelectorAll('.alertPlaceholder');

    // Loop through each placeholder element
    placeholders.forEach((placeholder) => {
        // Get the id of the placeholder element
        const id = placeholder.getAttribute('id');
    
        // Create a new XMLHttpRequest object
        const xhr = new XMLHttpRequest();
    
        // Set up the callback function to run when the request is complete
        xhr.onreadystatechange = function() {
        if (this.readyState === 4 && this.status === 200) {
            // Replace the contents of the placeholder element with the fetched HTML content
            placeholder.innerHTML = this.responseText;
        }
        };
    
        // Send the AJAX request to fetch the HTML content from the file in the alerts subfolder with the same name as the id
        xhr.open('GET', `/html/alerts/${id}.html`, true);
        xhr.send();
    });
}, 500)





// for (let alert of alertTriggers) {
//     // console.log(alert + '.html');
//     $.ajax({
//     url: alert + '.html',
//     success: function(data) {
//         $(`${alert}`).html;
//     }
//     });
// }




// function displayAlert() {

//     //  loads the page with all alerts regardless of tags
//     $(document).ready(function() {
//         // get number of alert.html files to put on page
//         var numberOfActiveAlerts = 0;
//         $.ajax({
//         url: '/alerts/',
//         async: false,
//         success: function(data) {
//             numberOfActiveAlerts = $(data).find('a[href$=".html"]').length;
//         }
//         });
    
//         // creates placeholders for alerts
//         let alertsPlaceholder = "";
//         for (let n = 1; n <= numberOfActiveAlerts; n++) {
//         alertsPlaceholder += "<a id=\"alert" + n + "\" class=\"alert\"></a>"
//         }
//         document.getElementById("index_container").innerHTML = alertsPlaceholder;
    
//         // subs in each alertx.html for the placeholder
//         for (var i = 1; i <= numberOfActiveAlerts; i++) {
//         $.ajax({
//             url: '/alerts/alert' + i + '.html',
//             success: function(data) {
//             $('#alert' + this.index).html(data);
//             },
//             index: i
//         });
//         }
//         console.log("alerts.js ran successfully.");
//     });


//     let alertsPlaceholder = "";
//     for (let i = 0; i < alertTriggers.length; i++) {
//     alertsPlaceholder += `<a id="alert${i}" class="alert"></a>`;
//     }
//     document.getElementById("index_container").innerHTML = alertsPlaceholder;

//     // subs in each alertx.html for the placeholder
//     for (let i = 0; i < alertTriggers.length; i++) {
//     $.ajax({
//         url: alertTriggers[i],
//         success: function(data) {
//         $(`#alert${i}`).html(data);
//         }
//     });
//     }
  
// }

// displayAlert();

