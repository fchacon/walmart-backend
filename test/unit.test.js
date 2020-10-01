const assert = require("assert");
const { isIdentifier, isPalindrome } = require("../utils");

describe("utils.js", function () {
	describe("#isIdentifier()", function () {
		it("should return true when the value is positive integer", function () {
			assert.strictEqual(isIdentifier(100), true);
		});

		it("should return false when the value is negative integer", function () {
			assert.strictEqual(isIdentifier(-100), false);
		});

		it("should return true when the value is zero", function () {
			assert.strictEqual(isIdentifier(0), true);
		});

		it("should return false when the value contains anything other than numbers", function () {
			assert.strictEqual(isIdentifier("100a1"), false);
			assert.strictEqual(isIdentifier("abc"), false);
			assert.strictEqual(isIdentifier("?ñna124"), false);
		});
	});

	describe("#isPalindrome()", function () {
		it("should return true when the value is one char", function () {
			assert.strictEqual(isPalindrome(1), true);
			assert.strictEqual(isPalindrome("a"), true);
		});

		it("should return true when the value is palindrome", function () {
			assert.strictEqual(isPalindrome(101), true);
			assert.strictEqual(isPalindrome(1001), true);
			assert.strictEqual(isPalindrome("anitalavalatina"), true);
			assert.strictEqual(isPalindrome("ava"), true);
		});

		it("should return false when the value is not palindrome", function () {
			assert.strictEqual(isPalindrome(1010), false);
			assert.strictEqual(isPalindrome(103401), false);
			assert.strictEqual(isPalindrome("anitalavalatinas"), false);
			assert.strictEqual(isPalindrome("avas"), false);
		});
	});
});
