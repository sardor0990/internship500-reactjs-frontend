import React from 'react';

export const ErrorFallback = ({ error, resetErrorBoundary }) => (
	<div role="alert" className="w-full min-h-screen bg-slate-400">
		<p>Something went wrong:</p>
		<pre className="text-red-500">{error?.message}</pre>
		<button type="button" onClick={resetErrorBoundary}>
			Try again
		</button>
	</div>
);
