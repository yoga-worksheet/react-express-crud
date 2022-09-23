import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getProduct } from "../../util/api";
import { currencyFormatting } from "../../util/formatter";

import Loader from "../../components/Loader";
import "./index.scss";

const Detail = () => {
	const { productId } = useParams();
	const [product, setProduct] = useState({});
	const [loading, setLoading] = useState(false);

	useEffect(() => {
		setLoading(true);
		getProduct(productId).then((result) => {
			setProduct(result.response);
			setLoading(false);
		});
	}, [productId]);

	return (
		<div className="main">
			<Link to="/" className="btn btn-primary">
				Kembali
			</Link>

			{loading ? (
				<div className="d-flex align-items-center justify-content-center w-100 mt-1">
					<Loader />
				</div>
			) : (
				<div>
					<table className="table">
						<tbody>
							<tr>
								<td>ID</td>
								<td>: {product._id}</td>
							</tr>
							<tr>
								<td>Name</td>
								<td>: {product.name}</td>
							</tr>
							<tr>
								<td>Price</td>
								<td>: {currencyFormatting(product.price)}</td>
							</tr>
							<tr>
								<td>Stock</td>
								<td>: {product.stock}</td>
							</tr>
						</tbody>
					</table>
					<div className="image" style={{ marginTop: "1rem" }}>
						<img src={`https://${product.image_url}`} alt="" />
					</div>
				</div>
			)}
		</div>
	);
};

export default Detail;
