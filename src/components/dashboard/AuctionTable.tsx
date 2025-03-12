
import React from 'react';
import {
  Table,
  TableHeader as UITableHeader
} from "@/components/ui/table";
import { toast } from "sonner";
import { AuctionTableProps } from "./types";
import FilterPanel from "./FilterPanel";
import TablePagination from "./TablePagination";
import AuctionTableHeader from "./AuctionTableHeader";
import AuctionTableHead from './AuctionTableHead';
import AuctionTableBody from './AuctionTableBody';
import { useAuctionTable } from './useAuctionTable';

const AuctionTable = ({ 
  data, 
  onEdit = (id) => toast(`Edit auction ${id}`),
  onDelete = (id) => toast.success(`Auction ${id} deleted`),
  onView = (id) => toast(`View auction ${id}`)
}: AuctionTableProps) => {
  const {
    currentPage,
    itemsPerPage,
    setItemsPerPage,
    sortField,
    sortDirection,
    isLoading,
    highlightedRow,
    lastSortedField,
    selectedRows,
    showFilters,
    setShowFilters,
    expandedRow,
    searchTerm,
    setSearchTerm,
    filteredData,
    currentItems,
    indexOfFirstItem,
    indexOfLastItem,
    totalPages,
    handleSort,
    toggleRowSelection,
    toggleSelectAll,
    toggleRowExpansion,
    handleBulkAction,
    loadMore,
    refreshData,
    exportData,
    paginate,
    nextPage,
    prevPage
  } = useAuctionTable(data);

  return (
    <div className="space-y-4">
      <AuctionTableHeader
        refreshData={refreshData}
        isLoading={isLoading}
        showFilters={showFilters}
        setShowFilters={setShowFilters}
        exportData={exportData}
        selectedRows={selectedRows}
        handleBulkAction={handleBulkAction}
        itemsPerPage={itemsPerPage}
        setItemsPerPage={setItemsPerPage}
        indexOfFirstItem={indexOfFirstItem}
        indexOfLastItem={indexOfLastItem}
        totalItems={filteredData.length}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
      />

      {showFilters && <FilterPanel />}

      <div className="rounded-md border overflow-hidden transition-all hover:shadow-md">
        <Table>
          <UITableHeader className="bg-muted/50">
            <AuctionTableHead 
              sortField={sortField}
              sortDirection={sortDirection}
              handleSort={handleSort}
              toggleSelectAll={toggleSelectAll}
              selectedRows={selectedRows}
              currentItems={currentItems}
            />
          </UITableHeader>
          
          <AuctionTableBody
            currentItems={currentItems}
            selectedRows={selectedRows}
            highlightedRow={highlightedRow}
            sortField={sortField}
            lastSortedField={lastSortedField}
            isLoading={isLoading}
            expandedRow={expandedRow}
            toggleRowSelection={toggleRowSelection}
            toggleRowExpansion={toggleRowExpansion}
            refreshData={refreshData}
            onEdit={onEdit}
            onDelete={onDelete}
            onView={onView}
          />
        </Table>
      </div>

      <TablePagination
        currentPage={currentPage}
        totalPages={totalPages}
        indexOfFirstItem={indexOfFirstItem}
        indexOfLastItem={indexOfLastItem}
        totalItems={filteredData.length}
        itemsPerPage={itemsPerPage}
        setItemsPerPage={setItemsPerPage}
        paginate={paginate}
        nextPage={nextPage}
        prevPage={prevPage}
        loadMore={loadMore}
        isLoading={isLoading}
      />
    </div>
  );
};

export default AuctionTable;
