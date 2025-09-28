import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import LoadingSkeleton from "@/features/search/components/LoadingSkeleton";
import { format, setDate } from "date-fns";
import {
  ArrowLeftIcon,
  CalendarRangeIcon,
  CheckCircle,
  ChevronRightIcon,
  Clock,
  PencilIcon,
} from "lucide-react";
import { Link, useNavigate, useParams } from "react-router";
import CancelSipButton from "../components/CancelSipButton";
import DesktopEditSipCard from "../components/DesktopEditSipCard";
import SkipSipButton from "../components/SkipSipButton";
import { useGetSipDetail } from "../hooks/useGetSipDetail";
import { formatToINR } from "@/utils/formatters";

function SipDetailsPage() {
  const { sipId } = useParams();
  const navigate = useNavigate();
  const { data, isPending } = useGetSipDetail(sipId);

  const sipDetail = data?.sip || {};
  const installments = data?.installments || [];

  if (isPending) return <LoadingSkeleton fullPage />;

  return (
    <div className="md:w-[50%]">
      {/* Desktop Edit SIP Card (shown on the right side ) */}
      <DesktopEditSipCard sipDetail={sipDetail} />

      {/* Heading */}
      <div className="bg-background sticky top-0 z-10 flex items-center justify-between p-4">
        <div className="flex items-center gap-2">
          <button onClick={() => navigate(-1)}>
            <ArrowLeftIcon />
          </button>
          <h1 className="font-medium">Sip Details</h1>
        </div>
        <CancelSipButton sipId={sipId} />
      </div>

      <div className="px-4">
        {/* SIP Details/Summary */}
        <section className="space-y-4 py-6">
          <div>
            <h2 className="text-2xl font-semibold">
              {formatToINR(sipDetail.amount, 2)}
            </h2>
            <span className="mt-2 space-x-6 text-xs">
              {format(setDate(new Date(), sipDetail.sipDate), "do")} of every
              month
            </span>
          </div>

          <Link
            to={`/mutual-funds/${sipDetail.schemeCode}`}
            className="text-md text-muted-foreground flex items-center gap-4"
          >
            <span className="text-sm">{sipDetail.fundName}</span>
            <ChevronRightIcon className="size-5" />
          </Link>

          <Button asChild variant="outline" className="py-4 md:hidden">
            <Link to={`/mutual-funds/edit/sip/${sipId}`}>
              <PencilIcon className="mr-2 h-4 w-4" />
              Change amount/date
            </Link>
          </Button>
        </section>

        {/* Upcoming SIP */}
        <section className="border-b py-6">
          <h2 className="text-md mb-4 font-medium">Upcoming</h2>

          <div className="flex justify-between">
            <div className="flex items-center gap-4">
              <CalendarRangeIcon className="size-5" />
              <div>
                <h6 className="flex items-center gap-2 text-sm font-medium">
                  {format(setDate(new Date(), installments.length + 1), "do")}{" "}
                  installment
                  <ChevronRightIcon className="size-4" />
                </h6>
                <span className="text-muted-foreground text-xs">
                  {sipDetail.nextInstallmentDate &&
                    format(
                      new Date(sipDetail.nextInstallmentDate),
                      "dd MMM yy",
                    )}
                </span>
              </div>
            </div>
            <div>
              <SkipSipButton
                sipId={sipId}
                nextInstallmentDate={sipDetail.nextInstallmentDate}
              />
            </div>
          </div>
        </section>

        {/* Installments Timeline */}
        <StatusTimeline data={installments} />

        {/* Details */}
        <Accordion type="single" collapsible>
          <AccordionItem value="item-1">
            <AccordionTrigger className="text-md">Details</AccordionTrigger>

            <AccordionContent className="text-muted-foreground space-y-4">
              <div className="space-x-8">
                <span>Created on:</span>
                <span className="font-medium">
                  {sipDetail.createdAt &&
                    format(sipDetail.createdAt, "dd MMM yy, h:mm a")}
                </span>
              </div>
              <div className="space-x-10">
                <span>Paid Via:</span>
                <span className="font-medium">
                  Vestify Wallet (Virtual Money)
                </span>
              </div>
              <div className="space-x-10">
                <span>SIP Id:</span>
                <span className="font-medium">{sipDetail.id}</span>
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </div>
  );
}

function StatusTimeline({ data }) {
  return (
    <section className="border-b py-6">
      <h2 className="text-md mb-4 font-medium">Installments</h2>
      <div className="relative space-y-6">
        {data?.map((installment, index) => (
          <div key={installment.id} className="relative flex items-start gap-3">
            {/* Vertical line */}
            {index !== data.length - 1 && (
              <div className="absolute top-6 left-[10px] h-full w-px bg-gray-300"></div>
            )}

            {/* Icon */}
            <div className="bg-background z-10 mt-0.5">
              {installment.status === "COMPLETED" ? (
                <CheckCircle className="text-primary size-5" />
              ) : (
                <Clock className="text-primary size-5" />
              )}
            </div>

            {/* Text */}
            <div className="space-y-2">
              <h6
                className={`flex items-center gap-2 text-sm font-medium ${
                  installment.status === "COMPLETED" && "text-muted-foreground"
                }`}
              >
                {format(setDate(new Date(), index + 1), "do")} installment{" "}
                <ChevronRightIcon className="size-4" />
              </h6>
              <span className="text-muted-foreground text-xs">
                {format(installment.createdAt, "dd MMM yy, h:mm a")}
              </span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default SipDetailsPage;
