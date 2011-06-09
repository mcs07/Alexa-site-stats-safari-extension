function openPopup(event) {
	if (event.target.identifier != 'alexaPopup')
		return;
	
	var url = app.activeBrowserWindow.activeTab.url.match(/:\/\/(www\.)?(.[^/:]+)/)[2];
	
	if (url != currentUrl) {
		$('#container').hide();
		$('#error').hide();
		$('#loading').show();
		currentUrl = url;
		openUrl = 'http://www.alexa.com/siteinfo/'+url
		$.get('http://data.alexa.com/data?cli=10&dat=snbamz&url='+url, function(data) {
		
			var rank = $(data).find('POPULARITY').attr('TEXT');
			var rankDelta = $(data).find('RANK').attr('DELTA');
			var linksIn = $(data).find('LINKSIN').attr('NUM');
			
			if (!rank) {
				$('#loading').fadeOut(600, function() {
    				$('#error').fadeIn(600);
  				});
  				return;
			}
			
			if (rankDelta.charAt(0) == '-') {
				$('#rankDelta').css('background','url(images/up.png) no-repeat 0 50%');
			} else if (rankDelta == '+0') {
				$('#rankDelta').css('background','url(images/same.png) no-repeat 0 50%');
			} else {
				$('#rankDelta').css('background','url(images/down.png) no-repeat 0 50%');
			}
			
			$('#rank').text(rank);
			$('#rankDelta').text(rankDelta);
			$('#linksIn').text(linksIn);
			$('#graph').attr('src', 'http://traffic.alexa.com/graph?&w=400&h=220&o=f&c=1&y=r&b=ffffff&n=666666&r=2y&u='+url);
			$('#more').unbind('click');
			$('#more').click(function() {
				switch (ext.settings.resultsType) {
				case 'foreground':
					app.activeBrowserWindow.openTab('foreground').url = openUrl;
					break;
				case 'background':
					app.activeBrowserWindow.openTab('background').url = openUrl;
					break;
				case 'new':
					app.openBrowserWindow();
					app.activeBrowserWindow.activeTab.url = openUrl;
					break;
				case 'current':
					app.activeBrowserWindow.activeTab.url = openUrl;
					break;
				}
			});
			
			$('#loading').fadeOut(600, function() {
    			$('#container').fadeIn(600);
  			});
		});
	}
}

function validateCommand(event) {
	if (event.target.identifier !== 'alexaButton')
		return;
	
	event.target.disabled = !event.target.browserWindow.activeTab.url;
}

const app = safari.application,
	  ext = safari.extension;
var currentUrl = '';

app.addEventListener('popover', openPopup, false);
app.addEventListener('validate', validateCommand, false);
