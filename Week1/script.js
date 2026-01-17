document.addEventListener('DOMContentLoaded', () => {
    // DOM Elements
    const header = document.getElementById('header');
    const mobileToggle = document.getElementById('mobile-toggle');
    const mobileDrawer = document.getElementById('mobile-drawer');
    const navLinks = document.querySelectorAll('.nav-link');
    const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');
    const sections = document.querySelectorAll('section[id]');
    const logo = document.getElementById('logo');

    /**
     * Scroll Behavior: Header styling
     */
    const updateHeader = () => {
        if (window.scrollY > 40) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    };

    window.addEventListener('scroll', updateHeader);
    updateHeader();

    /**
     * Navigation: Mobile Drawer Toggle
     */
    const toggleMenu = () => {
        const isOpen = mobileDrawer.classList.toggle('open');
        mobileToggle.classList.toggle('active');
        document.body.style.overflow = isOpen ? 'hidden' : '';
    };

    mobileToggle.addEventListener('click', toggleMenu);

    // Close drawer when clicking links
    mobileNavLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (mobileDrawer.classList.contains('open')) {
                toggleMenu();
            }
        });
    });

    /**
     * Active State: Intersection Observer
     * Highlights the menu link corresponding to the current scroll position.
     */
    const observerOptions = {
        root: null,
        rootMargin: '-50% 0px -40% 0px', // Detect center of section
        threshold: 0
    };

    const observerCallback = (entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const id = entry.target.getAttribute('id');
                
                navLinks.forEach(link => {
                    link.classList.toggle('active', link.getAttribute('href') === `#${id}`);
                });
            }
        });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);
    sections.forEach(section => observer.observe(section));

    /**
     * Smooth Scrolling
     * Handles logic for browsers or manual triggers
     */
    const smoothScroll = (e) => {
        const targetId = e.currentTarget.getAttribute('href');
        if (targetId.startsWith('#')) {
            e.preventDefault();
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const headerOffset = header.offsetHeight;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        }
    };

    [...navLinks, ...mobileNavLinks, logo].forEach(link => {
        link.addEventListener('click', smoothScroll);
    });

    /**
     * Forms: Feedback
     */
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const btn = contactForm.querySelector('button');
            const originalText = btn.innerText;
            
            btn.innerText = 'Sending...';
            btn.disabled = true;

            setTimeout(() => {
                alert('Thank you! Your message has been sent successfully.');
                contactForm.reset();
                btn.innerText = originalText;
                btn.disabled = false;
            }, 1500);
        });
    }
});