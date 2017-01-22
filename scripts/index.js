import 'fetch';
import menu from 'scripts/widgets/header/menu';
import title from 'scripts/widgets/main/title';
import tableOfContents from 'scripts/widgets/main/table-of-contents';
import post from 'scripts/widgets/main/post';

// Fetch does not need to be imported in any other file.
window.fetch = fetch;

// https://stackoverflow.com/a/33681490/2344083
// Ensures that the :active pseudo class works on mobile.
// Used for highlighting menus on mobile.
document.addEventListener('touchstart', () => { });

if (state.mode !== 'production') {
    console.info('State: ', state);
}

menu.create();
title.create();

if (state.page.type === 'blog-home') {
    tableOfContents.create();
} else if (state.page.type === 'blog') {
    post.create();
}

document.querySelector('html').classList.add('loaded');