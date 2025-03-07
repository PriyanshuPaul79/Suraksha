'use client'
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { MessageCircleWarning } from 'lucide-react';
import { VenetianMask } from 'lucide-react';
import { Rss } from 'lucide-react';
import { useEffect, useState } from "react";



const StatsSection = () => {
  const [reportCount, setReportCount] = useState(500);
  const [anonymityRate, setAnonymityRate] = useState(70);

  useEffect(() => {
    const reportInterval = setInterval(() => {
      setReportCount((prev) => (prev < 1000 ? prev + 30 : 1000));
    }, 100);

    const anonymityInterval = setInterval(() => {
      setAnonymityRate((prev) => (prev < 100 ? prev + 2 : 100));
    }, 100);

    return () => {
      clearInterval(reportInterval);
      clearInterval(anonymityInterval);
    };
  }, []);

  return (
    <div className="mt-40 rounded-2xl bg-zinc-900 p-8">
      <div className="grid gap-y-8 sm:grid-cols-3">
        {[
          { val: `${reportCount}+`, title: "Report filed" },
          { val: `${anonymityRate}%`, title: "Anonymity Rate" },
          { val: "24/7", title: "Support available" },
        ].map((stats, index) => (
          <div key={index} className="text-center">
            <div className="text-3xl font-bold text-white">{stats.val}</div>
            <div className="mt-1 text-sm text-zinc-400">{stats.title}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default function Home() {
  return (
    <main className="relative px-6 pt-32 overflow-y-hidden">
      <div className="mx-auto max-w-5xl">
        {/* hero here */}

        <div className="flex flex-col items-center text-center">
          <div className="inline-flex h-9 items-center gap-2 rounded-full border border-sky-500/20 bg-sky-500/10 px-4 text-sm text-sky-400">
            <svg
              className="h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
              />
            </svg>
            Your Report Can Save Lives!
          </div>

          <h1 className="mt-8 bg-gradient-to-b from-white to-white/80 bg-clip-text text-5xl font-bold tracking-tight text-transparent sm:text-7xl">Help is Just a Click Away!
            <span className="block bg-gradient-to-r from-green-400 to-lime-300
 bg-clip-text text-transparent">Emergency? Report Now, Act Fast!
            </span>
          </h1>

          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-zinc-400">
            Our platform empowers individuals to report crimes and incidents quickly and efficiently, ensuring that the necessary authorities are notified in a timely manner.
          </p>

          <div className="mt-10 flex flex-col sm:flex-row gap-4">
            <Link href={'/submit-report'}>
              <button className="group relative flex h-12 items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-lime-600 to-green-500 px-8 text-sm font-medium text-white transition-all hover:bg-yellow-300">
                Submit Report <ArrowRight />
              </button>
            </Link>
            <Link href={'/how-it-work'}>
              <button className="flex h-12 items-center justify-center gap-2 rounded-xl bg-white/5 px-8 text-sm font-medium text-white ring-1 ring-inset ring-white/10 transition-all hover:bg-white/10">
                How we work
              </button>
            </Link>
          </div>
        </div>


        {/* feature section */}

        <div className="mt-40 grid gap-6 sm:grid-cols-3">
          {[
            {
              title: "Report Crimes & Emergencies Instantly!",
              description: "Our platform empowers individuals to report crimes and incidents quickly and efficiently, ensuring that the necessary authorities are notified in a timely manner.",
              icon: <MessageCircleWarning />

            },
            {
              title: "Fast, Secure, and Anonymous Crime Reporting at Your Fingertips!",
              description: "Our platform empowers individuals to report crimes and incidents quickly and efficiently, ensuring that the necessary authorities are notified in a timely manner.",
              icon: <VenetianMask />

            },
            {
              title: "Real-Time Crime & Emergency Alerts – Act Fast, Stay Safe!",
              description: "Our platform empowers individuals to report crimes and incidents quickly and efficiently, ensuring that the necessary authorities are notified in a timely manner.",
              icon: <Rss />
            }
          ].map((features, index) => (
            <div key={index} className="group relative overflow-hidden rounded-2xl bg-zinc-900 p-8 transition-all hover:bg-zinc-800/80 ">
              <div className="absolute inset-0 bg-gradient-to-b from-sky-500/10 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
              <div className="relative">
                <div className="mb-5 inline-flex rounded-xl bg-gradient-to-r from-lime-600 to-green-500 p-3">
                  {features.icon}
                </div>
                <h3 className="mb-3 text-lg font-medium text-white">
                  {features.title}
                </h3>
                <p className="text-sm leading-relaxed text-zinc-400">
                  {features.description}
                </p>
              </div>
            </div>
          ))}
        </div>


        {/* stats  */}
        <StatsSection />


        {/* perople trust us  */}
        <div className="mt-40 mb-20 flex justify-center">
          <div className="inline-flex items-center gap-3 rounded-full bg-zinc-900 px-5 py-2 text-sm text-zinc-400">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
            Help Build a Safer Community Today!          </div>
        </div>
      </div>
    </main>
  );
}