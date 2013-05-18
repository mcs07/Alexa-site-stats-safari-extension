var _gaq = _gaq || [];
	_gaq.push(['_setAccount', 'UA-125911-11']);
	_gaq.push(['_trackPageview']);
(function() {
	var ga = document.createElement('script'); ga.type = 'text/javascript'; ga.async = true;
	ga.src = 'https://ssl.google-analytics.com/ga.js';
	var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ga, s);
})();

(function() {
	var prevVersion = safari.extension.settings.version;
	switch (true) {
	case (prevVersion == 111): // No upgrade
		return;
	case (prevVersion == '1.1'):
	    _gaq.push(['_trackEvent', 'Install', '1.1']);
		return;
	case (prevVersion == 0): // New installation
		_gaq.push(['_trackEvent', 'Install', 'New']);
		break;
	}
	safari.extension.settings.version = 111;
})()
