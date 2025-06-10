"use client";
import { useState } from "react";

// Example workshop data (replace with API or DB integration as needed)
const WORKSHOPS = [
	{
		id: 1,
		title: "Community Stress Management Workshop",
		date: "2025-06-15",
		time: "18:00",
		location: "Community Center Room 2 (In-person)",
		facilitator: "Dr. A. Rivera (Licensed Counselor)",
		topics: ["Stress Relief", "Coping Skills", "Group Activities"],
		description:
			"Learn practical stress management techniques and connect with neighbors in a supportive environment.",
	},
	{
		id: 2,
		title: "Trauma Support & Healing Circle",
		date: "2025-06-20",
		time: "19:30",
		location: "Online (Zoom)",
		facilitator: "Peer Support Team & Social Worker J. Kim",
		topics: ["Trauma Recovery", "Peer Support", "Community Healing"],
		description:
			"A safe space for sharing, support, and healing after community incidents.",
	},
	{
		id: 3,
		title: "Conflict Resolution & De-escalation Training",
		date: "2025-06-25",
		time: "17:00",
		location: "Library Conference Hall (In-person)",
		facilitator: "Officer L. Smith & Mediation Specialist M. Patel",
		topics: ["Conflict Resolution", "De-escalation", "Community Safety"],
		description:
			"Hands-on training for handling tense situations and promoting safety in our neighborhoods.",
	},
];

// Example consultation directory data
const CONSULTATIONS = [
	{
		id: 1,
		name: "Hope Community Wellness Center",
		type: "Organization",
		contact: "(555) 123-4567 | info@hopewellness.org",
		specialties: [
			"Group Consultations",
			"Crisis Debrief",
			"Trauma Support",
		],
		availability: "Mon-Fri 9am-6pm, Sat 10am-2pm",
	},
	{
		id: 2,
		name: "Dr. L. Mendoza, PhD",
		type: "Professional",
		contact: "(555) 987-6543 | lmendoza@counseling.com",
		specialties: [
			"Community Healing Circles",
			"Conflict Mediation",
			"Youth Support",
		],
		availability: "By appointment (in-person/virtual)",
	},
	{
		id: 3,
		name: "Safe Spaces Agency",
		type: "Agency",
		contact: "safespaces.org/contact",
		specialties: [
			"Crisis Debrief",
			"Peer Support Groups",
			"Emergency Response",
		],
		availability: "24/7 Hotline & Scheduled Sessions",
	},
];

export default function CommunityWorkshopsPage() {
	const [rsvps, setRsvps] = useState<{ [id: number]: boolean }>({});
	const [showConfirm, setShowConfirm] = useState<number | null>(null);
	const [showSuggestModal, setShowSuggestModal] = useState(false);
	const [suggestForm, setSuggestForm] = useState({
		name: "",
		email: "",
		topic: "",
		details: "",
	});
	const [suggestSuccess, setSuggestSuccess] = useState(false);
	const [suggestError, setSuggestError] = useState("");

	// Add state for directory search
	const [directorySearch, setDirectorySearch] = useState("");

	const handleRsvp = (id: number) => {
		setRsvps((prev) => ({ ...prev, [id]: true }));
		setShowConfirm(id);
		setTimeout(() => setShowConfirm(null), 2000);
	};

	const handleSuggestChange = (
		e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
	) => {
		setSuggestForm({ ...suggestForm, [e.target.name]: e.target.value });
	};

	const handleSuggestSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setSuggestError("");
		setSuggestSuccess(false);
		// Simulate API call
		try {
			// Replace with real API call, e.g. fetch('/api/suggest-workshop', ...)
			await new Promise((res) => setTimeout(res, 1000));
			setSuggestSuccess(true);
			setSuggestForm({ name: "", email: "", topic: "", details: "" });
		} catch {
			setSuggestError("Something went wrong. Please try again.");
		}
	};

	// Filtered consultations based on search
	const filteredConsultations = CONSULTATIONS.filter((c) => {
		const search = directorySearch.toLowerCase();
		return (
			c.name.toLowerCase().includes(search) ||
			c.type.toLowerCase().includes(search) ||
			c.contact.toLowerCase().includes(search) ||
			c.specialties.some((s) => s.toLowerCase().includes(search))
		);
	});

	return (
		<div className="w-full min-h-screen flex flex-col items-center justify-center bg-white py-12 px-4 relative">
			<div className="max-w-2xl w-full rounded-3xl shadow-2xl border border-emerald-50 p-0 flex flex-col items-center z-10 relative overflow-hidden">
				{/* Decorative top gradient bar */}
				<div className="w-full h-3 bg-gradient-to-r from-sky-200 via-emerald-100 to-blue-200" />
				<div className="w-full p-8 flex flex-col items-center bg-gradient-to-br from-sky-100 via-emerald-50 to-blue-100">
					<h1 className="text-3xl font-extrabold bg-gradient-to-r from-sky-600 via-emerald-400 to-blue-500 bg-clip-text text-transparent mb-3 flex items-center gap-2 tracking-tight">
						<span role="img" aria-label="workshop">
							🫂
						</span>{" "}
						Community Mental Health & Safety Workshops
					</h1>
					<p className="text-blue-800/90 mb-7 text-center max-w-xl text-base font-medium">
						Join upcoming workshops focused on community wellbeing, trauma support,
						conflict resolution, and more. RSVP to reserve your spot and help us
						build a safer, healthier neighborhood together.
					</p>
					<div className="w-full flex flex-col gap-7">
						{WORKSHOPS.map((w) => (
							<div
								key={w.id}
								className="border rounded-2xl p-6 bg-gradient-to-r from-sky-50 via-emerald-50 to-blue-50 shadow flex flex-col gap-2 transition hover:shadow-lg hover:bg-blue-50/60 relative"
							>
								{/* New: Tag for online/in-person */}
								<span className={`absolute top-3 right-4 px-3 py-1 rounded-full text-xs font-bold tracking-tight shadow-sm ${w.location.toLowerCase().includes('online') ? 'bg-sky-200 text-sky-700' : 'bg-emerald-100 text-emerald-700'}`}>{w.location.toLowerCase().includes('online') ? 'Online' : 'In-person'}</span>
								<div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
									<div>
										<h2 className="text-lg font-bold text-sky-600 mb-1 tracking-tight">{w.title}</h2>
										<div className="text-sm text-emerald-600 font-semibold mb-1">Facilitator: {w.facilitator}</div>
										<div className="text-xs text-blue-700/70 mb-1">{w.date} at {w.time} &middot; {w.location}</div>
									</div>
									<button
										className={`px-5 py-2 rounded-lg font-semibold shadow transition text-white ${rsvps[w.id] ? 'bg-emerald-200 cursor-not-allowed' : 'bg-sky-400 hover:bg-blue-400'}`}
										onClick={() => handleRsvp(w.id)}
										disabled={!!rsvps[w.id]}
										aria-label={rsvps[w.id] ? 'RSVPed' : 'RSVP for Workshop'}
									>
										{rsvps[w.id] ? 'RSVPed' : 'RSVP'}
									</button>
								</div>
								<div className="text-sm text-blue-800 mb-1 font-normal">{w.description}</div>
								<div className="flex flex-wrap gap-2 mt-1">
									{w.topics.map((t) => (
										<span
											key={t}
											className="bg-sky-50 text-sky-600 px-2 py-1 rounded text-xs font-semibold tracking-tight border border-sky-100"
										>
											{t}
										</span>
									))}
								</div>
								{showConfirm === w.id && (
									<div className="mt-2 text-emerald-600 text-sm font-semibold">Thank you for your RSVP! We'll save your spot.</div>
								)}
							</div>
						))}
					</div>
					<div className="mt-10 text-xs text-blue-800/90 text-center max-w-md">
						<p>
							Want to request a specific workshop or host one for your group?{" "}
							<button
								className="text-sky-600 underline hover:text-blue-800 focus:outline-none font-semibold"
								onClick={() => setShowSuggestModal(true)}
								aria-label="Suggest a Workshop"
							>
								Suggest a Workshop
							</button>{" "}
							or partner with us.
						</p>
					</div>
					{/* Suggest Workshop Modal */}
					{showSuggestModal && (
						<div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30">
							<div className="bg-white rounded-2xl shadow-2xl p-7 w-full max-w-md relative border border-emerald-50">
								<button
									className="absolute top-2 right-2 text-sky-600 text-2xl font-bold hover:text-blue-800"
									onClick={() => {
										setShowSuggestModal(false);
										setSuggestSuccess(false);
										setSuggestError("");
									}}
									aria-label="Close Suggest Workshop Modal"
								>
									×
								</button>
								<h2 className="text-lg font-bold text-sky-600 mb-3 tracking-tight">Suggest a Workshop</h2>
								{suggestSuccess ? (
									<div className="text-emerald-600 font-semibold mb-2">Thank you for your suggestion! We'll review it soon.</div>
								) : (
									<form onSubmit={handleSuggestSubmit} className="flex flex-col gap-3">
										<input
											type="text"
											name="name"
											placeholder="Your Name (optional)"
											className="border border-emerald-100 rounded-lg px-3 py-2 text-black focus:ring-2 focus:ring-sky-200 focus:outline-none"
											value={suggestForm.name}
											onChange={handleSuggestChange}
										/>
										<input
											type="email"
											name="email"
											placeholder="Your Email (optional)"
											className="border border-emerald-100 rounded-lg px-3 py-2 text-black focus:ring-2 focus:ring-sky-200 focus:outline-none"
											value={suggestForm.email}
											onChange={handleSuggestChange}
										/>
										<input
											type="text"
											name="topic"
											placeholder="Workshop Topic (required)"
											className="border border-emerald-100 rounded-lg px-3 py-2 text-black focus:ring-2 focus:ring-sky-200 focus:outline-none"
											value={suggestForm.topic}
											onChange={handleSuggestChange}
											required
										/>
										<textarea
											name="details"
											placeholder="Describe your idea or need (required)"
											className="border border-emerald-100 rounded-lg px-3 py-2 min-h-[80px] text-black focus:ring-2 focus:ring-sky-200 focus:outline-none"
											value={suggestForm.details}
											onChange={handleSuggestChange}
											required
										/>
										{suggestError && <div className="text-pink-700 text-sm">{suggestError}</div>}
										<button
											type="submit"
											className="bg-sky-400 hover:bg-blue-400 text-white font-semibold rounded-lg px-4 py-2 mt-2 shadow"
										>
											Submit Suggestion
										</button>
									</form>
								)}
							</div>
						</div>
					)}
				</div>
				{/* Decorative bottom gradient bar */}
				<div className="w-full h-3 bg-gradient-to-r from-blue-200 via-emerald-100 to-sky-200" />
			</div>
			{/* Community Consultation Directory Section */}
			<div className="w-full flex flex-col gap-7 mt-12 max-w-2xl">
				<h2 className="text-2xl font-bold text-sky-600 mb-2 tracking-tight flex items-center gap-2">
					<span role="img" aria-label="directory">📒</span> Community Consultation Directory
				</h2>
				<p className="text-blue-800/80 mb-4 text-sm max-w-xl">
					Find local organizations, professionals, and agencies offering group consultations, crisis debriefs, and healing circles for community wellbeing.
				</p>
				{/* Add a filter/search for directory (demo only) */}
				<div className="flex flex-col md:flex-row gap-3 mb-2">
					<input
						type="text"
						placeholder="Search directory by name, specialty, or type..."
						className="w-full border border-emerald-100 rounded-lg px-3 py-2 text-black focus:ring-2 focus:ring-sky-200 focus:outline-none bg-white"
						value={directorySearch}
						onChange={e => setDirectorySearch(e.target.value)}
					/>
					<button
						className="bg-sky-100 text-sky-700 font-semibold rounded-lg px-4 py-2 shadow border border-sky-100"
						type="button"
						tabIndex={-1}
						disabled
					>
						Filter
					</button>
				</div>
				<div className="flex flex-col gap-5">
					{filteredConsultations.length === 0 ? (
						<div className="text-center text-blue-800/80 text-sm py-6">No results found.</div>
					) : (
						filteredConsultations.map((c) => (
							<div
								key={c.id}
								className="border border-emerald-50 rounded-xl bg-gradient-to-r from-sky-50 via-emerald-50 to-blue-50 p-5 shadow flex flex-col md:flex-row md:items-center md:justify-between gap-2 relative"
							>
								{/* New: Tag for type */}
								<span className={`absolute top-3 right-4 px-3 py-1 rounded-full text-xs font-bold tracking-tight shadow-sm ${c.type === 'Organization' ? 'bg-emerald-100 text-emerald-700' : c.type === 'Professional' ? 'bg-sky-100 text-sky-700' : 'bg-blue-100 text-blue-700'}`}>{c.type}</span>
								<div>
									<div className="text-lg font-semibold text-sky-700 mb-1">{c.name}</div>
									<div className="text-xs text-blue-800/80 mb-1">Contact: {c.contact}</div>
									<div className="flex flex-wrap gap-2 mb-1">
										{c.specialties.map((s) => (
											<span
												key={s}
												className="bg-emerald-50 text-emerald-700 px-2 py-1 rounded text-xs font-medium tracking-tight border border-emerald-100"
											>
												{s}
											</span>
										))}
									</div>
								</div>
								<div className="text-xs text-sky-700 font-semibold whitespace-nowrap">{c.availability}</div>
							</div>
						))
					)}
				</div>
			</div>
		</div>
	);
}
