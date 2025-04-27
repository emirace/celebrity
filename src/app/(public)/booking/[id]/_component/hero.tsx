import Image from "next/image";

const Hero = () => {
  return (
    <section className="relative w-full h-96 bg-white flex items-end md:items-center ">
      <div className="absolute left-0 -bottom-1 h-full   w-full bg-gradient-to-t from-background  to-black/0 z-10 " />
      <h1 className="text-6xl md:text-8xl font-thin uppercase text-center z-20 w-full">
        <span className="font-bold ">Book a</span> session
      </h1>
      <Image
        src={"/images/booking.png"}
        alt="Hero Background"
        layout="fill"
        objectFit="cover"
        className="absolute object-bottom inset-0 "
      />
    </section>
  );
};

export default Hero;
