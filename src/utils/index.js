import { lazy } from 'react';
const Profile = lazy(() => import('@/component/Home/component/Profile'));
const InternShipDetail = lazy(() =>
	import('@/component/Home/component/InternShipDetail'),
);
const Main = lazy(() => import('@/component/Home/component/Home'));
const Users = lazy(() => import('@/component/Admin/users'));
const Internship = lazy(() => import('@/component/Admin/apps'));
const Requisition = lazy(() => import('@/component/Admin/requisition'));
const Call = lazy(() => import('@/component/Admin/call'));
const Season = lazy(() => import('@/component/Admin/season'));
const Internship500 = lazy(() => import('@/component/Home/component/Internship500'));
const About = lazy(() => import('@/component/Home/component/About'));
const Contact = lazy(() => import('@/component/Home/component/Contact'));
const Login = lazy(() => import('@/component/Home/component/Login/Login'));
const Registration = lazy(() => import('@/component/Home/component/Registration/Registration'));
const InternshipSearch = lazy(() => import('@/component/Home/component/InternshipSearch/index'));

export const Data = [
	{
		id: 1,
		path: '/',
		component: Main,
	},
	{
		id: 2,
		path: '/profile',
		component: Profile,
	},
	{
		id: 3,
		path: '/internship500/detail/:id',
		component: InternShipDetail,
	},
	{
		id: 4,
		path: '/internship500',
		component: Internship500,
	},
	{
		id: 5,
		path: '/about',
		component: About,
	},
	{
		id: 6,
		path: '/contact',
		component: Contact,
	},
	{
		id: 7,
		path: '/login',
		component: Login,
	},
	{
		id: 8,
		path: '/registration',
		component: Registration,
	},
	{
		id: 9,
		path: '/internships',
		component: InternshipSearch,
	},
	
];
export const ADMIN_DATA = [
	{
		id: 8,
		path: '/admin',
		component: Users,
	},
	{
		id: 1,
		path: '/admin/users',
		component: Users,
	},
	{
		id: 3,
		path: '/admin/internships',
		component: Internship,
	},
	{
		id: 4,
		path: '/admin/requisition',
		component: Requisition,
	},
	{
		id: 5,
		path: '/admin/call',
		component: Call,
	},
	{
		id: 6,
		path: '/admin/season',
		component: Season,
	}
];
