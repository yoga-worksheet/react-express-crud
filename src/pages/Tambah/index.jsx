import { useState } from "react";
import { storeProduct } from "../../util/api";
import Input from "../../components/Input";
import "./index.scss";

const Tambah = () => {
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

	const resetForm = () => {
		setName("");
		setPrice(0);
		setStock(0);
		setImage(null);
		setStatus(false);
	};

	const submitHandler = () => {
		const formData = new FormData();
		formData.append("name", name);
		formData.append("price", price);
		formData.append("stock", stock);
		formData.append("image", image, image.name);
		formData.append("status", status);
		setMessage(`Tunggu sebentar... jangan berpindah ke halaman lain`)
		storeProduct(formData).then((result) => {
			if (result.status === "success") {
				setMessage(`Produk ${name} berhasil ditambahkan`);
				resetForm();
			}
		});
	};

	return (
		<div className="main">
			<div className="card">
				<h2>Tambah Produk</h2>
				<br />
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
				<button onClick={submitHandler} className="btn btn-primary">
					Simpan
				</button>
				{message === "" ? "" : <p style={{'marginTop' : '2rem'}}>{message}</p>}
			</div>
		</div>
	);
};

export default Tambah;
