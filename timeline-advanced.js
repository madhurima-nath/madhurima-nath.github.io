// Advanced Timeline Features
document.addEventListener('DOMContentLoaded', function() {
    // Initialize the skill visualization system
    initializeSkillVisualizations();
    
    // Set up lazy loading for expanded content
    setupLazyLoading();
    
    // Handle responsive behavior
    setupResponsiveBehavior();
    
    /**
     * Sets up the skill visualization system
     * Shows each skill only when first acquired, with visual connectors to subsequent positions
     */
    function initializeSkillVisualizations() {
        // Get all skills across all entries
        const allSkills = {};
        const skillElements = document.querySelectorAll('.skill-tag');
        
        // First pass: identify where each skill first appears
        skillElements.forEach(skillElement => {
            const skill = skillElement.getAttribute('data-skill');
            const entryId = skillElement.closest('.timeline-entry').id;
            const entryTimestamp = parseInt(document.getElementById(entryId).getAttribute('data-timestamp'));
            
            if (!allSkills[skill] || entryTimestamp < allSkills[skill].timestamp) {
                allSkills[skill] = {
                    timestamp: entryTimestamp,
                    firstElement: skillElement,
                    occurrences: allSkills[skill] ? [...allSkills[skill].occurrences, skillElement] : [skillElement]
                };
            } else if (allSkills[skill]) {
                allSkills[skill].occurrences.push(skillElement);
            }
        });
        
        // Second pass: only show skills at their first appearance, hide others
        Object.keys(allSkills).forEach(skill => {
            const skillInfo = allSkills[skill];
            
            skillInfo.occurrences.forEach(element => {
                if (element !== skillInfo.firstElement) {
                    // Replace with a reference indicator instead of duplicating
                    const referenceIndicator = document.createElement('span');
                    referenceIndicator.classList.add('skill-reference');
                    referenceIndicator.setAttribute('data-original-skill', skill);
                    referenceIndicator.innerHTML = `<i class="fas fa-link"></i> ${skill}`;
                    
                    // Replace the original skill tag with the reference
                    element.parentNode.replaceChild(referenceIndicator, element);
                } else {
                    // Mark as first occurrence
                    element.classList.add('first-occurrence');
                }
            });
        });
        
        // Add event listeners for skill highlighting
        document.querySelectorAll('.skill-tag, .skill-reference').forEach(element => {
            element.addEventListener('mouseenter', highlightRelatedSkills);
            element.addEventListener('mouseleave', removeSkillHighlight);
        });
    }
    
    /**
     * Highlights all occurrences of the same skill
     */
    function highlightRelatedSkills(event) {
        const element = event.currentTarget;
        const skill = element.getAttribute('data-skill') || element.getAttribute('data-original-skill');
        
        // Highlight all occurrences of this skill
        document.querySelectorAll(`[data-skill="${skill}"], [data-original-skill="${skill}"]`).forEach(el => {
            el.classList.add('highlighted');
        });
    }
    
    /**
     * Removes highlighting from skills
     */
    function removeSkillHighlight() {
        document.querySelectorAll('.skill-tag.highlighted, .skill-reference.highlighted').forEach(el => {
            el.classList.remove('highlighted');
        });
    }
    
    /**
     * Sets up lazy loading for detailed content
     */
    function setupLazyLoading() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const contentContainer = entry.target;
                    const detailedContent = contentContainer.querySelector('.detailed-content');
                    
                    // If content not yet loaded and entry is expanded
                    if (detailedContent && 
                        !detailedContent.hasAttribute('data-loaded') && 
                        contentContainer.closest('.timeline-entry').classList.contains('expanded')) {
                        
                        // Simulate loading detailed content (in a real app, this might be an AJAX call)
                        detailedContent.classList.add('loading');
                        
                        setTimeout(() => {
                            detailedContent.classList.remove('loading');
                            detailedContent.setAttribute('data-loaded', 'true');
                        }, 300); // Short timeout to simulate loading
                    }
                }
            });
        }, { threshold: 0.1 });
        
        // Observe all content containers
        document.querySelectorAll('.content-container').forEach(container => {
            observer.observe(container);
        });
    }
    
    /**
     * Sets up responsive behavior for different screen sizes
     */
    function setupResponsiveBehavior() {
        const timeline = document.querySelector('.timeline-container');
        
        // Function to adjust layout based on screen size
        function adjustLayout() {
            if (window.innerWidth < 768) {
                // Mobile view - stack all entries to one side
                timeline.classList.add('mobile-view');
            } else {
                // Desktop view - alternating sides
                timeline.classList.remove('mobile-view');
            }
        }
        
        // Initial call
        adjustLayout();
        
        // Add resize listener
        window.addEventListener('resize', adjustLayout);
    }
});