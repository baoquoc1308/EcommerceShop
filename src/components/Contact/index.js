import emailjs from '@emailjs/browser'
import '../Contact/index.scss'
import React, { useEffect, useRef, useState } from 'react'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { useNavigate } from 'react-router-dom'

export const Contact = props => {
  props.myFun(false)
  props.myFun2(true)
  // khởi tạo state cho các trường dữ liệu của form
  const [formData, setFormData] = useState({
    user_name: '',
    user_email: '',
    user_phone: '',
    message: '',
  })
  // khởi tạo state cho việc quản lý lỗi của form
  const [formErrors, setFormErrors] = useState({
    user_name: false,
    user_email: false,
    user_phone: false,
    message: false,
  })
  // Tạo một ref để tham chiếu đến form
  // Tạo một tham chiếu (ref) React, được đặt tên là form. Tham chiếu React là một đối tượng giữ một thuộc tính .current mà bạn có thể gán cho bất kỳ thành phần React nào. Trong trường hợp này, có thể giả sử form.current là một tham chiếu đến đối tượng DOM của form. Thường được sử dụng để lấy hoặc thao tác với các phần tử DOM trong React.
  const form = useRef()
  const navigate = useNavigate()
  // xử lý sự kiện khi người dùng gửi form
  const sendEmail = e => {
    // Ngăn chặn hành vi mặc định của form bằng cách gọi preventDefault() trên đối tượng sự kiện e. Hành vi mặc định này thường là việc reload trang khi form được gửi. Bằng cách ngăn chặn nó, chúng ta có thể xử lý gửi email mà không cần reload lại trang.
    e.preventDefault()

    // Kiểm tra xem tất cả các trường có hợp lệ không
    if (validateForm()) {
      //  Sử dụng hàm sendForm từ emailjs để gửi form thông qua email service
      emailjs
        .sendForm(
          'service_va09e9v',
          'template_shpr2ts',
          // Tham chiếu đến form
          form.current,
          '9v1RiOXzBjvQ_2cDp'
        )
        // Xử lý kết quả trả về từ việc gửi email
        // kết quả được trả về từ Promise
        .then(
          result => {
            toast.success('Gửi thành công!', {
              position: 'top-right',
              autoClose: 1500,
            })
            // làm sạch các trường dữ liệu của form sau khi đã gửi thành công.
            setFormData({
              user_name: '',
              user_email: '',
              user_phone: '',
              message: '',
            })

            setTimeout(() => {
              navigate('/')
            }, 1500)
          },
          //  Nếu có lỗi trong quá trình gửi email (Promise bị reject), hàm callback này sẽ được gọi.
          error => {
            console.log(error.text)
          }
        )
      // Nếu validateForm() trả về false, đoạn mã sẽ được thực hiện.
    } else {
      toast.error('Vui lòng điền đầy đủ thông tin và đúng định dạng email.', {
        position: 'top-right',
        autoClose: 3000,
      })
    }
  }
  // Hàm kiểm tra tính hợp lệ của form
  const validateForm = () => {
    // Tạo một object chứa trạng thái lỗi cho từng trường dữ liệu
    const errors = {
      user_name: !formData.user_name.trim(),
      user_email: !isValidEmail(formData.user_email),
      user_phone: !isValidPhoneNumber(formData.user_phone),
      message: !formData.message.trim(),
    }
    // Cập nhật state với các lỗi mới
    setFormErrors(errors)
    // Sử dụng Object.values(errors) để lấy tất cả các giá trị của object errors và some(Boolean) để kiểm tra xem có ít nhất một giá trị true (có lỗi) không. Kết quả trả về true nếu không có lỗi nào và false nếu có ít nhất một lỗi.
    return !Object.values(errors).some(Boolean)
  }
  // Hàm kiểm tra tính hợp lệ của địa chỉ email
  const isValidEmail = email => {
    // Sử dụng regex đơn giản để kiểm tra định dạng email
    /* ^[^\s@]+: Bắt đầu chuỗi với một hoặc nhiều ký tự không phải khoảng trắng và không phải ký tự '@'.
      @: Ký tự '@'.
      [^\s@]+: Một hoặc nhiều ký tự không phải khoảng trắng và không phải ký tự '@'.
      \.: Dấu chấm.
      [^\s@]+$: Kết thúc chuỗi với một hoặc nhiều ký tự không phải khoảng trắng và không phải ký tự '@'. */
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    // Sử dụng phương thức test của biểu thức chính quy để kiểm tra xem địa chỉ email truyền vào có khớp với biểu thức chính quy hay không. Kết quả trả về true nếu đúng và false nếu không đúng.
    return emailRegex.test(email)
  }
  // Hàm kiểm tra tính hợp lệ của số điện thoại
  const isValidPhoneNumber = phoneNumber => {
    // Tạo một biểu thức chính quy để kiểm tra số điện thoại. Biểu thức này (/^\d{10}$/) yêu cầu chuỗi phải bắt đầu (^) và kết thúc ($) với đúng 10 chữ số (\d{10}).
    const phoneRegex = /^\d{10}$/
    // Sử dụng phương thức test của biểu thức chính quy để kiểm tra xem phoneNumber có khớp với biểu thức chính quy không. Nếu phoneNumber là một chuỗi đúng định dạng (10 chữ số), hàm trả về true, ngược lại trả về false.
    return phoneRegex.test(phoneNumber)
  }

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])
  // Hàm xử lý sự kiện khi giá trị của các trường dữ liệu thay đổi
  const handleChange = e => {
    // Cập nhật state formData với giá trị mới của trường dữ liệu được thay đổi. Sử dụng spread operator (...formData) để sao chép các giá trị hiện tại của formData, và sau đó, cập nhật giá trị của trường dữ liệu tương ứng với e.target.name bằng giá trị mới từ e.target.value.
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })

    // Kiểm tra xem trường dữ liệu nào đang được nhập liệu. Nếu là trường email (user_email), thực hiện các bước kiểm tra tính hợp lệ bằng cách gọi hàm isValidEmail.
    if (e.target.name === 'user_email') {
      setFormErrors({
        ...formErrors,
        [e.target.name]: !isValidEmail(e.target.value),
      })
      // Nếu là trường số điện thoại (user_phone), thực hiện các bước kiểm tra tính hợp lệ bằng cách gọi hàm isValidPhoneNumber.
    } else if (e.target.name === 'user_phone') {
      setFormErrors({
        ...formErrors,
        [e.target.name]: !isValidPhoneNumber(e.target.value),
      })
      // Trong trường hợp các trường dữ liệu khác, kiểm tra tính hợp lệ bằng cách xem xét giá trị của trường dữ liệu sau khi đã loại bỏ khoảng trắng ở đầu và cuối chuỗi.
    } else {
      setFormErrors({
        ...formErrors,
        [e.target.name]: !e.target.value.trim(),
      })
    }
  }

  const googleMapsURL =
    'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d220235.78631011717!2d106.52803673028657!3d10.828039308819054!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31752a3f1b2e8bfb%3A0xb3c9b77dcc25ebc7!2zU2nDqnUgdGjhu4sgVGjhur8gR2nhu5tpIERpIMSQ4buZbmc!5e0!3m2!1svi!2s!4v1691831495590!5m2!1svi!2s'

  return (
    <div className="checkout-container">
      <div className="google-map">
        <iframe
          title="Google Map"
          width="600"
          height="450"
          frameBorder="0"
          style={{ border: 0 }}
          src={googleMapsURL}
          allowFullScreen
        ></iframe>
      </div>
      <div className="checkout-form-contact">
        <form ref={form} onSubmit={sendEmail}>
          <label>Họ và tên</label>
          <input
            type="text"
            name="user_name"
            placeholder="Nhập tên đầy đủ..."
            value={formData.user_name}
            onChange={handleChange}
          />
          {formErrors.user_name && (
            <p className="error-message">Vui lòng nhập họ và tên.</p>
          )}
          <label>Email</label>
          <input
            type="email"
            name="user_email"
            placeholder="Nhập email..."
            value={formData.user_email}
            onChange={handleChange}
          />
          {formErrors.user_email && (
            <p className="error-message">
              Vui lòng nhập định dạng email hợp lệ.
            </p>
          )}
          <label>Số điện thoại</label>
          <input
            type="tel"
            name="user_phone"
            placeholder="Nhập số điện thoại..."
            value={formData.user_phone}
            onChange={handleChange}
          />
          {formErrors.user_phone && (
            <p className="error-message">Vui lòng nhập số điện thoại hợp lệ.</p>
          )}

          <label>Nội dung</label>
          <textarea
            name="message"
            value={formData.message}
            onChange={handleChange}
          />
          {formErrors.message && (
            <p className="error-message">Vui lòng nhập nội dung.</p>
          )}
          <input
            type="submit"
            value="Send"
            disabled={Object.values(formErrors).some(Boolean)}
          />
        </form>
      </div>
    </div>
  )
}

export default Contact
