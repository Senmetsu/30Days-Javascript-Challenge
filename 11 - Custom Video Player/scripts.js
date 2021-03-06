 // Elementen
const player = document.querySelector('.player')
const video = player.querySelector('.viewer')
const progress = player.querySelector('.progress')
const progressBar = player.querySelector('.progress__filled')
const toggle = player.querySelector('.toggle')
const skipButtons = player.querySelectorAll('[data-skip]')
const ranges = player.querySelectorAll('.player__slider')
const fullscreen = player.querySelector('.fullscreen')

 // Functies
 function togglePlay(){
    const method = video.paused ? 'play' : 'pause';
    video[method]();
 }

 function updateButton(){
     const icon = this.paused ? '►' : '❚ ❚';
     toggle.textContent = icon;
     console.log('update the button')
 }

 function skip(){
     console.log(this.dataset.skip)
     video.currentTime += parseFloat(this.dataset.skip)
 }
 
 function handleRangeUpdate(){
     video[this.name] = this.value;
 }

 function handleProgress(){
     const percent = (video.currentTime/video.duration) * 100;
     progressBar.style.flexBasis = `${percent}%`;
 }
 function scrub(e){
    const scrubTime = (e.offsetX / progress.offsetWidth) * video.duration;
    video.currentTime = scrubTime;
 }
 function fullScreen(){
	if(player.requestFullScreen){
		player.requestFullScreen();
	} else if(player.webkitRequestFullScreen){
		player.webkitRequestFullScreen();
	} else if(player.mozRequestFullScreen){
		player.mozRequestFullScreen();
	}
 }

 // Eventlisteners
video.addEventListener('click', togglePlay)
toggle.addEventListener('click', togglePlay)
fullscreen.addEventListener('click', fullScreen);

video.addEventListener('play', updateButton)
video.addEventListener('pause', updateButton)
video.addEventListener('timeupdate', handleProgress)

skipButtons.forEach(button => button.addEventListener('click', skip))

ranges.forEach(range => range.addEventListener('click', handleRangeUpdate))
ranges.forEach(range => range.addEventListener('mousemove', handleRangeUpdate))

let mousedown = false;
progress.addEventListener('click',scrub)
progress.addEventListener('mousemove',(e)=> mousedown && scrub(e));
progress.addEventListener('mousedown', () => mousedown = true);
progress.addEventListener('mouseup', () => mousedown = false);