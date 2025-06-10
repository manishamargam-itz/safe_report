"use client";

import { useState } from "react";

function FlowChart({ steps, color }: { steps: string[]; color: string }) {
  const colorMap: any = {
    sky: 'border-sky-400 bg-sky-50 text-sky-800',
    emerald: 'border-emerald-400 bg-emerald-50 text-emerald-800',
    rose: 'border-rose-400 bg-rose-50 text-rose-800',
    yellow: 'border-yellow-400 bg-yellow-50 text-yellow-800',
    blue: 'border-blue-400 bg-blue-50 text-blue-800',
    gray: 'border-gray-400 bg-gray-50 text-gray-800',
    lime: 'border-lime-400 bg-lime-50 text-lime-800',
    fuchsia: 'border-fuchsia-400 bg-fuchsia-50 text-fuchsia-800',
  };
  return (
    <div className="flex flex-col items-center w-full">
      {steps.map((step, idx) => (
        <div key={idx} className="flex flex-col items-center w-full">
          <div className={`rounded-full border-2 px-5 py-2 mb-2 font-semibold shadow-sm text-center w-full max-w-xs ${colorMap[color]}`}>{step}</div>
          {idx < steps.length - 1 && (
            <svg className={`w-6 h-6 mb-2 ${colorMap[color].split(' ')[2]}`} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m0 0l-4-4m4 4l4-4"/></svg>
          )}
        </div>
      ))}
    </div>
  );
}

function Checklist({ title, items, color }: { title: string; items: string[]; color: string }) {
  const [checked, setChecked] = useState(Array(items.length).fill(false));
  const colorMap: any = {
    sky: 'accent-sky-500 text-sky-800',
    emerald: 'accent-emerald-500 text-emerald-800',
    rose: 'accent-rose-500 text-rose-800',
    yellow: 'accent-yellow-500 text-yellow-800',
    blue: 'accent-blue-500 text-blue-800',
    gray: 'accent-gray-500 text-gray-800',
    lime: 'accent-lime-500 text-lime-800',
    fuchsia: 'accent-fuchsia-500 text-fuchsia-800',
  };
  return (
    <div className={`rounded-2xl border mt-8 p-6 bg-white/80 shadow ${colorMap[color]}`}> 
      <h3 className="text-lg font-bold mb-4">{title}</h3>
      <ul className="space-y-2">
        {items.map((item, idx) => (
          <li key={idx} className="flex items-center gap-3 min-h-[32px]">
            <input
              type="checkbox"
              className={`accent-current w-5 h-5 min-w-[1.25rem] min-h-[1.25rem] rounded focus:ring-2 focus:ring-offset-2 ${colorMap[color]}`}
              checked={checked[idx]}
              onChange={() => setChecked(c => c.map((v, i) => i === idx ? !v : v))}
              style={{ verticalAlign: 'middle' }}
            />
            <span className={checked[idx] ? "line-through opacity-60" : ""}>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function EmergencyProceduresPage() {
  return (
    <div className="w-full py-12 px-4 sm:px-6 lg:px-8 bg-white min-h-screen">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold tracking-tight bg-gradient-to-r from-sky-700 via-sky-400 to-emerald-400 bg-clip-text text-transparent sm:text-5xl drop-shadow">
          Emergency Procedures
        </h1>
        <p className="mt-4 text-xl text-sky-700/80">
          Your quick-access hub for safety checklists and emergency response flowcharts.
        </p>
      </div>
      {/* Professional Interactive Checklists (top) */}
      <section aria-label="Safety Checklists" className="max-w-7xl mx-auto mb-20">
        <h2 className="text-2xl font-bold text-sky-800 mb-8 text-center tracking-tight">Quick Safety Checklists</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <Checklist
            title="Home Safety Checklist"
            color="emerald"
            items={[
              "Smoke detectors installed & working",
              "Fire extinguisher accessible",
              "First aid kit stocked",
              "Emergency contacts visible",
              "Doors & windows locked",
              "Flashlights with batteries",
              "Gas/electric shutoff known",
            ]}
          />
          <Checklist
            title="Travel Safety Checklist"
            color="sky"
            items={[
              "Share itinerary with someone",
              "Pack emergency contacts",
              "Carry ID & insurance info",
              "Check local emergency numbers",
              "Secure valuables",
              "Know hotel/fire exits",
              "Keep phone charged",
            ]}
          />
          <Checklist
            title="Event Safety Checklist"
            color="rose"
            items={[
              "Locate emergency exits",
              "Designate meeting point",
              "Keep phone on & charged",
              "Stay hydrated",
              "Know event security contact",
              "Have ID & tickets ready",
              "Report suspicious activity",
            ]}
          />
          <Checklist
            title="Cleanliness Around Surroundings"
            color="yellow"
            items={[
              "Dispose of trash in designated bins",
              "Clean up after pets",
              "Report overflowing bins to authorities",
              "Avoid littering public spaces",
              "Participate in community clean-up drives",
              "Keep entrances and sidewalks clear",
              "Educate others about cleanliness",
            ]}
          />
        </div>
      </section>
      {/* Professional Emergency Flowcharts (bottom) */}
      <section aria-label="Emergency Flowcharts" className="max-w-7xl mx-auto">
        <h2 className="text-2xl font-bold text-sky-800 mb-8 text-center tracking-tight">Community Emergency Response Flowcharts</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10">
          {/* Fire Emergency Flowchart */}
          <div className="relative bg-gradient-to-br from-sky-200 via-sky-50 to-blue-100 border-2 border-sky-300 rounded-3xl p-8 flex flex-col items-center shadow-xl hover:scale-[1.04] hover:shadow-sky-200 transition-transform duration-200 min-h-[390px] group overflow-hidden">
            <div className="absolute -top-8 -right-8 opacity-20 text-sky-200 text-[120px] pointer-events-none select-none">🔥</div>
            <div className="flex flex-col items-center mb-4 z-10 w-full">
              <img src="/file.svg" alt="Fire Emergency" className="w-16 h-16 mb-2 drop-shadow-lg" />
              <h2 className="text-2xl font-extrabold text-sky-800 tracking-tight">Fire Emergency</h2>
            </div>
            <div className="flex flex-col items-center w-full">
              <FlowChart
                steps={["Activate the nearest fire alarm.", "Evacuate the building immediately.", "Call emergency services (Fire: 101).", "Do not use elevators.", "Assist others if safe to do so."]}
                color="sky"
              />
            </div>
          </div>
          {/* Medical Emergency Flowchart */}
          <div className="relative bg-gradient-to-br from-emerald-200 via-emerald-50 to-emerald-100 border-2 border-emerald-300 rounded-3xl p-8 flex flex-col items-center shadow-xl hover:scale-[1.04] hover:shadow-emerald-200 transition-transform duration-200 min-h-[390px] group overflow-hidden">
            <div className="absolute -top-8 -right-8 opacity-20 text-emerald-200 text-[120px] pointer-events-none select-none">🩺</div>
            <div className="flex flex-col items-center mb-4 z-10 w-full">
              <img src="/globe.svg" alt="Medical Emergency" className="w-16 h-16 mb-2 drop-shadow-lg" />
              <h2 className="text-2xl font-extrabold text-emerald-800 tracking-tight">Medical Emergency</h2>
            </div>
            <div className="flex flex-col items-center w-full">
              <FlowChart
                steps={["Call for medical help (Ambulance: 102).", "Provide first aid if trained.", "Stay with the person until help arrives.", "Give clear information to responders."]}
                color="emerald"
              />
            </div>
          </div>
          {/* Violence/Crime Emergency Flowchart */}
          <div className="relative bg-gradient-to-br from-rose-200 via-rose-50 to-rose-100 border-2 border-rose-300 rounded-3xl p-8 flex flex-col items-center shadow-xl hover:scale-[1.04] hover:shadow-rose-200 transition-transform duration-200 min-h-[390px] group overflow-hidden">
            <div className="absolute -top-8 -right-8 opacity-20 text-rose-200 text-[120px] pointer-events-none select-none">🚨</div>
            <div className="flex flex-col items-center mb-4 z-10 w-full">
              <img src="/window.svg" alt="Violence or Crime" className="w-16 h-16 mb-2 drop-shadow-lg" />
              <h2 className="text-2xl font-extrabold text-rose-800 tracking-tight">Violence or Crime</h2>
            </div>
            <div className="flex flex-col items-center w-full">
              <FlowChart
                steps={["Move to a safe location.", "Call the police (100) immediately.", "Do not confront the perpetrator.", "Note important details (appearance, location).", "Wait for authorities and provide information."]}
                color="rose"
              />
            </div>
          </div>
          {/* Earthquake Emergency Flowchart */}
          <div className="relative bg-gradient-to-br from-yellow-200 via-yellow-50 to-yellow-100 border-2 border-yellow-300 rounded-3xl p-8 flex flex-col items-center shadow-xl hover:scale-[1.04] hover:shadow-yellow-200 transition-transform duration-200 min-h-[390px] group overflow-hidden">
            <div className="absolute -top-8 -right-8 opacity-20 text-yellow-200 text-[120px] pointer-events-none select-none">🌎</div>
            <div className="flex flex-col items-center mb-4 z-10 w-full">
              <span className="w-16 h-16 mb-2 flex items-center justify-center text-yellow-500 text-4xl drop-shadow-lg">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 48 48" stroke="currentColor" className="w-12 h-12"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 40l8-8 8 8 8-8 8 8M8 24l8-8 8 8 8-8 8 8M8 8l8 8 8-8 8 8 8-8"/></svg>
              </span>
              <h2 className="text-2xl font-extrabold text-yellow-800 tracking-tight">Earthquake</h2>
            </div>
            <div className="flex flex-col items-center w-full">
              <FlowChart
                steps={["Drop, cover, and hold on under sturdy furniture.", "Stay away from windows and heavy objects.", "Do not run outside during shaking.", "After shaking stops, evacuate if safe.", "Check for injuries and hazards."]}
                color="yellow"
              />
            </div>
          </div>
          {/* Flood Emergency Flowchart */}
          <div className="relative bg-gradient-to-br from-blue-200 via-blue-50 to-blue-100 border-2 border-blue-300 rounded-3xl p-8 flex flex-col items-center shadow-xl hover:scale-[1.04] hover:shadow-blue-200 transition-transform duration-200 min-h-[390px] group overflow-hidden">
            <div className="absolute -top-8 -right-8 opacity-20 text-blue-200 text-[120px] pointer-events-none select-none">💧</div>
            <div className="flex flex-col items-center mb-4 z-10 w-full">
              <span className="w-16 h-16 mb-2 flex items-center justify-center text-blue-500 text-4xl drop-shadow-lg">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 48 48" stroke="currentColor" className="w-12 h-12"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 32c4 0 4-4 8-4s4 4 8 4 4-4 8-4 4 4 8 4"/><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 40c4 0 4-4 8-4s4 4 8 4 4-4 8-4 4 4 8 4"/></svg>
              </span>
              <h2 className="text-2xl font-extrabold text-blue-800 tracking-tight">Flood</h2>
            </div>
            <div className="flex flex-col items-center w-full">
              <FlowChart
                steps={["Move to higher ground immediately.", "Avoid walking or driving through floodwaters.", "Listen to emergency broadcasts for updates.", "Disconnect electrical appliances if safe.", "Evacuate if instructed by authorities."]}
                color="blue"
              />
            </div>
          </div>
          {/* Power Outage Emergency Flowchart */}
          <div className="relative bg-gradient-to-br from-gray-200 via-gray-50 to-gray-100 border-2 border-gray-300 rounded-3xl p-8 flex flex-col items-center shadow-xl hover:scale-[1.04] hover:shadow-gray-200 transition-transform duration-200 min-h-[390px] group overflow-hidden">
            <div className="absolute -top-8 -right-8 opacity-20 text-gray-200 text-[120px] pointer-events-none select-none">⚡</div>
            <div className="flex flex-col items-center mb-4 z-10 w-full">
              <span className="w-16 h-16 mb-2 flex items-center justify-center text-gray-500 text-4xl drop-shadow-lg">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 48 48" stroke="currentColor" className="w-12 h-12"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M24 4v20h12L16 44V24H4L24 4z"/></svg>
              </span>
              <h2 className="text-2xl font-extrabold text-gray-800 tracking-tight">Power Outage</h2>
            </div>
            <div className="flex flex-col items-center w-full">
              <FlowChart
                steps={["Use flashlights instead of candles.", "Unplug sensitive electronics.", "Keep refrigerator and freezer closed.", "Listen to local news for updates.", "Report outage to your utility provider."]}
                color="gray"
              />
            </div>
          </div>
          {/* Gas Leak Emergency Flowchart */}
          <div className="relative bg-gradient-to-br from-lime-200 via-lime-50 to-lime-100 border-2 border-lime-300 rounded-3xl p-8 flex flex-col items-center shadow-xl hover:scale-[1.04] hover:shadow-lime-200 transition-transform duration-200 min-h-[390px] group overflow-hidden">
            <div className="absolute -top-8 -right-8 opacity-20 text-lime-200 text-[120px] pointer-events-none select-none">⚠️</div>
            <div className="flex flex-col items-center mb-4 z-10 w-full">
              <span className="w-16 h-16 mb-2 flex items-center justify-center text-lime-500 text-4xl drop-shadow-lg">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 48 48" stroke="currentColor" className="w-12 h-12"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M24 6l20 36H4L24 6z"/><circle cx="24" cy="36" r="2" fill="currentColor"/><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M24 18v10"/></svg>
              </span>
              <h2 className="text-2xl font-extrabold text-lime-800 tracking-tight">Gas Leak</h2>
            </div>
            <div className="flex flex-col items-center w-full">
              <FlowChart
                steps={["Do not use electrical switches or phones.", "Evacuate the area immediately.", "Call emergency services from a safe location.", "Do not re-enter until cleared by authorities."]}
                color="lime"
              />
            </div>
          </div>
          {/* Suspicious Package/Bomb Threat Flowchart */}
          <div className="relative bg-gradient-to-br from-fuchsia-200 via-fuchsia-50 to-fuchsia-100 border-2 border-fuchsia-300 rounded-3xl p-8 flex flex-col items-center shadow-xl hover:scale-[1.04] hover:shadow-fuchsia-200 transition-transform duration-200 min-h-[390px] group overflow-hidden">
            <div className="absolute -top-8 -right-8 opacity-20 text-fuchsia-200 text-[120px] pointer-events-none select-none">📦</div>
            <div className="flex flex-col items-center mb-4 z-10 w-full">
              <span className="w-16 h-16 mb-2 flex items-center justify-center text-fuchsia-500 text-4xl drop-shadow-lg">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 48 48" stroke="currentColor" className="w-12 h-12"><rect x="8" y="16" width="32" height="20" rx="2" strokeWidth="2" stroke="currentColor" fill="none"/><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 16l16 12 16-12"/></svg>
              </span>
              <h2 className="text-2xl font-extrabold text-fuchsia-800 tracking-tight">Suspicious Package</h2>
            </div>
            <div className="flex flex-col items-center w-full">
              <FlowChart
                steps={["Do not touch, move, or open the package.", "Evacuate the immediate area.", "Call the police or security.", "Follow instructions from authorities."]}
                color="fuchsia"
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
