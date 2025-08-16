import React, { useEffect, useState } from "react";
import { Space, Table, Avatar, Modal, Image, Button } from "antd";
import { Trash2, AlertTriangle, Undo, X  } from "lucide-react";
import "../Checkout/index.scss";
import { useNotification } from "../Notification";

const Checkout = (props) => {
  const ordersJSON = localStorage.getItem("storedOrders");
  const completedOrders = ordersJSON ? JSON.parse(ordersJSON) : [];

  const [orders, setOrders] = useState(completedOrders);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [orderToDelete, setOrderToDelete] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const notification = useNotification();
  
  const showModal = (orderId) => {
    setOrderToDelete(orderId);
    setIsModalVisible(true);
  };

  const allProducts = [];
  orders.forEach(order => {
    if (order.products && Array.isArray(order.products)) {
      order.products.forEach(product => {
        allProducts.push({
          ...product,
          orderId: order.id,
          orderDate: order.orderDate,
          customerInfo: order.customerInfo
        });
      });
    }
  });

  const mergedArray = {};
  allProducts.forEach((product) => {
    const key = `${product.id}_${product.orderId}`; 
    if (mergedArray[key]) {
      mergedArray[key].quantity += product.quantity;
    } else {
      mergedArray[key] = { ...product };
    }
  });

  const resultArray = Object.values(mergedArray);

  const handleOk = async () => {
    if (orderToDelete !== null) {
      setIsDeleting(true);
      
      await new Promise(resolve => setTimeout(resolve, 800));
      
      const updatedOrders = orders.filter(order => order.id !== orderToDelete);
      
      setOrders(updatedOrders);
      localStorage.setItem("storedOrders", JSON.stringify(updatedOrders));

      setIsModalVisible(false);
      setIsDeleting(false);
      setOrderToDelete(null);
      notification.success("Order deleted successfully!", 3000);
    }
  };

  const handleCancel = () => {
    if (!isDeleting) {
      setIsModalVisible(false);
      setOrderToDelete(null);
    }
  };

  const columns = [
    {
      title: "Image",
      dataIndex: "thumbnail",
      key: "thumbnail",
      render: (link) => {
        return (
          <Avatar
            style={{ width: "50px", height: "50px" }}
            icon={<Image width={50} height={50} src={link}></Image>}
          ></Avatar>
        );
      },
    },
    {
      title: "Product Name",
      dataIndex: "title",
      key: "title",
      render: (text) => <span>{text}</span>,
    },
    {
      title: "Quantity",
      dataIndex: "quantity",
      key: "quantity",
      render: (text, record) => {
        return <span>{text}</span>;
      },
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
      render: (_, record) => {
        return (
          <span>
            ${(record?.price -
              Math.round(
                (record?.price * record?.discountPercentage) / 100
              )).toFixed(2)}
          </span>
        );
      },
    },
    {
      title: "Brand",
      dataIndex: "brand",
      key: "brand",
      render: (text) => <span>{text}</span>,
    },
    {
      title: "Category",
      dataIndex: "category",
      key: "category",
      render: (text) => <span>{text.charAt(0).toUpperCase() + text.slice(1)}</span>,
    },
    {
      title: "Order Date",
      dataIndex: "orderDate",
      key: "orderDate",
      render: (date) => <span>{new Date(date).toLocaleDateString()}</span>,
    },
    {
      title: "Total",
      dataIndex: "total",
      key: "total",
      render: (_, record) => {
        return (
          <span>
            ${((record?.price -
              Math.round((record?.price * record?.discountPercentage) / 100)) * record?.quantity).toFixed(2)}
          </span>
        );
      },
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => {
        return (
          <Space size="middle">
            <button 
              onClick={() => showModal(record?.orderId)}
              className="delete-order-btn group relative inline-flex items-center justify-center px-4 py-2 text-sm font-medium text-red-600 bg-red-50 border border-red-200 rounded-lg hover:bg-red-100 hover:border-red-300 hover:text-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transition-all duration-200 transform hover:scale-105 active:scale-95"
            >
              <Trash2 className="w-4 h-4 mr-2 group-hover:animate-pulse" />
              Delete Order
              <div className="absolute inset-0 rounded-lg bg-red-600 opacity-0 group-hover:opacity-5 transition-opacity duration-200"></div>
            </button>
          </Space>
        );
      },
    },
  ];

  const { myFun, myFun2 } = props;

  useEffect(() => {
    myFun(false);
    myFun2(true);
  }, [myFun, myFun2]);

  useEffect(() => {
    const handleStorageChange = () => {
      const updatedOrdersJSON = localStorage.getItem("storedOrders");
      const updatedOrders = updatedOrdersJSON ? JSON.parse(updatedOrdersJSON) : [];
      setOrders(updatedOrders);
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  return (
    <div className="my-40 lg:my-32 mx-7 ">
      <h1 className="order">ORDER HISTORY</h1>
      {resultArray.length > 0 ? (
        <Table className="table-list" columns={columns} dataSource={resultArray} />
      ) : (
        <div className="text-center py-20">
          <div className="flex flex-col items-center justify-center space-y-4">
            <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center">
              <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-700">No orders found</h3>
            <p className="text-gray-500">You haven't completed any purchases yet.</p>
          </div>
        </div>
      )}
      
      <Modal 
        title={null}
        visible={isModalVisible} 
        onOk={handleOk} 
        onCancel={handleCancel}
        footer={null}
        closable={!isDeleting}
        maskClosable={!isDeleting}
        className="delete-order-modal"
        centered
        width={480}
      >
        <div className="p-6">
          <div className="flex items-center justify-center mb-6">
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center">
              <AlertTriangle className="w-8 h-8 text-red-600" />
            </div>
          </div>
          
          <div className="text-center mb-8">
            <h3 className="text-lg font-semibold text-gray-900 mb-3">
              Delete Order Confirmation
            </h3>
            <p className="text-sm text-gray-600 leading-relaxed">
              Are you sure you want to delete this entire order? This action cannot be undone and will permanently remove all products from this order.
            </p>
          </div>
          
          <div className="flex gap-3 justify-center">
            <Button
              onClick={handleCancel}
              disabled={isDeleting}
              className="flex items-center justify-center px-6 py-2 h-11 min-w-[120px] border-gray-300 text-gray-700 hover:border-gray-400 hover:text-gray-800 focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-all duration-200"
            >
              <Undo className="w-4 h-4 mr-2" />
              Cancel
            </Button>
            <Button
              type="primary"
              danger
              onClick={handleOk}
              loading={isDeleting}
              className="flex items-center justify-center px-6 py-2 h-11 min-w-[120px] bg-red-600 hover:bg-red-700 border-red-600 hover:border-red-700 focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transition-all duration-200"
            >
              {!isDeleting && <X className="w-4 h-4 mr-2" />}
              {isDeleting ? 'Deleting...' : 'Delete Order'}
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default Checkout;