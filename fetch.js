const jobsPerPage = 6;
let currentPage = 1;
let allJobs = [];
let filteredJobs = [];

// Fetch job data
async function fetchJobs() {
    try {
        const response = await fetch('https://1drv.ms/u/s!Ag-2iEGfH_Uggb9ohnOr0d0TwrCmAg?e=rYC3FB');
        if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);

        allJobs = await response.json();
        populateFilters();
        applyFilters();
    } catch (error) {
        console.error('Error fetching job data:', error);
        document.getElementById('user-cards').innerHTML = `<p style="color: red; font-weight: bold;">Error loading job data.</p>`;
    }
}

// Populate filter dropdowns
function populateFilters() {
    const jobTypes = new Set();
    const locations = new Set();

    allJobs.forEach(job => {
        if (job.type) jobTypes.add(job.type);
        if (job.location) locations.add(job.location);
    });

    const jobTypeFilter = document.getElementById('jobTypeFilter');
    jobTypes.forEach(type => {
        jobTypeFilter.innerHTML += `<option value="${type}">${type}</option>`;
    });

    const locationFilter = document.getElementById('locationFilter');
    locations.forEach(location => {
        locationFilter.innerHTML += `<option value="${location}">${location}</option>`;
    });
}

// Apply filters to job listings
function applyFilters() {
    const selectedJobType = document.getElementById('jobTypeFilter').value;
    const selectedLocation = document.getElementById('locationFilter').value;

    filteredJobs = allJobs.filter(job => {
        return (selectedJobType === '' || job.type === selectedJobType) &&
            (selectedLocation === '' || job.location === selectedLocation);
    });

    currentPage = 1; // Reset to first page
    renderJobs();
    renderPagination();
}

// Render job listings
function renderJobs() {
    const jobContainer = document.getElementById('user-cards');
    jobContainer.innerHTML = '';

    const start = (currentPage - 1) * jobsPerPage;
    const paginatedJobs = filteredJobs.slice(start, start + jobsPerPage);

    paginatedJobs.forEach(job => {
        jobContainer.innerHTML += `
            <div class="col">
                <a href='job-details.html?id=${job.id}'>
                    <div class="card">
                        <img src="${job.image || 'default-image.jpg'}" class="card-img-top" alt="${job.role || 'Unknown'}" style="height: 150px; ">
                    
                        <div class="card-body">
                            <h5 class="fw-bold text-center">${job.role || 'Unknown Role'}</h5>
                            <p class="card-text fw-medium my-2">
                                <i class="fa-regular fa-building"></i> ${job.company || 'Unknown Company'}
                            </p>
                            <p class="card-text fw-medium">
                                <i class="fa-solid fa-location-dot"></i> ${job.location || 'Unknown Location'}
                            </p>
                            <p class="card-text fw-medium">
                                <i class="fa-regular fa-clock"></i> ${job.date || 'N/A'}
                            </p>
                            <button class="btn btn-primary btn-apply " onclick="window.location.href='job-details.html?id=${job.id}'">Read more>></button>
                        </div>
                     </div>
                </a>
            </div>
        `;
    });
}

// Render pagination controls
function renderPagination() {
    const paginationContainer = document.getElementById('pagination');
    paginationContainer.innerHTML = '';

    const totalPages = Math.ceil(filteredJobs.length / jobsPerPage);
    if (totalPages <= 1) return;

    const createButton = (label, disabled, onClick) => {
        const button = document.createElement('button');
        button.innerHTML = label;
        button.className = `page-btn border  ${disabled ? 'disabled' : ''}`;
        button.disabled = disabled;
        button.addEventListener('click', onClick);
        return button;
    };

    paginationContainer.appendChild(createButton('First', currentPage === 1, () => {
        currentPage = 1;
        renderJobs();
        renderPagination();
    }));

    paginationContainer.appendChild(createButton('<<', currentPage === 1, () => {
        currentPage--;
        renderJobs();
        renderPagination();
    }));

    for (let i = 1; i <= totalPages; i++) {
        const button = document.createElement('button');
        button.textContent = i;
        button.className = `page-btn border ${currentPage === i ? 'active' : ''}`;
        button.addEventListener('click', () => {
            currentPage = i;
            renderJobs();
            renderPagination();
        });
        paginationContainer.appendChild(button);
    }

    paginationContainer.appendChild(createButton('>>', currentPage === totalPages, () => {
        currentPage++;
        renderJobs();
        renderPagination();
    }));

    paginationContainer.appendChild(createButton('Last', currentPage === totalPages, () => {
        currentPage = totalPages;
        renderJobs();
        renderPagination();
    }));
}

// Clear filters
document.getElementById('clearFilters').addEventListener('click', () => {
    document.getElementById('jobTypeFilter').value = '';
    document.getElementById('locationFilter').value = '';
    applyFilters();
});

// Event listeners for filters
document.getElementById('jobTypeFilter').addEventListener('change', applyFilters);
document.getElementById('locationFilter').addEventListener('change', applyFilters);

// Initialize job fetching
fetchJobs();


// Function to load external HTML  header&footerinto a div
async function loadHTML(url, elementId) {
    try {
        const response = await fetch(url);
        if (response.ok) {
            const content = await response.text();
            document.getElementById(elementId).innerHTML = content;
        } else {
            console.error('Failed to load', url);
        }
    } catch (error) {
        console.error('Error fetching HTML:', error);
    }
}

// Load the header and footer when the page is loaded
document.addEventListener("DOMContentLoaded", function () {
    loadHTML('header.html', 'header');
    loadHTML('footer.html', 'footer');
});



