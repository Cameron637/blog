import bannerTemplate from 'views/widgets/main/banner/container';
import 'styles/widgets/main/banner';

let create = bannerInfo => {
	document.querySelector('header').insertAdjacentHTML('beforeend', bannerTemplate());
	document.querySelector('.banner').style.backgroundImage = `url(images/${bannerInfo.backgroundImg})`;
};

export default { create };