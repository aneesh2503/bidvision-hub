
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import LiveAuctionRoom from '@/components/live-auction/LiveAuctionRoom';
import AvailableLiveAuctions from '@/components/live-auction/AvailableLiveAuctions';
import PageHeader from '@/components/explore/PageHeader';

const LiveAuctions = () => {
  const { roomId } = useParams();
  
  // If a roomId is provided, show the auction room, otherwise show available rooms
  return (
    <main className="container mx-auto px-4 py-8">
      {roomId ? (
        <LiveAuctionRoom roomId={roomId} />
      ) : (
        <>
          <PageHeader 
            title="Live Auctions" 
            description="Join an ongoing live auction or view upcoming events. Experience the excitement of bidding in real-time with other collectors." 
          />
          <AvailableLiveAuctions />
        </>
      )}
    </main>
  );
};

export default LiveAuctions;
