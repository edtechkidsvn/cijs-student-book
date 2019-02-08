## CI JS - Student book
### Firebase Authentication

Ở bài trước, ta đã xây dựng phần HTML cho trang đăng kí. Ở bài này, ta sẽ hoàn thành tính năng đăng kí với 2 phần cuối cùng:

    - Sử dụng Firebase để lưu thông tin đăng kí và gửi email xác nhận đến người dùng
    - Cho phép người dùng đăng nhập bằng tài khoản đã đăng kí

**I. Mục tiêu bài học**
1. Giới thiệu tổng quan về Firebase

2. Tạo 1 Firebase project. Tích hợp Firebase vào web app

3. Sử dụng Firebase Authentication để xác thực người dùng qua địa chỉ email


**II. Giới thiệu về Firebase**
- Trong phát triển phần mềm, có rất nhiều tính năng giống nhau ở các dự án (Đăng kí/Đăng nhập, gửi tin nhắn, thông báo, ...) điều này làm tốn khá nhiều thời gian của các lập trình viên. Firebase ra đời đã giúp tiết kiệm rất nhiều thời gian phát triển

1. Firebase là gì ?
    - Firebase là một nền tảng được sở hữu bởi Google, bao gồm nhiều dịch vụ khác nhau giúp quá trình phát triển phần mềm nhanh chóng và tiện lợi hơn
    - 1 số dịch vụ chính của Firebase:
      - "Cloud Firestore" và "Realtime Database": Cơ sở dữ liệu theo thời gian thực. Hỗ trợ đọc/ghi dữ liệu mà không cần phát triền một hệ thống back-end phức tạp. VD: Thay vì phải setup 1 hệ thống server để lưu trữ dữ liệu, chúng ta có thể lưu trữ dữ liệu lên CSDL của Firebase
      - "Firebase Authentication": Xác thưc, phân quyền người dùng trong ứng dụng theo nhiều cách khác nhau như Email, SĐT hoặc thông qua bên thứ 3 như tài khoản Gmail, Facebook, Twitter, ... VD: Sau khi người dùng đăng kí tài khoản bằng địa chỉ Email, Firebase có thể giúp chúng ra gửi email yêu cầu xác nhận đến địa chỉ vừa đăng kí
      - ML Kit: Các công cụ phục vụ cho việc nghiên cứu, phát triển, tích hợp Machine Learning

      ![Firebase Products](/firebase-authentication/firebase-products.png)
    
2. Ưu, nhược điểm của Firebase
    - Ưu điểm:
      - Dịch vụ đa dạng, rút ngắn đáng kể thời gian phát triển phần mềm
      - Quá trình tích hợp đơn giản. Hỗ trợ nhiều ngôn ngữ lập trình khác nhau
      - Đa nền tảng, sử dụng được cả trên IOS, Android và Web
    - Nhược điểm:
      - Khả năng truy vấn (lấy dữ liệu) từ CSDL còn hạn chế
      - Giá dịch vụ cao khi sử dụng cho các hệ thống lớn


**III. Tạo Firebase Project và cài đặt Firebase Authentication**
1. Tạo tài khoản Google
    - Để có thể sử dụng Firebase, ta sẽ cần 1 tài khoản Google. Mỗi tài khoản sẽ quản lí nhiều "Firebase Project" khác nhau. CSDL, cấu hình của mỗi project là độc lập và không liên quan đến nhau
    - Nếu đã có sẵn tài khoản Google (Gmail, Youtube, ...) thì có thể sử dụng luôn

2. Tạo Firebase Project
    - Truy cập vào https://firebase.google.com. Chọn "Sign In" ở góc trên bên phải màn hình và đăng nhập bằng tài khoản Google vừa tạo

    ![Firebase Signin](/firebase-authentication/firebase-sign-in.png)

    - Sau khi đăng nhập xong, chọn "Go to console" ở góc trên bên phải màn hình để chuyển sang màn hình quản lí projects

    - Sau khi chuyển sang màn hình "Console", chọn "Add project" để tạo Firebase Project mới

    - Trong Pop-up mở ra, điền "Project name" và đánh dấu vào ô "I accept terms ...", sau đó chọn "Create project"

    ![Create Firebase Project](/firebase-authentication/create-firebase-project-1.png)

3. Cài đặt Firebase Authentication
    - Trong màn hình quản lí project, chọn project vừa tạo để chuyển sang trang cài đặt

    - Chọn "Authentication" ở thanh menu bên tay trái để chuyển sang phần cài đặt Authentication

    ![Create Firebase Project](/firebase-authentication/create-firebase-project-2.png)

    - Chuyển sang tab "Sign-in Method" để cài đặt những phương thức xác thực tài khoản sẽ sử dụng. Ở đây, chúng ta chỉ sử dụng "Email/Password", click vào nút "Edit" của phần "Email/Password"

    ![Create Firebase Project](/firebase-authentication/firebase-authentication-config-1.png)

    - Trong Pop-up hiện ra, chọn "Enable" để sử dụng phương thức xác thực bằng "Email/Password", sau đó "Save" lại

    ![Create Firebase Project](/firebase-authentication/firebase-authentication-config-2.png)


**IV. Tích hợp Firebase vào ứng dụng**
1. Thêm thư viện Firebase vào project
    - Thêm thẻ `<script>` sau vào file `index.html`

    ```html
      <script src="https://www.gstatic.com/firebasejs/5.8.0/firebase.js"></script>
    ```

2. Khởi tạo Firebase
    - Tạo file `initializeFirebase.js` bên trong folder `js`

    - Trong màn hình cài đặt project, chọn "Project Overview" => "Add App" => "Web"

    ![Intergrate Firebase](/firebase-authentication/intergrate-firebase-1.png)

    ![Intergrate Firebase](/firebase-authentication/intergrate-firebase-2.png)

    - Trong Pop-up hiện ra, copy đoạn code khởi tại Firebase vào file `initializeFirebase.js`

    ```js
      const config = {
        apiKey: "",
        authDomain: "",
        databaseURL: "",
        projectId: "",
        storageBucket: "",
        messagingSenderId: ""
      };
      firebase.initializeApp(config);
    ```
  
    - Chú ý: Giá trị của các thuộc tính trong `config` sẽ thay đổi theo Firebase project của mỗi người

    - Link file `initializeFirebase.js` vào file `index.html`

    ```html
      <script src="https://www.gstatic.com/firebasejs/5.8.0/firebase.js"></script>
      <script src="../js/initializeFirebase.js"></script>
    ```
  
3. Kiểm tra lại Firebase đã được khởi tạo hay chưa
    - Thêm đoạn code sau vào file `index.js`
  
    ```js
      window.onload = () => {
        console.log(firebase.app().name);
        view.setActiveScreen('register');
      }
    ```

    - Nếu Firebase khởi tạo thành công thì `firebase.app().name` sẽ trả về string "[DEFAULT]"
  
    - Để kiểm tra, mở file `index.html` trên trình duyệt, chuột phải vào vị trí bất kì và chọn `inspect`, sau đó chuyển sang tab `console`


**V. Lưu thông tin đăng kí và gửi email xác thực với Firebase Authentication**
1. Lưu thông tin đăng kí và gửi email xác nhận
    - Để lưu thông tin đăng kí, ta sẽ sử dụng hàm `createUserWithEmailAndPassword()` và hàm `updateProfile()`. Gửi email xác thực cho người dùng bằng cách gọi hàm `sendEmailVerification()`. Thêm đoạn code sau vào hàm `controller.register()`

    ```js
      if (registerInfo.firstName && registerInfo.lastName && registerInfo.email && registerInfo.password && registerInfo.confirmPassword === registerInfo.password) {
        try {
          await firebase.auth().createUserWithEmailAndPassword(registerInfo.email, registerInfo.password);
  
          firebase.auth().currentUser.updateProfile({
            displayName: `${registerInfo.firstName} ${registerInfo.lastName}`,
          })

          firebase.auth().currentUser.sendEmailVerification();
          view.setMessage('form-success', 'Register success');
        } catch (error) {
          view.setMessage('form-error', error.message)
        }
      }
    ```

    - Vì hàm `createUserWithEmailAndPassword()` của Firebase là hàm bất đồng bộ nên ta sẽ update lại hàm `controller.register()` trở thành hàm `async`

    ```js
      controller.register = async (registerInfo) => {
        ...
      };
    ```

2. Update HTML, CSS để hiển thị kết quả đăng kí
    - Sau gọi hàm `sendEmailVerification()` xong, chúng ta sẽ hiển thị thông báo thành công tới người dùng 

    ```js
      view.setMessage('form-success', 'Register success');
    ```

    - Trong trường hợp có lỗi, chúng ta sẽ hiển thị thông báo lỗi này

    ```js
      view.setMessage('form-error').innerText = error.message;
    ```

    - Thêm 2 thẻ `div.form-success` và `div.form-error` vào component `register` trong file `controller.js`

    - Thêm style cho 2 thẻ này trong file `style.css`

    ```css
      .form-success {
        color: #52c41a;
        margin: 20px 0px;
        text-align: center;
      }

      .form-error {
        margin: 20px 0px;
        color: #f5222d;
        text-align: center;
      }
    ```

3. Kiểm tra lại email sau khi đăng kí
    - Nếu không có lỗi gì thì người dùng sẽ nhận được email yêu cầu xác nhận như sau:

    ![Verify Email 1](/firebase-authentication/verify-email-1.png)

    ![Verify Email 2](/firebase-authentication/verify-email-2.png)

    - Click vào đường link để xác nhận email. Sau đó người dùng có thể sử dụng tài khoản vừa đăng kí để đăng nhập vào ứng dụng chat


**VI. Cho phép người dùng đăng nhập bằng tài khoản vừa tạo**
1. Thực hiện cho người dùng đăng nhập
    ```js
      controller.login = async (loginInfo) => {
        ...

        if (loginInfo.email && loginInfo.password) {
          try {
            const loginResult = await firebase.auth().signInWithEmailAndPassword(loginInfo.email, loginInfo.password);

            if (!loginResult.user.emailVerified) {
              view.setMessage('form-error', 'Please verify your email first');
            } else {
              model.loginSuccess({
                uid: loginResult.user.uid,
                displayName: loginResult.user.displayName,
                email: loginResult.user.email,
              });

              view.setActiveScreen('chat');
            }
          } catch (error) {
            view.setMessage('form-error', error.message)
          }
        }
      };
    ```

    - Nếu `email` và `password` chính xác, kết quả đăng nhập sẽ được trả về và ta lưu trong biến `loginResult`

    - Từ biến `loginResult` ta sẽ kiểm tra được thông tin người dùng qua thuộc tính `user`. Ở đây ta sẽ kiểm tra xem email người dùng đã xác nhận hay chưa (`loginResult.user.emailVerified`)

2. Lưu thông tin người dùng đăg nhập thành công
    - Khởi tạo thuộc tính `model.authUser` với giá trị ban đầu là `undefined`:

    ```js
      model.authUser = undefined;
    ```

    - Sau khi đăng nhập thành công, ta sử dụng hàm `model.loginSuccess()` để cập nhật biến `authUser`. Thêm hàm `model.loginSuccess()`

    ```js
      model.loginSuccess = (authUser) => {
        model.authUser = authUser;
      };
    ```

3. Chuyển màn hình sau khi đăng nhập thành công
    - Sau khi người dùng đăng nhập thành công, chúng ta sẽ chuyển sang màn hình `chat`. Màn hình này sẽ là màn hình chính của ứng dụng, bao gồm danh sách các cuộc hội thoại, khung chat, ...

    - Tạm thời để kết thúc bài này, màn hình chat sẽ chỉ hiện thông tin của tài khoản vừa đăng nhập. Thêm đoạn code sau vào hàm `setActiveScreen()` trong file `view.js`:

        ```js
          case 'chat':
            // mount chat screen
            document.getElementById('app').innerHTML = `
              <div>UID: ${model.authUser.uid}</div>
              <div>Email: ${model.authUser.email}</div>
              <div>Display Name: ${model.authUser.displayName}</div>
            `;
            break;
        ```


*Nội dung của các files sau bài này: [Firebase Authentication Code](example)*

*Bài tiếp theo: [One to One Chat UI]*
