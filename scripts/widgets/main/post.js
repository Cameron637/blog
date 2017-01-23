import response from 'scripts/helpers/response';
import containerTemplate from 'views/widgets/main/blog-post/container';
import paragraphTemplate from 'views/widgets/main/blog-post/paragraph';
import imgTemplate from 'views/widgets/main/blog-post/img';
import 'styles/widgets/main/post';

let create = () => {
	document.querySelector('main .inner').insertAdjacentHTML('afterbegin', containerTemplate());

	fetch(`/resources/pages/${state.page.lang}/${state.page.query}.json`)
		.then(response.getJson)
		.then(postData => {
			if (state.mode !== 'production') {
				console.info('Post Data: ', postData);
			}

			let container = document.querySelector('.post');

			container.insertAdjacentHTML('afterbegin', imgTemplate({
				src: postData.image
			}));

			postData.message.forEach(text => {
				container.insertAdjacentHTML('beforeend', paragraphTemplate({
					text
				}));
			});
		})
		.catch(error => console.error(error));
};

export default { create };