## CI JS - Student book
### Registration UI

**I. Mục tiêu bài học**
1. Xây dựng trang "Đăng kí tài khoản" bằng địa chỉ email
2. Tìm hiểu về "Form Validation". Áp dụng validate thông tin đăng kí của người dùng
    ![Màn hình đăng kí](/login-register-ui/register-ui.png)
    ![Màn hình đăng kí 2](/login-register-ui/register-ui-validation.png)

**II. Xây dựng màn hình "Đăng kí tài khoản"**
1. Tạo file `register.html` bên trong folder `html` và file `register.css` trong folder `css`. Thêm bộ khung html và link file `register.css` vào file `register.html`

2. Bên trong thẻ `<body>` của file `register.html`, thêm đoạn code như bên dưới:
    ```html
      <div class='register-container'>
        <div class='form-wrapper'>
          <div class='logo'>
            <span>Techkids Chat</span>
          </div>

          <div class='form-container'>
            <form id='register-form'>
            </form>
          </div>
        </div>
      </div>
    ```
    - Thẻ `div.register-container` sẽ chứa toàn bộ nội dung của màn hình đăng nhập. Đây cũng sẽ là nơi chúng ta đặt `background-image`
  - Thẻ `div.form-wrapper` sẽ là phần nội dung chính, chứa Logo + Form đăng kí. Phần này sẽ luôn  nằm phía bên tay phải màn hình

3. Bên trong file `register.css`, thêm style cho thẻ `div.register-container` như sau:
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
    ```
    - Thuộc tính `height: 100vh` (vh: view height) đảm bảo `div.register-container` sẽ luôn chiếm toàn bộ chiều dài của sổ trình duyệt
    - Thuộc tính `justify-content: flex-end` sẽ giữ thẻ `div.form-wrapper` luôn ở bên phải của màn hình

4. Tiếp tục thêm style cho thẻ `div.form-wrapper`:
    ```css
      .register-container .form-wrapper {
        width: 500px;
        min-width: 400px;
        height: 100%;
        padding: 70px 50px;
        background-color: #ffffff;
      }
    ```

5. Phần logo "Techkids" sẽ có style như sau:
    ```css
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
    ```

6. Kết quả ta sẽ có 1 trang `html` như sau:
    ![Kết quả 1](/login-register-ui/result-1.png)

7. Tiếp theo, thêm các trường cần thiết cho Form đăng kí. Thêm đoạn code `html` như bên dưới vào trong thẻ `form#register-form`:
    ```html
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
        <a id='login-button'>Already have an account? Login</a>
        <button class='btn' type='submit'>
          <span>Register</span>
        </button>
      </div>
    ```
    - Ở đây, chúng ta muốn tất cả các ô input sẽ có style giống nhau và có thể tái sử dụng ở nhiều màn hình khác nhau, vì vậy các thẻ input đều có class là .input và được đặt trong 1 thẻ div.input-wrapper. Tương tự với class .btn

8. Thêm phần style cho class `.input`, class `.input-wrapper` và class `.btn` bên trong file `style.css` như sau (file `style.css` sẽ chứa các style dùng đi dùng lại ở nhiều màn hình khác nhau):
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
    ```
    - Như vậy, ở bất kì màn hình nào, nếu sử dụng thẻ `<input>` hoặc `<button>`, ta chỉ cần thêm class `.input` hoặc `.btn` là đã có được style như mong muốn

9. Quay trở lại file `register.css`, thêm style cho thẻ `div.name-wrapper` và thẻ `div.register-footer` để  căn chỉnh các item nằm trên 1 hàng ngang:
    ```css
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
    ```

10. Vậy là ta đã có 1 trang html như thiết kế:
    ![Kết quả 1](/login-register-ui/result-2.png)

**III. Form validation**
1. "Form validation" là gì ?
    - Nếu đã từng đăng kí tài khoản để sử dụng bất kì một dịch vụ nào đó trên Internet, bạn sẽ không còn lạ lẫm với những thông báo như:
      - Vui lòng nhập đầy đủ họ tên
      - Địa chỉ email không hợp lệ
      - Mật khẩu phải chứa ít nhất 8 kí tự, ...
    - Quá trình này được gọi là "Form validation". Khi bạn điền thông tin vào Form, website sẽ kiểm tra thông tin bạn vừa nhập có đúng và đầy đủ hay không. Nếu không đúng hoặc thiếu thông tin => website sẽ hiển thị một thông báo cho bạn biết thông tin của bạn đang bị sai.

2. Tại sao cần "Form validation" ?
    - Bảo vệ website của bạn khỏi thông tin không chính xác hoặc thậm chí là các biện pháp tấn công từ hackers
    - Tránh việc dữ liệu không thống nhất giữa các người dùng khác nhau

3. Các loại "Form validation"
    - "Form validation" trên trình duyệt (Client-side validation): Quá trình kiểm tra dữ liệu diễn ra ngay trên trình duyệt. Nếu dữ liệu không đúng hoặc bị thiếu, sẽ có thông báo tương ứng cho người dùng => Tăng trải nghiệm người dùng. Tuy nhiên việc kiểm tra dữ liệu trên trình duyệt có thể dễ dàng bị vượt qua
    - "Form validation" trên server (Server-side validation): Quá trình kiểm tra dữ liệu diễn ra ở máy chủ của nhà cung cấp website. Thông thường việc kiểm tra sẽ được thực hiện nghiêm ngặt trên server trước khi dữ liệu được lưu lại trong cơ sở dữ liệu

4. Thêm phần validation cho Form đăng kí:
    ![Form validation](/login-register-ui/form-validation.png)
    - Khi người dùng nhấn nút đăng kí mà 1 trong các trường bị thiếu, chúng tra sẽ hiển thị thông báo tương ứng như hình trên

5. Đầu tiên, ta sẽ cần 1 thẻ `div` để hiển thị thông báo nằm ngay dưới mỗi ô input. Ban đầu, các thẻ div này sẽ không có nội dung gì. Khi người dùn nhấn nút "Register", chúng ta sẽ kiểm tra nội dung của mỗi ô `input` và hiển thị thông báo nếu thông tin bị thiếu. Trong file `register.html`, bên trong mỗi thẻ `div.input-wrapper`, thêm thẻ `div.error` ngay bên dưới thẻ input như sau:
    ```html
      <div class='name-wrapper'>
        <div class='input-wrapper'>
          <input class='input' type="text" name="firstName" placeholder="First name" />
          <div id='firstName-error' class='error'></div>
        </div>
        <div class='input-wrapper'>
          <input class='input' type="text" name="lastName" placeholder="Last name" />
          <div id='lastName-error' class='error'></div>
        </div>
      </div>
      <div class='input-wrapper'>
        <input class='input' type="email" name="email" placeholder="Email" />
        <div id='email-error' class='error'></div>
      </div>
      <div class='input-wrapper'>
        <input class='input' type="password" name="password" placeholder="Password" />
        <div id='password-error' class='error'></div>
      </div>
      <div class='input-wrapper'>
        <input class='input' type="password" name="confirmPassword" placeholder="Confirm password" />
        <div id='confirmPassword-error' class='error'></div>
      </div>
      <div id='form-error' class='form-error'></div>
      <div id='form-success' class='success'></div>
      <div class='input-wrapper space-between'>
        <a id='loggin-button'>Already have an account? Login</a>
        <button class='btn' type='submit'>
          <div id='loader' class='loader'></div>
          <span>Register</span>
        </button>
      </div>
    ```
    - Tương tự như class `.input` và `.btn`, class `.error` cũng sẽ được sử dụng ở nhiều screen khác nhau

6. Thêm style cho class `.error` trong file `style.css`:
    ```css
      .error {
        color: #f5222d;
      }
    ```
7. Lắng nghe sự kiện `submit` của Form để lấy
    - Khi ta click `<button type='submit'>` nằm bên trong 1 form thì sự kiện `submit` sẽ được kích hoạt. Để lắng nghe sự kiện này ta sẽ sử dụng hàm `addEventListener()` của form element. Bên trong file `view.js` thêm đoạn code như sau:
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
    - Đầu tiên chúng ta gọi hàm `e.preventDefault()` để ngăn chặn hành động mặc định của form (Tự động submit)
    - Sau đó chúng ta lấy giá trị của các ô `input` thông qua attribute `name` của chúng
    - Các thông tin người dùng nhập vào này sẽ được truyền qua hàm `register()` của file controller để tiến hành validate

8. Validate dữ liệu
    - Thêm hàm `register()` vào file `controller.js` như sau:
        ```js
          controller.register = (registerInfo) => {
            if (!registerInfo.firstName) {
              document.getElementById('firstName-error').innerText = 'Please input your first name';
            } else {
              document.getElementById('firstName-error').innerText = '';
            }
          };
        ```
    - Ở đây param `registerInfo` truyền vào sẽ có dạng 1 `object`
    - Chúng ta kiểm tra xem trong object `registerInfo` có chứa thông tin về `firstName` hay không ? Nếu không chúng ta sẽ sử dụng thuộc tính `innerText` để set nội dung của thẻ `div#firstName-error` thành một thông báo yêu cầu nhập "first name". Nếu như có thông tin về `firstName`, chúng ta sẽ set nội dung của thông báo thành 1 string rỗng
    - Làm tương tự với các trường còn lại trong form đăng kí, ta sẽ có hàm `register()` hoàn chỉnh như sau:
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
    - Chú ý trường hợp `registerInfo.confirmPassword`, với trường hợp này chúng ta phải kiểm tra 2 điêu kiện là `confirmPassword` có hay không và nếu có thì `confirmPassword` có bằng với `password` hay không
    - Nhận thấy ở đây, việc sử dụng hàm `getElementById().innerText` được lặp lại khá nhiều, thêm nữa công việc thay đổi giao diện người dùng là nhiệm vụ của view (mô hình MVC), vì vậy chúng ta sẽ viết 1 hàm `setMessage` trong file `view.js` để sử dụng cho tất cả các trường hợp:
        ```js
          view.setMessage = (elementId, message) => {
            document.getElementById(elementId).innerText = message;
          }
        ```
        - Hàm set message sẽ nhận vào 2 params là `elementId`: `id` của thẻ sẽ hiển thị thông báo, và `message`: nội dung của thông báo
    - Khi đó hàm `register()` trong file `controller.js` của chúng ta có thể được viết lại như sau:
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
    - **Bài tập:**
      - Làm 1 trang "Đăng nhập" tương tự như trang "Đăng kí" với 2 trường là "Email" và "Password"
      - Thực hiện Form validation với thông tin người dùng nhập vào của 2 trường này

**IV. Refactor code cho Single Page Application (SPA)**
1. Tạo file `components.js` bên trong folder `js`. Khởi tạo biến 
    ```js
      const components = {};    
    ```
- Copy toàn bộ phần `div.register-container` vào file `components.js` như sau:
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
                    <div id='firstName-error' class='error'></div>
                  </div>
                  <div class='input-wrapper'>
                    <input class='input' type="text" name="lastName" placeholder="Last name" />
                    <div id='lastName-error' class='error'></div>
                  </div>
                </div>
                <div class='input-wrapper'>
                  <input class='input' type="email" name="email" placeholder="Email" />
                  <div id='email-error' class='error'></div>
                </div>
                <div class='input-wrapper'>
                  <input class='input' type="password" name="password" placeholder="Password" />
                  <div id='password-error' class='error'></div>
                </div>
                <div class='input-wrapper'>
                  <input class='input' type="password" name="confirmPassword" placeholder="Confirm password" />
                  <div id='confirmPassword-error' class='error'></div>
                </div>
                <div class='input-wrapper register-footer'>
                  <a id='loggin-button'>Already have an account? Login</a>
                  <button class='btn' type='submit'>
                    <span>Register</span>
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      `;
      components.login = // Phần code html của trang login vừa hoàn thành ở Bài tập của phần III
    ```

2. Bên trong file `view.js`, tạo 1 hàm tên là `setActiveScreen()`:
    ```js
      view.setActiveScreen = (screenName) => {
        switch (screenName) {
          case 'login':
            // mount login screen
            document.getElementById('app').innerHTML = components.login;
            break;
          case 'register':
            // mount register screen
            document.getElementById('app').innerHTML = components.register;
            break;
      };
    ```
    - Chúng ta sẽ set nội dung của thẻ `div#app` trong file `index.html` tương ứng với param `screenName` truyền vào. Như vậy, ta có thể thay đổi giao diện linh hoạt dựa trên tương tác của người dùng
- Ngoài việc set nội dung của thẻ `div#app`, hàm `setActiveScreen()` sẽ làm thêm nhiệm vụ "lắng nghe" các sự kiện của mỗi `screen`:
    ```js
      view.setActiveScreen = (screenName) => {
        switch (screenName) {
          case 'login':
            // mount login screen
            document.getElementById('app').innerHTML = components.login;
            break;
          case 'register':
            // mount register screen
            document.getElementById('app').innerHTML = components.register;

            // add form submit listeners
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

            // add register button listeners
            document.getElementById('loggin-button').addEventListener('click', () => view.setActiveScreen('login'));
            break;
      };
    ```
    - Chúng ra sẽ chuyển phần code "lắng nghe" from submit từ bên ngoài vào bên trong hàm `setActiveScreen()`. Ngoài ra, khi có sự kiện `click` vào dòng chữ `Already have an account? Login`, chúng ra sẽ chuyển sang màn hình "Đăng nhập"
    - **Bài tập:** Thêm phần code "lắng nghe" các sự kiện của trang "Đăng kí" vào nhánh `login` trong câu lệnh switch của hàm `setActiveScreen()`

- Mở file `index.js`, đây chính là file đầu vào của ứng dụng, tại đây chúng ra sẽ khởi tạo màn hình đầu tiên là màn hình "đăng kí" như sau:
    ```js
      window.onload = () => {
        view.setActiveScreen('register');
      }
    ```
*Nội dung của các files sau bài này: [Login + Register UI Code](login-register-ui/example)*

*Bài tiếp theo: [Firebase Authentication]*

