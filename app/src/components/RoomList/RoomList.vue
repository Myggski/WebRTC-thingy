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
import { Vue } from 'vue-class-component';
import { Prop } from 'vue-property-decorator';
import { Room } from '../../store/room/types';

export default class RoomList extends Vue {
  @Prop({ default: [] })
  private rooms: Room[];

  get hasRooms(): boolean {
    return Boolean(this.rooms?.length);
  }
}
</script>
