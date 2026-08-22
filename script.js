// Dark mode
    const themeToggle = document.getElementById('themeToggle');
    const html = document.documentElement;
    const icon = themeToggle.querySelector('i');
    const saved = localStorage.getItem('theme');
    if (saved === 'dark') { html.classList.add('dark'); icon.classList.replace('fa-moon','fa-sun'); }
    else if (saved === 'light') { html.classList.remove('dark'); icon.classList.replace('fa-sun','fa-moon'); }
    else if (window.matchMedia('(prefers-color-scheme: dark)').matches) { html.classList.add('dark'); icon.classList.replace('fa-moon','fa-sun'); }
    themeToggle.addEventListener('click', () => {
      html.classList.toggle('dark');
      const isDark = html.classList.contains('dark');
      localStorage.setItem('theme', isDark ? 'dark' : 'light');
      icon.className = isDark ? 'fas fa-sun' : 'fas fa-moon';
    });

    // Navbar scroll shadow
    const nav = document.getElementById('navbar');
    window.addEventListener('scroll', () => nav.classList.toggle('scrolled', window.scrollY > 20));

    // Hamburger
    const hamburger = document.getElementById('hamburger');
    const navLinks = document.getElementById('navLinks');
    hamburger.addEventListener('click', () => navLinks.classList.toggle('open'));

    // Single-section navigation: show only the clicked section, hide the rest
    const allNavLinks = document.querySelectorAll('.nav-links a');
    const allSections = document.querySelectorAll('main, section');

    function showSection(id) {
      document.querySelectorAll('section').forEach(sec => {
        sec.classList.toggle('active-section', sec.id === id);
      });
      allNavLinks.forEach(link => {
        link.classList.toggle('active', link.getAttribute('href') === '#' + id);
      });
      window.scrollTo({ top: 0, behavior: 'instant' });
      navLinks.classList.remove('open');
    }

    allNavLinks.forEach(link => {
      link.addEventListener('click', (e) => {
        const id = link.getAttribute('href').replace('#', '');
        if (document.getElementById(id)) {
          e.preventDefault();
          history.replaceState(null, '', '#' + id);
          showSection(id);
        }
      });
    });

    // Also handle in-page links that jump to a section (e.g. hero buttons, "Let's Work Together")
    document.querySelectorAll('a[href^="#"]').forEach(link => {
      const id = link.getAttribute('href').replace('#', '');
      if (id && document.getElementById(id) && !link.closest('.nav-links')) {
        link.addEventListener('click', (e) => {
          e.preventDefault();
          history.replaceState(null, '', '#' + id);
          showSection(id);
        });
      }
    });

    // On load, respect the URL hash if present, else default to home
    const initial = location.hash ? location.hash.replace('#', '') : 'home';
    showSection(document.getElementById(initial) ? initial : 'home');



// =========================================================
// CONTACT FORM - FORMSPREE
// =========================================================

const contactForm = document.getElementById("contactForm");

contactForm.addEventListener("submit", async function (event) {

  event.preventDefault();

  const submitButton =
    contactForm.querySelector(".contact-submit");

  const originalText = submitButton.innerHTML;

  // Show sending state
  submitButton.disabled = true;

  submitButton.innerHTML = `
    <i class="fas fa-spinner fa-spin"></i>
    Sending...
  `;

  try {

    const response = await fetch(
      contactForm.action,
      {
        method: "POST",
        body: new FormData(contactForm),
        headers: {
          "Accept": "application/json"
        }
      }
    );


    // Successfully sent
    if (response.ok) {

      contactForm.reset();

      submitButton.innerHTML = `
        <i class="fas fa-check"></i>
        Message Sent!
      `;


      // Wait a little so user can see success
      setTimeout(() => {

        const homeSection =
          document.getElementById("home");

        if (homeSection) {

          const nav =
            document.getElementById("navbar");

          const navHeight =
            nav ? nav.offsetHeight : 0;

          const position =
            homeSection.offsetTop - navHeight;


          window.scrollTo({
            top: position,
            behavior: "smooth"
          });


          // Update URL
          history.replaceState(
            null,
            "",
            "#home"
          );
          showSection("home");

        }

        // Restore button
        submitButton.innerHTML = originalText;
        submitButton.disabled = false;

      }, 1000);

    }

    else {

      throw new Error("Form submission failed");

    }

  }

  catch (error) {

    console.error(error);

    submitButton.disabled = false;

    submitButton.innerHTML = originalText;

    alert(
      "Sorry, your message could not be sent. Please try again."
    );

  }

});


// Certifications....

function openCertificate(imagePath, title) {

  const modal =
    document.getElementById("certificateModal");

  const image =
    document.getElementById("certificateImage");

  const certificateTitle =
    document.getElementById("certificateTitle");

  image.src = imagePath;

  image.alt = title;

  certificateTitle.textContent = title;

  modal.classList.add("active");

  document.body.style.overflow = "hidden";
}


function closeCertificate() {

  const modal =
    document.getElementById("certificateModal");

  modal.classList.remove("active");

  document.body.style.overflow = "";
}


/* Close with ESC */

document.addEventListener("keydown", function(event) {

  if (event.key === "Escape") {
    closeCertificate();
  }

});



