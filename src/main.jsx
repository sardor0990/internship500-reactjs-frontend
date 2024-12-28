import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom';
import Root from './root/index';
import './index.css';
import './i18n';
import store from './redux/store/store';
import { Provider } from 'react-redux';
import { QueryParamProvider } from 'use-query-params';
import { ReactRouter6Adapter } from 'use-query-params/adapters/react-router-6';
import { Helmet } from 'react-helmet';
import { ErrorFallback } from './component/error-fallback';
import { ErrorBoundary } from 'react-error-boundary';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
const root = ReactDOM.createRoot(document.getElementById('root'));
const queryClient = new QueryClient();
root.render(
	<>
		<Router>
			<Helmet>
				<title>Internship 500</title>
				<meta property="og:type" content="website" />
			</Helmet>
			<ErrorBoundary FallbackComponent={ErrorFallback}>
				<QueryParamProvider adapter={ReactRouter6Adapter}>
					<Provider store={store}>
						<QueryClientProvider client={queryClient}>
							<Root />
						</QueryClientProvider>
					</Provider>
				</QueryParamProvider>
			</ErrorBoundary>
		</Router>
	</>,
);
