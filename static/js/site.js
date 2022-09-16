document.addEventListener("DOMContentLoaded", function() {
  // ---------------- Selected Navbar Link -------------------------
  let navbar_links = document.querySelectorAll('.nav-links a');
  let trim_last_slash = window.location.href.replace(/\/$/, '');
  let selected_navbar_link = [...navbar_links].filter((item) => {
    return ((item.href === trim_last_slash) || (item.href === window.location.href))
  })
  if (selected_navbar_link.length !== 0) {
    for (let element of selected_navbar_link) {
      element.className = "bg-gray-900 text-white px-3 py-2 rounded-md text-sm font-medium"
    }
  }

  document.getElementById('toggle-mobile-menu')?.addEventListener('click', toggleMobileMenu);
});

function toggleMobileMenu() {
  const nb = document.getElementById('navbar')
  const menu = document.getElementById('mobile-menu');
  if (menu.getAttribute('aria-hidden') === 'true') {
    menu.setAttribute('aria-hidden', 'false')
    menu.classList.remove('hidden')
    menu.classList.add('block')
    nb.classList.add('bg-n0gray-900')
  } else {
    menu.setAttribute('aria-hidden', 'true')
    menu.classList.remove('block')
    menu.classList.add('hidden')
    if (window.scrollY <= 100) {
      nb.classList.remove('bg-n0gray-900')
    }
  }
}

window.addEventListener("scroll", () => {
  // check position and update nav
  const nb = document.getElementById('navbar')
  if (!nb?.classList.contains('bg-n0gray-900') && window.scrollY >= 100) {
    nb.classList.remove('bg-transparent');
    nb.classList.add('bg-n0gray-900');
  } else if (nb?.classList.contains('bg-n0gray-900') && window.scrollY <= 100) {
    nb.classList.add('bg-transparent');
    nb.classList.remove('bg-n0gray-900')
  }
});