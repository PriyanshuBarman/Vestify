import { demoUsers } from "@/constants/community";
import { useUserCount } from "@/hooks/useGetUserCount";
import { useIsMobile } from "@/hooks/useIsMobile";
import { cn } from "@/lib/utils";
import { TrendingUpIcon } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";
import {
  Avatar,
  AvatarFallback,
  AvatarGroup,
  AvatarGroupCount,
  AvatarImage,
} from "../ui/avatar";
import { Separator } from "../ui/separator";
function Community({ className }) {
  const isMobile = useIsMobile();
  const [activeIndex, setActiveIndex] = useState(0);
  const { data: userCount = 99 } = useUserCount();

  // Auto-rotate cards on mobile
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % demoUsers.length);
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  return (
    <motion.section
      className={cn(
        "flex w-full max-w-6xl flex-col items-center px-4 sm:px-8",
        className,
      )}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      variants={containerVariants}
    >
      {/* Header & Description */}
      <div className="flex flex-col items-center text-center">
        <motion.h2
          className="mt-3 max-w-[20ch] text-2xl leading-snug font-[550] sm:max-w-[24ch] sm:text-5xl sm:leading-tight sm:font-semibold sm:tracking-tight"
          variants={itemVariants}
        >
          See Others Performance{" "}
        </motion.h2>
        <motion.p
          className="text-muted-foreground mt-4 flex max-w-md items-center text-sm sm:mt-5 sm:text-base"
          variants={itemVariants}
        >
          Explore other user's investments
          {!isMobile && (
            <>
              <Separator
                orientation="vertical"
                className="bg-muted-foreground mx-2 rotate-15 data-[orientation=vertical]:h-6"
              />
              Join with{" "}
              <span className="mx-1 text-[1.1em] font-semibold text-[#00b35c]">
                {userCount}+
              </span>
              investors
            </>
          )}
        </motion.p>
      </div>

      <div className="mt-8 w-full sm:mt-16">
        {isMobile ? (
          <div className="flex flex-col items-center sm:hidden">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, filter: "blur(8px)" }}
              whileInView={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              viewport={{ once: true }}
            >
              <AvatarGroup>
                {demoUsers.map((user) => (
                  <Avatar key={user.username} className="size-11">
                    <AvatarImage src={user.avatar} alt={user.name} />
                    <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                ))}
                <AvatarGroupCount className="text-foreground size-11 tabular-nums">
                  +{userCount}
                </AvatarGroupCount>
              </AvatarGroup>
            </motion.div>

            <motion.p
              className="text-muted-foreground mt-4 text-sm"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              viewport={{ once: true }}
            >
              Join with{" "}
              <span className="text-foreground font-semibold">
                {userCount}+
              </span>{" "}
              investors
            </motion.p>

            {/* Auto-rotating card */}
            <motion.div
              className="relative mt-8 h-full w-full max-w-sm overflow-x-hidden"
              viewport={{ once: true }}
              initial={{ opacity: 0, scale: 0.95, filter: "blur(8px)" }}
              whileInView={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeIndex}
                  className="bg-card rounded-3xl border p-4.5"
                  initial={{ opacity: 0, x: 40, scale: 0.95 }}
                  animate={{ opacity: 1, x: 0, scale: 1 }}
                  exit={{ opacity: 0, x: -40, scale: 0.95 }}
                  transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                >
                  <div className="flex items-center gap-3">
                    <img
                      src={demoUsers[activeIndex].avatar}
                      alt={demoUsers[activeIndex].name}
                      className="bg-muted size-12 rounded-full object-cover"
                    />
                    <div className="flex-1">
                      <p className="font-medium">
                        {demoUsers[activeIndex].name}
                      </p>
                      <p className="text-muted-foreground text-sm">
                        @{demoUsers[activeIndex].username}
                      </p>
                    </div>
                    <div className="text-md flex items-center gap-1">
                      <TrendingUpIcon className="size-4" />
                      <span className="font-medium">
                        {demoUsers[activeIndex].returnPercent}%
                      </span>
                    </div>
                  </div>
                  <div className="mt-8 flex items-center gap-2 border-t pt-4.5">
                    <div className="flex text-[0.8rem]">
                      <div className="flex items-center gap-2">
                        <span>Funds</span>
                        <span className="font-medium">
                          {demoUsers[activeIndex].funds}
                        </span>
                      </div>
                      <Separator
                        orientation="vertical"
                        className="bg-muted-foreground mx-2 rotate-15 data-[orientation=vertical]:h-6"
                      />
                      <div className="flex items-center gap-2">
                        <span>SIPs</span>
                        <span className="font-medium">
                          {demoUsers[activeIndex].sips}
                        </span>
                      </div>
                    </div>
                    <span className="ml-auto font-medium tabular-nums">
                      ₹
                      {(demoUsers[activeIndex].totalInvested / 1000).toFixed(0)}
                      K
                    </span>
                  </div>
                </motion.div>
              </AnimatePresence>
            </motion.div>

            {/* Progress dots */}
            <motion.div
              className="mt-6 flex gap-2"
              viewport={{ once: true }}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            >
              {demoUsers.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setActiveIndex(index)}
                  className={cn(
                    "h-1.5 rounded-full transition-all duration-300",
                    activeIndex === index
                      ? "w-6 bg-[#00b35c]"
                      : "bg-muted-foreground/30 w-1.5",
                  )}
                />
              ))}
            </motion.div>
          </div>
        ) : (
          <motion.div
            className="hidden sm:block"
            initial={{ opacity: 0, filter: "blur(8px)" }}
            whileInView={{ opacity: 1, filter: "blur(0px)" }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="flex gap-6 lg:gap-12">
              {/* Left: Large featured card - auto rotating */}
              <motion.div
                className="min-h-[300px relative flex-1"
                initial={{ opacity: 0, scale: 0.95, filter: "blur(8px)" }}
                whileInView={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              >
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeIndex}
                    className="bg-card absolute inset-0 rounded-3xl border p-6 lg:p-8"
                    initial={{ opacity: 0, x: -30, scale: 0.98 }}
                    animate={{ opacity: 1, x: 0, scale: 1 }}
                    exit={{ opacity: 0, x: 30, scale: 0.98 }}
                    transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <div className="flex items-center gap-5 lg:gap-6">
                      <motion.img
                        src={demoUsers[activeIndex].avatar}
                        alt={demoUsers[activeIndex].name}
                        className="bg-muted size-20 rounded-full object-cover lg:size-24"
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{
                          delay: 0.1,
                          type: "spring",
                          stiffness: 300,
                        }}
                      />
                      <div className="flex-1">
                        <motion.h3
                          className="text-xl font-semibold lg:text-2xl"
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.15 }}
                        >
                          {demoUsers[activeIndex].name}
                        </motion.h3>
                        <motion.p
                          className="text-muted-foreground text-base lg:text-lg"
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.2 }}
                        >
                          @{demoUsers[activeIndex].username}
                        </motion.p>
                      </div>
                      <motion.div
                        className="flex items-center gap-2 text-xl lg:text-2xl"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{
                          delay: 0.2,
                          type: "spring",
                          stiffness: 300,
                        }}
                      >
                        <TrendingUpIcon className="text-positive size-6 lg:size-7" />
                        <span className="font-semibold">
                          {demoUsers[activeIndex].returnPercent}%
                        </span>
                      </motion.div>
                    </div>
                    <motion.div
                      className="mt-8 flex items-center gap-4 border-t pt-6 lg:mt-10 lg:pt-8"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 }}
                    >
                      <div className="flex">
                        <div className="flex items-center gap-3">
                          <span className="font-medium">Funds</span>
                          <span className="text-xl font-semibold">
                            {demoUsers[activeIndex].funds}
                          </span>
                        </div>
                        <Separator
                          orientation="vertical"
                          className="bg-muted-foreground mx-4 rotate-15 data-[orientation=vertical]:h-7 lg:mx-5 lg:data-[orientation=vertical]:h-8"
                        />
                        <div className="flex items-center gap-3">
                          <span className="font-medium">SIPs</span>
                          <span className="text-xl font-semibold">
                            {demoUsers[activeIndex].sips}
                          </span>
                        </div>
                      </div>
                      <div className="ml-auto space-x-3">
                        <span className="italic">Invested</span>
                        <span className="text-3xl font-semibold tabular-nums">
                          ₹
                          {(
                            demoUsers[activeIndex].totalInvested / 1000
                          ).toFixed(0)}
                          K
                        </span>
                      </div>
                    </motion.div>
                  </motion.div>
                </AnimatePresence>
              </motion.div>

              {/* /* Right: Stacked smaller cards */}
              <motion.div
                className="flex w-72 flex-col gap-6 lg:w-md"
                initial={{ opacity: 0, scale: 0.95, filter: "blur(8px)" }}
                whileInView={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              >
                {demoUsers.map((user, index) => (
                  <motion.div
                    key={user.username}
                    className={cn(
                      "bg-card group cursor-pointer rounded-2xl border p-4 transition-all",
                      activeIndex === index
                        ? "ring-foreground ring-1"
                        : "hover:-translate-y-0.5 hover:shadow-md",
                    )}
                    initial={{ opacity: 0, scale: 0.95, filter: "blur(8px)" }}
                    whileInView={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                    viewport={{ once: true }}
                    transition={{
                      duration: 0.8,
                      delay: index * 0.1,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                    onClick={() => setActiveIndex(index)}
                  >
                    <div className="flex items-center gap-3">
                      <Avatar className="size-12">
                        <AvatarImage src={user.avatar} alt={user.name} />
                        <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div className="min-w-0 flex-1">
                        <p className="truncate font-semibold transition-colors">
                          {user.name}
                        </p>
                        <p className="text-muted-foreground truncate text-sm">
                          @{user.username}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-[hsl(var(--chart-2))] tabular-nums">
                          +{user.returnPercent}%
                        </p>
                        <p className="text-muted-foreground text-sm tabular-nums">
                          ₹{(user.totalInvested / 1000).toFixed(0)}K
                        </p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </motion.div>
        )}
      </div>
    </motion.section>
  );
}

export default Community;
