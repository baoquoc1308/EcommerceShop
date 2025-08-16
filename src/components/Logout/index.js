import React, { useState } from "react";
import {
  LogOut,
  AlertCircle,
  X,
} from "lucide-react";
import { Avatar, Dropdown, Modal } from "antd";
import "./index.scss";
import { useNotification } from "../Notification";

const AvatarDropdown = () => {
  const [isConfirmLogout, setIsConfirmLogout] = useState(false);
  const [dropdownVisible, setDropdownVisible] = useState(false);
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

  const handleToggleConfirmLogout = (e) => {
    e.preventDefault();
    e.stopPropagation();
    
    setIsConfirmLogout(true);
  };

  const handleCancel = () => {
    setIsConfirmLogout(false);
    setDropdownVisible(false);
  };

  const handleConfirmLogout = () => {
    setDropdownVisible(false);
    handleResponseLogout();
  };

  const handleDropdownVisibleChange = (visible) => {
    if (!isConfirmLogout) {
      setDropdownVisible(visible);
    }
  };

  return (
    <>
      <Dropdown
        overlay={
          <div className="modern-user-menu-wrap">
            <div className="modern-menu-container">
              <div className="modern-profile-section">
                <div className="modern-avatar">
                  <img
                    src={
                      user?.image ||
                      "https://cdn-icons-png.flaticon.com/512/431/431985.png"
                    }
                    alt="profile-img"
                  />
                </div>
                <div className="modern-profile-info">
                  <div className="modern-profile-name">{username}</div>
                  <div className="modern-profile-email">{roleName}</div>
                </div>
              </div>
              <div className="modern-menu-divider"></div>
              <div 
                className="modern-menu-item" 
                onClick={handleToggleConfirmLogout}
              >
                <LogOut size={18} className="modern-menu-icon" />
                <span className="modern-menu-text">Logout</span>
              </div>
            </div>
          </div>
        }
        trigger={["click"]}
        placement="bottomRight"
        overlayClassName="modern-dropdown-overlay"
        open={dropdownVisible}
        onOpenChange={handleDropdownVisibleChange}
      >
        <div className="modern-avatar-trigger">
          <Avatar
            size={40}
            src={
              user?.image ||
              "https://cdn-icons-png.flaticon.com/512/431/431985.png"
            }
            className="modern-avatar-img"
          />
          <span className="modern-username">{username}</span>
        </div>
      </Dropdown>

      <Modal
        title={null}
        footer={null}
        open={isConfirmLogout}
        onCancel={handleCancel}
        centered
        width={420}
        className="modern-logout-modal"
        maskStyle={{ backgroundColor: 'rgba(0, 0, 0, 0.6)' }}
        closeIcon={
          <div className="modern-close-btn">
            <X size={20} />
          </div>
        }
        zIndex={2000}
      >
        <div className="modern-modal-content">
          <div className="modern-modal-icon">
            <AlertCircle size={48} />
          </div>
          <div className="modern-modal-text">
            <h3 className="modern-modal-title">Confirm Logout</h3>
            <p className="modern-modal-message">
              Are you sure you want to logout? You'll need to sign in again to access your account.
            </p>
          </div>
          <div className="modern-modal-actions">
            <button 
              className="modern-btn modern-btn-cancel" 
              onClick={handleCancel}
            >
              Cancel
            </button>
            <button 
              className="modern-btn modern-btn-confirm" 
              onClick={handleConfirmLogout}
            >
              <LogOut size={18} />
              Logout
            </button>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default AvatarDropdown;