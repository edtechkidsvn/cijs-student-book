const view = {};

view.displayLoader = () => {
  const loader = document.getElementById('loader');
  if (loader) {
    loader.style.display = 'inline-block';
  }
};

view.removeLoader = () => {
  const loader = document.getElementById('loader');
  if (loader) {
    loader.style.display = 'none';
  }
};

// param: {string} elementId
// param: {string} message
view.displayMessage = (elementId, message) => {
  console.log(message);
  document.getElementById(elementId).innerText = message;
};

// param: {string} elementId
view.removeMessage = (elementId) => {
  document.getElementById(elementId).innerText = '';
};

// param: {string} screenName
view.setActiveScreen = (screenName) => {
  console.log(model.unListen);

  if (model.unListen) {
    model.unListen();
    model.unListen = undefined;
  }
  switch (screenName) {
    case 'login':
      // mount login screen
      document.getElementById('app').innerHTML = components.login;

      // add form submit listeners
      const loginForm = document.getElementById('login-form');
      loginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const loginInfo = {
          email: loginForm.email.value,
          password: loginForm.password.value,
        };
        controller.login(loginInfo);
      });

      // add register button listeners
      document.getElementById('create-account-button').addEventListener('click', () => view.setActiveScreen('register'));
      break;
    case 'register':
      // mount register screen
      document.getElementById('app').innerHTML = components.register;

      // add form submit listeners
      const registerForm = document.getElementById('register-form');
      registerForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const registerInfo = {
          firstName: registerForm.firstName.value,
          lastName: registerForm.lastName.value,
          email: registerForm.email.value,
          password: registerForm.password.value,
          confirmPassword: registerForm.confirmPassword.value,
        };

        controller.register(registerInfo);
      });

      // add register button listeners
      document.getElementById('loggin-button').addEventListener('click', () => view.setActiveScreen('login'));
      break;
    case 'chat':
      // mount chat screen
      document.getElementById('app').innerHTML = components.chat;

      // handle chat input
      const messageForm = document.getElementById('message-form');
      messageForm.addEventListener('submit', (e) => {
        e.preventDefault();
        if (model.selectedConversation && model.selectedConversation) {
          const newMessage = messageForm.message.value;
          controller.addNewMessage({newMessage});
          messageForm.message.value = '';
        } 
      });

      // add member form
      document.getElementById('add-member-button').addEventListener('click', () => {
        const memberEmail = document.getElementById('add-member-input').value;
        controller.addMember(memberEmail);
        document.getElementById('add-member-input').value = '';
      });
      

      // remove noti
      document.getElementById('message-input').addEventListener('click', () => view.removeNotification(model.selectedConversation.id));

      // handle create conversation button
      document.getElementById('create-conversation').addEventListener('click', () => view.setActiveScreen('createConversation'));

      // load conversation
      controller.loadConversations();
      break;
    case 'createConversation':
      // mount create conversation screen
      document.getElementById('app').innerHTML = components.createConversation;

      // cancle buttton
      document.getElementById('cancel-create-conversation').addEventListener('click', () => view.setActiveScreen('chat'));

      // form handle
      const createConversationForm = document.getElementById('create-conversation-form');
      createConversationForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const conversationName = createConversationForm.conversationName.value;
        const friendEmail = createConversationForm.friendEmail.value;
        controller.createConversation({
          conversationName,
          friendEmail,
        });
      });
      break;
  }
};

view.addMessage = (newMessageObj) => {
  const message = document.createElement('div');
  message.classList.add('message');
  message.innerText = newMessageObj.content;

  const messageContainer = document.createElement('div');
  messageContainer.classList.add('message-container');
  if (newMessageObj.user === model.authUser.email) {
    messageContainer.classList.add('your');
  } else {
    const sender = document.createElement('div');
    sender.classList.add('sender');
    sender.innerText = newMessageObj.user;
    messageContainer.appendChild(sender);
  }
  messageContainer.appendChild(message);

  document.getElementById('conversation-messages').appendChild(messageContainer);
};

view.addConversation = (conversationObj) => {
  console.log(conversationObj);

  const conversation = document.createElement('div');
  conversation.classList.add('conversation');
  conversation.id = conversationObj.id;

  const conversationName = document.createElement('span');
  conversationName.innerText = conversationObj.name;

  const conversationNoti = document.createElement('span');
  conversationNoti.classList.add('notification');
  conversationNoti.innerText = 'new';

  conversation.appendChild(conversationName);
  conversation.appendChild(conversationNoti);
  if (conversationObj.id === model.selectedConversation.id) {
    conversation.classList.add('selected-conversation');
  }
  conversation.addEventListener('click', () => {
    controller.changeSelectedConversation(conversationObj.id);
  });

  document.getElementById('conversation-list').appendChild(conversation);
};

view.addNotification = (conversationId) => {
  const conversation = document.getElementById(conversationId);
  conversation.lastChild.style.display = 'inline-block';
};

view.removeNotification = (conversationId) => {
  if (conversationId) {
    const conversation = document.getElementById(conversationId);
    conversation.lastChild.style.display = 'none';
  }
};

view.addConversationMember = (memberEmail) => {
  const member = document.createElement('div');
  member.classList.add('member');
  member.innerHTML = `<i>#${memberEmail}</i>`;
  document.getElementById('member-list').appendChild(member);
}

view.loadSelectedConversation = (newSelectedConversation) => {
  if (newSelectedConversation && newSelectedConversation.id) {
    // conversation list style of selected conversation
    if (document.querySelector('.selected-conversation')) {
      document.querySelector('.selected-conversation').classList.remove('selected-conversation');
    }
    document.getElementById(newSelectedConversation.id).classList.add('selected-conversation');

    // conversation name
    document.getElementById('conversation-name').innerText = newSelectedConversation.name;

    // conversation message
    document.getElementById('conversation-messages').innerHTML = '';
    for (const item of newSelectedConversation.messages) {
      view.addMessage(item);
    }

    // conversation member
    document.getElementById('member-list').innerHTML = '';
    for (const item of newSelectedConversation.users) {
      view.addConversationMember(item);
    }
  }
};