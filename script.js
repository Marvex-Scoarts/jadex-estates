    document.addEventListener('DOMContentLoaded', () => {
      // Grab all elements safely at the top
      const locationFilter = document.getElementById('locationFilter');
      const typeFilter = document.getElementById('typeFilter');
      const searchBtn = document.getElementById('searchTriggerBtn');
      const propertyCards = document.querySelectorAll('.property-card');

      const jeOverlay = document.getElementById('jeOverlay');
      const homesDrawer = document.getElementById('homesDrawer');
      const jeModal = document.getElementById('jeModal');
      const savedNavBtn = document.querySelector('.saved-homes-btn');
      const savedHomesList = document.getElementById('savedHomesList');

      const modalSubTag = document.getElementById('modalSubTag');
      const modalHeading = document.getElementById('modalHeading');
      const modalSpecsBox = document.getElementById('modalSpecsBox');
      const tourForm = document.getElementById('privateTourForm');
      const tourConfirmBanner = document.getElementById('tourConfirmBanner');

      // 1. Live Property Search Filter
      function filterProperties() {
        const selectedLoc = locationFilter ? locationFilter.value : 'all';
        const selectedType = typeFilter ? typeFilter.value : 'all';

        propertyCards.forEach(card => {
          const cardLoc = card.getAttribute('data-location');
          const cardType = card.getAttribute('data-type');
          const locMatch = selectedLoc === 'all' || cardLoc === selectedLoc;
          const typeMatch = selectedType === 'all' || cardType === selectedType;
          card.style.display = (locMatch && typeMatch) ? 'flex' : 'none';
        });
      }

      if (locationFilter) locationFilter.addEventListener('change', filterProperties);
      if (typeFilter) typeFilter.addEventListener('change', filterProperties);
      if (searchBtn) searchBtn.addEventListener('click', filterProperties);

      // 2. Close Helper
      function closeAllJe() {
        if (homesDrawer) homesDrawer.classList.remove('open');
        if (jeModal) jeModal.classList.remove('open');
        if (jeOverlay) jeOverlay.classList.remove('open');
      }

      const closeHomesBtn = document.getElementById('closeHomesBtn');
      const closeJeModalBtn = document.getElementById('closeJeModalBtn');
      if (closeHomesBtn) closeHomesBtn.addEventListener('click', closeAllJe);
      if (closeJeModalBtn) closeJeModalBtn.addEventListener('click', closeAllJe);
      if (jeOverlay) jeOverlay.addEventListener('click', closeAllJe);

      // 3. Saved Homes Shortlist Drawer
      let savedHomes = [];

      if (savedNavBtn) {
        savedNavBtn.addEventListener('click', (e) => {
          e.preventDefault();
          closeAllJe();
          if (homesDrawer) homesDrawer.classList.add('open');
          if (jeOverlay) jeOverlay.classList.add('open');
        });
      }

      function renderSavedHomes() {
        if (savedNavBtn) savedNavBtn.textContent = `Saved Homes (${savedHomes.length})`;
        if (!savedHomesList) return;

        if (savedHomes.length === 0) {
          savedHomesList.innerHTML = '<p style="color:#5C6662; text-align:center; margin-top:2rem;">No properties shortlisted yet. Click the heart icon on any residence!</p>';
          return;
        }
        savedHomesList.innerHTML = savedHomes.map((home, idx) => `
          <div class="saved-home-item">
            <span class="saved-home-title">${home}</span>
            <button class="je-remove-btn" onclick="removeSavedHome(${idx})">Remove</button>
          </div>
        `).join('');
      }

      window.removeSavedHome = function(idx) {
        savedHomes.splice(idx, 1);
        renderSavedHomes();
      };

      document.querySelectorAll('.save-home-btn').forEach(btn => {
        btn.addEventListener('click', () => {
          const homeTitle = btn.getAttribute('data-home');
          if (!savedHomes.includes(homeTitle)) {
            savedHomes.push(homeTitle);
            renderSavedHomes();
          }
          btn.innerHTML = '&#9829;';
          btn.style.backgroundColor = '#C6A359';
          btn.style.color = '#181C1E';
        });
      });

      // 4. Property Details & Private Advisor Tour Modal
      document.querySelectorAll('.details-btn').forEach(btn => {
        btn.addEventListener('click', () => {
          if (modalSubTag) modalSubTag.textContent = 'EXCLUSIVE PROPERTY DOSSIER';
          if (modalHeading) modalHeading.textContent = btn.getAttribute('data-title');
          if (modalSpecsBox) {
            modalSpecsBox.innerHTML = `
              <div><strong>Neighborhood:</strong> ${btn.getAttribute('data-loc')}</div>
              <div><strong>Asking Price:</strong> ${btn.getAttribute('data-price')}</div>
              <div><strong>Highlights:</strong> ${btn.getAttribute('data-specs')}</div>
            `;
          }
          if (tourConfirmBanner) tourConfirmBanner.style.display = 'none';
          closeAllJe();
          if (jeModal) jeModal.classList.add('open');
          if (jeOverlay) jeOverlay.classList.add('open');
        });
      });

      document.querySelectorAll('.book-tour-btn').forEach(btn => {
        btn.addEventListener('click', () => {
          const agent = btn.getAttribute('data-agent');
          if (modalSubTag) modalSubTag.textContent = 'PRIVATE ADVISORY CONSULTATION';
          if (modalHeading) modalHeading.textContent = `Tour with ${agent}`;
          if (modalSpecsBox) {
            modalSpecsBox.innerHTML = `
              <div><strong>Senior Advisor:</strong> ${agent}</div>
              <div><strong>Service:</strong> Chauffeured Private Property Viewing &amp; Portfolio Review</div>
            `;
          }
          if (tourConfirmBanner) tourConfirmBanner.style.display = 'none';
          closeAllJe();
          if (jeModal) jeModal.classList.add('open');
          if (jeOverlay) jeOverlay.classList.add('open');
        });
      });

      if (tourForm) {
        tourForm.addEventListener('submit', (e) => {
          e.preventDefault();
          const clientName = document.getElementById('clientTourName').value.trim();
          if (tourConfirmBanner) {
            tourConfirmBanner.textContent = `Confirmed, ${clientName}! Our private advisory desk will reach out shortly`;
            tourConfirmBanner.style.display = 'block';
          }
          tourForm.reset();

          setTimeout(() => {
            closeAllJe();
          }, 2800);
        });
      }
    });
