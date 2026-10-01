(function () {
  // Mobile menu
  var toggle = document.getElementById('menuToggle');
  var links = document.getElementById('navLinks');
  toggle.addEventListener('click', function () {
    var open = links.classList.toggle('open');
    toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    toggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
  });
  links.addEventListener('click', function (e) {
    if (e.target.tagName === 'A') {
      links.classList.remove('open');
      toggle.setAttribute('aria-expanded', 'false');
      toggle.setAttribute('aria-label', 'Open menu');
    }
  });

  // Hero preview tabs
  var SITES = {
    business: { accent: '#C2410C', name: "Adunni's Kitchen", tag: 'Fresh home-style meals, delivered to your door.',
      b1: 'Order on WhatsApp', b2: 'See menu',
      l: ['Open daily, 9am to 8pm', 'Delivery across town', 'Pay on delivery or by transfer'], foot: 'Call us or send a message anytime' },
    youth: { accent: '#1F3A8A', name: 'Hope Youth Fellowship', tag: 'Meetings, events and ways to get involved.',
      b1: 'Join us', b2: 'Events',
      l: ['Meets every Sunday at 4pm', 'New members always welcome', 'Announcements and news'], foot: 'Questions? Contact the executives' },
    event: { accent: '#6D28D9', name: 'Campus Tech Day', tag: 'One day of talks, workshops and networking.',
      b1: 'Register now', b2: 'Schedule',
      l: ['Speakers and sessions', 'Venue and directions', 'Free entry for students'], foot: 'Share the event with friends' },
    school: { accent: '#0F766E', name: "Students' Association", tag: 'News, timetable and announcements in one place.',
      b1: 'Latest news', b2: 'Timetable',
      l: ['Department announcements', 'Exam and event dates', 'Meet your executives'], foot: 'Message the class rep' }
  };
  var phone = document.getElementById('phone');
  var tabs = document.querySelectorAll('.tab');
  var ids = { name: 'mName', tag: 'mTag', b1: 'mB1', b2: 'mB2', foot: 'mFoot' };

  function show(key) {
    var s = SITES[key];
    phone.style.setProperty('--accent', s.accent);
    document.getElementById(ids.name).textContent = s.name;
    document.getElementById(ids.tag).textContent = s.tag;
    document.getElementById(ids.b1).textContent = s.b1;
    document.getElementById(ids.b2).textContent = s.b2;
    document.getElementById(ids.foot).textContent = s.foot;
    document.getElementById('mL1').textContent = s.l[0];
    document.getElementById('mL2').textContent = s.l[1];
    document.getElementById('mL3').textContent = s.l[2];
    phone.classList.remove('is-building');
    void phone.offsetWidth;
    phone.classList.add('is-building');
  }
  tabs.forEach(function (t) {
    t.addEventListener('click', function () {
      tabs.forEach(function (x) { x.setAttribute('aria-selected', x === t ? 'true' : 'false'); });
      show(t.getAttribute('data-k'));
    });
  });
  show('business');

  // Pricing buttons pre-select the contact form
  var kind = document.getElementById('kind');
  var msg = document.getElementById('message');
  document.querySelectorAll('[data-plan]').forEach(function (a) {
    a.addEventListener('click', function () {
      var plan = a.getAttribute('data-plan');
      if (plan === 'Organization') kind.selectedIndex = 1;
      else kind.selectedIndex = 0;
      if (!msg.value) msg.value = 'Hi Johnny, I\'m interested in the ' + plan + ' plan. ';
    });
  });

  // Contact form opens WhatsApp with a prefilled message
  var form = document.getElementById('contactForm');
  var note = document.getElementById('formMsg');
  form.addEventListener('submit', function (e) {
    e.preventDefault();
    var name = form.name.value.trim();
    var text = form.message.value.trim();
    if (!name || !text) {
      note.textContent = 'Please add your name and a short message.';
      (name ? form.message : form.name).focus();
      return;
    }
    note.textContent = '';
    var body = 'Hello Johnny, my name is ' + name + '.\nI need: ' + form.kind.value + '.\n\n' + text;
    window.open('https://wa.me/2348166966893?text=' + encodeURIComponent(body), '_blank', 'noopener');
  });

  document.getElementById('year').textContent = new Date().getFullYear();
})();
