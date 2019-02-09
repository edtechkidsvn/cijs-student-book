## CI JS - Student book
### One To One Chat UI

**I. Mục tiêu bài học**
1. Xây dựng khung HTML, CSS cho chat app

2. Làm 1 chat bot đơn giản


**II. Dựng khung HTML, CSS cho màn hình chat**
- Để dựng khung HTML, CSS cho màn hình chat, ta sẽ lần lượt đi qua 3 bước:
    - Thêm phần code `html` cho màn hình chat vào file `components.js`
    - Thêm style cho màn hình chat vào file `chat.css`
    - Lắng nghe sự kiện `submit` của message form để render ra message mới

1. Thêm phần code `html` cho màn hình chat vào file `components.js`
    
    ```js
      components.chat = `
        <div class='chat-container'>
          <div class='header'>
            Techkids Chat
          </div>

          <div class='main'>
            <div class='conversation-detail'>
              <div id='conversation-name' class='conversation-header'>
                Techkids Chat
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
    ```

2. Thêm style cho màn hình chat
    - Tạo file `chat.css` trong folder `css`, file này sẽ chứa các style liên quan đến màn hình chat. Link file `chat.css` vào file `index.html`

    ```html
      <link rel='stylesheet' type='text/css' href='../css/chat.css' />
    ```

    - Thêm style cho khung chat như sau

    ```css
      .chat-container {
        height: 100vh;
        overflow: hidden;
      }

      .chat-container .header {
        color: #ffffff;
        background-color: #4482FF;
        height: 64px;
        line-height: 64px;
        font-size: 24px;
        text-align: center;
      }

      .chat-container .main {
        height: calc(100% - 64px);
      }

      .chat-container .main .conversation-detail {
        display: flex;
        flex-direction: column;
        height: 100%;
      }

      .chat-container .main .conversation-detail .conversation-header {
        height: 64px;
        line-height: 64px;
        border-bottom: 1px solid #e9e9e9;
        text-align: center;
        font-size: 20px;
      }

      .chat-container .main .conversation-detail .conversation-messages {
        flex-grow: 1;
        overflow-y: scroll;
        padding: 12px;
      }

      .chat-container .main .conversation-detail .conversation-input {
        display: flex;
        height: 64px;
        line-height: 64px;
        border-top: 1px solid #e9e9e9;
        padding-left: 12px;
      }

      .chat-container .main .conversation-detail .conversation-input input {
        height: 64px;
        flex: 1;
      }

      .chat-container .main .conversation-detail .conversation-input button {
        font-weight: 550;
        margin: 0px 12px;
      }

      .chat-container .main .conversation-detail .conversation-input input:focus {
        outline: none;
      }
    ```

3. Bắt sự kiện `submit` của message form
    - Cập nhật lại hàm `view.setActiveScreen()`, thay vì render ra thông tin của người dùng như ở bài trước, chúng ta sẽ render ra màn hình chat

    ```js
      case 'chat':
        // mount chat screen
        document.getElementById('app').innerHTML = components.chat;
        break;
    ```
    
    - Bắt sự kiện `submit` của message form và gọi `controller.addMessage()` để tạo message mới

    ```js
      case 'chat':
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
        break;
    ```


**III. Làm 1 chat bot đơn giản**
- Ở phần trước, chúng ta đã lấy được nội dung message mà người dùng nhập vào. Tiếp theo, từ nội dung này chúng ta sẽ render ra 1 message trên khung chat.

- Ngoài ra, để ứng dụng chat không bị quá nhàm chán, ta sẽ thêm 1 con bot đơn giản, nhắc lại những gì ta vừa chat

    ![Echo Chat](/one-to-one-chat-ui/echo-chat.png)

1. Tạo phần `html` cho message
    - Phần `html` cho mỗi message sẽ được chia làm 2 trường hợp: Message của mình và message của người khác. Tin nhắn của mình sẽ có background màu xanh và luôn nằm bên tay phải, tin nhắn của người khác sẽ có background xám, nằm trên trái và phía trên sẽ có tên người gửi

    ```html
      <!-- your message -->
      <div class='mesage-container'>
        <div class='message your'>
          Message content
        </div>
      </div>

      <!-- others message -->
      <div class='mesage-container'>
        <div class='sender'>Sender name</div>
        <div class='message'>
          Message content
        </div>
      </div>
    ```

    - Phần `html` này sẽ được tạo mỗi khi hàm `controller.addMessage()` được gọi

2. Thêm style cho message
    - Thêm style cho 2 loại message trong file `chat.css`

    ```css
      .message-container {
        margin: 6px;
        width: 100%;
      }

      .message {
        padding: 6px 12px;
        max-width: 40%;
        background-color: #e9e9e9;
        border-radius: 8px;
        display: inline-block;
      }

      .your {
        text-align: right;
      }

      .your .message {
        direction: ltr;
        text-align: left;
        background: #4482FF;
        color: #ffffff;
      }

      .sender {
        font-size: 10px;
        color: #595959;
      }
    ```

3. Thêm hàm `controller.addMessage()` vào file `controller.js`
    - Hàm `controller.addMessage()` sẽ gọi `view.addMessage()` 2 lần để render 2 message tương ứng với message của người dùng và message của "echo bot"

    ```js
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
    ```

    - Khi gọi hàm `view.addMessage()` chúng ta sẽ truyền thêm thuộc tính `user` (Người chủ của message) để view có thể render ra loại message tương ứng

4. Thêm hàm `view.addMessage()` vào file `view.js`

    ```js
      view.addMessage = (messageObject) => {
        const messageContainer = document.createElement('div');
        messageContainer.classList.add('message-container');

        const message = document.createElement('div');
        message.classList.add('message');
        message.innerText = messageObject.content;

        if (messageObject.user === model.authUser.email) {
          messageContainer.classList.add('your');
        } else {
          const sender = document.createElement('div');
          sender.classList.add('sender');
          sender.innerText = messageObject.user;
          messageContainer.appendChild(sender);
        }

        messageContainer.appendChild(message);
        document.getElementById('conversation-messages').appendChild(messageContainer);
      };
    ```

    - Đầu tiên ta tạo thẻ `div.message`, và set `innerText` của nó thành nội dung tin nhắn
    - Sau đó ta kiểm tra xem email người gửi và email của tài khoản đang đăng nhập để biết đây là tin nhắn của mình hay của người khác
    - Cuối cùng, gắn tin nhắn vào khung chat bằng hàm `appendChild()`


*Nội dung của các files sau bài này: [One To One Chat UI](example)*

*Bài tiếp theo: [Firestore For Chat]*