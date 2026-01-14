import { Link } from "react-router";
import SectionHeading from "../SectionHeading";
import { collectionConfig } from "../../constants/collection";

function CollectionsSection() {
  return (
    <section>
      <SectionHeading heading={"Collections"} />

      <div className="flex flex-wrap justify-between gap-y-4 px-4 sm:px-0">
        {collectionConfig.map((cl) => (
          <Link key={cl.label} to={`/mutual-funds/collections`} state={cl}>
            <div className="flex flex-col items-center justify-between">
              <div className="collection-card sm:bg-accent flex h-18 w-24 items-center justify-center rounded-2xl transition-transform ease-in-out hover:scale-105 sm:h-20 sm:w-30 sm:shadow">
                <img
                  src={cl.img}
                  alt={`${cl.label} logo`}
                  loading="lazy"
                  className="size-[75%] dark:mix-blend-hard-light"
                />
              </div>
              <p className="sm:text-md mt-1 text-xs sm:mt-3">{cl.label}</p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}

export default CollectionsSection;
