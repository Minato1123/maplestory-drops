<script setup lang="ts">
import type { MobType } from '~/types'

defineProps<{
  mob: MobType
}>()
</script>

<template>
  <div class="flex flex-col sm:grid sm:grid-cols-[1fr_1px_6fr] pt-0 pb-4 sm:pt-4 bg-default border border-accented! rounded-lg mt-3">
    <div class="contents sm:block">
      <div class="flex flex-col items-center sticky top-20 sm:top-16 py-4 sm:py-0 rounded-lg sm:rounded-none bg-default/70">
        <div class="px-4 self-start">
          <div class="w-full flex items-center gap-px">
            <div class="bg-orange-400 text-white px-1 rounded text-[8px]">
              L
            </div>
            <div class="bg-orange-400 text-white px-1 rounded text-[8px]">
              V
            </div>
            <div class="ml-0.5 text-xs">
              {{ mob.info.level }}
            </div>
          </div>
          <div class="font-semibold leading-none">
            {{ mob.name }}
          </div>
        </div>
        <img :src="`data:image/png;base64, ${mob.img}`" alt="" class="my-4">
        <UPopover arrow>
          <UButton color="neutral" variant="soft" size="sm">
            Details
          </UButton>
          <template #content>
            <div class="p-4 w-48 flex flex-col gap-1.5 max-h-96 overflow-y-auto">
              <div class="bg-red-600 rounded text-white px-2 py-0.5 flex justify-between items-center text-sm">
                <div>
                  HP
                </div>
                <div class="font-semibold">
                  {{ mob.info.hp }}
                </div>
              </div>
              <div class="bg-blue-600 rounded text-white px-2 py-0.5 flex justify-between items-center text-sm">
                <div>
                  MP
                </div>
                <div class="font-semibold">
                  {{ mob.info.mp }}
                </div>
              </div>
              <div class="bg-amber-400 rounded text-white px-2 py-0.5 flex justify-between items-center text-sm">
                <div>
                  EXP
                </div>
                <div class="font-semibold">
                  {{ mob.info.exp }}
                </div>
              </div>
              <div class="border border-accented! rounded px-2 py-0.5 flex justify-between items-center text-sm">
                <div>
                  Avoidance
                </div>
                <div class="font-semibold">
                  {{ mob.info.eva }}
                </div>
              </div>
              <div class="border border-accented! rounded px-2 py-0.5 flex justify-between items-center text-sm">
                <div>
                  WDEF
                </div>
                <div class="font-semibold">
                  {{ mob.info.wdef }}
                </div>
              </div>
              <div class="border border-accented! rounded px-2 py-0.5 flex justify-between items-center text-sm">
                <div>
                  MDEF
                </div>
                <div class="font-semibold">
                  {{ mob.info.mdef }}
                </div>
              </div>
              <div class="border border-accented! rounded px-2 py-0.5 flex justify-between items-center text-sm">
                <div>
                  Accuracy
                </div>
                <div class="font-semibold">
                  {{ mob.info.acc }}
                </div>
              </div>
              <div class="text-xs text-right">
                ID: {{ mob.id }}
              </div>
            </div>
          </template>
        </UPopover>
      </div>
    </div>
    <USeparator orientation="vertical" class="hidden sm:block" />
    <div class=" flex flex-col gap-y-3 sm:pl-8 px-4">
      <div v-if="mob.dropData.equip.length > 0" class="flex sm:flex-row flex-col gap-2">
        <div class="w-14 text-sm font-semibold shrink-0 mt-3">
          Equip
        </div>
        <div class="flex flex-wrap gap-2">
          <DropsTag v-for="e in mob.dropData.equip" :key="e" :item-id="e" />
        </div>
      </div>
      <div v-if="mob.dropData.scroll.length > 0" class="flex sm:flex-row flex-col gap-2">
        <div class="w-14 text-sm font-semibold shrink-0 mt-3">
          Scroll
        </div>
        <div class="flex flex-wrap gap-2">
          <DropsTag v-for="s in mob.dropData.scroll" :key="s" :item-id="s" />
        </div>
      </div>
      <div v-if="mob.dropData.use.length > 0" class="flex sm:flex-row flex-col gap-2">
        <div class="w-14 text-sm font-semibold shrink-0 mt-3">
          Use
        </div>
        <div class="flex flex-wrap gap-2">
          <DropsTag v-for="u in mob.dropData.use" :key="u" :item-id="u" />
        </div>
      </div>
      <div v-if="mob.dropData.etc.length > 0" class="flex sm:flex-row flex-col gap-2">
        <div class="w-14 text-sm font-semibold shrink-0 mt-3">
          Etc
        </div>
        <div class="flex flex-wrap gap-2">
          <DropsTag v-for="etc in mob.dropData.etc" :key="etc" :item-id="etc" />
        </div>
      </div>
      <div v-if="mob.dropData.setup.length > 0" class="flex sm:flex-row flex-col gap-2">
        <div class="w-14 text-sm font-semibold shrink-0 mt-3">
          Set-up
        </div>
        <div class="flex flex-wrap gap-2">
          <DropsTag v-for="s in mob.dropData.setup" :key="s" :item-id="s" />
        </div>
      </div>
    </div>
  </div>
</template>
