const controller = {};

controller.register = (registerInfo) => {
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
};