import React, { useEffect, useState } from 'react'
import { Space, Table, Avatar, Modal, Image } from 'antd'
import { QuestionCircleTwoTone } from '@ant-design/icons'
import './Checkout.css'
import { formatNumber } from '../utils'

const Checkout = props => {
  const dataJSON = localStorage.getItem('storedOrders')
  const dataOrder = dataJSON ? JSON.parse(dataJSON) : []
  const [order, setOrder] = useState(dataOrder)
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [productIdToDelete, setProductIdToDelete] = useState(null)
  const showModal = id => {
    setProductIdToDelete(id) // Store the product ID to delete
    setIsModalVisible(true)
  }
  const listOrder = order.reduce((acc, val) => acc.concat(val), [])

  const mergedArray = {}
  listOrder.flat().forEach(obj => {
    if (mergedArray[obj.id]) {
      mergedArray[obj.id].quantity += obj.quantity
    } else {
      mergedArray[obj.id] = { ...obj }
    }
  })

  const resultArray = Object.values(mergedArray)

  const handleOk = () => {
    // Perform the delete operation here
    if (productIdToDelete !== null) {
      const updatedData = resultArray.filter(
        item => item.id !== productIdToDelete
      )
      setOrder(updatedData)
      localStorage.setItem('storedOrders', JSON.stringify(updatedData))
      setIsModalVisible(false)
    }
  }

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

  useEffect(() => {
    props.myFun(false);
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
