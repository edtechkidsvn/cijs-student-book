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