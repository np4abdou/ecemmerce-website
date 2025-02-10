export default function handler(req, res) {
  const { id } = req.query;

  // Mock product data - replace with your actual product data
  const products = {
    1: {
      id: 1,
      name: "T-Shirt",
      description: "Comfortable cotton t-shirt",
      price: 29.99,
      sizes: ["S", "M", "L", "XL"],
      image: "/images/shirt.png"
    }
  };

  const product = products[id];

  if (!product) {
    return res.status(404).json({ message: "Product not found" });
  }

  res.status(200).json(product);
}