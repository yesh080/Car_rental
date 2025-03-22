"use client";
import React from "react";

const Features = () => {
  const PriceIcon = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <path
        d="M11.94 2.21L9.53 7.82H7.12C6.72 7.82 6.33 7.85 5.95 7.93L6.95 5.53L6.99 5.44L7.05 5.28C7.08 5.21 7.1 5.15 7.13 5.1C8.29 2.41 9.59 1.57 11.94 2.21Z"
        fill="#152F64"
      />
    </svg>
  );

  const DriverIcon = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <path
        d="M12 14C6.99 14 2.91 17.36 2.91 21.5C2.91 21.78 3.13 22 3.41 22H20.59C20.87 22 21.09 21.78 21.09 21.5C21.09 17.36 17.01 14 12 14Z"
        fill="#152F64"
      />
    </svg>
  );

  const DeliveryIcon = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <path
        d="M18 2H6C4.34 2 3 3.33 3 4.97V15.88C3 17.52 4.34 18.85 6 18.85H6.76C7.56 18.85 8.32 19.16 8.88 19.72L10.59 21.41C11.37 22.18 12.64 22.18 13.42 21.41L15.13 19.72C15.69 19.16 16.46 18.85 17.25 18.85H18C19.66 18.85 21 17.52 21 15.88V4.97C21 3.33 19.66 2 18 2Z"
        fill="#152F64"
      />
    </svg>
  );

  const features = [
    {
      Icon: PriceIcon,
      title: "Best price guaranteed",
      description:
        "Find a lower price? We'll refund you 100% of the difference.",
    },
    {
      Icon: DriverIcon,
      title: "Experience driver",
      description:
        "Don't have driver? Don't worry, we have many experienced driver for you.",
    },
    {
      Icon: DeliveryIcon,
      title: "24 hour car delivery",
      description:
        "Book your car anytime and we will deliver it directly to you.",
    },
  ];

  return (
    <section id="why-choose-us" className="flex justify-between px-40 py-20 bg-slate-950 max-md:p-10">
      <div className="max-w-xl max-md:max-w-full">
        <div className="px-8 py-4 mb-8 text-sm bg-yellow-400 rounded-lg text-blue-950">
          WHY CHOOSE US
        </div>
        <h2 className="text-4xl font-medium text-stone-200 max-sm:text-3xl">
          We offer the best experience with our rental deals
        </h2>
        <div className="flex flex-col gap-10">
          {features.map((feature, index) => (
            <article key={index} className="flex gap-6 items-center">
              <div className="flex justify-center items-center w-16 h-16 bg-blue-50 rounded-2xl">
                <feature.Icon />
              </div>
              <div>
                <h3 className="mb-6 text-xl text-blue-800">{feature.title}</h3>
                <p className="text-base text-white">{feature.description}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
      <img
        src="https://cdn.builder.io/api/v1/image/assets/TEMP/3527b1acb8ac596c3b0e32fe77700806b9ce9339"
        alt="Toyota"
        className="h-[645px] w-[860px] max-md:hidden"
      />
    </section>
  );
};

export default Features;