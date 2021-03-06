<template>
  <transition name="fade" @afterLeave="focusActiveElement">
    <div
      v-if="show"
      :id="modalId"
      ref="modal"
      class="modal-wrapper"
      role="dialog"
      aria-modal="true"
      :aria-labelledby="headerId"
    >
      <!-- Backdrop -->
      <div class="modal-backdrop" @click.prevent="onCloseModal" />

      <!-- Modal -->
      <div class="modal">
        <!-- Header -->
        <div v-if="header" class="modal-header">
          <h2 id="headerId" class="header">{{ header }}</h2>
          <app-button-icon
            ref="close"
            icon="times"
            @click.prevent="onCloseModal"
          />
        </div>

        <!-- Content -->
        <div class="modal-content">
          <slot />
        </div>
      </div>
    </div>
  </transition>
</template>
<script lang="ts">
import { Vue, Options, prop } from 'vue-class-component';
import { Emit, Watch, Ref } from 'vue-property-decorator';
import { v4 as uuid } from 'uuid';
import AppButtonIcon from '../AppButtonIcon';

@Options({
  components: {
    AppButtonIcon,
  },
  emits: ['close'],
  props: {
    header: prop<string>({
      default: '',
    }),
    show: prop<boolean>({
      default: false,
    }),
  },
})
export default class AppModal extends Vue {
  private id = uuid();
  private show: boolean;
  private activeElement: HTMLElement;

  get headerId() {
    return `header-${this.id}`;
  }

  get modalId() {
    return `modal-${this.id}`;
  }

  /**
   * The Modal
   */
  @Ref()
  modal: HTMLDivElement;

  /**
   * Handles keydown event for tab isolation.
   * Also removes focus behind modal
   */
  @Watch('show')
  async onShowChanged() {
    if (this.show) {
      this.blurActiveElement();
      window.addEventListener('keydown', this.isolateTabbing);
    } else {
      window.removeEventListener('keydown', this.isolateTabbing);
    }
  }

  /**
   * The parent component handles the state whether the modal is to be displayed or not.
   * Therefore, the component need to emit to parent component, when to close
   */
  @Emit('close')
  onCloseModal(e: MouseEvent) {
    return e;
  }

  /**
   * Isolating the keyboard navigation, so the user only can navigate inside the modal
   * TODO: Make this a more general function so other components can use this also
   */
  isolateTabbing(e: KeyboardEvent) {
    const focusableElements =
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])';
    const focusableContent = this.modal.querySelectorAll(focusableElements);
    const firstFocusableElement = focusableContent[0];
    const lastFocusableElement = focusableContent[focusableContent.length - 1];
    const isTabPressed = e.key === 'Tab';
    const isInsideModal = document.activeElement?.closest(`#${this.modalId}`);

    if (!isTabPressed) {
      return;
    }

    if (e.shiftKey) {
      if (document.activeElement === firstFocusableElement || !isInsideModal) {
        (lastFocusableElement as HTMLElement)?.focus();
        e.preventDefault();
      }
    } else {
      if (document.activeElement === lastFocusableElement) {
        (firstFocusableElement as HTMLElement)?.focus();
        e.preventDefault();
      }
    }
  }

  /**
   * Saves the active element and blur it out
   */
  blurActiveElement() {
    this.activeElement = document.activeElement as HTMLElement;
    this.activeElement.blur();
  }

  /**
   * Focuses on previous elements that had focus before the modal was opened
   */
  focusActiveElement() {
    this.activeElement.focus();
    delete this.activeElement;
  }
}
</script>

<style lang="scss" scoped>
.modal-wrapper {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 1000;
  display: flex;
  justify-content: center;
  align-items: center;

  &.fade-enter-active,
  &.fade-leave-active {
    transition: opacity 300ms ease-in;
  }
  &.fade-enter-from,
  &.fade-leave-to {
    opacity: 0;
  }

  &.fade-enter-active {
    .modal {
      animation: bounce-in 300ms;
    }
  }

  &.fade-leave-active {
    .modal {
      animation: bounce-in 300ms reverse;
    }
  }

  .modal-backdrop {
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    background-color: #000;
    opacity: 0.85;
    z-index: -1;
  }

  .modal {
    position: relative;
    max-width: 440px;
    width: 100%;
    background-color: $color-dark;

    .modal-header {
      padding: $size-16;

      .header {
        margin: $size-8 0 0 0;
        text-align: center;
      }

      .button-icon {
        position: absolute;
        top: $size-8;
        right: $size-8;
      }
    }
  }
}

@keyframes bounce-in {
  0% {
    transform: scale(0);
  }
  50% {
    transform: scale(1.125);
  }
  100% {
    transform: scale(1);
  }
}
</style>
