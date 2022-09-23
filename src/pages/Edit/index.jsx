import { useParams } from "react-router-dom";
import { getProduct, updateProduct } from "../../util/api";
import { useEffect, useState } from "react";

import Input from "../../components/Input";
import Loader from "../../components/Loader";

const Edit = () => {
	const { productId } = useParams();
	const [loading, setLoading] = useState(false);
	const [name, setName] = useState("");
	const [price, setPrice] = useState(1000);
	const [stock, setStock] = useState(0);
	const [image, setImage] = useState(null);
	const [status, setStatus] = useState(false);
	const [message, setMessage] = useState("");

	const nameHandler = (event) => {
		setName(event.target.value);
	};

	const priceHandler = (event) => {
		setPrice(parseInt(event.target.value));
	};

	const stockHandler = (event) => {
		setStock(parseInt(event.target.value));
	};

	const imageHandler = (event) => {
		setImage(event.target.files[0]);
	};

	const statusHandler = (event) => {
		setStatus(event.target.checked);
	};

	const submitHandler = () => {
		const formData = new FormData();
		formData.append("name", name);
		formData.append("price", price);
		formData.append("stock", stock);
		formData.append("status", status);
		if (image) formData.append("image", image, image.name);
		updateProduct(productId, formData).then((result) => {
			setMessage("Data product berhasil diubah");
		});
	};

	const fillUp = (product) => {
		setName(product.name);
		setPrice(product.price);
		setStock(product.stock);
		setStatus(product.status);
	};

	useEffect(() => {
		setLoading(true);
		getProduct(productId).then((result) => {
			fillUp(result.response);
			setLoading(false);
		});
	}, [productId]);

	return (
		<div className="main">
			<div className="card">
				<h2>Edit Produk</h2>
				<br />
				{loading ? (
					<div className="d-flex align-items-center justify-content-center">
						<Loader />
					</div>
				) : (
					<div>
						<Input
							name="name"
							type="text"
							placeholder="Nama Produk..."
							label="Nama"
							onChange={nameHandler}
							value={name}
						/>
						<Input
							name="price"
							type="number"
							placeholder="Harga Produk..."
							label="Harga"
							onChange={priceHandler}
							value={price}
						/>
						<Input
							name="Stock"
							type="number"
							placeholder="Stock Produk..."
							label="Stock"
							onChange={stockHandler}
							value={stock}
						/>
						<Input
							name="image_url"
							type="file"
							label="Upload Gambar"
							accept="image/*"
							onChange={imageHandler}
						/>
						<Input
							name="status"
							type="checkbox"
							label="Active"
							onChange={statusHandler}
							checked={status}
						/>
						<button
							onClick={submitHandler}
							className="btn btn-primary"
						>
							Simpan
						</button>
						{message === "" ? (
							""
						) : (
							<p style={{ marginTop: "2rem" }}>{message}</p>
						)}
					</div>
				)}
			</div>
		</div>
	);
};

export default Edit;
