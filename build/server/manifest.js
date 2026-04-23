const manifest = (() => {
function __memo(fn) {
	let value;
	return () => value ??= (value = fn());
}

return {
	appDir: "_app",
	appPath: "_app",
	assets: new Set(["MemorandumofAssociation.pdf","gallery/03032012817.jpg","gallery/03032012830.jpg","gallery/03032012832.jpg","gallery/03032012833.jpg","gallery/09072011714.jpg","gallery/09072011721.jpg","gallery/11122010643.jpg","gallery/14082010554.jpg","gallery/14082010556.jpg","gallery/14082010557.jpg","gallery/18022011691.jpg","gallery/18022011692.jpg","gallery/26012011663.jpg","gallery/26012011666.jpg","gallery/26012011667.jpg","gallery/26012011668.jpg","gallery/26062010536.jpg","logo-icon.png","logo-mark.svg","logo.png","logo.svg"]),
	mimeTypes: {".pdf":"application/pdf",".jpg":"image/jpeg",".png":"image/png",".svg":"image/svg+xml"},
	_: {
		client: {start:"_app/immutable/entry/start.B_M-zPu7.js",app:"_app/immutable/entry/app.D3n6rOPl.js",imports:["_app/immutable/entry/start.B_M-zPu7.js","_app/immutable/chunks/_o1OuCTH.js","_app/immutable/chunks/CrGyUMwP.js","_app/immutable/entry/app.D3n6rOPl.js","_app/immutable/chunks/CrGyUMwP.js","_app/immutable/chunks/Ds_wUKBT.js"],stylesheets:[],fonts:[],uses_env_dynamic_public:true},
		nodes: [
			__memo(() => import('./chunks/0-CRK6Ym8N.js')),
			__memo(() => import('./chunks/1-M0WerCID.js')),
			__memo(() => import('./chunks/2-CfPGG9hS.js')),
			__memo(() => import('./chunks/3-BQe5coSf.js')),
			__memo(() => import('./chunks/4-C3nbJjh-.js')),
			__memo(() => import('./chunks/5-DqcCvWOr.js')),
			__memo(() => import('./chunks/6-Dp2QtStt.js')),
			__memo(() => import('./chunks/7-DT9vWIkX.js')),
			__memo(() => import('./chunks/8-DaJWhEK1.js')),
			__memo(() => import('./chunks/9-DkC2BoBh.js')),
			__memo(() => import('./chunks/10-BTKgBdC1.js')),
			__memo(() => import('./chunks/11-ekzRXmlE.js')),
			__memo(() => import('./chunks/12-Bqg76A9j.js'))
		],
		remotes: {
			
		},
		routes: [
			{
				id: "/",
				pattern: /^\/$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 2 },
				endpoint: null
			},
			{
				id: "/about",
				pattern: /^\/about\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 3 },
				endpoint: null
			},
			{
				id: "/admin",
				pattern: /^\/admin\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 4 },
				endpoint: null
			},
			{
				id: "/api/apply",
				pattern: /^\/api\/apply\/?$/,
				params: [],
				page: null,
				endpoint: __memo(() => import('./chunks/_server-DyerDc52.js'))
			},
			{
				id: "/api/contact",
				pattern: /^\/api\/contact\/?$/,
				params: [],
				page: null,
				endpoint: __memo(() => import('./chunks/_server-01NVJkCN.js'))
			},
			{
				id: "/api/donate",
				pattern: /^\/api\/donate\/?$/,
				params: [],
				page: null,
				endpoint: __memo(() => import('./chunks/_server-8ZR8vvkf.js'))
			},
			{
				id: "/api/gallery",
				pattern: /^\/api\/gallery\/?$/,
				params: [],
				page: null,
				endpoint: __memo(() => import('./chunks/_server-BcKpPNbd.js'))
			},
			{
				id: "/api/vinaya",
				pattern: /^\/api\/vinaya\/?$/,
				params: [],
				page: null,
				endpoint: __memo(() => import('./chunks/_server-BfcYhIZq.js'))
			},
			{
				id: "/contact",
				pattern: /^\/contact\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 5 },
				endpoint: null
			},
			{
				id: "/donate",
				pattern: /^\/donate\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 6 },
				endpoint: null
			},
			{
				id: "/gallery",
				pattern: /^\/gallery\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 7 },
				endpoint: null
			},
			{
				id: "/programmes",
				pattern: /^\/programmes\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 8 },
				endpoint: null
			},
			{
				id: "/programmes/vidya",
				pattern: /^\/programmes\/vidya\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 9 },
				endpoint: null
			},
			{
				id: "/programmes/vinaya",
				pattern: /^\/programmes\/vinaya\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 10 },
				endpoint: null
			},
			{
				id: "/programmes/vridhi",
				pattern: /^\/programmes\/vridhi\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 11 },
				endpoint: null
			},
			{
				id: "/resources",
				pattern: /^\/resources\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 12 },
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
