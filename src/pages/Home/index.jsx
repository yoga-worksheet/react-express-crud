import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { getAllProducts, destroyProduct } from "../../util/api";
import { currencyFormatting } from "../../util/formatter";

import Loader from "../../components/Loader";

import "./index.scss";

const Home = () => {
	const [products, setProducts] = useState([]);
	const [loading, setLoading] = useState(false);

	useEffect(() => {
		fetchData();
	}, []);

	const fetchData = () => {
		setLoading(true);
		getAllProducts().then((result) => {
			setProducts(result.response);
			setLoading(false);
		});
	};

	const deleteHandler = (productId) => {
		const confirmed = window.confirm("Yakin ingin menghapus data ini");
		if (confirmed)
			destroyProduct(productId).then((result) => {
				if (result.status === "succes") alert(result.response);
				fetchData();
			});
	};

	return (
		<div className="main">
			<Link to="/tambah" className="btn btn-primary">
				Tambah Produk
			</Link>
			<div className="search">
				<input type="text" placeholder="Masukan kata kunci..." />
			</div>
			{loading ? (
				<div className="d-flex align-items-center justify-content-center w-100 mt-1">
					<Loader />
				</div>
			) : (
				<table className="table">
					<thead>
						<tr>
							<th>ID</th>
							<th>Name</th>
							<th className="text-right">Price</th>
							<th className="text-center">Action</th>
						</tr>
					</thead>
					<tbody>
						{products.map((product, index) => (
							<tr key={product._id}>
								<td>{index + 1}</td>
								<td>{product.name}</td>
								<td className="text-right">
									{currencyFormatting(product.price)}
								</td>
								<td className="text-center">
									<Link
										to={`/detail/${product._id}`}
										className="btn btn-sm btn-info"
									>
										Detail
									</Link>
									<Link
										to={`/edit/${product._id}`}
										className="btn btn-sm btn-warning"
									>
										Edit
									</Link>
									<Link
										to="#"
										className="btn btn-sm btn-danger"
										onClick={() =>
											deleteHandler(product._id)
										}
									>
										Delete
									</Link>
								</td>
							</tr>
						))}
					</tbody>
				</table>
			)}
		</div>
	);
};

export default Home;
