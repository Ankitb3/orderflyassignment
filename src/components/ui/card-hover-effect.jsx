import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { useState } from "react";
import { ShineBorder } from "./shine-border";
import { PlaceholdersAndVanishInput } from "./placeholders-and-vanish-input";
import { Pagination } from "antd"; // Import Ant Design's Pagination

export const HoverEffect = ({ items, className }) => {
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;
  const placeholders = ["Search By Title"];

  const filteredItems = items.filter((item) =>
    item.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentItems = filteredItems.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  const onSubmit = (e) => {
    e.preventDefault();
    setSearchQuery("");
    console.log("submitted");
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div className={cn("py-10", className)}>
      <PlaceholdersAndVanishInput
        placeholders={placeholders}
        onChange={(e) => setSearchQuery(e.target.value)}
        onSubmit={onSubmit}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-8">
        {currentItems.length > 0 ? (
          currentItems.map((item, idx) => (
            <Link
              href={""}
              key={item?.id}
              className="relative group block p-2 h-full w-full"
              onMouseEnter={() => setHoveredIndex(idx)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              <ShineBorder
                className="relative flex w-full flex-col items-center justify-center overflow-hidden rounded-lg border bg-background md:shadow-xl"
                color={["#A07CFE", "#FE8FB5", "#FFBE7B"]}
              >
                <AnimatePresence>
                  {hoveredIndex === idx && (
                    <motion.span
                      className="absolute inset-0 h-full w-full bg-neutral-200 block rounded-3xl"
                      layoutId="hoverBackground"
                      initial={{ opacity: 0 }}
                      animate={{
                        opacity: 1,
                        transition: { duration: 0.15 },
                      }}
                      exit={{
                        opacity: 0,
                        transition: { duration: 0.15, delay: 0.2 },
                      }}
                    />
                  )}
                </AnimatePresence>
                <Card>
                  <CardTitle>{item.title}</CardTitle>
                  <CardDescription>{item.body}</CardDescription>
                </Card>
              </ShineBorder>
            </Link>
          ))
        ) : (
          <h2 className="text-center z-10 text-lg md:text-4xl  m-2 bg-clip-text text-transparent bg-gradient-to-b from-neutral-200 to-neutral-600 font-sans font-bold">
            Posts Not Found
          </h2>
        )}
      </div>
      <div className="flex justify-center">
        {" "}
        <Pagination
          current={currentPage}
          total={filteredItems.length}
          pageSize={itemsPerPage}
          onChange={handlePageChange}
          showSizeChanger={false}
          className={`${!currentItems && "hidden"}`}
        />
      </div>
    </div>
  );
};

export const Card = ({ className, children }) => {
  return (
    <div
      className={cn(
        "rounded-2xl h-full w-full p-4 overflow-hidden bg-white border border-black border-transparent group-hover:border-slate-700 relative z-20 dark:border-slate-800",
        className
      )}
    >
      <div className="relative z-50">
        <div className="p-4">{children}</div>
      </div>
    </div>
  );
};

export const CardTitle = ({ className, children }) => {
  return (
    <h4 className={cn("font-bold tracking-wide mt-4", className)}>
      {children}
    </h4>
  );
};

export const CardDescription = ({ className, children }) => {
  return (
    <p
      className={cn(
        "mt-8 text-zinc-400 tracking-wide leading-relaxed text-sm",
        className
      )}
    >
      {children}
    </p>
  );
};
