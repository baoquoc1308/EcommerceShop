import React, { useEffect, useState } from 'react'
import { Space, Table, Avatar } from 'antd';
import "./Checkout.css"

const Checkout = (props) => {
  const dataJSON = localStorage.getItem('order');
  const dataOrder = dataJSON ? JSON.parse(dataJSON) : [];
  const [order, setOrder] = useState(dataOrder);

  const handleAddToCart = (product) => {
    const productIndex = order.findIndex((item) => item.id === product.id);
    if (productIndex !== -1) {
      // Nếu sản phẩm đã tồn tại, cộng dồn số lượng
      const updatedOrder = [...order];
      updatedOrder[productIndex].quantity += 1;
      setOrder(updatedOrder);
    } else {
      // Nếu sản phẩm chưa tồn tại, thêm sản phẩm vào danh sách đơn hàng
      const updatedOrder = [...order, { ...product, quantity: 1 }];
      setOrder(updatedOrder);
    }
  }
  const handleDecreaseQuantity = (product) => {
    const productIndex = order.findIndex((item) => item.id === product.id);
    if (productIndex !== -1) {
      const updatedOrder = [...order];
      if (updatedOrder[productIndex].quantity > 1) {
        updatedOrder[productIndex].quantity -= 1;
        setOrder(updatedOrder);
      }
    }
  };

  const handleClickDelete = (id) => {
    const updatedData = order.filter((item) => item.id !== id);
    setOrder(updatedData);

    localStorage.setItem('order', JSON.stringify(updatedData));
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
            <button onClick={() => handleClickDelete(record?.id)}>Delete</button>
            <button onClick={() => handleAddToCart(record)}>+</button>
            <button onClick={() => handleDecreaseQuantity(record)}>-</button>

          </Space>
        );
      },
    },
  ];


  useEffect(() => {
    props.myFun(false);
    props.myFun2(false);
    // setOrder(dataOrder, ...dataOrder)
  }, [])

  return (
    <div className='my-40 lg:my-32 mx-7 '>
      <h1 className="order">ĐƠN HÀNG</h1>
      <Table className="table-list" columns={columns} dataSource={order} />
    </div>

  );
};

export default Checkout