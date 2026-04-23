
// this file is generated — do not edit it


declare module "svelte/elements" {
	export interface HTMLAttributes<T> {
		'data-sveltekit-keepfocus'?: true | '' | 'off' | undefined | null;
		'data-sveltekit-noscroll'?: true | '' | 'off' | undefined | null;
		'data-sveltekit-preload-code'?:
			| true
			| ''
			| 'eager'
			| 'viewport'
			| 'hover'
			| 'tap'
			| 'off'
			| undefined
			| null;
		'data-sveltekit-preload-data'?: true | '' | 'hover' | 'tap' | 'off' | undefined | null;
		'data-sveltekit-reload'?: true | '' | 'off' | undefined | null;
		'data-sveltekit-replacestate'?: true | '' | 'off' | undefined | null;
	}
}

export {};


declare module "$app/types" {
	type MatcherParam<M> = M extends (param : string) => param is (infer U extends string) ? U : string;

	export interface AppTypes {
		RouteId(): "/" | "/about" | "/admin" | "/admin/gallery" | "/admin/login" | "/admin/reports" | "/admin/reports/applications" | "/admin/reports/contact" | "/admin/reports/donors" | "/admin/reports/volunteers" | "/api" | "/api/admin" | "/api/admin/applications" | "/api/admin/contact" | "/api/admin/donors" | "/api/admin/donors/receipt" | "/api/admin/gallery" | "/api/admin/login" | "/api/admin/logout" | "/api/admin/volunteers" | "/api/apply" | "/api/contact" | "/api/donate" | "/api/gallery" | "/api/razorpay-webhook" | "/api/receipt" | "/api/vinaya" | "/contact" | "/donate" | "/gallery" | "/programmes" | "/programmes/vidya" | "/programmes/vinaya" | "/programmes/vridhi" | "/resources";
		RouteParams(): {
			
		};
		LayoutParams(): {
			"/": Record<string, never>;
			"/about": Record<string, never>;
			"/admin": Record<string, never>;
			"/admin/gallery": Record<string, never>;
			"/admin/login": Record<string, never>;
			"/admin/reports": Record<string, never>;
			"/admin/reports/applications": Record<string, never>;
			"/admin/reports/contact": Record<string, never>;
			"/admin/reports/donors": Record<string, never>;
			"/admin/reports/volunteers": Record<string, never>;
			"/api": Record<string, never>;
			"/api/admin": Record<string, never>;
			"/api/admin/applications": Record<string, never>;
			"/api/admin/contact": Record<string, never>;
			"/api/admin/donors": Record<string, never>;
			"/api/admin/donors/receipt": Record<string, never>;
			"/api/admin/gallery": Record<string, never>;
			"/api/admin/login": Record<string, never>;
			"/api/admin/logout": Record<string, never>;
			"/api/admin/volunteers": Record<string, never>;
			"/api/apply": Record<string, never>;
			"/api/contact": Record<string, never>;
			"/api/donate": Record<string, never>;
			"/api/gallery": Record<string, never>;
			"/api/razorpay-webhook": Record<string, never>;
			"/api/receipt": Record<string, never>;
			"/api/vinaya": Record<string, never>;
			"/contact": Record<string, never>;
			"/donate": Record<string, never>;
			"/gallery": Record<string, never>;
			"/programmes": Record<string, never>;
			"/programmes/vidya": Record<string, never>;
			"/programmes/vinaya": Record<string, never>;
			"/programmes/vridhi": Record<string, never>;
			"/resources": Record<string, never>
		};
		Pathname(): "/" | "/about" | "/admin" | "/admin/gallery" | "/admin/login" | "/admin/reports/applications" | "/admin/reports/contact" | "/admin/reports/donors" | "/admin/reports/volunteers" | "/api/admin/applications" | "/api/admin/contact" | "/api/admin/donors" | "/api/admin/donors/receipt" | "/api/admin/gallery" | "/api/admin/login" | "/api/admin/logout" | "/api/admin/volunteers" | "/api/apply" | "/api/contact" | "/api/donate" | "/api/gallery" | "/api/razorpay-webhook" | "/api/receipt" | "/api/vinaya" | "/contact" | "/donate" | "/gallery" | "/programmes" | "/programmes/vidya" | "/programmes/vinaya" | "/programmes/vridhi" | "/resources";
		ResolvedPathname(): `${"" | `/${string}`}${ReturnType<AppTypes['Pathname']>}`;
		Asset(): "/80G_Certificate.pdf" | "/MemorandumofAssociation.pdf" | "/gallery/03032012817.jpg" | "/gallery/03032012830.jpg" | "/gallery/03032012832.jpg" | "/gallery/03032012833.jpg" | "/gallery/09072011714.jpg" | "/gallery/09072011721.jpg" | "/gallery/11122010643.jpg" | "/gallery/14082010554.jpg" | "/gallery/14082010556.jpg" | "/gallery/14082010557.jpg" | "/gallery/18022011691.jpg" | "/gallery/18022011692.jpg" | "/gallery/26012011663.jpg" | "/gallery/26012011666.jpg" | "/gallery/26012011667.jpg" | "/gallery/26012011668.jpg" | "/gallery/26062010536.jpg" | "/gallery/uploads/.gitignore" | "/logo-icon.png" | "/logo-mark.svg" | "/logo.png" | "/logo.svg" | string & {};
	}
}