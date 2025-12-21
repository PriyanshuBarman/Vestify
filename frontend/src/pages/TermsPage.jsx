import ScrollToTop from "@/components/layouts/ScrollToTop";
import { termsData } from "../constants/terms";
import GoBackBtn from "@/components/GoBackBtn";

function TermsPage() {
  return (
    <div className="mx-auto w-full max-w-3xl space-y-8 px-6 py-12">
      <ScrollToTop />
      <div className="justify-centers relative flex items-center">
        <GoBackBtn className="bg-accent absolute left-0 size-9 border" />
        <h1 className="sm:text-foreground-secondary w-full text-center text-2xl font-semibold sm:text-4xl">
         Terms and Conditions
        </h1>
      </div>
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
