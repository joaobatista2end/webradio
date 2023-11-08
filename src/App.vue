<script setup lang="ts">
import AudioPlayer from './components/AudioPlayer.vue';
import Adds from './components/Adds.vue';
import RRS from './components/RRS.vue';

import Logo from './assets/logo.png';
</script>

<template>
  <main class="bg-zinc-800 min-h-screen pt-12 relative">
    <div class="flex flex-col items-center mb-12">
      <img :src="Logo" alt="" class="w-[200px]" />
      <audio-player />
    </div>

    <adds />

    <div class="fixed top-0">
      <RRS />
    </div>
  </main>
</template>
