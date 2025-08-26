// Wait for DOM to load
document.addEventListener('DOMContentLoaded', function() {
    // Initialize animations
    initAnimations();
    
    // Handle update button
    initUpdateButton();
    
    // Smooth scroll for navigation
    initSmoothScroll();
    
    // Team card interactions
    initTeamCards();
    
    // Initialize ticker
    initScoreTicker();
    
    // Initialize mascot rotation
    initMascotRotation();
    
    // Initialize news section
    initNews();
    
    // Add intersection observer for fade-in effects
    initIntersectionObserver();
});

// Initialize animations
function initAnimations() {
    // Add stagger animation to team cards
    const teamCards = document.querySelectorAll('.team-card');
    teamCards.forEach((card, index) => {
        card.style.animationDelay = `${index * 0.1}s`;
    });
    
    // Animate hero elements on load
    const heroElements = document.querySelectorAll('.hero-content > *');
    heroElements.forEach((el, index) => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        setTimeout(() => {
            el.style.transition = 'all 0.6s ease-out';
            el.style.opacity = '1';
            el.style.transform = 'translateY(0)';
        }, index * 100);
    });
}

// Handle update button clicks
function initUpdateButton() {
    const updateBtn = document.getElementById('updateScores');
    if (updateBtn) {
        updateBtn.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Add loading animation
            this.classList.add('loading');
            const originalText = this.querySelector('.btn-text').textContent;
            this.querySelector('.btn-text').textContent = 'Updating...';
            
            // Update news articles
            updateNewsArticles();
            
            // Simulate API call
            setTimeout(() => {
                this.classList.remove('loading');
                this.querySelector('.btn-text').textContent = 'Updated!';
                
                // Show success animation
                showUpdateSuccess();
                
                // Reset button text
                setTimeout(() => {
                    this.querySelector('.btn-text').textContent = originalText;
                }, 2000);
            }, 2000);
        });
    }
}

// Show success animation for update
function showUpdateSuccess() {
    // Create success notification
    const notification = document.createElement('div');
    notification.className = 'update-notification';
    notification.innerHTML = `
        <span class="notification-icon">✓</span>
        <span class="notification-text">Info Updated Successfully!</span>
    `;
    
    // Style the notification
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: linear-gradient(135deg, #00ff88, #0085CA);
        color: #0a0a0a;
        padding: 1rem 2rem;
        border-radius: 50px;
        font-weight: 600;
        display: flex;
        align-items: center;
        gap: 0.5rem;
        z-index: 9999;
        animation: slideIn 0.3s ease-out;
        box-shadow: 0 10px 30px rgba(0, 255, 136, 0.3);
    `;
    
    document.body.appendChild(notification);
    
    // Remove notification after 3 seconds
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease-out';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}

// Smooth scroll for navigation links
function initSmoothScroll() {
    const navLinks = document.querySelectorAll('.nav-menu a');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href.startsWith('#')) {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    const offsetTop = target.offsetTop - 80;
                    window.scrollTo({
                        top: offsetTop,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
}

// Team card interactions
function initTeamCards() {
    const teamCards = document.querySelectorAll('.team-card');
    
    teamCards.forEach(card => {
        const detailsBtn = card.querySelector('.team-details-btn');
        
        // Add hover effects
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
        });
        
        // Handle details button click
        if (detailsBtn) {
            detailsBtn.addEventListener('click', function(e) {
                e.preventDefault();
                const teamName = card.querySelector('.team-name').textContent;
                showTeamDetails(teamName);
            });
        }
    });
}

// Show team details modal
function showTeamDetails(teamName) {
    // Create modal
    const modal = document.createElement('div');
    modal.className = 'team-modal';
    modal.innerHTML = `
        <div class="modal-content">
            <button class="modal-close">×</button>
            <h2>${teamName} Details</h2>
            <div class="modal-body">
                <p>Full team roster and statistics will be loaded here.</p>
                <p>This feature will connect to live data sources to provide:</p>
                <ul>
                    <li>Complete season schedule</li>
                    <li>Player statistics</li>
                    <li>Team rankings</li>
                    <li>Recent news and updates</li>
                    <li>Photo galleries</li>
                </ul>
            </div>
        </div>
    `;
    
    // Style the modal
    modal.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.8);
        backdrop-filter: blur(10px);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 10000;
        animation: fadeIn 0.3s ease-out;
    `;
    
    const modalContent = modal.querySelector('.modal-content');
    modalContent.style.cssText = `
        background: linear-gradient(135deg, rgba(26, 26, 26, 0.95), rgba(37, 37, 37, 0.95));
        border: 1px solid rgba(255, 255, 255, 0.1);
        border-radius: 20px;
        padding: 3rem;
        max-width: 600px;
        position: relative;
        animation: slideUp 0.3s ease-out;
        color: white;
    `;
    
    const closeBtn = modal.querySelector('.modal-close');
    closeBtn.style.cssText = `
        position: absolute;
        top: 1rem;
        right: 1rem;
        background: none;
        border: none;
        color: white;
        font-size: 2rem;
        cursor: pointer;
        transition: transform 0.3s ease;
    `;
    
    closeBtn.addEventListener('click', () => {
        modal.style.animation = 'fadeOut 0.3s ease-out';
        setTimeout(() => {
            document.body.removeChild(modal);
        }, 300);
    });
    
    closeBtn.addEventListener('mouseenter', () => {
        closeBtn.style.transform = 'rotate(90deg)';
    });
    
    closeBtn.addEventListener('mouseleave', () => {
        closeBtn.style.transform = 'rotate(0deg)';
    });
    
    document.body.appendChild(modal);
}

// Initialize score ticker
function initScoreTicker() {
    const tickerContent = document.querySelector('.ticker-content');
    if (tickerContent) {
        // Clone ticker content for seamless loop
        const clone = tickerContent.cloneNode(true);
        tickerContent.parentNode.appendChild(clone);
    }
}

// Initialize mascot rotation
function initMascotRotation() {
    const mascots = document.querySelectorAll('.mascot');
    if (mascots.length === 0) return;
    
    let currentIndex = 0;
    
    // Function to rotate to next mascot
    function rotateMascot() {
        // Remove active class from current mascot
        mascots[currentIndex].classList.remove('active');
        
        // Move to next mascot
        currentIndex = (currentIndex + 1) % mascots.length;
        
        // Add active class to new mascot
        mascots[currentIndex].classList.add('active');
        
        // Add a subtle pulse effect when switching
        const newMascot = mascots[currentIndex];
        const emoji = newMascot.querySelector('.mascot-emoji');
        emoji.style.animation = 'none';
        setTimeout(() => {
            emoji.style.animation = 'float-mascot 3s ease-in-out infinite, pulse-in 0.5s ease-out';
        }, 10);
    }
    
    // Start rotation every 3 seconds
    setInterval(rotateMascot, 3000);
    
    // Add hover pause functionality
    const mascotContainer = document.querySelector('.mascot-container');
    let rotationInterval;
    
    if (mascotContainer) {
        mascotContainer.addEventListener('mouseenter', () => {
            // Optional: pause rotation on hover
            // clearInterval(rotationInterval);
        });
        
        mascotContainer.addEventListener('mouseleave', () => {
            // Optional: resume rotation after hover
            // startRotation();
        });
    }
}

// Real news articles from verified sources only
const newsArticles = [
    {
        title: "James Kenan Defeats Wallace-Rose Hill in Overtime Thriller",
        excerpt: "James Kenan won 14-13 in overtime against Wallace-Rose Hill in the third round of the 2A East playoffs.",
        url: "https://www.highschoolot.com/video/how-james-kenan-beat-rival-wallace-rose-hill-in-overtime-in-the-3rd-round-hsot-postgame/21747303/",
        date: "Nov 30, 2024",
        source: "HighSchoolOT",
        category: "PLAYOFFS",
        icon: "🏆",
        featured: true
    },
    {
        title: "East Duplin Falls to West Craven in Playoffs",
        excerpt: "East Duplin's playoff run ended with a 20-36 loss to West Craven in the 2024 NCHSAA Championships.",
        url: "https://www.maxpreps.com/nc/beulaville/east-duplin-panthers/football/",
        date: "Nov 22, 2024",
        source: "MaxPreps",
        category: "PLAYOFFS",
        icon: "🏈"
    },
    {
        title: "East Duplin Defeats St. Pauls 33-13 in Second Round",
        excerpt: "The Panthers advanced in the 2A playoffs with a commanding 33-13 victory over St. Pauls.",
        url: "https://www.maxpreps.com/nc/beulaville/east-duplin-panthers/football/",
        date: "Nov 15, 2024",
        source: "MaxPreps",
        category: "PLAYOFFS",
        icon: "🐾"
    },
    {
        title: "Wallace-Rose Hill Claims Conference Championship",
        excerpt: "Wallace-Rose Hill spoiled James Kenan's perfect season with a 17-14 victory to win the conference title.",
        url: "https://www.highschoolot.com/story/wallace-rose-hill-spoils-james-kenan-s-perfect-season-to-claim-conference-title/21702716/",
        date: "Nov 2, 2024",
        source: "HighSchoolOT",
        category: "CONFERENCE",
        icon: "🎯"
    },
    {
        title: "East Duplin Routs Southwest Onslow 49-20",
        excerpt: "East Duplin dominated Southwest Onslow with a 49-20 victory in regular season play.",
        url: "https://www.maxpreps.com/nc/beulaville/east-duplin-panthers/football/",
        date: "Nov 1, 2024",
        source: "MaxPreps",
        category: "REGULAR SEASON",
        icon: "⚡"
    },
    {
        title: "Wallace-Rose Hill Edges East Duplin 21-15",
        excerpt: "In a crucial conference matchup, Wallace-Rose Hill defeated East Duplin 21-15.",
        url: "https://www.si.com/high-school/stats/north-carolina/football/games/4611013-wallacerose-hill-vs-east-duplin",
        date: "Oct 25, 2024",
        source: "SI High School",
        category: "CONFERENCE",
        icon: "🐕"
    }
];

// Function to update news articles
function updateNewsArticles() {
    const newsGrid = document.getElementById('news-grid');
    if (!newsGrid) return;
    
    // In production, this would fetch from real news APIs
    // For now, rotate through our verified articles
    const shuffled = [...newsArticles].sort(() => Math.random() - 0.5);
    
    // Show different combinations of articles
    const numArticles = Math.min(3, shuffled.length);
    const selectedArticles = shuffled.slice(0, numArticles);
    
    // Clear existing articles
    newsGrid.innerHTML = '';
    
    // Add articles with animation
    selectedArticles.forEach((article, index) => {
        const articleCard = createNewsCard(article, index === 0);
        articleCard.style.opacity = '0';
        articleCard.style.transform = 'translateY(20px)';
        newsGrid.appendChild(articleCard);
        
        // Animate in
        setTimeout(() => {
            articleCard.style.transition = 'all 0.6s ease-out';
            articleCard.style.opacity = '1';
            articleCard.style.transform = 'translateY(0)';
        }, index * 100);
    });
    
    // Add pulse animation to show update
    newsGrid.style.animation = 'pulse 0.5s ease-out';
    setTimeout(() => {
        newsGrid.style.animation = '';
    }, 500);
}

// Function to create a news card element
function createNewsCard(article, isFeatured = false) {
    const card = document.createElement('article');
    card.className = `news-card${isFeatured ? ' featured' : ''}`;
    
    card.innerHTML = `
        <div class="news-image">
            <div class="news-placeholder">
                <span>${article.icon}</span>
            </div>
            <div class="news-category">${article.category}</div>
        </div>
        <div class="news-content">
            <h3 class="news-title">${article.title}</h3>
            <p>${article.excerpt}</p>
            <a href="${article.url}" target="_blank" class="read-more-link">Click to read more</a>
            <div class="news-meta">
                <span class="date">${article.date}</span>
                <span class="source">${article.source}</span>
            </div>
        </div>
    `;
    
    return card;
}

// Initialize news on page load
function initNews() {
    // Load initial real news articles on page load
    const newsGrid = document.getElementById('news-grid');
    if (!newsGrid) return;
    
    // Display all real articles on initial load
    newsArticles.forEach((article, index) => {
        const articleCard = createNewsCard(article, index === 0);
        newsGrid.appendChild(articleCard);
    });
    
    // Add click handlers to news cards
    const newsCards = document.querySelectorAll('.news-card');
    newsCards.forEach(card => {
        card.addEventListener('click', function(e) {
            // If clicking on the card but not on a link, find the read more link and click it
            if (!e.target.closest('a')) {
                const link = this.querySelector('.read-more-link');
                if (link && link.href !== '#') {
                    window.open(link.href, '_blank');
                }
            }
        });
    });
}

// Intersection Observer for fade-in animations
function initIntersectionObserver() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                
                // Add specific animations based on element type
                if (entry.target.classList.contains('stat-card')) {
                    animateStatCard(entry.target);
                }
            }
        });
    }, observerOptions);
    
    // Observe various elements
    const elementsToObserve = document.querySelectorAll(
        '.section-title, .news-card, .conference-card, .game-card'
    );
    
    elementsToObserve.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'all 0.6s ease-out';
        observer.observe(el);
    });
}

// Animate stat cards
function animateStatCard(card) {
    const number = card.querySelector('.stat-number');
    if (number) {
        const finalValue = number.textContent;
        if (!isNaN(finalValue)) {
            let currentValue = 0;
            const increment = Math.ceil(finalValue / 30);
            const timer = setInterval(() => {
                currentValue += increment;
                if (currentValue >= finalValue) {
                    currentValue = finalValue;
                    clearInterval(timer);
                }
                number.textContent = currentValue;
            }, 50);
        }
    }
}

// Add CSS for animations
const style = document.createElement('style');
style.textContent = `
    @keyframes fadeIn {
        from {
            opacity: 0;
        }
        to {
            opacity: 1;
        }
    }
    
    @keyframes fadeOut {
        from {
            opacity: 1;
        }
        to {
            opacity: 0;
        }
    }
    
    @keyframes slideIn {
        from {
            transform: translateX(100%);
        }
        to {
            transform: translateX(0);
        }
    }
    
    @keyframes slideOut {
        from {
            transform: translateX(0);
        }
        to {
            transform: translateX(100%);
        }
    }
    
    @keyframes slideUp {
        from {
            transform: translateY(30px);
            opacity: 0;
        }
        to {
            transform: translateY(0);
            opacity: 1;
        }
    }
    
    .visible {
        opacity: 1 !important;
        transform: translateY(0) !important;
    }
    
    .loading {
        animation: pulse 1s infinite;
    }
    
    @keyframes pulse {
        0%, 100% {
            opacity: 1;
        }
        50% {
            opacity: 0.6;
        }
    }
`;
document.head.appendChild(style);

// Add parallax effect to hero section
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const parallax = document.querySelector('.hero-visual');
    if (parallax) {
        parallax.style.transform = `translateY(${scrolled * 0.5}px)`;
    }
    
    // Add navbar background on scroll
    const navbar = document.querySelector('.navbar');
    if (navbar) {
        if (scrolled > 50) {
            navbar.style.background = 'rgba(10, 10, 10, 0.95)';
        } else {
            navbar.style.background = 'rgba(10, 10, 10, 0.8)';
        }
    }
});

// Add dynamic date/time
function updateDateTime() {
    const now = new Date();
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    const dateString = now.toLocaleDateString('en-US', options);
    
    // You could add this to a specific element if desired
    // For example: document.getElementById('current-date').textContent = dateString;
}

// Initialize date/time update
updateDateTime();
setInterval(updateDateTime, 60000); // Update every minute

// Console message for developers
console.log('%c🏈 Duplin County Football', 'font-size: 24px; font-weight: bold; color: #00ff88;');
console.log('%cBuilt with passion for local sports', 'font-size: 14px; color: #0085CA;');
console.log('%cReady to integrate with live data APIs', 'font-size: 12px; color: #888;');