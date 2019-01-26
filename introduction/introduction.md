## CI JS - Student book
### Introduction

**I. Mục tiêu khóa học**
- Nâng cao kiến thức về HTML, JS, CSS.
- Hiểu rõ về 1 hệ thống web hoàn chỉnh gồm nhiều thành phần tương tác với nhau thông qua việc xây dựng một ứng dụng chat trên nền Web.

**II. Yêu cầu tối thiểu đối với học viên**
* Về HTML:
  * Sử dụng thành thạo các thẻ cơ bản và các attributes của chúng
  * Nắm được cách link các file CSS, JS vào file HTML
* Về CSS:
  * Hiểu rõ cách css selector hoạt động
  * Nắm vững các thuộc tính  style cơ bản
* Về Javascript (JS):
  * Nắm rõ các cú pháp của ngôn ngữ lập trình JS
  * Hiểu được cách sử dụng ngôn ngữ JS để làm việc với DOM

**III. Công cụ cần thiết**
- 1 Code editor bất kì mà bạn cảm thấy yêu thích và làm việc thoải mái với nó.
- Gợi ý: Visual Studio Code (VSCode)
  - Ưu điểm:
    - Nhẹ và chiếm ít tài nguyên máy khi chạy
    - Hỗ trợ ngôn ngữ JS ngay từ đầu, không cần cài thêm các plugins bên ngoài
  - Link download VSCode: [Download](https://code.visualstudio.com/)
  
**III. Tổng quan về Project**
- Xây dựng 1 ứng dụng Chat chạy trên nền Web theo hướng Single Page Application (SPA)
- Các chức năng chính:
  - Đăng kí tài khoản sử dụng Email
  - Đăng nhập bằng tài khoản đã đăng kí
  - Chat One-To-One
  - Chat nhóm
  - Danh sách bạn bè

**- Single Page Application**
- Ứng dụng Web, chỉ có duy nhất 1 trang. Thay vì reload lại trang web mỗi khi có tương tác người dùng thì nội dung trang Web được thay đổi linh hoạt dựa theo tương tác của người dùng mà không cần reload.
- 1 số SPA nổi tiếng: Gmail, Google Maps, ...
- Lợi ích của SPA:
  - Tốc độ: Thay vì phải reload lại `html`, `css`, `js` mỗi khi có tương tác của người dùng thì SPA chỉ load các tài nguyên này 1 lần.
  - Tiết kiệm băng thông: Mỗi khi có tương tác người dùng, SPA chỉ lấy những dữ liệu cần thiết từ server, những dữ liệu được dùng lặp lại giữa các trang sẽ không phải load lại.
  - Trải nghiệm người dùng tốt hơn khi tương tác sẽ được phản hồi nhanh hơn so với website truyền thống.

**- Mô hình MVC(Model - View - Controller) sẽ sử dụng trong project**
- Mô hình MVC(Model - View - Controller) gồm 3 thành phần chính:
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
    - Controller sẽ gọi Model để đọc ghi dữ liệu vào Database sau đó update App State
    - Khi App State được update => Model sẽ gọi 1 hàm tương ứng trên View để update giao diện người dùng

**IV. Cấu trúc folder**
- Tạo 1 folder, đặt tên tùy thích, đây sẽ là nơi lưu trữ toàn bộ code của ứng dụng chat. Mở folder trên Code Editor.
- Bên trong folder vừa tạo, tạo tiếp lần lượt 4 folder con: `css`, `html`, `js`, `images`. Như tên của folder đã gợi ý => mỗi loại file sẽ nằm trong folder tương ứng.
        ![Cấu trúc folder](/introduction/folder-structure.png)

-  Tạo file `index.html` bên trong folder `html`. Đây sẽ là file `html` chính trong ứng dụng chat. Thêm bộ khung cơ bản cho file `index.html`.
    ```html
        <!DOCTYPE html>
        <html>
          <head>
            <meta charset="utf-8" />
            <meta http-equiv="X-UA-Compatible" content="IE=edge">
            <meta name="viewport" content="width=device-width, initial-scale=1">
            <link rel='stylesheet' type='text/css' href='../css/style.css' />
            <title>Chat App</title>
          </head>

          <body>
          </body>
        </html>
    ```

-  Tạo file `style.css` bên trong folder `css`. Đây là file `css` "global" của project (Sẽ chứa các style được dùng đi dùng lại ở nhiều screen khác nhau). Về sau sẽ có thêm nhiều sceen khác và các file css tương ứng với mỗi screen (chỉ chứa style dùng trong screen đó). Link file `style.css` vừa tạo vào file `index.html`:  
    ```html
      <link rel='stylesheet' type='text/css' href='../css/style.css' />
    ```

- Bên trong folder `js`, tạo lần lượt các file `index.js`, `model.js`, `view.js`, `controller.js`. Đây sẽ là các file `js` chính, chứa logic của ứng dụng. (Theo mô hình MVC)
        ![Cấu trúc folder](/introduction/folder-structure-2.png)

*Bài tiếp theo: [Login + Register UI](login-register-ui/login-register-ui.md)*