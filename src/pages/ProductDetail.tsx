import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { fetchProductById } from "@/api/product";
import { useCart } from "@/context/CartContext";
import { useProduct } from "@/context/ProductContext";
import type { Product } from "@/types/product";

function ProductDetail() {
  const { id } = useParams<{ id: string }>();
  const { addToCart } = useCart();
  const { products } = useProduct();
  const [product, setProduct] = useState<Product | null>(
    () => products.find((p) => String(p.id) === String(id)) || null
  );
  const [loading, setLoading] = useState(!product);

  useEffect(() => {
    if (!id) return;
    const productId = id;
    fetchProductById(productId)
      .then(setProduct)
      .catch(() => {})
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <p className="p-8 text-center text-slate-600">Loading product...</p>;
  if (!product) return <p className="p-8 text-center text-slate-600">Product not found.</p>;

  return (
    <div className="max-w-4xl mx-auto p-6">
      <Link to="/" className="text-sm font-medium text-slate-600 hover:text-slate-900 mb-4 inline-block">
        &larr; Back to Products
      </Link>
      <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm flex flex-col md:flex-row gap-6">
        <img src={product.image} alt={product.title} className="h-64 w-full md:w-1/2 object-contain rounded" />
        <div className="flex-1 flex flex-col justify-between">
          <div>
            <span className="text-xs uppercase tracking-wide text-emerald-500 font-bold">{product.category}</span>
            <h1 className="text-xl font-bold text-slate-900 mt-1 mb-2">{product.title}</h1>
            <p className="text-2xl font-bold text-slate-900 mb-3">${product.price.toFixed(2)}</p>
            <p className="text-sm text-slate-600 mb-4 leading-relaxed">{product.description}</p>
          </div>
          <button
            onClick={() => addToCart(product)}
            className="w-full bg-slate-900 hover:bg-slate-700 text-white font-medium py-2.5 rounded-lg transition-colors"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductDetail;
