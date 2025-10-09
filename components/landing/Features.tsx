"use client";

import { Shield, Armchair, MapPin, Users } from "lucide-react";

export function Features() {
  const features = [
    {
      title: "Verified Security",
      icon: Shield,
    },
    {
      title: "Premium Interior Design",
      icon: Armchair,
    },
    {
      title: "Prime Location",
      icon: MapPin,
    },
    {
      title: "Personalized Comprehensive Management",
      icon: Users,
    },
  ];

  return (
    <section id="features" className="py-20 bg-[#F5EFE7]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {features.map((feature, index) => (
            <div
              key={index}
              className="flex flex-col items-center text-center"
            >
              <div className="mb-6">
                <feature.icon className="w-16 h-16 text-primary" strokeWidth={1.5} />
              </div>
              <h3 className="text-xl font-bold text-primary playfair-display-sc">
                {feature.title}
              </h3>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
