## CI JS - Student book
### Conversation list UI

Ở bài trước, chúng ta đã hoàn thành phần chat 1v1, 2 người dùng trong cuộc trò chuyện đã có thể gửi tin nhắn cho nhau. Ở bài này và bài tiếp theo, chúng ta sẽ thêm 1 tính năng không thể thiếu của mỗi ứng dụng chat đó là "Conversation list". Tính năng "Conversation list" sẽ cho phép người dùng xem được tất cả các "conversation" mà mình đang tham gia, chuyển đổi gữa các "conversation" và tạo mới conversation. Để hoàn thành tính năng "Conversation list" ta sẽ đi lần lượt qua những bước sau:

    - Dựng phần HTML + CSS cho "Conversation list"
    - Lấy tất cả các "conversation" mà người dùng tham gia từ Firestore => Render ra "Conversation list"
    - Thêm logic cho view để mỗi khi người dùng chuyển đổi "conversation", khung chat sẽ được render lại tương ứng
    - Dựng HTML + CSS cho màn hình tạo "conversation"
    - Update model để lưu "conversation" người dùng tạo lên Firestore

**I. Mục tiêu bài học**
1. Dựng khung HTML, CSS cho "Conversation List"

2. Render ra "Conversation list" từ những "conversation" mà người dùng tham gia

3. Update view để cho phép người dùng chuyển đổi giữa các "conversation"

4. Dựng khung HTML, CSS cho màn hình tạo mới "conversation"

**II. Dựng khung HTML, CSS cho "Conversation List"**
- Phần "Conversation List" của chúng ta sẽ nằm trong màn hình `chat`, ngay bên cạnh khung chat như sau:
    ![Conversation list 1](/conversation-list-ui/conversation-list-1.png)

1. Update lại `html` của phần `chat` trong file `components.js` 
    - Chúng ta sẽ thêm 1 thẻ `div.conversation-list` nằm ngay trên thẻ `div.conversation-detail`

    ```html
      <div class='conversation-list' id='conversation-list'>
        <div class='create-conversation'>
          <button id='create-conversation' class='btn'> + New Conversation</button>
        </div>
      </div>
    ```

2. Update style trong file `chat.css`
    - Đầu tiên, ta cần update lại style của thẻ `div.main` để có được layout như thiết kế

    ```css
      .chat-container .main {
        height: calc(100% - 64px);
        display: grid;
        grid-template-columns: 25% 75%;
        grid-template-rows: 100%;
      }
    ```

    - Tiếp theo, thêm style cho phần `html` mới

    ```css
      .chat-container .main .conversation-list {
        border-right: 1px solid #e9e9e9;
      }

      .chat-container .main .conversation-list .conversation {
        height: 64px;
        line-height: 64px;
        padding-left: 12px;
        font-size: 16px;
        cursor: pointer;
        display: flex;
        justify-content: space-between;
        align-items: center;
      }

      .chat-container .main .conversation-list .selected-conversation {
        background-color: rgba(0, 0, 0, .05);
      }

      .chat-container .main .conversation-list .create-conversation {
        height: 64px;
        line-height: 64px;
        padding-left: 12px;
        border-bottom: 1px solid #e9e9e9;
        text-align: center;
      }
    ```

    - Chú ý: style của class `.conversation` và `.selected-conversation` sẽ được sử dụng sau, vì đây là 2 thẻ `div` sẽ được tạo bởi hàm trong file `view.js` chứ không có sẵn từ đầu trong phần `html`

**III. Render "Conversation list" từ những "conversation" mà người dùng tham gia**
- Ở bài trước, ta đã lấy được danh sách các "conversation" mà người dùng tham gia và lưu vào biến `model.conversations`. Từ đây, ta có thể dễ dàng render ra "Conversation list" bằng cách update hàm `model.loadConversations()` để hàm này gọi `view.addConversation()` như sau:

    ```js
      ...

      model.conversations = conversations;
      model.activeConversation = conversations[0];

      for (let message of model.activeConversation.messages) {
        view.addMessage(message);
      }
      for (let conversation of model.conversations) {
        view.addConversation(conversation);
      }

      ...
    ```

- Nhiệm vụ tạo `html` và render sẽ do `view.addConversation()` đảm nhiệm:

    ```js
      view.addConversation = (conversationObj) => {
        const conversationName = document.createElement('span');
        conversationName.innerText = conversationObj.name;

        const conversationContainer = document.createElement('div');
        conversationContainer.classList.add('conversation');
        conversationContainer.id = conversationObj.id;
        conversationContainer.appendChild(conversationName);

        if (conversationObj.id === model.activeConversation.id) {
          conversationContainer.classList.add('selected-conversation');
        }

        document.getElementById('conversation-list').appendChild(conversationContainer);
      };
    ```

**IV. Cho phép người dùng chuyển đổi giữa các "conversation"**
- Để cho phép người dùng chuyển đổi giữa các "conversation" ta sẽ bắt sự kiện `click` vào mỗi item trên "conversation list". Mỗi khi có 1 "conversation" được `click`, ta sẽ update `model.activeConversation` đồng thời render lại các message trong khung chat

1. Bắt sự kiện `click` của item trên "conversation list"
    - Mỗi khi 1 item trên "conversation list" được `click`, ta sẽ gọi hàm `controller.changeActiveConversation()` để cập nhật `model.activeConversation`

    ```js
      view.addConversation = (conversationObj) => {
        ...

        conversationContainer.addEventListener('click', () => {
          controller.changeActiveConversation(conversationObj.id);
        });

        document.getElementById('conversation-list').appendChild(conversationContainer);
      };
    ```

2. Thêm hàm `controller.changeActiveConversation()`
    - Hàm `controller.changeActiveConversation()` chỉ đơn giản làm nhiệm vụ gọi hàm `model.changeActiveConversation()` để cập nhật `model.activeConversation`

    ```js
      controller.changeActiveConversation = (newActiveConversationId) => {
        model.changeActiveConversation(newActiveConversationId);
      };
    ```

3. Thêm hàm `model.changeActiveConversation()`
    - Hàm `model.changeActiveConversation()` sẽ update lại biến `model.activeConversation`, sau đó gọi "view" để thay đổi UI

    ```js
      model.changeActiveConversation = (newActiveConversationId) => {
        model.activeConversation = model.conversations.filter((item) => item.id === newActiveConversationId)[0];
        view.changeActiveConversation();
      };
    ```

4. Thêm hàm `view.changeActiveConversation()`
    - Hàm `view.changeActiveConversation()` của chúng ta sẽ cần làm 3 nhiệm vụ:
      - Thay đổi tên cuộc trò truyện phía ngay trên khung chat
      - Thay đổi style của class `.selected-conversation` trên "conversation list"
      - Thay đổi các tin nhắn tương ứng trong khung chat

    ```js
      view.changeActiveConversation = () => {
        // change conversation Name
        document.getElementById('conversation-name').innerText = model.activeConversation.name;

        // change selected conversation style
        document.querySelector('.selected-conversation').classList.remove('selected-conversation');
        document.getElementById(model.activeConversation.id).classList.add(selected-conversation);

        // re-render messages
        document.getElementById('conversation-messages').innerHTML = '';
        for (let message of model.activeConversation.messages) {
          view.addMessage(message);
        }
      };
    ```  

**V. Dựng HTML, CSS cho màn hình tạo "conversation"**
- Tạo "conversation" là 1 tính năng gần như không thể thiếu trong mỗi ứng dụng chat. Nó cho phép bạn tạo ra những "conversation" với mục đích khác nhau và bao gồm các thành viên khác nhau. Trong ứng dụng chat chúng ta đang thực hiện, màn hình tạo "conversation" sẽ như sau:
    ![Create Conversation 1](/conversation-list-ui/create-conversation-1.png)
    ![Create Conversation 2](/conversation-list-ui/create-conversation-2.png)

    - Bắt sự kiện `click` của button "Create conversation" và chuyển sang màn hình tạo cuộc trò truyện khi sự kiện xảy ra
    - Nếu người dùng điền thông tin và chọn "Create" (submit form) => Validate input => Lưu lại thông tin trên Firestore
    - Nếu người dùng chọn "Cancel" => Quay trở lại màn hình chat

1. Bắt sự kiện `click` của button "Create conversation"
    - Update hàm view.setActiveScreen() như sau:

    ```js
      view.setActiveScreen = (screenName) => {
        ...
        case 'chat':
          ...

          // create conversation listener
          document.getElementById('create-conversation').addEventListener('click', () => view.setActiveScreen('createConversation');
          
          ...
      };
    ```

2. Thêm phần HTML cho màn hình `createConversation` vào file `components.js`

    ```js
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
    ```

3. Tạo file `create-conversation.css` trong folder `css` và thêm style cho màn hình `createConversation`

    ```css
      .create-conversation-container .header {
        height: 64px;
        color: #ffffff;
        background-color: #4482FF;
        line-height: 64px;
        font-size: 24px;
        text-align: center;
      }

      .create-conversation-container .main {
        margin: 64px 20%;
      }

      .create-conversation-container .main h3 {
        font-size: 32px;
      }

      .create-conversation-container .conversation-form {
        margin: 32px 0px;
      }

      .create-conversation-container .input {
        margin-top: 24px;
      }

      .create-conversation-container .conversation-form button {
        margin-top: 24px;
      }

      #cancel-create-conversation {
        background-color: #ffffff;
        color: #595959;
        border: 1px solid #e9e9e9;
      }
    ```

    - Link file `create-conversation.css` vào file `index.html`

    ```html
      <link rel='stylesheet' type='text/css' href='../css/create-conversation.css' />
    ```

4. Update hàm `view.setActiveScreen()` để render màn hình `createConversation`
    ![Create Conversation 2](/conversation-list-ui/create-conversation-2.png)

    - Trong màn hình `createConversation` chúng ta sẽ cần bắt sự kiện `submit` của form để tạo conversation mới và sự kiện `click` của button "Cancel" để quay trở lại màn hình chat. Update hàm `view.setActiveScreen()` như sau:

    ```js
      view.setActiveScreen = (screenName) => {
        ...
        case 'createConversation':
          // mount createConversation screen
          document.getElementById('app').innerHTML = components.createConversation;

          // listen to "Cancel" button
          document.getElementById('cancel-create-conversation').addEventListener('click', () => view.backToChatScreen());

          // listen to form submit
          const createConversationForm = document.getElementById('create-conversation-form');
          createConversationForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const conversationName = createConversationForm.conversationName.value;
            const friendEmail = createConversationForm.friendEmail.value;

            controller.createConversation({
              conversationName,
              friendEmail,
            });
          });
          break;
      };
    ```

5. Thêm hàm `view.backToChatScreen()`
    - Trong trường hợp người dùng đang ở trong màn hình `createConversation` và chọn "Cancel", lúc này ta sẽ chuyển ngược lại màn hình `chat` bằng hàm `view.backToChatScreen()` như sau:

    ```js
      view.backToChatScreen = () => {
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

        // create conversation listener
        document.getElementById('create-conversation').addEventListener('click', () => view.setActiveScreen('createConversation'));

        for (let conversation of model.conversations) {
          view.addConversation(conversation);
        }
        for (let message of model.activeConversation.messages) {
          view.addMessage(message);
        }
      };
    ```

    - Hàm `view.backToChatScreen()` sẽ gần tương tự như hàm `view.setActiveScreen()` ngoại trừ việc chúng ta không gọi `model.loadConversations()` nữa vì hàm này chỉ cần gọi 1 lần sau khi người dùng đăng nhập thành công

- Bài tập: Tạo hàm `controller.createConversation()` trong file `controller.js`. Bên trong hàm này, tiến hành validate input và hiện ra thông báo giống như Form đăng kí


*Nội dung của các files sau bài này: [Conversation list UI](example)*

*Bài tiếp theo: [Firestore For Conversation List](firestore-for-conversation-list/firestore-for-conversation-list-ui.md)*