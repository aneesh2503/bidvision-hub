
// Mock auction data
export const auctionItems = [
  {
    id: "1",
    title: "Vintage Camera Collection",
    description: "Rare collection of vintage cameras from the 1950s, including Leica, Rolleiflex, and Hasselblad models. Perfect for collectors and photography enthusiasts.",
    image: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    currentBid: 1200,
    timeLeft: "2 days left",
    bids: 18,
    category: "collectibles",
    condition: "excellent"
  },
  {
    id: "2",
    title: "Abstract Painting",
    description: "Original abstract painting by contemporary artist Sarah Nguyen, acrylic on canvas, 36x48 inches. Vibrant colors and dynamic brushstrokes create a stunning visual impact.",
    image: "https://images.unsplash.com/photo-1515405295579-ba7b45403062?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    currentBid: 850,
    timeLeft: "4 hours left",
    bids: 12,
    category: "art",
    condition: "new"
  },
  {
    id: "3",
    title: "Antique Pocket Watch",
    description: "18k gold pocket watch from the 1890s, Swiss-made with intricate engravings and in working condition. Includes original chain and presentation box.",
    image: "https://images.unsplash.com/photo-1509048191080-d2984bad6ae5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    currentBid: 3200,
    timeLeft: "1 day left",
    bids: 24,
    category: "jewelry",
    condition: "good"
  },
  {
    id: "4",
    title: "First Edition Book Collection",
    description: "Collection of first edition classic novels including works by Hemingway, Fitzgerald, and Steinbeck. All books are in their original dust jackets and have been professionally preserved.",
    image: "https://images.unsplash.com/photo-1524578271613-d550eacf6090?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    currentBid: 950,
    timeLeft: "3 days left",
    bids: 10,
    category: "collectibles",
    condition: "excellent"
  },
  {
    id: "5",
    title: "Mid-Century Modern Chair",
    description: "Original Eames lounge chair and ottoman, 1956, rosewood and black leather, excellent condition. Authenticated with Herman Miller documentation and original labels.",
    image: "https://images.unsplash.com/photo-1551298370-9d3d53740c72?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    currentBid: 4500,
    timeLeft: "12 hours left",
    bids: 28,
    category: "furniture",
    condition: "excellent"
  },
  {
    id: "6",
    title: "Luxury Wristwatch",
    description: "Limited edition Patek Philippe Nautilus, automatic movement, stainless steel, complete with box and papers. Only 500 pieces ever produced, this is number 127/500.",
    image: "https://images.unsplash.com/photo-1523170335258-f5ed11844a49?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    currentBid: 65000,
    timeLeft: "6 days left",
    bids: 42,
    category: "watches",
    condition: "like-new"
  },
  {
    id: "7",
    title: "Vintage Vinyl Collection",
    description: "Rare vinyl record collection including first pressings from The Beatles, Pink Floyd, and Led Zeppelin. Over 200 albums, all in VG+ to NM condition with original sleeves.",
    image: "https://images.unsplash.com/photo-1603024868000-d070dc246d0e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    currentBid: 3800,
    timeLeft: "5 days left",
    bids: 15,
    category: "collectibles",
    condition: "good"
  },
  {
    id: "8",
    title: "Designer Handbag",
    description: "Limited edition Hermès Birkin 30 in Himalayan Niloticus Crocodile with diamond hardware. One of the rarest and most sought-after handbags in the world.",
    image: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    currentBid: 125000,
    timeLeft: "8 days left",
    bids: 6,
    category: "fashion",
    condition: "new"
  },
  {
    id: "9",
    title: "Japanese Samurai Sword",
    description: "Authentic 17th century katana forged by master swordsmith Nagasone Kotetsu. Full tang construction with traditional silk wrapping and ray skin handle. Includes custom stand and certification.",
    image: "https://images.unsplash.com/photo-1547160397-71663a4eb161?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    currentBid: 45000,
    timeLeft: "9 days left",
    bids: 11,
    category: "antiquities",
    condition: "good"
  },
  {
    id: "10",
    title: "Rare Gemstone Collection",
    description: "Museum-quality collection of rare gemstones including a 5-carat Paraiba tourmaline, 3-carat red diamond, and 10-carat Kashmir sapphire. All stones GIA certified.",
    image: "https://images.unsplash.com/photo-1600500395322-7ab9c05ae138?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    currentBid: 175000,
    timeLeft: "7 days left",
    bids: 8,
    category: "jewelry",
    condition: "excellent"
  },
  {
    id: "11",
    title: "Vintage Motorcycle",
    description: "1956 Triumph Bonneville T120, fully restored to original specifications. Matching numbers, complete service history, and winner of multiple concours events.",
    image: "https://images.unsplash.com/photo-1558981806-ec527fa84c39?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    currentBid: 18500,
    timeLeft: "4 days left",
    bids: 20,
    category: "vehicles",
    condition: "excellent"
  },
  {
    id: "12",
    title: "Gaming Console Bundle",
    description: "Limited Edition PlayStation 5 Pro with custom artwork, 5 controllers, and 20 premium games. Includes 4K gaming monitor and high-end gaming headset.",
    image: "https://images.unsplash.com/photo-1605901309584-818e25960a8f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    currentBid: 1950,
    timeLeft: "2 days left",
    bids: 31,
    category: "electronics",
    condition: "like-new"
  }
];
