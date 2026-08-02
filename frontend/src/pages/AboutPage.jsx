import {
  GithubLogoIcon,
  LinkedinLogoIcon,
  LinkIcon,
  XLogoIcon,
} from "@phosphor-icons/react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { aboutData } from "@/constants/about";
import { credits } from "@/constants/credits";

function AboutPage() {
  return (
    <div className="mx-auto w-full max-w-3xl space-y-12 px-6 py-20 sm:py-26">
      <title>About us</title>
      <meta
        name="description"
        content="Vestify is a virtual investment platform that simulates real stock and mutual fund investing using virtual money, providing a professional-grade experience with a Groww app inspired UI."
      />
      <h1 className="sm:text-foreground-secondary w-full text-center text-2xl font-semibold sm:text-4xl">
        About Us
      </h1>
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
          4. Credits & Attributions
        </h2>
        <div className="text-muted-foreground text-md mt-3 flex flex-col whitespace-pre-line sm:text-base">
          {credits.map((item) => (
            <Button
              key={item.label}
              asChild
              variant="link"
              className="text-muted-foreground w-fit"
            >
              <a href={item.link} target="_blank" rel="noopener noreferrer">
                {item.label}
              </a>
            </Button>
          ))}
        </div>
      </section>

      {/* Creator */}
      <section className="mt-20">
        <h2 className="sm:text-foreground-secondary mb-4 text-2xl font-semibold">
          5. Hire me
        </h2>
        <div className="flex items-center mt-8 gap-4">
          <a
            aria-label="Go to creators linkedin profile"
            href="https://linkedin.com/in/priyanshubarman"
            target="_blank"
          >
            <Avatar className="size-20 sm:size-22">
              <AvatarImage
                src="https://github.com/priyanshubarman.png"
                alt="creator logo"
              />
              <AvatarFallback />
            </Avatar>
          </a>
          <div>
            <p className="mb-1 sm:mb-2 font-semibold text-lg sm:text-xl">
              Priyanshu Barman
            </p>
            <div className="flex items-center gap-1 sm:gap-2">
              <Button
                asChild
                variant="ghost"
                size="icon"
                className="rounded-full"
              >
                <a
                  aria-label="Go to creators linkedin profile"
                  href="https://www.linkedin.com/in/priyanshubarman"
                  target="_blank"
                >
                  <LinkedinLogoIcon weight="fill" className="size-5" />
                </a>
              </Button>
              <Button
                asChild
                variant="ghost"
                size="icon"
                className="rounded-full"
              >
                <a
                  aria-label="Go to creators twitter profile"
                  href="https://twitter.com/priyanshuwb"
                  target="_blank"
                >
                  <XLogoIcon weight="fill" className="size-5" />
                </a>
              </Button>

              <Button
                asChild
                variant="ghost"
                size="icon"
                className="rounded-full"
              >
                <a
                  aria-label="Go to creators github profile"
                  href="https://github.com/priyanshubarman/vestify"
                  target="_blank"
                >
                  <GithubLogoIcon weight="fill" className="size-5" />
                </a>
              </Button>

              <Button
                asChild
                variant="ghost"
                size="icon"
                className="rounded-full"
              >
                <a
                  aria-label="Go to creators linkedin profile"
                  href="https://www.priyanshux.me"
                  target="_blank"
                >
                  <LinkIcon weight="bold" className="size-5" />
                </a>
              </Button>
            </div>
          </div>
        </div>
        <p className="mt-6 font-medium">Open for job / internship / projects</p>
      </section>
    </div>
  );
}

export default AboutPage;
