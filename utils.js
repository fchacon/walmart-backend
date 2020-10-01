module.exports = {
	isIdentifier: (value) => {
		return /^\d+$/.test(value);
	},
	isPalindrome: (value) => {
		value = value + "";

		// eliminamos los espacios en blanco
		value = value.replace(/ /g, "");

		for (let i = 0; i < value.length / 2; i++) {
			if (value[i] != value[value.length - i - 1]) {
				return false;
			}
		}
		return true;
	},
};
