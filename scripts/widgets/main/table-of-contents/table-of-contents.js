import response from 'scripts/helper/response';
import containerTemplate from 'views/widgets/main/table-of-contents/container';
import itemTemplate from 'views/widgets/main/table-of-contents/item';
import 'styles/widgets/main/table-of-contents/table-of-contents';

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
				contentData.en.forEach(post => addListItem(container, post));
			} else if (state.page.lang === 'es') {
				contentData.es.forEach(post =>  addListItem(container, post));
			}
		})
		.catch(error => console.error(error));
};

let addListItem = (container, post) => {
	container.insertAdjacentHTML('beforeend', itemTemplate({
		href: `?lang=${post.lang}&post=${post.title.toLowerCase().replace(/\s/g, '-')}`,
		title: post.title
	}));
};

export default { create };