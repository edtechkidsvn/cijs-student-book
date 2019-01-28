const view = {};

view.setMessage = (elementId, message) => {
  document.getElementById(elementId).innerText = message;
}

view.setActiveScreen = (screenName) => {
  switch (screenName) {
    case 'login':
      // mount login screen
      document.getElementById('app').innerHTML = components.login;
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
  }
};