import React, { useContext, useState } from "react";
import "./UpdatedInventory.css";
import { useLoaderData, useNavigate } from "react-router";
import toast from "react-hot-toast";
import { AuthContext } from "../../UserContext/UserContext";

const UpdatedInventory = () => {
  const { user } = useContext(AuthContext);
  const inventory = useLoaderData();
  const [product, setProduct] = useState(inventory);
  const navigate = useNavigate();
  const {
    _id,
    name,
    seller,
    price,
    ratings,
    stock,
    img,
    category,
    shipping,
    ratingsCount,
  } = inventory;

  const handleUpdateProduct = (event) => {
    event.preventDefault();
    fetch(`http://localhost:5000/products/${_id}`, {
      method: "PUT",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(product),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.modifiedCount > 0) {
          toast.success("Updated successfully!");
          navigate("/inventory");
        }
      });
  };

  const handleProductChange = (event) => {
    const field = event.target.name;
    const value = event.target.value;
    const newProduct = { ...product };
    newProduct[field] = value;
    setProduct(newProduct);
  };

  return (
    <div className="mt-4 mb-20">
      <h3 className="text-center font-bold" style={{ color: "rgb(255, 145, 1" }}>
        Edit Product
      </h3>
      <p className="text-center">
        <strong>Product id: {_id}</strong>
      </p>
      <div className="form-container">
        <div className="mb-3">
          <label>Name</label>
          <br />
          <input
            onChange={handleProductChange}
            type="text"
            name="name"
            defaultValue={name}
            className="px-2 py-1 w-100 rounded border-2 border-slate-300 text-black"
            required
          />
        </div>
        <div className="mb-3">
          <label>Seller</label>
          <br />
          <input
            onChange={handleProductChange}
            type="text"
            name="seller"
            defaultValue={seller}
            className="px-2 py-1 w-100 rounded border-2 border-slate-300 text-black"
            required
          />
        </div>
        <div className="mb-3">
          <label>Category</label>
          <br />
          <input
            onChange={handleProductChange}
            type="text"
            name="category"
            defaultValue={category}
            className="px-2 py-1 w-100 rounded border-2 border-slate-300 text-black"
            required
          />
        </div>
        <div className="mb-3">
          <label>Price</label>
          <br />
          <input
            onChange={handleProductChange}
            type="text"
            name="price"
            defaultValue={price}
            className="px-2 py-1 w-100 rounded border-2 border-slate-300 text-black"
            required
          />
        </div>
        <div className="mb-3">
          <label>At Stock</label>
          <br />
          <input
            onChange={handleProductChange}
            type="text"
            name="stock"
            defaultValue={stock}
            className="px-2 py-1 w-100 rounded border-2 border-slate-300 text-black"
            required
          />
        </div>
        <div className="mb-3">
          <label>Image</label>
          <br />
          <input
            onChange={handleProductChange}
            type="text"
            name="image"
            defaultValue={img}
            className="px-2 py-1 w-100 rounded border-2 border-slate-300 text-black"
            required
          />
        </div>
        <div className="mb-3">
          <label>Shipping</label>
          <br />
          <input
            onChange={handleProductChange}
            type="text"
            name="shipping"
            defaultValue={shipping}
            className="px-2 py-1 w-100 rounded border-2 border-slate-300 text-black"
            required
          />
        </div>
        <div className="mb-3">
          <label>Ratings</label>
          <br />
          <input
            onChange={handleProductChange}
            type="text"
            name="ratings"
            defaultValue={ratings}
            className="px-2 py-1 w-100 rounded border-2 border-slate-300 text-black"
            required
          />
        </div>
        <div>
          <label>Ratings Count</label>
          <br />
          <input
            onChange={handleProductChange}
            type="text"
            name="ratinsCount"
            defaultValue={ratingsCount}
            className="px-2 py-1 w-100 rounded border-2 border-slate-300 text-black"
            required
          />
        </div>
      </div>
      <div className="text-center">
        {user?.email === "yeasin@gmail.com" ? (
          <button onClick={handleUpdateProduct} className="update-btn">
            Update
          </button>
        ) : (
          <button disabled className="disable-btn">
            Update
          </button>
        )}
      </div>
      <p className='text-sm text-center font-bold mt-2'>Update button is only available for admins</p>
    </div>
  );
};

export default UpdatedInventory;
