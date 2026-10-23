(() => {
  const root = document.documentElement;
  window.iroh = {
    activate() {
      const snapshot = document.getElementById('prerender');
      if (!snapshot) return;
      // Keep the readable HTML until the interactive tree has mounted. Swap in
      // one task, retaining the scroll position if someone started reading early.
      const { scrollX, scrollY } = window;
      snapshot.remove();
      document.getElementById('main').hidden = false;
      window.scrollTo(scrollX, scrollY);
      if (location.hash && !scrollY) {
        document.getElementById(decodeURIComponent(location.hash.slice(1)))?.scrollIntoView();
      }
    },
    setMetadata(metadata) {
      document.title = metadata.title;
      document.querySelectorAll('[data-iroh-meta]').forEach(tag => tag.remove());
      if (metadata.canonical) {
        const link = document.createElement('link');
        link.dataset.irohMeta = '';
        link.rel = 'canonical';
        link.href = metadata.canonical;
        document.head.append(link);
      }
      for (const [attribute, name, value] of metadata.tags) {
        const tag = document.createElement('meta');
        tag.dataset.irohMeta = '';
        tag.setAttribute(attribute, name);
        tag.content = value;
        document.head.append(tag);
      }
    },
    setTheme(mode) {
      root.dataset.theme = mode;
      try { localStorage.setItem('iroh-theme', mode); } catch (_) {}
      document.querySelector('meta[name="theme-color"]').content = mode === 'dark' ? '#111113' : '#f4f3ee';
      window.dispatchEvent(new CustomEvent('iroh-theme'));
    },
    toggleTheme() { this.setTheme(root.dataset.theme === 'dark' ? 'light' : 'dark'); },
    async copy(text) { try { await navigator.clipboard.writeText(text); return true; } catch (_) { return false; } }
  };
  matchMedia('(prefers-color-scheme: light)').addEventListener('change', e => {
    try { if (!localStorage.getItem('iroh-theme')) { root.dataset.theme = e.matches ? 'light' : 'dark'; window.dispatchEvent(new CustomEvent('iroh-theme')); } } catch (_) {}
  });
  // Progressive enhancements for generated article HTML.
  document.addEventListener('click', async e => {
    const copy = e.target.closest('[data-copy-code]');
    if (copy) { const text=copy.parentElement.querySelector('code').textContent; copy.textContent = await window.iroh.copy(text) ? 'Copied ✓' : 'Select and copy'; setTimeout(()=>copy.textContent='Copy',1800); }
  });
  // Capture before router link handlers can stop propagation. Include mobile
  // navigation, where <details> wraps the <nav> rather than sitting inside it.
  const menuSelector = '.site-header details';
  const closeMenus = (keep = null) => {
    document.querySelectorAll(`${menuSelector}[open]`).forEach(menu => {
      if (menu !== keep) menu.open = false;
    });
  };
  document.addEventListener('click', e => {
    if (!(e.target instanceof Element)) return;
    const menu = e.target.closest(menuSelector);
    closeMenus(e.target.closest('a') ? null : menu);
  }, true);
  document.addEventListener('focusin', e => {
    closeMenus(e.target instanceof Element ? e.target.closest(menuSelector) : null);
  });
  document.addEventListener('toggle', e => {
    if (e.target instanceof Element && e.target.matches(menuSelector) && e.target.open) {
      closeMenus(e.target);
    }
  }, true);
  document.addEventListener('keydown', e => {
    if (e.key !== 'Escape') return;
    const menu = document.activeElement?.closest(`${menuSelector}[open]`);
    closeMenus();
    menu?.querySelector('summary')?.focus();
  });
  window.addEventListener('popstate', () => closeMenus());
  const enhance = () => {
    document.querySelectorAll('.prose pre').forEach(pre=>{
      if(pre.querySelector('button') || !pre.querySelector('code'))return;
      const button=document.createElement('button');button.type='button';button.dataset.copyCode='';button.textContent='Copy';button.setAttribute('aria-label','Copy code');pre.append(button);
    });
  };
  new MutationObserver(enhance).observe(document.getElementById('main'),{childList:true,subtree:true});
})();
