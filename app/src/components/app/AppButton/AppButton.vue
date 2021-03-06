<template>
  <button class="button" type="button" @click.prevent="onClick">
    <slot />
    <span
      v-if="showRipple"
      ref="ripple"
      class="ripple"
      :style="`--top: ${rippleTopPosition}px; --left: ${rippleLeftPosition}px;`"
    />
  </button>
</template>

<script lang="ts">
import { Vue, Options } from 'vue-class-component';
import { Emit, Ref } from 'vue-property-decorator';
import { Clickable } from '../../../interfaces/events';

@Options({
  emits: ['click'],
})
export default class AppButton extends Vue implements Clickable {
  rippleEffectTimeout = 0;
  showRipple = false;
  rippleLeftPosition: number;
  rippleTopPosition: number;

  @Ref()
  readonly ripple!: HTMLSpanElement;

  @Emit('click')
  async onClick(e: PointerEvent): Promise<PointerEvent> {
    console.log(e);
    this.showRipple = false;
    clearTimeout(this.rippleEffectTimeout);
    await this.$nextTick();

    const target = e.currentTarget as HTMLButtonElement;
    this.rippleLeftPosition = e.clientX - target.offsetLeft;
    this.rippleTopPosition = e.clientY - target.offsetTop;

    this.showRipple = true;
    await this.$nextTick();

    this.rippleEffectTimeout = setTimeout(() => {
      this.showRipple = false;
    }, 600);

    return e;
  }
}
</script>

<style scoped lang="scss">
.button {
  position: relative;
  overflow: hidden;
  background-color: $color-primary-light;
  border: none;
  border-radius: $size-4;
  color: $color-lightest;
  font-size: $font-size-M;
  font-weight: bold;
  padding: $size-8 $size-24;
  margin-bottom: $size-8;

  &:after {
    background: #fff;
    content: '';
    height: 125%;
    left: -100%;
    opacity: 0.2;
    position: absolute;
    top: 0%;
    transform: rotate(-45deg);
    transition: left 1s cubic-bezier(0.19, 1, 0.22, 1);
    width: 100%;
  }

  @include hover {
    cursor: pointer;

    &:after {
      left: 120%;
    }
  }

  @include button-focus;

  .ripple {
    position: absolute;
    top: var(--top);
    left: var(--left);
    border-radius: 50%;
    background-color: $color-light;
    width: 100px;
    height: 100px;
    margin-top: -50px;
    margin-left: -50px;
    opacity: 0;
    animation: ripple 1s;
  }
}

/* Add animation */
@keyframes ripple {
  from {
    opacity: 1;
    transform: scale(0);
  }

  to {
    opacity: 0;
    transform: scale(10);
  }
}
</style>
