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


// algolia search setup
const searchClient = algoliasearch('XAW7N510XH', 'a002be45b589b61bd6d596ad865e626e');

const search = instantsearch({
  indexName: 'iroh.computer',
  searchClient,
});

search.addWidgets([
  instantsearch.widgets.searchBox({
    container: '#searchbox',
  }),

  instantsearch.widgets.hits({
    container: '#hits',
    templates: {
      item(hit, { html, components }) {
        return html`
          <a href=${hit.url}>
            <h2>${components.Highlight({ hit, attribute: 'title' })}</h2>
            <p>${components.Snippet({ hit, attribute: 'description' })}</p>
          </a>
        `;
      },
    }
  })
]);

search.start();

// modal config
window.openModal = function(modalId) {
  document.getElementById(modalId).style.display = 'block'
  document.getElementsByTagName('body')[0].classList.add('overflow-y-hidden')
}

window.openQuickSearch = function() {
  document.getElementById('quick_search').style.display = 'block'
  document.getElementsByTagName('body')[0].classList.add('overflow-y-hidden')
  document.getElementsByClassName('ais-SearchBox-input')[0].focus();
}

window.closeModal = function(modalId) {
  document.getElementById(modalId).style.display = 'none'
  document.getElementsByTagName('body')[0].classList.remove('overflow-y-hidden')
}

swallow = function(event) {
  event.stopPropagation();
}

openSidebar = function() {
  ['sidebar', 'sidebar-bg']
    .map((selector) => document.getElementById(selector))
    .forEach((el) => {
      el.style.display = 'block';
      el.style.position = 'fixed'
      el.setAttribute('data-open', true);
    });
}

closeSidebar = function () {
  ['sidebar', 'sidebar-bg']
    .map((selector) => document.getElementById(selector))
    .forEach((el) => { 
      el.removeAttribute('style')
      el.removeAttribute('data-open')
    });
}

document.onkeydown = function(event) {
  event = event || window.event;
  console.log(event);
  if (event.key === "Escape") {
    // Close all modals when press ESC
    document.getElementsByTagName('body')[0].classList.remove('overflow-y-hidden')
    let modals = document.getElementsByClassName('modal');
    Array.prototype.slice.call(modals).forEach(i => {
      i.style.display = 'none'
    })

    // TODO: close sidebar
  } else if (event.key === "k" && event.composed) {
    event.preventDefault();
    openQuickSearch('quick_search');
  }
};

// watch widnow width, close docs sidebar if it exceeds sm size
addEventListener('resize', (event) => {
  if (window.innerWidth > 1024 && document.getElementById('sidebar')?.getAttribute('data-open')) {
    closeSidebar();
  }
});