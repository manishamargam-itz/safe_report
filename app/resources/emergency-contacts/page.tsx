"use client";
import { Mail, Phone, Shield, Users } from "lucide-react";

// Example emergency contacts data
const emergencyContacts = [
	{
		name: "Police",
		designation: "Local Police Station",
		phone: "100",
		email: "police@city.gov",
		
	},
	{
		name: "Fire Department",
		designation: "Fire & Rescue",
		phone: "101",
		email: "fire@city.gov",
		
	},
	{
		name: "Ambulance",
		designation: "Medical Emergency",
		phone: "102",
		email: "ambulance@city.gov",
		
	},
	{
		name: "Women's Helpline",
		designation: "Women Safety",
		phone: "1091",
		email: "womenhelpline@city.gov",
		
	},
	{
		name: "Child Helpline",
		designation: "Child Protection",
		phone: "1098",
		email: "childhelpline@city.gov",
		
	},
];

const tips = [
	"Stay calm and provide clear information when calling for help.",
	"Save emergency numbers in your phone and share them with family.",
	"If you feel unsafe, move to a public place and call for help.",
	"Use the official helplines for verified assistance.",
	"Report suspicious activity to authorities immediately.",
];

export default function EmergencyContactsPage() {
	// Copy to clipboard handler
	const copyToClipboard = (text: string) => {
		navigator.clipboard.writeText(text);
		alert("Copied to clipboard: " + text);
	};

	return (
		<div className="min-h-screen bg-gradient-to-br from-sky-50 via-white to-emerald-50 py-12 px-4">
			<div className="max-w-3xl mx-auto w-full">
				<h1 className="text-4xl font-bold mb-6 text-center bg-gradient-to-r from-red-700 via-sky-700 to-emerald-400 bg-clip-text text-transparent drop-shadow">
					Emergency Contacts
				</h1>
				<p className="text-lg text-sky-700/80 text-center mb-10">
					Quick access to essential emergency services. Call, email, or visit for
					immediate help.
				</p>
				<div className="grid gap-8 mb-12">
					{emergencyContacts.map((contact, idx) => (
						<div
							key={idx}
							className="bg-white border border-sky-100 rounded-2xl shadow-lg p-6 flex flex-col md:flex-row md:items-center gap-6 hover:shadow-emerald-100 transition-shadow"
						>
							<div className="flex-shrink-0 flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-red-400 via-sky-400 to-emerald-400">
								{contact.name === "Police" && (
									<Shield className="w-8 h-8 text-white" />
								)}
								{contact.name === "Fire Department" && (
									<Users className="w-8 h-8 text-white" />
								)}
								{contact.name === "Ambulance" && (
									<Phone className="w-8 h-8 text-white" />
								)}
								{contact.name === "Women's Helpline" && (
									<Users className="w-8 h-8 text-white" />
								)}
								{contact.name === "Child Helpline" && (
									<Users className="w-8 h-8 text-white" />
								)}
							</div>
							<div className="flex-1">
								<h2 className="text-2xl font-semibold text-sky-800 mb-1 flex items-center gap-2">
									{contact.name}
								</h2>
								<div className="text-sky-700 mb-2">
									{contact.designation}
								</div>
								<div className="flex flex-col gap-1 text-sky-800 mb-2">
									<span>
										<b>Phone:</b>{" "}
										<a
											href={`tel:${contact.phone}`}
											className="text-red-600 hover:underline font-mono"
										>
											{contact.phone}
										</a>
									</span>
									<span>
										<b>Email:</b>{" "}
										<a
											href={`mailto:${contact.email}`}
											className="text-sky-600 hover:underline font-mono"
										>
											{contact.email}
										</a>
									</span>
								</div>
							</div>
						</div>
					))}
				</div>
				<section className="mt-12 bg-gradient-to-r from-sky-50 via-white to-emerald-50 rounded-2xl p-8 border border-sky-100">
					<h2 className="text-2xl font-bold bg-gradient-to-r from-sky-700 via-sky-400 to-emerald-400 bg-clip-text text-transparent mb-4 text-center">
						Emergency Tips
					</h2>
					<div className="grid gap-4 sm:grid-cols-2">
						{tips.map((tip, i) => (
							<div key={i} className="flex items-start gap-3">
								<div className="flex-shrink-0 mt-0.5">
									<div className="h-5 w-5 rounded-full bg-sky-100 flex items-center justify-center">
										<div className="h-2 w-2 rounded-full bg-sky-400" />
									</div>
								</div>
								<p className="text-left text-sky-700/90">{tip}</p>
							</div>
						))}
					</div>
				</section>
			</div>
		</div>
	);
}
