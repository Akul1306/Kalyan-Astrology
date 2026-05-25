import OptimizedImage from "@/components/common/OptimizedImage";
export default function ProductCard({ product }) {
    return (<div className="rounded-xl border bg-white p-4 shadow-sm">
			<div className="relative aspect-square w-full overflow-hidden rounded-lg bg-gray-100">
				<OptimizedImage src={product.image} alt={product.title} fill quality={90} sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw" objectFit="cover" priority={false} loading="lazy" className="rounded-lg"/>
			</div>
			<h3 className="mt-3 text-sm font-medium text-gray-900">{product.title}</h3>
			<p className="text-sm text-gray-600">₹ {product.price.toFixed(2)}</p>
			<button className="mt-3 w-full rounded-lg bg-orange-600 px-3 py-2 text-sm font-medium text-white hover:bg-orange-700">Add to Cart</button>
		</div>);
}
