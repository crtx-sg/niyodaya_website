export { matchers } from './matchers.js';

export const nodes = [
	() => import('./nodes/0'),
	() => import('./nodes/1'),
	() => import('./nodes/2'),
	() => import('./nodes/3'),
	() => import('./nodes/4'),
	() => import('./nodes/5'),
	() => import('./nodes/6'),
	() => import('./nodes/7'),
	() => import('./nodes/8'),
	() => import('./nodes/9'),
	() => import('./nodes/10'),
	() => import('./nodes/11'),
	() => import('./nodes/12'),
	() => import('./nodes/13'),
	() => import('./nodes/14'),
	() => import('./nodes/15'),
	() => import('./nodes/16'),
	() => import('./nodes/17'),
	() => import('./nodes/18'),
	() => import('./nodes/19')
];

export const server_loads = [2];

export const dictionary = {
		"/": [3],
		"/about": [4],
		"/admin": [5,[2]],
		"/admin/gallery": [6,[2]],
		"/admin/login": [7,[2]],
		"/admin/reports/applications": [8,[2]],
		"/admin/reports/contact": [9,[2]],
		"/admin/reports/donors": [10,[2]],
		"/admin/reports/volunteers": [11,[2]],
		"/contact": [12],
		"/donate": [13],
		"/gallery": [14],
		"/programmes": [15],
		"/programmes/vidya": [16],
		"/programmes/vinaya": [17],
		"/programmes/vridhi": [18],
		"/resources": [19]
	};

export const hooks = {
	handleError: (({ error }) => { console.error(error) }),
	
	reroute: (() => {}),
	transport: {}
};

export const decoders = Object.fromEntries(Object.entries(hooks.transport).map(([k, v]) => [k, v.decode]));
export const encoders = Object.fromEntries(Object.entries(hooks.transport).map(([k, v]) => [k, v.encode]));

export const hash = false;

export const decode = (type, value) => decoders[type](value);

export { default as root } from '../root.svelte';