<script setup lang="ts">
import MonsterCard from './components/MonsterCard.vue';

</script>

<template>
  <div class="h-[100dvh] w-full overflow-x-hidden overflow-y-auto">
    <div class="fixed top-0 left-0 w-full flex flex-col sm:flex-row justify-between bg-white px-4 pt-2 pb-4 sm:pt-4 border-b border-gray-300 z-10 flex items-center gap-2 sm:gap-4">
      <div>
        MapleStory Drops
      </div>
      <div class="flex gap-2">
        <button class="bg-stone-100 hover:bg-stone-200 duration-300 w-8 h-8 rounded-full flex items-center justify-center" title="Filter">
          <div class="i-material-symbols:filter-list-rounded text-lg"></div>
        </button>
        <input
        class="w-56 border rounded-lg outline-none line-height-relaxed px-2 py-0.5"
         type="text"
         placeholder="Search Monster or Drops...">
        <button class="bg-stone-100 hover:bg-stone-200 duration-300 w-8 h-8 rounded-full flex items-center justify-center" title="Clear">
          <div class="i-ix:clear text-lg"></div>
        </button>
      </div>
    </div>
    <div class="p-4 mt-20 sm:mt-12">
      <MonsterCard v-for="i in 5" :key="i" />
    </div>
  </div>
</template>

<style scoped>
html {
  font-family: 'Roboto', sans-serif;
}

</style>