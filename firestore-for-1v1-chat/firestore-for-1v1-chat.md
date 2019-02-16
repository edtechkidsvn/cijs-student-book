## CI JS - Student book
### Firestore for One to One Chat

Mỗi 1 ứng dụng dù chạy trên bất cứ nền tảng nào (Mobile, web hoặc desktop) đều sẽ có nhu cầu lưu trữ dữ liệu. Nhu cầu này sẽ thay đổi tùy thuộc mỗi loại ứng dụng khác nhau. Trang web blogs sẽ cần lưu trữ các bài viết, các trang mạng xã hội sẽ cần lưu trữ hình ảnh, thông tin tài khoản người dùng, game sẽ cần lưu trữ thông tin nhân vật, ...

Mỗi loại ứng dụng khác nhau sẽ đòi hỏi CSDL có những tính năng đặc biệt riêng. Đối với ứng dụng chat chúng ta đang xây dựng, 1 CSDL phù hợp sẽ cần đáp ứng 2 yêu cầu chính: dễ sử dụng và realtime (mỗi khi dữ liệu thay đổi, người dùng có thể biết ngay mà không cần truy vấn CSDL)

Firestore là một CSDL cung cấp bởi Firebase đáp ứng được cả 2 yêu cầu này

**I. Mục tiêu bài học**
1. Giới thiệu về Firestore

2. Lưu trữ dữ liệu chat lên Firestore

3. Lắng nghe sự kiện "update" từ Firestore


**II. Giới thiệu về Cloud Firestore (Firestore)**
- Ở các bài trước, chúng ta đã làm quen với Firebase và sử dụng dịch vụ Firebase Authentication để xác thực người dùng thông qua địa chỉ email. Ở bài này chúng ta sẽ làm quen 1 dịch vụ khác của Firebase đó là Cloud Firestore, CSDL thời gian thực

- Trong Cloud Firestore, đơn vị lưu trữ dữ liệu là "document". "Document" tương đương với object trong ngôn ngữ JS, bao gồm các cặp "property-value"
    - VD: 1 document lưu trữ thông tin về 1 người dùng
    ```js
      {
        email: 'boomzilla@gmail.com',
        name: 'Zilla Boom',
        dob: '22/11/1997',
      }
    ```

- Kiểu dữ liệu của các "property" bên trong "document" có thể là bất kì kiểu nào: `number`, `string`, `array`, `object`, ...
    - VD:
    ```js
      {
        email: 'boomzilla@gmail.com',
        name: {
          first: 'Zilla',
          last: 'Boom',
        },
        dob: '22/11/1997',
        age: 22,
        favoriteFood: ['cup cake', 'taco', 'instant noodle'],
      }
    ```

- Do 1 ứng dụng sẽ cần lưu trữ rất nhiều loại dữ liệu khác nhau và cần 1 cơ chế để phân loại dữ liệu này thành những nhóm tương tự nhau. VD: Dữ liệu về tài khoản người dùng, dữ liệu về các bài blogs, dữ liệu về các giao dịch mua bán trong hệ thống, ... Đối với Cloud Firestore, việc này sẽ được thực hiện nhờ các "collection". Mỗi "collection" đơn giản là 1 "thùng chứa", chứa tất cả các "document" cùng loại
    - VD: Collection "users" chứa các "document" chứa thông tin người dùng, collection "conversations" chứa các "document" chứa thông tin về các cuộc trò chuyện


**III. Thiết kế CSDL cho ứng dụng chat**
- Trong ứng dụng chat của chúng ta sẽ có 1 collection "conversations" chứa các document chứa thông tin về cuộc trò chuyện

- Trong mỗi document ta sẽ lưu trữ thông tin như sau:

    ```js
      {
        name: 'name of conversation',
        createdAt: 'the time this conversation was created. Ex: 2019-01-29T08:49:16.055Z',
        users: [
          'zillabooom@gmail.com',
          'scoopspecial@gmail.com',
          ...
        ],
        messages: [
          {
            content: 'message content',
            user: 'sender email',
            createdAt: '2019-01-29T08:49:16.055Z'
          },
          ...
        ],
      }
    ```

    - `name`: Tên của cuộc trò truyện, do người tạo đặt
    - `createdAt`: Thời điểm cuộc trò truyện được tạo, lưu dưới dạng ISOString
    - `users`: Danh sách những người tham gia cuộc trò truyện này. Đây là 1 array gồm các địa chỉ email
    - `messages`: Danh sách các tin nhắn của cuộc trò truyện này. Mỗi tin nhắn là 1 object gổm 3 thông tin: `content` là nội dung tin nhắn, `user` là email của người gửi, `createdAt` là thời điểm tin nhắn được gửi dưới dạng ISOString


**IV. Lưu trữ dữ liệu vào Firestore**
- Để lưu trữ dữ liệu vào Firestore chúng ta sẽ cần hoàn thành lần lượt 3 bước:
    - Tạo collection "conversations" trên Firestore
    - Tạo 1 document trong collection "conversations" với 2 người dùng khác nhau trong mảng `users`
    - Lưu dữ liệu vào Firestore mỗi khi người dùng nhập tin nhắn mới

1. Tạo collection "conversations" trên Firestore
    - Truy cập vào https://console.firebase.google.com, chọn phần "Database" trên thanh menu bên tay trái, sau đó click vào "Create database"

    ![Firestore 1](/firestore-for-1v1-chat/firestore-1.png)
   
    - Trong pop-up hiện ra, đánh dấu vào ô "Start in Test Mode" sau đó chọn "Enable" để bắt đầu quá trình khởi tạo Firestore

    ![Firestore 2](/firestore-for-1v1-chat/firestore-2.png)

    - Sau khi Firestore được khởi tạo xong, chọn "Add collection"

    ![Firestore 3](/firestore-for-1v1-chat/firestore-3.png)

    - Trong pop-up hiện ra, nhập tên collection là "conversations" sau đó chọn "Next"

    ![Firestore 4](/firestore-for-1v1-chat/firestore-4.png)

2. Tạo 1 documentument trong collection "conversations"
    - Sau khi chọn "Next", trong màn hình hiện ra, lần lượt chọn "Auto-ID" và thêm các field như hình (chú ý kiểu dữ liệu của mỗi field). Riêng với field `users` ta sẽ thêm 2 địa chỉ email đã được đăng kí vào. Sau đó chọn "Save" để tạo collection

    ![Firestore 5](/firestore-for-1v1-chat/firestore-5.png)

3. Lưu dữ liệu vào Firestore mỗi khi người dùng nhập tin nhắn mới
    - Ở bài trước, chúng ta đã bắt sự kiện `submit` của message form để render ra 2 tin nhắn trên khung chat. Bây giờ, sau khi đã có firestore, chúng ta sẽ update lại code để flow gửi tin nhắn chạy như sau:

    ![Send message flow](/firestore-for-1v1-chat/send-message-flow.png)

    - Update hàm `controller.addMessage()` trong file `controller.js`

    ```js
      controller.addMessage = (newMessageContent) => {
        const newMessage = {
          content: newMessageContent,
          user: model.authUser.email,
          createdAt: new Date().toISOString(),
        };

        model.addMessage(newMessage);
      };
    ```

    - Tạo hàm `model.addMessage()` trong file `model.js`, có nhiệm vụ lưu dữ liệu vào Firestore

    ```js
      model.addMessage = async (newMessage) => {
        const db = firebase.firestore();

        db.collection('conversations').doc(model.activeConversation.id).update({
          messages: firebase.firestore.FieldValue.arrayUnion(newMessage),
        });
      };
    ```
    
    - Đầu tiên, chúng ta khởi tạo biến `db`, đây sẽ là 1 object chứa các hàm cho phép chúng ta làm việc với Firestore

    - Tiếp theo chúng ta sẽ gọi liên tiếp 3 hàm `collection().doc().update()` (kĩ thuật này gọi là "Method chaining"). Trong đó params truyền vào hàm `collection()` sẽ là tên của collection mà chúng ta muốn lưu dữ liệu vào, params truyền vào hàm `doc()` sẽ là ID của document mà ta luốn lưu dữ liệu vào, cuối cùng ta sử dụng hàm `update()` để "push" message mới nhất vào mảng `messages`


**V. Lắng nghe sự kiện "update" từ Firestore để render message lên khung chat**
- Flow lắng nghe các "conversation" sau khi người dùng đăng nhập thành công sẽ diễn ra như sau

    ![Listen message flow](/firestore-for-1v1-chat/listen-to-new-message.png)

- Sau khi chuyển sang màn hình chat, chúng ta sẽ gọi hàm `model.loadConversations()`. Thêm đoạn code sau vào file `view.setActiveScreen()` trong phần `chat`

    ```js
      model.loadConversations();
    ```

- Thêm hàm `model.loadConversations()` vào file `model.js`. Hàm này sẽ làm 2 nhiệm vụ: tìm tất cả các `conversations` mà tài người dùng tham gia và lắng nghe mỗi khi có thay đổi

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

    - Ta sẽ sử dụng hàm where để filter và chỉ lấy những `conversation` mà người dùng tham gia
    - Để lắng nghe thay đổi, ta sẽ sử dụng hàm `onSnapshot()`, hàm này sẽ có param truyền vào là 1 hàm `callback`, mỗi khi dữ liệu thay đổi thì hàm `callback` này sẽ được gọi
    - Hàm callback sẽ có param truyền vào là object `snapShot`, object này sẽ chứa thông tin vè các dữ liệu bị thay đổi. Trong đó ta quan tâm đến `snapShot.docChanges()`, hàm này sẽ trả về 1 mảng các object, chứa thông tin về những bản ghi có dữ liệu bị thay đổi
    - Chúng ta update lại bản ghi tương ứng trong `model.conversations`, sau đó nếu bản nghi có dữ liệu thay đổi là `model.activeConversation` thì chúng ta render message mới lên khung chat

- Kiểm tra lại tính năng chat 1v1 bằng cách mở file `index.html` trên 2 cửa sổ khác nhau, mỗi cửa sổ đăng nhập 1 tài khoản khác nhau


*Nội dung của các files sau bài này: [Firestore for One To One Chat](example)*

*Bài tiếp theo: [Conversation list UI](conversation-list-ui/conversation-list-ui.md)*