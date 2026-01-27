import { privacySections } from "@/constants/privacy";

function PrivacyPage() {
  return (
    <div className="mx-auto w-full max-w-3xl space-y-8 px-6 py-20 sm:py-26">
      <h1 className="sm:text-foreground-secondary w-full text-center text-2xl font-semibold sm:text-4xl">
        Privacy Policy
      </h1>
      <p className="text-md sm:text-base">
        Welcome to Vestify. Your privacy is important to us. This Privacy Policy
        outlines how we collect, use, and protect your information when you
        visit or use the Website.
      </p>

      {privacySections.map((section, index) => (
        <section key={index} className="space-y-2">
          <h2 className="sm:text-foreground-secondary mb-4 text-xl font-semibold">
            {section.title}
          </h2>
          {section.content.map((item, i) => (
            <p
              className="text-muted-foreground text-md mt-2 whitespace-pre-line sm:text-base"
              key={i}
            >
              {item}
            </p>
          ))}
        </section>
      ))}
    </div>
  );
}

export default PrivacyPage;
