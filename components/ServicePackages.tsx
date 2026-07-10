"use client";

import { useState } from "react";
import { servicePackages, formatPrice } from "@/data/services";

export default function ServicePackages() {
  const [loadingId, setLoadingId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handlePay = async (packageId: string) => {
    setLoadingId(packageId);
    setError(null);

    try {
      const response = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ packageId }),
      });

      const data = await response.json();

      if (response.ok && data.url) {
        // Hand off to Stripe's hosted Checkout page.
        window.location.href = data.url;
      } else {
        setError(data.error ?? "Something went wrong. Please try again.");
        setLoadingId(null);
      }
    } catch {
      setError("Could not reach the payment service. Please try again.");
      setLoadingId(null);
    }
  };

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {servicePackages.map((pkg) => (
          <div
            key={pkg.id}
            className="bg-white border border-gray-200 p-8 flex flex-col"
          >
            <h3 className="text-2xl font-bold mb-2">{pkg.name}</h3>
            <p className="text-gray-600 mb-6">{pkg.description}</p>

            <div className="mb-6">
              <span className="text-4xl font-bold">
                {formatPrice(pkg.amount)}
              </span>
              {pkg.interval && (
                <span className="text-xl text-gray-500">
                  /{pkg.interval === "month" ? "mo" : "yr"}
                </span>
              )}
              {pkg.note && (
                <p className="text-sm text-gray-500 mt-1">{pkg.note}</p>
              )}
            </div>

            <ul className="space-y-3 mb-8 flex-grow">
              {pkg.features.map((feature) => (
                <li key={feature} className="flex items-start gap-3">
                  <svg
                    className="w-5 h-5 text-black flex-shrink-0 mt-0.5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  <span className="text-sm">{feature}</span>
                </li>
              ))}
            </ul>

            <button
              onClick={() => handlePay(pkg.id)}
              disabled={loadingId !== null}
              className="w-full bg-black text-white px-6 py-4 font-semibold hover:bg-gray-900 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loadingId === pkg.id
                ? "Redirecting…"
                : pkg.interval
                  ? "Subscribe"
                  : "Pay Now"}
            </button>
          </div>
        ))}
      </div>

      {error && (
        <div className="mt-6 p-4 bg-red-50 border border-red-200 text-red-800">
          {error}
        </div>
      )}

      <p className="mt-8 text-sm text-gray-500 text-center">
        Payments are processed securely by Stripe. Card details never touch this
        site.
      </p>
    </div>
  );
}
