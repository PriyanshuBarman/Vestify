import { containerVariants, itemVariants } from "@/constants/animations";
import { ArrowRightIcon } from "lucide-react";
import { motion } from "motion/react";
import { Button } from "../ui/button";
import { Link, useSearchParams } from "react-router";

function FinalCta() {
  const [searchParams] = useSearchParams();
  const referralCode = searchParams.get("referralCode");

  return (
    <motion.section
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      className="w-full pt-12 sm:pt-24"
    >
      <div className="mx-auto flex max-w-7xl flex-col items-center px-4 text-center sm:px-6 md:px-8">
        <motion.p
          variants={itemVariants}
          className="max-w-3xl text-3xl leading-[1.15] font-medium tracking-tight sm:text-4xl md:text-5xl md:leading-[1.1] lg:text-5xl xl:text-[4rem]"
        >
          Learn investing by doing it in a fully <br className="sm:hidden" />
          <span className="text-landing sm:mt-4">virtual environment</span>
        </motion.p>

        <motion.p
          variants={itemVariants}
          className="text-muted-foreground mt-4 text-sm sm:mt-10 sm:text-lg md:mt-12 md:text-xl lg:text-2xl"
        >
          No real money involved. Just a realistic investing experience.
        </motion.p>

        <motion.div variants={itemVariants}>
          <Button
            asChild
            size="lg"
            className="bg-landing mt-6 rounded-full px-8 font-medium sm:mt-14 sm:p-6! sm:text-base"
          >
            <Link
              to={{
                pathname: "/auth",
                search: referralCode && `?referralCode=${referralCode}`,
              }}
            >
              Create Account <ArrowRightIcon size={16} />
            </Link>
          </Button>
        </motion.div>
      </div>
    </motion.section>
  );
}

export default FinalCta;
