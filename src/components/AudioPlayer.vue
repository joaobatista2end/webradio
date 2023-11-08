<template>
  <div class="bg-green-900 inline-block rounded-lg">
    <audio
      ref="audioPlayer"
      controls
      autoplay
      preload="auto"
      loop
      :src="audioStreamURL"
      class="hidden"
    ></audio>
    <div class="flex items-center gap-2 px-8 py-4">
      <div class="flex gap-2">
        <button
          @click="decreaseVolume"
          class="px-2 py-1 bg-green-600 text-white rounded-full h-8 w-8"
        >
          <Volume1Icon class="h-4 w-4" />
        </button>

        <button
          @click="increaseVolume"
          class="px-2 py-1 bg-green-600 text-white rounded-full h-8 w-8"
        >
          <Volume2Icon class="h-4 w-4" />
        </button>
      </div>

      <!-- <div class="h-20 w-20 bg-green-950 rounded-md">
        <img :src="coverImage" alt="" />
      </div> -->
      <div class="flex gap-2">
        <button
          @click="togglePlay"
          class="px-2 py-1 bg-green-600 text-white rounded-full h-10 w-10"
        >
          <PlayIcon v-if="!isPlaying" />
          <PauseIcon v-else />
        </button>

        <button
          @click="updateToCurrentTime"
          :disabled="isPlaying"
          class="px-2 py-1 bg-green-600 text-white rounded-full h-10 w-10 disabled:bg-green-800 disabled:text-green-600"
        >
          <RefreshCwIcon />
        </button>
      </div>
    </div>

    <div class="text-center py-2 border-t border-green-700">
      <h3 class="text-white">{{ horaAtual }}</h3>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted, onUnmounted } from "vue";
import {
  PlayIcon,
  PauseIcon,
  Volume1Icon,
  Volume2Icon,
  RefreshCwIcon,
} from "lucide-vue-next";
const isPlaying = ref(false);
const audioStreamURL = "https://stm2.xcast.com.br:11186/stream";
const audioPlayer = ref<HTMLAudioElement>();
const horaAtual = ref("");
const intervalID = ref();

const atualizarHora = () => {
  const horaMaceio = new Date().toLocaleTimeString("pt-BR", {
    timeZone: "America/Maceio",
  });
  horaAtual.value = horaMaceio;
};

const togglePlay = () => {
  if (audioPlayer.value) {
    if (audioPlayer.value.paused) {
      audioPlayer.value.play();
    } else {
      audioPlayer.value.pause();
    }
  }
};

const increaseVolume = () => {
  if (audioPlayer.value) {
    if (audioPlayer.value.volume < 1) {
      audioPlayer.value.volume += 0.1;
    }
  }
};

const decreaseVolume = () => {
  if (audioPlayer.value) {
    if (audioPlayer.value.volume > 0) {
      audioPlayer.value.volume -= 0.1;
    }
  }
};

const updateToCurrentTime = () => {
  if (audioPlayer.value) {
    audioPlayer.value.src = ""; // Limpa o src atual
    audioPlayer.value.load(); // Força o elemento audio a recarregar
    audioPlayer.value.src = audioStreamURL; // Define o src com o novo stream
    audioPlayer.value.play(); // Inicia a reprodução do novo stream
  }
};

onMounted(() => {
  intervalID.value = setInterval(atualizarHora, 1000);

  // Atualiza a hora imediatamente ao montar o componente
  atualizarHora();

  if (audioPlayer.value) {
    audioPlayer.value.addEventListener("play", () => {
      isPlaying.value = true;
    });
    audioPlayer.value.addEventListener("pause", () => {
      isPlaying.value = false;
    });
    audioPlayer.value.addEventListener("", () => {
      isPlaying.value = false;
    });

    audioPlayer.value.play();
  }
});

onUnmounted(() => {
  clearInterval(intervalID.value); // Limpa o intervalo quando o componente for desmontado
});
</script>
