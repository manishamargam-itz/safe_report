import { Phone, Shield, Scale, Users, HeartPulse } from 'lucide-react';
import prisma from '@/lib/prisma';
import { SafetyMap } from '@app/components/SafetyMap';

const categoryIcons = {
  EMERGENCY_CONTACT: <Phone className="h-5 w-5" />,
  SAFETY_GUIDE: <Shield className="h-5 w-5" />,
  LEGAL_AID: <Scale className="h-5 w-5" />,
  COMMUNITY: <Users className="h-5 w-5" />,
  MENTAL_HEALTH: <HeartPulse className="h-5 w-5" />
};

const categoryColors = {
  EMERGENCY_CONTACT: 'bg-red-500/10 text-red-500',
  SAFETY_GUIDE: 'bg-blue-500/10 text-blue-500',
  LEGAL_AID: 'bg-purple-500/10 text-purple-500',
  COMMUNITY: 'bg-green-500/10 text-green-500',
  MENTAL_HEALTH: 'bg-pink-500/10 text-pink-500'
};

export default async function ResourcesPage() {
  const resources = await prisma.resource.findMany({
    orderBy: { category: 'asc' }
  });

  const categories = [
    'EMERGENCY_CONTACT',
    'SAFETY_GUIDE',
    'LEGAL_AID',
    'COMMUNITY',
    'MENTAL_HEALTH'
  ];

  return (
    <div className="max-w-6xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
      {/* Page Header */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl">
          Community Safety Resources
        </h1>
        <p className="mt-4 text-xl text-gray-400">
          Essential tools and contacts for your safety
        </p>
      </div>

      {/* Resource Categories */}
      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {categories.map((category) => (
          <section
            key={category}
            className="bg-gray-900/50 rounded-2xl p-6 border border-gray-800 hover:shadow-lg hover:scale-105 transition-transform duration-200 ease-in-out"
          >
            <div className="flex items-center gap-3 mb-6">
              <div
                className={`p-2 rounded-lg ${categoryColors[category as keyof typeof categoryColors]}`}
              >
                {categoryIcons[category as keyof typeof categoryIcons]}
              </div>
              <h2 className="text-xl font-semibold text-white">
                {category.split('_').join(' ')}
              </h2>
            </div>

            <p className="text-gray-400 mb-4">
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
                  <div
                    key={resource.id}
                    className="group relative p-4 rounded-xl border bg-gray-900/20 hover:bg-gray-800/50 transition-colors"
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-medium text-white">
                          {resource.title}
                        </h3>
                        <p className="mt-1 text-sm text-gray-400">
                          {resource.description}
                        </p>
                      </div>
                      {resource.isEmergency && (
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-500/10 text-red-400">
                          Emergency
                        </span>
                      )}
                    </div>

                    {/* Direct Links */}
                    <div className="mt-4 flex gap-3">
                      {resource.phone && (
                        <a
                          href={`tel:${resource.phone}`}
                          className="inline-flex items-center px-3 py-1.5 rounded-md text-sm font-medium bg-gray-800 text-white hover:bg-gray-700"
                        >
                          <Phone className="h-4 w-4 mr-1.5" />
                          Call
                        </a>
                      )}
                      {resource.url && (
                        <a
                          href={resource.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center px-3 py-1.5 rounded-md text-sm font-medium bg-blue-500/10 text-blue-400 hover:bg-blue-500/20"
                        >
                          Visit
                        </a>
                      )}
                    </div>
                  </div>
                ))}
            </div>
          </section>
        ))}
      </div>

      {/* Safety Tips Section */}
      <section className="mt-16 bg-gradient-to-r from-blue-900/30 to-purple-900/30 rounded-2xl p-8 border border-blue-800/20">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-2xl font-bold text-white mb-4">Safety Tips</h2>
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
                  <div className="h-5 w-5 rounded-full bg-blue-500/10 flex items-center justify-center">
                    <div className="h-2 w-2 rounded-full bg-blue-400" />
                  </div>
                </div>
                <p className="text-left text-gray-300">{tip}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Safety Map Section */}
      <section className="mt-16">
        <h2 className="text-2xl font-bold text-white mb-6">Safety Resources Map</h2>
        <SafetyMap />
        <p className="mt-4 text-sm text-gray-400">
          Locations of police stations, hospitals, and safe spaces in your area
        </p>
      </section>
    </div>
  );
}