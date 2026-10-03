/* Havilah Academy - script.js */

/* ---------- 1. CONTENT (edit the text here to change the website) ---------- */
// Each item: [icon, title, text]
const DATA = {
  why: [
    ['❤️', 'Caring Environment', 'Safe, warm and loving classrooms.'],
    ['👩‍🏫', 'Dedicated Teachers', 'Trained, passionate and patient staff.'],
    ['✝️', 'Strong Values', 'Character and faith-based training.'],
    ['💻', 'Modern Learning', 'ICT and hands-on activities.']],
  excellence: [
    ['🏆', 'Top Results', 'Consistent excellent performance.'],
    ['🔬', 'Practical Learning', 'Learning by doing and exploring.'],
    ['📖', 'Reading Culture', 'Strong literacy and numeracy focus.']],
  testimonials: [
    ['', '"My child loves going to school every morning!"', '— Mrs. A., Parent'],
    ['', '"Wonderful teachers and great discipline."', '— Mr. B., Parent'],
    ['', '"We saw real growth in just one term."', '— Mrs. C., Parent']],
  news: [
    ['📰', 'Admissions Now Open', 'Secure a place for your child this session.'],
    ['🎉', 'Open Day', 'Visit our campus and meet our teachers.'],
    ['🏅', 'Inter-House Sports', 'A fun day of games and teamwork.']],
  values: [
    ['🙏', 'Faith', ''], ['⭐', 'Excellence', ''], ['🤝', 'Integrity', ''], ['🌱', 'Growth', '']],
  leaders: [
    ['👤', 'Principal', 'Name here'], ['👤', 'Vice Principal', 'Name here'], ['👤', 'Head of Nursery', 'Name here']],
  facilities: [
    ['🏫', 'Classrooms', 'Bright, spacious classrooms.'],
    ['📚', 'Library', 'Books for every age.'],
    ['💻', 'Computer Lab', 'Hands-on ICT lessons.'],
    ['⚽', 'Playground', 'Safe space to play.']],
  process: [
    ['1️⃣', 'Enquire', 'Call, email or visit the school.'],
    ['2️⃣', 'Apply', 'Fill the application form.'],
    ['3️⃣', 'Assessment', 'A friendly meeting with your child.'],
    ['4️⃣', 'Enrol', 'Receive offer and pay fees.']],
  life: [
    ['🎭', 'Clubs & Societies', 'Debate, science, drama and more.'],
    ['⚽', 'Sports Programs', 'Football, athletics and games.'],
    ['🎵', 'Arts & Music', 'Choir, drawing and crafts.'],
    ['🧭', 'Leadership', 'Prefects and class captains.'],
    ['🚌', 'Trips & Excursions', 'Learning outside the classroom.'],
    ['🥇', 'Achievements', 'Celebrating our students.']],
  portal: [
    ['📊', 'Student Performance', 'View scores and progress.'],
    ['🗓️', 'Attendance Tracking', 'See daily attendance.'],
    ['💬', 'Communication Center', 'Message teachers.'],
    ['💳', 'Fee Payment', 'Pay school fees online.'],
    ['⬇️', 'Download Reports', 'Get report cards as PDF.']],
  staff: [
    ['👩‍🏫', 'Teacher Name', 'Nursery Department'],
    ['👨‍🏫', 'Teacher Name', 'Primary Department'],
    ['👩‍🏫', 'Teacher Name', 'Primary Department']],
  gallery: [
    ['🏫', 'Campus Photos', 'Add your photos'],
    ['🎉', 'Event Photos', 'Add your photos'],
    ['🔬', 'Facilities', 'Add your photos'],
    ['🎥', 'Virtual Tour', 'Add a video link']]
};

// Build cards into every <div data-list="name">
document.querySelectorAll('[data-list]').forEach(box => {
  const items = DATA[box.dataset.list] || [];
  box.innerHTML = items.map(([icon, title, text]) =>
    `<div class="card ${icon === '' ? 'quote' : ''}">
       ${icon ? `<span class="ico">${icon}</span>` : ''}
       <h3>${icon ? title : ''}</h3>
       <p>${icon ? text : title}</p>${icon ? '' : `<b>${text}</b>`}
     </div>`).join('');
});

/* ---------- 2. PAGE SWITCHING (uses the # in the web address) ---------- */
const pages = document.querySelectorAll('.page');
const links = document.querySelectorAll('nav a[href^="#"]');
function showPage() {
  const id = location.hash.slice(1) || 'home';
  const target = document.getElementById(id) || document.getElementById('home');
  pages.forEach(p => p.classList.toggle('active', p === target));
  links.forEach(a => a.classList.toggle('active', a.getAttribute('href') === '#' + target.id && !a.classList.contains('btn')));
  document.getElementById('menu').classList.remove('open');
  window.scrollTo({ top: 0 });
  document.title = target.querySelector('h1')?.textContent + ' | Havilah Academy' || document.title;
  if (target.id === 'home') { document.title = 'Havilah Academy | Growing in Wisdom and Stature'; runCounters(); }
}
window.addEventListener('hashchange', showPage);
showPage();

/* ---------- 3. MOBILE MENU ---------- */
const menuBtn = document.getElementById('menuBtn');
menuBtn.addEventListener('click', () => {
  const open = document.getElementById('menu').classList.toggle('open');
  menuBtn.setAttribute('aria-expanded', open);
});

/* ---------- 4. HERO SLIDER ---------- */
const slides = document.querySelectorAll('.slide');
const dotsBox = document.getElementById('dots');
let current = 0;
slides.forEach((_, i) => {
  const b = document.createElement('button');
  b.setAttribute('aria-label', 'Show slide ' + (i + 1));
  b.onclick = () => goTo(i);
  dotsBox.appendChild(b);
});
function goTo(n) {
  current = n;
  slides.forEach((s, i) => s.classList.toggle('on', i === n));
  dotsBox.querySelectorAll('button').forEach((d, i) => d.classList.toggle('on', i === n));
}
goTo(0);
setInterval(() => goTo((current + 1) % slides.length), 5000);

/* ---------- 5. ANIMATED STATISTICS ---------- */
function runCounters() {
  document.querySelectorAll('.count').forEach(el => {
    const to = +el.dataset.to; let n = 0;
    const timer = setInterval(() => {
      n += Math.ceil(to / 50);
      if (n >= to) { n = to; clearInterval(timer); }
      el.textContent = n + (to >= 100 ? '' : '+');
    }, 30);
  });
}

/* ---------- 6. FORM VALIDATION ---------- */
function validate(form) {
  let ok = true;
  form.querySelectorAll('input[required],textarea[required]').forEach(f => {
    const err = f.parentElement.querySelector('.error');
    let msg = '';
    if (!f.value.trim()) msg = 'This field is required.';
    else if (f.type === 'email' && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(f.value)) msg = 'Enter a valid email.';
    else if (f.pattern && !new RegExp('^' + f.pattern + '$').test(f.value)) msg = 'Enter a valid phone number.';
    else if (f.minLength > 0 && f.value.length < f.minLength) msg = 'Minimum ' + f.minLength + ' characters.';
    if (err) err.textContent = msg;
    if (msg) ok = false;
  });
  return ok;
}
['applyForm', 'loginForm', 'contactForm'].forEach(id => {
  const form = document.getElementById(id);
  form.addEventListener('submit', e => {
    e.preventDefault();
    if (form.querySelector('.hp')?.value) return;          // spam trap (bots fill hidden field)
    if (!validate(form)) return;
    const msg = form.querySelector('.msg');
    msg.style.display = 'block';
    msg.textContent = id === 'loginForm' ? 'Demo: login needs a backend.' : 'Thank you! We will contact you soon.';
    form.reset();
  });
});

// Newsletter
document.getElementById('newsForm').addEventListener('submit', e => {
  e.preventDefault();
  const v = document.getElementById('ne').value;
  document.getElementById('newsMsg').textContent =
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v) ? 'Subscribed. Thank you!' : 'Please enter a valid email.';
});

// Footer year
document.getElementById('year').textContent = new Date().getFullYear();
