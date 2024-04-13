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

export const formatNumber = (number) => {
  if (number > 999 && number < 1000000) {
    return (number / 1000).toFixed(1) + "K";
  }
  if (number > 999999) {
    return (number / 1000000).toFixed(1) + "M";
  }
  return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};
