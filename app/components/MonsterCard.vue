<script setup lang="ts">
</script>

<template>
  <div class="flex sm:flex-row flex-col sm:items-start pt-0 pb-4 sm:pt-4 bg-default border border-accented! rounded-lg mt-3">
    <div class="flex flex-col items-center sticky top-20 sm:top-16 px-8 py-4 sm:py-0 rounded-lg bg-default/70">
      <div>
        <div class="w-full flex items-center gap-px">
          <div class="bg-orange-400 text-white px-1 rounded text-[8px]">
            L
          </div>
          <div class="bg-orange-400 text-white px-1 rounded text-[8px]">
            V
          </div>
          <div class="ml-0.5 text-xs">
            8
          </div>
        </div>
        <div class="font-semibold leading-none">
          Mushroom
        </div>
      </div>
      <img src="/mushroom.gif" alt="" class="my-4">
      <UPopover arrow>
        <UButton color="neutral" variant="soft" size="sm">
          Details
        </UButton>
        <template #content>
          <div class="p-4 w-xs flex flex-col gap-1.5 max-h-96 overflow-y-auto">
            <div class="bg-red-600 rounded text-white px-2 py-0.5 flex justify-between items-center text-sm">
              <div>
                HP
              </div>
              <div class="font-semibold">
                65000000
              </div>
            </div>
            <div class="bg-blue-600 rounded text-white px-2 py-0.5 flex justify-between items-center text-sm">
              <div>
                MP
              </div>
              <div class="font-semibold">
                3000000
              </div>
            </div>
            <div class="bg-amber-400 rounded text-white px-2 py-0.5 flex justify-between items-center text-sm">
              <div>
                EXP
              </div>
              <div class="font-semibold">
                900000
              </div>
            </div>
            <div class="border border-accented! rounded px-2 py-0.5 flex justify-between items-center text-sm">
              <div>
                Avoidance
              </div>
              <div class="font-semibold">
                14
              </div>
            </div>
            <div class="border border-accented! rounded px-2 py-0.5 flex justify-between items-center text-sm">
              <div>
                DEF
              </div>
              <div class="font-semibold">
                1150
              </div>
            </div>
            <div class="border border-accented! rounded px-2 py-0.5 flex justify-between items-center text-sm">
              <div>
                MDEF
              </div>
              <div class="font-semibold">
                1270
              </div>
            </div>
            <div class="border border-accented! rounded px-2 py-0.5 flex justify-between items-center text-sm">
              <div>
                Accuracy
              </div>
              <div class="font-semibold">
                52
              </div>
            </div>
            <div class="border border-accented! rounded px-2 pt-0.5 pb-1 text-sm">
              <div>
                Maps
              </div>
              <div class="font-semibold flex flex-col gap-1 mt-1">
                <div v-for="i in 6" :key="i" class="bg-elevated px-2 py-0.5 rounded">
                  Ludibrium : Toy Factory &lt;Main Process 1&gt;
                </div>
              </div>
            </div>
          </div>
        </template>
      </UPopover>
    </div>
    <div class="flex flex-col gap-y-3 border-l-0 sm:border-l! border-accented! sm:pl-8 px-4">
      <div class="flex sm:flex-row flex-col gap-2">
        <div class="w-14 text-sm font-semibold shrink-0 mt-3">
          Equip
        </div>
        <div class="flex flex-wrap gap-2">
          <DropsTag v-for="i in 10" :key="i" />
        </div>
      </div>
      <div class="flex sm:flex-row flex-col gap-2">
        <div class="w-14 text-sm font-semibold shrink-0 mt-3">
          Scroll
        </div>
        <div class="flex flex-wrap gap-2">
          <DropsTag v-for="i in 5" :key="i" />
        </div>
      </div>
      <div class="flex sm:flex-row flex-col gap-2">
        <div class="w-14 text-sm font-semibold shrink-0 mt-3">
          Use
        </div>
        <div class="flex flex-wrap gap-2">
          <DropsTag v-for="i in 3" :key="i" />
        </div>
      </div>
      <div class="flex sm:flex-row flex-col gap-2">
        <div class="w-14 text-sm font-semibold shrink-0 mt-3">
          Etc
        </div>
        <div class="flex flex-wrap gap-2">
          <DropsTag v-for="i in 9" :key="i" />
        </div>
      </div>
    </div>
  </div>
</template>
