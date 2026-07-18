"use strict";

// block by href
const blockReelsHref = () => {
  const s = document.createElement("style");
  s.textContent = `
    a[href*="/reels/"] { display: none !important; }
    div:has(> span > div > a[href*="/reels/"]) { display: none !important; }
  `;
  document.documentElement.appendChild(s);
}
blockReelsHref()


const blockExplorePageContent = () => {
  // ---- 1. inject all CSS once ----
  const style = document.createElement("style");
  style.textContent = `
    html[data-ig-explore="1"] main > nav + div { display: none !important; }
  `;
  document.documentElement.appendChild(style);

  // ---- 2. reflect current route onto <html> ----
  const setRoute = () => {
    document.documentElement.dataset.igExplore =
      location.pathname.includes("/explore") ? "1" : "";
  };

  // ---- 3. detect SPA navigations (no native event for pushState) ----
  const fire = () => window.dispatchEvent(new Event("locationchange"));
  for (const m of ["pushState", "replaceState"]) {
    const orig = history[m];
    history[m] = function (...args) {
      const r = orig.apply(this, args);
      fire();
      return r;
    };
  }
  window.addEventListener("popstate", fire);
  window.addEventListener("locationchange", setRoute);

  // ---- 4. run once for the initial load ----
  setRoute();
}
blockExplorePageContent()


// block by Follow div in article — home feed only
const blockNotFollowingPosts = () => {
  const onHome = () => location.pathname === "/";

  const hasFollowDiv = (article) => {
    for (const div of article.querySelectorAll("div")) {
      if (div.textContent.trim() === "Follow") return true;
    }
    return false;
  };

  const scan = () => {
    if (!onHome()) return;                    // only filter the home feed
    for (const article of document.querySelectorAll("article")) {
      const hide = hasFollowDiv(article);
      article.style.setProperty("display", hide ? "none" : "", hide ? "important" : "");
    }
  };

  let queued = false;
  const schedule = () => {
    if (queued) return;
    queued = true;
    requestAnimationFrame(() => { queued = false; scan(); });
  };

  new MutationObserver(schedule)
    .observe(document.documentElement, { childList: true, subtree: true });
  schedule();
};
blockNotFollowingPosts();
