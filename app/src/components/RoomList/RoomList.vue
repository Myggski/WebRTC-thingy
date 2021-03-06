<template>
  <div class="rooms-wrapper">
    <ul v-if="hasRooms" class="rooms">
      <li v-for="room in rooms" :key="room.id">
        {{ room.name }}
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import { Vue, Options, prop } from 'vue-class-component';
import { Room } from '../../store/room/types';

@Options({
  props: {
    rooms: prop<Room[]>({
      default: [],
      type: Array,
    }),
  },
})
export default class RoomList extends Vue {
  private rooms: Room[];

  get hasRooms(): boolean {
    return Boolean(this.rooms?.length);
  }

  onClick() {
    console.log('click');
  }
}
</script>
