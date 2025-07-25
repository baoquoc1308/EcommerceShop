import React, { useState, useEffect } from "react";
import {
  LogoutOutlined,
  QuestionCircleTwoTone,
  UserOutlined,
} from "@ant-design/icons";
import { Avatar, Dropdown, Modal } from "antd";
import "./index.scss";
import { useNotification } from "../Notification";
const AvatarDropdown = () => {
  const [isConfirmLogout, setIsConfirmLogout] = useState(false);
  const notification = useNotification();
  const accessToken = localStorage.getItem("accessToken");
  const dataUser = localStorage.getItem("dataUser");

  const user = JSON.parse(dataUser);

  const username = user?.firstName;
  const roleName = user?.email;

  const handleResponseLogout = () => {
    if (accessToken) {
      localStorage.removeItem("accessToken");
      localStorage.removeItem("storedOrders");
      localStorage.removeItem("dataUser");
      localStorage.removeItem("infoOrder");
      notification.success("Logged out successfully!", 3000);

      setIsConfirmLogout(false);
    }
    setTimeout(() => {
      window.location.reload();
    }, 1000);
  };

  const handleToggleConfirmLogout = () => {
    setIsConfirmLogout((prev) => !prev);
  };

  const handleCancel = () => {
    setIsConfirmLogout(false);
  };

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
                        width: "20px",
                        height: "20px",
                        marginTop: " 0.5rem",
                      }}
                    />
                    <div>Logout</div>
                  </a>
                </li>
              </ul>
            </div>
          </div>
        }
        trigger={["click"]}
      >
        <a className="ant-dropdown-link" onClick={(e) => e.preventDefault()}>
          <>
            <Avatar
              icon={
                <img
                  src={
                    user?.image ||
                    "https://cdn-icons-png.flaticon.com/512/431/431985.png"
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
  );
};

export default AvatarDropdown;
