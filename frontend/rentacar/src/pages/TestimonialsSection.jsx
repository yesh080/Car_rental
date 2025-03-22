"use client";
import React from "react";

const TestimonialsSection = () => {
  const testimonials = [
    {
      rating: 5.0,
      text: "I have been using your services for 3 years. Your service is great, I will continue to use your service.",
      author: "Jenny Wilson",
      location: "From New York, US",
    },
    {
      rating: 5.0,
      text: "I feel very secure when using RentaRide's services. Your customer care team is very enthusiastic and the driver is always on time.",
      author: "Charlie Johnson",
      location: "From New York, US",
    },
    {
      rating: 5.0,
      text: "I feel very secure when using RentaRide's services. Your customer care team is very enthusiastic and the driver is always on time.",
      author: "Charlie Johnson",
      location: "From New York, US",
    },
  ];

  return (
    <section id="testimonials" className="px-0 py-20 bg-slate-950">
      <header className="mb-20 text-center">
        <div className="px-8 py-4 mb-8 text-sm bg-yellow-400 rounded-lg text-blue-950 inline-block">
          TESTIMONIALS
        </div>
        <h2 className="text-4xl font-medium text-stone-200 max-sm:text-3xl">
          What people say about us?
        </h2>
      </header>
      <div className="flex gap-8 justify-center mt-16 max-sm:flex-col max-sm:items-center">
        {testimonials.map((testimonial, index) => (
          <article
            key={index}
            className="p-10 bg-white rounded-3xl w-[397px] max-sm:w-[90%]"
          >
            <div className="mb-12 text-6xl text-neutral-700">
              {testimonial.rating.toFixed(1)} stars
            </div>
            <blockquote className="mb-20 text-lg text-zinc-800">
              &quot;{testimonial.text}&quot;
            </blockquote>
            <footer className="text-2xl text-neutral-800">
              <cite className="not-italic">{testimonial.author}</cite>
              <p className="mt-4 text-sm text-zinc-500">
                {testimonial.location}
              </p>
            </footer>
          </article>
        ))}
      </div>
    </section>
  );
};

export default TestimonialsSection;