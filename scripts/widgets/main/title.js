import titleTemplate from 'views/widgets/main/title';
import 'styles/widgets/main/title';

let create = () => {
	document.querySelector('main').insertAdjacentHTML('afterbegin', titleTemplate({
		title: state.page.title
	}));
};

export default { create };