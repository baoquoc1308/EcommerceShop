import React, { useEffect, useState } from "react"
import { Button, Checkbox, Drawer, Form, Input, Layout, Menu, Modal, Upload } from "antd"
import { Link, useLocation } from "react-router-dom"
import Images from "../../assets/images"
import { MenuOutlined, UploadOutlined } from "@ant-design/icons"
import AvatarDropdown from "./AccountMenu"
import './index.scss'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { fetchApi, isAccessTokenValid } from "../../api/api"
import { CONFIG } from "../../config"

const getItem = (label, key) => {
  return {
    label,
    key,
  }
}

const items = [
  getItem(<Link to='/search-jobs' >Start a search</Link>, '/search-jobs'),
  getItem(<Link to='/post-job' >Post job</Link>, '/post-job'),
]

const { Header } = Layout
export const TopNavigation = () => {
  const [form] = Form.useForm()
  const location = useLocation()
  const [current, setCurrent] = useState(location.pathname || '/search-jobs')
  const isActiveSearchJobs = current?.includes('/search-jobs')
  const isActiveJobsLists = current?.includes('/post-job')
  const [openMenu, setOpenMenu] = useState(false)
  const [isRoleCompany, setIsRoleCompany] = useState(false)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isLoginForm, setIsLoginForm] = useState(false)
  const [isModalPostJob, setIsModalPostJob] = useState(false)

  const accessToken = localStorage.getItem("accessToken")
  const roleName = isRoleCompany ? 'Company' : 'User'
  const [dataInfoUser, setDataInfoUser] = useState([])

  // Retrieve the stored JSON string from localStorage
  const userDetailJSON = localStorage.getItem('userDetail')

  const onClick = (e) => {
    setCurrent(e.key)
  }

  useEffect(() => {
    setCurrent(location.pathname)
  }, [location.pathname])

  const handleLogin = () => {
    setIsModalOpen(true)
    setIsLoginForm(true)
    form.resetFields()
  }

  const handleSignup = () => {
    setIsModalOpen(true)
    setIsLoginForm(false)
    setIsModalPostJob(false)
    form.resetFields()
  }

  const handleConfirmIsCompany = () => {
    setIsRoleCompany(true)
    handleSignup()
  }

  const handleConfirmIsUser = () => {
    setIsRoleCompany(false)
    handleSignup()
  }

  const handleCancel = () => {
    setIsModalOpen(false)
    form.setFieldsValue({ username: '', password: '' })
  }

  const handleCancelPostJob = () => {
    setIsRoleCompany(true)
    setIsModalPostJob(false)
  }

  const handleResponseLogin = (data) => {
    localStorage.setItem("accessToken", data?.accessToken)
    localStorage.setItem("refreshToken", data?.refreshToken)
    const userDetailJSON = JSON.stringify(data?.userDetail)
    localStorage.setItem('userDetail', userDetailJSON)
    // localStorage.setItem('userId', data?.userId)
    toast.success('Login successfully!', {
      position: "top-right",
      autoClose: 1500,
    })
    setIsModalOpen(false)
    form.resetFields()
    setTimeout(() => {
      window.location.reload()
    }, 2000)
  }

  const handleResponseRegister = (data) => {
    toast.success(data?.message || 'Register successfully!', {
      position: "top-right",
      autoClose: 1500,
    })
    handleLogin()
    form.resetFields()
  }

  const handleError = (data) => {
    toast.error(data?.errorCode || data?.message || 'Something went wrong!', {
      position: "top-right",
      autoClose: 1500,
    })
  }

  const onFinishFailed = () => {
    setIsModalOpen(true)
  }

  const validateConfirmPassword = ({ getFieldValue }) => ({
    validator(_, value) {
      if (!value || getFieldValue('password') === value) {
        return Promise.resolve()
      }
      return Promise.reject(new Error('The two passwords do not match'))
    },
  })

  const handlePostJob = () => {
    setIsModalOpen(false)
    setIsModalPostJob(true)
  }

  const onFinish = (values) => {
    if (isLoginForm) {
      fetchApi("POST", `${CONFIG?.URL_HRDEPT_AUTH}`, "login", handleResponseLogin, handleError, { username: values?.username, password: values?.password} )
    }
    if (!isLoginForm && !isRoleCompany) {
      fetchApi("POST", `${CONFIG?.URL_HRDEPT_AUTH}`, "register", handleResponseRegister, handleError, { username: values?.username, password: values?.password, roleName })
    }
    if (!isLoginForm && isRoleCompany) {
      const formData = new FormData()
      const registerCompanyRequest = {
        username: values?.username,
        password: values?.password,
        roleName: roleName,
        companyDetail: {
          companyName : 'abc',
          phone: '0123456789'
        },
        address: {
          province : 'Ha noi',
          district: 'Ba binh',
          commune: 'ward 2',
        },
      }
      const logo = values?.img?.[0]?.originFileObj
      formData.append('registerCompanyRequest', JSON.stringify(registerCompanyRequest))
      formData.append('logo', logo)
      const requestOptions = {
        method: 'POST',
        body: formData,
      }

      fetch(`${CONFIG.URL_HRDEPT_AUTH}/registerCompany`, requestOptions)
        .then(response => {
          return response.json()
        })
        .then(data => {
          handleResponseRegister(data)
        })
        .catch((error) => {
          handleError()
        })
    }
  }

  const normFile = (e) => {
    if (Array.isArray(e)) {
      return e
    }
    return e?.fileList
  }

  const isValidPhoneNumber = (_, value) => {
    if (value.length === 10 || value.length === 11) {
      const phoneRegex = /^[0-9]{10,11}$/
      if (!phoneRegex.test(value)) {
        return Promise.reject(new Error("Invalid phone number format!"))
      }
      return Promise.resolve()
    }
    return Promise.reject(new Error("Invalid phone number length!"))
  }

  useEffect(() => {
    try {
      if (userDetailJSON) {
        const userDetail = JSON.parse(userDetailJSON)
        setDataInfoUser(userDetail)
      } else {
        console.log("UserDetail not found in localStorage.")
      }
    } catch (error) {
      console.error('Somethings went wrong:', error)
    }
  }, [accessToken])

  return (
    <div className="top-nav">
      <Header
        style={{
          width: '100%',
          display: 'flex',
          alignItems: 'center',
        }}
      >
        <Link to={''}>
          <img src={Images?.logoHRDept} alt='HR-Dept' />
        </Link>
        <div class="top-nav__menu">
          <li>
            <Link to='/search-jobs' className={`${isActiveSearchJobs && 'active'}`}>Start a search</Link>
          </li>
          <li>
            <Link to='/post-job' className={`${isActiveJobsLists && 'active'}`}>Post job</Link>
          </li>
        </div>
        <Drawer
          placement="left"
          open={openMenu}
          closable={false}
          bodyStyle={{ backgroundColor: 'grey100' }}
          onClose={() => {
            setOpenMenu(false)
          }}
        >
          <Menu onClick={onClick} selectedKeys={[current]} mode="inline" items={items} />
          <div className="group-buttons">
            <Button onClick={handleLogin} className="group-buttons__log--in">Log in</Button>
            <Button onClick={handleSignup} className="group-buttons__sign--up">Sign up</Button>
          </div>
        </Drawer>
        <MenuOutlined
          style={{ fontSize: 20 }}
          onClick={() => {
            setOpenMenu(true)
          }}
          className="menu-icon"
        />
        {(!!accessToken && isAccessTokenValid()) ? <AvatarDropdown dataInfoUser={dataInfoUser} />
          : <div className="group-button">
            <Button onClick={handleLogin} className="group-button__log--in">Log in</Button>
            <Button onClick={handlePostJob} type="primary" className="group-button__sign--up">Sign up</Button>
          </div>}
      </Header>
      <div className="login-box">
      <Modal open={isModalPostJob} onCancel={handleCancelPostJob} footer={null}>
          <div className="text-center">
            <h5 className="title">Chào bạn,</h5>
            <p className="title-content">Bạn hãy dành ra vài giây để xác nhận thông tin dưới đây nhé!</p>
          </div>
          <div className="modal-footer">
            <div className="description">
            Để tối ưu tốt nhất cho trải nghiệm của bạn với HRDept,<br></br>vui lòng lựa chọn nhóm phù hợp nhất với bạn.<br></br><br></br>
            </div>
            <div className="img-button-job">
              <div className="job-company">
                <img src={Images?.companyRegister} alt='headHunter' />
                <Button onClick={handleConfirmIsCompany}>Tôi là công ty tuyển dụng</Button>
              </div>
              <div className="job-user">
                <img src={Images?.userRegister} alt='imgUser' />
                <Button onClick={handleConfirmIsUser}>Tôi là ứng viên tìm việc</Button>
              </div>
            </div>
          </div>
        </Modal>
        <Modal open={isModalOpen} onCancel={handleCancel} footer={null}>
          <Form
            form={form}
            name="login-form"
            initialValues={handleCancel}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
          >
            <p className="form-title">{isLoginForm ? 'Login' : 'Signup'}</p>
            <Form.Item
              name="username"
              rules={[{ required: true, message: 'Please input your username!' }]}
            >
              <Input
                placeholder="Username"
              />
            </Form.Item>

            <Form.Item
              name="password"
              rules={[{ required: true, message: 'Please input your password!' }]}
            >
              <Input.Password
                placeholder="Password"
              />
            </Form.Item>
            {!isLoginForm ?
              <>
                <Form.Item
                  name="confirmPassword"
                  rules={[
                    { required: true, message: 'Please confirm your password!' },
                    validateConfirmPassword,
                  ]}
                >
                  <Input.Password
                    placeholder="Confirm Password"
                  />
                </Form.Item>
              </>
              : <></>}
            {!isLoginForm && isRoleCompany ?
              <>
                <Form.Item
                  name="conmpanyName"
                  rules={[
                    {
                      required: true,
                      message: "Please input company name!"
                    }
                  ]}
                >
                  <Input placeholder="Please input company name" />
                </Form.Item>

                <Form.Item
                  name="phoneNumber"
                  rules={[
                    { required: true, message: "Please enter your phone number!" },
                    { validator: isValidPhoneNumber || "" }
                  ]}
                >
                  <Input placeholder="Please input phone number" />
                </Form.Item>
                <Form.Item
                  valuePropName="fileList"
                  name="img"
                  rules={[
                    {
                      required: true,
                      message: 'input Image',
                    },
                  ]}
                  getValueFromEvent={normFile}
                >
                  <Upload
                    action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                    listType="picture"
                    className="upload-list-inline"
                    maxCount={1}
                  >
                    <Button icon={<UploadOutlined />}>Upload</Button>
                  </Upload>
                </Form.Item>
              </>
              : <></>}
            {isLoginForm ?
              <Form.Item name="remember" valuePropName="checked">
                <Checkbox>Remember me</Checkbox>
                <a className="login-form-forgot" href="">
                  Forgot password
                </a>
              </Form.Item> : <></>}

            <Form.Item>
              <Button type="primary" htmlType="submit" className="login-form-button">
                {isLoginForm ? 'LOGIN' : 'SIGNUP'}
              </Button>
            </Form.Item>
            {isLoginForm ? <>Don't have a HRDept account? <a onClick={handlePostJob}>Sign up</a></>
              : <>Have an account? <a onClick={handleLogin}>Log in</a></>}
          </Form>
        </Modal>
      </div>
    </div>
  )
}
