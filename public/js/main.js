const chatForm = document.getElementById("chat-form"); 
const chatMessage = document.querySelector(".chat-messages");

const socket = io();

// Message from server
socket.on("message", message =>{
  console.log(message);
  outputMessage(message);

  // Scroll down
  chatMessage.scrollTop = chatMessage.scrollHeight;
}); 

// Message submit
chatForm.addEventListener("submit", e=>{
  e.preventDefault();

  // Get message text
  const msg = e.target.elements.msg.value;
 
  
  // Emit message to Server
  socket.emit("chatMessage", msg);

  // clear input
  e.target.elements.msg.value = '';
  e.target.elements.msg.focus();
    
});

// Output message to DOM
function outputMessage(message){
  const div = document.createElement("div");
  div.classList.add("message");
  div.innerHTML = `<p class="meta">Ama<span.9:12pm</span></p>
  <p class="text">
    ${message}
  </p>`;
  document.querySelector(".chat-messages").appendChild(div);
}