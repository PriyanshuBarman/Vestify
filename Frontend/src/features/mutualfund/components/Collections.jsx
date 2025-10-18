import { Link } from "react-router";
import SectionHeading from "./SectionHeading";
import { collectionConfig } from "../constants/collectionConstants";

function Collections() {
  return (
    <section>
      <SectionHeading heading={"Collections"} />

      <div className="flex flex-wrap justify-between gap-y-4 px-4 sm:px-0">
        {collectionConfig.map((cl) => (
          <Link key={cl.label} to={`/mutual-funds/collections`} state={cl}>
            <div className="flex flex-col items-center justify-between">
              <div className="Collection-Card sm:bg-accent flex h-18 w-24 items-center justify-center rounded-xl sm:h-20 sm:w-30 sm:shadow">
                <img
                  src={cl.img}
                  alt={`${cl.label} logo`}
                  loading="lazy"
                  className="size-[75%] dark:mix-blend-hard-light"
                />
              </div>
              <p className="text-foreground-secondary mt-1 text-xs sm:mt-3 sm:text-sm">
                {cl.label}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}

export default Collections;
