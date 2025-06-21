document.addEventListener("DOMContentLoaded", function () {
    
   
    const themeToggleCheckbox = document.getElementById('theme-toggle-checkbox');
    const body = document.body;

    const applyTheme = (theme) => {
        body.dataset.theme = theme;
        localStorage.setItem('portfolio-theme', theme);
        themeToggleCheckbox.checked = theme === 'light';
    };

    themeToggleCheckbox.addEventListener('change', (e) => {
        applyTheme(e.target.checked ? 'light' : 'dark');
    });

    const savedTheme = localStorage.getItem('portfolio-theme');
    const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    if (savedTheme) applyTheme(savedTheme);
    else applyTheme(prefersDark ? 'dark' : 'light');
    
  
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.navbar-nav .nav-link');
    const navObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const id = entry.target.getAttribute('id');
                navLinks.forEach(link => {
                    link.classList.toggle('active', link.getAttribute('href') === `#${id}`);
                });
            }
        });
    }, { threshold: 0.5 });
    sections.forEach(section => navObserver.observe(section));


    const cursorDot = document.querySelector('.cursor-dot');
    const cursorOutline = document.querySelector('.cursor-outline');
    
    window.addEventListener('mousemove', function (e) {
        const posX = e.clientX;
        const posY = e.clientY;

        cursorDot.style.left = `${posX}px`;
        cursorDot.style.top = `${posY}px`;

        cursorOutline.style.left = `${posX}px`;
        cursorOutline.style.top = `${posY}px`;
    });

    document.querySelectorAll('a, button, .project-card, .theme-switch').forEach(el => {
        el.addEventListener('mouseover', () => cursorOutline.classList.add('cursor-grow'));
        el.addEventListener('mouseleave', () => cursorOutline.classList.remove('cursor-grow'));
    });

  
    const projects = [
        {
            Id: 1,
            title: "Sales & Engagement Dashboard",
            description: "Developed a dynamic charts dashboard to track sales of lighting items and monitor sales team engagement with distributors and retailers. Used CanvasJS for rich, interactive data visualizations.",
            imageUrl: "./images/dashboard-img.png",
            liveUrl: "#", codeUrl: "#",
            tech: ["ASP.NET Core MVC", "CanvasJS", "C#", "SQL Server", "Bootstrap"]
        },
        {
            Id: 2,
            title: "Product Master-Creation App",
            description: "Created a web application to streamline the creation of new product codes by fetching and mapping details from existing codes. Features Excel generation of reports using the ClosedXML NuGet package.",
            imageUrl: "./images/master-creator.jpg",
            liveUrl: "#", codeUrl: "#",
            tech: ["ASP.NET Core MVC", "ClosedXML", "Entity Framework", "Bootstrap", "MS SQL Server"]
        },
        {
            Id: 3,
            title: "Professional Blog Platform",
            description: "Built a full-featured blog website using modern frontend technologies. Allowed users to create, read, update, and delete posts, with a secure and scalable backend powered by Google Firebase.",
            imageUrl: "./images/blog-webapp.png",
            //liveUrl: "#", 
            codeUrl: "https://github.com/subhodip-Sarkar99/Blog-Post-Website",
            tech: ["React", "Redux", "Tailwind CSS", "Firebase", "Google OAuth", "JWT"]
        },
        {
            Id: 4,
            title: "Online Tutor Website",
            description: "Designed and developed a professional online presence for a home tutor. The website showcased services, testimonials, and contact information to attract new students.",
            imageUrl: "./images/tutor-portfolio.jpg",
            //liveUrl: "#", 
            codeUrl: "https://github.com/subhodip-Sarkar99/Tutor-Portfolio",
            tech: ["HTML", "CSS", "JavaScript", "React JS", "Tailwind CSS"]
        }
    ];

 
    const projectGrid = document.getElementById('project-grid');
    if (projectGrid) {
        projects.forEach(project => {
            if(project.Id==3 || project.Id==4)
            {
                 //console.log(project);
            const projectCol = document.createElement('div');
            projectCol.className = 'col-lg-6 mb-4';
            
            let techTags = project.tech.map(t => `<span class="project-tech-tag">${t}</span>`).join('');
            projectCol.innerHTML = `
                <div class="project-card" data-aos="fade-up">
                    <img data-src="${project.imageUrl}" src="https://placehold.co/600x400/121212/121212?text=." class="project-card-img lazy-img" alt="${project.title}">
                    <div class="card-body">
                        <h5>${project.title}</h5>
                        <p>${project.description}</p>
                        <div>${techTags}</div>
                        <div class="project-links mt-4">
                            
                            <a href="${project.codeUrl}" class="btn btn-secondary" target="_blank" rel="noopener noreferrer">View Code</a>
                        </div>
                    </div>
                </div>`;
            projectGrid.appendChild(projectCol);
            }
            else{
                 const projectCol = document.createElement('div');
            projectCol.className = 'col-lg-6 mb-4';
            
            let techTags = project.tech.map(t => `<span class="project-tech-tag">${t}</span>`).join('');
            projectCol.innerHTML = `
                <div class="project-card" data-aos="fade-up">
                    <img data-src="${project.imageUrl}" src="https://placehold.co/600x400/121212/121212?text=." class="project-card-img lazy-img" alt="${project.title}">
                    <div class="card-body">
                        <h5>${project.title}</h5>
                        <p>${project.description}</p>
                        <div>${techTags}</div>
                        <div class="project-links mt-4">
                            
                        </div>
                    </div>
                </div>`;
            projectGrid.appendChild(projectCol);
            }
        });
    }

  
    const lazyImages = document.querySelectorAll('.lazy-img');
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy-img');
                observer.unobserve(img);
            }
        });
    }, { rootMargin: "0px 0px 200px 0px" });
    lazyImages.forEach(img => imageObserver.observe(img));
    
 
    AOS.init({ duration: 800, easing: 'ease-in-out', once: false });
    if (document.querySelector('#typed-element')) {
        new Typed('#typed-element', { strings: ['A Full-Stack Craftsman', 'A Creative Problem Solver', 'A Web Application Architect', 'A Creator', 'An Innovator'], typeSpeed: 50, backSpeed: 25, backDelay: 1500, loop: true });
    }
    const tiltElements = document.querySelectorAll('.project-card');
    if (VanillaTilt && tiltElements.length) {
        VanillaTilt.init(tiltElements, { max: 15, speed: 400, glare: true, "max-glare": 0.5 });
    }

    const scrollToTopBtn = document.querySelector(".scroll-to-top");
    if (scrollToTopBtn) {
        window.addEventListener("scroll", () => {
            scrollToTopBtn.classList.toggle("active", window.scrollY > 100);
        });
        scrollToTopBtn.addEventListener("click", (e) => {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: "smooth" });
        });
    }

  
    const contactForm = document.getElementById('contact-form');
    const formStatus = document.getElementById('form-status');

    if (contactForm) {
        contactForm.addEventListener('submit', async function (e) {
            e.preventDefault();
            
            const submitButton = contactForm.querySelector('button[type="submit"]');
            const buttonText = submitButton.querySelector('.btn-text');
            const formData = new FormData(this);
            const formObject = Object.fromEntries(formData.entries());

            buttonText.textContent = 'Sending...';
            buttonText.classList.add('sending');
            submitButton.disabled = true;
            formStatus.textContent = '';
            formStatus.className = '';

            try {
                const response = await fetch('/api/contact', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(formObject)
                });
                const result = await response.json();
                if (result.success) {
                    formStatus.textContent = result.message;
                    formStatus.className = 'success';
                    contactForm.reset();
                } else {
                    formStatus.textContent = result.message || 'An unknown error occurred.';
                    formStatus.className = 'error';
                }
            } catch (error) {
                console.error("Fetch error:", error);
                formStatus.textContent = 'A network error occurred. Please try again.';
                formStatus.className = 'error';
            } finally {
                setTimeout(() => {
                    buttonText.textContent = 'Send Message';
                    buttonText.classList.remove('sending');
                    submitButton.disabled = false;
                }, 2000);
            }
        });
    }
});
