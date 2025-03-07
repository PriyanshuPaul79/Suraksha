'use client';
import { useState } from "react";
import { ReportForm } from "./ReportForm";
import { ReportSubmitted } from "./ReportFormSubmission";

export function Report() {
  const [currentNum, setCurrentNum] = useState(1);
  const [reportData, setReportData] = useState<any>(null);

  const complete = async (data: any) => {
    setReportData({ ...reportData, ...data });

    if (currentNum === 2) return;
    setCurrentNum((prev) => prev + 1);
  };

  return (
    <div className="rounded-2xl bg-zinc-900 p-8">
      {currentNum === 1 && <ReportForm onSubmit={complete} />}
      {currentNum === 2 && <ReportSubmitted data={reportData} onComplete={complete} />}
    </div>
  );
}