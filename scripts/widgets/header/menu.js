import menuTemplate from 'views/widgets/header/menu';
import 'styles/widgets/header/menu';

let create = () => {
	document.querySelector('header').insertAdjacentHTML('afterbegin', menuTemplate());
};

export default { create };