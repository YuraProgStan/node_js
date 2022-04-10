const item = 'Chat';
const dataLocal = JSON.parse(localStorage.getItem(item));
const {userName, accessToken, urlImage, userId} = dataLocal;
const logout = document.getElementById('logout');
const btn = document.getElementById('sendMessage');
const sendMessageRoom1 = document.getElementById('sendMessageRoom1');
const sendMessageRoom2 = document.getElementById('sendMessageRoom2');
const btnRoom1 = document.getElementById('btn-room1');
const btnRoom2 = document.getElementById('btn-room2');
const room1 = document.getElementById('room1');
const room2 = document.getElementById('room2');
const writeArea = document.getElementById('writeArea');
const writeAreaRoom1 = document.getElementById('writeAreaRoom1');
const writeAreaRoom2 = document.getElementById('writeAreaRoom2');
const messageInsert = document.getElementById('messageInsert');
const messagesHistory = document.getElementById('messagesHistory');
const scrollDown = document.getElementsByClassName('scrollDown');
const scrollUp = document.getElementsByClassName('scrollUp');
const chat = document.getElementsByClassName('chat')[0];
for (const scrollElement of scrollDown) {
    scrollElement.onclick = () => {
        chat.scrollTop = chat.scrollHeight;
    }
}

for (const scrollElement of scrollUp) {
    scrollElement.onclick = () => {
        chat.scrollTop = 0;
    }
}


//Get axios
(async () => {
    const res = axios({
        method: 'get',
        url: 'http://localhost:5500/chat',
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Credentials': true,
            'Authorization': accessToken ? `${accessToken}` : '',
        },
    });
    const {data} = await res;
    let history = '';
    for (const chatElement of data.messages) {

        history += `<h3>${chatElement.userChat}</h3><img class="awatarImg" src=${chatElement.urlImage} alt="awatar"><p>${chatElement.message}</p><hr/>`
    }
    messagesHistory.innerHTML = history;
})()

//websocket
const socket = io('http://localhost:5500', {query: `userId=${userId}&userName=${userName}&accessToken=${accessToken}&userImage=${urlImage}`});
btn.onclick = () => {
    const messageArea = writeArea.value;
    socket.emit('message:create', {message: messageArea});
}
btnRoom1.onclick = () => {
    socket.emit('join_room', {id: 1})
}

btnRoom2.onclick = () => {
    socket.emit('join_room', {id: 2})
}
sendMessageRoom1.onclick = () =>{
    const messageArea = writeAreaRoom1.value;
    socket.emit('join_room', {id: 1, message: messageArea});
}
sendMessageRoom2.onclick = () =>{
    const messageArea = writeAreaRoom2.value;
    socket.emit('join_room', {id: 2, message: messageArea});
}
socket.on('message: get-all', (data) => {
    const title = document.createElement('h3');
    const p = document.createElement('p');
    const img = document.createElement('img');
    title.innerHTML = data.messages.userName;
    img.src = data.messages.userImage;
    p.innerHTML = data.messages.message + '<hr/>';
    messageInsert.append(title, img, p);
    writeArea.value = "";
    chat.scrollTop = chat.scrollHeight;
})
logout.onclick = () => {
    (async () => {
        const res = axios({
            method: 'post',
            url: 'http://localhost:5500/auth/logout',
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Credentials': true,
                'Authorization': accessToken ? `${accessToken}` : '',
            },
        });
        const {data} = await res;

        if (data === 'Ok') {
            location = "./index.html";
        }

    })()
}

socket.on('user_join_room', (data) => {
    const p = document.createElement('p');
    p.innerHTML = data.messages.message+ '<hr/>';
    switch (data.messages.roomId) {
        case 1:
            room1.appendChild(p);
            break;
        case 2:
            room2.appendChild(p);
            break;
        default:
            return;
    }
})

socket.on('messages_room', (data) => {
    const title = document.createElement('h4');
    const p = document.createElement('p');
    const img = document.createElement('img');
    title.innerHTML = data.messages.userName;
    img.src = data.messages.userImage;
    p.innerHTML = data.messages.message + '<hr/>';
    switch (data.messages.id) {
        case 1:
            room1.append(title, img, p);
            writeAreaRoom1.value = "";
            room1.scrollTop = room1.scrollHeight;
            break;
        case 2:
            room2.append(title, img, p);
            writeAreaRoom2.value = "";
            room2.scrollTop = room2.scrollHeight;
            break;
        default:
            return;
    }

})