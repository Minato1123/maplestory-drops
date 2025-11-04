<script setup lang="ts">
import type { ItemInfoType } from '~/types'
import items from '../json/items.json'

const props = defineProps<{ itemId: number }>()
const allItems = items as Record<number, ItemInfoType>
const theItem = allItems[props.itemId]
</script>

<template>
  <UPopover v-if="theItem">
    <div class="flex items-center gap-2 px-2 py-1.5 border border-accented! rounded-lg text-sm shrink-0 hover:bg-elevated duration-300">
      <img :src="`data:image/png;base64, ${theItem.img}`" :alt="allItems[itemId]?.name">
      <div>{{ theItem.name }}</div>
    </div>
    <template #content>
      <div class="p-2 max-w-sm">
        <div v-if="theItem.reqLevel" class="text-xs">
          REQ LEV: {{ theItem.reqLevel }}
        </div>
        <div v-if="theItem.job && theItem.job.length" class="text-xs">
          <div v-if="theItem.job[0] < 0" class="font-bold text-orange-600">
            BIGINNER
          </div>
          <div v-else class="text-stone-300 flex gap-2">
            <div :class="{ 'font-bold text-orange-600': theItem?.job.includes(1) }">
              WARRIOR
            </div>
            <div :class="{ 'font-bold text-orange-600': theItem?.job.includes(2) }">
              MAGICIAN
            </div>
            <div :class="{ 'font-bold text-orange-600': theItem?.job.includes(3) }">
              BOWMAN
            </div>
            <div :class="{ 'font-bold text-orange-600': theItem?.job.includes(4) }">
              THIEF
            </div>
            <div :class="{ 'font-bold text-orange-600': theItem?.job.includes(5) }">
              PIRATE
            </div>
          </div>
          <div v-if="theItem.sfx" class="text-xs">
            CATEGORY: {{ theItem.sfx.toUpperCase() }}
          </div>
        </div>
        <div v-if="theItem.success" class="text-xs">
          RATE: {{ theItem.success }}%
        </div>
        <div class="text-xs text-right mt-1">
          ID: {{ itemId }}
        </div>
      </div>
    </template>
  </UPopover>
</template>
