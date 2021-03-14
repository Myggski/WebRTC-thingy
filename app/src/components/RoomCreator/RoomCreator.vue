<template>
  <div>
    <div class="button-wrapper">
      <app-button @click="onOpenModal">
        Create Room <fa class="button-icon" :icon="['far', 'comments']" />
      </app-button>
    </div>
    <app-modal :header="header" :show="showModal" @close="onCloseModal">
      <app-radio v-model="roomTypeModel" name="type" :value="roomType.VOICE">
        <fa class="icon" icon="volume-up" /> Voice
      </app-radio>
      <app-radio v-model="roomTypeModel" name="type" :value="roomType.TEXT">
        <fa class="icon" icon="hashtag" /> Text
      </app-radio>
    </app-modal>
  </div>
</template>

<script lang="ts">
import { Options } from 'vue-class-component';
import { RoomType } from '../../store/room/types';
import AppButton from '../app/AppButton';
import AppModal from '../app/AppModal';
import AppRadio from '../app/AppRadio';
import ModalHandler from '../../core/abstracts/app/ModalHandler';

@Options({
  components: {
    AppButton,
    AppModal,
    AppRadio,
  },
})
export default class RoomCreator extends ModalHandler {
  private roomTypeModel = RoomType.VOICE;

  get roomType(): typeof RoomType {
    return RoomType;
  }

  get header(): string {
    const channelType =
      this.roomTypeModel === RoomType.VOICE ? 'Voice' : 'Text';

    return `Create ${channelType} Channel`;
  }
}
</script>

<style lang="scss" scoped>
::v-deep .icon {
  margin: 0 $size-4;
}

::v-deep .button-icon {
  margin-left: $size-8;
}
</style>
