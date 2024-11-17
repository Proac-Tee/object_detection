import React from "react";

const PolicyPage = () => {
  return (
    <section className="min-h-[90vh] w-[100%] h-[100%] px-4 mx-auto max-w-7xl sm:px-6 lg:px-8 py-[2rem]">
      <h1 className="text-3xl font-[500] leading-tight text-black sm:text-4xl lg:text-5xl">
        Privacy Policy
      </h1>
      <p className="mt-4 text-1xl font-[400]">
        Your privacy is important to us. This Privacy Policy explains how we
        collect, use, and protect your information.
      </p>

      <h2 className="mt-4 text-2xl font-[400]">1. Introduction</h2>
      <p>
        We use advanced AI models to provide real-time object detection. This
        Privacy Policy outlines what data we collect and how it is used
      </p>

      <h2 className="mt-4 text-2xl font-[400]">2. Data Collection</h2>
      <ul>
        <li>
          <strong>Image Data:</strong> Uploaded images are processed locally and
          are not stored on our servers.
        </li>
      </ul>

      <h2 className="mt-4 text-2xl font-[400]">3. Use of Data</h2>
      <p>
        Data is used to monitor and improve the performance of our services.
      </p>

      <h2 className="mt-4 text-2xl font-[400]">4. Data Protection</h2>
      <p>
        We use industry-standard security measures to protect your information
        from unauthorized access
      </p>

      <h2 className="mt-4 text-2xl font-[400]">5. Changes to this Policy</h2>
      <p>
        We may update this Privacy Policy periodically. Changes will be
        communicated via this page.
      </p>
    </section>
  );
};

export default PolicyPage;
