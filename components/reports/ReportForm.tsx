'use client'
import { useState, useCallback } from "react"

const report_type = [
    "Theft",
    "Missing Person",
    "Medical Emergency",
    "Road Accident",
    "Violence",
    "others"
] as const;

type reportType = 'Emergency' | 'Non Emergency';

interface ReportFormProps {
    onSubmit: (data: any) => void;
}

export function ReportForm({ onSubmit }: ReportFormProps) {

    const [formData, setFormData] = useState({
        incidentType: "" as reportType,
        specificType: "",
        location: "",
        description: "",
        title: "",
    });

    const [image, setImage] = useState<string | null>(null);
    const [analyse, setAnalyse] = useState(false);
    const [coordinates, setCoordinates] = useState<{
        latitude: number | null;
        longitude: number | null;
    }>({
        latitude: null,
        longitude: null,
    });
    const [submit, setSubmit] = useState(false)
    return (
        <form className="space-y-8" onSubmit={onSubmit}>
            {/* select emergency here */}
            <div className="grid grid-cols-2 gap-4">
                <button type="button" onClick={() =>
                    setFormData((prev) => ({ ...prev, incidentType: "Emergency" }))
                }
                    className={`p-6 rounded-2xl border-2 transition-all duration-200 ${formData.incidentType === "EMERGENCY"
                        ? "bg-red-500/20 border-red-500 shadow-lg shadow-red-500/20"
                        : "bg-zinc-900/50 border-zinc-800 hover:bg-red-500/10 hover:border-red-500/50"
                        }`}
                >
                    <div className="flex flex-col items-center space-y-2">
                        <svg
                            className="w-8 h-8 text-red-500"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                            />
                        </svg>
                    <span className="font-medium text-red-500">Emergency</span>
                    <span className="text-xs text-zinc-400">
                        Immediate Response Required
                    </span>
            </div>
        </button>

        <button
          type="button"
          onClick={() =>
            setFormData((prev) => ({ ...prev, incidentType: "NON_EMERGENCY" }))
          }
          className={`p-6 rounded-2xl border-2 transition-all duration-200 ${
            formData.incidentType === "NON_EMERGENCY"
              ? "bg-orange-500/20 border-orange-500 shadow-lg shadow-orange-500/20"
              : "bg-zinc-900/50 border-zinc-800 hover:bg-orange-500/10 hover:border-orange-500/50"
          }`}
        >
          <div className="flex flex-col items-center space-y-2">
            <svg
              className="w-8 h-8 text-orange-500"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <span className="font-medium text-orange-500">Non-Emergency</span>
            <span className="text-xs text-zinc-400">General Report</span>
          </div>
        </button>
        </div>



    )

}
