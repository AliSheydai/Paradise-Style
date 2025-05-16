document.addEventListener('DOMContentLoaded', function () {
    let cartCount = 2; // Initial cart count
    let currentPage = 2; // Initial page
    function updatePaginationState() {
        const prevButton = document.getElementById('prev-page');
        const nextButton = document.getElementById('next-page');
        const pageButtons = [
            document.getElementById('page-1'),
            document.getElementById('page-2'),
            document.getElementById('page-3')
        ];
        // Update prev/next button states
        prevButton.disabled = currentPage === 1;
        nextButton.disabled = currentPage === 3;
        // Update page button states
        pageButtons.forEach((button, index) => {
            if (index + 1 === currentPage) {
                button.classList.add('bg-primary', 'text-white');
                button.classList.remove('hover:border-primary', 'hover:text-primary');
            } else {
                button.classList.remove('bg-primary', 'text-white');
                button.classList.add('hover:border-primary', 'hover:text-primary');
            }
        });
    }
    // Add click handlers for pagination
    document.getElementById('prev-page').addEventListener('click', function () {
        if (currentPage > 1) {
            currentPage--;
            updatePaginationState();
        }
    });
    document.getElementById('next-page').addEventListener('click', function () {
        if (currentPage < 3) {
            currentPage++;
            updatePaginationState();
        }
    });
    document.getElementById('page-1').addEventListener('click', function () {
        currentPage = 1;
        updatePaginationState();
    });
    document.getElementById('page-2').addEventListener('click', function () {
        currentPage = 2;
        updatePaginationState();
    });
    document.getElementById('page-3').addEventListener('click', function () {
        currentPage = 3;
        updatePaginationState();
    });
    // Initialize pagination state
    updatePaginationState();
    function updateCartCount() {
        const cartCountElements = document.querySelectorAll('.absolute.top-0.right-0.bg-primary');
        cartCountElements.forEach(element => {
            element.textContent = cartCount.toString();
        });
    }
    function createCartAnimation(startX, startY, endX, endY) {
        const dot = document.createElement('div');
        dot.className = 'cart-animation';
        dot.style.left = `${startX}px`;
        dot.style.top = `${startY}px`;
        document.body.appendChild(dot);
        // Force reflow
        dot.offsetHeight;
        dot.style.transform = `translate(${endX - startX}px, ${endY - startY}px) scale(0)`;
        dot.style.opacity = '0';
        setTimeout(() => {
            document.body.removeChild(dot);
        }, 600);
    }
    function showToast() {
        const toast = document.getElementById('cart-toast');
        toast.classList.add('show');
        setTimeout(() => {
            toast.classList.remove('show');
        }, 5000);
    }
    document.querySelectorAll('.add-to-cart-btn').forEach(button => {
        button.addEventListener('click', function (e) {
            // Get button position
            const rect = this.getBoundingClientRect();
            const startX = rect.left + rect.width / 2;
            const startY = rect.top + rect.height / 2;
            // Get cart icon position
            const cartIcon = document.getElementById('cart-button');
            const cartRect = cartIcon.getBoundingClientRect();
            const endX = cartRect.left + cartRect.width / 2;
            const endY = cartRect.top + cartRect.height / 2;
            // Create animation
            createCartAnimation(startX, startY, endX, endY);
            // Update cart count after animation
            setTimeout(() => {
                cartCount++;
                updateCartCount();
                showToast();
            }, 300);
        });
    });
    // Cart Dropdown Toggle
    const cartButton = document.getElementById('cart-button');
    const cartDropdown = document.getElementById('cart-dropdown');
    const cartContainer = document.getElementById('cart-dropdown-container');
    if (cartButton && cartDropdown && cartContainer) {
        cartButton.addEventListener('click', function (e) {
            e.stopPropagation();
            cartDropdown.classList.toggle('hidden');
        });
        document.addEventListener('click', function (e) {
            if (!cartContainer.contains(e.target)) {
                cartDropdown.classList.add('hidden');
            }
        });
    }
    // Mobile Menu Toggle
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');
    if (mobileMenuButton && mobileMenu) {
        mobileMenuButton.addEventListener('click', function () {
            mobileMenu.classList.toggle('hidden');
        });
    }
    // Mobile Submenu Toggles
    const mobileSubmenuToggles = document.querySelectorAll('.mobile-submenu-toggle');
    mobileSubmenuToggles.forEach(toggle => {
        toggle.addEventListener('click', function () {
            const submenu = this.nextElementSibling;
            submenu.classList.toggle('hidden');
            // Toggle icon
            const icon = this.querySelector('i');
            if (icon.classList.contains('ri-arrow-down-s-line')) {
                icon.classList.remove('ri-arrow-down-s-line');
                icon.classList.add('ri-arrow-up-s-line');
            } else {
                icon.classList.remove('ri-arrow-up-s-line');
                icon.classList.add('ri-arrow-down-s-line');
            }
        });
    });
    // Color Options
    const colorOptions = document.querySelectorAll('.color-option');
    colorOptions.forEach(option => {
        option.addEventListener('click', function () {
            // Remove selected class from all options in the same group
            const parent = this.parentElement;
            parent.querySelectorAll('.color-option').forEach(opt => {
                opt.classList.remove('selected');
            });
            // Add selected class to clicked option
            this.classList.add('selected');
        });
    });
    // Back to Top Button
    const backToTopButton = document.querySelector('.back-to-top');
    if (backToTopButton) {
        window.addEventListener('scroll', function () {
            if (window.pageYOffset > 300) {
                backToTopButton.classList.add('visible');
            } else {
                backToTopButton.classList.remove('visible');
            }
        });
        backToTopButton.addEventListener('click', function () {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
    // Size Guide Popup
    const sizeGuideButton = document.querySelector('.text-primary.hover\\:underline');
    const sizeGuidePopup = document.getElementById('size-guide-popup');
    const closeSizeGuide = document.getElementById('close-size-guide');
    if (sizeGuideButton && sizeGuidePopup && closeSizeGuide) {
        sizeGuideButton.addEventListener('click', function (e) {
            e.preventDefault();
            sizeGuidePopup.style.display = 'flex';
        });
        closeSizeGuide.addEventListener('click', function () {
            sizeGuidePopup.style.display = 'none';
        });
        sizeGuidePopup.addEventListener('click', function (e) {
            if (e.target === sizeGuidePopup) {
                sizeGuidePopup.style.display = 'none';
            }
        });
    }
    // Countdown Timer
    function updateCountdown() {
        const now = new Date();
        const tomorrow = new Date(now);
        tomorrow.setDate(tomorrow.getDate() + 1);
        tomorrow.setHours(0, 0, 0, 0);
        const timeLeft = tomorrow - now;
        const hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);
        const hoursElem = document.querySelector('.flex.gap-4 .w-16:nth-child(2) .text-xl');
        const minsElem = document.querySelector('.flex.gap-4 .w-16:nth-child(3) .text-xl');
        const secsElem = document.querySelector('.flex.gap-4 .w-16:nth-child(4) .text-xl');
        if (hoursElem && minsElem && secsElem) {
            hoursElem.textContent = hours.toString().padStart(2, '۰');
            minsElem.textContent = minutes.toString().padStart(2, '۰');
            secsElem.textContent = seconds.toString().padStart(2, '۰');
        }
    }
    // Initial call and set interval
    updateCountdown();
    setInterval(updateCountdown, 1000);
});