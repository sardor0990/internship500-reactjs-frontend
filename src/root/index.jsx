import { Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import { Loader } from '../component/Loader/Loader';
import { Data, ADMIN_DATA } from '../utils/index';
import AuthGuard from "../component/AuthGuard";
import Admin from '../component/Admin';
import Profile from '@/component/Home/component/Profile';
function Root() {
	return (
		<Suspense fallback={<Loader />}>
			<Routes>
				<Route path="/profile" element={<AuthGuard to={"/login"}><Profile /></AuthGuard>}/>	

				{Data.map(({ component: Component, path }, i) => (
					<Route path={path} element={<Component />} key={i} />
				))}

				<Route path="/admin" element={<AuthGuard to={"/login"} requiredRole={"ADMIN"}><Admin /></AuthGuard>}>
					{ADMIN_DATA.map(({ component: Component, path }, i) => (
						<Route path={path} element={<Component />} key={i} />
					))}
				</Route>

				<Route
					path={'*'}
					element={
						<div className="flex w-full h-screen justify-center items-center">
							<h1>404 Not found 🙁</h1>
						</div>
					}
				/>
			</Routes>
		</Suspense>
	);
}

export default Root;
