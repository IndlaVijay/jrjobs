

const users = [
    {
        id: "001",
        role: "Software Engineer",
        company: "Google",
        location: "Hyderabad, Telangana, India",
        date: "Dec 10, 2025",
        imgSrc: './images/google.jpg',
        applyNow: "./apply-now/google-hiring-software-engineering-apply-now.html"
        },
        {
        id: "002",
        role: "Software Developer",
        company: "Microsoft",
        location: "Hyderabad, Telangana, India",
        date: "Jan 10, 2025",
        imgSrc: './images/Microsoft.jpg',
        applyNow:"./apply-now/microsoft-software-engineering-apply-now.html"
    },
    {
        id: "003",
        role: "Data Analyst",
        company: "Google",
        location: "Hyderabad",
        date: "Jan 10, 2025",
        imgSrc: './images/Google.jpg',
        applyNow: "./apply-now/google-hiring-software-engineering-apply-now.html"
    },
    {
        id: "004",
        role: "Software Developer",
        company: "Microsoft",
        location: "Hyderabad, Telangana, India",
        date: "Jan 10, 2025",
        imgSrc: './images/Microsoft.jpg',
        applyNow: "./apply-now/google-hiring-software-engineering-apply-now.html"
    },
    {
        id: "005",
        role: "Data Analyst",
        company: "Google",
        location: "Hyderabad",
        date: "Jan 10, 2025",
        imgSrc: './images/Google.jpg',
        applyNow: "./apply-now/google-hiring-software-engineering-apply-now.html"
    },
    {
    id: "006",
    role: "Java Developer",
    company: "Infosys",
    location: "Hyderabad, Telangana, India",
    date: "Dec 10, 2025",
    imgSrc: './images/Google.jpg',
    applyNow: "./apply-now/google-hiring-software-engineering-apply-now.html"
    }
];
var userCards = '';

for (var i = 0; i < users.length; i++) {
    userCards += `
       
        <div class="col-sm-4 mb-3 mb-sm-0">
            <div class="card " >
               <a href="#" class="d-flex justify-content-center"><img src="${users[i].imgSrc}"  class="card-img-top" alt=""></a>
               <div class="card-body">
                  <h5><a href="#" class="job-role justify-content-center d-flex fw-bold ">${users[i].role}</a></h5>
                  <p class="card-text fw-medium  my-3"><i class="fa-regular fa-building"></i>${users[i].company}</p>
                  <p class="card-text fw-medium"><i class="fa-solid fa-location-dot"></i> ${users[i].location}</p>
                  <p class="card-text fw-medium "><i class="fa-regular fa-clock"></i>${users[i].date}</p>
                  <a href="${users[i].applyNow}" class="fw-medium btn  btn-apply">Apply Now >></a>
                </div>
            </div>
        </div>
           `;
}

document.getElementById('user-cards').innerHTML = userCards;


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
  document.addEventListener("DOMContentLoaded", function() {
    loadHTML('header.html', 'header');
    loadHTML('footer.html', 'footer');
  });