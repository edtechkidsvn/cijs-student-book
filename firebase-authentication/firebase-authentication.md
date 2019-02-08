## CI JS - Student book
### Firebase Authentication

**I. Mục tiêu bài học**
1. Giới thiệu tổng quan về Firebase
2. Tạo 1 Firebase project. Tích hợp Firebase vào web app
3. Sử dụng Firebase Authentication để xác thực người dùng qua địa chỉ email

**II. Giới thiệu về Firebase**
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

2. Truy cập vào https://firebase.google.com. Chọn "Sign In" ở góc trên bên phải màn hình và đăng nhập bằng tài khoản Google vừa tạo

    ![Firebase Signin](/firebase-authentication/firebase-sign-in.png)

3. Sau khi đăng nhập xong, chọn "Go to console" ở góc trên bên phải màn hình để chuyển sang màn hình quản lí projects

4. Tạo Firebase Project
    - Sau khi chuyển sang màn hình "Console", chọn "Add project" để tạo Firebase Project mới
    - Trong Pop-up mở ra, điền "Project name" và đánh dấu vào ô "I accept terms ...", sau đó chọn "Create project"

    ![Create Firebase Project](/firebase-authentication/create-firebase-project-1.png)

5. Cài đặt Firebase Authentication
    - Trong màn hình quản lí project, chọn project vừa tạo để chuyển sang trang cài đặt
    - Chọn "Authentication" ở thanh menu bên tay trái

    ![Create Firebase Project](/firebase-authentication/create-firebase-project-2.png)

    - Chuyển sang tab "Sign-in Method", click vào nút "Edit" của phần "Email/Password"

    ![Create Firebase Project](/firebase-authentication/firebase-authentication-config-1.png)

    - Trong Pop-up hiện ra, chọn "Enable" sau đó "Save" lại

    ![Create Firebase Project](/firebase-authentication/firebase-authentication-config-2.png)

=> Như vậy, ta đã tạo thành công Firebase Project và cài đặt để có thể sử dụng "Email/Password" cho quá trình xác thực người dùng trong ứng dụng của chúng ta

**IV. Tích hợp Firebase vào ứng dụng**

1. Tạo file `initializeFirebase.js` bên trong folder `js`

2. Trong màn hình cài đặt project, chọn "Project Overview" => "Add App" => "Web"

    ![Intergrate Firebase](/firebase-authentication/intergrate-firebase-1.png)

    ![Intergrate Firebase](/firebase-authentication/intergrate-firebase-2.png)

3. Trong Pop-up hiện ra, copy đoạn code sau vào file `initializeFirebase.js` để khởi tạo Firebase
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

4. Link Firebase và file `initializeFirebase.js` vào file `index.html` bằng cách thêm 2 thẻ sau vào bên trong thẻ `<head>`:
    ```html
      <script src="https://www.gstatic.com/firebasejs/5.8.0/firebase.js"></script>
      <script src="../js/initializeFirebase.js"></script>
    ```
5. Kiểm tra lại Firebase đã được khởi tạo hay chưa
    - Thêm đoạn code sau vào file `index.js`:
    ```js
      window.onload = () => {
        console.log(firebase.app().name);
        view.setActiveScreen('register');
      }
    ```
    - Mở file `index.html` trên trình duyệt, chuột phải vào vị trí bất kì và chọn `inspect`, sau đó chuyển sang tab `console`. Nếu xuất hiện dòng chữ "[DEFAULT]" thì ta đã khởi tạo Firebase thành công

**V. Xác thực email người dùng với Firebase Authentication**

1. Tiếp tục với màn hình đăng kí tài khoản, nếu thông tin người dùng nhập vào vượt qua được các bước "validation" thì chúng ta sẽ tiến hành lưu trữ tài khoản của người dùng vào Firebase. Mở file `controller.js`, vì thao tác lưu dữ liệu lên Firebase là thao tác bất đồng bộ (Asynchronous) nên đầu tiên, chuyển hàm `register()` thành hàm async:

    ```js
      controller.register = async (registerInfo) => {
        ...
      };
    ```

2. Bên trong hàm `register()`, thêm đoạn code sau vào bên dưới phần validation để lưu thông tin tài khoản người dùng vừa đăng kí vào Firebase:

    ```js
      // make sure all user information is correct
      if (registerInfo.firstName && registerInfo.lastName && registerInfo.email && registerInfo.password && registerInfo.confirmPassword === registerInfo.password) {
        try {
          // create an user account with createUserWithEmailAndPassword()
          const newUser = await firebase.auth().createUserWithEmailAndPassword(registerInfo.email, registerInfo.password);

          // if create user success => update user displayName
          firebase.auth().currentUser.updateProfile({
            displayName: `${registerInfo.firstName} ${registerInfo.lastName}`,
          });

          // finally, we send a verify email to user's email address
          firebase.auth().currentUser.sendEmailVerification();
        } catch (error) {
          console.log(error);
        }
      }
    ```
    - Hàm `createUserWithEmailAndPassword()` của Firebase là hàm bất đồng bộ, nhận vào 2 params là `email` và `password` của tài khoản vừa đăng kí. Nếu thành công hàm này sẽ trả về thông tin tài khoản vừa tạo và ta lưu nó trong biến `newUser`
    - Sử dụng biến `newUser`, chúng ta sẽ có thể cập nhật thông tin (`displayName`) theo thông tin người dùng nhập vào và cuối cùng là gửi email xác nhận cho người dùng

3. Mở tab `console` để kiểm tra, nếu không có lỗi gì thì người dùng sẽ nhận được email yêu cầu xác nhận như sau:

    ![Verify Email 1](/firebase-authentication/verify-email-1.png)

    ![Verify Email 2](/firebase-authentication/verify-email-2.png)

- Click vào đường link để xác nhận email. Sau đó người dùng có thể sử dụng tài khoản vừa đăng kí để đăng nhập vào ứng dụng chat của chúng ta

**VI. Cho phép người dùng đăng nhập bằng tài khoản vừa tạo**

1. Tương tự như phần đăng kí, đăng nhập cũng là thao tác bất đồng bộ (Asynchronous) nên đầu tiên, chuyển hàm `login()` thành hàm async:

    ```js
      controller.login = async (loginInfo) => {
        ...
      };
    ```

2. Để cho phép người dùng đăng nhập, chúng ta sẽ sử dụng hàm `signInWithEmailAndPassword()` như sau:

    ```js
      // make sure all user information is correct
      if (loginInfo.email && loginInfo.password) {
        try {
          // sign in user with email + password
          const loginResult = await firebase.auth().signInWithEmailAndPassword(loginInfo.email, loginInfo.password);

          // after sign in, check if user email is verified
          if (!loginResult.user.emailVerified) {
            view.displayMessage('email-error', 'Please verify your email first');
          } else {
            // save user info to model
            model.loginSuccess({
              uid: loginResult.user.uid,
              displayName: loginResult.user.displayName,
              email: loginResult.user.email,
            });

            // change screen
            view.setActiveScreen('chat');
          }
        } catch (error) {
          console.log(error);
        }
      }
    ```
    - Nếu `email` và `password` chính xác, kết quả đăng nhập sẽ được trả về và ta lưu trong biến `loginResult`. Nếu không đúng Firebase sẽ throw `error`
    - Từ biến `loginResult` ta sẽ kiểm tra được thông tin người dùng qua thuộc tính `user`. Ở đây ta sẽ kiểm tra xem email người dùng đã xác nhận hay chưa (`loginResult.user.emailVerified`)
    - Nếu email đã xác nhận, quá trình đăng nhập thành công, ta lưu thông tin người dùng vừa đăng nhập vào model và chuyển màn hình sang phần `chat`

3. Lưu thông tin người dùng đăg nhập thành công
    - Mở file `model.js`, khởi tạo thuộc tính `authUser` với giá trị ban đầu là `undefined`:

    ```js
      model.authUser = undefined;
    ```

    - Thêm hàm `loginSuccess()` trong file `model.js`. Hàm này sẽ cập nhật `authUser` sau khi người dùng đăng nhập thành công:

    ```js
      model.loginSuccess = (authUser) => {
        model.authUser = authUser;
      };
    ```
    - Hàm `loginSuccess()` sẽ nhận vào 1 param là `authUser`, đây là 1 object chứa thông tin về tài khoản vừa đăg nhập bao gồm `uid`, `displayName`, `email`

4. Chuyển màn hình sau khi đăng nhập thành công
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
