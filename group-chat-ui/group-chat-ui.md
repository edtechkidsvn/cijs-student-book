## CI JS - Student book
### Group chat UI

- Đến thời điểm hiện tại, ứng dụng chat của chúng ta đã có được hầu hết các tính năng cần thiết của 1 ứng dụng chat bao gồm: Chat 1v1, tạo "conversation", hiển thị thông báo khi có "message" mới. Tiếp theo, chúng ta sẽ mở rộng ứng dụng thông qua việc xây dựng tính năng chat nhóm.
- Hiện tại, mỗi "conversation" trong ứng dụng chat của ta chỉ có mặc đinh 2 thành viên. Để thêm tính năng chat nhóm, chúng ta sẽ cho phép người dùng thêm thành viên vào "conversation", xem list các thành viên đang có mặt trong "conversation", nhận tin nhắn từ tất cả các thành viên khác trong "conversation". Các phần cần hoàn thành để thêm được tính năng "Group chat":

    - Dựng phần HTML + CSS cho "Member list"
    - Thêm form "Add member" và validate input
    - Update `model` để lưu member mới lên Firestore
    - Update lại phần "lắng nghe" dữ liệu từ Firestore để từ đó update `view` tương ứng

**I. Mục tiêu bài học**
1. Dựng khung HTML + CSS cho "Member list"

2. Thêm form "Add member" và validate input

3. Render "Member list" của conversation đang được chọn

**II. Dựng khung HTML + CSS cho "Member list"**
- Phần hiển thị "Member list" của chúng ta sẽ nằm trong màn hình chat, phía bên tay phải của khung chat như sau:
    ![Group chat UI 1](/group-chat-ui/conversation-list-1.png)

1. Update lại `html` của phần chat trong file `components.js`:
    - Chúng ta sẽ thêm 1 thẻ `div.conversation-members` ngay bên dưới thẻ `div.conversation-detail` để chứa "Member list". Trong thẻ `div.conversation-members` sẽ bao gồm 2 thành phần chính là:
      - Danh sách thành viên của conversation nằm trong thẻ `div#member-list`
      - Form thể thêm thành viên mới vào conversation nằm trong thẻ `form#add-member-form`

    ```html
      <div class='conversation-members' id='conversation-members'>
        <div id='member-list' class='member-list'>
        </div>

        <form class='add-member' id='add-member-form' name='add-member-form'>
          <input class='input' id='add-member-input' name='memberEmail' placeholder='Email ...'></input>
          <div id='member-email-error' class='error'></div>
          <button class='btn' id='add-member-button'>Add Member</button>
        </form>
      </div>
    ```

2. Update style cho "Member list" trong file `chat.css`
    - Đầu tiên, sửa lại style của thẻ `div.main` để có được lay out như thiết kế:

    ```css
      .chat-container .main {
        ...

        grid-template-columns: 25% 50% 25%;
      }
    ```

    - Thêm `border-right` cho thẻ `div.conversation-detail`:

    ```css
      .chat-container .main .conversation-detail {
        ...

        border-right: 1px solid #e9e9e9;
      }
    ```

    - Thêm style cho phần HTML của "Member list" mới thêm:

    ```css
      .chat-container .main .conversation-members {
        position: relative;
      }

      .chat-container .main .conversation-members .member-list .member {
        height: 42px;
        line-height: 42px;
        padding-left: 12px;
        font-size: 14px;
        display: flex;
        justify-content: space-between;
        align-items: center;
      }

      .chat-container .main .conversation-members .member-list .member:hover {
        background-color: rgba(0, 0, 0, .05);
      }

      .chat-container .main .conversation-members .add-member {
        position: absolute;
        width: 100%;
        bottom: 0px;
        padding: 12px;
      }

      .chat-container .main .conversation-members .add-member .btn {
        display: inline-block;
        width: 100%;
        margin-top: 10px;
      }
    ```

    - Chú ý: style của class `.member` và `.member:hover` sẽ được sử dụng sau, vì đây là 2 thẻ `div` sẽ được tạo bởi hàm trong file `view.js` chứ không có sẵn từ đầu trong phần `html`

**III. Thêm logic để validate form "Add member"**
- Như đã giới thiệu ở các bài trước, "Input validation" đóng 1 vai trò rất quan trọng trong ứng dụng của chúng ta. Tiếp theo, chúng ta sẽ validate thông tin người dùng khi muốn thêm member vào conversation qua 2 bước:
    - Update hàm `view.setActiveScreen()` để lắng nghe sự kiện `submit` của form "Add member"
    - Thêm hàm `controller.addMember()` để validate input người dùng

1. Update hàm `view.setActiveScreen()` để lắng nghe sự kiện `submit` của form "Add member" và gọi `controller.addMember()`
    ```js
      view.setActiveScreen = (screenName) => {
        ...

        case 'chat':
          ...

          const addMemberForm = document.getElementById('add-member-form');
          addMemberForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const newMemberEmail = addMemberForm.memberEmail.value;
            controller.addMember({
              newMember: newMemberEmail,
            });

            addMemberForm.memberEmail.value = '';
          });

          ...
      };
    ```

2. Thêm hàm `controller.addMember()` để validate input và gọi `model.addMember()`
    ```js
      controller.addMember = (newMemberInfo) => {
        // validate input
        if (!newMemberInfo.newMember) {
          view.setMessage('member-email-error', `Please input member's email`);
        } else {
          view.setMessage('member-email-error', '');
        }

        if (newMemberInfo.newMember) {
          model.addMember(newMemberInfo);
        }
      };
    ```

    - Nếu thông tin người dùng nhập vào đầy đủ, ta gọi `model.addMember()` để lưu thông tin lên Firestore

**III. Render "Member list" của conversation đang được chọn**
- Ở bài trước, chúng ta đã cho phép người dùng chuyển qua lại giữa các conversation mà người đó tham gia. Mỗi khi chuyển conversation, nội dung của khung chat chính sẽ được re-render lại để hiển thị tin nhắn của conversation được chọn. Tương tự với phần "Member list" chúng ta đang thực hiện, mỗi khi người dùng chuyển conversation, chúng ta cũng cần re-render lại "Member list" tương ứng:
    - Update lại hàm `model.loadConversations()` để render ra "Member list" của conversation đầu tiên sau khi người dùng đăng nhập thành công
    - Update hàm `view.changeActiveConversation()` để re-render "Member list" mỗi khi người dùng chuyển conversation
    - Thêm hàm `view.addMember()` làm nhiệm vụ thay đổi UI

1. Update lại hàm `model.loadConversations()`
    ```js
      if (model.conversations === undefined) {
        ...

        for (let member of model.activeConversation.users) {
          view.addMember(member);
        }
      } else {
        ...
      }
    ```

2. Update hàm `view.changeActiveConversation()`
    ```js
      view.changeActiveConversation = () => {
        ...

        // re-render member list
        document.getElementById('member-list').innerHTML = '';
        for (let member of model.activeConversation.users) {
          view.addMember(member);
        }
      };
    ```

3. Thêm hàm `view.addMember()` làm nhiệm vụ thay đổi UI
    - Hàm `view.addMember()` sẽ tạo 1 thẻ `div.member` có nội dung là email của 1 member trong conversation, sau đó gắn thẻ `div.member` mới tạo này vào thẻ `div#member-list`

    ```js
      view.addMember = (memberEmail) => {
        const member = document.createElement('div');
        member.classList.add('member');
        member.innerHTML = `<i>#${memberEmail}</i>`;
        document.getElementById('member-list').appendChild(member);
      };
    ```


*Nội dung của các files sau bài này: [Group chat UI](example)*

*Bài tiếp theo: [Firestore For Group Chat]*