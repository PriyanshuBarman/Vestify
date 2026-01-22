import { Sheet, SheetContent, SheetHeader } from "@/components/ui/sheet";
import { XIcon } from "lucide-react";
import { Link, useNavigate } from "react-router";
import ThemeChangeButton from "../ThemeChangeButton";
import { Button } from "../ui/button";
import { sheetMenues } from "@/constants/sheet";
import { motion } from "motion/react";

function SidebarSheet({ open, onOpenChange }) {
  const navigate = useNavigate();
  const handleNavClick = (link) => {
    navigate(link);
    onOpenChange(false);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -30 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.4,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  const themeVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        delay: 0.5,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="w-[80%] [&>button]:hidden">
        <SheetHeader>
          <Button
            size="icon"
            className="animate-in zoom-in spin-in fade-in text-foreground ml-auto rounded-full bg-[#] p-5 shadow-none delay-200 duration-300"
            onClick={() => onOpenChange(false)}
          >
            <XIcon className="size-8 stroke-[1.5px]" />
          </Button>
        </SheetHeader>
        <motion.div
          className="flex h-full flex-col gap-4 px-4"
          initial="hidden"
          animate={open ? "visible" : "hidden"}
          variants={containerVariants}
        >
          {sheetMenues.map((nav, index) => (
            <motion.div key={nav.link} variants={itemVariants}>
              <Button
                onClick={() => handleNavClick(nav.link)}
                variant="link"
                className="text-foreground flex w-full justify-start text-start text-xl font-[450]"
              >
                {nav.name}
              </Button>
            </motion.div>
          ))}
          <motion.div
            className="mt-auto mb-4 text-sm"
            initial="hidden"
            animate={open ? "visible" : "hidden"}
            variants={themeVariants}
          >
            <h6 className="text-2xs mb-2 ml-2 tracking-wider">APPEARENCE</h6>

            <ThemeChangeButton />
          </motion.div>
        </motion.div>
      </SheetContent>
    </Sheet>
  );
}
export default SidebarSheet;
