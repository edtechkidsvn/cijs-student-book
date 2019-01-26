const controller = {};

// param: {Object} {email: string, password: string} loginInfo
controller.login = (loginInfo) => {
  // validate email + password
  if (!loginInfo.email) {
    view.displayMessage('email-error', 'Please input your email');
  } else {
    view.removeMessage('email-error');
  }
  if (!loginInfo.password) {
    view.displayMessage('password-error', 'Please input your password');
  } else {
    view.removeMessage('password-error');
  }

  // call firebase
  if (loginInfo.email && loginInfo.password) {
    view.displayLoader();

    firebase.auth().signInWithEmailAndPassword(loginInfo.email, loginInfo.password)
      .then((result) => {
        if (!result.user.emailVerified) {
          view.removeLoader();
          view.displayMessage('form-error', 'Please verify your email first');
        } else {
          // remove loader
          view.removeLoader();

          // udpate model
          model.loginSuccess({
            uid: result.user.uid,
            displayName: result.user.displayName,
            email: result.user.email,
          });

          // change view
          view.setActiveScreen('chat');
        }
      })
      .catch((error) => {
        // remove loader
        view.removeLoader();

        // show error
        view.displayMessage('form-error', error.message);
      });
  }
};

// param: {Object} {firstName: string, lastName: string, email: string, password: string, confirmPassword: string} registerInfo
controller.register = (registerInfo) => {
  // validate name + email + password
  if (!registerInfo.firstName) {
    view.displayMessage('firstName-error', 'Please input your first name');
  } else {
    view.removeMessage('firstName-error');
  }
  if (!registerInfo.lastName) {
    view.displayMessage('lastName-error', 'Please input your last name');
  } else {
    view.removeMessage('lastName-error');
  }
  if (!registerInfo.email) {
    view.displayMessage('email-error', 'Please input your email');
  } else {
    view.removeMessage('email-error');
  }
  if (!registerInfo.password) {
    view.displayMessage('password-error', 'Please input your password');
  } else {
    view.removeMessage('password-error');
  }
  if (!registerInfo.confirmPassword || registerInfo.confirmPassword !== registerInfo.password) {
    view.displayMessage('confirmPassword-error', 'Confirm password didnt match');
  } else {
    view.removeMessage('confirmPassword-error');
  }

  // call firebase
  if (registerInfo.firstName && registerInfo.lastName && registerInfo.email && registerInfo.password && registerInfo.confirmPassword === registerInfo.password) {
    view.displayLoader();

    firebase.auth().createUserWithEmailAndPassword(registerInfo.email, registerInfo.password)
      .then((user) => {
        firebase.auth().currentUser.updateProfile({
          displayName: `${registerInfo.firstName} ${registerInfo.lastName}`,
        })
          .then(() => {
            firebase.auth().currentUser.sendEmailVerification();
            view.removeLoader();
            view.displayMessage('form-success', 'Register success');
          });
      })
      .catch((error) => {
        loader.style.display = 'none';
        document.getElementById('form-error').innerText = error.message;
      });
  }
};

controller.setView = () => {
  view.setActiveScreen('login');
};

// params newMessage: string
controller.addNewMessage = (data) => {
  model.addMessage(data.newMessage);
};

controller.loadConversations = () => {
  model.loadConversations((conversationList, selectedConversation) => {
    for (let conversation of conversationList) {
      view.addConversation(conversation);
    }

    view.loadSelectedConversation(selectedConversation);
  })
}

// params conversationName: string, friendEmail: string
controller.createConversation = (conversationInfo) => {
  // validate
  if (!conversationInfo.conversationName) {
    view.displayMessage('conversation-name-error', 'Please input your conversation name');
  } else {
    view.removeMessage('conversation-name-error');
  }
  if (!conversationInfo.friendEmail) {
    view.displayMessage('friend-email-error', 'Please input your friend email');
  } else {
    view.removeMessage('friend-email-error');
  }

  if (conversationInfo.conversationName && conversationInfo.friendEmail) {
    model.createConversation(conversationInfo)
  }
}

controller.changeSelectedConversation = (newSelectedConversationId) => {
  model.changeSelectedConversation(newSelectedConversationId, (newSelectedConversation) => {
    view.loadSelectedConversation(newSelectedConversation);
  });
};

controller.addMember = (memberEmail) => {
  if (!memberEmail) {
    view.displayMessage('member-email-error', 'Please input email');
  } else {
    view.removeMessage('member-email-error');
  }

  if (memberEmail) {
    model.addMember(memberEmail, (memberEmail) => view.addConversationMember(memberEmail));
  }
}