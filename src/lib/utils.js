import { clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs) {
  return twMerge(clsx(inputs))
}

export const handleError = (error) => {
  console.error(error);
  throw error;
};

 export const timePast = (date) => {
   const now = new Date();
   const past = new Date(date);
   const diff = now - past;
   const diffDays = Math.floor(diff / (1000 * 3600 * 24));
   const diffHours = Math.floor(diff / (1000 * 3600));
   const diffMinutes = Math.floor(diff / (1000 * 60));
   const diffSeconds = Math.floor(diff / 1000);

   if (diffDays > 0) {
     if (diffDays === 1) return `${diffDays} day ago`;
     return `${diffDays} days ago`;
   }
   if (diffHours > 0) {
     if (diffHours === 1) return `${diffHours} hour ago`;
     return `${diffHours} hours ago`;
   }
   if (diffMinutes > 0) {
     if (diffMinutes === 1) return `${diffMinutes} minute ago`;
     return `${diffMinutes} minutes ago`;
   }
   if (diffSeconds > 0) {
     if (diffSeconds === 1) return `${diffSeconds} second ago`;
     return `${diffSeconds} seconds ago`;
   }
 };

export const timePastShort = (date) => {
  const now = new Date();
  const past = new Date(date);
  const diff = now - past;
  const diffDays = Math.floor(diff / (1000 * 3600 * 24));
  const diffHours = Math.floor(diff / (1000 * 3600));
  const diffMinutes = Math.floor(diff / (1000 * 60));
  const diffSeconds = Math.floor(diff / 1000);
  // Return shortest possible string representation of time difference
  let result = '';
  if (diffDays >= 7 && diffDays < 30) {
    result = `${Math.floor(diffDays / 7)}w`;
  } else if (diffDays >= 30) {
    result = `${Math.floor(diffDays / 30)}m`;
  } else if (diffDays > 0) {
    result = `${diffDays}d`;
  } else if (diffHours > 0) {
    result = `${diffHours}h`;
  } else if (diffMinutes > 0) {
    result = `${diffMinutes}m`;
  } else if (diffSeconds > 0) {
    result = `${diffSeconds}s`;
  }
  return result;
}

export const formatDateString = (dateString) => {
  const options = {
    year: "numeric",
    month: "short",
    day: "numeric",
  };

  const date = new Date(dateString);
  const formattedDate = date.toLocaleDateString("en-US", options);

  const time = date.toLocaleTimeString([], {
    hour: "numeric",
    minute: "2-digit",
  });

  return `${formattedDate} at ${time}`;
}

export const formatNumber = (number) => {
  if (number > 999 && number < 1000000) {
    return (number / 1000).toFixed(1) + "K";
  }
  if (number > 999999) {
    return (number / 1000000).toFixed(1) + "M";
  }
  return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

export const checkIsLiked = (likeList, userId) => {
  return likeList?.includes(userId);
};

export const generateRandomSizes = (count) => {
  const sizes = [];
  for (let i = 0; i < count; i++) {
    // const width = Math.floor(Math.random() * (400 - 200) + 200); // Random width between 200 and 400 pixels
    const height = Math.floor(Math.random() * (500 - 300) + 300); // Random height between 150 and 300 pixels
    sizes.push(height);
  }
  return sizes;
};