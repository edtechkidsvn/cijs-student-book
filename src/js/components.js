const components = {
  login: `
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
            <div class='input-wrapper space-between'>
              <a id='create-account-button' class='login-register'>Create an account</a>
              <button class='btn' type='submit'>
                <div id='loader' class='loader'></div>
                <span>Login</span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  `,
  register: `
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
            <div id='form-success' class='success'></div>
            <div class='input-wrapper space-between'>
              <a id='loggin-button'>Already have an account? Login</a>
              <button class='btn' type='submit'>
                <div id='loader' class='loader'></div>
                <span>Register</span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  `,
  chat: `
    <div class='chat-container'>
      <div class='header'>
        Techkids Chat
      </div>

      <div class='main'>
        <div class='conversations' id='conversation-list'>
          <div class='create-conversation'>
            <button id='create-conversation' class='btn' type='submit'> + New Conversation</button>
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

        <div class='conversation-members' id='conversation-members'>
          <div class='add-member'>
            <input class='input' id='add-member-input' name='memberEmail' placeholder='Email ...'></input>
            <div id='member-email-error' class='error'></div>
            <button class='btn' id='add-member-button'>Add Member</button>
          </div>
          
          <div id='member-list'>
          </div>
        </div>
      </div>
    </div>
  `,
  conversation: `
    <div class='conversation'>
      <span class='notification'>New</span>
    </div>
  `,
  message: `
    <div class='message-container'>
      <div class='message'>
      </div>
    </div>
  `,
  createConversation: `
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
  `,
};