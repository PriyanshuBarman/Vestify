import { format, formatDate, setDate } from "date-fns";
import {
  ArrowLeftIcon,
  CalendarRangeIcon,
  ChevronRightIcon,
  PencilIcon,
} from "lucide-react";
import { Link, useNavigate, useParams } from "react-router";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import CopyButton from "@/components/CopyButton";
import LoadingState from "@/components/LoadingState";
import OrderStatusIcon from "@/components/OrderStatusIcon";
import { formatToINR } from "@/utils/formatters";

import DesktopEditSipCard from "../components/DesktopEditSipCard";
import CancelSipButton from "../components/overlays/CancelSipButton";
import { useGetSipDetail } from "../hooks/useGetSipDetail";

const WEEKDAY_NAMES = {
  1: "Monday",
  2: "Tuesday",
  3: "Wednesday",
  4: "Thursday",
  5: "Friday",
};

function SipDetailsPage() {
  const { sipId, username } = useParams();
  const isOtherUserProfile = Boolean(username);
  const navigate = useNavigate();
  const { data, isPending } = useGetSipDetail(sipId, username);

  const sipDetail = data?.sip || {};
  const orders = sipDetail.orders || [];

  if (isPending) return <LoadingState fullPage />;

  return (
    <div className="pb-4 mx-auto md:w-[50%]">
      {/* Desktop Edit SIP Card */}
      {!isOtherUserProfile && <DesktopEditSipCard sipDetail={sipDetail} />}

      {/* Heading */}
      <div className="bg-background sticky top-0 z-10 flex items-center justify-between p-4 sm:pl-0">
        <div className="flex items-center gap-2">
          <button onClick={() => navigate(-1)}>
            <ArrowLeftIcon />
          </button>
          <h1 className="font-medium">Sip Details</h1>
        </div>
        {!isOtherUserProfile && <CancelSipButton sipId={sipId} />}
      </div>

      <div className="px-4">
        {/* SIP Details/Summary */}
        <section className="space-y-4 py-6">
          <div>
            <h1 className="flex items-end gap-2 text-4xl font-semibold">
              {sipDetail.type === "AMOUNT"
                ? formatToINR(sipDetail.amount, 2)
                : sipDetail.quantity}
              <span className="text-sm text-muted-foreground font-medium mb-1">
                {sipDetail.type === "AMOUNT" ? "amount" : "qty"}
              </span>
            </h1>
            <p className="mt-2 text-sm font-medium">
              {sipDetail.frequency === "MONTHLY"
                ? `${formatDate(setDate(new Date(), sipDetail.sipDate), "do")} of every month`
                : `Every ${WEEKDAY_NAMES[sipDetail.sipDate]}`}
            </p>
          </div>

          <Link
            to={`/stocks/${sipDetail.symbol}`}
            className="text-md text-muted-foreground flex items-center gap-4"
          >
            <span className="text-sm">
              {sipDetail.name || sipDetail.shortName || sipDetail.symbol}
            </span>
            <ChevronRightIcon className="size-5" />
          </Link>

          <div className="flex gap-4">
            {!isOtherUserProfile && (
              <Button
                asChild
                variant="outline"
                className="py-4 text-[0.8rem] tracking-tight sm:text-sm sm:tracking-normal md:hidden"
              >
                <Link to={`/stocks/sip?mode=edit&sipId=${sipId}`}>
                  <PencilIcon className="h-4 w-4" />
                  Change amount/date
                </Link>
              </Button>
            )}
          </div>
        </section>

        {/* Upcoming SIP */}
        <section className="border-b py-6">
          <h2 className="text-md mb-4 font-semibold">Upcoming</h2>

          <div className="flex justify-between">
            <div className="flex items-center gap-4">
              <CalendarRangeIcon className="size-5" />
              <div>
                <h6 className="flex items-center gap-2 text-sm font-medium">
                  Next Installment
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
          </div>
        </section>

        {/* Installments Timeline */}
        <StatusTimeline
          data={orders}
          username={username}
          isOtherUserProfile={isOtherUserProfile}
        />

        {/* Details */}
        <Accordion type="single" collapsible>
          <AccordionItem value="item-1">
            <AccordionTrigger className="text-md">Details</AccordionTrigger>

            <AccordionContent className="text-muted-foreground space-y-4">
              <div className="space-x-8">
                <span>Created on:</span>
                <span>
                  {sipDetail.createdAt &&
                    format(new Date(sipDetail.createdAt), "dd MMM yy, h:mm a")}
                </span>
              </div>
              <div className="space-x-10">
                <span>Autopay linked to</span>
                <span>Vestify Wallet</span>
              </div>
              {!isOtherUserProfile && (
                <div className="flex space-x-10">
                  <span className="shrink-0">SIP ID:</span>
                  <div className="flex items-start gap-2 break-all">
                    <span>{sipDetail.id}</span>
                    <CopyButton
                      text={sipDetail.id}
                      className="text-foreground"
                    />
                  </div>
                </div>
              )}
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </div>
  );
}

export default SipDetailsPage;

function StatusTimeline({ data, username, isOtherUserProfile }) {
  if (!data?.length) return null;
  return (
    <section className="border-b py-6">
      <h2 className="text-md mb-4 font-semibold">Installments</h2>
      <div className="relative space-y-6">
        {data?.map((order, index) => (
          <div key={order.id} className="relative flex items-start gap-3">
            {/* Vertical line */}
            {index !== data.length - 1 && (
              <div className="absolute top-6 left-[10px] h-full w-px bg-gray-300"></div>
            )}

            {/* Icon */}
            <OrderStatusIcon status={order.status} />

            {/* Text */}
            <Link
              to={
                isOtherUserProfile
                  ? `/stocks/orders/${order.id}?username=${username}`
                  : `/stocks/orders/${order.id}`
              }
              state={order}
              className="space-y-2"
            >
              <h6
                className={`flex items-center gap-2 text-sm font-medium ${
                  order.status === "COMPLETED" && "text-muted-foreground"
                }`}
              >
                {format(setDate(new Date(), data.length - index), "do")}{" "}
                installment <ChevronRightIcon className="size-4" />
              </h6>
              <span className="text-muted-foreground text-xs">
                {format(new Date(order.createdAt), "dd MMM yy, h:mm a")}
              </span>
            </Link>
          </div>
        ))}
      </div>
    </section>
  );
}
