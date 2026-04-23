const manifest = (() => {
function __memo(fn) {
	let value;
	return () => value ??= (value = fn());
}

return {
	appDir: "_app",
	appPath: "_app",
	assets: new Set(["80G_Certificate.pdf","MemorandumofAssociation.pdf","gallery/03032012817.jpg","gallery/03032012830.jpg","gallery/03032012832.jpg","gallery/03032012833.jpg","gallery/09072011714.jpg","gallery/09072011721.jpg","gallery/11122010643.jpg","gallery/14082010554.jpg","gallery/14082010556.jpg","gallery/14082010557.jpg","gallery/18022011691.jpg","gallery/18022011692.jpg","gallery/26012011663.jpg","gallery/26012011666.jpg","gallery/26012011667.jpg","gallery/26012011668.jpg","gallery/26062010536.jpg","gallery/uploads/.gitignore","logo-icon.png","logo-mark.svg","logo.png","logo.svg"]),
	mimeTypes: {".pdf":"application/pdf",".jpg":"image/jpeg",".png":"image/png",".svg":"image/svg+xml"},
	_: {
		client: {start:"_app/immutable/entry/start.BQgTBbYI.js",app:"_app/immutable/entry/app.DkV0E9Zy.js",imports:["_app/immutable/entry/start.BQgTBbYI.js","_app/immutable/chunks/BwD15NmI.js","_app/immutable/chunks/oht4bCKv.js","_app/immutable/entry/app.DkV0E9Zy.js","_app/immutable/chunks/oht4bCKv.js","_app/immutable/chunks/B7D6LavU.js"],stylesheets:[],fonts:[],uses_env_dynamic_public:false},
		nodes: [
			__memo(() => import('./chunks/0-Qw2u2-SO.js')),
			__memo(() => import('./chunks/1-5OJy-8Rt.js')),
			__memo(() => import('./chunks/2-BA29VfKF.js')),
			__memo(() => import('./chunks/3-DSFGgC0m.js')),
			__memo(() => import('./chunks/4-B8WdobAk.js')),
			__memo(() => import('./chunks/5-B34Yn1ET.js')),
			__memo(() => import('./chunks/6-DV-_Olp5.js')),
			__memo(() => import('./chunks/7-CGQOBOB7.js')),
			__memo(() => import('./chunks/8-CX33j0ct.js')),
			__memo(() => import('./chunks/9-BIV6OE6T.js')),
			__memo(() => import('./chunks/10-D-DPmx8f.js')),
			__memo(() => import('./chunks/11-hZBQltQa.js')),
			__memo(() => import('./chunks/12-BgJjhOfy.js')),
			__memo(() => import('./chunks/13-C6-lUY0o.js')),
			__memo(() => import('./chunks/14-DZf0dtCE.js')),
			__memo(() => import('./chunks/15-CwA_nOW2.js')),
			__memo(() => import('./chunks/16-BG483Dcc.js')),
			__memo(() => import('./chunks/17-k9IymXqE.js')),
			__memo(() => import('./chunks/18-CxdC8XSZ.js')),
			__memo(() => import('./chunks/19-Dn4NCvnx.js'))
		],
		remotes: {
			
		},
		routes: [
			{
				id: "/",
				pattern: /^\/$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 3 },
				endpoint: null
			},
			{
				id: "/about",
				pattern: /^\/about\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 4 },
				endpoint: null
			},
			{
				id: "/admin",
				pattern: /^\/admin\/?$/,
				params: [],
				page: { layouts: [0,2,], errors: [1,,], leaf: 5 },
				endpoint: null
			},
			{
				id: "/admin/gallery",
				pattern: /^\/admin\/gallery\/?$/,
				params: [],
				page: { layouts: [0,2,], errors: [1,,], leaf: 6 },
				endpoint: null
			},
			{
				id: "/admin/login",
				pattern: /^\/admin\/login\/?$/,
				params: [],
				page: { layouts: [0,2,], errors: [1,,], leaf: 7 },
				endpoint: null
			},
			{
				id: "/admin/reports/applications",
				pattern: /^\/admin\/reports\/applications\/?$/,
				params: [],
				page: { layouts: [0,2,], errors: [1,,], leaf: 8 },
				endpoint: null
			},
			{
				id: "/admin/reports/contact",
				pattern: /^\/admin\/reports\/contact\/?$/,
				params: [],
				page: { layouts: [0,2,], errors: [1,,], leaf: 9 },
				endpoint: null
			},
			{
				id: "/admin/reports/donors",
				pattern: /^\/admin\/reports\/donors\/?$/,
				params: [],
				page: { layouts: [0,2,], errors: [1,,], leaf: 10 },
				endpoint: null
			},
			{
				id: "/admin/reports/volunteers",
				pattern: /^\/admin\/reports\/volunteers\/?$/,
				params: [],
				page: { layouts: [0,2,], errors: [1,,], leaf: 11 },
				endpoint: null
			},
			{
				id: "/api/admin/applications",
				pattern: /^\/api\/admin\/applications\/?$/,
				params: [],
				page: null,
				endpoint: __memo(() => import('./chunks/_server-BLYAT87v.js'))
			},
			{
				id: "/api/admin/contact",
				pattern: /^\/api\/admin\/contact\/?$/,
				params: [],
				page: null,
				endpoint: __memo(() => import('./chunks/_server-UWlXa3eM.js'))
			},
			{
				id: "/api/admin/donors",
				pattern: /^\/api\/admin\/donors\/?$/,
				params: [],
				page: null,
				endpoint: __memo(() => import('./chunks/_server-uAZmkUMl.js'))
			},
			{
				id: "/api/admin/donors/receipt",
				pattern: /^\/api\/admin\/donors\/receipt\/?$/,
				params: [],
				page: null,
				endpoint: __memo(() => import('./chunks/_server-B4vaJa5j.js'))
			},
			{
				id: "/api/admin/gallery",
				pattern: /^\/api\/admin\/gallery\/?$/,
				params: [],
				page: null,
				endpoint: __memo(() => import('./chunks/_server-CsX8KY0N.js'))
			},
			{
				id: "/api/admin/login",
				pattern: /^\/api\/admin\/login\/?$/,
				params: [],
				page: null,
				endpoint: __memo(() => import('./chunks/_server-ZYV5CdOl.js'))
			},
			{
				id: "/api/admin/logout",
				pattern: /^\/api\/admin\/logout\/?$/,
				params: [],
				page: null,
				endpoint: __memo(() => import('./chunks/_server-DKewVl4R.js'))
			},
			{
				id: "/api/admin/volunteers",
				pattern: /^\/api\/admin\/volunteers\/?$/,
				params: [],
				page: null,
				endpoint: __memo(() => import('./chunks/_server-CKPGSvzb.js'))
			},
			{
				id: "/api/apply",
				pattern: /^\/api\/apply\/?$/,
				params: [],
				page: null,
				endpoint: __memo(() => import('./chunks/_server-D6MzP_Lm.js'))
			},
			{
				id: "/api/contact",
				pattern: /^\/api\/contact\/?$/,
				params: [],
				page: null,
				endpoint: __memo(() => import('./chunks/_server-CUjKQ8Tj.js'))
			},
			{
				id: "/api/donate",
				pattern: /^\/api\/donate\/?$/,
				params: [],
				page: null,
				endpoint: __memo(() => import('./chunks/_server-Bx_863iA.js'))
			},
			{
				id: "/api/gallery",
				pattern: /^\/api\/gallery\/?$/,
				params: [],
				page: null,
				endpoint: __memo(() => import('./chunks/_server-bQLK5R9Y.js'))
			},
			{
				id: "/api/razorpay-webhook",
				pattern: /^\/api\/razorpay-webhook\/?$/,
				params: [],
				page: null,
				endpoint: __memo(() => import('./chunks/_server-Cd1afqSI.js'))
			},
			{
				id: "/api/receipt",
				pattern: /^\/api\/receipt\/?$/,
				params: [],
				page: null,
				endpoint: __memo(() => import('./chunks/_server-BEJu-LsO.js'))
			},
			{
				id: "/api/vinaya",
				pattern: /^\/api\/vinaya\/?$/,
				params: [],
				page: null,
				endpoint: __memo(() => import('./chunks/_server-Col-7Wb8.js'))
			},
			{
				id: "/contact",
				pattern: /^\/contact\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 12 },
				endpoint: null
			},
			{
				id: "/donate",
				pattern: /^\/donate\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 13 },
				endpoint: null
			},
			{
				id: "/gallery",
				pattern: /^\/gallery\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 14 },
				endpoint: null
			},
			{
				id: "/programmes",
				pattern: /^\/programmes\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 15 },
				endpoint: null
			},
			{
				id: "/programmes/vidya",
				pattern: /^\/programmes\/vidya\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 16 },
				endpoint: null
			},
			{
				id: "/programmes/vinaya",
				pattern: /^\/programmes\/vinaya\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 17 },
				endpoint: null
			},
			{
				id: "/programmes/vridhi",
				pattern: /^\/programmes\/vridhi\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 18 },
				endpoint: null
			},
			{
				id: "/resources",
				pattern: /^\/resources\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 19 },
				endpoint: null
			}
		],
		prerendered_routes: new Set([]),
		matchers: async () => {
			
			return {  };
		},
		server_assets: {}
	}
}
})();

const prerendered = new Set([]);

const base = "";

export { base, manifest, prerendered };
//# sourceMappingURL=manifest.js.map
