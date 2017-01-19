import containerTemplate from 'views/widgets/main/blog-post/container';
import paragraphTemplate from 'views/widgets/main/blog-post/paragraph';

let create = () => {
	document.querySelector('main .inner').insertAdjacentHTML('afterbegin', containerTemplate());

	fetch(`pages/${state.page.lang}/${state.page.title.toLowerCase().replace(/\s/g, '-')}.json`)
		.then(response.getJson)
		.then(postData => {
			
		})
};

export default { create };