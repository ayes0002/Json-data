var user; // global variable to keep json info
var i = 0; // 

document.addEventListener("DOMContentLoaded", function () {
    "use strict";
    document.querySelector("#loadBtn").addEventListener("click", load);
    
    document.querySelector("#showBtn").addEventListener("click", showData);
});
    
function load() {
    "use strict";
    var req = new XMLHttpRequest();
    req.open('GET', 'users.json', true);
    req.onreadystatechange = function () {
        if (req.readyState === 4) {
            if (req.status === 200) {
                //we have the info.xml page loaded
                console.log(req.responseText);
                user = JSON.parse(req.responseText);
                //the req object will contain two main properties - req.responseText and req.responseXML
                //responseText is used for JSON. 
                //responseXML is used for XML.
            }
        }
    };
    req.send(null);
    document.getElementById("showBtn").className = "btn enabled";
    document.getElementById("loadBtn").className = "btn disabled";
}
function remove() {
    "use strict";
    document.querySelector("#loadBtn").removeEventListener("click", load); // remove eventlistener
}

function showData() {
    "use strict";
    var outputOne = document.querySelector("#output1");
    var outputTwo = document.querySelector("#output2");
    var c = 0;
    if (i === user.length) { // doesnt allow the function to perform anything because the list is over
        return;
    }
    var firstname = user[i].firstName.charAt(0).toUpperCase() + user[i].firstName.substr(1).toLowerCase();
    var lastname = user[i].lastName.charAt(0).toUpperCase() + user[i].lastName.substr(1).toLowerCase();
    
    if (i > 0) {
        document.getElementById("showBtn").innerHTML = "Show Next";
        var j = i - 1;
        while (i > 3 && c <= 2) {
            outputTwo.removeChild(outputTwo.childNodes[3]); // removes the first person in list
            c += 1;
        }
        
        var firstname2 = user[j].firstName.charAt(0).toUpperCase() + user[j].firstName.substr(1).toLowerCase();
        var lastname2 = user[j].lastName.charAt(0).toUpperCase() + user[j].lastName.substr(1).toLowerCase();
        
        for (j; j < i; j += 1) {
            
            var thumb = document.createElement("img");
            thumb.src = user[j].thumbnail;
            outputTwo.appendChild(thumb);
            
            var e = document.createElement("a");
            e.innerHTML = firstname2 + " " + lastname2;
            e.href = "mailto:" + user[j].email;
            outputTwo.appendChild(e);
            
            var linebreak = document.createElement("br");
            outputTwo.appendChild(linebreak);     
        }
    }
    
    outputOne.innerHTML = "<img id='profile'>"; //prints image
    document.getElementById("profile").src = user[i].image;

    var h2 = document.createElement("h2");
    h2.innerHTML = firstname + " " + lastname; // prints name
    outputOne.appendChild(h2);
    
    var email = document.createElement("a");
    email.innerHTML = user[i].email; // prints the email
    email.href = "mailto:" + user[i].email; // prints the hyperlink
    outputOne.appendChild(email);

    i += 1;
}