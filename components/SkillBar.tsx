"use client";

import { useEffect, useRef, useState } from "react";
import { ProficiencyLevel } from "@/data/skills";

interface SkillBarProps {
  name: string;
  level: ProficiencyLevel;
}

const levelToPercent: Record<ProficiencyLevel, number> = {
  Expert: 100,
  Proficient: 75,
  Familiar: 50,
};

export default function SkillBar({ name, level }: SkillBarProps) {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, []);

  const percent = levelToPercent[level];

  return (
    <div ref={ref} className="mb-4">
      <div className="flex justify-between items-center mb-2">
        <span className="text-sm font-medium text-gray-800">{name}</span>
        <span className="text-xs font-medium text-gray-500">{level}</span>
      </div>
      <div className="h-2 bg-gray-200 overflow-hidden">
        <div
          className="h-full bg-black transition-all duration-1000 ease-out"
          style={{
            width: isVisible ? `${percent}%` : "0%",
          }}
        />
      </div>
    </div>
  );
}
