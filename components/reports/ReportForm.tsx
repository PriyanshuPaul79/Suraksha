"use client";
import { useCallback, useState } from "react";
import LocationInput from "@/components/reports/LocationInput";
import crypto from "crypto";

const report_type = [
  "Theft",
  "Missing Person",
  "Medical Emergency",
  "Road Accident",
  "Violence",
  "Others",
] as const;

type LocalReportType = "EMERGENCY" | "NON_EMERGENCY";

interface ReportFormProps {
  onSubmit: (data: any) => void;
}

export function ReportForm({ onSubmit }: ReportFormProps) {
  const [image, setImage] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [formData, setFormData] = useState({
    incidentType: "" as "EMERGENCY" | "NON_EMERGENCY" | "",
    specificType: "",
    location: "", // Add location to formData
    description: "",
    title: "",
  });

  const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    setIsAnalyzing(true);

    try {
      const base64 = await new Promise<string>((resolve) => {
        const reader = new FileReader();
        reader.onloadend = () => {
          const result = reader.result as string;
          setImage(result);
          resolve(result);
        };
        reader.readAsDataURL(file);
      });

      const response = await fetch("/api/analyze-image", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ image: base64 }),
      });

      const data = await response.json();

      if (data.title && data.description && data.reportType) {
        setFormData((prev) => ({
          ...prev,
          title: data.title,
          description: data.description,
          specificType: data.reportType,
        }));
      }
    } catch (error) {
      console.error("Error analysing the image:", error);
    } finally {
      setIsAnalyzing(false);
    }
  };

  const reportId = useCallback(() => {
    const timeStamp = Date.now().toString();
    const random = crypto.randomBytes(16).toString("hex");
    const resultString = `${timeStamp}=${random}`;
    return crypto.createHash("sha256").update(resultString).digest("hex").slice(0, 16);
  }, []);

  const handleLocationChange = (location: string) => {
    setFormData((prev) => ({
      ...prev,
      location, // Update location in formData
    }));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!formData.incidentType || (formData.incidentType !== "EMERGENCY" && formData.incidentType !== "NON_EMERGENCY")) {
      alert("Please select a valid report type (Emergency or Non-Emergency).");
      return;
    }

    setIsSubmitting(true);

    try {
      const reportData = {
        reportId: reportId(),
        type: formData.incidentType,
        specificType: formData.specificType,
        title: formData.title,
        description: formData.description,
        location: formData.location, // Include location in the report data
        image: image,
        status: "PENDING",
      };

      console.log("Submitting report data:", reportData);
      const response = await fetch("/api/reports/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(reportData),
      });

      const result = await response.json();
      console.log("API response:", result);
      if (!response.ok) {
        throw new Error(result.error || "Failed to submit report");
      }
      onSubmit(result);
    } catch (error) {
      console.error("Error submitting report:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form className="space-y-8" onSubmit={handleSubmit}>
      {/* Emergency/Non-Emergency Buttons */}
      <div className="grid grid-cols-2 gap-4">
        <button
          type="button"
          onClick={() =>
            setFormData((prev) => ({ ...prev, incidentType: "EMERGENCY" }))
          }
          className={`p-6 rounded-2xl border-2 transition-all duration-200 ${
            formData.incidentType === "EMERGENCY"
              ? "bg-red-500/20 border-red-500 shadow-lg shadow-red-500/20"
              : "bg-zinc-900/50 border-zinc-800 hover:bg-red-500/10 hover:border-red-500/50"
          }`}
        >
          <div className="flex flex-col items-center space-y-2">
            <svg className="w-8 h-8 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
            <span className="font-medium text-red-500">Emergency</span>
            <span className="text-xs text-zinc-400">Immediate Response Required</span>
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
            <svg className="w-8 h-8 text-orange-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span className="font-medium text-orange-500">Non-Emergency</span>
            <span className="text-xs text-zinc-400">General Report</span>
          </div>
        </button>
      </div>

      {/* Image Upload */}
      <div className="relative group">
        <input type="file" accept="image/*" onChange={handleImageUpload} className="hidden" id="imageUpload" />
        <label htmlFor="imageUpload" className="block w-full p-8 border-2 border-dashed border-zinc-700 rounded-2xl hover:border-sky-500/50 hover:bg-sky-500/5 transition-all duration-200 cursor-pointer text-center">
          {image ? (
            <div className="space-y-4">
              <div className="w-full h-48 relative rounded-lg overflow-hidden">
                <img src={image} alt="Preview" className="w-full h-full object-cover" />
              </div>
              <p className="text-sm text-zinc-400">Click to change image</p>
            </div>
          ) : (
            <div className="space-y-4">
              <p className="text-sm text-zinc-400">Drop an image here or click to upload</p>
            </div>
          )}
        </label>
      </div>

      {/* Location Input */}
      <LocationInput
        value={formData.location}
        onChange={handleLocationChange} // Pass the handleLocationChange function
      />

      {/* Report Type (Specific Type) */}
      <div>
        <label className="block text-sm font-medium text-zinc-400 mb-2">Incident Type</label>
        <select
          value={formData.specificType}
          onChange={(e) => setFormData((prev) => ({ ...prev, specificType: e.target.value }))}
          className="w-full rounded-xl bg-zinc-900/50 border border-zinc-800 px-4 py-3.5 text-white"
          required
        >
          <option value="">Select type</option>
          {report_type.map((type) => (
            <option key={type} value={type}>
              {type}
            </option>
          ))}
        </select>
      </div>

      {/* Title */}
      <div>
        <label className="block text-sm font-medium text-zinc-400 mb-2">Report Title</label>
        <input
          type="text"
          value={formData.title}
          onChange={(e) => setFormData((prev) => ({ ...prev, title: e.target.value }))}
          className="w-full rounded-xl bg-zinc-900/50 border border-zinc-800 px-4 py-3.5 text-white"
          required
        />
      </div>

      {/* Description */}
      <div>
        <label className="block text-sm font-medium text-zinc-400 mb-2">Description</label>
        <textarea
          value={formData.description}
          onChange={(e) => setFormData((prev) => ({ ...prev, description: e.target.value }))}
          rows={4}
          className="w-full rounded-xl bg-zinc-900/50 border border-zinc-800 px-4 py-3.5 text-white"
          required
        />
      </div>

      {/* Submit Button */}
      <button type="submit" disabled={isSubmitting} className="w-full bg-gradient-to-r from-lime-600 to-green-500 text-white px-4 py-3.5 rounded-xl">
        {isSubmitting ? "Submitting..." : "Submit Report"}
      </button>
    </form>
  );
}


