import menuTemplate from 'views/widgets/header/menu';
import 'styles/widgets/header/menu';

let create = () => {
	document.querySelector('header').insertAdjacentHTML('afterbegin', menuTemplate({
		lang: state.page.lang,
		currentUrl: [location.protocol, '//', location.host, location.pathname].join('')
	}));
};

export default { create };