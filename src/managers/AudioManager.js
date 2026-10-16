import SoundSynth from '../utils/SoundSynth.js';

class AudioManager {
    constructor() {
        this.isMuted = false;
        // In a real project, we would also use Howler for MP3s
        // But for this "instant" build, we use the Synthesizer
    }

    async play(key, volume = 1.0) {
        if (this.isMuted) return;

        try {
            switch (key) {
                case 'buzz':
                    await SoundSynth.playBuzz(volume);
                    break;
                case 'slap':
                    await SoundSynth.playSlap();
                    break;
                case 'miss':
                    await SoundSynth.playThud();
                    break;
                case 'panic':
                    await SoundSynth.playAngry();
                    break;
                case 'laugh':
                    await SoundSynth.playBuzz(0.5);
                    break;
                default:
                    console.warn(`Sound key ${key} not found`);
            }
        } catch (e) {
            console.error("Audio playback error:", e);
        }
    }

    stop(key) {
        // Synthesized sounds are fire-and-forget for now
    }

    setMute(mute) {
        this.isMuted = mute;
    }
}

export default new AudioManager();
