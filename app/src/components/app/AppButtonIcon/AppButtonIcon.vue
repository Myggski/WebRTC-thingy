<template>
  <button class="button-icon" type="button" @click.prevent="onClick">
    <fa :icon="icon" :type="type" />
  </button>
</template>

<script lang="ts">
import { Vue, Options, prop } from 'vue-class-component';
import { Emit } from 'vue-property-decorator';
import { Clickable } from '../../../interfaces/events';

@Options({
  emits: ['click'],
  props: {
    icon: prop<string>({
      required: true,
    }),
    type: prop<string>({
      default: 'fas',
    }),
  },
})
export default class AppButtonIcon extends Vue implements Clickable {
  @Emit('click')
  onClick(e: PointerEvent): PointerEvent {
    return e;
  }
}
</script>

<style lang="scss" scoped>
.button-icon {
  background-color: transparent;
  border: none;
  color: $color-light;
  font-size: $size-24;

  @include hover {
    cursor: pointer;
    color: $color-lightest;
  }

  @include button-focus;
}
</style>
