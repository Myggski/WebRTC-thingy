<template>
  <button class="button-icon" type="button" @click.prevent="onClick">
    <fa :icon="[type, icon]" />
  </button>
</template>

<script lang="ts">
import { Vue, Options } from 'vue-class-component';
import { Emit, Prop } from 'vue-property-decorator';
import { Clickable } from '../../../core/interfaces/events';

@Options({
  emits: ['click'],
})
export default class AppButtonIcon extends Vue implements Clickable {
  @Prop({ required: true })
  icon!: string;

  @Prop({ default: 'fas' })
  type: string;

  @Prop()
  srOnly: string;

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
    color: $color-lightest;
  }

  @include button-focus {
    color: $color-lightest;
  }
}
</style>
