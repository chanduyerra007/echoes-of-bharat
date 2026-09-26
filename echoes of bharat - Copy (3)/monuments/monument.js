(() => {
  const page = document.body;
  const title = page.dataset.monument || 'This monument';
  const hero = document.querySelector('.monument-hero');
  if (hero) hero.addEventListener('pointermove', (event) => { const box = hero.getBoundingClientRect(); hero.style.setProperty('--x', `${event.clientX - box.left}px`); hero.style.setProperty('--y', `${event.clientY - box.top}px`); });

  const display = document.querySelector('.story-display');
  const steps = [...document.querySelectorAll('.story-step')];
  steps.forEach((step, index) => step.addEventListener('click', () => {
    steps.forEach(item => item.classList.remove('active'));
    step.classList.add('active');
    display.querySelector('.step-label').textContent = step.dataset.date;
    display.querySelector('h3').textContent = step.dataset.title;
    display.querySelector('.story-text').textContent = step.dataset.story;
    display.querySelector('.story-progress i').style.width = `${((index + 1) / steps.length) * 100}%`;
  }));

  const detail = document.querySelector('.lens-detail');
  document.querySelectorAll('.lens-token').forEach(token => token.addEventListener('click', () => {
    document.querySelectorAll('.lens-token').forEach(item => item.classList.remove('active'));
    token.classList.add('active');
    detail.querySelector('.eyebrow').textContent = token.dataset.type;
    detail.querySelector('h3').textContent = token.dataset.title;
    detail.querySelector('p').textContent = token.dataset.detail;
  }));

  const stampButton = document.querySelector('.stamp-button');
  if (stampButton) stampButton.addEventListener('click', () => {
    let stamps = [];
    try { stamps = JSON.parse(localStorage.getItem('bharatPassport') || '[]'); } catch (_) { stamps = []; }
    const message = document.querySelector('.stamp-message');
    if (!stamps.includes(title)) { stamps.push(title); localStorage.setItem('bharatPassport', JSON.stringify(stamps)); message.textContent = `✦ ${title} is now stamped in your Heritage Passport.`; stampButton.textContent = '✓ STAMP COLLECTED'; }
    else { message.textContent = `✓ ${title} is already in your Heritage Passport.`; stampButton.textContent = '✓ STAMP COLLECTED'; }
  });

  const observer = new IntersectionObserver(entries => entries.forEach(entry => { if (entry.isIntersecting) entry.target.classList.add('in-view'); }), { threshold:.14 });
  document.querySelectorAll('.reveal').forEach(item => observer.observe(item));
})();
