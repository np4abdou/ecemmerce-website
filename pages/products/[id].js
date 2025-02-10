import { useRouter } from "next/router";
import { useState } from "react";

export const runtime = 'edge';

export default function ProductPage({ product }) {
  const router = useRouter();
  const [selectedSize, setSelectedSize] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      const orderData = {
        productId: product.id,
        productName: product.name,
        size: selectedSize,
        fullName: e.target.fullName.value,
        phone: e.target.phone.value,
        city: e.target.city.value,
        price: product.price,
        date: new Date().toISOString(),
      };

      const response = await fetch('/api/setup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(orderData),
      });

      const data = await response.json();

      if (response.ok) {
        router.push('/order-success');
      } else {
        setError(data.error || 'Failed to place order');
        console.error('Server Error:', data);
      }
    } catch (error) {
      console.error('Client Error:', error);
      setError('Failed to place order. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  if (router.isFallback) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4" role="alert">
          <strong className="font-bold">Error:</strong>
          <span className="block sm:inline"> {error}</span>
        </div>
      )}
      <h1 className="text-3xl font-bold mb-4">{product.name}</h1>
      <img src={product.image || "/placeholder.svg"} alt={product.name} className="w-full mb-4" />
      <p className="text-lg mb-4">{product.description}</p>
      <p className="text-lg font-bold mb-2">Price: ${product.price}</p>
      <div className="mb-4">
        <label htmlFor="size" className="block text-lg font-medium mb-2">
          Size:
        </label>
        <select
          id="size"
          value={selectedSize}
          onChange={(e) => setSelectedSize(e.target.value)}
          className="w-full p-3 bg-background border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
          required
        >
          <option value="">Select Size</option>
          {product.sizes.map((size) => (
            <option key={size} value={size}>
              {size}
            </option>
          ))}
        </select>
      </div>
      <form onSubmit={handleSubmit} className="space-y-6">
        <h3 className="text-xl font-semibold text-right mb-4">لإكمال طلبك، يرجى ملء النموذج التالي</h3>

        <input
          type="text"
          name="fullName"
          placeholder="الإسم الكامل / Full name"
          className="w-full p-3 bg-background border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
          required
        />

        <input
          type="tel"
          name="phone"
          placeholder="رقم الهاتف / Phone"
          className="w-full p-3 bg-background border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
          required
        />

        <input
          type="text"
          name="city"
          placeholder="المدينة / City"
          className="w-full p-3 bg-background border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
          required
        />

        <button
          type="submit"
          disabled={isLoading}
          className="w-full bg-primary text-primary-foreground p-4 rounded-md text-lg font-semibold hover:bg-primary/90 transition-colors transform hover:scale-105 duration-200 disabled:opacity-50"
        >
          {isLoading ? 'جاري المعالجة... / Processing...' : 'أطلب الآن / ORDER NOW'}
        </button>
      </form>
    </div>
  )
}

// Add static paths if needed
export async function getStaticPaths() {
  return {
    paths: [],
    fallback: 'blocking'
  };
}

// Update getServerSideProps to use edge
export async function getServerSideProps({ params }) {
  try {
    const response = await fetch(`https://api.cloudflare.com/client/v4/accounts/${process.env.CLOUDFLARE_D1_ACCOUNT_ID}/d1/database/${process.env.CLOUDFLARE_D1_DATABASE_ID}/query`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.CLOUDFLARE_D1_TOKEN}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        sql: 'SELECT * FROM products WHERE id = ?',
        params: [params.id]
      })
    });

    const data = await response.json();
    
    if (!response.ok) {
      return { notFound: true };
    }

    return { 
      props: { 
        product: data.result[0] || null 
      } 
    };
  } catch (error) {
    console.error("Error fetching product:", error);
    return { notFound: true };
  }
}
