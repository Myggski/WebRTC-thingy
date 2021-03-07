<template>
  <div class="radio">
    <label
      :for="radioId"
      :class="{ 'is-checked': radioValue === value, 'is-focused': isFocused }"
    >
      <slot />
    </label>
    <input
      :id="radioId"
      v-model="radioValue"
      :name="name"
      type="radio"
      :value="value"
      @change="onValueChanged"
      @focus="focus"
      @blur="blur"
    />
  </div>
</template>
<script lang="ts">
import { Vue, Options } from 'vue-class-component';
import { Emit, Prop } from 'vue-property-decorator';
import { v4 as uuid } from 'uuid';
import { Changeable } from '../../../core/interfaces/events';

@Options({
  created() {
    this.updateRadioValue();
  },
  watch: {
    modelValue() {
      this.updateRadioValue();
    },
  },
  emits: ['change', 'update:modelValue'],
})
export default class AppRadio extends Vue implements Changeable {
  private id = uuid();
  private radioValue: string;
  private isFocused = false;

  @Prop({ required: true })
  modelValue!: string;

  @Prop({ required: true })
  value!: string;

  @Prop({ required: true })
  name!: string;

  get radioId() {
    return `radio-${this.id}`;
  }

  /**
   * Triggers on change-event
   * Emits change and updates model value
   */
  onValueChanged(e: Event): void {
    this.onChange(e);
    this.updateModelValue();
  }

  /**
   * Emits change
   */
  @Emit('change')
  onChange(e: Event): Event {
    return e;
  }

  /**
   * Updates model value
   */
  @Emit('update:modelValue')
  updateModelValue() {
    return this.radioValue;
  }

  updateRadioValue() {
    this.radioValue = this.modelValue;
  }

  focus() {
    console.log('focus');
    this.isFocused = true;
  }

  blur() {
    this.isFocused = false;
  }
}
</script>

<style lang="scss" scoped>
.radio {
  position: relative;
  display: flex;
  align-items: center;

  input[type='radio'] {
    position: absolute;
    opacity: 0;
    height: 0;
    width: 0;
  }

  label {
    line-height: normal;
    position: relative;
    padding: $size-8 $size-16 $size-8 $size-32;
    width: 100%;
    background-color: $color-darkest;
    margin-bottom: $size-8;
    border-radius: $size-4;
    border: 2px solid $color-darkest;
    transition: all 600ms cubic-bezier(0.25, 0.8, 0.25, 1);
    font-size: $font-size-L;

    @include far-circle;
    @include label-focus;
    @include hover {
      background-color: $color-darker;
    }

    &.is-checked {
      @include far-dot-circle;
      background-color: $color-primary-light;
    }

    ::v-deep svg[data-fa-pseudo-element=':before'] {
      position: absolute;
      left: $size-8;
      top: 50%;
      transform: translateY(-50%);
      font-size: $font-size-L;
    }
  }
}
</style>
