const getAllProducts = async () => {
	const response = await fetch(
		"https://tugas-express-yoga.herokuapp.com/api/v4/products"
	);
	const result = await response.json();
	return result;
};

const getProduct = async (productId) => {
	const response = await fetch(
		`https://tugas-express-yoga.herokuapp.com/api/v4/product/${productId}`
	);
	const result = await response.json();
	return result;
};

const storeProduct = async (formData) => {
	const response = await fetch(
		`https://tugas-express-yoga.herokuapp.com/api/v4/product/`,
		{
			method: "POST",
			body: formData,
		}
	);
	const result = await response.json();
	return result;
};

const updateProduct = async (productId, formData) => {
	const response = await fetch(
		`https://tugas-express-yoga.herokuapp.com/api/v4/product/${productId}`,
		{
			method: "PUT",
			body: formData,
		}
	);
	const result = await response.json();
	return result;
};

const destroyProduct = async (productId) => {
	const response = await fetch(
		`https://tugas-express-yoga.herokuapp.com/api/v4/product/${productId}`,
		{
			method: "DELETE",
		}
	);
	const result = await response.json();
	return result;
};

module.exports = {
	getAllProducts,
	getProduct,
	storeProduct,
	updateProduct,
	destroyProduct
};
