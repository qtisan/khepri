
module.exports = {
	get isIOS() {
		return /iphone|ipad|ipod/i.test(this.get('user-agent'));
	},
};
