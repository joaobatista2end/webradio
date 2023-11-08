<script setup lang="ts">
import AudioPlayer from './components/AudioPlayer.vue';
// import Adds from "./components/Adds.vue";
import RRS from './components/RRS.vue';

import Logo from './assets/logo.png';
</script>

<template>
  <main class="bg-zinc-800 min-h-[calc(100vh-44px)] py-2">
    <div class="flex flex-col items-center">
      <img :src="Logo" alt="" class="w-[200px]" />
      <audio-player />
    </div>
    <!-- <adds /> -->
  </main>

  <RRS />
</template>
