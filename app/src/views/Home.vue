<template>
  <div class="home">
    <button @click.prevent="increment">Push {{ count }}</button>
    {{ derp }}
  </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';

@Options({
  watch: {
    count(value: number) {
      if (value > 10) {
        this.derp = 'Hello, world';
      }
    },
  },
  props: {
    titleDerp: String,
  },
})
export default class Home extends Vue {
  count = 0;
  derp = 'Hello';

  increment() {
    this.count++;
  }
}
</script>
