const EL_play = document.querySelector("#play");
const EL_loop = document.querySelector("#loop");
const RegionsPlugin = WaveSurfer.regions;

let  wavesurfer = WaveSurfer.create({
    container: "#audiowave",
    waveColor: "orange",
    progressColor: "#1e594f",
    height: 150,
    responsive: true,
    // mediaControls: true,
    hideScrollbar: true,
    cursorColor: "#5df9de",
    audioRate: 1,
    cursorWidth: 2,
    barWidth: 3,
    barGap: 1.0,
    skipLength: 5,
});

wavesurfer.load('Tems-Ft-Wizkid-Essence-[TrendyBeatz.com].mp3');


wavesurfer.on('ready', function () {
  var timeline = Object.create(WaveSurfer.Timeline);

  timeline.init({
    wavesurfer: wavesurfer,
    container: '#waveform-timeline',
    primaryFontColor: '#fff',
    primaryColor: '#fff',
    secondaryColor: '#fff',
    secondaryFontColor: '#fff'
  });
});

wavesurfer.on('audioprocess', function() {
  if (wavesurfer.isPlaying()) {
    var totalTime = wavesurfer.getDuration(),
        currentTime = wavesurfer.getCurrentTime(),
        remainingTime = totalTime - currentTime;
        
    document.getElementById('time-total').innerText = Math.round(totalTime / 60).toFixed(1); 
    document.getElementById('time-current').innerText = Math.floor(currentTime);
    // document.getElementById('time-remaining').innerText = Math.floor(remainingTime / 60).toFixed(2);



   

  }
});

const updateCurrentTime = () => {
    document.getElementById('time-current').innerText = wavesurfer.regions();
     }

$(".btn-toggle-pause").on("click", function() {
    wavesurfer.playPause();
    
});

$(".btn-backward").on("click", function() {
   
    wavesurfer.skipBackward();
});

$(".btn-forward").on("click", function() {
    wavesurfer.skipForward();
});

$(".btn-toggle-mute").on("click", function() {
    wavesurfer.toggleMute();
});

$(".btn-stop").on("click", function() {
    wavesurfer.stop();
});



// const Trim = {
//     loop: EL_loop.checked,
//     options: {
//       id: "Trim",
//       start: 0,
//       color: "rgba(0, 100, 255, 0.1)",
//     },
//     time: 0,
//     create(re) {
//       this.options.start = 0; // Set Trim start
//       this.options.end = wavesurfer.getDuration(); // Set Trim end to match audio duration
//       wavesurfer.addRegion(this.options); // Add Trim region to WaveSurfer instance
//       this.Region = wavesurfer.regions.list[this.options.id];
//     },
//     trimTime() {
//       const wasPlaying = wavesurfer.isPlaying();
//       const re = this.Region;
//       const isEnd = this.time >= re.end;
//       this.time = Math.min(Math.max(wavesurfer.getCurrentTime(), re.start), re.end);
//       if (isEnd) this.time = re.start;
//       if (isEnd && !this.loop) wavesurfer.pause();
//       wavesurfer.setCurrentTime(Math.max(0, this.time)); // https://github.com/katspaugh/wavesurfer.js/issues/1816
//     },
//     play() {
//       wavesurfer.playPause();
//     },
//   };
  
//   const updateUI = () => {
//     EL_play.classList.toggle("isPlaying", wavesurfer.isPlaying());
//   };
  
//   EL_loop.addEventListener("change", () => Trim.loop = EL_loop.checked); // play pause events
//   EL_play.addEventListener("click", () => Trim.play()); // play pause events
//   wavesurfer.on("region-updated", () => Trim.trimTime());
//   wavesurfer.on("ready", () => Trim.create());
//   wavesurfer.on("play", updateUI);
//   wavesurfer.on("pause", updateUI);
//   wavesurfer.on("audioprocess", () => Trim.trimTime());
// wavesurfer.load("http://upload.wikimedia.org/wikipedia/en/4/45/ACDC_-_Back_In_Black-sample.ogg"); // Load Sound!