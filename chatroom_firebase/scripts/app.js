//dom queries
const chatlist = document.querySelector('.chat-list');
const newChatForm = document.querySelector('.new-chat');
const newNameForm = document.querySelector('.new-name');
const updateMssg = document.querySelector('.update-mssg');
const rooms = document.querySelector('.chat-rooms');

//add a new chat
newChatForm.addEventListener('submit', e => {
    e.preventDefault();
    const message = newChatForm.message.value.trim(); //message is id or name from form
    chatroom.addChat(message)
        .then(() => newChatForm.reset())
        .catch((err) => console.log(err));
})

//update username

newNameForm.addEventListener('submit', e => {
    e.preventDefault();
    //update new via chatroom class
    const newName = newNameForm.name.value.trim();
    chatroom.updateName(newName)
    //reset the form
    newNameForm.reset();
    //show then hide the update message
    updateMssg.innerHTML = `<div>Your name was updated to <span class="font-weight-bold">${newName}</span><div>`;
    setTimeout(() => {
        updateMssg.innerText = '';
    }, 3000);
})

//update the chatroom

rooms.addEventListener('click', e => {
    if (e.target.tagName === 'BUTTON') {
        chatUI.clear();
        chatroom.updateRoom(e.target.getAttribute('id'));
        chatroom.getChats(chat => chatUI.render(chat));
    }
})


//check local storage for a name

const username = localStorage.username ? localStorage.username : 'annonymous';

//class instances
const chatUI = new ChatUI(chatlist);
const chatroom = new Chatroom('general', username);


//get chats and render
chatroom.getChats(data => chatUI.render(data));