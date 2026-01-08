import GoBackBar from "@/components/GoBackBar";
import SendIcon from "@/components/icons/SendIcon";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LinkedinLogoIcon, TwitterLogoIcon } from "@phosphor-icons/react";
import { RedditLogoIcon } from "@phosphor-icons/react/dist/ssr";
import { ArrowUpRightIcon, HelpCircleIcon } from "lucide-react";

const socialLinks = [
  {
    name: "Reddit",
    icon: RedditLogoIcon,
    href: "https://www.reddit.com/r/Vestify",
  },
  {
    name: "Twitter",
    icon: TwitterLogoIcon,
    href: "https://twitter.com/PriyanshuWb",
  },
  {
    name: "LinkedIn",
    icon: LinkedinLogoIcon,
    href: "https://linkedin.com/in/priyanshubarman",
  },
];

function ContactUsPage() {
  return (
    <div className="flex h-svh flex-col px-4 pb-4 sm:mx-auto sm:h-fit sm:max-w-lg sm:pt-12">
      <GoBackBar showSearchIcon={false} className="px-0" />

      <Card className="w-full border-none bg-transparent shadow-none">
        <CardHeader className="space-y-4 text-center">
          <HelpCircleIcon className="mx-auto size-14" />
          <CardTitle className="text-2xl font-semibold">Need Help?</CardTitle>
          <p className="text-muted-foreground">
            Send us your queries and questions
          </p>
        </CardHeader>

        <CardContent className="space-y-8 px-2">
          <div className="space-y-4 text-center">
            <div className="space-y-3 rounded-lg">
              <Button
                size="lg"
                variant="secondary"
                className="h-12 w-full rounded-xl shadow-none"
                asChild
              >
                <a href="mailto:vestify.contact@gmail.com">
                  <SendIcon className="size-6" />
                  Send Email
                </a>
              </Button>
            </div>
          </div>

          {/* Divider */}
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="border-border w-full border-t" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="bg-background text-muted-foreground px-2">
                or connect with us
              </span>
            </div>
          </div>

          {/* Social Links */}
          <div className="space-y-4">
            <h3 className="text-center text-xl font-semibold">Social Links</h3>
            <div className="grid gap-3">
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:bg-accent flex items-center justify-between rounded-2xl border p-4 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <social.icon weight="fill" className="size-5" />
                    <span className="font-medium">{social.name}</span>
                  </div>
                  <Button variant="ghost" size="icon">
                    <ArrowUpRightIcon />
                  </Button>
                </a>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default ContactUsPage;
