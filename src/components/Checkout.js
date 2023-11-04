import React, { useEffect, useState } from 'react'
import { Space, Table, Avatar, Modal } from 'antd';
import { QuestionCircleTwoTone } from '@ant-design/icons';
import "./Checkout.css"

const Checkout = (props) => {
  const dataJSON = localStorage.getItem('order');
  const dataOrder = dataJSON ? JSON.parse(dataJSON) : [];
  const [order, setOrder] = useState(dataOrder);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [productIdToDelete, setProductIdToDelete] = useState(null);
  const showModal = (id) => {
    setProductIdToDelete(id); // Store the product ID to delete
    setIsModalVisible(true);
  };
  const handleOk = () => {
    // Perform the delete operation here
    if (productIdToDelete !== null) {
      const updatedData = order.filter((item) => item.id !== productIdToDelete);
      setOrder(updatedData);
      localStorage.setItem('order', JSON.stringify(updatedData));
      setIsModalVisible(false);
    }
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };
  const columns = [
    {
      title: 'Hình ảnh',
      dataIndex: 'thumbnail',
      key: 'thumbnail',
      render: (link) => {
        return <Avatar src={link} />;
      },
    },
    {
      title: 'Tên sản phẩm',
      dataIndex: 'title',
      key: 'title',
      render: (text) => <a>{text}</a>,
    },
    {
      title: 'Số lượng',
      dataIndex: 'quantity',
      key: 'quantity',
      render: (text) => <a>{text}</a>,
    },
    {
      title: 'Giá',
      dataIndex: 'price',
      key: 'price',
      render: (text) => <a>{text}</a>,
    },
    {
      title: "Thương hiệu",
      dataIndex: "brand",
      key: "brand",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "Danh mục",
      dataIndex: "category",
      key: 'category',
      render: (text) => <a>{text}</a>,
    },
    {
      title: 'Đánh giá',
      dataIndex: 'rating',
      key: 'rating',
      render: (text) => <a>{text}</a>,
    },
    {
      title: 'Action',
      key: 'action',
      render: (_, record) => {
        return (
          <Space size="middle">
            <button onClick={() => showModal(record?.id)}>Delete</button>
          </Space>
        );
      },
    },
  ];


  useEffect(() => {
    // props.myFun(false);
    props.myFun2(false);
  }, [])

  return (
    <div className='my-40 lg:my-32 mx-7 '>
      <h1 className="order">ĐƠN HÀNG</h1>
      <Table className="table-list" columns={columns} dataSource={order} />
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

  );
};

export default Checkout