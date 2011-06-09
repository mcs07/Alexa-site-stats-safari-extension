var _gaq = _gaq || [];
	_gaq.push(['_setAccount', 'UA-125911-11']);
	_gaq.push(['_trackPageview']);
(function() {
	var ga = document.createElement('script'); ga.type = 'text/javascript'; ga.async = true;
	ga.src = 'https://ssl.google-analytics.com/ga.js';
	var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ga, s);
})();
var previousVersion = safari.extension.settings.version;
var currentVersion = '1.1'
if (previousVersion != currentVersion) {
	_gaq.push(['_trackEvent', currentVersion, previousVersion]);
	safari.extension.settings.version = currentVersion;
}
