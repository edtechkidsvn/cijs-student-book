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
    view.setMessage('confirmPassword-error', `Confirm password didn't match`);
  } else {
    view.setMessage('confirmPassword-error', '');
  }

  // make sure all user information is correct
  if (registerInfo.firstName && registerInfo.lastName && registerInfo.email && registerInfo.password && registerInfo.confirmPassword === registerInfo.password) {
    try {
      // create an user account with createUserWithEmailAndPassword()
      const newUser = await firebase.auth().createUserWithEmailAndPassword(registerInfo.email, registerInfo.password);

      // if create user success => update user displayName
      firebase.auth().currentUser.updateProfile({
        displayName: `${registerInfo.firstName} ${registerInfo.lastName}`,
      });

      // finally, we send a verify email to user's email address
      firebase.auth().currentUser.sendEmailVerification();
    } catch (error) {
      console.log(error);
    }
  }
};

controller.login = async (loginInfo) => {
  // validate email + password
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
      // sign in user with email + password
      const loginResult = await firebase.auth().signInWithEmailAndPassword(loginInfo.email, loginInfo.password);

      // after sign in, check if user email is verified
      if (!loginResult.user.emailVerified) {
        view.setMessage('email-error', 'Please verify your email first');
      } else {
        // save user info to model
        model.loginSuccess({
          uid: loginResult.user.uid,
          displayName: loginResult.user.displayName,
          email: loginResult.user.email,
        });

        // change screen
        view.setActiveScreen('chat');
      }
    } catch (error) {
      console.log(error);
    }
  }
};