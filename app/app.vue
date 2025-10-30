<script setup lang="ts">
import MonsterCard from './components/MonsterCard.vue'

const input = ref('')
const maps = ref([])

const items = [
  { label: 'Sleepywood', value: 'sleepywood' },
  { label: 'El Nath', value: 'elnath' },
  { label: 'Orbis', value: 'orbis' },
  { label: 'Ludibrium', value: 'ludibrium' },
  { label: 'Ariant', value: 'ariant' },
  { label: 'Leafre', value: 'leafre' },
  { label: 'Temple of Time', value: 'templeoftime' },
  { label: 'Magatia', value: 'magatia' },
  { label: 'Nautilus', value: 'nautilus' },
  { label: 'Singapore', value: 'singapore' },
]
</script>

<template>
  <div class="h-dvh w-full overflow-x-hidden overflow-y-auto bg-elevated">
    <UApp>
      <div class="fixed top-0 left-0 w-full  flex-col sm:flex-row justify-between bg-default px-4 pt-2 pb-3 sm:pt-3 border-b border-accented! z-10 flex items-center gap-2 sm:gap-4">
        <div class="flex items-center gap-1">
          MapleStory Drops
          <ColorModeBtn />
        </div>
        <div class="flex gap-1 items-center">
          <UPopover arrow>
            <UChip inset color="error">
              <UButton
                icon="i-material-symbols:filter-list-rounded"
                color="neutral"
                variant="ghost"
                aria-label="Filter"
              />
            </UChip>
            <template #content>
              <div class="p-4 max-w-sm">
                <div>
                  Filter
                </div>
                <div>
                  <div>
                    <div>
                      Lowest Level
                    </div>
                    <UInputNumber color="neutral" :default-value="0" />
                    <div>
                      Highest Level
                    </div>
                    <UInputNumber color="neutral" :default-value="200" />
                  </div>
                  <div>
                    Map
                  </div>
                  <UCheckboxGroup
                    v-model="maps"
                    color="neutral"
                    variant="list"
                    :items="items"
                  />
                </div>
              </div>
            </template>
          </UPopover>
          <UInput
            v-model="input"
            color="neutral"
            variant="soft"
            icon="i-lucide-search"
            placeholder="Search Monster or Drops..."
            class="w-3xs sm:w-2xs"
          />
          <UButton
            icon="i-ix:clear"
            color="neutral"
            variant="ghost"
            aria-label="Clear"
          />
        </div>
      </div>
      <div class="p-4 mt-18 sm:mt-10">
        <MonsterCard v-for="i in 5" :key="i" />
      </div>
    </UApp>
  </div>
</template>

<style scoped>
html {
  font-family: 'Roboto', sans-serif;
}
</style>
