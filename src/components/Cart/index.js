import React, { useEffect, useState } from "react";
import { useCart } from "react-use-cart";
import {
  AiOutlinePlus,
  AiOutlineMinus,
  AiOutlineDelete,
  AiOutlineArrowRight,
} from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";
import cart from "../images/cart.png";
import "../Cart/index.scss";
import { Modal } from "antd";
import { QuestionCircleTwoTone } from "@ant-design/icons";
import { useNotification } from "../Notification";
const Cart = (props) => {
  props.myFun(false);
  props.myFun2(true);

  const { isEmpty, items, updateItemQuantity, removeItem } =
    useCart();
  const [totalAllProduct, setTotalAllProduct] = useState(0);
  const [productToDelete, setProductToDelete] = useState(null);
  const [selectedItems, setSelectedItems] = useState(new Set());
  const [selectAll, setSelectAll] = useState(false);
  const navigate = useNavigate();
  const token = localStorage.getItem("accessToken");
  const notification = useNotification();
  const handleCheckout = (order) => {
    const selectedProducts = items.filter((item) => selectedItems.has(item.id));
    if (selectedProducts.length === 0) {
      notification.warning("Please select at least 1 product to pay!", 3000);
      return;
    }
    
    localStorage.setItem("selectedProducts", JSON.stringify(selectedProducts));
    
    setTimeout(() => {
      navigate("/checkoutform");
    }, 1000);
  };

  const [open, setOpen] = useState(false);
  const [deleteMode, setDeleteMode] = useState("single");

  const handleDeleteProducts = (productId) => {
    if (deleteMode === "single") {
      removeItem(productId);
      setSelectedItems((prev) => {
        const newSet = new Set(prev);
        newSet.delete(productId);
        return newSet;
      });
      notification.success("Product deleted from cart!", 3000);
    } else {
      selectedItems.forEach((itemId) => {
        removeItem(itemId);
      });
      setSelectedItems(new Set());
      setSelectAll(false);
      notification.success(
        `Deleted ${selectedItems.size} products from cart!`,
        3000
      );
    }
    setOpen(false);
  };

  const showDeleteModal = (productId = null) => {
    setOpen(true);
    if (productId) {
      setProductToDelete(productId);
      setDeleteMode("single");
    } else {
      setDeleteMode("multiple");
    }
  };

  const hideModal = () => setOpen(false);

  const handleUpdatePlusQuantity = (item) => {
    if (item.quantity < item.stock) {
      return updateItemQuantity(item.id, item.quantity + 1);
    }
    notification.warning("Quantity exceeds stock!", 3000);
  };

  const handleUpdateMinusQuantity = (item) => {
    if (item.quantity > 1) {
      return updateItemQuantity(item.id, item.quantity - 1);
    }
  };

  const handleSelectItem = (itemId) => {
    setSelectedItems((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(itemId)) {
        newSet.delete(itemId);
      } else {
        newSet.add(itemId);
      }
      return newSet;
    });
  };

  const handleSelectAll = () => {
    if (selectAll) {
      setSelectedItems(new Set());
    } else {
      setSelectedItems(new Set(items.map((item) => item.id)));
    }
    setSelectAll(!selectAll);
  };

  useEffect(() => {
    if (items?.length > 0) {
      let sum = 0;
      items.forEach((item) => {
        if (selectedItems.has(item.id)) {
          sum +=
            (item.price -
              Math.round((item.price * item?.discountPercentage) / 100)) *
            item?.quantity;
        }
      });
      setTotalAllProduct(sum);
    }
  }, [items, selectedItems]);

  useEffect(() => {
    if (items.length > 0) {
      setSelectAll(selectedItems.size === items.length);
    }
  }, [selectedItems, items]);

  const selectedCount = selectedItems.size;

  return isEmpty || token === null ? (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 flex items-center justify-center p-4">
      <div className="text-center">
        <div className="w-32 h-32 mx-auto mb-6 bg-gradient-to-r from-blue-400 to-blue-700 rounded-full flex items-center justify-center">
          <img src={cart} alt="Loading" className="w-16 h-16 opacity-80" />
        </div>
        <h1 className="text-2xl font-bold text-gray-800 mb-4">
          Your cart is empty
        </h1>
        <Link to="/">
          <button className="bg-gradient-to-r from-blue-500 to-blue-700 text-white px-6 py-3 rounded-full hover:from-blue-600 hover:to-blue-800 transition-all duration-300 transform hover:scale-105 shadow-lg">
            Continue Shopping
          </button>
        </Link>
      </div>
    </div>
  ) : (
    <div className="min-h-screen  py-8 px-2">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8">
          <h2 className="text-3xl pt-10 font-bold bg-gradient-to-r from-blue-700 to-blue-400 bg-clip-text text-transparent mb-2">
            CART
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-blue-400 mx-auto rounded-full"></div>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          <div className="flex-1 min-w-0">
            <div className="space-y-4 mb-8">
              <div className="hidden md:grid grid-cols-10 gap-4 px-6 py-2 font-semibold text-blue-800 text-sm">
                <div className="col-span-1"></div>
                <div className="col-span-3">PRODUCT</div>
                <div className="col-span-2 text-center">PRICE</div>
                <div className="col-span-2 text-center">QUANTITY</div>
                <div className="col-span-1 text-center">SUBTOTAL</div>
                <div className="col-span-1"></div>
              </div>

              {items?.map((item) => (
                <div
                  key={item.id}
                  className={`bg-white/90 border rounded-2xl px-3 md:px-6 py-4 shadow-md transition-all duration-200 ${
                    selectedItems.has(item.id)
                      ? "border-blue-300 bg-blue-50/50"
                      : "border-blue-100"
                  }`}
                >
                  <div className="grid grid-cols-1 md:grid-cols-10 gap-4 items-center">
                    <div className="col-span-1 md:flex items-center justify-center hidden md:block">
                      {" "}
                      <input
                        type="checkbox"
                        checked={selectedItems.has(item.id)}
                        onChange={() => handleSelectItem(item.id)}
                        className="w-5 h-5 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2 flex-shrink-0"
                      />
                    </div>

                    <div className="col-span-full md:col-span-3 flex items-center gap-3">
                      <img
                        src={item?.images[0]}
                        alt=""
                        className="w-16 h-16 md:w-20 md:h-20 rounded-xl object-cover shadow-md flex-shrink-0"
                      />
                      <div className="min-w-0 flex-1">
                        <h3 className="font-bold text-base md:text-lg text-gray-800 mb-1 line-clamp-1">
                          {item.title}
                        </h3>
                        <p className="text-gray-500 text-xs md:text-sm line-clamp-1">
                          {item.description}
                        </p>
                      </div>
                    </div>

                    <div className="col-span-full md:col-span-2 flex md:justify-center items-center md:flex-col lg:flex-row gap-2">
                      {" "}
                      <span className="text-gray-400 line-through text-base">
                        ${item.price}
                      </span>
                      <span className="text-red-500 font-bold text-lg">
                        $
                        {(
                          item.price -
                          Math.round(
                            (item.price * item?.discountPercentage) / 100
                          )
                        ).toFixed(2)}
                      </span>
                    </div>

                    <div className="col-span-full md:col-span-2 flex items-center justify-center gap-2">
                      <button
                        onClick={() => handleUpdateMinusQuantity(item)}
                        className="w-8 h-8 bg-blue-50 border border-blue-200 rounded-full hover:bg-blue-100 transition-all flex items-center justify-center group"
                      >
                        <AiOutlineMinus
                          className="text-blue-700 group-hover:text-blue-900"
                          size={14}
                        />
                      </button>
                      <span className="w-7 text-center font-semibold text-gray-900 select-none">
                        {item?.quantity}
                      </span>
                      <button
                        onClick={() => handleUpdatePlusQuantity(item)}
                        className="w-8 h-8 bg-blue-50 border border-blue-200 rounded-full hover:bg-blue-100 transition-all flex items-center justify-center group disabled:opacity-50 disabled:cursor-not-allowed"
                        disabled={item?.quantity >= item?.stock}
                      >
                        <AiOutlinePlus
                          className="text-blue-700 group-hover:text-blue-900"
                          size={14}
                        />
                      </button>
                    </div>

                    <div className="col-span-2 md:col-span-2 flex justify-center items-center">
                      <span className="text-lg font-bold text-red-600 mr-10">
                        $
                        {(
                          (item.price -
                            Math.round(
                              (item.price * item?.discountPercentage) / 100
                            )) *
                          item?.quantity
                        ).toFixed(2)}
                      </span>
                      <div className="col-span-1 md:col-span-1 flex justify-center items-center">
                        <button
                          className="p-2 text-red-500 bg-red-100 hover:text-red-600 hover:bg-red-50 rounded-full transition-all duration-200 transform hover:scale-110 ml-10"
                          onClick={() => showDeleteModal(item.id)}
                        >
                          <AiOutlineDelete size={18} />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="bg-white/95 border border-blue-100 shadow-lg rounded-2xl px-6 py-4 mb-6">
              <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={selectAll}
                      onChange={handleSelectAll}
                      className="w-5 h-5 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2"
                    />
                    <span className="text-gray-700 font-medium">
                      Select all ({items.length})
                    </span>
                  </div>
                  <button
                    onClick={() => showDeleteModal()}
                    disabled={selectedItems.size === 0}
                    className="flex items-center gap-2 px-4 py-2 text-red-600 hover:text-red-700 hover:bg-red-200 rounded-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed bg-red-100"
                  >
                    <AiOutlineDelete size={18} />
                    <span>Delete</span>
                  </button>
                </div>

                <div className="flex items-center gap-6">
                  <div className="text-right">
                    <p className="text-sm text-gray-600">
                      Total payment ({selectedCount} products):
                    </p>
                    <p className="text-xl font-bold text-red-600">
                      ${totalAllProduct.toFixed(2)}
                    </p>
                  </div>
                  <button
                    className="bg-gradient-to-r from-blue-500 to-blue-700 text-white px-8 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 hover:from-blue-600 hover:to-blue-800 disabled:opacity-50 disabled:cursor-not-allowed"
                    onClick={() => handleCheckout(items)}
                    disabled={selectedItems.size === 0}
                  >
                    <span className="flex items-center gap-2">
                      Buy
                      <AiOutlineArrowRight />
                    </span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <Modal
          title={
            <div className="flex items-center gap-2">
              <QuestionCircleTwoTone className="text-xl" />
              <span className="font-semibold">Confirm delete</span>
            </div>
          }
          open={open}
          onOk={() => handleDeleteProducts(productToDelete)}
          onCancel={hideModal}
          okText="Xóa"
          cancelText="Hủy"
          okButtonProps={{
            className:
              "bg-red-500 hover:bg-red-600 border-red-500 hover:border-red-600",
          }}
        >
          <div className="py-4">
            <p className="text-gray-600">
              {deleteMode === "single"
                ? "Bạn có chắc muốn xóa sản phẩm này khỏi giỏ hàng?"
                : `Bạn có chắc muốn xóa ${selectedItems.size} sản phẩm đã chọn khỏi giỏ hàng?`}
            </p>
          </div>
        </Modal>
      </div>
    </div>
  );
};

export default Cart;
