class SoundControl {
    constructor() {
        this.isMuted = true;

        const unmute = document.getElementById("unmute");
        unmute.addEventListener("click", () => {
            this.isMuted = false;
            this.scene.mute(this.isMuted);
            unmute.classList.add("hide");
            mute.classList.remove("hide");
        });

        const mute = document.getElementById("mute");
        mute.addEventListener("click", () => {
            this.isMuted = true;
            this.scene.mute(this.isMuted);
            mute.classList.add("hide");
            unmute.classList.remove("hide");
        });
    }

    setScene(scene) {
        this.scene = scene;
        if (this.scene.mute) {
            this.scene.mute(this.isMuted);
        }
    }
}
export default new SoundControl;