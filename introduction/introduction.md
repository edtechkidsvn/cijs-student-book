## CI JS - Student book
### Introduction

**I. Mục tiêu khóa học**
1. Nâng cao kiến thức về HTML, JS, CSS.

2. Hiểu rõ về 1 hệ thống web hoàn chỉnh gồm nhiều thành phần tương tác với nhau thông qua việc xây dựng một ứng dụng chat trên nền Web.


**II. Yêu cầu tối thiểu đối với học viên**
1. Về HTML:
    * Sử dụng thành thạo các thẻ cơ bản và các attributes của chúng
    * Nắm được cách link các file CSS, JS vào file HTML

2. Về CSS:
    * Hiểu rõ cách CSS selector hoạt động
    * Nắm vững các thuộc tính style cơ bản

3. Về Javascript (JS):
    * Nắm rõ các cú pháp của ngôn ngữ lập trình JS
    * Hiểu được cách sử dụng ngôn ngữ JS để làm việc với DOM


**III. Công cụ cần thiết**
1. Code editor bất kì mà bạn cảm thấy yêu thích và làm việc thoải mái với nó

2. Gợi ý: Visual Studio Code (VSCode)
    - Ưu điểm:
      - Nhẹ và chiếm ít tài nguyên máy khi chạy
      - Hỗ trợ ngôn ngữ JS ngay từ đầu, không cần cài thêm các plugins bên ngoài
    - Link download VSCode: [Download](https://code.visualstudio.com/)
  

**III. Tổng quan về Project**
1. Xây dựng 1 ứng dụng Chat chạy trên nền Web theo hướng Single Page Application (SPA)

2. Các chức năng chính:
    - Đăng kí tài khoản sử dụng Email
    - Đăng nhập bằng tài khoản đã đăng kí
    - Chat One-To-One
    - Chat nhóm
    - Danh sách bạn bè

3. Single Page Application
    - Đối với các website truyền thống, mỗi khi có tương tác của người dùng (Click a button, Submit a form, ...) thì trang web sẽ reload lại và các thông tin mới sẽ được hiển thị tương ứng. Cách làm này đối với những trang web có nhiều nội dung tĩnh (Blogs, báo mạng, ...) sẽ không có quá nhiều vấn đề, tuy nhiên đối với các trang web yêu cầu khả năng tương tác cao như ứng dụng chat chúng ta dự định làm sẽ có nhiều điểm bất lợi, đặc biệt là thời gian phản hồi lâu làm giảm trải nghiệm người dùng

    - Trong khi đó, 1 hướng xây dựng website khác đó là "Single Page Application (SPA)" lại có thể xử lí được vấn đề này. SPA là ứng dụng Web, chỉ có duy nhất 1 trang. Thay vì reload lại trang web mỗi khi có tương tác người dùng thì nội dung trang Web được thay đổi linh hoạt dựa theo tương tác của người dùng mà không cần reload.

    - Một số SPA nổi tiếng: Gmail, Google Maps, ...

    - Lợi ích của SPA:
      - Tốc độ: Thay vì phải reload lại `html`, `css`, `js` mỗi khi có tương tác của người dùng thì SPA chỉ load các tài nguyên này 1 lần.
      - Tiết kiệm băng thông: Mỗi khi có tương tác người dùng, SPA chỉ lấy những dữ liệu cần thiết từ server, những dữ liệu được dùng lặp lại giữa các trang sẽ không phải load lại.
      - Trải nghiệm người dùng tốt hơn khi tương tác sẽ được phản hồi nhanh hơn so với website truyền thống.


4. Mô hình MVC (Model - View - Controller) sẽ sử dụng trong project
    - Trong ngành phát triển phần mềm, có 1 nguyên tắc được tất cả các kĩ sư tuân theo đó là "Separation of concerns (SOC)" hoặc "Single Responsibility principle (SPP)". Theo đó, người ta sẽ chia phần mềm thành nhiều phần nhỏ, mỗi phần chỉ làm duy nhất 1 nhiệm vụ

    - Việc chia nhỏ này sẽ giúp dự án dễ quản lí, dễ mở rộng về sau. Hơn nữa còn tránh việc trùng lặp code, "dẫm chân" giữa các thành viên trong team

    - Trong phát triển web, mô hình MVC (Model - View - Controller) là một trong những ứng dụng được sử dụng nhiều nhất của nguyên tắc SOC. Theo đó, mô hình MVC sẽ chia ứng dụng web thành 3 thành phần chính:
        - Model: Là nơi lưu trữ trạng thái của App (App State). Dựa vào "App State" sẽ quyết định xem phần View sẽ hiển thị cho người dùng như thế nào. 
          - VD:
            - Màn hình nào đang được hiển thị cho người dùng nhìn thấy? màn hình Chat hay màn hình Login hay màn hình Register?
            - Cuộc hội thoại nào đang được hiển thị trong khung chat để người dùng tương tác?

        - View: Chịu trách nhiệm thay đổi giao diện App mỗi khi Model thay đổi.
          - VD:
            - Khi người dùng đăng nhập thành công, lúc này "App State" sẽ cập nhật trạng thái thành "Đã đăng nhập", từ đó View sẽ chuyển sang màn hình Chat thay vì màn hình Login
            - Khi có tin nhắn mới, View sẽ render tin nhắn đó lên khung chat

        - Controller: Là cầu nối tương tác giữa View và Controller
          - VD:
            - Để lưu lại dữ việu trong Model sau khi có tương tác của người dùng. View sẽ gọi thông qua Controller
            - Sau khi Model thay đổi và muốn cập nhật giao diện người dùng (View) thì sẽ gọi thông qua Controller

    - Sơ đồ tổng quát:

        ![MVC](/introduction/mvc.png?style)

        - Khi User tương tác với View => View sẽ gọi 1 hàm tương ứng trong Controller
        - Controller sẽ gọi Model để đọc ghi dữ liệu vào Database sau đó update "App State"
        - Khi "App State" được update => Model sẽ gọi 1 hàm tương ứng trên View để update giao diện người dùng


**IV. Bắt đầu project**
1. Trong phần này chúng ta sẽ tạo các folders + files theo mô hình MVC. Các folders + files này sẽ là bộ khung chính cho ứng dụng chat bao gồm:
    - 1 folder để chứa toàn bộ project
    - 4 folders con `css`, `html`, `js`, `images` để chứa các files tương ứng
    - File `style.css`. Đây là file `css` global của project. Các style được dùng đi dùng lại ở nhiều screen khác nhau sẽ nằm ở đây
    - 3 files `model.js`, `view.js`, `controller.js` tương ứng với 3 thành phần của mô hình MVC
    - File `components.js`. Đây sẽ là nơi chứa `html` của các screen khác nhau
    - File `index.js`. Đây sẽ là file JS đầu vào của ứng dụng
    - File `index.html`. Đây sẽ là file `html` duy nhất cho cả ứng dụng (SPA)

2. Tạo 1 folder, đặt tên tùy thích để toàn bộ code của ứng dụng chat

3. Bên trong folder vừa tạo, tạo tiếp lần lượt 4 folder con: `css`, `html`, `js`, `images`. Như tên của folder đã gợi ý => mỗi loại file sẽ nằm trong folder tương ứng.

    ![Cấu trúc folder](/introduction/folder-structure.png)

4. Tạo file `index.html` bên trong folder `html`. Thêm bộ khung cơ bản cho file `index.html`

    ```html
        <!DOCTYPE html>
        <html>
          <head>
            <meta charset="utf-8" />
            <meta http-equiv="X-UA-Compatible" content="IE=edge">
            <meta name="viewport" content="width=device-width, initial-scale=1">
            <link href="https://fonts.googleapis.com/css?family=Open+Sans" rel="stylesheet" />
            <link rel='stylesheet' type='text/css' href='../css/style.css' />
            <title>Chat App</title>
          </head>

          <body>
            <div id='app'></div>

            <script src="../js/components.js"></script>
            <script src="../js/model.js"></script>
            <script src="../js/view.js"></script>
            <script src="../js/controller.js"></script>
            <script src="../js/index.js"></script>
          </body>
        </html>
    ```

    - Ngoài ra, chúng ta sẽ link file `style.css` và các file javascript sẽ sử dụng trong app vào file HTML này. Các file này sẽ được tạo lần lượt phía sau

5. Tạo file `style.css` bên trong folder `css`. Bên trong file `style.css`, thêm đoạn code CSS như sau:

    ```css
      * {
        margin: 0;
        padding: 0;
        border: 0;
        box-sizing: border-box;
        font-family: 'Open Sans', sans-serif;
        font-size: 14px;
      }
    ```

6. Bên trong folder `js`, tạo lần lượt các file `model.js`, `view.js`, `controller.js`. Đây sẽ là các file `js` chính, chứa logic của ứng dụng. (Theo mô hình MVC)
    - Bên trong mỗi file `model.js`, `view.js`, `controller.js` sẽ chứa 1 object, bao gồm các hàm và thuộc tính mà file đó sẽ quản lí (theo mô hình MVC). Lần lượt khởi tạo các biến như sau:

        ```js
          // model.js
          const model = {};
        ```

        ```js
          // view.js
          const view = {};
        ```

        ```js
          // controller.js
          const controller = {};
        ```

7. Tạo file `components.js` trong folder `js`. Đây sẽ là nơi chúng ta lưu chữ phần HTML cho các màn hình dưới dạng template string, để dễ dàng sửa dụng khi cần chuyển qua lại giữa các màn hình
    - Khởi tạo giá trị cho màn hình "Đăng kí" trong file `components.js`:

    ```js
      const components = {};
      components.register = `
        <div>Register screen</div>
      `;
    ```

8. Tạo file `index.js` trong folder `js`. Trong file `index.js`, chúng ta sẽ khởi tạo màn hình "Đăng kí" mỗi khi ứng dụng mở lên:

    ```js
      window.onload = () => {
        view.setActiveScreen('register');
      };
    ```

- Thêm hàm `setActiveScreen()` vào file `view.js`:

    ```js
      view.setActiveScreen = (screenName) => {
        switch (screenName) {
          case 'register':
            document.getElementById('app').innerHTML = components.register;
            break;
        }
      };
    ```


*Nội dung của các files sau bài này: [Introduction Code](example)*

*Bài tiếp theo: [Login + Register UI](/login-register-ui/login-register-ui.md)*