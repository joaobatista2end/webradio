<script setup lang="ts">
import AudioPlayer from "./components/AudioPlayer.vue";
import Logo from "./assets/logo.png";
</script>

<template>
  <main class="bg-zinc-800 min-h-screen py-2">
    <div class="flex flex-col items-center">
      <img :src="Logo" alt="" class="w-[200px]" />
      <AudioPlayer />
    </div>

    <div class="max-w-[360px] mx-auto mt-8">
      <div class="grid grid-cols-2 gap-2">
        <div
          class="p-4 border-2 rounded-lg border-white aspect-square flex items-center"
        >
          <h3 class="text-white text-center font-bold uppercase font-bold">
            Anuncie aqui sua marca
          </h3>
        </div>

        <div
          class="p-4 border-2 rounded-lg border-white aspect-square flex items-center"
        >
          <h3 class="text-white text-center font-bold uppercase font-bold">
            Anuncie aqui sua marca
          </h3>
        </div>

        <div
          class="p-4 border-2 rounded-lg border-white aspect-square flex items-center"
        >
          <h3 class="text-white text-center font-bold uppercase font-bold">
            Anuncie aqui sua marca
          </h3>
        </div>

        <div
          class="p-4 border-2 rounded-lg border-white aspect-square flex items-center"
        >
          <h3 class="text-white text-center font-bold uppercase font-bold">
            Anuncie aqui sua marca
          </h3>
        </div>
      </div>
    </div>
  </main>
</template>
