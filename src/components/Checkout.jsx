import React, { useEffect, useState } from 'react'
import checkout from './images/Checkout.jpg'
import { Space, Table, Tag } from 'antd';

const Checkout = (props) => {
  // const infoOrder = localStorage.getItem("infoOrder")
  const dataJSON = localStorage.getItem('order')
  console.log("🚀 ~ file: Checkout.jsx:8 ~ Checkout ~ dataJSON:", dataJSON)
  const dataOrder = dataJSON ? JSON.parse(dataJSON) : [];
  const [order, setOrder] = useState([])
  const mergedArray = [...dataOrder, ...order];
  const [listOrder, setListOrder] = useState(mergedArray)
  const handleClickDelete = (id) => {
    const updatedData = mergedArray.filter(item => item.id !== id);
    setListOrder( updatedData)
  }

  const columns = [
    {
      title: 'Tên SP',
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
            <button onClick={()=> handleClickDelete(record?.id)}>Delete</button>
          </Space>
        )
      }
    },
  ];
  

  useEffect(() => {
    setOrder(dataOrder, ...dataOrder)
  },[])

  props.myFun(false);
  props.myFun2(false);
  return (

    <div className='my-40 lg:my-32 mx-7 '>
      <h1>ĐƠN HÀNG</h1>
      <Table columns={columns} dataSource={mergedArray} />;
    </div>

  )
}

export default Checkout


