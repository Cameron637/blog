import bannerTemplate from 'views/widgets/main/banner';
import 'styles/widgets/main/banner';

let create = bannerInfo => {
	document.querySelector('header').insertAdjacentHTML('beforeend', bannerTemplate());
	document.querySelector('.banner').style.backgroundImage = `url(/resources/images/${bannerInfo.backgroundImg})`;
};

export default { create };