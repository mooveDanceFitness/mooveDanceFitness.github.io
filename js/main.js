// Menu Mobile Toggle
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');
const navItems = document.querySelectorAll('.nav-links li a');

if (hamburger) {
  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navLinks.classList.toggle('active');
  });
}

// Close mobile menu on click
navItems.forEach(item => {
  item.addEventListener('click', () => {
    hamburger.classList.remove('active');
    navLinks.classList.remove('active');
  });
});

// Sticky Header & Active Link
const header = document.querySelector('header');
const sections = document.querySelectorAll('section');

window.addEventListener('scroll', () => {
  // Add shadow to header on scroll
  if (window.scrollY > 50) {
    header.style.boxShadow = '0 2px 10px rgba(0,0,0,0.1)';
    header.style.padding = '10px 0';
  } else {
    header.style.boxShadow = '0 2px 10px rgba(0,0,0,0.05)';
    header.style.padding = '15px 0';
  }

  // Active link highlight
  let current = '';
  sections.forEach(section => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.clientHeight;
    if (pageYOffset >= (sectionTop - 200)) {
      current = section.getAttribute('id');
    }
  });

  navItems.forEach(item => {
    item.classList.remove('active');
    if (item.getAttribute('href').includes(current)) {
      item.classList.add('active');
    }
  });
});

// Scroll Animation (Fade in on scroll)
const faders = document.querySelectorAll('.fade-in');

const appearOptions = {
  threshold: 0.15,
  rootMargin: "0px 0px -50px 0px"
};

const appearOnScroll = new IntersectionObserver(function(entries, observer) {
  entries.forEach(entry => {
    if (!entry.isIntersecting) {
      return;
    } else {
      entry.target.classList.add('appear');
      observer.unobserve(entry.target);
    }
  });
}, appearOptions);

faders.forEach(fader => {
  appearOnScroll.observe(fader);
});

// Form Submission via AJAX
const contactForm = document.getElementById('contact-form');
const formStatus = document.getElementById('form-status');

if (contactForm) {
  contactForm.addEventListener('submit', function(e) {
    e.preventDefault();
    const data = new FormData(contactForm);
    const action = contactForm.getAttribute('action');

    fetch(action, {
      method: 'POST',
      body: data,
      headers: {
        'Accept': 'application/json'
      }
    }).then(response => {
      if (response.ok) {
        formStatus.innerHTML = "Grazie, ti risponderemo presto!";
        formStatus.style.color = "var(--color-sage)";
        formStatus.style.display = "block";
        contactForm.reset();
      } else {
        response.json().then(data => {
          if (Object.hasOwn(data, 'errors')) {
            formStatus.innerHTML = data.errors.map(error => error.message).join(", ");
          } else {
            formStatus.innerHTML = "Oops! C'è stato un problema nell'invio del modulo.";
          }
          formStatus.style.color = "red";
          formStatus.style.display = "block";
        })
      }
    }).catch(error => {
      formStatus.innerHTML = "Oops! C'è stato un problema nell'invio del modulo.";
      formStatus.style.color = "red";
      formStatus.style.display = "block";
    });
  });
}

// Lightbox Gallery Logic
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightbox-img');
const closeBtn = document.querySelector('.lightbox-close');
const galleryImages = document.querySelectorAll('.gallery-item img');

if (lightbox && galleryImages.length > 0) {
  galleryImages.forEach(img => {
    img.addEventListener('click', () => {
      lightbox.classList.add('active');
      lightboxImg.src = img.src;
      document.body.style.overflow = 'hidden'; // Prevent scrolling
    });
  });

  closeBtn.addEventListener('click', () => {
    lightbox.classList.remove('active');
    document.body.style.overflow = 'auto'; // Restore scrolling
  });

  lightbox.addEventListener('click', (e) => {
    if (e.target !== lightboxImg) {
      lightbox.classList.remove('active');
      document.body.style.overflow = 'auto';
    }
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && lightbox.classList.contains('active')) {
      lightbox.classList.remove('active');
      document.body.style.overflow = 'auto';
    }
  });
}
