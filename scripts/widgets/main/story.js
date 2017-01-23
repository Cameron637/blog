import response from 'scripts/helpers/response';
import banner from 'scripts/widgets/main/banner';
import containerTemplate from 'views/widgets/main/developer-story/container';
import experienceTemplate from 'views/widgets/main/developer-story/experience';
import 'styles/widgets/main/experience';

let create = () => {
	document.querySelector('main .inner').insertAdjacentHTML('beforeend', containerTemplate());

	fetch(`/resources/pages/${state.page.lang}/home.json`)
		.then(response.getJson)
		.then(story => {
			if (state.mode !== 'production') {
				console.info('Story Info: ', story);
			}

			createBanner(story.backgroundImg);
			let container = document.querySelector('.story');

			story.experiences.forEach(experience => {
				container.insertAdjacentHTML('beforeend', experienceTemplate({
					orgName: experience.orgName,
					orgHref: experience.orgHref,
					jobTitle: experience.jobTitle,
					jobStart: experience.jobStart,
					jobEnd: experience.jobEnd,
					location: experience.location,
					isLogo: experience.isLogo,
					src: experience.src,
					srcset: experience.srcset,
					sizes: experience.sizes,
					altText: experience.altText,
					description: experience.description
				}));
			});
		})
		.catch(error => console.error(error));
};

let createBanner = backgroundImg => {
	banner.create({
		backgroundImg
	});
};

export default { create };