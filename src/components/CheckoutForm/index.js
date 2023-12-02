import React, { useEffect, useState } from 'react'
import '../CheckoutForm/index.scss'
import { Button, Input } from 'antd'
import { Form } from 'antd'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { useNavigate } from 'react-router-dom'
import { useCart } from 'react-use-cart'

const CheckoutForm = () => {
  // Sử dụng Form.useForm() để tạo một biểu mẫu (form) và lưu trữ trong state 'form'
  const [form] = Form.useForm()
  const navigate = useNavigate()
  const { emptyCart, clearCartMetadata } = useCart()
  // Lấy dữ liệu từ local storage với khóa là 'infoOrder'
  const infoUserJSON = localStorage.getItem('infoOrder')
  // Chuyển đổi chuỗi JSON lấy từ local storage thành đối tượng JavaScript
  const infoUser = JSON.parse(infoUserJSON)
  const [reload, setReload] = useState(false)
  // Hàm kiểm tra tính hợp lệ của tên đầy đủ
  const isValidFullName = (rule, value) => {
    // Kiểm tra nếu giá trị không tồn tại
    if (!value) {
      // Nếu điều kiện trên đúng, hàm sẽ trả về một Promise bị reject với một chuỗi rỗng '', được sử dụng để hiển thị một thông báo lỗi tương ứng với trường dữ liệu không được phép để trống.
      return Promise.reject('')
    } else {
      // Phân tách các từ trong tên
      const words = value.split(' ')
      // Kiểm tra xem tất cả các từ có viết hoa chữ cái đầu không
      const isCapitalized = words.every(word => {
        // Lấy ký tự đầu tiên của mỗi từ trong mảng words và lưu vào biến firstLetter. Hàm charAt(0) trả về ký tự ở vị trí đầu tiên của chuỗi.
        const firstLetter = word.charAt(0)
        // So sánh ký tự đầu tiên với chính nó ở dạng viết hoa Nếu ký tự đầu tiên là viết hoa, điều kiện sẽ trả về true, ngược lại sẽ trả về false.
        return firstLetter === firstLetter.toUpperCase()
      })
      // Nếu có từ không viết hoa chữ cái đầu, trả về lỗi
      if (!isCapitalized) {
        // Nếu điều kiện trên đúng, trả về thông báo lỗi
        return Promise.reject(
          'The first letter of each word must be capitalized.'
        )
      }
      // Kiểm tra chiều dài tối đa của tên đầy đủ
      if (value.length > 100) {
        // Nếu điều kiện trên đúng, trả về thông báo lỗi
        return Promise.reject('Full name must not exceed 100 characters.')
      }
    }
    // Nếu cả hai điều kiện trên đều không thỏa mãn, trả về một Promise được giải quyết
    return Promise.resolve()
  }
  // Hàm kiểm tra tính hợp lệ của số điện thoại
  const isValidPhoneNumber = (rule, value) => {
    // Kiểm tra nếu giá trị không tồn tại
    if (!value) {
      // Nếu điều kiện trên đúng, trả về một Promise bị reject với chuỗi rỗng ''
      return Promise.reject('')
      // Kiểm tra nếu không phải chuỗi chứa 10 chữ số liên tiếp thì thông báo lỗi
    } else if (!/^\d{10}$/.test(value)) {
      return Promise.reject('Phone number must be exactly 10 digits long.')
    }
    // Nếu cả hai điều kiện trên đều không thỏa mãn, trả về một Promise được giải quyết
    return Promise.resolve()
  }
  // Hàm xóa giỏ hàng khi hoàn thành đặt hàng
  const clearCart = () => {
    // Làm rỗng giỏ hàng
    emptyCart()
    // Xóa các dữ liệu liên quan đến giỏ hàng
    clearCartMetadata()
  }
  // thực hiện các hành động khi component được render
  useEffect(() => {
    window.scrollTo(0, 0)
    // Kiểm tra xem infoUser có tồn tại hay không. !! là cách chuyển đổi một giá trị thành giá trị boolean, đảm bảo rằng giá trị kiểm tra là true nếu infoUser tồn tại và ngược lại.
    !!infoUser &&
      // Nếu reload là true và infoUser tồn tại, hiển thị một thông báo
      // một cách để kích hoạt lại một số hành động sau khi infoUser hoặc các giá trị khác liên quan thay đổi, đồng thời giữ cho thông báo chỉ hiển thị một lần trong quá trình kích hoạt.
      reload &&
      toast.success(
        'Bạn đã có thông tin cá nhân, bạn có muốn thay đổi không?',
        {
          position: 'top-right',
          autoClose: 1500,
        }
      )
    // Nếu reload là true và infoUser không tồn tại, hiển thị một thông báo cảnh báo yêu cầu người dùng nhập thông tin cá nhân.
    infoUser === null &&
      reload &&
      toast.warning('Vui lòng nhập thông tin cá nhân.', {
        position: 'top-right',
        autoClose: 1500,
      })
    // Nếu giá trị của reload thay đổi so với giá trị trong lần render trước, useEffect sẽ được kích hoạt.
  }, [reload])
  // useEffect để cập nhật trạng thái 'reload' khi thông tin người dùng thay đổi
  useEffect(() => {
    setReload(true)
    // Nếu giá trị của bất kỳ biến nào trong mảng này thay đổi so với lần render trước, hàm callback bên trong useEffect sẽ được kích hoạt.
  }, [infoUser, reload])
  // Hàm xử lý khi hoàn thành việc điền thông tin đặt hàng
  const handleOnFinish = values => {
    // Lưu thông tin đặt hàng vào localStorage
    localStorage.setItem('infoOrder', JSON.stringify(values))
    toast.success('Mua hàng thành công!', {
      position: 'top-right',
      autoClose: 1500,
    })

    setTimeout(() => {
      navigate('/checkout')
      clearCart()
    }, 1500)
  }

  return (
    <div className="checkout-form">
      <Form
        form={form}
        name="login-form"
        onFinish={handleOnFinish}
        initialValues={infoUser}
      >
        <p className="form-title">THÔNG TIN KHÁCH HÀNG</p>
        <Form.Item
          label="Full Name"
          name="fullname"
          rules={[
            { required: true, message: 'Please input your full name!' },
            { validator: isValidFullName },
          ]}
        >
          <Input placeholder="Fullname" />
        </Form.Item>
        <Form.Item
          label="Email"
          name="email"
          rules={[
            { required: true, message: 'Please input your Email!' },
            {
              type: 'email',
              message: 'Please enter a valid email address!',
            },
          ]}
        >
          <Input placeholder="Email" />
        </Form.Item>
        <Form.Item
          label="Address"
          name="address"
          rules={[{ required: true, message: 'Please input your Address!' }]}
        >
          <Input placeholder="Address" />
        </Form.Item>
        <Form.Item
          label="Phone"
          name="phone"
          rules={[
            { required: true, message: 'Please enter your phone number!' },
            { validator: isValidPhoneNumber },
          ]}
        >
          <Input placeholder="Phone" />
        </Form.Item>
        <Form.Item
          label="Notes"
          name="notes"
          rules={[
            {
              required: true,
              message: 'Please input Notes!',
            },
          ]}
        >
          <Input placeholder="Please input Notes" />
        </Form.Item>
        <div className="address-company"></div>
        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            className="login-form-button"
          >
            MUA HÀNG
          </Button>
        </Form.Item>
      </Form>
    </div>
  )
}

export default CheckoutForm
