<script setup lang="ts">
import items from '../json/items.json'

defineProps<{ itemId: number }>()
</script>

<template>
  <UPopover>
    <div class="flex items-center gap-2 px-2 py-1.5 border border-accented! rounded-lg text-sm shrink-0 hover:bg-stone-100 duration-300">
      <img :src="`data:image/png;base64, ${items[itemId].img}`" :alt="items[itemId].name">
      <div>{{ items[itemId].name }}</div>
    </div>
    <template #content>
      <div class="p-2 max-w-sm">
        <div v-if="items[itemId].reqLevel" class="text-xs">
          REQ LEV: {{ items[itemId].reqLevel }}
        </div>
        <div v-if="items[itemId].job" class="text-xs">
          <div v-if="items[itemId].job[0] < 0" class="font-bold text-orange-600">
            BIGINNER
          </div>
          <div v-else class="text-stone-300 flex gap-2">
            <div :class="{ 'font-bold text-orange-600': items[itemId].job.includes(1) }">
              WARRIOR
            </div>
            <div :class="{ 'font-bold text-orange-600': items[itemId].job.includes(2) }">
              MAGICIAN
            </div>
            <div :class="{ 'font-bold text-orange-600': items[itemId].job.includes(3) }">
              BOWMAN
            </div>
            <div :class="{ 'font-bold text-orange-600': items[itemId].job.includes(4) }">
              THIEF
            </div>
            <div :class="{ 'font-bold text-orange-600': items[itemId].job.includes(5) }">
              PIRATE
            </div>
          </div>
          <div v-if="items[itemId].sfx" class="text-xs">
            CATEGORY: {{ items[itemId].sfx.toUpperCase() }}
          </div>
        </div>
        <div v-if="items[itemId].success" class="text-xs">
          RATE: {{ items[itemId].success }}%
        </div>
        <div class="text-xs text-right mt-1">
          ID: {{ itemId }}
        </div>
      </div>
    </template>
  </UPopover>
</template>
