import React, { useEffect, useState } from "react";
import { Space, Table, Avatar, Empty } from "antd";
import "./Checkout.css";
import { useCart } from "react-use-cart";

const Checkout = (props) => {
  const [storedOrders, setStoredOrders] = useState([]);
  const odersListData = storedOrders?.reduce(
    (acc, val) => acc?.concat(val),
    []
  );

  const result = Object.values(
    odersListData.reduce(
      (
        acc,
        {
          id,
          title,
          description,
          price,
          discountPercentage,
          rating,
          stock,
          brand,
          category,
          thumbnail,
          images,
          quantity,
          itemTotal,
        }
      ) => {
        if (acc[id]) {
          acc[id].quantity += 1; // Tăng quantity lên nếu đã tồn tại
        } else {
          acc[id] = {
            id,
            title,
            description,
            price,
            discountPercentage,
            rating,
            stock,
            brand,
            category,
            thumbnail,
            images,
            quantity,
            itemTotal,
          }; // Thêm đối tượng mới nếu chưa tồn tại
        }
        return acc;
      },
      {}
    )
  );

  useEffect(() => {
    const storedOrdersData =
      JSON.parse(localStorage.getItem("storedOrders")) || [];
    setStoredOrders(storedOrdersData);
  }, [setStoredOrders]);

  const handleClickDelete = (idToRemoved) => {
    const updatedData = result.filter((item) => item.id !== idToRemoved);
  };

  const columns = [
    {
      title: "Hình ảnh",
      dataIndex: "thumbnail",
      key: "thumbnail",
      render: (link) => {
        return <Avatar src={link} />;
      },
    },
    {
      title: "Tên sản phẩm",
      dataIndex: "title",
      key: "title",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "Số lượng",
      dataIndex: "quantity",
      key: "quantity",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "Giá",
      dataIndex: "price",
      key: "price",
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
      key: "category",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "Đánh giá",
      dataIndex: "rating",
      key: "rating",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => {
        return (
          <Space size="middle">
            <button onClick={() => handleClickDelete(record?.id)}>
              Delete
            </button>
            {/* <button onClick={() => handleAddToCart(record)}>+</button>
            <button onClick={() => handleDecreaseQuantity(record)}>-</button> */}
          </Space>
        );
      },
    },
  ];

  useEffect(() => {
    props.myFun(false);
    props.myFun2(false);
  }, []);

  return (
    <div className="my-40 lg:my-32 mx-7 ">
      <h1 className="order">ĐƠN HÀNG</h1>
      <Table className="table-list" columns={columns} dataSource={result} />
    </div>
  );
};

export default Checkout;
