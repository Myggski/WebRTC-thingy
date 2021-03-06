<template>
  <div class="content">
    <h1>This is a header</h1>
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
})
export default class StartView extends Vue {
  get rooms(): Room[] {
    return roomModule.rooms;
  }

  async created() {
    await roomModule.getRooms();
  }
}
</script>
