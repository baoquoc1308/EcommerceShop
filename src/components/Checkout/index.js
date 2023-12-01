import React, { useEffect, useState } from 'react'
import { Space, Table, Avatar, Modal, Image } from 'antd'
import { QuestionCircleTwoTone } from '@ant-design/icons'
import '../Checkout/index.scss'
import { formatNumber } from '../../utils'
import { toast } from 'react-toastify'

const Checkout = props => {
  // Lấy dữ liệu đơn hàng từ localStorage hoặc khởi tạo là một mảng rỗng nếu không có dữ liệu
  const dataJSON = localStorage.getItem('storedOrders')
  const dataOrder = dataJSON ? JSON.parse(dataJSON) : []

  const [order, setOrder] = useState(dataOrder)
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [productIdToDelete, setProductIdToDelete] = useState(null)

  // Hàm mở modal xác nhận xóa sản phẩm, lưu ID sản phẩm vào state
  const showModal = id => {
    setProductIdToDelete(id) // Store the product ID to delete
    setIsModalVisible(true)
  }
  // Tạo một mảng 1 chiều từ mảng đa chiều đơn hàng
  const listOrder = order.reduce((acc, val) => acc.concat(val), [])
  // Gộp các sản phẩm có cùng ID và tính tổng số lượng của chúng
  const mergedArray = {}
  listOrder.flat().forEach(obj => {
    if (mergedArray[obj.id]) {
      mergedArray[obj.id].quantity += obj.quantity
    } else {
      mergedArray[obj.id] = { ...obj }
    }
  })
  // Chuyển đổi đối tượng đã gộp trở lại thành một mảng
  const resultArray = Object.values(mergedArray)
  // Hàm để xử lý việc xóa một sản phẩm
  const handleOk = () => {
    // Perform the delete operation here
    if (productIdToDelete !== null) {
      // Lọc bỏ sản phẩm với id cụ thể
      const updatedData = resultArray.filter(
        item => item.id !== productIdToDelete
      )
      // Cập nhật state và local storage với dữ liệu đã được sửa đổi
      setOrder(updatedData)
      localStorage.setItem('storedOrders', JSON.stringify(updatedData))
      // Đóng modal
      setIsModalVisible(false)
      toast.success('Đã xóa thành công đơn hàng!', {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 1000,
      })
    }
  }
  // Hàm để xử lý việc hủy bỏ thao tác xóa
  const handleCancel = () => {
    setIsModalVisible(false)
  }
  const columns = [
    {
      title: 'Hình ảnh',
      dataIndex: 'thumbnail',
      key: 'thumbnail',
      render: link => {
        return (
          <Avatar
            style={{ width: '50px', height: '50px' }}
            icon={<Image width={50} height={50} src={link}></Image>}
          ></Avatar>
        )
      },
    },
    {
      title: 'Tên sản phẩm',
      dataIndex: 'title',
      key: 'title',
      render: text => <a>{text}</a>,
    },
    {
      title: 'Số lượng',
      dataIndex: 'quantity',
      key: 'quantity',
      render: (text, record) => {
        return <a>{text}</a>
      },
    },
    {
      title: 'Giá',
      dataIndex: 'price',
      key: 'price',
      render: (_, record) => {
        return (
          <a>
            ₫
            {formatNumber(
              Math.round(
                record?.price -
                  (record?.price * record?.discountPercentage) / 100
              ) * 23000
            )}
          </a>
        )
      },
    },
    {
      title: 'Thương hiệu',
      dataIndex: 'brand',
      key: 'brand',
      render: text => <a>{text}</a>,
    },
    {
      title: 'Danh mục',
      dataIndex: 'category',
      key: 'category',
      render: text => <a>{text.charAt(0).toUpperCase() + text.slice(1)}</a>,
    },
    {
      title: 'Tổng',
      dataIndex: 'total',
      key: 'total',
      render: (_, record) => {
        return (
          <a>
            ₫
            {formatNumber(
              Math.round(
                record?.price -
                  (record?.price * record?.discountPercentage) / 100
              ) *
                23000 *
                record?.quantity
            )}
          </a>
        )
      },
    },
    {
      title: 'Action',
      key: 'action',
      render: (_, record) => {
        return (
          <Space size="middle">
            <button onClick={() => showModal(record?.id)}>Delete</button>
          </Space>
        )
      },
    },
  ]
  // Hook useEffect để thực hiện mã sau khi component đã được mount
  useEffect(() => {
    window.scrollTo(0, 0)
    props.myFun(false)
    props.myFun2(true)
  }, [])

  return (
    <div className="my-40 lg:my-32 mx-7 ">
      <h1 className="order">ĐƠN HÀNG</h1>
      <Table
        className="table-list"
        columns={columns}
        dataSource={resultArray}
      />
      <Modal
        title="Delete Confirmation"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <div className="modal-delete">
          <QuestionCircleTwoTone className="modal-delete__icon" />
          <p className="modal-delete__msg">Do you want to delete this item?</p>
        </div>
      </Modal>
    </div>
  )
}

export default Checkout
