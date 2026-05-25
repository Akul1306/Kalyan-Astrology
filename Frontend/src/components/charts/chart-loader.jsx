export default function ChartLoader() {
    return (<div className="animate-pulse rounded-xl border bg-white p-4 shadow-sm">
			<div className="mb-3 h-4 w-32 rounded bg-gray-200"/>
			<div className="grid grid-cols-3 gap-2">
				{Array.from({ length: 9 }).map((_, i) => (<div key={i} className="h-12 rounded-md bg-gray-100"/>))}
			</div>
		</div>);
}
