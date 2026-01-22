import CopyButton from "@/components/CopyButton";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { InfoIcon } from "@phosphor-icons/react";
import { useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";
import { useNavigate } from "react-router";
import {
  ALTERNATIVE_MOBILE_STEPS,
  DESKTOP_STEPS,
  ExternalLink,
  MOBILE_STEPS,
} from "../constants/auth-help";
import { trackPageView } from "@/lib/analytics";

export default function AuthHelpPage() {
  const navigate = useNavigate();
  const SITE_URL = window.location.hostname;
  const queryClient = useQueryClient();

  useEffect(() => {
    localStorage.clear();
    queryClient.clear();
    trackPageView(
      window.location.pathname + window.location.search,
      "Auth Help",
    );
  }, []);

  return (
    <div className="mx-auto min-h-dvh w-full max-w-5xl px-4 py-8 sm:py-12">
      <div className="flex flex-col items-center gap-4 border-b p-8 px-4 text-center sm:p-10">
        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-orange-400/10">
          <InfoIcon className="h-8 w-8 text-orange-400" />
        </div>
        <div className="space-y-2">
          <h2 className="text-xl font-semibold text-orange-400 sm:text-2xl">
            PIN Setup Failed
          </h2>
          <p className="text-foreground text-md mx-auto max-w-[550px]">
            Please allow third-party cookies for Vestify to continue.{" "}
            <TechnicalReasonDialog />
          </p>
        </div>
      </div>

      <div className="px-2 pt-8 sm:p-10">
        <DesktopGuide />
        {/* Mobile Guide - Screenshot Based */}
        <div className="space-y-10 sm:space-y-16">
          <div className="mb-6 hidden items-center justify-between gap-3 lg:flex">
            <div className="flex items-center gap-3">
              <div className="bg-primary h-8 w-1 rounded-full" />
              <h3 className="text-xl font-bold">Mobile Guide</h3>
            </div>
          </div>

          <p className="text-muted-foreground text-sm font-medium sm:text-base">
            Follow the steps below to fix this.
          </p>

          {MOBILE_STEPS.map((step) => (
            <GuideStep key={step.id} step={step} SITE_URL={SITE_URL} />
          ))}

          {/* Alternative Approach - Accordion */}
          <Accordion type="single" collapsible>
            <AccordionItem
              value="alternative"
              className="bg-accent rounded-xl px-4 py-0 sm:pl-6"
            >
              <AccordionTrigger>
                <div className="text-left">
                  <h3 className="font-medium">Alternative of Step 5</h3>
                  <p className="text-muted-foreground text-xs font-normal sm:text-sm">
                    Add Site Exception{" "}
                  </p>
                </div>
              </AccordionTrigger>
              <AccordionContent className="pt-6">
                <div className="mt-4 space-y-10 sm:space-y-16">
                  {ALTERNATIVE_MOBILE_STEPS.map((step) => (
                    <GuideStep
                      key={step.id}
                      step={{ ...step, id: `${step.id}` }}
                      SITE_URL={SITE_URL}
                    />
                  ))}
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>

        <div className="mt-12 flex flex-col items-center gap-6 border-t pt-8 sm:mt-20 sm:pt-12">
          <Badge variant="outline" className="rounded-full px-4 py-2">
            Re-login after saving settings
          </Badge>
          <Button
            size="lg"
            onClick={() => navigate("/auth")}
            className="bg-foreground w-full py-6"
          >
            Login Again
          </Button>
        </div>
      </div>
    </div>
  );
}

function GuideStep({ step, SITE_URL }) {
  return (
    <div className="relative flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
      <div className="flex-1 space-y-3 pt-1 sm:space-y-4 lg:pt-4">
        <h3 className="text-base font-[550] tracking-tight sm:text-lg">
          {step.id}. {step.title}
        </h3>

        <div className="text-muted-foreground max-w-[450px] space-y-2 text-sm leading-relaxed sm:text-base">
          <p dangerouslySetInnerHTML={{ __html: step.description }} />
        </div>

        {step.showUrl && (
          <div className="bg-accent/50 mt-2 max-w-[450px] rounded-xl border p-4 sm:mt-4 sm:rounded-2xl sm:p-5">
            <div className="mb-2 flex items-center justify-between sm:mb-3">
              <span className="text-muted-foreground text-[10px] font-bold tracking-widest uppercase">
                Copy Link for Exception
              </span>
              <CopyButton text={SITE_URL} />
            </div>
            <div className="text-foreground flex items-center gap-2 truncate font-mono text-xs font-medium sm:text-sm">
              <ExternalLink className="text-muted-foreground/50 h-4 w-4 shrink-0" />
              {SITE_URL}
            </div>
          </div>
        )}
      </div>

      {/* Vertical Screenshot Display */}
      <div className="group relative mx-auto w-[180px] shrink-0 sm:w-[240px] lg:mx-0">
        <div className="ring-accent relative overflow-hidden rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.1)] ring-1 transition-all duration-500 group-hover:-translate-y-2 group-hover:shadow-[0_30px_60px_rgba(0,0,0,0.15)]">
          <div className="relative aspect-[9/20] w-full overflow-hidden">
            <img
              src={step.image}
              alt={step.title}
              className="h-full w-full object-cover"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

function DesktopGuide() {
  return (
    <div className="mb-16 hidden space-y-8 border-b pb-16 lg:block">
      <div className="mb-6 flex items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="bg-primary h-8 w-1 rounded-full" />
          <h3 className="text-xl font-bold">Desktop Browser Instructions</h3>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-6">
        {DESKTOP_STEPS.map((method) => (
          <div
            key={method.id}
            className={`space-y-4 rounded-2xl border p-6 ${method.bgColor} ${method.borderColor}`}
          >
            <h4
              className={`flex items-center gap-2 font-bold ${method.titleColor}`}
            >
              <method.icon className="h-4 w-4" /> {method.title}
            </h4>
            <div
              className={`space-y-3 text-sm leading-relaxed ${method.textColor}`}
            >
              {method.instructions.map((text, i) => (
                <p
                  key={i}
                  dangerouslySetInnerHTML={{
                    __html: `${i + 1}. ${text}`,
                  }}
                />
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="border-accent bg-accent/20 flex items-start gap-3 rounded-xl border p-4 shadow-sm">
        <InfoIcon className="text-accent-foreground mt-0.5 h-5 w-5 shrink-0" />
        <p className="text-muted-foreground text-xs leading-relaxed">
          Browsers like Safari or Brave might call this{" "}
          <strong>"Prevent Cross-Site Tracking"</strong> or{" "}
          <strong>"Shields"</strong>. Ensure these are disabled for Vestify to
          allow secure session cookies.
        </p>
      </div>
    </div>
  );
}
function TechnicalReasonDialog() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <button className="font-medium text-orange-400 hover:underline max-sm:text-xs">
          Know more
        </button>
      </DialogTrigger>
      <DialogContent className="max-w-[calc(100vw-32px)] rounded-2xl border-none sm:max-w-xl sm:rounded-3xl">
        <DialogHeader className="text-left sm:text-center">
          <DialogTitle className="text-xl font-bold">
            Why is this happening?
          </DialogTitle>
        </DialogHeader>
        <div className="text-muted-foreground space-y-4 pt-4 text-left text-sm leading-relaxed sm:text-center">
          <p>
            Our frontend and backend systems are{" "}
            <b>hosted on different sub-domains</b>. This is why modern browsers
            block the cookies sent from our backend, treating them as
            "third-party cookies."
          </p>
          <p>
            Without these cookies, we <b>cannot keep you logged in securely</b>.
            These are strictly for your authentication, never for tracking or
            advertisements.
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
}
