import CopyButton from "@/components/CopyButton";
import LoadingState from "@/components/LoadingState";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { formatToINR } from "@/utils/formatters";
import { format, formatDate, setDate } from "date-fns";
import {
  ArrowLeftIcon,
  CalendarRangeIcon,
  ChevronRightIcon,
  PencilIcon,
} from "lucide-react";
import { Link, useNavigate, useParams } from "react-router";
import DesktopEditSipCard from "../components/DesktopEditSipCard";
import OrderStatusIcon from "../components/OrderStatusIcon";
import CancelSipButton from "../components/overlays/CancelSipButton";
import SkipSipButton from "../components/overlays/SkipSipButton";
import { useGetSipDetail } from "../hooks/useGetSipDetail";

function SipDetailsPage() {
  const { sipId } = useParams();
  const navigate = useNavigate();
  const { data, isPending } = useGetSipDetail(sipId);

  const sipDetail = data?.sip || {};
  const installments = data?.installments || [];

  if (isPending) return <LoadingState fullPage />;

  return (
    <div className="md:w-[50%]">
      {/* Desktop Edit SIP Card (shown on the right side ) */}
      <DesktopEditSipCard sipDetail={sipDetail} />

      {/* Heading */}
      <div className="bg-background sticky top-0 z-10 flex items-center justify-between p-4 sm:pl-0">
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
            <h2 className="text-3xl font-semibold">
              {formatToINR(sipDetail.amount, 2)}
            </h2>
            <span className="mt-2 space-x-6 text-sm font-medium">
              {formatDate(setDate(new Date(), sipDetail.sipDate), "do")} of
              every month
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
          <h2 className="text-md mb-4 font-semibold">Upcoming</h2>

          <div className="flex justify-between">
            <div className="flex items-center gap-4">
              <CalendarRangeIcon className="size-5" />
              <div>
                <h6 className="flex items-center gap-2 text-sm font-medium">
                  {format(setDate(new Date(), installments.length + 1), "do")}{" "}
                  installment
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
                <span>
                  {sipDetail.createdAt &&
                    format(sipDetail.createdAt, "dd MMM yy, h:mm a")}
                </span>
              </div>
              <div className="space-x-10">
                <span>Autopay linked to</span>
                <span>Vestify Wallet</span>
              </div>
              <div className="flex space-x-10">
                <span className="shrink-0">SIP ID:</span>
                <div className="flex items-start gap-2 break-all">
                  <span>{sipDetail.id}</span>
                  <CopyButton text={sipDetail.id} className="text-foreground" />
                </div>
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
      <h2 className="text-md mb-4 font-semibold">Installments</h2>
      <div className="relative space-y-6">
        {data?.map((installment, index) => (
          <div key={installment.id} className="relative flex items-start gap-3">
            {/* Vertical line */}
            {index !== data.length - 1 && (
              <div className="absolute top-6 left-[10px] h-full w-px bg-gray-300"></div>
            )}

            {/* Icon */}
            <OrderStatusIcon status={installment.status} />

            {/* Text */}
            <Link
              to={`/mutual-funds/orders/${installment.id}`}
              state={installment}
              className="space-y-2"
            >
              <h6
                className={`flex items-center gap-2 text-sm font-medium ${
                  installment.status === "COMPLETED" && "text-muted-foreground"
                }`}
              >
                {format(setDate(new Date(), data.length - index), "do")}{" "}
                installment <ChevronRightIcon className="size-4" />
              </h6>
              <span className="text-muted-foreground text-xs">
                {format(installment.processDate, "dd MMM yy, h:mm a")}
              </span>
            </Link>
          </div>
        ))}
      </div>
    </section>
  );
}

export default SipDetailsPage;
