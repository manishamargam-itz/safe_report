"use client";
import { useState, useEffect } from 'react';
import { Phone, Shield, Scale, Users, HeartPulse } from 'lucide-react';
import { SafetyMap } from '@app/components/SafetyMap';

const categoryIcons = {
  EMERGENCY_CONTACT: <Phone className="h-5 w-5 text-white" />,
  SAFETY_GUIDE: <Shield className="h-5 w-5 text-white" />,
  LEGAL_AID: <Scale className="h-5 w-5 text-white" />,
  COMMUNITY: <Users className="h-5 w-5 text-white" />,
  MENTAL_HEALTH: <HeartPulse className="h-5 w-5 text-white" />
};

const categoryColors = {
  EMERGENCY_CONTACT: 'bg-red-500/10 text-red-500',
  SAFETY_GUIDE: 'bg-blue-500/10 text-blue-500',
  LEGAL_AID: 'bg-purple-500/10 text-purple-500',
  COMMUNITY: 'bg-green-500/10 text-green-500',
  MENTAL_HEALTH: 'bg-pink-500/10 text-pink-500'
};

// Fetch resources on the client side
async function fetchResources() {
  const res = await fetch('/api/resources');
  return res.json();
}

// Add Resource type for proper typing
type Resource = {
  id: string;
  title: string;
  description: string;
  category: string;
  isEmergency?: boolean;
  phone?: string;
  url?: string;
  downloadUrl?: string;
  address?: string;
};


export default function ResourcesPage() {
  const [resources, setResources] = useState<Resource[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedResource, setSelectedResource] = useState<any>(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    fetchResources().then((data) => {
      setResources(data);
      setLoading(false);
    });
  }, []);

  const categories = [
    'EMERGENCY_CONTACT',
    'SAFETY_GUIDE',
    'COMMUNITY',
    'MENTAL_HEALTH'
  ];

  // if (loading) return <div className="text-center py-12 text-sky-700">Loading resources...</div>;

  return (
    <div className="w-full py-12 px-4 sm:px-6 lg:px-8 bg-white min-h-screen">
      {/* Page Header */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold tracking-tight bg-gradient-to-r from-sky-700 via-sky-400 to-emerald-400 bg-clip-text text-transparent sm:text-5xl drop-shadow">
          Community Safety Resources
        </h1>
        <p className="mt-4 text-xl text-sky-700/80">
          Essential tools and contacts for your safety
        </p>
      </div>

      {/* Resource Categories */}
      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {categories.map((category) => (
          <button
            key={category}
            className="bg-white rounded-2xl p-6 border border-sky-100 hover:shadow-xl hover:scale-105 transition-transform duration-200 ease-in-out w-full text-left focus:outline-none focus:ring-2 focus:ring-sky-400"
            onClick={() => {
              if (category === 'COMMUNITY') {
                window.location.href = '/community-meetings';
                return;
              }
              if (category === 'EMERGENCY_CONTACT') {
                window.location.href = '/resources/emergency-contacts';
                return;
              }
              if (category === 'SAFETY_GUIDE') {
                window.location.href = '/resources/emergency-procedures';
                return;
              }
              if (category === 'MENTAL_HEALTH') {
                window.location.href = '/resources/guided-breathing';
                return;
              }
              // Scroll to the first resource in this category, or open a modal if you want
              const firstResource = resources.find((r) => r.category === category);
              if (firstResource) {
                setSelectedResource(firstResource);
                setShowModal(true);
              }
            }}
          >
            <div className="flex items-center gap-3 mb-6">
              <div
                className={`p-2 rounded-lg bg-gradient-to-br from-sky-400 to-emerald-400 text-white shadow`}
              >
                {categoryIcons[category as keyof typeof categoryIcons]}
              </div>
              <h2 className="text-xl font-semibold bg-gradient-to-r from-sky-700 via-sky-400 to-emerald-400 bg-clip-text text-transparent">
                {category.split('_').join(' ')}
              </h2>
            </div>

            <p className="text-sky-700/80 mb-4">
              {category === 'EMERGENCY_CONTACT' &&
                'Quick access to emergency contacts like police, fire, and medical services.'}
              {category === 'SAFETY_GUIDE' &&
                'Guidelines and tips to ensure your safety in various situations.'}
              {category === 'LEGAL_AID' &&
                'Resources for legal assistance and understanding your rights.'}
              {category === 'COMMUNITY' &&
                'Connect with local community centers and support groups.'}
              {category === 'MENTAL_HEALTH' &&
                'Access mental health resources and support services.'}
            </p>

            {/* Dynamic Resource List */}
            <div className="space-y-4">
              {resources
                .filter((resource) => resource.category === category)
                .map((resource) => (
                  <button
                    key={resource.id}
                    className="group relative p-4 rounded-xl border bg-white hover:bg-sky-50 transition-colors w-full text-left shadow"
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedResource(resource);
                      setShowModal(true);
                    }}
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-medium text-sky-800">
                          {resource.title}
                        </h3>
                        <p className="mt-1 text-sm text-sky-700/80">
                          {resource.description}
                        </p>
                      </div>
                      {resource.isEmergency && (
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-600">
                          Emergency
                        </span>
                      )}
                    </div>
                  </button>
                ))}
            </div>
          </button>
        ))}
      </div>

      {/* Modal for resource details */}
      {showModal && selectedResource && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30">
          <div className="bg-white rounded-2xl p-8 max-w-md w-full border border-sky-100 relative shadow-xl">
            <button
              className="absolute top-3 right-3 text-sky-400 hover:text-sky-700"
              onClick={() => setShowModal(false)}
              aria-label="Close"
            >
              &times;
            </button>
            <h2 className="text-2xl font-bold bg-gradient-to-r from-sky-700 via-sky-400 to-emerald-400 bg-clip-text text-transparent mb-2">{selectedResource.title}</h2>
            <p className="text-sky-700/90 mb-4">{selectedResource.description}</p>
            {selectedResource.phone && (
              <div className="mb-2">
                <span className="font-medium text-sky-700">Phone: </span>
                <a href={`tel:${selectedResource.phone}`} className="text-sky-500 hover:underline">{selectedResource.phone}</a>
              </div>
            )}
            {selectedResource.url && (
              <div className="mb-2">
                <span className="font-medium text-sky-700">Website: </span>
                <a href={selectedResource.url} target="_blank" rel="noopener noreferrer" className="text-sky-500 hover:underline">{selectedResource.url}</a>
              </div>
            )}
            {selectedResource.downloadUrl && (
              <div className="mb-2">
                <span className="font-medium text-sky-700">Download: </span>
                <a href={selectedResource.downloadUrl} target="_blank" rel="noopener noreferrer" className="text-emerald-500 hover:underline">Guide</a>
              </div>
            )}
            {selectedResource.address && (
              <div className="mb-2">
                <span className="font-medium text-sky-700">Address: </span>
                <span className="text-sky-800">{selectedResource.address}</span>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Safety Tips Section */}
      <section className="mt-16 bg-gradient-to-r from-sky-50 via-white to-emerald-50 rounded-2xl p-8 border border-sky-100">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-2xl font-bold bg-gradient-to-r from-sky-700 via-sky-400 to-emerald-400 bg-clip-text text-transparent mb-4">Safety Tips</h2>
          <div className="grid gap-6 sm:grid-cols-2">
            {[
              'Always be aware of your surroundings',
              'Walk in well-lit areas at night',
              'Keep valuables out of sight',
              'Trust your instincts - if something feels wrong, it probably is',
              'Program emergency numbers in your phone',
              'Share your location with trusted contacts'
            ].map((tip, index) => (
              <div key={index} className="flex items-start gap-3">
                <div className="flex-shrink-0 mt-0.5">
                  <div className="h-5 w-5 rounded-full bg-sky-100 flex items-center justify-center">
                    <div className="h-2 w-2 rounded-full bg-sky-400" />
                  </div>
                </div>
                <p className="text-left text-sky-700/90">{tip}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Safety Map Section */}
      <section className="mt-16">
        <h2 className="text-2xl font-bold bg-gradient-to-r from-sky-700 via-sky-400 to-emerald-400 bg-clip-text text-transparent mb-6">Safety Resources Map</h2>
        <SafetyMap />
        <p className="mt-4 text-sm text-sky-700/80">
          Locations of police stations, hospitals, and safe spaces in your area
        </p>
      </section>
    </div>
  );
}