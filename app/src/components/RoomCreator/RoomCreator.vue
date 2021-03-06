<template>
  <div>
    <div class="button-wrapper">
      <app-button @click="onOpenModal">
        Create Room
      </app-button>
    </div>
    <app-modal :header="header" :show="showModal" @close="onCloseModal" />
  </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import { ROOM_TYPE } from '../../store/room/types';
import AppButton from '../app/AppButton';
import AppModal from '../app/AppModal';

interface Room {
  name: string;
  type: ROOM_TYPE;
}

@Options({
  components: {
    AppButton,
    AppModal,
  },
})
export default class RoomCreator extends Vue {
  showModal = false;

  get header() {
    return 'Create a room';
  }

  onOpenModal() {
    this.showModal = true;
  }

  onCloseModal() {
    this.showModal = false;
  }
}
</script>
