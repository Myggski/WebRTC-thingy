<template>
  <div class="rooms-wrapper">
    <ul v-if="hasRooms" class="rooms">
      <li v-for="room in rooms" :key="room.id">
        {{ room.name }}
      </li>
    </ul>
    <div v-else class="button-wrapper">
      <app-button>
        Create Room
      </app-button>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Options, prop } from 'vue-class-component';
import { Room } from '../../store/room/types';
import AppButton from '../app/AppButton';

@Options({
  props: {
    rooms: prop<Room[]>({
      default: [],
      type: Array,
    }),
  },
  components: {
    AppButton,
  },
})
export default class RoomList extends Vue {
  private rooms: Room[];

  get hasRooms(): boolean {
    return Boolean(this.rooms?.length);
  }
}
</script>
