<template>
  <div class="content">
    <room-creator />
    <room-list :rooms="rooms" />
    <button type="button" @click.prevent="addRoom">SKAPA RUM</button>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import RoomCreator from '../components/RoomCreator';
import RoomList from '../components/RoomList';
import { roomModule } from '../store';
import { Room, RoomType } from '../store/room/types';
import { socketModule } from '../store';

@Options({
  components: {
    RoomCreator,
    RoomList,
  },
  created() {
    roomModule.getRooms();
  },
  mounted() {
    socketModule.socket.on('set-user-online', users => {
      console.log('users', users);
    });
  },
})
export default class StartView extends Vue {
  get rooms(): Room[] {
    return roomModule.rooms;
  }

  addRoom() {
    roomModule.createRoom(new Room('A room' + Date.now(), RoomType.VOICE));
  }
}
</script>
