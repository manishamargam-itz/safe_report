"use client";

import React, { useState } from 'react';

interface ReportWizardProps {
  // Add props if needed
}

export const ReportWizard: React.FC<ReportWizardProps> = () => {
  const [step, setStep] = useState(1);

  return (
    <div className="max-w-2xl mx-auto p-6">
      <div className="bg-white shadow-lg rounded-lg p-6">
        <h1 className="text-2xl font-bold mb-6">Submit Crime Report</h1>
        
        {/* Progress indicator */}
        <div className="mb-8">
          <div className="flex justify-between">
            <div className={`step ${step >= 1 ? 'active' : ''}`}>1. Incident Details</div>
            <div className={`step ${step >= 2 ? 'active' : ''}`}>2. Location</div>
            <div className={`step ${step >= 3 ? 'active' : ''}`}>3. Review & Submit</div>
          </div>
        </div>

        {/* Form content will go here */}
        <div className="space-y-4">
          {step === 1 && (
            <div>
              <h2 className="text-xl font-semibold mb-4">Incident Details</h2>
              {/* Add form fields for incident details */}
            </div>
          )}

          {step === 2 && (
            <div>
              <h2 className="text-xl font-semibold mb-4">Location Information</h2>
              {/* Add form fields for location */}
            </div>
          )}

          {step === 3 && (
            <div>
              <h2 className="text-xl font-semibold mb-4">Review Your Report</h2>
              {/* Add review content */}
            </div>
          )}
        </div>

        {/* Navigation buttons */}
        <div className="mt-8 flex justify-between">
          {step > 1 && (
            <button
              onClick={() => setStep(step - 1)}
              className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
            >
              Previous
            </button>
          )}
          {step < 3 ? (
            <button
              onClick={() => setStep(step + 1)}
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              Next
            </button>
          ) : (
            <button
              onClick={() => {/* Handle submission */}}
              className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
            >
              Submit Report
            </button>
          )}
        </div>
      </div>
    </div>
  );
}; 