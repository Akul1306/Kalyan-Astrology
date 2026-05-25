"use client";
import * as React from "react";
export default function CartModal() {
    const [open, setOpen] = React.useState(false);
    return (<div>
			<button onClick={() => setOpen(true)} className="rounded-lg bg-gray-900 px-3 py-2 text-sm font-medium text-white hover:bg-gray-800">
				Open Cart
			</button>
			{open ? (<div className="fixed inset-0 z-50 flex">
					<div className="fixed inset-0 bg-black/30" onClick={() => setOpen(false)}/>
					<div className="ml-auto h-full w-full max-w-md bg-white shadow-xl p-4">
						<div className="flex items-center justify-between">
							<h2 className="text-lg font-semibold">Your Cart</h2>
							<button onClick={() => setOpen(false)} aria-label="Close" className="rounded-md p-1 hover:bg-gray-100">✕</button>
						</div>
						<p className="text-sm text-gray-600 mt-2">This is a placeholder cart.</p>
					</div>
				</div>) : null}
		</div>);
}
