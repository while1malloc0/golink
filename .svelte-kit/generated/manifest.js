const c = [
	() => import("../../src/routes/__layout.svelte"),
	() => import("../../src/routes/__error.svelte"),
	() => import("../../src/routes/index.svelte"),
	() => import("../../src/routes/signup.svelte"),
	() => import("../../src/routes/admin/users.svelte"),
	() => import("../../src/routes/links/index.svelte"),
	() => import("../../src/routes/links/new.svelte"),
	() => import("../../src/routes/login.svelte"),
	() => import("../../src/routes/404.svelte")
];

const d = decodeURIComponent;

export const routes = [
	// src/routes/index.svelte
	[/^\/$/, [c[0], c[2]], [c[1]]],

	// src/routes/signup.svelte
	[/^\/signup\/?$/, [c[0], c[3]], [c[1]]],

	// src/routes/admin/users.svelte
	[/^\/admin\/users\/?$/, [c[0], c[4]], [c[1]], null, 1],

	// src/routes/links/index.svelte
	[/^\/links\/?$/, [c[0], c[5]], [c[1]], null, 1],

	// src/routes/links/new.svelte
	[/^\/links\/new\/?$/, [c[0], c[6]], [c[1]]],

	// src/routes/login.svelte
	[/^\/login\/?$/, [c[0], c[7]], [c[1]]],

	// src/routes/404.svelte
	[/^\/404\/?$/, [c[0], c[8]], [c[1]]]
];

// we import the root layout/error components eagerly, so that
// connectivity errors after initialisation don't nuke the app
export const fallback = [c[0](), c[1]()];