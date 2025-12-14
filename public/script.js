document.addEventListener('DOMContentLoaded', () => {
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                // Add a small delay based on the index of the entry in the current batch
                // This creates the staggered effect when multiple items appear at once
                setTimeout(() => {
                    entry.target.classList.add('visible');
                }, index * 150); // 150ms delay between each item in the batch

                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    const animatedElements = document.querySelectorAll('.feature-card, .hero-animate');
    animatedElements.forEach(el => {
        observer.observe(el);
    });

    // Dedicated observer for Confetti (Trigger only when fully visible)
    const confettiObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                triggerConfetti();
                confettiObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.8 }); // 0.8 ensures mostly full visibility (safer than 1.0 on some screens)

    const confettiCard = document.querySelector('.feature-card-4');
    if (confettiCard) {
        confettiObserver.observe(confettiCard);
    }
});

function triggerConfetti() {
    const canvas = document.getElementById('confetti-canvas');
    if (!canvas) return;

    const myConfetti = confetti.create(canvas, {
        resize: true,
        useWorker: true
    });

    const count = 200;
    const defaults = {
        origin: { y: 0.7 }
    };

    function fire(particleRatio, opts) {
        myConfetti(Object.assign({}, defaults, opts, {
            particleCount: Math.floor(count * particleRatio),
            colors: ['#DDA867']
        }));
    }

    fire(0.25, {
        spread: 26,
        startVelocity: 55,
    });
    fire(0.2, {
        spread: 60,
    });
    fire(0.35, {
        spread: 100,
        decay: 0.91,
        scalar: 0.8
    });
    fire(0.1, {
        spread: 120,
        startVelocity: 25,
        decay: 0.92,
        scalar: 1.2
    });
    fire(0.1, {
        spread: 120,
        startVelocity: 45,
    });
}

// Emoji cycling logic
document.addEventListener('DOMContentLoaded', () => {
    const emojis = ["🙌", "😁", "🥳", "🤩", "😅", "💪", "🤪", "😘"];
    let emojiIndex = 0;
    const emojiElement = document.getElementById('dynamic-emoji');

    if (emojiElement) {
        setInterval(() => {
            emojiIndex = (emojiIndex + 1) % emojis.length;
            emojiElement.textContent = emojis[emojiIndex];

            // Reset animation to trigger it again
            emojiElement.style.animation = 'none';
            emojiElement.offsetHeight; /* trigger reflow */
            emojiElement.style.animation = 'handsPulse 0.6s ease-in-out';
        }, 700); // Change every 0.7 seconds
    }
});

// FAQ Accordion
document.addEventListener('DOMContentLoaded', () => {
    const faqQuestions = document.querySelectorAll('.faq-question');

    faqQuestions.forEach(question => {
        question.addEventListener('click', () => {
            const faqItem = question.parentElement;
            const isActive = faqItem.classList.contains('active');

            // Close all other items
            document.querySelectorAll('.faq-item').forEach(item => {
                item.classList.remove('active');
            });

            // Toggle current item
            if (!isActive) {
                faqItem.classList.add('active');
            }
        });
    });
});

// Participation slider animation
document.addEventListener('DOMContentLoaded', () => {
    const slider = document.getElementById('participationSlider');
    const percentageText = document.querySelector('.percentage-text');
    const reflexionIcon = document.querySelector('.status-icon:first-child');
    const inscritIcon = document.querySelector('.status-icon:last-child');

    if (slider && percentageText && reflexionIcon && inscritIcon) {
        let time = 0;

        function animate() {
            // Faster oscillation
            time += 0.025;
            const sineValue = Math.sin(time); // Oscillates between -1 and 1

            // Apply easing to slow down at extremes
            // Using cubic easing for smooth deceleration
            const easedValue = sineValue * sineValue * sineValue;

            // Map eased sine wave to 60-80 range
            const currentValue = 70 + (easedValue * 15); // Center at 70, amplitude of 10

            // Update slider
            slider.value = currentValue;

            // Update slider background gradient to show progress
            const percentage = currentValue;
            slider.style.background = `linear-gradient(to right, #000 0%, #000 ${percentage}%, #DBDBDB ${percentage}%, #DBDBDB 100%)`;

            // Update percentage text
            percentageText.textContent = Math.round(currentValue) + '%';

            // Scale icons based on value (60% = more reflexion, 80% = more inscrit)
            const normalizedValue = (currentValue - 60) / 20; // 0 to 1
            const reflexionScale = 1 - (normalizedValue * 0.3); // 1 to 0.7
            const inscritScale = 0.7 + (normalizedValue * 0.3); // 0.7 to 1

            reflexionIcon.style.transform = `scale(${reflexionScale})`;
            inscritIcon.style.transform = `scale(${inscritScale})`;

            requestAnimationFrame(animate);
        }

        animate();
    }
});

// ============================================
// LANGUAGE SELECTOR - HIDE ON SCROLL
// ============================================

document.addEventListener('DOMContentLoaded', () => {
    const languageSelector = document.querySelector('.language-selector');
    let lastScrollTop = 0;
    let scrollTimeout;

    window.addEventListener('scroll', () => {
        // Clear the timeout if it exists
        clearTimeout(scrollTimeout);

        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

        // Hide when scrolling down, show when at top
        if (scrollTop > 100) {
            languageSelector.classList.add('hidden');
        } else {
            languageSelector.classList.remove('hidden');
        }

        lastScrollTop = scrollTop;
    }, { passive: true });
});
