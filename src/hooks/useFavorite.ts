
import { useState, useEffect } from 'react';
import { toast } from "sonner";

export const useFavorite = (id: string) => {
  const [liked, setLiked] = useState(false);
  
  // Check if the item is in favorites when component mounts
  useEffect(() => {
    const savedFavorites = localStorage.getItem('favorites');
    if (savedFavorites) {
      const parsedFavorites = JSON.parse(savedFavorites);
      setLiked(parsedFavorites.includes(id));
    }
  }, [id]);
  
  const handleLike = (e: React.MouseEvent) => {
    // Prevent click from propagating to the card
    e.stopPropagation();
    
    const newLikedState = !liked;
    setLiked(newLikedState);
    
    // Update localStorage
    const savedFavorites = localStorage.getItem('favorites');
    const favorites = savedFavorites ? JSON.parse(savedFavorites) : [];
    
    if (newLikedState) {
      // Add to favorites
      if (!favorites.includes(id)) {
        favorites.push(id);
        toast.success("Added to favorites");
      }
    } else {
      // Remove from favorites
      const updatedFavorites = favorites.filter((itemId: string) => itemId !== id);
      toast("Removed from favorites");
      localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
      return;
    }
    
    localStorage.setItem('favorites', JSON.stringify(favorites));
  };

  return { liked, handleLike };
};
