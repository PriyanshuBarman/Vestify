import ButtonAnimatedLink from "@/components/ButtonAnimatedLink";
import GoBackBtn from "@/components/GoBackBtn";
import ScrollToTop from "@/components/layouts/ScrollToTop";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { aboutData } from "@/constants/about";
import {
  GithubLogoIcon,
  LinkedinLogoIcon,
  TwitterLogoIcon,
} from "@phosphor-icons/react";

function AboutPage() {
  return (
    <div className="mx-auto w-full max-w-3xl space-y-12 px-6 py-12">
      <ScrollToTop />
      <title>About us</title>
      <meta
        name="description"
        content="Vestify is a virtual investment platform that simulates real mutual fund investing, providing a real, professional-grade experience with a Groww-inspired UI."
      />
      <div className="justify-centers relative flex items-center">
        <GoBackBtn className="bg-accent absolute left-0 size-9 border" />
        <h1 className="sm:text-foreground-secondary w-full text-center text-2xl font-semibold sm:text-4xl">
          About Us
        </h1>
      </div>
      {aboutData.map((section, index) => (
        <section key={index} className="mb-8">
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

      {/* Credits & Attributions Section */}
      <section className="mb-8">
        <h2 className="sm:text-foreground-secondary mb-4 text-2xl font-semibold">
          5. Credits & Attributions
        </h2>
        <div className="text-muted-foreground text-md mt-3 flex flex-col whitespace-pre-line sm:text-base">
          <ButtonAnimatedLink className="text-muted-foreground w-fit">
            <a
              href="https://groww.in"
              target="_blank"
              rel="noopener noreferrer"
            >
              Groww
            </a>
          </ButtonAnimatedLink>
          <ButtonAnimatedLink className="text-muted-foreground w-fit">
            <a href="https://www.kuvera.in/" target="_blank">
              Kuvera
            </a>
          </ButtonAnimatedLink>
          <ButtonAnimatedLink className="text-muted-foreground w-fit">
            <a href="https://storyset.com" target="_blank">
              Storyset
            </a>
          </ButtonAnimatedLink>
          <ButtonAnimatedLink className="text-muted-foreground w-fit">
            <a
              href="https://logo.dev"
              target="_blank"
              rel="noopener noreferrer"
            >
              Logo.dev
            </a>
          </ButtonAnimatedLink>
          <ButtonAnimatedLink className="text-muted-foreground w-fit">
            <a href="https://mfapi.in" target="_blank">
              MfApi
            </a>
          </ButtonAnimatedLink>
        </div>
      </section>

      {/* Creator */}
      <section className="mt-20">
        <div className="flex items-center gap-4">
          <a
            aria-label="Go to creators linkedin profile"
            href="https://linkedin.com/in/priyanshubarman"
            target="_blank"
          >
            <Avatar className="size-12">
              <AvatarImage
                src="https://github.com/priyanshubarman.png"
                alt="creator logo"
              />
              <AvatarFallback />
            </Avatar>
          </a>
          <div>
            <p className="mb-1 font-medium">Priyanshu Barman</p>
            <div className="flex items-center justify-center gap-4">
              <a
                aria-label="Go to creators linkedin profile"
                href="https://www.linkedin.com/in/priyanshubarman"
                target="_blank"
              >
                <LinkedinLogoIcon weight="regular" className="size-5" />
              </a>
              <a
                aria-label="Go to creators twitter profile"
                href="https://twitter.com/priyanshuwb"
                target="_blank"
              >
                <TwitterLogoIcon weight="regular" className="size-5" />
              </a>
              <a
                aria-label="Go to creators github profile"
                href="https://github.com/priyanshubarman/vestify"
                target="_blank"
              >
                <GithubLogoIcon weight="regular" className="size-5" />
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default AboutPage;
