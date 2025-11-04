<script setup lang="ts">
import type { MobType } from './types'
import MonsterCard from './components/MonsterCard.vue'
import items from './json/items.json'
import mobs from './json/mobs.json'

const filterItems = ref(['Mobs', 'Equip', 'Scroll', 'Use', 'Etc', 'Setup'])
const filterValue = ref(['Mobs', 'Equip', 'Scroll', 'Use', 'Etc', 'Setup'])

const input = ref('')
const allMobs = mobs as MobType[]
const filteredMobs = ref<MobType[]>(allMobs)

function resetFilter() {
  filterValue.value = ['Mobs', 'Equip', 'Scroll', 'Use', 'Etc', 'Setup']
  input.value = ''
}

const PAGE_SIZE = 10
const displayMobs = ref<MobType[]>([])
const currentPage = ref(1)

const shownText = ref('Loading...')
function loadMore() {
  const start = (currentPage.value - 1) * PAGE_SIZE
  const end = currentPage.value * PAGE_SIZE

  // 從「已過濾」的列表中取出下一批
  const newMobs = filteredMobs.value.slice(start, end)

  if (newMobs.length > 0) {
    displayMobs.value.push(...newMobs)
    currentPage.value++
  }
  else {
    shownText.value = 'It\'s the end.'
  }
}

const loadMoreTrigger = ref(null)
useIntersectionObserver(
  loadMoreTrigger,
  ([{ isIntersecting }]) => {
    if (isIntersecting) {
      loadMore()
    }
  },
)

watchDebounced([filterValue, input], () => {
  displayMobs.value = []
  currentPage.value = 1

  setTimeout(() => {
    const itemIds: number[] = []
    if (filterValue.value.includes('Equip') || filterValue.value.includes('Scroll') || filterValue.value.includes('Use') || filterValue.value.includes('Etc') || filterValue.value.includes('Setup')) {
      for (const [key, value] of Object.entries(items)) {
        if (value.name.toLowerCase().includes(input.value.toLowerCase())) {
          itemIds.push(+key)
        }
      }
    }

    filteredMobs.value = allMobs.filter((mob) => {
      const mobFilter: boolean = filterValue.value.includes('Mobs') ? mob.name.toLowerCase().includes(input.value.toLowerCase()) : false
      const equipFilter: boolean = filterValue.value.includes('Equip') ? mob.dropData.equip.some(e => itemIds.includes(e)) : false
      const scrollFilter: boolean = filterValue.value.includes('Scroll') ? mob.dropData.scroll.some(e => itemIds.includes(e)) : false
      const useFilter: boolean = filterValue.value.includes('Use') ? mob.dropData.use.some(e => itemIds.includes(e)) : false
      const etcFilter: boolean = filterValue.value.includes('Etc') ? mob.dropData.etc.some(e => itemIds.includes(e)) : false
      const setupFilter: boolean = filterValue.value.includes('Setup') ? mob.dropData.setup.some(e => itemIds.includes(e)) : false

      return mobFilter || equipFilter || scrollFilter || useFilter || etcFilter || setupFilter
    },
    )
    loadMore()
  }, 0)
}, { debounce: 1000, maxWait: 5000 })

onMounted(() => {
  loadMore()
})
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
                </div>
              </div>
              <div class="p-4 max-w-sm">
                <div>
                  Keyword Search
                </div>
                <div>
                  <UCheckboxGroup v-model="filterValue" color="neutral" :items="filterItems" />
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
            @click="resetFilter"
          />
        </div>
      </div>
      <div class="p-4 mt-18 sm:mt-10">
        <MonsterCard v-for="mob in displayMobs" :key="mob.id" :mob="mob" />
      </div>
      <div ref="loadMoreTrigger" class="h-20 w-full flex justify-center items-center">
        {{ shownText }}
      </div>
    </UApp>
  </div>
</template>

<style scoped>
html {
  font-family: 'Roboto', sans-serif;
}
</style>
