const view = {};

view.setMessage = (elementId, message = '') => {
  document.getElementById(elementId).innerText = message;
}

view.setActiveScreen = (screenName) => {
  switch (screenName) {
    case 'register':
      // mount register screen
      document.getElementById('app').innerHTML = components.register;

      // add already-have-account button listeners
      document.getElementById('already-have-account').addEventListener('click', () => view.setActiveScreen('login'));

      // listen to form submit
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
      break;

    case 'login':
      // mount login screen
      document.getElementById('app').innerHTML = components.login;

      // add register button listeners
      document.getElementById('create-account-button').addEventListener('click', () => view.setActiveScreen('register'));

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
      break;

    case 'chat':
      // mount chat screen
      document.getElementById('app').innerHTML = components.chat;

      // add message form listener
      const messageForm = document.getElementById('message-form');
      messageForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const newMessage = messageForm.message.value;
        controller.addMessage(newMessage);

        messageForm.message.value = '';
      });

      // create conversation listener
      document.getElementById('create-conversation').addEventListener('click', () => view.setActiveScreen('createConversation'));

      // remove notification
      document.getElementById('message-input').addEventListener('click', () => view.removeNotification(model.activeConversation.id));

      // load conversations
      model.loadConversations();
      break;

    case 'createConversation':
      // mount createConversation screen
      document.getElementById('app').innerHTML = components.createConversation;

      // listen to "Cancel" button
      document.getElementById('cancel-create-conversation').addEventListener('click', () => view.backToChatScreen());

      // listen to form submit
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

view.addMessage = (messageObject) => {
  const messageContainer = document.createElement('div');
  messageContainer.classList.add('message-container');

  const message = document.createElement('div');
  message.classList.add('message');
  message.innerText = messageObject.content;

  if (messageObject.user === model.authUser.email) {
    messageContainer.classList.add('your');
  } else {
    const sender = document.createElement('div');
    sender.classList.add('sender');
    sender.innerText = messageObject.user;
    messageContainer.appendChild(sender);
  }

  messageContainer.appendChild(message);
  document.getElementById('conversation-messages').appendChild(messageContainer);
};

view.addConversation = (conversationObj) => {
  const conversationName = document.createElement('span');
  conversationName.innerText = conversationObj.name;

  const conversationNoti = document.createElement('span');
  conversationNoti.classList.add('notification');
  conversationNoti.innerText = 'new';

  const conversationContainer = document.createElement('div');
  conversationContainer.classList.add('conversation');
  conversationContainer.id = conversationObj.id;
  conversationContainer.appendChild(conversationName);
  conversationContainer.appendChild(conversationNoti);

  if (conversationObj.id === model.activeConversation.id) {
    conversationContainer.classList.add('selected-conversation');
  }

  conversationContainer.addEventListener('click', () => {
    view.removeNotification(conversationObj.id);
    controller.changeActiveConversation(conversationObj.id);
  });

  document.getElementById('conversation-list').appendChild(conversationContainer);
};

view.changeActiveConversation = () => {
  // change conversation Name
  document.getElementById('conversation-name').innerText = model.activeConversation.name;

  // change selected conversation style
  document.querySelector('.selected-conversation').classList.remove('selected-conversation');
  document.getElementById(model.activeConversation.id).classList.add('selected-conversation');

  // re-render messages
  document.getElementById('conversation-messages').innerHTML = '';
  for (let message of model.activeConversation.messages) {
    view.addMessage(message);
  }
};

view.backToChatScreen = () => {
  // mount chat screen
  document.getElementById('app').innerHTML = components.chat;

  // add message form listener
  const messageForm = document.getElementById('message-form');
  messageForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const newMessage = messageForm.message.value;
    controller.addMessage(newMessage);

    messageForm.message.value = '';
  });

  // create conversation listener
  document.getElementById('create-conversation').addEventListener('click', () => view.setActiveScreen('createConversation'));

  for (let conversation of model.conversations) {
    view.addConversation(conversation);
  }
  for (let message of model.activeConversation.messages) {
    view.addMessage(message);
  }
};

view.showNotification = (conversationId) => {
  const conversation = document.getElementById(conversationId);
  conversation.lastChild.style.display = 'inline-block';
};

view.removeNotification = (conversationId) => {
  const conversation = document.getElementById(conversationId);
  conversation.lastChild.style.display = 'none';
};