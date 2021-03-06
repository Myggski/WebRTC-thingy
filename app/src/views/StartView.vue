<template>
  <div class="content">
    <room-creator />
    <room-list :rooms="rooms" />
  </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import RoomCreator from '../components/RoomCreator';
import RoomList from '../components/RoomList';
import { roomModule } from '../store';
import { Room } from '../store/room/types';

@Options({
  components: {
    RoomCreator,
    RoomList,
  },
  created() {
    roomModule.getRooms();
  },
})
export default class StartView extends Vue {
  get rooms(): Room[] {
    return roomModule.rooms;
  }
}
</script>
