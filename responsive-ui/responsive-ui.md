## CI JS - Student book
### Responsive UI

Vào năm 2007, "Apple" cho ra mắt Iphone, sự ra đời của thiết bị này đã thay đổi hoàn toàn cách người dùng tương tác với trang web. Với Iphone hoặc bất kì 1 chiếc smartphone nào khác, người dùng giờ đây có thể lướt web mọi lúc, mọi nơi. Điều này đem đến cho các kĩ sư phát triển web 1 vấn đề nan giải: Làm thế nào để hiển thị nội dung 1 cách nhất quán giữa các thiết bị có kích cỡ màn hình khác nhau ? Ban đầu, 1 số công ty quyết định xây dựng 2 hệ thống riêng biệt, 1 phục vụ cho thiết bị có màn hình lớn (Desktop) và 1 phục vụ cho các thiết bị có màn hình nhỏ (Mobile) ví dụ như Facebook sẽ có 2 phiên bản "facebook.com" và "m.facebook.com". Ban đầu, giải pháp này đã giải quyết được vấn đề nhưng, thời gian sau, kích thước của các thiết bị cầm tay càng này càng đa dạng, cùng với đó là sự ra đời của tablet, TV os, ... khiến cho bài toán hiển thị nội dung vẫn chưa được giải quyết triệt để.

Vào năm 2010, thuật ngữ "Responsive Web Design" được ra đời để giải quyết vấn đề này.

**I. Mục tiêu bài học**
1. Giới thiệu về Responsive Web Design

2. Làm cho ứng dụng chat trở nên Responsive

**II. Responsive Web Design**
- "Responsive Web Design" là cách xây dựng trang web giúp tối ưu hóa trải nghiệm của người dùng trên mọi thiết bị. Trang web sẽ tự điều chỉnh để hiển thị nội dung phù hợp với các kích cỡ màn hình khác nhau
    ![Responsive Web Design 1](/responsive-ui/responsive-web-design.png)

- 1 Trang web được xây dựng theo hướng "Responsive" thường sẽ bao gồm 2 yếu tố chính:
    - Relative sizing: Thay vì sử dụng các đơn vị kích thước tuyệt đối như `px`, `inches`, `cm`, ... thì các trang web responsive sẽ dùng các đơn vị kích thước tương đối như `%`, `em`, `rem`. Việc này sẽ giúp kích cỡ của nội dung có thể được thay đổi dựa theo kích cỡ của màn hình hiển thị
    - Media queries (Breakpoints): Với cùng 1 source code, trang web có thể nhận biết được kích thước của thiết bị để hiển thị thêm hoặc giấu bớt đi những phần nội dung ít quan trọng

**III. Làm cho ứng dụng chat trở nên Responsive**
- Chúng ta sẽ làm cho ứng dụng chat trở nên Responsive để có thể hiển thị tốt cả trên desktop và mobile. Phiên bản dành cho mobile của chúng ta sẽ có giao diện như sau:
    ![Responsive Chat App](/responsive-ui/responsive-chat-app.png)

- Cụ thể, chúng ta sẽ thay đổi giao diện khi kích thước màn hình nhỏ hơn hoặc bằng 768px (<= 768px). Khi đó, phần "Conversation list" sẽ thu hẹp lại và mỗi conversation cũng sẽ thay đổi style. Nút "Create conversation" phía trên cũng sẽ thu nhỏ lại theo. Để làm được phần này, chúng ta sẽ lần lượt qua 2 mục tiêu:
    - Tìm hiểu về `@media` của `css` và áp dụng cho file `chat.css` để thay đổi style cho các kích thước màn hình khác nhau
    - Sử dụng Javascript để "lắng nghe" mỗi khi `@media` thay đổi => Update giao diện tương ứng

1. Tìm hiểu về `@media`
    - Khái niệm: `@media` là 1 tính năng của CSS, cho phép chúng ta áp dụng các đoạn mã CSS khác nhau cho các loại thiết bị khác nhau hoặc các kích cỡ màn hình khác nhau
    
    - Cú pháp:

    ```css
      @media not|only mediatype and (mediafeature and|or|not mediafeature) {
        CSS-Code;
      }
    ```

    - Trong đó:
      - mediatype: Nhận 1 trong 4 giá trị `all | print | screen | speech`
      - mediafeature: Có dạng `key: value`. Danh sách các `key` có thể xem [tại đây](https://www.w3schools.com/cssref/css3_pr_mediaquery.asp)

    - Ví dụ:
      - Đoạn code `css` sẽ chỉ được áp dụng khi sử dụng thiết bị có màn hình và chiều rộng <= 1200px

      ```css
        @media screen and (max-width: 1200px) {
          CSS-Code;
        }
      ```

      - Đoạn code `css` sẽ chỉ được áp dụng khi in ấn và chiều rộng >= 1200px

      ```css
        @media print and (min-width: 1200) {
          CSS-Code;
        }
      ```

2. Áp dụng `@media` cho file `chat.css`
    - Như đã mô ta phía trên, chúng ta sẽ thay đổi style của màn hình chat khi chiều rộng <= 768px. Thêm đoạn code sau vào file `chat.css`:

    ```css
      @media screen and (max-width: 768px) {
        .chat-container .main {
          height: calc(100% - 64px);
          display: grid;
          grid-template-columns: 100px auto;
          grid-template-rows: 100%;
        }

        .chat-container .main .conversation-list .conversation {
          width: 64px;
          height: 64px;
          line-height: 64px;
          padding: 0px;
          cursor: pointer;
          margin: 6px auto;
          border: 1px solid #e9e9e9;
          border-radius: 50%;
          overflow: hidden;
        }

        .chat-container .main .conversation-list .conversation span:nth-child(1) {
          font-size: 32px;
          margin: 0 auto;
        }

        .chat-container .main .conversation-list .conversation span:nth-child(2) {
          width: 10px;
          height: 10px;
          position: absolute;
          left: 70px;
        }
      }
    ```

    - Chúng ta đã sử dụng `@media` của CSS để áp dụng các style mới khi màn hình có chiều rộng <= 768px

    ![Responsive Chat App 2](/responsive-ui/responsive-chat-app-2.png)

    - Tuy nhiên, nội dung của các item trong conversation list vẫn chưa đúng với yêu cầu. Để có thể thay đổi nội dung bên trong thẻ `div.conversation`, chúng ta sẽ cần dùng đến Javascript. Và tất nhiên Javascript cũng có thể tương tác với `@media`

3. Sử dụng Javascript để "lắng nghe" mỗi khi `@media` thay đổi
    - Ở bài trước, sau khi đăng nhập thành công, chúng ta đã load tất cả các conversation mà người dùng tham gia sau đó render ra conversation list bằng hàm `view.addConversation()`. Bây giờ, ta sẽ update hàm `view.addConversation()` để render item trong "conversation list" tương ứng với kích cỡ màn hình, đồng thời "lắng nghe" mỗi khi `@media` thay đổi sẽ thay đổi nội dung của item trong "conversation list"

    - Đầu tiên update `view.addConversation()` để render item tương ứng với kích cỡ màn hình:

    ```js
      view.addConversation = (conversationObj) => {
        ...

        const mediaQueryResult = window.matchMedia('screen and (max-width: 768px)');
        if (mediaQueryResult.matches) {
          const conversationElement = document.getElementById(conversationObj.id);
          const firstLetter = conversationObj.name.charAt(0).toUpperCase();
          conversationElement.firstChild.innerText = firstLetter;

          document.getElementById('create-conversation').innerText = '+';
        }
      };
    ```

    - Sau khi render item trong "conversation list" chúng ta kiểm tra xem kích thước màn hình hiện tại có thỏa mãn điều kiện `screen and (max-width: 768px)` hay không ? Nếu có, chúng ta sẽ thay đổi nội dung item thành chữ cái đầu tiên trong tên của conversation đồng thời thay đổi nội dung của nút "create conversation"

    - "Lắng nghe" mỗi khi `@media` thay đổi

    ```js
      view.addConversation = (conversationObj) => {
        ...

        const mediaQueryResult = window.matchMedia('screen and (max-width: 768px)');
        if (mediaQueryResult.matches) {
          const conversationElement = document.getElementById(conversationObj.id);
          const firstLetter = conversationObj.name.charAt(0).toUpperCase();
          conversationElement.firstChild.innerText = firstLetter;

          document.getElementById('create-conversation').innerText = '+';
        }

        // media query listener
        mediaQueryResult.addListener((mediaQuery) => {
          if (mediaQuery.matches) {
            const conversationElement = document.getElementById(conversationObj.id);
            const firstLetter = conversationObj.name.charAt(0).toUpperCase();
            conversationElement.firstChild.innerText = firstLetter;

            document.getElementById('create-conversation').innerText = '+';
          } else {
            const conversationElement = document.getElementById(conversationObj.id);
            conversationElement.firstChild.innerText = conversationObj.name;

            document.getElementById('create-conversation').innerText = '+ New Conversation';
          }
        });
      };
    ```

    - Để lắng nghe sự kiện thay đổi của `@media` chúng ta sẽ sử dụng hàm `addListener()` và truyền vào nó 1 hàm callback

    - Mỗi khi `@media` thay đổi, hàm callback truyền vào `addListener()` sẽ được gọi. Hàm callback này sẽ kiểm tra xem `@media` có thỏa mãn điều kiện hay không. Nếu không thỏa mãn, chúng ta sẽ trả lại nội dung giống như màn hình bình thường


*Nội dung của các files sau bài này: [Responsive UI](example)*

*Bài tiếp theo: [Group Chat UI](/group-chat-ui/group-chat-ui.md)*
