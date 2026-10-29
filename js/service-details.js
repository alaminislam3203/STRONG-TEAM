/**
 * Strong Team Staffing — Dynamic Service Details Page Renderer
 */

document.addEventListener('DOMContentLoaded', () => {
  const servicesData = window.SERVICES_DATA || {};
  const params = new URLSearchParams(window.location.search);
  const requestedSlug = params.get('service') || 'customer-support';

  // Fallback to customer-support if slug not found
  const service = servicesData[requestedSlug] || servicesData['customer-support'];
  if (!service) return;

  // Update Page Title
  document.title = `${service.title} — Strong Team Staffing`;

  // Populate Hero & Overview Elements
  const breadcrumbEl = document.getElementById('detail-breadcrumb');
  const badgeEl = document.getElementById('detail-badge');
  const titleEl = document.getElementById('detail-title');
  const subtitleEl = document.getElementById('detail-subtitle');
  const imageEl = document.getElementById('detail-image');
  const iconEl = document.getElementById('detail-icon');
  const overviewEl = document.getElementById('detail-overview');
  const responsibilitiesEl = document.getElementById('detail-responsibilities');
  const toolsEl = document.getElementById('detail-tools');
  const idealForEl = document.getElementById('detail-ideal-for');
  const rateEl = document.getElementById('detail-rate');
  const otherLinksEl = document.getElementById('other-services-links');

  if (breadcrumbEl) breadcrumbEl.textContent = service.title;
  if (badgeEl) badgeEl.textContent = service.badge;
  if (titleEl) titleEl.textContent = service.title;
  if (subtitleEl) subtitleEl.textContent = service.heroSubtitle;
  if (imageEl) {
    imageEl.src = service.image;
    imageEl.alt = service.title;
  }
  if (iconEl) {
    iconEl.src = service.icon;
  }
  if (overviewEl) overviewEl.textContent = service.overview;
  if (idealForEl) idealForEl.textContent = service.idealFor;
  if (rateEl) rateEl.textContent = service.rateRange;

  // Populate Responsibilities List
  if (responsibilitiesEl && Array.isArray(service.responsibilities)) {
    responsibilitiesEl.innerHTML = service.responsibilities
      .map(
        (item) => `
          <li class="flex items-start gap-3 bg-[#F8FAFC] p-4 rounded-[10px] border border-slate-100">
            <img src="/public/icons/check-circle-green.svg" alt="" class="w-5 h-5 shrink-0 mt-0.5" />
            <span class="text-[#2B3D5B] text-[14.5px] font-medium leading-[1.55]">${item}</span>
          </li>`
      )
      .join('');
  }

  // Populate Tools Pills
  if (toolsEl && Array.isArray(service.tools)) {
    toolsEl.innerHTML = service.tools
      .map(
        (tool) => `
          <span class="inline-flex items-center px-3.5 py-1.5 rounded-full text-[13px] font-semibold bg-[#F1F5FD] text-[#1E2F44] border border-blue-100/80">
            ${tool}
          </span>`
      )
      .join('');
  }

  // Populate Sidebar "Other Staffing Services" Switcher
  if (otherLinksEl) {
    otherLinksEl.innerHTML = Object.values(servicesData)
      .map((item) => {
        const isCurrent = item.slug === service.slug;
        return `
          <a 
            href="/service-details.html?service=${item.slug}" 
            class="flex items-center justify-between px-4 py-3 rounded-[10px] text-[14px] font-semibold transition-all ${
              isCurrent
                ? 'bg-[#18233C] text-white shadow-sm'
                : 'text-[#374151] hover:bg-slate-50 hover:text-[#004DB0]'
            }"
          >
            <span class="flex items-center gap-3">
              <img src="${item.icon}" alt="" class="w-5 h-5 ${isCurrent ? 'brightness-0 invert' : ''}" />
              <span>${item.title}</span>
            </span>
            <span class="text-xs opacity-75">→</span>
          </a>`;
      })
      .join('');
  }
});
