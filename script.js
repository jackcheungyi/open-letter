// Bottom nav active dot — highlights as sections scroll into view
const sections = document.querySelectorAll('main section');
const dots = document.querySelectorAll('.nav-dot');

const navObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const id = entry.target.id;
      dots.forEach(dot => {
        dot.classList.toggle('active', dot.dataset.section === id);
      });
    }
  });
}, { threshold: 0.45 });

sections.forEach(s => navObserver.observe(s));

// Dot click — smooth scroll to section
dots.forEach(dot => {
  dot.addEventListener('click', e => {
    e.preventDefault();
    const target = document.getElementById(dot.dataset.section);
    if (target) target.scrollIntoView({ behavior: 'smooth' });
  });
});

// Scroll-triggered fade-in for reflection cards and promise blocks
const animatedEls = document.querySelectorAll('.reflection-card, .promise-block, .dance-message');

const fadeObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      fadeObserver.unobserve(entry.target); // animate once only
    }
  });
}, { threshold: 0.15 });

animatedEls.forEach(el => fadeObserver.observe(el));

// Dance video — play when on screen, pause when away; tap to toggle sound
const danceVideo = document.querySelector('.dance-video');
const soundBtn = document.querySelector('.dance-sound');

if (danceVideo) {
  const videoObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        danceVideo.play().catch(() => {});
      } else {
        danceVideo.pause();
      }
    });
  }, { threshold: 0.5 });

  videoObserver.observe(danceVideo);

  soundBtn?.addEventListener('click', () => {
    danceVideo.muted = !danceVideo.muted;
    soundBtn.textContent = danceVideo.muted ? '🔇' : '🔊';
    soundBtn.setAttribute('aria-label', danceVideo.muted ? '開聲' : '靜音');
    if (!danceVideo.muted) danceVideo.play().catch(() => {});
  });
}
