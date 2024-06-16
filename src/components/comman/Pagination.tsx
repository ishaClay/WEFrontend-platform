import clsx from "clsx";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "../ui/button";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
} from "../ui/pagination";

interface PaginationsProps {
  className?: string;
  page: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
  totalPages: number;
}
const Paginations = ({
  className,
  page,
  setPage,
  totalPages,
}: PaginationsProps) => {
  const handlePrevPage = () => {
    setPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  const handleNextPage = () => {
    setPage((prevPage) => Math.min(prevPage + 1, totalPages));
  };
  const renderPageLinks = () => {
    const range = 1;
    let startIndex = Math.max(1, page - range);
    let endIndex = Math.min(totalPages, page + range);

    if (endIndex - startIndex < 2 * range) {
      if (startIndex === 1) {
        endIndex = Math.min(totalPages, startIndex + 2 * range);
      } else {
        startIndex = Math.max(1, endIndex - 2 * range);
      }
    }

    const pages = Array.from(
      { length: endIndex - startIndex + 1 },
      (_, index) => index + startIndex
    );

    return pages.map((pageNumber) => (
      <PaginationItem key={pageNumber}>
        <PaginationLink
          href="#"
          onClick={() => setPage(pageNumber)}
          isActive={pageNumber === page}
          className={clsx(
            "h-[32px] w-[40px] rounded-[7px] text-black hover:bg-primary border hover:text-primary-foreground font-normal",
            { "bg-primary text-white": pageNumber === page }
          )}
        >
          {pageNumber}
        </PaginationLink>
      </PaginationItem>
    ));
  };

  return (
    <div className={clsx("space-x-2", className)}>
      <Pagination>
        <PaginationContent className="text-destructive">
          <PaginationItem>
            <Button
              variant="ghost"
              size="sm"
              onClick={handlePrevPage}
              disabled={page === 1}
              className="h-[32px] w-[40px] p-0 text-black hover:bg-primary border hover:text-primary-foreground font-normal"
            >
              <ChevronLeft width={18} height={18} />
            </Button>
          </PaginationItem>

          {renderPageLinks()}
          <PaginationItem>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleNextPage}
              disabled={page === totalPages}
              className="h-[32px] w-[40px] p-0 text-black hover:bg-primary border hover:text-primary-foreground font-normal"
            >
              <ChevronRight width={18} height={18} />
            </Button>
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
};

export default Paginations;
