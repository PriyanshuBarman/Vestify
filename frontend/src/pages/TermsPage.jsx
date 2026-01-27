import { termsData } from "../constants/terms";

function TermsPage() {
  return (
    <div className="mx-auto w-full max-w-3xl space-y-8 px-6 sm:py-26 py-20">
      <h1 className="sm:text-foreground-secondary w-full text-center text-2xl font-semibold sm:text-4xl">
        Terms & Conditions
      </h1>
      <p className="text-md sm:text-base">
        Welcome to Vestify. These Terms and Conditions (“Terms”) govern your use
        of our Website. By accessing or using the Website, you agree to comply
        with and be bound by these Terms.
      </p>
      {termsData.map((section, index) => (
        <section key={index} className="mt-10">
          <h2 className="sm:text-foreground-secondary mb-4 text-xl font-semibold">
            {section.title}
          </h2>

          {section.paragraphs.map((para, i) => (
            <p
              key={i}
              className="text-muted-foreground text-md mt-2 whitespace-pre-line sm:text-base"
            >
              {para}
            </p>
          ))}
        </section>
      ))}
    </div>
  );
}

export default TermsPage;
