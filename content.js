// ------------------------------------------------------------
// Name
// ------------------------------------------------------------

const name = 'Sherrie Shen';


// ------------------------------------------------------------
// About
// ------------------------------------------------------------

const about = `
  Hello! I'm a first year Ph.D. student at the University of Southern California, 
  advised by <a href='https://robinjia.github.io/'>Robin Jia</a>. 
  I previously studied at the University of Edinburgh, where I was a member of the 
  <a href='https://www.wiki.ed.ac.uk/spaces/statmt/pages/394675357/People'>machine translation group</a>.
  My research interests center around AI governance and societal impact.`;


// ------------------------------------------------------------
// Contact
// ------------------------------------------------------------

const contact = [
  { label: '[firstname].[lastname]@usc.edu' },
];


// ------------------------------------------------------------
// Publications — one entry per paper.
//
// Fields:
//   year    — number. Entries with the same year are grouped
//             under one year heading.
//   title   — supports inline HTML:
//               <em>word</em>        → italics
//               <sup>[1]</sup>       → a plain (unlinked) superscript,
//                                       e.g. for a footnote-style note
//   authors — plain text
//   venue   — plain text
//   award   — optional. Omit the field, or leave it as an empty
//             string, to hide the award line for that paper.
//   links   — array of { label, href }. Use href: "#" as a
//             placeholder until you have a real link. Leave the
//             array empty ( [] ) to show no links for that paper.
// ------------------------------------------------------------

const publications = [
  {
    title: '<em>Liaozhai</em> through the Looking-Glass<sup>1</sup>: On Paratextual \
    Explicitation<sup>2</sup> of Culture-Bound Terms in Machine Translation',
    authors: '<b>Sherrie Shen</b>, Weixuan Wang, Alexandra Birch',
    year: 2025,
    venue: 'In <em>Empirical Methods in Natural Language Processing (EMNLP)</em>.',
    award: '<b>SAC Highlight</b>, shortlisted for Best Theme Paper',
    links: [
      { label: 'paper', href: 'https://aclanthology.org/2025.emnlp-main.1744/' },
      { label: 'dataset', href: 'https://github.com/sherrieshen/liaozhai' }
    ]
  }
];


// ============================================================
// Rendering
// ============================================================

function renderProfile() {
  document.getElementById('name').textContent = name;
  document.getElementById('about').innerHTML = about.trim();
}

function renderContact() {
  const list = document.getElementById('contact');
  contact.forEach(item => {
    const li = document.createElement('li');
    if (item.href) {
      const a = document.createElement('a');
      a.href = item.href;
      a.textContent = item.label;
      if (!item.href.startsWith('mailto:')) {
        a.target = '_blank';
        a.rel = 'noopener';
      }
      li.appendChild(a);
    } else {
      li.textContent = item.label;
    }
    list.appendChild(li);
  });
}

function renderPublications() {
  const container = document.getElementById('publications');
  if (!container) return;

  let lastYear = null;
  let currentList = null;

  publications.forEach(pub => {
    if (pub.year !== lastYear) {
      const yearEl = document.createElement('div');
      yearEl.className = 'pub-year';
      yearEl.textContent = pub.year;
      container.appendChild(yearEl);

      currentList = document.createElement('ul');
      currentList.className = 'pub-list';
      container.appendChild(currentList);

      lastYear = pub.year;
    }

    const item = document.createElement('li');
    item.className = 'pub';

    const titleEl = document.createElement('span');
    titleEl.className = 'pub-title';
    titleEl.innerHTML = pub.title;
    item.appendChild(titleEl);

    const authors = document.createElement('span');
    authors.className = 'pub-authors';
    authors.innerHTML = pub.authors;
    item.appendChild(authors);

    const venue = document.createElement('span');
    venue.className = 'pub-venue';
    venue.innerHTML = pub.venue;
    item.appendChild(venue);

    if (pub.award) {
      const award = document.createElement('span');
      award.className = 'pub-award';
      award.innerHTML = pub.award;
      item.appendChild(award);
    }

    if (pub.links && pub.links.length) {
      const links = document.createElement('span');
      links.className = 'pub-links';
      pub.links.forEach((link, i) => {
        const a = document.createElement('a');
        a.href = link.href;
        a.textContent = link.label;
        a.target = '_blank';
        a.rel = 'noopener';
        links.appendChild(a);
        if (i < pub.links.length - 1) {
          links.appendChild(document.createTextNode(' \u00B7 '));
        }
      });
      item.appendChild(links);
    }

    currentList.appendChild(item);
  });
}

renderProfile();
renderContact();
renderPublications();
