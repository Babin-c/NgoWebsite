// carouseljs
document.addEventListener('DOMContentLoaded', function () {
    const carousel = document.querySelector('#heroCarousel');
    const bsCarousel = new bootstrap.Carousel(carousel, {
        interval: 6000,
        pause: 'hover',
        wrap: true,
        touch: true
    });

    // Reset animations when slide changes
    carousel.addEventListener('slide.bs.carousel', function (e) {
        const nextSlide = e.relatedTarget;
        const captions = nextSlide.querySelector('.carousel-caption');
        const elements = captions.children;

        // Reset animation states
        for (let el of elements) {
            el.style.opacity = '0';
            if (el.classList.contains('btn')) {
                el.style.transform = 'translateY(30px)';
            } else {
                el.style.transform = 'translateY(20px)';
            }
        }

        // Trigger reflow to restart animations
        void captions.offsetWidth;

        // Make captions visible
        captions.style.opacity = '1';

        // Animate elements in
        let delay = 0.3;
        for (let el of elements) {
            el.style.transition = `all 0.7s ease ${delay}s`;
            el.style.opacity = '1';
            el.style.transform = 'translateY(0)';
            delay += 0.2;
        }
    });
});
// end carousel js

const images = [
    { src: 'images/App development-bro.png', caption: 'Image 1' },
    { src: 'images/App development-bro.png', caption: 'Image 2' },
    { src: 'images/App development-bro.png', caption: 'Image 3' },
    { src: 'images/App development-bro.png', caption: 'Image 4' },
    { src: 'images/App development-bro.png', caption: 'Image 5' },
    { src: 'images/App development-bro.png', caption: 'Image 6' },
    { src: 'images/App development-bro.png', caption: 'Image 7' },
    { src: 'images/App development-bro.png', caption: 'Image 8' },
    { src: 'images/App development-bro.png', caption: 'Image 9' },
    { src: 'images/App development-bro.png', caption: 'Image 10' },
    { src: 'images/App development-bro.png', caption: 'Image 11' },
    { src: 'images/App development-bro.png', caption: 'Image 12' },
    { src: 'images/App development-bro.png', caption: 'Image 13' },
    { src: 'images/App development-bro.png', caption: 'Image 14' },
    { src: 'images/App development-bro.png', caption: 'Image 15' },
    { src: 'images/App development-bro.png', caption: 'Image 16' },
    { src: 'images/App development-bro.png', caption: 'Image 17' },
    { src: 'images/App development-bro.png', caption: 'Image 18' },
    { src: 'images/App development-bro.png', caption: 'Image 19' },
    { src: 'images/App development-bro.png', caption: 'Image 20' },
];

// Initialize the gallery
document.addEventListener('DOMContentLoaded', function () {
    const thumbnailGrid = document.querySelector('.thumbnail-grid');
    const lightbox = document.querySelector('.lightbox');
    const lightboxImg = document.querySelector('.lightbox-img');
    const lightboxCaption = document.querySelector('.lightbox-caption');
    const lightboxClose = document.querySelector('.lightbox-close');
    const lightboxPrev = document.querySelector('.lightbox-prev');
    const lightboxNext = document.querySelector('.lightbox-next');

    let currentImageIndex = 0;

    // Create thumbnails
    images.forEach((image, index) => {
        const thumbnail = document.createElement('div');
        thumbnail.className = 'thumbnail';

        const img = document.createElement('img');
        img.src = image.src;
        img.alt = image.caption;

        thumbnail.appendChild(img);
        thumbnailGrid.appendChild(thumbnail);

        // Add click event to open lightbox
        thumbnail.addEventListener('click', () => {
            currentImageIndex = index;
            updateLightbox();
            lightbox.classList.add('active');
        });
    });

    // Close lightbox
    lightboxClose.addEventListener('click', () => {
        lightbox.classList.remove('active');
    });

    // Previous image
    lightboxPrev.addEventListener('click', () => {
        currentImageIndex = (currentImageIndex - 1 + images.length) % images.length;
        updateLightbox();
    });

    // Next image
    lightboxNext.addEventListener('click', () => {
        currentImageIndex = (currentImageIndex + 1) % images.length;
        updateLightbox();
    });

    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (!lightbox.classList.contains('active')) return;

        if (e.key === 'Escape') {
            lightbox.classList.remove('active');
        } else if (e.key === 'ArrowLeft') {
            currentImageIndex = (currentImageIndex - 1 + images.length) % images.length;
            updateLightbox();
        } else if (e.key === 'ArrowRight') {
            currentImageIndex = (currentImageIndex + 1) % images.length;
            updateLightbox();
        }
    });

    // Update lightbox content
    function updateLightbox() {
        lightboxImg.src = images[currentImageIndex].src;
        lightboxCaption.textContent = images[currentImageIndex].caption;
    }

    // Close when clicking outside the image
    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) {
            lightbox.classList.remove('active');
        }
    });
});


// Simple script to handle donation amount selection
document.addEventListener('DOMContentLoaded', function () {
    const donationOptions = document.querySelectorAll('.donation-option');

    donationOptions.forEach(option => {
        option.addEventListener('click', function () {
            // Remove active class from all options
            donationOptions.forEach(opt => opt.classList.remove('active'));

            // Add active class to clicked option
            this.classList.add('active');

            // Update custom amount field if needed
            const amount = this.querySelector('h4').textContent.replace('$', '');
            document.getElementById('customAmount').value = '';
        });

        // Add keyboard accessibility
        option.addEventListener('keydown', function (e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                this.click();
            }
        });
    });

    // When custom amount is entered, deselect preset amounts
    document.getElementById('customAmount').addEventListener('input', function () {
        donationOptions.forEach(opt => opt.classList.remove('active'));
    });
});


document.addEventListener('DOMContentLoaded', function() {
    const donationBtn = document.getElementById('completeDonationBtn');
    const confirmationModal = new bootstrap.Modal(document.getElementById('confirmationModal'));
    
    donationBtn.addEventListener('click', function(e) {
        e.preventDefault();
        
        // Get form values
        const firstName = document.getElementById('firstName').value;
        const lastName = document.getElementById('lastName').value;
        const email = document.getElementById('email').value;
        const message = document.getElementById('message').value;
        
        // Validate inputs
        if (!firstName || !lastName || !email) {
            alert('Please fill in all required fields');
            return;
        }
        
        // Set confirmation details
        document.getElementById('confirmName').textContent = `${firstName} ${lastName}`;
        document.getElementById('confirmEmail').textContent = email;
        document.getElementById('confirmMessage').textContent = message || 'No message provided';
         document.getElementById('confirmName').textContent = `${firstName} ${lastName}`;
        
        // Show modal
        confirmationModal.show();
    });
    
    // Final submission
    document.getElementById('finalSubmitBtn').addEventListener('click', function() {
        // Here you would typically submit the form via AJAX
        alert('Donation submitted successfully! Thank you!');
        confirmationModal.hide();
        
        // Optional: Reset form
        document.getElementById('firstName').value = '';
        document.getElementById('lastName').value = '';
        document.getElementById('email').value = '';
        document.getElementById('message').value = '';
    });
});