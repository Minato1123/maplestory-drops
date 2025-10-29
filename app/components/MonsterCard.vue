<script setup lang="ts">
</script>

<template>
<div class="flex sm:flex-row flex-col sm:items-start pt-0 pb-4 sm:pt-4 border border-gray-300 rounded-lg mt-3">
  <div class="flex flex-col items-center sticky top-22 sm:top-18 px-8 py-4 sm:py-0 bg-white/70 rounded-lg">
    <div>
      <div class="w-full flex items-center gap-0.2">
        <div class="bg-orange text-white px-1 rounded text-2">L</div>
        <div class="bg-orange text-white px-1 rounded text-2">V</div>
        <div class="ml-0.5 text-xs">8</div>
      </div>
      <div class="font-600 leading-none">Mushroom</div>
    </div>
    <img src="/mushroom.gif" alt="" class="my-4">
    <button class="bg-stone-100 hover:bg-stone-200 duration-300 px-3 py-1 rounded-lg text-xs">
        Details
      </button>
  </div>
  <div class="flex flex-col gap-y-3 border-l-0 sm:border-l-1! border-gray-300 sm:pl-8 px-4">
    <div class="flex sm:flex-row flex-col gap-2">
      <div class="w-14 text-sm font-600 shrink-0 mt-3">Equip</div>
      <div class="flex flex-wrap gap-2">
        <DropsTag v-for="i in 10" :key="i" />
      </div>
    </div>
    <div class="flex sm:flex-row flex-col gap-2">
      <div class="w-14 text-sm font-600 shrink-0 mt-3">Scroll</div>
      <div class="flex flex-wrap gap-2">
        <DropsTag v-for="i in 5" :key="i" />
      </div>
    </div>
    <div class="flex sm:flex-row flex-col gap-2">
      <div class="w-14 text-sm font-600 shrink-0 mt-3">Use</div>
      <div class="flex flex-wrap gap-2">
        <DropsTag v-for="i in 3" :key="i" />
      </div>
    </div>
    <div class="flex sm:flex-row flex-col gap-2">
      <div class="w-14 text-sm font-600 shrink-0 mt-3">Etc</div>
      <div class="flex flex-wrap gap-2">
        <DropsTag v-for="i in 9" :key="i" />
      </div>
    </div>
  </div>
</div>
</template>