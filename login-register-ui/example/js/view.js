const view = {};

view.setMessage = (elementId, message) => {
  document.getElementById(elementId).innerText = message;
}

view.setActiveScreen = (screenName) => {
  switch (screenName) {
    case 'register':
      // mount register screen
      document.getElementById('app').innerHTML = components.register;

      // add register button listeners
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
  }
};