"use client";

import { useState } from "react";

const MIN_DOLLARS = 1;
const MAX_DOLLARS = 25000;

export default function CustomAmount() {
  const [amount, setAmount] = useState("");
  const [memo, setMemo] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handlePay = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    const dollars = parseFloat(amount.replace(/[$,\s]/g, ""));
    if (Number.isNaN(dollars) || dollars < MIN_DOLLARS || dollars > MAX_DOLLARS) {
      setError(`Please enter an amount between $1 and $${MAX_DOLLARS.toLocaleString()}.`);
      return;
    }

    setLoading(true);
    try {
      const response = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          packageId: "custom",
          customAmountCents: Math.round(dollars * 100),
          memo,
        }),
      });

      const data = await response.json();

      if (response.ok && data.url) {
        window.location.href = data.url;
      } else {
        setError(data.error ?? "Something went wrong. Please try again.");
        setLoading(false);
      }
    } catch {
      setError("Could not reach the payment service. Please try again.");
      setLoading(false);
    }
  };

  return (
    <div className="bg-white border border-gray-200 p-8 max-w-2xl mx-auto">
      <h3 className="text-2xl font-bold mb-2">Pay a Custom Amount</h3>
      <p className="text-gray-600 mb-6">
        Already know what you owe? Enter the amount and pay securely — no
        package required.
      </p>

      <form onSubmit={handlePay} className="space-y-4">
        <div>
          <label htmlFor="custom-amount" className="block text-sm font-semibold mb-1">
            Amount (USD)
          </label>
          <div className="relative">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500">
              $
            </span>
            <input
              id="custom-amount"
              type="text"
              inputMode="decimal"
              required
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="250.00"
              className="w-full border border-gray-300 pl-8 pr-4 py-3 focus:outline-none focus:border-black"
            />
          </div>
        </div>

        <div>
          <label htmlFor="custom-memo" className="block text-sm font-semibold mb-1">
            What&apos;s this for?{" "}
            <span className="font-normal text-gray-500">(optional)</span>
          </label>
          <input
            id="custom-memo"
            type="text"
            maxLength={200}
            value={memo}
            onChange={(e) => setMemo(e.target.value)}
            placeholder="e.g. Balance for website project"
            className="w-full border border-gray-300 px-4 py-3 focus:outline-none focus:border-black"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-black text-white px-6 py-4 font-semibold hover:bg-gray-900 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? "Redirecting…" : "Pay Now"}
        </button>
      </form>

      {error && (
        <div className="mt-4 p-4 bg-red-50 border border-red-200 text-red-800">
          {error}
        </div>
      )}
    </div>
  );
}
