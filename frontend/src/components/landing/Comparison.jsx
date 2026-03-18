import { CheckIcon, XIcon } from "lucide-react";
import { motion } from "motion/react";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { comparisonFeatures } from "@/constants/landing/comparison";

import SectionHeading from "./SectionHeading";

const vestifyColStyle = {
  background: "linear-gradient(160deg, #07B561 0%, #04a356 100%)",
};

function Comparison() {
  return (
    <section className="w-full py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 md:px-8">
        <SectionHeading
          subheading="Why Vestify?"
          heading="Everything others offer — and more."
        />

        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.15 }}
          viewport={{ once: true }}
          className="bg-card mt-12 overflow-hidden rounded-2xl border shadow-sm sm:rounded-3xl"
        >
          <Table>
            <TableHeader>
              <TableRow className="hover:bg-transparent">
                <TableHead className="px-5 py-4 text-sm sm:px-8 sm:py-5 sm:text-base">
                  Features
                </TableHead>
                <TableHead className="border-l py-4 text-center text-sm sm:text-base">
                  Others
                </TableHead>
                <TableHead
                  className="text-background py-4 text-center text-sm sm:text-base"
                  style={vestifyColStyle}
                >
                  Vestify
                </TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {comparisonFeatures.map((feature, index) => (
                <TableRow key={index}>
                  <TableCell className="px-5 py-4 whitespace-normal sm:px-8 sm:py-5">
                    <div className="flex items-center gap-3">
                      <span className="sm:bg-muted text-muted-foreground flex size-6 shrink-0 items-center justify-center rounded-lg sm:size-9">
                        <feature.icon className="size-4.5" />
                      </span>
                      <span className="text-foreground text-sm sm:text-base">
                        {feature.label}
                      </span>
                    </div>
                  </TableCell>

                  <TableCell className="border-l px-6 py-4 text-center sm:px-10 sm:py-5">
                    {feature.others ? (
                      <CheckIcon
                        size={18}
                        className="text-foreground mx-auto"
                        strokeWidth={2.5}
                      />
                    ) : (
                      <XIcon
                        size={18}
                        className="text-muted-foreground/60 mx-auto"
                        strokeWidth={2.5}
                      />
                    )}
                  </TableCell>

                  <TableCell
                    className="px-6 py-4 text-center sm:px-10 sm:py-5"
                    style={vestifyColStyle}
                  >
                    <span className="mx-auto flex size-6 items-center justify-center rounded-full bg-white/20 sm:size-7">
                      <CheckIcon
                        size={13}
                        className="text-primary-foreground"
                        strokeWidth={3}
                      />
                    </span>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </motion.div>
      </div>
    </section>
  );
}

export default Comparison;
