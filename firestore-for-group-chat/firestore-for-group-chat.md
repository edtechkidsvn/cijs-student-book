## CI JS - Student book
### Firestore for Group Chat

Tiếp theo bài trước, chúng ta đã render "Member list" và validate user input khi người dùng muốn thêm member vào conversation. Ở bài này, chúng ta sẽ lưu thông tin khi thêm member vào conversation lên Firestore qua 2 bước:

  - Tạo hàm `model.addMember()` để lưu thông tin lên Firestore
  - Update phần "Lắng nghe" dữ liệu từ Firestore để phân biệt "message mới" và "member mới"

**I. Mục tiêu bài học**
1. Lưu member mới được thêm vào conversation lên Firestore

2. Phân biệt "message mới" và "member mới" để update UI tương ứng

**II. Lưu member mới được thêm vào conversation lên Firestore**
- Ở bài trước, bên trong hàm `controller.addMember()`, sau khi validate input người dùng, nếu thông tin đúng, chúng ta gọi `model.addMember()` để lưu thay đổi lên Firestore

    ```js
      controller.addMember = (newMemberInfo) => {
        ...

        if (newMemberInfo.newMember) {
          model.addMember(newMemberInfo);
        }
      };
    ```

- Hàm `model.addMember()` chưa tồn tại, tạo hàm `model.addMember()` trong file `model.js` như sau:

  ```js
    model.addMember = (newMemberInfo) => {
      const db = firebase.firestore();

      db.collection('conversations').doc(model.activeConversation.id).update({
        users: firebase.firestore.FieldValue.arrayUnion(newMemberInfo.newMember)
      });
    };
  ```

  - Do `users` trong CSDL của chúng ta được lưu dưới dạng 1 mảng (Array), vì vậy mỗi khi thêm member vào conversation, chúng ta sẽ thêm email của member mới này vào vị trí cuối của mảng. Việc này được thực hiện thông qua hàm `firebase.firestore.FieldValue.arrayUnion()` của Firebase. Hàm này có chức năng tương tự như hàm `array.push()`

**III. Phân biệt "message mới" và "member mới" để update UI tương ứng**
- Ở bài "Firestore for Conversation List" chúng ta đã phân biệt 2 trường hợp, "có message mới" và "được thêm vào 1 conversation mới" qua thuộc tính `type` của bản ghi bị thay đổi:

    ```js
      model.loadConversations = async () => {
        ...

        if (item.type === 'modified') {

          ...

        } else if (item.type === 'added') {

          ...

        }

        ...
      };
    ```

- Hiện tại, sau khi cho phép người dùng thêm member vào conversation, trường hợp `item.type === modified` sẽ chia làm 2 trường hợp nhỏ: "Có message mới" và "Có member mới". Vì vậy ta sẽ update logic trong phần này để gọi hàm trong `view` tương ứng với mỗi trường hợp:
    - Nếu "Có message mới" => Gọi `view.addMessage()`
    - Nếu "Có member mới" => Gọi `view.addMember()`

    ```js
      model.loadConversations = async () => {
        ...

        if (item.type === 'modified') {
          for (let i = 0; i < model.conversations.length; i += 1) {
            if (model.conversations[i].id === conversation.id) {
              if (conversation.messages.length !== model.conversations[i].messages.length && conversation.messages[conversation.messages.length - 1].user !== model.authUser.email) {
                model.conversations[i] = conversation;
                view.showNotification(conversation.id);
              } else if (conversation.users.length !== model.conversations[i].users.length) {
                model.conversations[i] = conversation;
                view.showNotification(conversation.id);
              }
            }
          }

          if (conversation.id === model.activeConversation.id) {
            if (model.activeConversation.messages.length !== conversation.messages.length) {
              model.activeConversation = conversation;
              view.addMessage(conversation.messages[conversation.messages.length - 1]);
            } else {
              model.activeConversation = conversation;
              view.addMember(conversation.users[conversation.users.length - 1]);
            }
          }
        } else if (item.type === 'added') {
          ...
        }

        ...
      };
    ```

    - Để kiểm tra xem sự thay đổi dữ liệu thuộc trường hợp nào trong 2 trường hợp "Có message mới" và "Có member mới" chúng ta sẽ so sánh độ dài của mảng `messages` trước và sau khi có thay đổi dữ liệu. Từ đó gọi hàm tương ứng trong `view`


*Nội dung của các files sau bài này: [Firestore for Group Chat](example)*

