const AudioLibrary = window.Howl ? window.Howl : null;

const makeTone = (frequency, duration = 0.14, type = "sine", gain = 0.06) => {
  try {
    const ctx = new (window.AudioContext || window.webkitAudioContext)();
    const oscillator = ctx.createOscillator();
    const volume = ctx.createGain();
    oscillator.frequency.value = frequency;
    oscillator.type = type;
    volume.gain.value = gain;
    oscillator.connect(volume);
    volume.connect(ctx.destination);
    oscillator.start();
    volume.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + duration);
    oscillator.stop(ctx.currentTime + duration);
  } catch {
    // Browsers can block generated audio before a user gesture.
  }
};

export const audio = {
  music: null,
  ambience: null,
  init() {
    if (!AudioLibrary) return;
    this.ambience = new AudioLibrary({
      src: ["assets/music/ambient.mp3"],
      volume: 0,
      loop: true,
      html5: true
    });
    this.music = new AudioLibrary({
      src: ["assets/music/happy-birthday-instrumental.mp3"],
      volume: 0,
      loop: true,
      html5: true
    });
  },
  playAmbient() {
    if (!this.ambience) return;
    this.ambience.play();
    this.ambience.fade(0, 0.28, 1800);
  },
  playBirthdayMusic() {
    if (!this.music) return;
    this.music.play();
    this.music.fade(0, 1, 5000);
  },
  softenMusic() {
    if (this.music) this.music.fade(this.music.volume(), 0.18, 3500);
  },
  knock() { makeTone(128, 0.09, "triangle", 0.09); },
  unlock() { makeTone(640, 0.24, "sine", 0.08); },
  paper() { makeTone(380, 0.07, "sawtooth", 0.025); },
  confetti() { makeTone(820, 0.12, "sine", 0.04); },
  hover() { makeTone(500, 0.04, "sine", 0.025); },
  typing() { makeTone(720, 0.025, "square", 0.012); }
};
