export default function DivisionalChart({ title, data }) {
    return (<div className="rounded-xl border bg-white p-4 shadow-sm">
			<h3 className="mb-3 text-sm font-semibold text-gray-900">{title}</h3>
			<div className="grid grid-cols-3 gap-2">
				{data.flat().map((cell, idx) => (<div key={idx} className="flex h-12 items-center justify-center rounded-md bg-gray-50 text-sm text-gray-700">
						{cell}
					</div>))}
			</div>
		</div>);
}
