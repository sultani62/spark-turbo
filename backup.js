document.addEventListener("DOMContentLoaded", function () {
        // Loading screen
        setTimeout(function () {
          document.querySelector(".loading").style.opacity = "0";
          setTimeout(function () {
            document.querySelector(".loading").style.display = "none";
            // Trigger animations after loading
            animateOnScroll();
          }, 500);
        }, 1500);
        // Navbar scroll effect
        function handleScroll() {
          const navbar = document.querySelector(".navbar");
          if (window.scrollY > 100) {
            navbar.classList.add("scrolled");
          } else {
            navbar.classList.remove("scrolled");
          }
        }
        window.addEventListener("scroll", handleScroll);
        handleScroll(); // Call once on page load
        // Back to top button
        const backToTopButton = document.querySelector(".back-to-top");
        function checkScrollPosition() {
          if (window.scrollY > 300) {
            backToTopButton.classList.add("show");
          } else {
            backToTopButton.classList.remove("show");
          }
        }
        window.addEventListener("scroll", checkScrollPosition);
        checkScrollPosition(); // Call once on page load
        backToTopButton.addEventListener("click", function (e) {
          e.preventDefault();
          window.scrollTo({
            top: 0,
            behavior: "smooth",
          });
        });
        // Smooth scroll for anchor links
        document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
          anchor.addEventListener("click", function (e) {
            e.preventDefault();
            const targetId = this.getAttribute("href");
            if (targetId === "#") return;
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
              const navbarHeight =
                document.querySelector(".navbar").offsetHeight;
              const targetPosition = targetElement.offsetTop - navbarHeight;
              window.scrollTo({
                top: targetPosition,
                behavior: "smooth",
              });
            }
          });
        });
        // Animation on scroll
        function animateOnScroll() {
          const elements = document.querySelectorAll(
            ".section-title, .card, .feature-item, .team-member, .stat-item, .gallery-item, .pricing-card, .contact-info, .faq-item"
          );
          elements.forEach((element) => {
            const elementPosition = element.getBoundingClientRect().top;
            const screenPosition = window.innerHeight / 1.3;
            if (elementPosition < screenPosition) {
              element.classList.add("appear");
            }
          });
        }
        // Run animation on scroll
        window.addEventListener("scroll", animateOnScroll);
        // Service tabs functionality
        const serviceTabs = document.querySelectorAll(".service-tab");
        const serviceContents = document.querySelectorAll(".service-content");
        serviceTabs.forEach((tab) => {
          tab.addEventListener("click", function () {
            // Remove active class from all tabs
            serviceTabs.forEach((t) => t.classList.remove("active"));
            // Add active class to clicked tab
            this.classList.add("active");
            // Get the service type
            const serviceType = this.getAttribute("data-service");
            // Hide all service contents
            serviceContents.forEach((content) => {
              content.classList.remove("active");
            });
            // Show corresponding service content
            const targetContent = document.getElementById(
              `service-${serviceType}`
            );
            if (targetContent) {
              targetContent.classList.add("active");
            }
          });
        });
        // FAQ functionality
        const faqQuestions = document.querySelectorAll(".faq-question");
        faqQuestions.forEach((question) => {
          question.addEventListener("click", function () {
            const faqItem = this.parentElement;
            const isActive = faqItem.classList.contains("active");
            // If this item is already active, close it
            if (isActive) {
              faqItem.classList.remove("active");
            } else {
              // Close all FAQ items
              document.querySelectorAll(".faq-item").forEach((item) => {
                item.classList.remove("active");
              });
              // Open this item
              faqItem.classList.add("active");
            }
          });
        });
        // Form submission
        const bookingForm = document.getElementById("bookingForm");
        const contactForm = document.getElementById("contactForm");
        if (bookingForm) {
          bookingForm.addEventListener("submit", function (e) {
            e.preventDefault();
            alert(
              "Thank you for your booking request! We will contact you shortly to confirm your appointment."
            );
            this.reset();
          });
        }
        if (contactForm) {
          contactForm.addEventListener("submit", function (e) {
            e.preventDefault();
            alert(
              "Thank you for your message! We will get back to you as soon as possible."
            );
            this.reset();
          });
        }
        // Add hover effect to gallery items
        const galleryItems = document.querySelectorAll(".gallery-item");
        galleryItems.forEach((item) => {
          item.addEventListener("mouseenter", function () {
            this.style.transform = "translateY(-10px) scale(1.03)";
          });
          item.addEventListener("mouseleave", function () {
            this.style.transform = "translateY(0) scale(1)";
          });
        });
        // Add animation to team member cards
        const teamMembers = document.querySelectorAll(".team-member");
        teamMembers.forEach((member, index) => {
          member.style.transitionDelay = `${index * 0.1}s`;
        });
        // Initialize Bootstrap carousel
        const carouselElement = document.getElementById("testimonialCarousel");
        if (carouselElement) {
          new bootstrap.Carousel(carouselElement, {
            interval: 5000,
            ride: "carousel",
          });
        }
        // Add counter animation to stats
        const statNumbers = document.querySelectorAll(".stat-number");
        const statObserver = new IntersectionObserver(
          (entries) => {
            entries.forEach((entry) => {
              if (entry.isIntersecting) {
                const statNumber = entry.target;
                const targetText = statNumber.textContent.trim();
                let currentValue = 0;

                // Check if the text is a simple number, percentage, or has a '+'
                if (/^\d+%$/.test(targetText)) {
                  // Handle percentages
                  const targetNum = parseInt(targetText);
                  const increment = targetNum / 30;
                  const timer = setInterval(() => {
                    currentValue += increment;
                    if (currentValue >= targetNum) {
                      currentValue = targetNum;
                      clearInterval(timer);
                    }
                    statNumber.textContent = Math.ceil(currentValue) + "%";
                  }, 50);
                } else if (/^\d+\+$/.test(targetText)) {
                  // Handle numbers with '+'
                  const targetNum = parseInt(targetText);
                  const increment = targetNum / 30;
                  const timer = setInterval(() => {
                    currentValue += increment;
                    if (currentValue >= targetNum) {
                      currentValue = targetNum;
                      clearInterval(timer);
                    }
                    statNumber.textContent = Math.ceil(currentValue) + "+";
                  }, 50);
                } else if (/^\d+$/.test(targetText)) {
                  // Handle plain numbers
                  const targetNum = parseInt(targetText);
                  const increment = targetNum / 30;
                  const timer = setInterval(() => {
                    currentValue += increment;
                    if (currentValue >= targetNum) {
                      currentValue = targetNum;
                      clearInterval(timer);
                    }
                    statNumber.textContent = Math.ceil(currentValue);
                  }, 50);
                }
                // If it's text like "24/7", do nothing and leave it as-is.

                statObserver.unobserve(entry.target);
              }
            });
          },
          { threshold: 0.5 }
        );

        statNumbers.forEach((number) => {
          statObserver.observe(number);
        });
        // Fix for service tabs on mobile
        const serviceTabsContainer = document.querySelector(".service-tabs");
        if (serviceTabsContainer) {
          // Ensure at least one tab is active on load
          if (!document.querySelector(".service-tab.active")) {
            document.querySelector(".service-tab").classList.add("active");
            document.getElementById("service-all").classList.add("active");
          }
        }
        // Add animation to pricing cards
        const pricingCards = document.querySelectorAll(".pricing-card");
        pricingCards.forEach((card, index) => {
          card.style.transitionDelay = `${index * 0.2}s`;
        });
        // Add animation to feature items
        const featureItems = document.querySelectorAll(".feature-item");
        featureItems.forEach((item, index) => {
          item.style.transitionDelay = `${index * 0.1}s`;
        });
        // Initialize all tooltips
        const tooltipTriggerList = [].slice.call(
          document.querySelectorAll('[data-bs-toggle="tooltip"]')
        );
        tooltipTriggerList.map(function (tooltipTriggerEl) {
          return new bootstrap.Tooltip(tooltipTriggerEl);
        });
        // Add animation to cards on hover
        const cards = document.querySelectorAll(".card");
        cards.forEach((card) => {
          card.addEventListener("mouseenter", function () {
            this.style.transform = "translateY(-10px) scale(1.02)";
          });
          card.addEventListener("mouseleave", function () {
            this.style.transform = "translateY(0) scale(1)";
          });
        });
      });
      // Add animation to team member cards
      const teamMembers = document.querySelectorAll(".team-member");
      teamMembers.forEach((member, index) => {
        member.style.transitionDelay = `${index * 0.1}s`;
      });

      // Initialize Bootstrap carousel (optional, as data-bs-ride="carousel" should handle it)
      // But we'll initialize it to ensure settings are applied
      const carouselElement = document.getElementById("testimonialCarousel");
      if (carouselElement) {
        // Initialize the carousel
        const carousel = new bootstrap.Carousel(carouselElement, {
          interval: 5000,
          ride: false, // We set ride to false because we're manually initializing, and active class is already in HTML
        });
        // Explicitly set the first item as active to ensure it starts correctly
        const firstItem = carouselElement.querySelector(".carousel-item");
        if (firstItem && !firstItem.classList.contains("active")) {
          firstItem.classList.add("active");
        }
      }