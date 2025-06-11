// script.js
document.addEventListener('DOMContentLoaded', function() {
    // ========== SEARCH FUNCTIONALITY ==========
    const initSearch = () => {
        const searchInput = document.querySelector('.search-bar input');
        if (!searchInput) return;

        searchInput.addEventListener('keyup', function(e) {
            if (e.key === 'Enter') {
                const searchTerm = this.value.trim();
                if (searchTerm) {
                    // In a real app, you would make an API call here
                    console.log(`Search initiated for: ${searchTerm}`);
                    displaySearchResults(searchTerm);
                } else {
                    showToast('Please enter a search term');
                }
            }
        });
    };

    // ========== IMAGE GALLERY MODAL ==========
    const initImageGallery = () => {
        const galleryImages = document.querySelectorAll('.photo img');
        if (!galleryImages.length) return;

        galleryImages.forEach(img => {
            img.addEventListener('click', function() {
                createImageModal(this.src, this.alt);
            });
        });
    };

    // ========== FORM HANDLERS ==========
    const initForms = () => {
        // Login Form
        const loginButton = document.querySelector('.login button');
        if (loginButton) {
            loginButton.addEventListener('click', handleLogin);
        }

        // Contact Form
        const contactForm = document.getElementById('contactForm');
        if (contactForm) {
            contactForm.addEventListener('submit', handleContactSubmit);
        }

        // Newsletter Form
        const newsletterButton = document.querySelector('.newsletter button');
        if (newsletterButton) {
            newsletterButton.addEventListener('click', handleNewsletter);
        }

        // Story Cards
        document.querySelectorAll('.read-more').forEach(button => {
            button.addEventListener('click', handleReadMore);
        });
    };

    // ========== HELPER FUNCTIONS ==========
    const createImageModal = (imgSrc, imgAlt) => {
        const modal = document.createElement('div');
        modal.className = 'image-modal';
        modal.innerHTML = `
            <div class="modal-content">
                <span class="close">&times;</span>
                <img src="${imgSrc}" alt="${imgAlt || 'Enlarged view'}">
                <div class="image-info">
                    <h3>Artisan Story</h3>
                    <p>Details about this craft would appear here</p>
                    <button class="btn-details">View Full Story</button>
                </div>
            </div>
        `;
        document.body.appendChild(modal);
        document.body.style.overflow = 'hidden'; // Prevent scrolling
        
        // Close handlers
        modal.querySelector('.close').addEventListener('click', () => closeModal(modal));
        modal.addEventListener('click', (e) => {
            if (e.target === modal) closeModal(modal);
        });
        
        // View details button
        modal.querySelector('.btn-details')?.addEventListener('click', () => {
            // In a real app, navigate to story page
            console.log('Navigating to full story');
            closeModal(modal);
        });
    };

    const closeModal = (modal) => {
        modal.classList.add('fade-out');
        setTimeout(() => {
            modal.remove();
            document.body.style.overflow = '';
        }, 300);
    };

    const handleLogin = () => {
        const email = document.querySelector('.login input')?.value.trim();
        if (email && validateEmail(email)) {
            // Simulate API call
            simulateAPICall('/login', { email })
                .then(() => showToast('Login link sent to your email!'))
                .catch(() => showToast('Failed to send login link', 'error'));
        } else {
            showToast('Please enter a valid email', 'error');
        }
    };

    const handleContactSubmit = (e) => {
        e.preventDefault();
        
        const formData = {
            name: document.getElementById('name').value.trim(),
            email: document.getElementById('email').value.trim(),
            subject: document.getElementById('subject').value,
            message: document.getElementById('message').value.trim()
        };

        if (!formData.name || !formData.message || !validateEmail(formData.email)) {
            showToast('Please fill all required fields correctly', 'error');
            return;
        }

        // Simulate form submission
        simulateAPICall('/contact', formData)
            .then(() => {
                showToast(`Thank you, ${formData.name}! We'll respond soon.`);
                e.target.reset();
            })
            .catch(() => showToast('Message failed to send', 'error'));
    };

    const handleNewsletter = () => {
        const emailInput = document.querySelector('.newsletter input');
        const email = emailInput?.value.trim();
        
        if (email && validateEmail(email)) {
            simulateAPICall('/newsletter', { email })
                .then(() => {
                    showToast('Thank you for subscribing!');
                    emailInput.value = '';
                })
                .catch(() => showToast('Subscription failed', 'error'));
        } else {
            showToast('Please enter a valid email', 'error');
        }
    };

    const handleReadMore = (e) => {
        const card = e.currentTarget.closest('.story-card');
        const title = card.querySelector('.story-title').textContent;
        console.log(`Viewing story: ${title}`);
        // In a real app: window.location.href = `/stories/${slugify(title)}`;
    };

    // ========== UTILITY FUNCTIONS ==========
    const validateEmail = (email) => {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    };

    const showToast = (message, type = 'success') => {
        const toast = document.createElement('div');
        toast.className = `toast toast-${type}`;
        toast.textContent = message;
        document.body.appendChild(toast);
        
        setTimeout(() => {
            toast.classList.add('fade-out');
            setTimeout(() => toast.remove(), 300);
        }, 3000);
    };

    const simulateAPICall = (endpoint, data) => {
        console.log(`API call to ${endpoint}:`, data);
        return new Promise((resolve) => {
            setTimeout(resolve, 1500); // Simulate network delay
        });
    };

    const displaySearchResults = (term) => {
        // In a real app, this would display actual search results
        console.log(`Displaying results for: ${term}`);
        showToast(`Showing results for "${term}"`);
    };

    // ========== INITIALIZE ALL FUNCTIONALITY ==========
    initSearch();
    initImageGallery();
    initForms();
});


// Add this to your script.js
document.addEventListener('DOMContentLoaded', function() {
    // Configure the Intersection Observer
    const observerOptions = {
      threshold: 0.1,
      rootMargin: "0px 0px -100px 0px"
    };
  
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
          
          // Optional: Unobserve after animation triggers
          // observer.unobserve(entry.target);
        }
      });
    }, observerOptions);
  
    // Target elements to animate
    const animatedElements = document.querySelectorAll(
      '.rect4, .story-card, .contact-container, .about-section, .info-card'
    );
  
    // Start observing
    animatedElements.forEach(el => {
      el.classList.add('slide-in'); // Add initial hidden state
      observer.observe(el);
    });
  
    // For staggered animations (e.g., story cards)
    document.querySelectorAll('.story-card').forEach((card, index) => {
      card.style.transitionDelay = `${index * 0.1}s`;
    });
  });