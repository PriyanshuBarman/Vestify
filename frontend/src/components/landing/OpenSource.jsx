import { GithubLogoIcon } from "@phosphor-icons/react";
import { CodeXmlIcon } from "lucide-react";
import { motion } from "motion/react";

import { containerVariants, itemVariants } from "@/constants/animations";

import { Button } from "../ui/button";

function OpenScource() {
  return (
    <motion.section
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      className="w-full py-12 sm:py-24"
    >
      <div className="mx-auto flex max-w-7xl flex-col items-center px-4 text-center sm:px-6 md:px-8">
        <motion.div variants={itemVariants}>
          <CodeXmlIcon className="size-8 sm:size-16" />
        </motion.div>
        <motion.h2
          variants={itemVariants}
          className="mt-4 text-center text-[1.6rem] font-medium tracking-tighter sm:text-4xl md:text-6xl"
        >
          Free and Open Source
        </motion.h2>

        <motion.div variants={itemVariants}>
          <Button
            asChild
            size="lg"
            variant="secondary"
            className="mt-6 rounded-full px-8 font-medium sm:mt-14 sm:p-6! sm:text-base"
          >
            <a
              href="https://github.com/priyanshubarman/vestify"
              target="_blank"
              rel="noopener noreferrer"
            >
              <GithubLogoIcon className="size-5" />
              Star Us On Github
            </a>
          </Button>
        </motion.div>
      </div>
    </motion.section>
  );
}

export default OpenScource;
