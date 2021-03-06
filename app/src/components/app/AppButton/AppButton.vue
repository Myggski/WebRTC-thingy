<template>
  <button class="button">
    <slot />
  </button>
</template>

<script lang="ts">
import { Vue } from 'vue-class-component';

export default class AppButton extends Vue {}
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
  padding: 8px 24px;

  &:after {
    background: #fff;
    content: '';
    height: 125%;
    left: -75%;
    opacity: 0.2;
    position: absolute;
    top: -25%;
    transform: rotate(-45deg);
    transition: all 550ms cubic-bezier(0.19, 1, 0.22, 1);
    width: 50%;
  }

  @include hover {
    cursor: pointer;

    &:after {
      left: 120%;
      transition: all 550ms cubic-bezier(0.19, 1, 0.22, 1);
    }
  }
}
</style>
