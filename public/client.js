const socket = io();
let name;
let textarea = document.querySelector('#textarea');
let messageArea = document.querySelector('.message__area');

do {
    name = prompt('Please enter your name: ');
} while (!name);

function sendMessage() {
    let message = textarea.value.trim();
    if (message !== '') {
        let msg = {
            user: name,
            message: message,
        };
        // Append
        appendMessage(msg, 'outgoing');
        textarea.value = '';
        scrollToBottom();

        // Send to server
        socket.emit('message', msg);
    }
}

function appendMessage(msg, type) {
    let mainDiv = document.createElement('div');
    let className = type;
    mainDiv.classList.add(className, 'message');

    let markup = `
        <h4>${msg.user}</h4>
        <p>${msg.message}</p>
    `;
    mainDiv.innerHTML = markup;
    messageArea.appendChild(mainDiv);

    // Add the animation class to the new message
    mainDiv.classList.add('animate__fadeIn');
    setTimeout(() => {
        mainDiv.classList.remove('animate__fadeIn');
    }, 1000); // Remove the animation class after 1000ms (adjust the time according to the animation duration)
}

// Receive messages
socket.on('message', (msg) => {
    appendMessage(msg, 'incoming');
    scrollToBottom();
});

// Event listener for clicking the SVG icon (send button)
const sendIcon = document.getElementById('sendIcon');
sendIcon.addEventListener('click', sendMessage);

function scrollToBottom() {
    messageArea.scrollTop = messageArea.scrollHeight;
}
