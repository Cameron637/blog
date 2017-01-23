import response from 'scripts/helpers/response';
import banner from 'scripts/widgets/main/banner';
import containerTemplate from 'views/widgets/main/table-of-contents/container';
import itemTemplate from 'views/widgets/main/table-of-contents/item';
import 'styles/widgets/main/table-of-contents';

let create = () => {
	let title = state.page.lang === 'en' ? 'Table of Contents' : 'Tabla de Contenido';
	let id = title.toLowerCase().replace(/\s/g, '-');

	document.querySelector('main .inner').insertAdjacentHTML('beforeend', containerTemplate({
		id: id,
		title: title
	}));

	let container = document.querySelector(`#${id}`);

	fetch('/resources/pages/table-of-contents.json')
		.then(response.getJson)
		.then(contentData => {
			if (state.page.lang === 'en') {
				createBanner(contentData.en.backgroundImg);
				contentData.en.posts.forEach(post => addListItem(container, post));
			} else if (state.page.lang === 'es') {
				createBanner(contentData.es.backgroundImg);
				contentData.es.posts.forEach(post => addListItem(container, post));
			}
		})
		.catch(error => console.error(error));
};

let createBanner = backgroundImg => {
	banner.create({
		backgroundImg
	});
};

let addListItem = (container, post) => {
	container.insertAdjacentHTML('beforeend', itemTemplate({
		href: `/blog/${post.title.toLowerCase().replace(/\s/g, '-')}?lang=${post.lang}`,
		title: post.title
	}));
};

export default { create };