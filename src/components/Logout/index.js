import React, { useState, useEffect } from 'react'
import {
  LogoutOutlined,
  QuestionCircleTwoTone,
  UserOutlined,
} from '@ant-design/icons'
import { Avatar, Dropdown, Modal } from 'antd'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import './index.scss'

const AvatarDropdown = () => {
  const [isConfirmLogout, setIsConfirmLogout] = useState(false)
  // Lấy giá trị từ localStorage với key là 'accessToken' và lưu vào biến accessToken.
  const accessToken = localStorage.getItem('accessToken')
  const dataUser = localStorage.getItem('dataUser')
  // chuyển đổi chuỗi JSON trong dataUser thành đối tượng JavaScript và lưu vào biến user.
  const user = JSON.parse(dataUser)
  // Lấy giá trị của thuộc tính firstName trong đối tượng user và lưu vào biến username.
  // Sử dụng ?. để tránh lỗi nếu user không tồn tại.
  const username = user?.firstName
  const roleName = user?.email

  const handleResponseLogout = () => {
    // kiểm tra xem biến accessToken có tồn tại hay không
    if (accessToken) {
      localStorage.removeItem('accessToken')
      localStorage.removeItem('storedOrders')
      localStorage.removeItem('dataUser')
      localStorage.removeItem('infoOrder')
      toast.success('Logged out successfully!', {
        position: 'top-right',
      })
      // điều khiển việc hiển thị hoặc ẩn một hộp thoại xác nhận đăng xuất.
      setIsConfirmLogout(false)
    }
    setTimeout(() => {
      // làm mới lại trình duyệt sau 1 giây.
      window.location.reload()
    }, 1000)
  }

  const handleToggleConfirmLogout = () => {
    // click để mở hoặc đóng hộp thoại xác nhận đăng xuất.
    // cập nhật giá trị của isConfirmLogout thành đối ngược so với giá trị hiện tại của nó. Nếu trước đó isConfirmLogout là true, thì sau khi gọi hàm này nó sẽ trở thành false, và ngược lại.
    setIsConfirmLogout(prev => !prev)
  }
  // click để hủy bỏ việc đăng xuất
  const handleCancel = () => {
    setIsConfirmLogout(false)
  }
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <>
      <Dropdown
        overlay={
          <div class="user-menu-wrap">
            <div class="menu-container">
              <ul class="user-menu">
                <div class="profile-highlight">
                  <div class="details">
                    <div id="profile-name">{username}</div>
                    <div id="profile-footer">{roleName}</div>
                  </div>
                </div>
                <li class="user-menu__item">
                  <a class="user-menu-link" onClick={handleToggleConfirmLogout}>
                    <LogoutOutlined
                      style={{
                        width: '20px',
                        height: '20px',
                        marginTop: ' 0.5rem',
                      }}
                    />
                    <div>Logout</div>
                  </a>
                </li>
              </ul>
            </div>
          </div>
        }
        trigger={['click']}
      >
        <a className="ant-dropdown-link" onClick={e => e.preventDefault()}>
          <>
            <Avatar
              icon={
                <img
                  src={
                    user?.image ||
                    'https://cdn-icons-png.flaticon.com/512/431/431985.png'
                  }
                  alt="profile-img"
                  width="36px"
                  height="36px"
                />
              }
            />
            <span>{username}</span>
          </>
        </a>
      </Dropdown>
      <Modal
        title="Confirmation"
        onCancel={handleCancel}
        open={isConfirmLogout}
        onOk={handleResponseLogout}
      >
        <div className="modal-logout">
          <QuestionCircleTwoTone className="modal-logout__icon" />
          <p className="modal-logout__msg">Do you want to logout?</p>
        </div>
      </Modal>
    </>
  )
}

export default AvatarDropdown
