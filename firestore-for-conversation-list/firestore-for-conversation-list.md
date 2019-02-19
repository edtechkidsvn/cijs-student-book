## CI JS - Student book
### Firestore for Conversation List

Chúng ta đã đi được một nửa chặng đường xây dựng tính năng "Conversation list" bằng việc hoàn thành khung HTML + CSS cho màn hình `createConversation` đồng thời validate input người dùng nhập vào. Ở bài này, ta sẽ tiếp tục:

    - Lưu thông tin "conversation" vừa tạo lên Firestore
    - Thêm tính năng hiển thị thông báo mỗi khi có message mới hoặc mỗi khi người dùng được mời vào 1 "conversation"

**I. Mục tiêu bài học**
1. Lưu "conversation" người dùng tạo lên Firestore

2. Hiển thị thông báo khi có message mới hoặc được thêm vào "conversation" mới

**II. Lưu "conversation" người dùng tạo lên Firestore**
- Khi người dùng submit form "Create conversation", chúng ta đã gọi hàm `controller.createConversation()` để làm nhiệm vụ validate input. Nếu hàm `controller.createConversation()` validate input thành công, chúng ta sẽ gọi sang `model.createConversation()` để lưu thông tin lên Firestore. Flow này có thể được tóm tắt như sau:

    ```js
      'User submit form' => controller.createConversation() validate input => model.createConversation() lưu dữ liệu lên Firestore
    ```

- Để hoàn thành flow này, ta sẽ cần chỉnh sửa 2 chỗ:
    - Thêm hàm `model.createConversation()` để lưu dữ liệu lên Firestore
    - Update lại phần lắng nghe dữ liệu từ Firestore để phân biệt giữa "có message mới" và "có conversation mới"

1. Tạo hàm `model.createConversation()`. Hàm này sẽ gọi hàm `add()` của collection `conversations` để tạo 1 bản ghi mới:

    ```js
      model.createConversation = (conversationInfo) => {
        const newConversation = {
          name: conversationInfo.conversationName,
          users: [model.authUser.email, conversationInfo.friendEmail],
          messages: [],
          createdAt: new Date().toISOString(),
        };

        const db = firebase.firestore();
        db.collection('conversations').add(newConversation);
        view.backToChatScreen();
      };
    ```

2. Update phần lắng nghe dữ liệu từ Firestore
    - Ở bài "Firestore for One to One Chat", chúng ta có phần code lắng nghe dữ liệu từ Firestore bên trong hàm `model.loadConversations()` như sau:

    ```js
      model.loadConversations = async () => {
        const db = firebase.firestore();
        db.collection('conversations').where('users', 'array-contains', model.authUser.email)
          .onSnapshot((snapShot) => {
            if (model.conversations === undefined) {
              const conversations = snapShot.docChanges().map((item) => ({
                id: item.doc.id,
                ...item.doc.data(),
              }));

              model.conversations = conversations;
              model.activeConversation = conversations[0];

              for (let message of model.activeConversation.messages) {
                view.addMessage(message);
              }
              for (let conversation of model.conversations) {
                view.addConversation(conversation);
              }
            } else {
              for (const item of snapShot.docChanges()) {
                const conversation = {
                  id: item.doc.id,
                  ...item.doc.data(),
                };

                for (let i = 0; i < model.conversations.length; i += 1) {
                  if (model.conversations[i].id === conversation.id) {
                    model.conversations[i] = conversation;
                  }
                }

                if (conversation.id === model.activeConversation.id) {
                  model.activeConversation = conversation;
                  view.addMessage(conversation.messages[conversation.messages.length - 1]);
                }
              }
            }
          });
      };
    ```

    - Do ở bài "Firestore for One to One Chat", mỗi khi dữ liệu thay đổi, chúng ta có duy nhất 1 trường hợp gây ra việc thay đổi này đó là "có message mới" cho nên đoạn code chỉ đơn giản gọi hàm `view.addMessage()` để render ra message mới

    - Hiện nay, mỗi khi dữ liệu thay đổi sẽ xảy ra 1 trong 2 trường hợp sau:
      - 1 trong các conversation người dùng tham gia có message mới
      - Người dùng được thêm vào 1 "conversation" mới

    - Để phân biết 2 trường hợp này, ta sẽ sử dụng thuộc tính `type` của mỗi item trong mảng `snapShot.docChanges()` để kiểm tra:
      - "Có message mới" => item.type === 'modified'
      - "Có conversation mới" => item.type === 'added'

    ```js
      model.loadConversations = async () => {
        const db = firebase.firestore();
        db.collection('conversations').where('users', 'array-contains', model.authUser.email)
          .onSnapshot((snapShot) => {
            if (model.conversations === undefined) {
              ...
            } else {
              for (const item of snapShot.docChanges()) {
                const conversation = {
                  id: item.doc.id,
                  ...item.doc.data(),
                };

                if (item.type === 'modified') {
                  for (let i = 0; i < model.conversations.length; i += 1) {
                    if (model.conversations[i].id === conversation.id) {
                      model.conversations[i] = conversation;
                    }
                  }

                  if (conversation.id === model.activeConversation.id) {
                    model.activeConversation = conversation;
                    view.addMessage(conversation.messages[conversation.messages.length - 1]);
                  }
                } else if (item.type === 'added') {
                  view.addConversation(conversation);
                }
              }
            }
          });
      };
    ```

**III. Thêm tính năng "hiển thị thông báo"**
    ![Notification 1](/firestore-for-conversation-list/notification-1.png)

- Tính năng "hiển thị thông báo" của chúng ta sẽ hoạt động đơn giản như sau:
    - Mỗi khi có message mới => Hiển thị thông báo nhỏ bên cạnh tên của conversation
    - Mỗi người dùng được mời vào conversation mới => Hiển thị thông báo nhỏ bên cạnh tên của conversation

- Về mặt thực hành, ta sẽ tiến hành như sau:
    - Thêm HTML + CSS cho phần thông báo. Ban đầu phần HTML này sẽ có style `display: none`
    - Khi có message mới hoặc conversation mới => Gọi `view` để hiển thị thông báo bằng cách chuyển style từ `display: none` => `display: inline-block`
    - Remove thông báo của conversation tương ứng mỗi khi người dùng click vào item trên "Conversation list" hoặc click vào phần input của khung chat

1. Thêm HTML + CSS cho phần thông báo
    - Update lại phần tạo HTML cho conversation trong hàm `view.addConversation()` như sau:

    ```js
      view.addConversation = (conversationObj) => {
        ...

        const conversationNoti = document.createElement('span');
        conversationNoti.classList.add('notification');
        conversationNoti.innerText = 'new';

        ...

        conversationContainer.appendChild(conversationNoti);

        ...
      };
    ```

    - Thêm style cho phần thông báo trong file `chat.css`:

    ```css
      .chat-container .main .conversation-list .notification {
        margin-right: 12px;
        display: none;
        background: #f81d22;
        color: #ffffff;
        border-radius: 4px;
        height: 24px;
        line-height: 24px;
        padding: 0px 4px;
      }
    ```

2. Update phần lắng nghe dữ liệu từ Firestore để gọi `view`
    - Update hàm `model.loadConversation()`, mỗi khi có message mới hoặc conversation mới, gọi sang `view.showNotification()` để hiển thị thông báo:

    ```js
      model.loadConversations = async () => {
        const db = firebase.firestore();
        db.collection('conversations').where('users', 'array-contains', model.authUser.email)
          .onSnapshot((snapShot) => {
            if (model.conversations === undefined) {

              ...

            } else {
              for (const item of snapShot.docChanges()) {
                const conversation = {
                  id: item.doc.id,
                  ...item.doc.data(),
                };

                if (item.type === 'modified') {
                  for (let i = 0; i < model.conversations.length; i += 1) {
                    if (model.conversations[i].id === conversation.id) {
                      model.conversations[i] = conversation;
                      if (conversation.messages[conversation.messages.length - 1].user !== model.authUser.email) {
                        view.showNotification(conversation.id);
                      }
                    }
                  }

                  if (conversation.id === model.activeConversation.id) {
                    model.activeConversation = conversation;
                    view.addMessage(conversation.messages[conversation.messages.length - 1]);
                  }
                } else if (item.type === 'added') {
                  view.addConversation(conversation);
                  view.showNotification(conversation.id);
                }
              }
            }
          });
      };
    ```

    - Thêm hàm `view.showNotification()`

    ```js
      view.showNotification = (conversationId) => {
        const conversation = document.getElementById(conversationId);
        conversation.lastChild.style.display = 'inline-block';
      };
    ```

3. Remove thông báo
    - Khi 1 item trên "Conversation list" được `click` chúng ta sẽ remove thông báo của conversation đó. Update hàm `view.addConversation()` để gọi `view.removeNotification()`:

    ```js
      view.addConversation = (conversationObj) => {

        ...

        conversationContainer.addEventListener('click', () => {
          view.removeNotification(conversationObj.id);
          controller.changeActiveConversation(conversationObj.id);
        });

        document.getElementById('conversation-list').appendChild(conversationContainer);
      };
    ```

    - Thêm hàm `view.removeNotification()`:

    ```js
      view.removeNotification = (conversationId) => {
        const conversation = document.getElementById(conversationId);
        conversation.lastChild.style.display = 'none';
      };
    ```

    - Ngoài ra, khi người dùng `click` vào phần input trên khung chat, chúng ta cũng sẽ remove thông báo của `activeConversation`. Update hàm `view.setActiveScreen()`:

    ```js
      view.setActiveScreen = (screenName) => {

          ...

          case 'chat':
            
            ...

            // remove notification
            document.getElementById('message-input').addEventListener('click', () => view.removeNotification(model.activeConversation.id));

          ...
        }
      };
    ```


*Nội dung của các files sau bài này: [Firestore for Conversation List](example)*

*Bài tiếp theo: [UI Responsive](/responsive-ui/responsive-ui.md)*