/**
 * Strong Team Staffing — Navbar & Hero Interactive Script
 */

document.addEventListener('DOMContentLoaded', () => {
  // Elements
  const navbar = document.getElementById('navbar');
  const servicesDropdownBtn = document.getElementById('services-dropdown-btn');
  const servicesDropdownMenu = document.getElementById('services-dropdown-menu');
  const servicesChevron = document.getElementById('services-chevron');
  const servicesWrapper = document.getElementById('services-dropdown-wrapper');

  const mobileMenuBtn = document.getElementById('mobile-menu-btn');
  const mobileMenu = document.getElementById('mobile-menu');
  const menuOpenIcon = document.getElementById('menu-open-icon');
  const menuCloseIcon = document.getElementById('menu-close-icon');

  const mobileServicesBtn = document.getElementById('mobile-services-btn');
  const mobileServicesList = document.getElementById('mobile-services-list');
  const mobileServicesChevron = document.getElementById('mobile-services-chevron');

  const navLinks = document.querySelectorAll('[data-nav-link]');

  // 1. Desktop "Services" Dropdown Toggle
  let isServicesOpen = false;

  function toggleServicesDropdown(forceState) {
    isServicesOpen = typeof forceState === 'boolean' ? forceState : !isServicesOpen;
    servicesDropdownBtn.setAttribute('aria-expanded', String(isServicesOpen));

    if (isServicesOpen) {
      servicesDropdownMenu.classList.remove('hidden');
      requestAnimationFrame(() => {
        servicesDropdownMenu.classList.remove('opacity-0', 'translate-y-2');
        servicesDropdownMenu.classList.add('opacity-100', 'translate-y-0');
      });
      servicesChevron.classList.add('rotate-180');
    } else {
      servicesDropdownMenu.classList.remove('opacity-100', 'translate-y-0');
      servicesDropdownMenu.classList.add('opacity-0', 'translate-y-2');
      servicesChevron.classList.remove('rotate-180');
      setTimeout(() => {
        if (!isServicesOpen) {
          servicesDropdownMenu.classList.add('hidden');
        }
      }, 180);
    }
  }

  if (servicesDropdownBtn) {
    servicesDropdownBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      toggleServicesDropdown();
    });
  }

  // Close dropdown when clicking outside
  document.addEventListener('click', (e) => {
    if (isServicesOpen && servicesWrapper && !servicesWrapper.contains(e.target)) {
      toggleServicesDropdown(false);
    }
  });

  // Close dropdown on Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      toggleServicesDropdown(false);
    }
  });

  // 2. Mobile Menu Drawer Toggle
  let isMobileMenuOpen = false;

  if (mobileMenuBtn && mobileMenu) {
    mobileMenuBtn.addEventListener('click', () => {
      isMobileMenuOpen = !isMobileMenuOpen;
      mobileMenuBtn.setAttribute('aria-expanded', String(isMobileMenuOpen));
      mobileMenu.classList.toggle('hidden', !isMobileMenuOpen);
      menuOpenIcon.classList.toggle('hidden', isMobileMenuOpen);
      menuCloseIcon.classList.toggle('hidden', !isMobileMenuOpen);
    });
  }

  // 3. Mobile "Services" Accordion Toggle
  if (mobileServicesBtn && mobileServicesList) {
    mobileServicesBtn.addEventListener('click', () => {
      const isHidden = mobileServicesList.classList.contains('hidden');
      mobileServicesList.classList.toggle('hidden', !isHidden);
      mobileServicesChevron.classList.toggle('rotate-180', isHidden);
    });
  }

  // 4. Active Nav Link Indicator Switching
  navLinks.forEach((link) => {
    link.addEventListener('click', () => {
      // Remove active styles & indicator from all links
      navLinks.forEach((item) => {
        item.classList.remove('font-semibold', 'text-brand-navActive');
        item.classList.add('font-medium', 'text-brand-navText');
        const existingIndicator = item.querySelector('.nav-indicator');
        if (existingIndicator) {
          existingIndicator.remove();
        }
      });

      // Apply active styles & underline indicator to clicked link
      link.classList.remove('font-medium', 'text-brand-navText');
      link.classList.add('font-semibold', 'text-brand-navActive');

      const indicator = document.createElement('span');
      indicator.className = 'nav-indicator absolute bottom-0 left-[-6px] right-[-6px] h-[2px] bg-brand-navActive rounded-full';
      link.appendChild(indicator);
    });
  });

  // 5. Sticky Navbar Subtle Shadow on Scroll
  window.addEventListener('scroll', () => {
    if (window.scrollY > 10) {
      navbar.classList.add('shadow-md');
    } else {
      navbar.classList.remove('shadow-md');
    }
  });
});

