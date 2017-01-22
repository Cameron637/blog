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

	fetch('pages/table-of-contents.json')
		.then(response.getJson)
		.then(contentData => {
			if (state.page.lang === 'en') {
				contentData.en.posts.forEach(post => addListItem(container, post));
				console.log(contentData.en);
				createBanner(contentData.en.backgroundImg);
			} else if (state.page.lang === 'es') {
				contentData.es.posts.forEach(post => addListItem(container, post));
				createBanner(contentData.es.backgroundImg);
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
		href: `?lang=${post.lang}&post=${post.title.toLowerCase().replace(/\s/g, '-')}`,
		title: post.title
	}));
};

export default { create };