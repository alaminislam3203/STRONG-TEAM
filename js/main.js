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

  // 6. Interactive Team Cost Calculator ("Estimate Your cost")
  const roleCards = document.querySelectorAll('[data-role-card]');
  const calcRoleBadge = document.getElementById('calc-role-badge');
  const calcRoleTitle = document.getElementById('calc-role-title');
  const calcRoleTasks = document.getElementById('calc-role-tasks');
  const calcHourlyRate = document.getElementById('calc-hourly-rate');
  const hoursSlider = document.getElementById('hours-slider');
  const calcHoursLabel = document.getElementById('calc-hours-label');
  const teamSizeSelect = document.getElementById('team-size-select');
  const calcMonthlyCost = document.getElementById('calc-monthly-cost');
  const calcSummarySubtext = document.getElementById('calc-summary-subtext');

  let currentMinRate = 10;
  let currentMaxRate = 15;

  function updateSliderTrackFill() {
    if (!hoursSlider) return;
    const min = Number(hoursSlider.min) || 10;
    const max = Number(hoursSlider.max) || 40;
    const val = Number(hoursSlider.value) || 40;
    const pct = ((val - min) / (max - min)) * 100;
    hoursSlider.style.background = `linear-gradient(to right, #FFFFFF 0%, #FFFFFF ${pct}%, rgba(255, 255, 255, 0.25) ${pct}%, rgba(255, 255, 255, 0.25) 100%)`;
  }

  function updateCostEstimate() {
    if (!hoursSlider || !teamSizeSelect || !calcMonthlyCost) return;
    const hours = Number(hoursSlider.value) || 40;
    const members = Number(teamSizeSelect.value) || 1;
    const weeksPerMonth = 52 / 12;

    const minMonthly = Math.round(currentMinRate * hours * weeksPerMonth * members);
    const maxMonthly = Math.round(currentMaxRate * hours * weeksPerMonth * members);

    calcHoursLabel.textContent = `${hours} hrs / person`;
    calcHourlyRate.textContent = `\$${currentMinRate}-${currentMaxRate}`;
    calcMonthlyCost.textContent = `\$${minMonthly.toLocaleString('en-US')}-\$${maxMonthly.toLocaleString('en-US')}`;
    calcSummarySubtext.textContent = `${members} ${members === 1 ? 'person' : 'people'} ${hours} hours/ week each`;
    updateSliderTrackFill();
  }

  roleCards.forEach((card) => {
    card.addEventListener('click', () => {
      // Reset all cards to unselected style
      roleCards.forEach((item) => {
        item.classList.remove('border-[#3E526E]', 'bg-[#E3E7EE]');
        item.classList.add('border-slate-300', 'bg-white', 'hover:bg-slate-50');
        const label = item.querySelector('.role-label');
        if (label) {
          label.classList.remove('text-[#182442]', 'font-bold');
          label.classList.add('text-[#4F5E78]', 'font-medium');
        }
        const radio = item.querySelector('.role-radio');
        if (radio) {
          radio.src = './public/icons/radio-unchecked.svg';
        }
      });

      // Set clicked card to active style
      card.classList.remove('border-slate-300', 'bg-white', 'hover:bg-slate-50');
      card.classList.add('border-[#3E526E]', 'bg-[#E3E7EE]');
      const activeLabel = card.querySelector('.role-label');
      if (activeLabel) {
        activeLabel.classList.remove('text-[#4F5E78]', 'font-medium');
        activeLabel.classList.add('text-[#182442]', 'font-bold');
      }
      const activeRadio = card.querySelector('.role-radio');
      if (activeRadio) {
        activeRadio.src = './public/icons/radio-checked-navy.svg';
      }

      // Update role details & rates
      currentMinRate = Number(card.dataset.roleMin) || 10;
      currentMaxRate = Number(card.dataset.roleMax) || 15;

      if (calcRoleBadge && card.dataset.roleBadge) {
        calcRoleBadge.textContent = card.dataset.roleBadge;
      }
      if (calcRoleTitle && card.dataset.roleTitle) {
        calcRoleTitle.textContent = card.dataset.roleTitle;
      }
      if (calcRoleTasks && card.dataset.roleTasks) {
        const tasks = card.dataset.roleTasks.split('|');
        calcRoleTasks.innerHTML = tasks
          .map(
            (task) => `
              <li class="flex items-center gap-2.5 text-[#2B3D5B] text-[12.5px] font-semibold">
                <img src="./public/icons/check-navy.svg" alt="" class="w-3.5 h-3.5 shrink-0" />
                <span>${task}</span>
              </li>`
          )
          .join('');
      }

      updateCostEstimate();
    });
  });

  if (hoursSlider) {
    hoursSlider.addEventListener('input', updateCostEstimate);
  }
  if (teamSizeSelect) {
    teamSizeSelect.addEventListener('change', updateCostEstimate);
  }

  // Initialize slider track fill on page load
  updateSliderTrackFill();
});

