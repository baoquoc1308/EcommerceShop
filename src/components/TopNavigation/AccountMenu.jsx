import React, { useState } from "react"
import { LogoutOutlined, QuestionCircleTwoTone, UserOutlined } from "@ant-design/icons"
import { Avatar, Dropdown, Modal } from "antd"
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import './index.scss'

const AvatarDropdown = () => {
  const [isConfirmLogout, setIsConfirmLogout] = useState(false)
  const accessToken = localStorage.getItem("accessToken")

  const username = 'Bao Quoc'
  const roleName = 'User'

  const handleResponseLogout = () => {
    if (accessToken) {
      localStorage.removeItem("accessToken")
      toast.success("Logged out successfully!", {
        position: "top-right",
      })
      setIsConfirmLogout(false)
    }
    setTimeout(() => {
      window.location.reload()
    }, 1000)
  }

  const handleToggleConfirmLogout = () => {
    setIsConfirmLogout(prev => !prev)
  }

  const handleCancel = () => {
    setIsConfirmLogout(false)
  }

  return (
    <>
      <Dropdown
        overlay={(
          <div class="user-menu-wrap">
            <div class="menu-container">
              <ul class="user-menu">
                <div class="profile-highlight">
                  <img src={"https://cdn-icons-png.flaticon.com/512/431/431985.png"} alt="profile-img" width='36px' height='36px' />
                  <div class="details">
                    <div id="profile-name">{username}</div>
                    <div id="profile-footer">{roleName}</div>
                  </div>
                </div>
                <li class="user-menu__item">
                  <a class="user-menu-link" onClick={handleToggleConfirmLogout}>
                    <LogoutOutlined style={{ width: '20px', height: '20px', marginTop: ' 0.5rem' }} />
                    <div>Logout</div>
                  </a>
                </li>
              </ul>
            </div>
          </div>
        )}
        trigger={['click']}>
        <a className="ant-dropdown-link"
          onClick={e => e.preventDefault()}>
          <>
            <Avatar icon={<UserOutlined />} />
            <span>{username}</span>
          </>
        </a>
      </Dropdown>
      <Modal title='Confirmation' onCancel={handleCancel} open={isConfirmLogout} onOk={handleResponseLogout}>
        <div className="modal-logout">
          <QuestionCircleTwoTone className="modal-logout__icon" />
          <p className="modal-logout__msg">Do you want to logout?</p>
        </div>
      </Modal>
    </>
  )
}

export default AvatarDropdown
