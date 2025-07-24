import React from "react";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "./ui/pagination";

interface TablePaginationProps {}

const TablePagination: React.FC<TablePaginationProps> = ({}) => {
  const setPage = (_pageNumber: number) => {};
  const pageData = {
    pageSize: 10,
    hasNextPage: true,
    hasPreviousPage: false,
    currentPage: 1,
    totalCount: 0,
    totalPages: 0,
  };

  return (
    <footer className="flex justify-center">
      <Pagination className="mt-4">
        <PaginationContent>
          {pageData.hasPreviousPage && (
            <PaginationItem>
              <PaginationPrevious
                onClick={() => setPage(pageData.currentPage - 1)}
              />
            </PaginationItem>
          )}
          {pageData.currentPage - 3 >= 1 && (
            <PaginationItem>
              <PaginationEllipsis
                onClick={() => setPage(pageData.currentPage - 3)}
              />
            </PaginationItem>
          )}
          {pageData.hasPreviousPage && (
            <PaginationItem
              className="text-primary"
              onClick={() => setPage(pageData.currentPage - 1)}
            >
              <PaginationLink>{pageData.currentPage - 1}</PaginationLink>
            </PaginationItem>
          )}
          <PaginationItem>
            <PaginationLink className="text-primary" isActive>
              {pageData.currentPage}
            </PaginationLink>
          </PaginationItem>
          {pageData.hasNextPage &&
            pageData.currentPage <= pageData.totalPages && (
              <PaginationItem onClick={() => setPage(pageData.currentPage + 1)}>
                <PaginationLink>{pageData.currentPage + 1}</PaginationLink>
              </PaginationItem>
            )}
          {pageData.currentPage + 3 < pageData.totalPages && (
            <PaginationItem>
              <PaginationEllipsis
                onClick={() => setPage(pageData.currentPage + 3)}
              />
            </PaginationItem>
          )}
          {pageData.currentPage + 1 < pageData.totalPages && (
            <PaginationItem>
              <PaginationNext
                title="Suivant"
                onClick={() => setPage(pageData.currentPage + 1)}
              />
            </PaginationItem>
          )}
        </PaginationContent>
      </Pagination>
    </footer>
  );
};

export default TablePagination;
