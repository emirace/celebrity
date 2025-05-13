"use client";

import ServiceCard from "./_component/serviceCard";

const Services = () => {
  return (
    <section
      id="services"
      className="py-16 px-6 md:px-20 bg-white text-gray-900"
    >
      <div className="max-w-7xl mx-auto ">
        <div className="flex flex-col md:flex-row justify-between items-start mb-16">
          <h2 className="text-3xl md:text-4xl font-medium mb-2 md:w-1/3">
            Stay Happy With Our Services
          </h2>
          <p className="text-sm text-gray-600 mb-6 md:w-1/3">
            Need A Special Message From Your Favorite Artist? Our Artists Are
            Ready To Make Your Day Even More Special.
          </p>
        </div>
        <ServiceCard
          title="Celebrity Meet & Greet"
          description="Get a chance to meet your favorite celebrities and create unforgettable memories."
          button="Book a meet & greet"
          image1="/images/meet.png"
          image2="/images/meet2.png"
          path="/meet"
        />
        <ServiceCard
          title="Member Card Registration"
          description=" Register for our exclusive member card and enjoy special benefits and discounts."
          button="Register Now"
          image1="/images/membership.png"
          image2="/images/membership.jpg"
          path="/membership"
          inverse={true}
        />
        <ServiceCard
          title="Fan Card Registration"
          description="Join our fan club by registering for a fan card and enjoy exclusive perks and updates."
          button="Get Your Fan Card"
          image1="/images/fan_card.png"
          image2="/images/fan_card2.png"
          path="/fan-card"
        />
        <ServiceCard
          title="Profile Security Registration"
          description="Protect your online presence with our advanced security profile registration services. Stay safe and secure."
          button="Register Now"
          image1="/images/security.png"
          image2="/images/security2.png"
          path="/profile-security"
          inverse={true}
        />
        <ServiceCard
          title="Book Your Favorite Celebrity"
          description=" Want to make your event unforgettable? Book your favorite celebrity for a special appearance or performance."
          button="Book Now"
          image1="/images/booking.png"
          image2="/images/booking.webp"
          path="/booking"
        />
      </div>
    </section>
  );
};

export default Services;
