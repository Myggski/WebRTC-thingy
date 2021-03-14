<template>
  <div class="room-wrapper">
    <video id="remote-video" autoplay class="remote-video"></video>
    <video
      id="local-video"
      ref="localVideo"
      autoplay
      muted
      class="local-video"
    ></video>
  </div>
</template>
<script lang="ts">
// TODO: Seperate it more into smaller components, and make up a better name
import { Vue } from 'vue-class-component';
import { Ref } from 'vue-property-decorator';

export default class RoomDisplayer extends Vue {
  @Ref()
  localVideo: HTMLVideoElement;

  connectVoice() {
    navigator.getUserMedia(
      { video: false, audio: true },
      stream => {
        if (this.localVideo) {
          this.localVideo.srcObject = stream;
        }
      },
      error => {
        console.warn(error.message);
      },
    );
  }
}
</script>
