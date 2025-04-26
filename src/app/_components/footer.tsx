import React from "react";

const Footer = () => {
  return (
    <section
      className="relative bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage: `url('/images/footer.png')`,
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-50" />

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 py-16 grid md:grid-cols-2 gap-10 text-white">
        {/* Signup Form */}
        <div className="bg-white text-black rounded-xl p-6 max-w-md shadow-lg">
          <h2 className="text-2xl font-semibold mb-2">Ready To Join?</h2>
          <p className="text-sm text-gray-600 mb-6">
            Sign up today and start turning your fan interactions into rewarding
            experiences.
          </p>
          <form className="flex flex-col gap-4">
            <input
              type="text"
              placeholder="Your Name"
              className="px-4 py-2 border rounded-md"
            />
            <input
              type="email"
              placeholder="Your Email"
              className="px-4 py-2 border rounded-md"
            />
            <input
              type="text"
              placeholder="Your Artist Agency"
              className="px-4 py-2 border rounded-md"
            />
            <button
              type="submit"
              className="bg-black text-white py-2 rounded-md font-medium hover:bg-gray-800"
            >
              Join Now
            </button>
          </form>
        </div>

        {/* Follow and Footer Section */}
        <div className="flex flex-col justify-between">
          <div>
            <h3 className="text-lg font-semibold mb-2">Follow Us</h3>
            <p className="text-sm text-gray-200 mb-4">
              Connect with us on social media for behind-the-scenes content,
              special promotions, and more.
            </p>
            <div className="flex gap-4">
              {["instagram", "facebook", "twitter", "tiktok"].map(
                (icon, idx) => (
                  <div
                    key={idx}
                    className="w-9 h-9 bg-white rounded-full flex items-center justify-center"
                  >
                    <img
                      src={`/icons/${icon}.svg`}
                      alt={icon}
                      className="w-5 h-5"
                    />
                  </div>
                )
              )}
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-10 text-sm text-gray-300">
            <div>
              <h4 className="font-semibold text-white mb-2">Navigation</h4>
              <ul>
                <li>Services</li>
                <li>Pricing</li>
                <li>About</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-white mb-2">Tutorial</h4>
              <ul>
                <li>Become A Contributor</li>
                <li>Made Video</li>
                <li>Make Endorsement</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-white mb-2">Address</h4>
              <p>
                8502
                <br />
                Preston Rd. Inglewood
                <br />
                Maine
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-white mb-2">Contact</h4>
              <p>
                Hello@fanstar.com
                <br />
                +32 (2) 322 918 9484
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="relative z-10 text-gray-400 text-xs text-center mt-8 pb-4">
        <p>© 2024 Fanstar. All Right Reserved.</p>
        <div className="flex justify-center gap-6 mt-2">
          <span>Terms</span>
          <span>Privacy</span>
          <span>Refund</span>
        </div>
      </div>
    </section>
  );
};

export default Footer;
