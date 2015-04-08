
// Screenshot from	https://vimeo.com/35132562
// Or				http://www.dailymotion.com/video/x2dntv_back-to-life-back-to-reality_fun
// Or				https://www.youtube.com/watch?v=_Xmu-DOTChE

function onTimeUpdate(e) {
	var delta = Math.max(0.5, 0.5 * this.playbackRate);
	if ( this.currentTime >= this.duration - delta ) {
		this.currentTime = 0;
	}
}

function createXButton($box, onClick) {
	var $button = $box.querySelector('button');
	$button.onclick = onClick;

	$button.onmouseover = function() {
		with ( this.previousElementSibling.classList ) {
			remove('hidden');
			remove('invisible');
			add('visible');
		}
	};
	$button.onmouseout = function() {
		with ( this.previousElementSibling.classList ) {
			add('hidden');
			add('invisible');
			remove('visible');
		}
	};

	return $button;
}

function createSpeedButton(video) {
	var $box = document.createElement('div');
	$box.className = 'box';

	var html = '';
	html += '<style>';
	html += 'html .player .speed-button { color: white; font-weight: bold; } \n';
	html += 'html .player .speed-button.on { background-color: rgb(0, 173, 239); } \n';
	html += 'html .player .speed-button.on:active { background-color: rgb(0, 147, 203); } \n';
	html += '</style>';
	html += '<label class="rounded-box speed-label invisible hidden" role="presentation"><span>Playback rate</span></label>';
	html += '<button title="Set playback speed - 1x" tabindex="50" class="speed-button speed-button-x rounded-box" aria-label="Speed" onclick="document.querySelector(\'div.player video\').playbackRate = 1;">1x</button>';
	html += '<button title="Set playback speed - 1.25x" tabindex="50" class="speed-button speed-button-x rounded-box" aria-label="Speed" onclick="document.querySelector(\'div.player video\').playbackRate = 1.25;">1.25x</button>';
	html += '<button title="Set playback speed - 1.5x" tabindex="50" class="speed-button speed-button-x rounded-box" aria-label="Speed" onclick="document.querySelector(\'div.player video\').playbackRate = 1.5;">1.5x</button>';
	html += '<button title="Set playback speed - 1.75x" tabindex="50" class="speed-button speed-button-x rounded-box" aria-label="Speed" onclick="document.querySelector(\'div.player video\').playbackRate = 1.75;">1.75x</button>';
	html += '<button title="Set playback speed - 2x" tabindex="50" class="speed-button speed-button-x rounded-box" aria-label="Speed" onclick="document.querySelector(\'div.player video\').playbackRate = 2;">2x</button>';

	$box.innerHTML = html;
	
	var $button = createXButton($box, function(e) {});
	
	return $box;
}

var $player = document.querySelector('div.player');

if ( $player ) {
	var mo = new MutationObserver(function(muts) {
		setTimeout(function() {
			var video = $player.querySelector('video');
			
			// Verify this is a vimeo-based video (embedded or otherwise)
			if (video.src.indexOf('vimeo') > -1) {
				var $buttons = $player.querySelector('.controls-wrapper .sidedock');

				if ( $buttons ) {
					var $box = createSpeedButton(video);
					$buttons.appendChild($box);
				}
			}
		}, 1);
	});
	mo.observe($player, {"childList": 1})
}