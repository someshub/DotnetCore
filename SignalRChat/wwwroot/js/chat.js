"use strict";

var connection = new signalR.HubConnectionBuilder().withUrl("/chatHub").build();

//Disable send button until connection is established
document.getElementById("sendButton").disabled = true;

connection.on("ReceiveMessage", function (user, message) {
    var msg = message.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
    var user1 = document.getElementById("userInput").innerText;
    var encodedMsg = user + " says " + msg;
    var li = document.createElement("div");
    var d2= document.createElement("div");
    // d2.className="d-flex justify-content-end mb-4"
    // d2.setAttribute("name",user);
    // li.className="msg_cotainer_send";
    li.className=user1;
    var senderForSenderForm = user;//document.getElementById("senderInput").value;
    var senderForReceiverForm = document.getElementById("b1").innerText;
    var receiverForSenderForm = document.getElementById("b1").innerText;
    var receiverForReceiverForm = user;//document.getElementById("senderInput").value;

    if (senderForSenderForm === li.className) {
        d2.className="d-flex justify-content-end mb-4"
        li.className="msg_cotainer_send";
    }
    if (receiverForSenderForm === li.className) {
        d2.className="d-flex justify-content-start mb-4"
        li.className="msg_cotainer";
    }
    if (senderForReceiverForm === li.className) {
        d2.className="d-flex justify-content-end mb-4"
        li.className="msg_cotainer_send";
    }
    if (receiverForReceiverForm === li.className) {
        d2.className="d-flex justify-content-start mb-4"
        li.className="msg_cotainer";
    }

    li.textContent = msg;
    d2.appendChild(li);
    document.getElementById("messagesList").appendChild(d2);
});

connection.start().then(function () {
    document.getElementById("sendButton").disabled = false;
}).catch(function (err) {
    return console.error(err.toString());
});

document.getElementById("sendButton").addEventListener("click", function (event) {
    var user = document.getElementById("userInput").innerText;
    var message = document.getElementById("messageInput").value;
    connection.invoke("SendMessage", user, message).catch(function (err) {
        return console.error(err.toString());
    });
    event.preventDefault();
});

document.getElementById("divbody").addEventListener("onload", function (event) {
    var person = window.prompt("Please enter your name", "..");

if (person != null) {
  document.getElementById("a1").innerHTML = person;
}
	//var person = prompt("Please enter your name", "..");

var person2 = window.prompt("Enter your Fr name", "..");
if (person2 != null) {
 document.getElementById("b1").innerHTML = person;
 document.getElementsByClassName("b").innerHTML = person;
}
    event.preventDefault();
});


//dotnet watch run -p SignalRChat.csproj