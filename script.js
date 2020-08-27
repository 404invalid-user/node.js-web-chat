const socket = io('http://localhost:3000')
const messageContainer = document.getElementById('message-container')
const messageForm = document.getElementById('send-container')
const messageInput = document.getElementById('message-input')

const name = prompt('what is your name?')

const youConnect = document.createElement('div')
youConnect.className += "join"
youConnect.innerText = `you connected`
messageContainer.append(youConnect)


socket.emit('new-user', name)

socket.on('chat-message', data => {
    appendMessage(`${data.name}: ${data.message}`)
})
socket.on('user-connected', name => {
    const connectUser = document.createElement('div')
    connectUser.className += "join"
    connectUser.innerText = `${name} connected`
    messageContainer.append(connectUser)
})
socket.on('user-disconnected', name => {
    const leaveUser = document.createElement('div')
    leaveUser.className += " leave";
    leaveUser.innerText = `${name} disconnected`
    messageContainer.append(leaveUser)
})


messageForm.addEventListener('submit', e => {
    e.preventDefault()
    const message = messageInput.value
    let youmessage = document.createElement('div')
    youmessage.className += "container darker"
    youmessage.innerText = `You: ${message}`
    messageContainer.append(youmessage)

    socket.emit('send-chat-message', message)
    messageInput.value = ''
})

function appendMessage(message) {
    const messageElement = document.createElement('div')
    messageElement.className += "container"
    messageElement.innerText = message
    messageContainer.append(messageElement)
}