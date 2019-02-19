const components = {};

components.register = `
  <div class='register-container'>
    <div class='form-wrapper'>
      <div class='logo'>
        <span>Techkids Chat</span>
      </div>

      <div class='form-container'>
        <form id='register-form'>
          <div class='name-wrapper'>
            <div class='input-wrapper'>
              <input class='input' type="text" name="firstName" placeholder="First name" />
              <div id='firstName-error' class='error'></div>
            </div>
            <div class='input-wrapper'>
              <input class='input' type="text" name="lastName" placeholder="Last name" />
              <div id='lastName-error' class='error'></div>
            </div>
          </div>

          <div class='input-wrapper'>
            <input class='input' type="email" name="email" placeholder="Email" />
            <div id='email-error' class='error'></div>
          </div>

          <div class='input-wrapper'>
            <input class='input' type="password" name="password" placeholder="Password" />
            <div id='password-error' class='error'></div>
          </div>

          <div class='input-wrapper'>
            <input class='input' type="password" name="confirmPassword" placeholder="Confirm password" />
            <div id='confirmPassword-error' class='error'></div>
          </div>

          <div id='form-error' class='form-error'></div>
          <div id='form-success' class='form-success'></div>

          <div class='input-wrapper register-footer'>
            <a id='already-have-account'>Already have an account? Login</a>
            <button class='btn' type='submit'>
              <span>Register</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
`;

components.login = `
  <div class='login-container'>
    <div class='form-wrapper'>
      <div class='logo'>
        <span>Techkids Chat</span>
      </div>

      <div class='form-container'>
        <form id='login-form'>
          <div class='input-wrapper'>
            <input class='input' type="email" name="email" placeholder="Email" />
            <div id='email-error' class='error'></div>
          </div>

          <div class='input-wrapper'>
            <input class='input' type="password" name="password" placeholder="Password" />
            <div id='password-error' class='error'></div>
          </div>

          <div id='form-error' class='form-error'></div>

          <div class='input-wrapper login-footer'>
            <a id='create-account-button' class='login-register'>Create an account</a>
            <button class='btn' type='submit'>
              <span>Login</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
`;

components.chat = `
  <div class='chat-container'>
    <div class='header'>
      Techkids Chat
    </div>

    <div class='main'>
      <div class='conversation-list' id='conversation-list'>
        <div class='create-conversation'>
          <button id='create-conversation' class='btn'> + New Conversation</button>
        </div>
      </div>

      <div class='conversation-detail'>
        <div id='conversation-name' class='conversation-header'>
        </div>

        <div class='conversation-messages' id='conversation-messages'>
        </div>

        <form name='message-form' id='message-form'>
          <div class='conversation-input'>
            <input id='message-input' name='message' placeholder='Type a message ...'></input>
            <button class='button' type='submit'>Send</button>
          </div>
        <form>
      </div>
    </div>
  </div>
`;

components.createConversation = `
  <div class='create-conversation-container'>
    <div class='header'>
      Techkids Chat
    </div>

    <div class='main'>
      <h3>Create a new conversation</h3>
      <form id='create-conversation-form' class='conversation-form'>
        <div class='input-wraper'>
          <input class='input' id='conversationName' name='conversationName' placeholder='Conversation name'></input>
          <div id='conversation-name-error' class='error'></div>
        </div>

        <div class='input-wraper'>
          <input class='input' id='friendEmail' name='friendEmail' placeholder='Friend email'></input>
          <div id='friend-email-error' class='error'></div>
        </div>
        <div>
          <button class='btn' type='submit'>Create</button>
          <button class='btn' id='cancel-create-conversation'>Cancel</button>
        </div>
      </form>
    </div>
  </div>
`;