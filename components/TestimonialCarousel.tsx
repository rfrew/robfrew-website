"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { Testimonial } from "@/data/experience";

interface TestimonialCarouselProps {
  testimonials: Testimonial[];
  typingSpeed?: number;
  pauseAfterTyping?: number;
}

export default function TestimonialCarousel({
  testimonials,
  typingSpeed = 20,
  pauseAfterTyping = 5000,
}: TestimonialCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState("");
  const [isTypingComplete, setIsTypingComplete] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [reduceMotion, setReduceMotion] = useState(false);
  const typingRef = useRef<NodeJS.Timeout | null>(null);

  const currentTestimonial = testimonials[currentIndex];

  // Respect the OS-level "reduce motion" preference: no typewriter, no
  // auto-advance. Manual navigation still works.
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduceMotion(mq.matches);
    const onChange = (e: MediaQueryListEvent) => setReduceMotion(e.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  const goToNext = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  }, [testimonials.length]);

  const goToPrevious = useCallback(() => {
    setCurrentIndex(
      (prev) => (prev - 1 + testimonials.length) % testimonials.length
    );
  }, [testimonials.length]);

  const goToIndex = (index: number) => {
    if (index === currentIndex) return;
    setCurrentIndex(index);
  };

  // Reset when testimonial changes
  useEffect(() => {
    setDisplayedText("");
    setIsTypingComplete(false);
  }, [currentIndex]);

  // Typewriter effect
  useEffect(() => {
    if (!currentTestimonial) return;
    const fullText = currentTestimonial.quote;

    if (reduceMotion) {
      setDisplayedText(fullText);
      if (!isTypingComplete) setIsTypingComplete(true);
      return;
    }

    if (displayedText.length < fullText.length) {
      typingRef.current = setTimeout(() => {
        setDisplayedText(fullText.slice(0, displayedText.length + 1));
      }, typingSpeed);

      return () => {
        if (typingRef.current) clearTimeout(typingRef.current);
      };
    } else if (displayedText.length === fullText.length && !isTypingComplete) {
      setIsTypingComplete(true);
    }
  }, [displayedText, currentTestimonial, typingSpeed, isTypingComplete, reduceMotion]);

  // Auto-advance after typing complete (not while hovered/focused, and not
  // at all for reduced-motion users — WCAG pause/stop/hide).
  useEffect(() => {
    if (!isTypingComplete || isPaused || reduceMotion) return;

    const timer = setTimeout(() => {
      goToNext();
    }, pauseAfterTyping);

    return () => clearTimeout(timer);
  }, [isTypingComplete, isPaused, reduceMotion, pauseAfterTyping, goToNext]);

  if (!currentTestimonial) return null;

  return (
    <div
      className="relative"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onFocus={() => setIsPaused(true)}
      onBlur={() => setIsPaused(false)}
    >
      {/* Full quote for screen readers — announced once per testimonial,
          instead of the character-by-character animated version below. */}
      <p className="sr-only" aria-live="polite" aria-atomic="true">
        &quot;{currentTestimonial.quote}&quot; — {currentTestimonial.author}
      </p>
      {/* Testimonial Content */}
      <div className="min-h-[320px] md:min-h-[280px] flex flex-col">
        <blockquote className="border-l-4 border-black pl-6 py-4 w-full flex-grow flex flex-col">
          <p
            aria-hidden="true"
            className="text-gray-700 leading-relaxed mb-6 italic text-lg md:text-xl flex-grow"
          >
            <span>&quot;</span>
            <span>{displayedText}</span>
            <span
              className={`inline-block w-0.5 h-5 bg-black ml-0.5 align-middle ${
                !isTypingComplete ? "animate-blink" : "opacity-0"
              }`}
            />
            {isTypingComplete && <span>&quot;</span>}
          </p>
          <footer className="text-sm mt-auto">
            <span className="font-semibold text-black text-base">
              {currentTestimonial.author}
            </span>
            {currentTestimonial.title && (
              <span className="block text-gray-500">
                {currentTestimonial.title}, {currentTestimonial.company}
              </span>
            )}
            <span className="block text-gray-400">
              {currentTestimonial.context}
            </span>
          </footer>
        </blockquote>
      </div>

      {/* Navigation */}
      <div className="flex items-center justify-between mt-8">
        {/* Arrow Navigation */}
        <div className="flex items-center gap-2">
          <button
            onClick={goToPrevious}
            className="p-2 hover:bg-gray-200 transition-colors duration-200"
            aria-label="Previous testimonial"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="w-5 h-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.75 19.5L8.25 12l7.5-7.5"
              />
            </svg>
          </button>
          <button
            onClick={goToNext}
            className="p-2 hover:bg-gray-200 transition-colors duration-200"
            aria-label="Next testimonial"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="w-5 h-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M8.25 4.5l7.5 7.5-7.5 7.5"
              />
            </svg>
          </button>
        </div>

        {/* Dot Indicators */}
        <div className="flex items-center gap-2">
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => goToIndex(index)}
              className={`w-2 h-2 rounded-full transition-all duration-200 ${
                index === currentIndex
                  ? "bg-black w-6"
                  : "bg-gray-300 hover:bg-gray-400"
              }`}
              aria-label={`Go to testimonial ${index + 1}`}
            />
          ))}
        </div>

        {/* Counter */}
        <div className="text-sm text-gray-500">
          {currentIndex + 1} / {testimonials.length}
        </div>
      </div>
    </div>
  );
}
