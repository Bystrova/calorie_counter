const minActivity = 1.2;
const lowActivity = 1.375;
const mediumActivity = 1.55;
const highActivity = 1.725;
const maxActivity = 1.9;

const form = document.querySelector('.form');
const ageField = document.getElementById('age');
const heightField = document.getElementById('height');
const weightField = document.getElementById('weight');
const resetBtn = form.querySelector('.form__reset-button');
const submitBtn = form.querySelector('.form__submit-button');
const counterResult = document.querySelector('.counter__result');
const caloriesNorm = document.getElementById('calories-norm');
const caloriesMinimal = document.getElementById('calories-minimal');
const caloriesMaximal = document.getElementById('calories-maximal');

let isMale = true;
let age = 0;
let height = 0;
let weight = 0;
let activity = minActivity;

const userParams = {
	age: 'age',
	height: 'height',
	weight: 'weight',
};

const radioGroup = {
	gender: 'gender',
	activity: 'activity',
};

const gender = {
	male: 'male',
	female: 'female',
};

const activityLevel = {
	min: 'min',
	low: 'low',
	medium: 'medium',
	high: 'high',
	max: 'max',
};

const getCaloriesNorm = (isMale) => {
	let caloriesNorm = 0;
	if (isMale) {
		caloriesNorm = (10 * weight + 6.25 * height - 5 * age + 5) * activity;
	} else {
		caloriesNorm = (10 * weight + 6.25 * height - 5 * age - 161) * activity;
	}
	return Math.round(caloriesNorm);
};

const looseWeight = (isMale) => {
	return Math.round(getCaloriesNorm(isMale) - getCaloriesNorm(isMale) * 0.15);
};

const gainWeight = (isMale) => {
	return Math.round(getCaloriesNorm(isMale) + getCaloriesNorm(isMale) * 0.15);
};

const getCalorieValue = (val) => {
	let calorie = val.toString().split('');
	calorie.splice(1, 0, ' ');
	calorie = calorie.join('');
	return calorie;
};

form.addEventListener('input', (evt) => {
	switch (evt.target.id) {
		case userParams.age:
			age = Number(ageField.value);
			break;
		case userParams.height:
			height = Number(heightField.value);
			break;
		case userParams.weight:
			weight = Number(weightField.value);
			break;
	}

	if (!!age && !!height && !!weight) {
		submitBtn.removeAttribute('disabled');
	}
	if (!!age || !!height || !!weight) {
		resetBtn.removeAttribute('disabled');
	}
});

form.addEventListener('change', (evt) => {
	if (evt.target.name === radioGroup.activity) {
		switch (evt.target.value) {
			case activityLevel.min:
				activity = minActivity;
				break;
			case activityLevel.low:
				activity = lowActivity;
				break;
			case activityLevel.medium:
				activity = mediumActivity;
				break;
			case activityLevel.high:
				activity = highActivity;
				break;
			case activityLevel.max:
				activity = maxActivity;
				break;
		}
	} else if (evt.target.name === radioGroup.gender) {
		if (evt.target.value === gender.male) {
			isMale = true;
		} else {
			isMale = false;
		}
	}
});

form.addEventListener('submit', (evt) => {
	evt.preventDefault();
	counterResult.classList.remove('counter__result--hidden');
	caloriesNorm.textContent = getCalorieValue(getCaloriesNorm(isMale));
	caloriesMinimal.textContent = getCalorieValue(looseWeight(isMale));
	caloriesMaximal.textContent = getCalorieValue(gainWeight(isMale));
});

form.addEventListener('reset', () => {
	isMale = true;
	age = 0;
	height = 0;
	weight = 0;
	activity = minActivity;
	counterResult.classList.add('counter__result--hidden');
	submitBtn.setAttribute('disabled', 'disabled');
	resetBtn.setAttribute('disabled', 'disabled');
});
