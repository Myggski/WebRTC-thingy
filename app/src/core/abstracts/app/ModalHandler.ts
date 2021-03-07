import { Vue } from 'vue-class-component';

export default abstract class ModalHandler extends Vue {
  protected showModal = false;

  onOpenModal() {
    this.showModal = true;
  }

  onCloseModal() {
    this.showModal = false;
  }
}
