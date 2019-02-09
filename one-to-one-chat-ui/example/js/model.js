const model = {};

model.authUser = undefined;

model.loginSuccess = (authUser) => {
  model.authUser = authUser;
};