## CI JS - Student book
### Registration UI

Đăng kí và Đăng nhập là những tính năng quan trọng, gần như không thể thiếu trong các ứng dụng web. Trong 2 bài tiếp theo, chúng ta sẽ xây dựng tính năng "Đăng kí tài khoản" qua các bước sau:

    - Dựng khung HTML + CSS cho trang Đăng kí
    - Kiểm tra tính hợp lệ của thông tin người dùng nhập (Input validation)
    - Sử dụng Firebase để lưu thông tin đăng kí và gửi email xác nhận đến người dùng
    - Cho phép người dùng đăng nhập bằng tài khoản đã đăng kí

**I. Mục tiêu bài học**
1. Dựng khung HTML + CSS cho trang "Đăng kí tài khoản"

2. Tìm hiểu về "Input Validation". Áp dụng validate thông tin đăng kí của người dùng

    ![Màn hình đăng kí 1](/login-register-ui/register-ui.png)

    ![Màn hình đăng kí 2](/login-register-ui/register-ui-validation.png)


**II. Xây dựng màn hình "Đăng kí tài khoản"**
1. Thêm phần code `html` cho màn hình đăng kí vào file `components.js`:

    ```js
      components.register = `
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
                  </div>
                  <div class='input-wrapper'>
                    <input class='input' type="text" name="lastName" placeholder="Last name" />
                  </div>
                </div>

                <div class='input-wrapper'>
                  <input class='input' type="email" name="email" placeholder="Email" />
                </div>

                <div class='input-wrapper'>
                  <input class='input' type="password" name="password" placeholder="Password" />
                </div>

                <div class='input-wrapper'>
                  <input class='input' type="password" name="confirmPassword" placeholder="Confirm password" />
                </div>

                <div class='input-wrapper register-footer'>
                  <a id='already-have-account'>Already have an account? Login</a>
                  <button class='btn' type='submit'>
                    <span>Register</span>
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      `;
    ```

2. Thêm style cho màn hình "Đăng kí"
- Tạo file `register.css` trong folder `css`, thêm style cho thẻ `div.register-container` và thẻ `div.form-wrapper` như sau:

    ```css
      .register-container {
        width: 100%;
        min-width: 400px;
        height: 100vh;
        display: flex;
        justify-content: flex-end;
        align-items: center;
        position: relative;
        background: url("../images/login-background.jpg") no-repeat center center;
        background-size: cover;
      }


      .register-container .form-wrapper {
        width: 500px;
        min-width: 400px;
        height: 100%;
        padding: 70px 50px;
        background-color: #ffffff;
      }

      .register-container .form-wrapper .logo {
        width: 100%;
        display: flex;
        margin-bottom: 50px;
        justify-content: center;
      }

      .register-container .form-wrapper .logo span {
        font-size: 32px;
        font-weight: 300;
        color: #788195;
      }

      .register-container .form-wrapper .form-container .name-wrapper {
        display: flex;
        justify-content: space-between;
      }

      .register-container .form-wrapper .form-container .name-wrapper .input-wrapper {
        width: 48%;
      }

      .register-container .form-wrapper .form-container .register-footer {
        display: flex;
        justify-content: space-between;
      }

      .register-container .form-wrapper .form-container .register-footer #already-have-account {
        cursor: pointer;
      }
    ```

    - Thuộc tính `height: 100vh` (vh: view height) đảm bảo `div.register-container` sẽ luôn chiếm toàn bộ chiều dài của sổ trình duyệt
    - Thuộc tính `justify-content: flex-end` sẽ giữ thẻ `div.form-wrapper` luôn ở bên phải của màn hình

- Thêm style cho class `.input` và `.error` 
    - Ở đây, chúng ta muốn tất cả các ô input sẽ có style giống nhau và có thể tái sử dụng ở nhiều màn hình khác nhau, vì vậy các thẻ input đều có class là `.input`. Tương tự với class `.btn` và class `.error`

    - Các style này sẽ được dùng lặp lại ở nhiều màn hình khác nhau nên ta sẽ thêm style cho class `.input`, `.input-wrapper`, `.btn` và `.error` bên trong file `style.css`:

        ```css
          .input-wrapper {
            margin-bottom: 15px;
          }

          .input {
            height: 42px;
            padding: 6px 10px;
            width: 100%;
            cursor: text;
            text-align: left;
            font-size: 13px;
            line-height: 1.5;
            color: #595959;
            background-color: #fff;
            background-image: none;
            border: 1px solid #e9e9e9;
            border-radius: 5px;
          }

          .btn {
            font-weight: 500;
            color: #ffffff;
            background-color: #4482FF;
            border-color: #4482FF;
            display: inline-block;
            margin-bottom: 0;
            text-align: center;
            cursor: pointer;
            border: 1px solid transparent;
            white-space: nowrap;
            line-height: 1.5;
            padding: 0 25px;
            font-size: 14px;
            border-radius: 4px;
            height: 36px;
          }

          .error {
            color: #f5222d;
          }
        ```
  
    - Như vậy, ở bất kì màn hình nào, nếu sử dụng thẻ `<input>` hoặc `<button>`, ta chỉ cần thêm class `.input` hoặc `.btn`

- Lắng nghe sự kiện `click` của nút "Already have an account"
    - Thêm đoạn code sau vào hàm `view.setActiveScreen()`:

        <pre>
          view.setActiveScreen = (screenName) => {
            switch (screenName) {
              case 'register':
                // mount register screen
                document.getElementById('app').innerHTML = components.register;
                
                // add register button listeners
                <b>document.getElementById('already-have-account').addEventListener('click', () => view.setActiveScreen('login'));</b>
                ...
            }
          };
        </pre>

- Kết quả:

    ![Kết quả 1](/login-register-ui/result-2.png)


**III. Input validation**

1. "Input validation" là gì ?
    - Nếu đã từng đăng kí tài khoản để sử dụng bất kì một dịch vụ nào đó trên Internet, bạn sẽ không còn lạ lẫm với những thông báo như:
      - Vui lòng nhập đầy đủ họ tên
      - Địa chỉ email không hợp lệ
      - Mật khẩu phải chứa ít nhất 8 kí tự, ...

    - Quá trình này được gọi là "Input validation". Khi bạn điền thông tin vào Form, website sẽ kiểm tra thông tin bạn vừa nhập có đúng và đầy đủ hay không. Nếu không đúng hoặc thiếu thông tin => website sẽ hiển thị một thông báo cho bạn biết thông tin của bạn đang bị sai

2. Thực hiện "Input validation" cho trang "Đăng kí"

    ![Form validation](/login-register-ui/form-validation.png)

    - Thực hiện bắt sự kiện submit (Đây là sự kiện khởi đầu quá trình validation)
      - Thêm đoạn code sau vào hàm `view.setActiveScreen()`:

      ```js
        const registerForm = document.getElementById('register-form');

        registerForm.addEventListener('submit', (e) => {
          ...
        });
      ```
    
    - Thực hiện lấy input người dùng từ form và validate input người dùng bằng cách truyền thông tin qua hàm `controller.register()`

      ```js
        const registerForm = document.getElementById('register-form');

        registerForm.addEventListener('submit', (e) => {
          e.preventDefault();

          const registerInfo = {
            firstName: registerForm.firstName.value,
            lastName: registerForm.lastName.value,
            email: registerForm.email.value,
            password: registerForm.password.value,
            confirmPassword: registerForm.confirmPassword.value,
          };


          controller.register(registerInfo);
        });
      ```

    - Validate input người dùng trong `controller`

      ```js
        controller.register = (registerInfo) => {
          if (!registerInfo.firstName) {
            document.getElementById('firstName-error').innerText = 'Please input your first name';
          } else {
            document.getElementById('firstName-error').innerText = '';
          }
        };
      ```

      - Ở đây param `registerInfo` truyền vào sẽ có dạng 1 `object`. Nếu không chúng ta sẽ sử dụng thuộc tính `innerText` để set nội dung của thẻ `div#firstName-error` thành một thông báo yêu cầu nhập "First name". Tương tự với các trường còn lại trong form đăng kí:

      ```js
        controller.register = (registerInfo) => {
          if (!registerInfo.firstName) {
            document.getElementById('firstName-error').innerText = 'Please input your first name';
          } else {
            document.getElementById('firstName-error').innerText = '';
          }

          if (!registerInfo.lastName) {
            document.getElementById('lastName-error').innerText = 'Please input your last name';
          } else {
            document.getElementById('lastName-error').innerText = '';
          }

          if (!registerInfo.email) {
            document.getElementById('email-error').innerText = 'Please input your email';
          } else {
            document.getElementById('email-error').innerText = '';
          }

          if (!registerInfo.password) {
            document.getElementById('password-error').innerText = 'Please input your password';
          } else {
            document.getElementById('password-error').innerText = '';
          }

          if (!registerInfo.confirmPassword || registerInfo.confirmPassword !== registerInfo.password) {
            document.getElementById('confirmPassword-error').innerText = 'Confirm password didnt match';
          } else {
            document.getElementById('confirmPassword-error').innerText = '';
          }
        };
      ```

      - Nhận thấy ở đây, việc sử dụng hàm `getElementById().innerText` được lặp lại khá nhiều, thêm nữa công việc thay đổi giao diện người dùng là nhiệm vụ của `view` (mô hình MVC), vì vậy chúng ta sẽ viết 1 hàm `setMessage()` trong file `view.js` để sử dụng chung:

      ```js
        view.setMessage = (elementId, message = '') => {
          document.getElementById(elementId).innerText = message;
        }
      ```

      - Refactor lại hàm `controller.register()`:
      
      ```js
        controller.register = (registerInfo) => {
          if (!registerInfo.firstName) {
            view.setMessage('firstName-error', 'Please input your first name');
          } else {
            view.setMessage('firstName-error', '');
          }

          if (!registerInfo.lastName) {
            view.setMessage('lastName-error', 'Please input your last name');
          } else {
            view.setMessage('lastName-error', '');
          }

          if (!registerInfo.email) {
            view.setMessage('email-error', 'Please input your email');
          } else {
            view.setMessage('email-error', '');
          }

          if (!registerInfo.password) {
            view.setMessage('password-error', 'Please input your password');
          } else {
            view.setMessage('password-error', '');
          }

          if (!registerInfo.confirmPassword || registerInfo.confirmPassword !== registerInfo.password) {
            view.setMessage('confirmPassword-error', 'Confirm password didnt match');
          } else {
            view.setMessage('confirmPassword-error', '');
          }
        };
      ```

    - Update HTML, CSS để hiển thị kết quả validate input
      - Thêm thẻ `div.error` với id tương ứng vào ngay bên dưới mỗi thẻ input

      ```html
        <div id='firstName-error' class='error'></div>
      ```

      - Thêm style cho class `.error` trong file `style.css`

      ```css
        .error {
          color: #f5222d;
        }
      ```

- **Bài tập:**
    - Làm 1 trang "Đăng nhập" tương tự như trang "Đăng kí" với 2 trường là "Email" và "Password"
    - Thực hiện validate với thông tin người dùng nhập vào của 2 trường này


*Nội dung của các files sau bài này: [Login + Register UI Code](example)*

*Bài tiếp theo: [Firebase Authentication](/firebase-authentication/firebase-authentication.md)*

