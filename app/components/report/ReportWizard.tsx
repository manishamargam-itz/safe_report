"use client";

import { useState } from "react";
import { ReportForm } from "./ReportForm";
import { ReportSubmitted } from "./ReportFormCompleted";

export function ReportWizard() {
  const [currentStep, setCurrentStep] = useState(1);
  const [reportData, setReportData] = useState<any>(null);

  const handleStepComplete = async (data: any) => {
    setReportData({ ...reportData, ...data });

    if (currentStep === 4) {
      return;
    }

    setCurrentStep((prev) => prev + 1);
  };

  return (
    <div className="rounded-2xl p-8 border border-gray-100 shadow-lg bg-gradient-to-br from-white via-blue-50 to-emerald-50">
      {currentStep === 1 && <ReportForm onComplete={handleStepComplete} />}
      {currentStep === 2 && (
        <ReportSubmitted data={reportData} onComplete={handleStepComplete} />
      )}
    </div>
  );
}