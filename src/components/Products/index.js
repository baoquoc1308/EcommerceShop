import React from "react";
import { useState, useEffect } from "react";
import ProductItems from "../ProductItems";
import Spinner from "../Spinner";
import { fetchApi } from "../../api/api";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Select } from "antd";
import "../Products/index.scss";

function Products(props) {
  props.myFun(true);
  props.myFun2(true);

  const { Option } = Select;
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [sortOption, setSortOption] = useState(null);

  const handleResponseGetAllProducts = (data) => {
    setProducts(data);
  };

  const handleError = (data) => {
    toast.error(data?.message || "Something went wrong!", {
      position: "top-right",
      autoClose: 1500,
    });
  };

  const handleSelectProduct = (searchString) => {
    setLoading(true);
    fetchApi(
      "GET",
      "https://dummyjson.com",
      `products/search?q=${searchString}&limit=100`,

      handleResponseGetAllProducts,

      handleError
    );

    setLoading(false);
  };

  const handleSortChange = (value) => {
    setSortOption(value);
  };
  const sortProducts = () => {
    if (sortOption === "lowToHigh") {
      setProducts({
        products: products.products.sort((a, b) => a.price - b.price),
      });
    } else if (sortOption === "highToLow") {
      setProducts({
        products: products.products.sort((a, b) => b.price - a.price),
      });
    }
  };
  useEffect(() => {
    handleSelectProduct("");
  }, []);
  useEffect(() => {
    sortProducts();
  }, [sortOption, products]);

  return (
    <div>
      <h1 className="cate">Featured Products</h1>
      <Select
        showSearch
        style={{
          width: 150,
        }}
        placeholder="Search to Select"
        optionFilterProp="children"
        filterOption={(input, option) => (option?.label ?? "").includes(input)}
        filterSort={(optionA, optionB) =>
          (optionA?.label ?? "")
            .toLowerCase()
            .localeCompare((optionB?.label ?? "").toLowerCase())
        }
        options={[
          {
            value: "",
            label: "All products",
          },
          {
            value: "shoes",
            label: "Shoes",
          },
          {
            value: "watch",
            label: "Watch",
          },
          {
            value: "womens",
            label: "Womens",
          },
          {
            value: "man",
            label: "Man",
          },
          {
            value: "bag",
            label: "Bag",
          },
          {
            value: "glasses",
            label: "Glasses",
          },
        ]}
        onChange={(e) => handleSelectProduct(e)}
      />
      <Select
        style={{ width: 150, marginLeft: 10 }}
        placeholder="Sort By"
        onChange={handleSortChange}
      >
        <Option value="lowToHigh">Giá tăng dần</Option>
        <Option value="highToLow">Giá giảm dần</Option>
      </Select>
      <hr className="hr-separator" />

      {loading ? (
        <Spinner />
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4  gap-y-14 gap-x-4 my-14 md:my-20 sm:mx-7 -z-10 mx-4">
          {products?.products?.map((element) => {
            return (
              <ProductItems
                key={element.id}
                id={element.id}
                title={element.title}
                price={element.price}
                category={element.category}
                description={element.description}
                image={element?.images[0]}
                addToCart={props.addToCart}
                item={element}
              />
            );
          })}
        </div>
      )}
    </div>
  );
}

export default Products;
