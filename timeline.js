// Timeline Interactive Functionality
document.addEventListener('DOMContentLoaded', function() {
    // Selectors for key elements
    const timelineDots = document.querySelectorAll('.timeline-dot');
    const timelineEntries = document.querySelectorAll('.timeline-entry');
    
    // Initialize timeline on page load
    initializeTimeline();
    
    // Add event listeners to all interactive elements
    timelineDots.forEach(dot => {
        dot.addEventListener('click', handleDotClick);
    });
    
    timelineEntries.forEach(entry => {
        entry.addEventListener('click', handleEntryClick);
    });
    
    // Add keyboard navigation
    document.addEventListener('keydown', handleKeyboardNavigation);
    
    /**
     * Sets up the initial state of the timeline
     */
    function initializeTimeline() {
        // Collapse all entries
        timelineEntries.forEach(entry => {
            entry.classList.add('collapsed');
        });
        
        // Expand the most recent entries (first experience and education)
        const recentExperience = document.querySelector('.experience-entry:first-child');
        const recentEducation = document.querySelector('.education-entry:first-child');
        
        if (recentExperience) {
            recentExperience.classList.remove('collapsed');
            recentExperience.classList.add('semi-expanded');
        }
        
        if (recentEducation) {
            recentEducation.classList.remove('collapsed');
            recentEducation.classList.add('semi-expanded');
        }
    }
    
    /**
     * Handles clicks on timeline dots
     */
    function handleDotClick(event) {
        const dot = event.currentTarget;
        const targetId = dot.getAttribute('data-entry-id');
        const targetEntry = document.getElementById(targetId);
        
        // Toggle the expansion state of the clicked entry
        toggleEntryState(targetEntry);
        
        // Collapse other entries
        timelineEntries.forEach(entry => {
            if (entry.id !== targetId) {
                entry.classList.remove('expanded');
                entry.classList.add('collapsed');
            }
        });
        
        // Update the active state of dots
        timelineDots.forEach(d => {
            d.classList.toggle('active', d === dot);
        });
        
        // Smooth scroll to the entry
        targetEntry.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
    
    /**
     * Handles clicks on timeline entries
     */
    function handleEntryClick(event) {
        const entry = event.currentTarget;
        
        // Don't trigger if clicking on a link inside the entry
        if (event.target.tagName === 'A') {
            return;
        }
        
        toggleEntryState(entry);
        
        // Update the active state of the corresponding dot
        const entryId = entry.id;
        const correspondingDot = document.querySelector(`.timeline-dot[data-entry-id="${entryId}"]`);
        
        if (correspondingDot) {
            timelineDots.forEach(dot => {
                dot.classList.toggle('active', dot === correspondingDot);
            });
        }
    }
    
    /**
     * Toggles the state of an entry (collapsed, semi-expanded, expanded)
     */
    function toggleEntryState(entry) {
        if (entry.classList.contains('expanded')) {
            // If already expanded, collapse it
            entry.classList.remove('expanded');
            entry.classList.add('collapsed');
        } else if (entry.classList.contains('semi-expanded')) {
            // If semi-expanded, fully expand it
            entry.classList.remove('semi-expanded');
            entry.classList.add('expanded');
        } else {
            // If collapsed, fully expand it
            entry.classList.remove('collapsed');
            entry.classList.add('expanded');
        }
    }
    
    /**
     * Handles keyboard navigation through timeline entries
     */
    function handleKeyboardNavigation(event) {
        // Find the currently active/expanded entry
        const activeEntry = document.querySelector('.timeline-entry.expanded') || 
                          document.querySelector('.timeline-entry.semi-expanded');
        
        if (!activeEntry) return;
        
        const allEntries = Array.from(timelineEntries);
        const currentIndex = allEntries.indexOf(activeEntry);
        let nextIndex;
        
        // Determine which entry to navigate to based on arrow key
        switch (event.key) {
            case 'ArrowUp':
                nextIndex = currentIndex > 0 ? currentIndex - 1 : allEntries.length - 1;
                break;
            case 'ArrowDown':
                nextIndex = currentIndex < allEntries.length - 1 ? currentIndex + 1 : 0;
                break;
            default:
                return; // Exit if not using arrow keys
        }
        
        // Expand the next entry and collapse others
        const nextEntry = allEntries[nextIndex];
        
        allEntries.forEach(entry => {
            if (entry === nextEntry) {
                entry.classList.remove('collapsed', 'semi-expanded');
                entry.classList.add('expanded');
            } else {
                entry.classList.remove('expanded', 'semi-expanded');
                entry.classList.add('collapsed');
            }
        });
        
        // Update dot states
        const nextEntryId = nextEntry.id;
        const nextDot = document.querySelector(`.timeline-dot[data-entry-id="${nextEntryId}"]`);
        
        if (nextDot) {
            timelineDots.forEach(dot => {
                dot.classList.toggle('active', dot === nextDot);
            });
        }
        
        // Scroll the next entry into view
        nextEntry.scrollIntoView({ behavior: 'smooth', block: 'center' });
        
        // Prevent default scrolling behavior
        event.preventDefault();
    }
});