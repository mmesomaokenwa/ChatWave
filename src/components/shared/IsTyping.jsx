import React, { forwardRef } from 'react'

const IsTyping = forwardRef(({ size = "sm" }, ref) => {
  return (
    <div ref={ref} className="flex gap-2 justify-start dark:bg-gray-800 bg-gray-200 rounded-r-xl rounded-tl-xl w-fit px-4 py-2">
      {[...Array(3)].map((_, index) => (
        <div
          key={index}
          className={`${
            size === "sm" ? "w-2 h-2" : "w-3 h-3"
          } bg-muted-foreground rounded-full animate-bounce`}
          style={{ animationDelay: `${index * 0.2}s` }}
        />
      ))}
    </div>
  );
});

export default IsTyping