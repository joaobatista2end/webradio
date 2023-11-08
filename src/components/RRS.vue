<template>
  <div
    class="news-ticker bg-green-900 text-yellow-500 font-bold"
    ref="tickerContainer"
  >
    <marquee-text :duration="6000">
      {{ state.news.join('• ───────────────── •') }}
    </marquee-text>
  </div>
</template>

<script lang="ts">
import { ref, onMounted, defineComponent, reactive, Ref } from 'vue';
import MarqueeText from 'vue-marquee-text-component';

export default defineComponent({
  name: 'NewsTicker',
  components: { MarqueeText },
  setup() {
    const tickerContainer: Ref<HTMLElement | null> = ref(null);
    const newsLoaded = ref(false);

    const state = reactive({
      news: [] as string[],
    });

    const fetchNews = async () => {
      try {
        const data: any = await fetch(
          'http://servicodados.ibge.gov.br/api/v3/noticias?tipo=noticia'
        ).then((response) => response.json());
        state.news = data?.items.map((noticia: any) => noticia.titulo) || [];
        newsLoaded.value = true; // News are loaded
      } catch (error) {
        console.error('Failed to fetch news', error);
        newsLoaded.value = false; // Handle the error state appropriately
      }
    };

    onMounted(async () => {
      await fetchNews();
    });

    return {
      state,
      tickerContainer,
      newsLoaded,
    };
  },
});
</script>

<style scoped>
.news-ticker {
  overflow: hidden;
  white-space: nowrap;
  position: relative;
  padding: 10px;
}

.news-ticker-content {
  display: flex;
  animation-name: marquee;
  animation-timing-function: linear;
  animation-iteration-count: infinite;
}

.news-item {
  padding: 0 2rem; /* Espaço entre as notícias */
  font-weight: bold;
  /* Usar flex para que cada item tenha o mesmo espaço e não quebre entre itens */
  flex-shrink: 0;
}
</style>
