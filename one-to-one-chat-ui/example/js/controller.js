const controller = {};

controller.register = async (registerInfo) => {
  if (!registerInfo.firstName) {
    view.setMessage('firstName-error', 'Please input your first name');
  } else {
    view.setMessage('firstName-error', '');
  }
  if (!registerInfo.lastName) {
    view.setMessage('lastName-error', 'Please input your last name');
  } else {
    view.setMessage('lastName-error', '');
  }
  if (!registerInfo.email) {
    view.setMessage('email-error', 'Please input your email');
  } else {
    view.setMessage('email-error', '');
  }
  if (!registerInfo.password) {
    view.setMessage('password-error', 'Please input your password');
  } else {
    view.setMessage('password-error', '');
  }
  if (!registerInfo.confirmPassword || registerInfo.confirmPassword !== registerInfo.password) {
    view.setMessage('confirmPassword-error', 'Confirm password didnt match');
  } else {
    view.setMessage('confirmPassword-error', '');
  }

  if (registerInfo.firstName && registerInfo.lastName && registerInfo.email && registerInfo.password && registerInfo.confirmPassword === registerInfo.password) {
    try {
      await firebase.auth().createUserWithEmailAndPassword(registerInfo.email, registerInfo.password);

      firebase.auth().currentUser.updateProfile({
        displayName: `${registerInfo.firstName} ${registerInfo.lastName}`,
      })

      firebase.auth().currentUser.sendEmailVerification();
      view.setMessage('form-success', 'Register success');
    } catch (error) {
      view.setMessage('form-error', error.message)
    }
  }
};

controller.login = async (loginInfo) => {
  if (!loginInfo.email) {
    view.setMessage('email-error', 'Please input your email');
  } else {
    view.setMessage('email-error');
  }
  if (!loginInfo.password) {
    view.setMessage('password-error', 'Please input your password');
  } else {
    view.setMessage('password-error');
  }

  // call firebase
  if (loginInfo.email && loginInfo.password) {
    try {
      const loginResult = await firebase.auth().signInWithEmailAndPassword(loginInfo.email, loginInfo.password);

      if (!loginResult.user.emailVerified) {
        view.setMessage('form-error', 'Please verify your email first');
      } else {
        model.loginSuccess({
          uid: loginResult.user.uid,
          displayName: loginResult.user.displayName,
          email: loginResult.user.email,
        });

        view.setActiveScreen('chat');
      }
    } catch (error) {
      view.setMessage('form-error', error.message)
    }
  }
};

controller.addMessage = (newMessage) => {
  const yourMessage = {
    content: newMessage,
    user: model.authUser.email
  };

  const echoBotMessage = {
    content: newMessage,
    user: 'Echo Bot'
  };

  view.addMessage(yourMessage);
  view.addMessage(echoBotMessage);
};