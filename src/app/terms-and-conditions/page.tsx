import React from "react";

const TermsPage = () => {
  return (
    <section className="min-h-[90vh] w-[100%] h-[100%] px-4 mx-auto max-w-7xl sm:px-6 lg:px-8 py-[2rem]">
      <h1 className="text-3xl font-[500] leading-tight text-black sm:text-4xl lg:text-5xl">
        Terms and Conditions
      </h1>
      <p className="mt-4 text-1xl font-[400]">
        Welcome! These Terms and Conditions govern your use of our real-time
        object detection services.
      </p>

      <h2 className="mt-4 text-2xl font-[400]">1. Introduction</h2>
      <p>
        This website uses advanced AI models trained on the COCO dataset to
        provide object detection services. By accessing or using this website,
        you agree to these Terms and Conditions.
      </p>

      <h2 className="mt-4 text-2xl font-[400]">2. Usage Restrictions</h2>
      <p>
        You agree not to misuse the object detection service, reverse engineer
        the models, or use the service for unlawful activities. The service is
        intended for lawful, non-commercial use only.
      </p>

      <h2 className="mt-4 text-2xl font-[400]">3. Service Disclaimer</h2>
      <p>
        We provide this service &quot;as is&quot; and do not guarantee accuracy.
        We are not liable for any decisions made based on detected objects.
      </p>

      <h2 className="mt-4 text-2xl font-[400]">4. Limitation of Liability</h2>
      <p>
        We are not liable for any damages arising from your use of this website
        or inability to use it.
      </p>

      <h2 className="mt-4 text-2xl font-[400]">5. Intellectual Property</h2>
      <p>
        All content, including models, software, and designs, are free to use
        and open-source.
      </p>

      <h2 className="mt-4 text-2xl font-[400]">6. Modifications</h2>
      <p>
        We reserve the right to modify these Terms and Conditions. Updates will
        be effective upon posting on this page.
      </p>
    </section>
  );
};

export default TermsPage;
