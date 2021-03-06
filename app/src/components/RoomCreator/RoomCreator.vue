<template>
  <form @submit.prevent="onSubmit">
    <input v-model="room.name" />
    <input v-model="room.type" />
  </form>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import { ROOM_TYPE } from '../../store/room/types';

interface Room {
  name: string;
  type: ROOM_TYPE;
}

@Options({})
export default class Home extends Vue {
  room: Room = {
    name: '',
    type: ROOM_TYPE.VOICE,
  };

  onSubmit() {
    console.log(this.room);
  }
}
</script>
