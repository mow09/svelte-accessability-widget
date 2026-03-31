<script lang="ts">
	import { onMount } from 'svelte';
	import {
		Menu,
		X,
		Zap,
		BarChart2,
		Users,
		Shield,
		Bell,
		GitBranch,
		CheckCircle,
		ChevronDown,
		Star,
		ArrowRight,
		Share2,
		Code,
		Globe
	} from '@lucide/svelte';
	import { AccessibilityWidget } from '$lib';

	let mobileOpen = $state(false);
	let faqOpen = $state<number | null>(null);

	const stats = [
		{ value: 99.9, suffix: '%', label: 'Uptime SLA' },
		{ value: 2, suffix: 'M+', label: 'Tasks completed' },
		{ value: 150, suffix: '+', label: 'Integrations' },
		{ value: 4.9, suffix: '★', label: 'Average rating' }
	];

	const animatedStats = $state([0, 0, 0, 0]);

	const features = [
		{ icon: Zap, title: 'Lightning Fast', desc: 'Sub-100ms response times keep your team in flow without waiting.' },
		{ icon: BarChart2, title: 'Real-time Analytics', desc: 'Dashboards update instantly so you always know project health.' },
		{ icon: Users, title: 'Team Collaboration', desc: 'Assign, comment, and review without ever leaving your workspace.' },
		{ icon: Shield, title: 'Enterprise Security', desc: 'SOC2 Type II certified with end-to-end encryption on all data.' },
		{ icon: Bell, title: 'Smart Notifications', desc: 'Only get pinged when it matters — AI filters the noise for you.' },
		{ icon: GitBranch, title: 'Git Integration', desc: 'Link commits and PRs to tasks automatically via our GitHub app.' }
	];

	const steps = [
		{ n: '01', title: 'Connect your tools', desc: 'Link GitHub, Slack, Figma and 150+ apps in under two minutes.' },
		{ n: '02', title: 'Invite your team', desc: 'Role-based access control means everyone sees exactly what they need.' },
		{ n: '03', title: 'Ship faster', desc: 'Automated workflows eliminate hand-offs and keep every task moving.' }
	];

	const testimonials = [
		{ initials: 'SK', name: 'Sara Kim', role: 'CTO at Luminary', quote: 'Nexflow cut our sprint planning time in half. I don\'t know how we managed without it.' },
		{ initials: 'MR', name: 'Marcus Reid', role: 'Engineering Lead at Orbit', quote: 'The GitHub integration alone is worth it. No more Jira comments that nobody reads.' },
		{ initials: 'AL', name: 'Amara Léa', role: 'Head of Product at Pulse', quote: 'Our designers and devs finally speak the same language. Nexflow bridges the gap beautifully.' }
	];

	const plans = [
		{
			name: 'Free', price: '0', popular: false,
			features: ['Up to 5 users', '3 projects', '1 GB storage', 'Basic analytics', 'Community support']
		},
		{
			name: 'Pro', price: '19', popular: true,
			features: ['Unlimited users', 'Unlimited projects', '50 GB storage', 'Advanced analytics', 'Priority support', 'Git integration', 'Custom fields']
		},
		{
			name: 'Enterprise', price: 'Custom', popular: false,
			features: ['Everything in Pro', 'SSO / SAML', 'Audit logs', 'Dedicated CSM', 'SLA guarantee', 'On-premise option']
		}
	];

	const faqs = [
		{ q: 'Can I switch plans at any time?', a: 'Yes — upgrades take effect immediately, downgrades at the next billing cycle.' },
		{ q: 'Is there a free trial for Pro?', a: 'Absolutely. Every new workspace gets a 14-day Pro trial, no credit card required.' },
		{ q: 'How does the Git integration work?', a: 'Install our GitHub or GitLab app, then branch names and PR statuses sync to linked tasks automatically.' },
		{ q: 'Where is my data stored?', a: 'Data is stored in EU-West (Frankfurt) by default, with US-East available on Enterprise plans.' },
		{ q: 'Does Nexflow work offline?', a: 'The web app requires connectivity. A native desktop app with offline mode is on our roadmap for Q3.' },
		{ q: 'How do I cancel my subscription?', a: 'You can cancel anytime from Settings → Billing. No hoops, no cancellation fees.' }
	];

	const navLinks = ['Features', 'How it works', 'Pricing', 'FAQ'];

	function toggleFaq(i: number) {
		faqOpen = faqOpen === i ? null : i;
	}

	let heroRef: HTMLElement;
	let observedEls: HTMLElement[] = [];

	onMount(() => {
		// Animated stat counters
		stats.forEach((s, i) => {
			const target = s.value;
			const duration = 1800;
			const start = performance.now();
			function tick(now: number) {
				const t = Math.min((now - start) / duration, 1);
				const ease = 1 - Math.pow(1 - t, 3);
				animatedStats[i] = parseFloat((ease * target).toFixed(target % 1 !== 0 ? 1 : 0));
				if (t < 1) requestAnimationFrame(tick);
				else animatedStats[i] = target;
			}
			setTimeout(() => requestAnimationFrame(tick), 400 + i * 100);
		});

		// Scroll fade-in
		const observer = new IntersectionObserver(
			(entries) => entries.forEach((e) => { if (e.isIntersecting) e.target.classList.add('visible'); }),
			{ threshold: 0.12 }
		);
		document.querySelectorAll('.fade-in').forEach((el) => observer.observe(el));
		return () => observer.disconnect();
	});
</script>

<style>
	@keyframes gradient-shift {
		0%, 100% { background-position: 0% 50%; }
		50% { background-position: 100% 50%; }
	}
	.hero-gradient {
		background: linear-gradient(135deg, #6366f1, #8b5cf6, #06b6d4, #6366f1);
		background-size: 300% 300%;
		animation: gradient-shift 6s ease infinite;
	}
	@keyframes marquee {
		0% { transform: translateX(0); }
		100% { transform: translateX(-50%); }
	}
	.marquee-track { animation: marquee 18s linear infinite; }

	.fade-in {
		opacity: 0;
		transform: translateY(24px);
		transition: opacity 0.6s ease, transform 0.6s ease;
	}
	:global(.fade-in.visible) {
		opacity: 1;
		transform: translateY(0);
	}
</style>

<!-- NAVBAR -->
<header class="sticky top-0 z-50 bg-white/90 backdrop-blur border-b border-slate-100 shadow-sm">
	<nav class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16">
		<a href="/" class="flex items-center gap-2 font-bold text-xl text-indigo-600">
			<Zap class="w-6 h-6" />
			Nexflow
		</a>

		<!-- Desktop nav -->
		<ul class="hidden md:flex items-center gap-8">
			{#each navLinks as link}
				<li><a href="#{link.toLowerCase().replace(' ', '-')}" class="text-sm text-slate-500 hover:text-indigo-600 transition-colors">{link}</a></li>
			{/each}
		</ul>

		<div class="hidden md:flex items-center gap-3">
			<a href="." class="text-sm text-slate-600 hover:text-indigo-600 transition-colors">Log in</a>
			<a href="." class="bg-indigo-600 hover:bg-indigo-700 text-white text-sm px-4 py-2 rounded-lg transition-colors">Start free</a>
		</div>

		<!-- Mobile hamburger -->
		<button onclick={() => mobileOpen = !mobileOpen} class="md:hidden p-2 text-slate-600" aria-label="Toggle menu">
			{#if mobileOpen}<X class="w-5 h-5" />{:else}<Menu class="w-5 h-5" />{/if}
		</button>
	</nav>

	{#if mobileOpen}
		<div class="md:hidden bg-white border-t border-slate-100 px-4 pb-4">
			<ul class="flex flex-col gap-3 pt-3">
				{#each navLinks as link}
					<li><a href="#{link.toLowerCase().replace(' ', '-')}" class="text-slate-600 text-sm" onclick={() => mobileOpen = false}>{link}</a></li>
				{/each}
			</ul>
			<div class="flex flex-col gap-2 mt-4">
				<a href="." class="text-sm text-slate-600 text-center">Log in</a>
				<a href="." class="bg-indigo-600 text-white text-sm px-4 py-2 rounded-lg text-center">Start free</a>
			</div>
		</div>
	{/if}
</header>

<!-- HERO -->
<section class="relative overflow-hidden bg-white pt-20 pb-28 px-4">
	<div class="absolute inset-0 hero-gradient opacity-10 pointer-events-none" aria-hidden="true"></div>
	<div class="max-w-4xl mx-auto text-center relative z-10">
		<div class="inline-flex items-center gap-2 bg-indigo-50 text-indigo-600 text-xs font-medium px-3 py-1 rounded-full mb-6">
			<Zap class="w-3 h-3" /> New: AI-powered sprint planning is here
		</div>
		<h1 class="text-5xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight mb-6 bg-gradient-to-r from-indigo-600 via-violet-500 to-cyan-500 bg-clip-text text-transparent leading-tight">
			Ship faster.<br />Together.
		</h1>
		<p class="text-lg text-slate-500 max-w-2xl mx-auto mb-10 leading-relaxed">
			Nexflow is the project management platform built for engineering teams who ship. Connect your tools, align your team, and close tickets — not tickets about tickets.
		</p>
		<div class="flex flex-col sm:flex-row gap-4 justify-center">
			<a href="." class="bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-4 rounded-xl font-semibold text-base transition-all hover:scale-105 shadow-lg shadow-indigo-200 flex items-center justify-center gap-2">
				Get started free <ArrowRight class="w-4 h-4" />
			</a>
			<a href="." class="border border-slate-200 hover:border-indigo-300 text-slate-700 px-8 py-4 rounded-xl font-semibold text-base transition-all hover:scale-105 flex items-center justify-center gap-2">
				Watch demo
			</a>
		</div>
	</div>

	<!-- Fake dashboard preview -->
	<div class="max-w-5xl mx-auto mt-16 px-4">
		<div class="rounded-2xl overflow-hidden shadow-2xl border border-slate-200">
			<div class="bg-slate-800 px-4 py-3 flex items-center gap-2">
				<span class="w-3 h-3 rounded-full bg-red-400"></span>
				<span class="w-3 h-3 rounded-full bg-yellow-400"></span>
				<span class="w-3 h-3 rounded-full bg-green-400"></span>
				<span class="ml-4 text-slate-400 text-xs">app.nexflow.io/workspace</span>
			</div>
			<div class="bg-slate-900 p-6 grid grid-cols-3 gap-4 min-h-48">
				{#each ['In Progress', 'Review', 'Done'] as col}
					<div class="bg-slate-800 rounded-lg p-3">
						<p class="text-slate-400 text-xs font-medium mb-3">{col}</p>
						{#each [1,2,3] as _}
							<div class="bg-slate-700 rounded p-2 mb-2">
								<div class="h-2 bg-slate-600 rounded mb-1 w-3/4"></div>
								<div class="h-2 bg-slate-600 rounded w-1/2"></div>
							</div>
						{/each}
					</div>
				{/each}
			</div>
		</div>
	</div>
</section>

<!-- LOGOS STRIP -->
<section class="bg-slate-50 border-y border-slate-100 py-10 overflow-hidden">
	<p class="text-center text-xs text-slate-400 uppercase tracking-widest mb-6">Trusted by 500+ engineering teams</p>
	<div class="flex">
		<div class="marquee-track flex gap-16 items-center whitespace-nowrap">
			{#each ['Luminary', 'Orbit Labs', 'Pulse Co', 'Stackr', 'Vectro', 'Deepline', 'Luminary', 'Orbit Labs', 'Pulse Co', 'Stackr', 'Vectro', 'Deepline'] as company}
				<span class="text-slate-400 font-semibold text-lg">{company}</span>
			{/each}
		</div>
	</div>
</section>

<!-- STATS -->
<section class="bg-white py-20 px-4">
	<div class="max-w-5xl mx-auto grid grid-cols-2 lg:grid-cols-4 gap-8 text-center fade-in">
		{#each stats as s, i}
			<div class="p-6">
				<p class="text-5xl font-extrabold text-indigo-600">{animatedStats[i]}{s.suffix}</p>
				<p class="text-xs text-slate-400 mt-2 uppercase tracking-widest">{s.label}</p>
			</div>
		{/each}
	</div>
</section>

<!-- FEATURES -->
<section id="features" class="bg-slate-50 py-24 px-4">
	<div class="max-w-7xl mx-auto">
		<div class="text-center mb-16 fade-in">
			<h2 class="text-4xl font-bold text-slate-900 mb-4">Everything your team needs</h2>
			<p class="text-slate-500 max-w-xl mx-auto">One platform to plan, build, review, and ship — with all the integrations you already use.</p>
		</div>
		<div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
			{#each features as f, i}
				<div class="fade-in bg-white rounded-2xl p-6 border border-slate-100 hover:shadow-lg hover:border-indigo-100 transition-all hover:-translate-y-1" style="transition-delay: {i * 60}ms">
					<div class="w-10 h-10 bg-indigo-50 rounded-xl flex items-center justify-center mb-4">
						<f.icon class="w-5 h-5 text-indigo-600" />
					</div>
					<h3 class="font-semibold text-slate-900 mb-2">{f.title}</h3>
					<!-- intentional: text-slate-400 on white = low contrast -->
					<p class="text-sm text-slate-400 leading-relaxed">{f.desc}</p>
				</div>
			{/each}
		</div>
	</div>
</section>

<!-- HOW IT WORKS -->
<section id="how-it-works" class="bg-white py-24 px-4">
	<div class="max-w-5xl mx-auto">
		<div class="text-center mb-16 fade-in">
			<h2 class="text-4xl font-bold text-slate-900 mb-4">Up and running in minutes</h2>
			<p class="text-slate-500">Three steps and your team is shipping.</p>
		</div>
		<div class="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
			{#each steps as s, i}
				<div class="fade-in text-center" style="transition-delay: {i * 100}ms">
					<div class="w-16 h-16 bg-indigo-600 text-white rounded-2xl flex items-center justify-center text-2xl font-black mx-auto mb-6 shadow-lg shadow-indigo-200">{s.n}</div>
					<h3 class="font-bold text-slate-900 text-lg mb-3">{s.title}</h3>
					<p class="text-slate-500 text-sm leading-relaxed">{s.desc}</p>
				</div>
			{/each}
		</div>
	</div>
</section>

<!-- TESTIMONIALS -->
<section class="bg-slate-50 py-24 px-4">
	<div class="max-w-7xl mx-auto">
		<div class="text-center mb-16 fade-in">
			<h2 class="text-4xl font-bold text-slate-900 mb-4">Loved by engineering teams</h2>
		</div>
		<div class="grid grid-cols-1 md:grid-cols-3 gap-6">
			{#each testimonials as t, i}
				<div class="fade-in bg-white rounded-2xl p-6 border border-slate-100 hover:shadow-md transition-all" style="transition-delay: {i * 80}ms">
					<div class="flex items-center gap-3 mb-4">
						<div class="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 font-bold text-sm">{t.initials}</div>
						<div>
							<p class="font-semibold text-slate-900 text-sm">{t.name}</p>
							<!-- intentional: tiny secondary text -->
							<p class="text-xs text-slate-400">{t.role}</p>
						</div>
					</div>
					<div class="flex gap-0.5 mb-3">
						{#each [1,2,3,4,5] as _}
							<Star class="w-3 h-3 fill-amber-400 text-amber-400" />
						{/each}
					</div>
					<!-- intentional: italic small text = harder to read -->
					<p class="text-sm text-slate-500 italic leading-relaxed">"{t.quote}"</p>
				</div>
			{/each}
		</div>
	</div>
</section>

<!-- PRICING -->
<section id="pricing" class="bg-white py-24 px-4">
	<div class="max-w-6xl mx-auto">
		<div class="text-center mb-16 fade-in">
			<h2 class="text-4xl font-bold text-slate-900 mb-4">Simple, transparent pricing</h2>
			<p class="text-slate-500">Start free. Scale when you're ready.</p>
		</div>
		<div class="grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
			{#each plans as p, i}
				<div class="fade-in rounded-2xl border p-8 relative transition-all hover:shadow-xl hover:-translate-y-1 {p.popular ? 'border-indigo-500 shadow-lg shadow-indigo-100' : 'border-slate-200'}" style="transition-delay: {i * 80}ms">
					{#if p.popular}
						<span class="absolute -top-3 left-1/2 -translate-x-1/2 bg-indigo-600 text-white text-xs px-3 py-1 rounded-full font-semibold">Most popular</span>
					{/if}
					<h3 class="font-bold text-xl text-slate-900 mb-2">{p.name}</h3>
					<div class="mb-6">
						{#if p.price === 'Custom'}
							<span class="text-4xl font-extrabold text-slate-900">Custom</span>
						{:else}
							<span class="text-4xl font-extrabold text-slate-900">${p.price}</span>
							<span class="text-slate-400 text-sm">/user/mo</span>
						{/if}
					</div>
					<ul class="space-y-3 mb-8">
						{#each p.features as feat}
							<li class="flex items-center gap-2 text-sm text-slate-600">
								<CheckCircle class="w-4 h-4 text-indigo-500 shrink-0" />{feat}
							</li>
						{/each}
					</ul>
					<a href="." class="block text-center py-3 rounded-xl font-semibold text-sm transition-all {p.popular ? 'bg-indigo-600 hover:bg-indigo-700 text-white shadow-md hover:scale-105' : 'border border-slate-200 hover:border-indigo-300 text-slate-700 hover:scale-105'}">
						{p.price === 'Custom' ? 'Contact sales' : 'Get started'}
					</a>
				</div>
			{/each}
		</div>
		<!-- intentional: tiny fine print -->
		<p class="text-center text-xs text-slate-300 mt-8">All plans include a 14-day free trial. No credit card required. Prices shown in USD excl. VAT. Annual billing saves up to 20%. Subject to fair use policy.</p>
	</div>
</section>

<!-- FAQ -->
<section id="faq" class="bg-slate-50 py-24 px-4">
	<div class="max-w-3xl mx-auto">
		<div class="text-center mb-16 fade-in">
			<h2 class="text-4xl font-bold text-slate-900 mb-4">Frequently asked questions</h2>
		</div>
		<div class="space-y-3">
			{#each faqs as faq, i}
				<!-- intentional: no aria-expanded, no aria-controls -->
				<div class="fade-in bg-white rounded-xl border border-slate-100 overflow-hidden" style="transition-delay: {i * 60}ms">
					<button
						onclick={() => toggleFaq(i)}
						class="w-full flex items-center justify-between px-6 py-4 text-left font-medium text-slate-900 hover:text-indigo-600 transition-colors"
					>
						{faq.q}
						<ChevronDown class="w-4 h-4 text-slate-400 transition-transform {faqOpen === i ? 'rotate-180' : ''}" />
					</button>
					{#if faqOpen === i}
						<div class="px-6 pb-5 text-sm text-slate-500 leading-relaxed">
							{faq.a}
						</div>
					{/if}
				</div>
			{/each}
		</div>
	</div>
</section>

<!-- CTA BANNER -->
<section class="hero-gradient py-24 px-4">
	<div class="max-w-2xl mx-auto text-center">
		<h2 class="text-4xl font-extrabold text-white mb-4">Ready to ship faster?</h2>
		<!-- intentional: text on gradient = low contrast -->
		<p class="text-indigo-200 mb-10 text-lg">Join 500+ teams already using Nexflow. Set up in under 2 minutes.</p>
		<div class="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
			<!-- intentional: no <label>, only placeholder -->
			<input
				type="email"
				placeholder="Enter your work email"
				class="flex-1 px-4 py-3 rounded-xl text-slate-900 bg-white/90 text-sm outline-none focus:ring-2 focus:ring-white"
			/>
			<button class="bg-white text-indigo-600 font-semibold px-6 py-3 rounded-xl hover:bg-indigo-50 transition-colors whitespace-nowrap">
				Get started
			</button>
		</div>
		<p class="text-xs text-indigo-300 mt-4">No credit card required · Cancel anytime</p>
	</div>
</section>

<!-- ACCESSIBILITY WIDGET -->
<AccessibilityWidget theme="indigo" position="bottom-left" darkMode={false} />

<!-- FOOTER -->
<footer class="bg-slate-900 text-slate-400 py-16 px-4">
	<div class="max-w-7xl mx-auto">
		<div class="grid grid-cols-2 md:grid-cols-5 gap-8 mb-12">
			<div class="col-span-2 md:col-span-1">
				<a href="/" class="flex items-center gap-2 text-white font-bold text-lg mb-3">
					<Zap class="w-5 h-5 text-indigo-400" /> Nexflow
				</a>
				<p class="text-xs text-slate-500 leading-relaxed">Built for teams that ship. Powered by Nexflow Inc.</p>
			</div>
			{#each [
				{ title: 'Product', links: ['Features', 'Pricing', 'Changelog', 'Roadmap'] },
				{ title: 'Company', links: ['About', 'Blog', 'Careers', 'Press'] },
				{ title: 'Resources', links: ['Docs', 'API', 'Status', 'Community'] },
				{ title: 'Legal', links: ['Privacy', 'Terms', 'Security', 'Cookies'] }
			] as col}
				<div>
					<h4 class="text-slate-200 text-sm font-semibold mb-4">{col.title}</h4>
					<ul class="space-y-2">
						{#each col.links as link}
							<!-- intentional: low-contrast links -->
							<li><a href="." class="text-xs text-slate-500 hover:text-slate-300 transition-colors">{link}</a></li>
						{/each}
					</ul>
				</div>
			{/each}
		</div>

		<div class="border-t border-slate-800 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
			<!-- intentional: tiny copyright text -->
			<p class="text-xs text-slate-600">© 2025 Nexflow Inc. All rights reserved.</p>
			<div class="flex items-center gap-4">
				<a href="." class="text-slate-500 hover:text-slate-300 transition-colors"><Share2 class="w-4 h-4" /></a>
				<a href="." class="text-slate-500 hover:text-slate-300 transition-colors"><Code class="w-4 h-4" /></a>
				<a href="." class="text-slate-500 hover:text-slate-300 transition-colors"><Globe class="w-4 h-4" /></a>
			</div>
		</div>
	</div>
</footer>
