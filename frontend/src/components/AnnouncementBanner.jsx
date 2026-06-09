import { CircleAlert } from "lucide-react";
import { useNavigate } from "react-router";

import { useDismisAnnouncement } from "@/hooks/useDismisAnnouncement";
import { useGetAnnouncements } from "@/hooks/useGetAnnouncements";
import {
  Banner,
  BannerAction,
  BannerClose,
  BannerIcon,
  BannerTitle,
} from "@/components/kibo-ui/banner";

function AnnouncementBanner() {
  const navigate = useNavigate();
  const { data: announcements, isPending } = useGetAnnouncements();
  const { mutate: dismissAnnouncement } = useDismisAnnouncement();

  const handleLinkClick = (linkUrl) => {
    if (linkUrl.startsWith("https://")) {
      return window.open(linkUrl, "_blank");
    }
    navigate(linkUrl);
  };

  if (isPending) return null;

  return (
    <div className="flex flex-col gap-2">
      {announcements.map((announcement) => (
        <Banner key={announcement.id}>
          <BannerIcon icon={CircleAlert} />
          <BannerTitle>{announcement.message}</BannerTitle>
          {announcement.linkUrl && (
            <BannerAction
              onClick={() => handleLinkClick(announcement.linkUrl)}
              className="bg-background! dark:bg-background!  text-foreground! rounded-lg font-normal"
            >
              {announcement.linkLabel || "Learn More"}
            </BannerAction>
          )}
          <BannerClose
            size="icon-sm"
            onClick={() => dismissAnnouncement({ id: announcement.id })}
          />
        </Banner>
      ))}
    </div>
  );
}

export default AnnouncementBanner;
