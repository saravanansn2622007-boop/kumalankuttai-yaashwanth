/**
 * PORTFOLIO OF YAASHWANTH
 * Owner & Chief Custodian of Kumalankuttai, Erode
 * Core Interactive Client-Side Application with Geospatial Features
 */

document.addEventListener('DOMContentLoaded', () => {
  initLiveClock();
  initScrollProgress();
  initMobileMenu();
  initLeafletMap();
  initTransitCalculator();
  initGrievanceSystem();
  initAppointmentModal();
  initImageLightbox();
  initStatsCounter();
});

/* ==========================================================================
   1. Live Clock & Geographic Telemetry
   ========================================================================== */
function initLiveClock() {
  const clockEl = document.getElementById('liveClock');
  const dateEl = document.getElementById('liveDate');
  
  function updateTime() {
    const now = new Date();
    const optionsTime = { 
      timeZone: 'Asia/Kolkata', 
      hour: '2-digit', 
      minute: '2-digit', 
      second: '2-digit', 
      hour12: true 
    };
    const optionsDate = { 
      timeZone: 'Asia/Kolkata', 
      weekday: 'short', 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    };

    if (clockEl) {
      clockEl.textContent = now.toLocaleTimeString('en-IN', optionsTime) + ' IST';
    }
    if (dateEl) {
      dateEl.textContent = now.toLocaleDateString('en-IN', optionsDate);
    }
  }

  updateTime();
  setInterval(updateTime, 1000);
}

/* ==========================================================================
   2. Scroll Progress Bar
   ========================================================================== */
function initScrollProgress() {
  const progressBar = document.getElementById('scrollProgress');
  const navbar = document.getElementById('mainNavbar');

  window.addEventListener('scroll', () => {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progress = (scrollTop / docHeight) * 100;
    
    if (progressBar) {
      progressBar.style.width = `${progress}%`;
    }

    if (navbar) {
      if (scrollTop > 50) {
        navbar.classList.add('shadow-2xl', 'bg-slate-950/95');
        navbar.classList.remove('bg-slate-950/80');
      } else {
        navbar.classList.remove('shadow-2xl', 'bg-slate-950/95');
        navbar.classList.add('bg-slate-950/80');
      }
    }
  });
}

/* ==========================================================================
   3. Mobile Navigation Menu
   ========================================================================== */
function initMobileMenu() {
  const menuBtn = document.getElementById('mobileMenuBtn');
  const mobileMenu = document.getElementById('mobileMenu');
  const closeMenuBtn = document.getElementById('closeMobileMenuBtn');
  const navLinks = document.querySelectorAll('.mobile-nav-link');

  if (menuBtn && mobileMenu) {
    menuBtn.addEventListener('click', () => {
      mobileMenu.classList.toggle('hidden');
    });
  }

  if (closeMenuBtn && mobileMenu) {
    closeMenuBtn.addEventListener('click', () => {
      mobileMenu.classList.add('hidden');
    });
  }

  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      if (mobileMenu) mobileMenu.classList.add('hidden');
    });
  });
}

/* ==========================================================================
   4. Interactive Leaflet Map with Boundary & Focus Controls
   ========================================================================== */
let mapInstance = null;
const landmarksData = {
  junction: {
    lat: 11.3325,
    lng: 77.7120,
    zoom: 17,
    title: "Kumalankuttai Central Junction",
    tag: "High-Traffic Arterial Nexus",
    desc: "The prime crossroads on Perundurai Road connecting Erode Junction with Perundurai SIPCOT and NH-544."
  },
  lake: {
    lat: 11.3308,
    lng: 77.7145,
    zoom: 17,
    title: "The Historic Kumalankuttai Lake",
    tag: "Ecological Water Reservoir",
    desc: "The namesake lake of Kumalankuttai. A 14-acre freshwater reservoir undergoing bio-restoration under Yaashwanth's vision."
  },
  estate: {
    lat: 11.3342,
    lng: 77.7105,
    zoom: 17,
    title: "Yaashwanth Headquarters & Residence",
    tag: "Area Command Center",
    desc: "77, Kumalankuttai, Selvam Nagar 5th Street, Erode - 638011.<br><span class='text-emerald-600 font-bold'><i class='fa-solid fa-phone mr-1'></i>+91 8072 446 763</span>"
  },
  hospital: {
    lat: 11.3355,
    lng: 77.7138,
    zoom: 17,
    title: "Lotus Multispeciality Hospital Zone",
    tag: "Healthcare Anchor",
    desc: "24/7 advanced medical care, critical cardiology, and trauma center serving the Kumalankuttai populace."
  },
  techhub: {
    lat: 11.3368,
    lng: 77.7090,
    zoom: 17,
    title: "Youth Tech & Innovation Lab",
    tag: "Education & Skills",
    desc: "Modern digital workspace founded by Yaashwanth providing free software training and competitive exam prep."
  },
  collectorate: {
    lat: 11.3285,
    lng: 77.7082,
    zoom: 16,
    title: "District Collectorate Gateway",
    tag: "Administrative Link",
    desc: "Erode District Administration, Courts & Sampath Nagar government complex directly bordering Kumalankuttai."
  }
};

function initLeafletMap() {
  const mapElement = document.getElementById('kumalankuttaiMap');
  if (!mapElement || typeof L === 'undefined') return;

  const centerCoord = [11.3325, 77.7120];

  mapInstance = L.map('kumalankuttaiMap', {
    scrollWheelZoom: false,
    zoomControl: true
  }).setView(centerCoord, 15);

  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '© OpenStreetMap contributors | Kumalankuttai Geographic Grid'
  }).addTo(mapInstance);

  // Kumalankuttai Boundary Polygon Highlight
  const boundaryPolygon = [
    [11.3385, 77.7075],
    [11.3370, 77.7170],
    [11.3310, 77.7185],
    [11.3265, 77.7140],
    [11.3275, 77.7070],
    [11.3340, 77.7055]
  ];

  L.polygon(boundaryPolygon, {
    color: '#E5B842',
    weight: 2.5,
    opacity: 0.85,
    fillColor: '#E5B842',
    fillOpacity: 0.12,
    dashArray: '6, 6'
  }).addTo(mapInstance).bindPopup("<b class='text-amber-600'>Kumalankuttai Area Perimeter</b><br>Owner & Custodian: Yaashwanth");

  // Add Landmark Markers
  Object.keys(landmarksData).forEach(key => {
    const item = landmarksData[key];
    const marker = L.marker([item.lat, item.lng]).addTo(mapInstance);
    
    const popupContent = `
      <div class="p-1 font-sans">
        <span class="inline-block text-[10px] font-bold uppercase tracking-wider text-amber-600 bg-amber-50 px-2 py-0.5 rounded mb-1">${item.tag}</span>
        <h4 class="font-bold text-slate-900 text-sm mb-1">${item.title}</h4>
        <p class="text-xs text-slate-600 leading-snug mb-2">${item.desc}</p>
        <span class="text-[10px] text-blue-600 font-semibold flex items-center gap-1">
          <i class="fa-solid fa-location-dot"></i> Kumalankuttai, Erode - 638011
        </span>
      </div>
    `;
    marker.bindPopup(popupContent);
    item.markerRef = marker;
  });

  // Attach click listeners to landmark shortcut buttons
  const focusButtons = document.querySelectorAll('.focus-map-btn');
  focusButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const targetKey = btn.getAttribute('data-landmark');
      if (landmarksData[targetKey] && mapInstance) {
        const target = landmarksData[targetKey];
        mapInstance.flyTo([target.lat, target.lng], target.zoom, {
          duration: 1.2
        });
        if (target.markerRef) {
          target.markerRef.openPopup();
        }
      }
    });
  });
}

/* ==========================================================================
   5. Interactive Transit Matrix & Travel Time Calculator
   ========================================================================== */
function initTransitCalculator() {
  const transitData = {
    'station': { name: 'Erode Junction Railway Station (ED)', dist: '4.2 km', time: '8 mins', route: 'Via Perundurai Rd & Gandhiji Rd', mode: 'Car / Auto / Bus' },
    'busstand': { name: 'Erode Central Bus Terminal', dist: '3.5 km', time: '7 mins', route: 'Direct via Perundurai Main Road', mode: 'City Bus / Cab' },
    'collectorate': { name: 'District Collectorate & Courts', dist: '1.2 km', time: '3 mins', route: 'Via Sampath Nagar link', mode: 'Walking / Bike' },
    'sipcot': { name: 'Perundurai SIPCOT & NH-544 Expressway', dist: '14.0 km', time: '16 mins', route: 'Straight via SH-96 Highway', mode: 'Express Transit' },
    'cbe-airport': { name: 'Coimbatore International Airport (CJB)', dist: '88.5 km', time: '1 hr 25 mins', route: 'Via NH-544 (Salem-CBE Highway)', mode: 'Highway Drive' },
    'bhavani': { name: 'Bhavani Sangameshwarar / Kalingarayan', dist: '13.5 km', time: '18 mins', route: 'Via Erode Outer Bypass / Bhavani Rd', mode: 'Transit' }
  };

  const select = document.getElementById('transitSelect');
  const resultContainer = document.getElementById('transitResult');

  if (select && resultContainer) {
    function updateTransit(key) {
      const data = transitData[key] || transitData['station'];
      resultContainer.innerHTML = `
        <div class="p-4 rounded-2xl bg-slate-950 border border-amber-500/30 text-xs space-y-3">
          <div class="flex items-center justify-between pb-2 border-b border-slate-800">
            <span class="text-slate-400">Destination</span>
            <span class="font-bold text-white">${data.name}</span>
          </div>
          <div class="grid grid-cols-2 gap-3 text-center">
            <div class="p-2.5 rounded-xl bg-slate-900 border border-slate-800">
              <span class="text-[10px] text-slate-400 uppercase font-bold block">Distance from Kumalankuttai</span>
              <span class="text-base font-black text-amber-400 font-mono">${data.dist}</span>
            </div>
            <div class="p-2.5 rounded-xl bg-slate-900 border border-slate-800">
              <span class="text-[10px] text-slate-400 uppercase font-bold block">Estimated Travel Time</span>
              <span class="text-base font-black text-emerald-400 font-mono">${data.time}</span>
            </div>
          </div>
          <div class="pt-1 flex items-center justify-between text-[11px] text-slate-400">
            <span><i class="fa-solid fa-route text-amber-400 mr-1"></i> ${data.route}</span>
            <span class="text-blue-400 font-semibold"><i class="fa-solid fa-car text-xs mr-1"></i> ${data.mode}</span>
          </div>
        </div>
      `;
    }

    select.addEventListener('change', (e) => {
      updateTransit(e.target.value);
    });

    updateTransit(select.value || 'station');
  }
}

/* ==========================================================================
   6. Citizen Grievance & Service Reporting
   ========================================================================== */
function initGrievanceSystem() {
  const form = document.getElementById('grievanceForm');
  const trackBtn = document.getElementById('trackGrievanceBtn');
  const ticketInput = document.getElementById('trackingTicketInput');
  const trackResultContainer = document.getElementById('trackingResult');

  const defaultGrievances = {
    'KKI-2026-1042': {
      id: 'KKI-2026-1042',
      name: 'Muthusamy K.',
      category: 'Smart Streetlighting',
      location: 'Kumalankuttai 2nd Cross, Near Lake Park',
      description: 'Request for installation of new high-mast LED bulb replacement at street junction.',
      status: 'Resolved',
      progress: 100,
      date: '28 Sep 2026',
      notes: 'Inspected by Yaashwanth inspection team. New 65W Philips Smart Solar LED installed.'
    },
    'KKI-2026-2180': {
      id: 'KKI-2026-2180',
      name: 'Ranganathan S.',
      category: 'Road Maintenance & Pothole Filling',
      location: 'Perundurai Road link lane towards Sampath Nagar',
      description: 'Patching needed post monsoon water pipeline laying.',
      status: 'In Progress (Field Action)',
      progress: 75,
      date: '30 Sep 2026',
      notes: 'Road laying machinery deployed. Bituminous macadam leveling underway.'
    }
  };

  if (!localStorage.getItem('kki_grievances')) {
    localStorage.setItem('kki_grievances', JSON.stringify(defaultGrievances));
  }

  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();

      const name = document.getElementById('citizenName').value.trim();
      const phone = document.getElementById('citizenPhone').value.trim();
      const category = document.getElementById('grievanceCategory').value;
      const location = document.getElementById('grievanceLocation').value.trim();
      const desc = document.getElementById('grievanceDesc').value.trim();

      const randomNum = Math.floor(1000 + Math.random() * 9000);
      const ticketId = `KKI-2026-${randomNum}`;

      const newGrievance = {
        id: ticketId,
        name: name,
        phone: phone,
        category: category,
        location: location || 'Kumalankuttai Central',
        description: desc,
        status: 'Acknowledged by Yaashwanth Secretariat',
        progress: 25,
        date: new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' }),
        notes: 'Dispatched to Yaashwanth field team for on-site assessment.'
      };

      const stored = JSON.parse(localStorage.getItem('kki_grievances') || '{}');
      stored[ticketId] = newGrievance;
      localStorage.setItem('kki_grievances', JSON.stringify(stored));

      form.reset();
      showReceiptModal(newGrievance);
    });
  }

  if (trackBtn && ticketInput) {
    trackBtn.addEventListener('click', () => {
      const queryId = ticketInput.value.trim().toUpperCase();
      if (!queryId) {
        alert('Please enter a valid ticket token.');
        return;
      }

      const stored = JSON.parse(localStorage.getItem('kki_grievances') || '{}');
      const item = stored[queryId];

      if (item) {
        renderTrackingResult(item, trackResultContainer);
      } else {
        trackResultContainer.innerHTML = `
          <div class="p-4 rounded-xl bg-red-950/40 border border-red-500/30 text-red-200 text-xs">
            <p class="font-bold">Tracking ID Not Found: "${queryId}"</p>
            <p class="text-[11px] text-red-300/80 mt-1">Try our sample token: <strong class="underline cursor-pointer" onclick="document.getElementById('trackingTicketInput').value='KKI-2026-1042'">KKI-2026-1042</strong></p>
          </div>
        `;
      }
    });
  }
}

function showReceiptModal(item) {
  const modal = document.getElementById('receiptModal');
  const detailsEl = document.getElementById('receiptDetails');
  if (!modal || !detailsEl) return;

  detailsEl.innerHTML = `
    <div class="space-y-2.5 text-xs">
      <div class="flex items-center justify-between pb-2 border-b border-slate-800">
        <span class="text-slate-400">Token ID:</span>
        <span class="font-mono font-bold text-amber-400 text-sm">${item.id}</span>
      </div>
      <div class="flex items-center justify-between">
        <span class="text-slate-400">Petitioner:</span>
        <span class="font-semibold text-slate-200">${item.name}</span>
      </div>
      <div class="flex items-center justify-between">
        <span class="text-slate-400">Sector:</span>
        <span class="text-slate-300">${item.category}</span>
      </div>
      <div class="flex items-center justify-between">
        <span class="text-slate-400">Status:</span>
        <span class="text-emerald-400 font-bold bg-emerald-950/60 px-2 py-0.5 rounded text-[11px]">${item.status}</span>
      </div>
    </div>
  `;
  modal.classList.remove('hidden');
}

function renderTrackingResult(item, container) {
  container.innerHTML = `
    <div class="p-4 rounded-2xl bg-slate-900 border border-slate-700/80 mt-3 animate-fade-in text-xs space-y-3">
      <div class="flex justify-between items-center pb-2 border-b border-slate-800">
        <span class="font-mono font-bold text-amber-400">${item.id}</span>
        <span class="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-500/20 text-amber-300 border border-amber-500/30">${item.status}</span>
      </div>
      <p class="text-slate-300"><strong>Category:</strong> ${item.category}</p>
      <p class="text-slate-400"><strong>Location:</strong> ${item.location}</p>
      <div class="w-full bg-slate-800 rounded-full h-2 overflow-hidden">
        <div class="bg-gradient-to-r from-amber-500 to-emerald-500 h-2 rounded-full" style="width: ${item.progress}%"></div>
      </div>
      <p class="text-slate-400 italic">"${item.notes}"</p>
    </div>
  `;
}

/* ==========================================================================
   7. Appointment Modal with Yaashwanth
   ========================================================================== */
function initAppointmentModal() {
  const openBtns = document.querySelectorAll('.open-appointment-modal');
  const modal = document.getElementById('appointmentModal');
  const closeBtn = document.getElementById('closeAppointmentModal');
  const form = document.getElementById('appointmentForm');

  openBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      if (modal) modal.classList.remove('hidden');
    });
  });

  if (closeBtn && modal) {
    closeBtn.addEventListener('click', () => {
      modal.classList.add('hidden');
    });
  }

  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      alert('Your appointment request with Yaashwanth has been registered. The secretariat team will contact you shortly.');
      form.reset();
      if (modal) modal.classList.add('hidden');
    });
  }
}

/* ==========================================================================
   8. Fullscreen Image Lightbox
   ========================================================================== */
function initImageLightbox() {
  const lightbox = document.getElementById('imageLightbox');
  const lightboxImg = document.getElementById('lightboxImage');
  const lightboxCaption = document.getElementById('lightboxCaption');
  const closeBtn = document.getElementById('closeLightbox');
  const triggers = document.querySelectorAll('.lightbox-trigger');

  triggers.forEach(img => {
    img.addEventListener('click', () => {
      if (!lightbox || !lightboxImg) return;
      lightboxImg.src = img.src;
      if (lightboxCaption) {
        lightboxCaption.textContent = img.getAttribute('alt') || 'Yaashwanth — Kumalankuttai, Erode';
      }
      lightbox.classList.remove('hidden');
    });
  });

  if (closeBtn && lightbox) {
    closeBtn.addEventListener('click', () => {
      lightbox.classList.add('hidden');
    });
  }

  if (lightbox) {
    lightbox.addEventListener('click', (e) => {
      if (e.target === lightbox) {
        lightbox.classList.add('hidden');
      }
    });
  }
}

/* ==========================================================================
   9. Animated Stats Counter
   ========================================================================== */
function initStatsCounter() {
  const statNumbers = document.querySelectorAll('.stat-number');
  if (!statNumbers.length) return;

  let hasRun = false;
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !hasRun) {
        hasRun = true;
        statNumbers.forEach(stat => {
          const target = parseInt(stat.getAttribute('data-target') || '0', 10);
          const duration = 1800;
          const stepTime = 25;
          const steps = duration / stepTime;
          const increment = target / steps;
          let current = 0;

          const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
              stat.textContent = target.toLocaleString('en-IN') + (stat.getAttribute('data-suffix') || '');
              clearInterval(timer);
            } else {
              stat.textContent = Math.floor(current).toLocaleString('en-IN') + (stat.getAttribute('data-suffix') || '');
            }
          }, stepTime);
        });
      }
    });
  }, { threshold: 0.2 });

  const statsSection = document.getElementById('statsSection');
  if (statsSection) observer.observe(statsSection);
}
