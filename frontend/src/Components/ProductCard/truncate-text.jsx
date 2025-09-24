import React, { useEffect, useRef } from 'react';

const TruncateText = ({ maxChars, children }) => {
    // Create a ref to hold the reference to the container element
    const containerRef = useRef(null);

    // useEffect hook to truncate text when maxChars changes
    useEffect(() => {
        // Get the container element using the ref
        const container = containerRef.current;
        
        // If container is not available, exit
        if (!container) return;

        // Get the text content of the container and remove leading/trailing whitespace
        const text = container.textContent.trim();
        
        // Check if the text length exceeds the maximum number of characters
        if (text.length > maxChars) {
            // Truncate the text and add '...' to indicate it's truncated
            container.textContent = text.slice(0, maxChars - 3) + '...';
        }
    }, [maxChars]); // Re-run effect when maxChars changes

    // Return a div with the ref and children
    return <div ref={containerRef}>{children}</div>;
};

export default TruncateText;
