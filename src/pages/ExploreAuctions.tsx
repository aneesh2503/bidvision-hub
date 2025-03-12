
import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { auctionItems } from '@/data/auctionItems';

import PageHeader from '@/components/explore/PageHeader';
import FilterBar from '@/components/explore/FilterBar';
import FilterPanel from '@/components/explore/FilterPanel';
import AuctionGridView from '@/components/explore/AuctionGridView';
import AuctionListView from '@/components/explore/AuctionListView';
import NoResults from '@/components/explore/NoResults';
import ResultsSummary from '@/components/explore/ResultsSummary';
import useAuctionFilters from '@/components/explore/useAuctionFilters';

const ExploreAuctions = () => {
  const {
    searchTerm,
    setSearchTerm,
    view,
    setView,
    showFilters,
    setShowFilters,
    priceRange,
    setPriceRange,
    selectedCategories,
    categories,
    toggleCategory,
    filteredItems,
    resetFilters
  } = useAuctionFilters(auctionItems);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
        <div className="bg-muted/30 py-10">
          <div className="container mx-auto px-4">
            <PageHeader 
              title="Explore Our Auctions"
              description="Discover a wide range of exclusive items available for bidding right now"
            />
            
            <FilterBar 
              searchTerm={searchTerm}
              setSearchTerm={setSearchTerm}
              showFilters={showFilters}
              setShowFilters={setShowFilters}
              view={view}
              setView={setView}
            />
            
            {showFilters && (
              <FilterPanel 
                priceRange={priceRange}
                setPriceRange={setPriceRange}
                selectedCategories={selectedCategories}
                toggleCategory={toggleCategory}
                categories={categories}
              />
            )}
          </div>
        </div>

        <div className="container mx-auto px-4 py-10">
          <ResultsSummary count={filteredItems.length} />

          {filteredItems.length === 0 ? (
            <NoResults resetFilters={resetFilters} />
          ) : view === 'grid' ? (
            <AuctionGridView items={filteredItems} />
          ) : (
            <AuctionListView items={filteredItems} />
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ExploreAuctions;
