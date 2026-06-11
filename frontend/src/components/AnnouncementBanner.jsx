import { ArrowRightIcon, XIcon } from "lucide-react";
import { useNavigate } from "react-router";

import { useDismisAnnouncement } from "@/hooks/useDismisAnnouncement";
import { useGetAnnouncements } from "@/hooks/useGetAnnouncements";
import { Button } from "@/components/ui/button";

function AnnouncementBanner() {
  const { data: announcements, isPending } = useGetAnnouncements();

  if (isPending) return null;

  return (
    <div className="space-y-2">
      {announcements?.map((announcement) => (
        <Announcement
          key={announcement.id}
          id={announcement.id}
          message={announcement.message}
          linkLabel={announcement.linkLabel}
          linkUrl={announcement.linkUrl}
        />
      ))}
    </div>
  );
}

export default AnnouncementBanner;

function Announcement({ id, message, linkUrl, linkLabel }) {
  const navigate = useNavigate();
  const { mutate: dismissAnnouncement } = useDismisAnnouncement();

  const handleLinkClick = () => {
    if (linkUrl.startsWith("https://")) {
      return window.open(linkUrl, "_blank");
    }
    navigate(linkUrl);
  };

  return (
    <div className="flex h-full z-50 w-full items-center justify-center">
      <div className="relative isolate flex w-full items-center justify-center overflow-hidden border-b px-10 py-2 backdrop-blur">
        <div className="absolute inset-0 -z-10 bg-gradient-to-r from-zinc-200 via-zinc-100 to-zinc-300 dark:from-zinc-800 dark:via-zinc-700 dark:to-zinc-900" />

        <div className="absolute inset-0 -z-10 bg-gradient-to-r from-white/40 via-white/10 to-transparent opacity-40" />

        <div className="absolute inset-0 -z-10 bg-gradient-to-r from-white/20 via-transparent to-black/10 opacity-30 blur-2xl" />

        <div className="flex w-full max-w-4xl min-w-0 flex-row items-center gap-2 text-center">
          <p className="text-sm text-start text-pretty font-[450]  sm:text-base">
            {message}
          </p>

          {(linkLabel || linkUrl) && (
            <div className="group flex items-center">
              <Button
                onClick={handleLinkClick}
                size="sm"
                className="rounded-full bg-foreground hover:bg-foreground/70  text-sm   "
              >
                {linkLabel}
                <ArrowRightIcon className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
              </Button>
            </div>
          )}
        </div>

        <Button
          onClick={() => dismissAnnouncement({ id })}
          variant="ghost"
          size="icon"
          className="absolute right-2 rounded-lg text-zinc-700 hover:bg-transparent hover:text-zinc-900 dark:text-zinc-300 dark:hover:bg-transparent dark:hover:text-white"
        >
          <XIcon />
        </Button>
      </div>
    </div>
  );
}
