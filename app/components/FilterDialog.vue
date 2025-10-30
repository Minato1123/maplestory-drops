<script setup lang="ts">
const isShowDialog = defineModel<boolean>()
</script>

<template>
  <Teleport to="body">
    <div v-if="isShowDialog" class="fixed inset-0 bg-black/30 flex items-center justify-center z-20" @click.self="isShowDialog = false">
      <div class="bg-white rounded-lg p-6 w-11/12 max-w-md">
        <h2 class="text-lg font-semibold mb-4">
          Filter Options
        </h2>
        <!-- Filter options would go here -->
        <button class="mt-4 bg-stone-100 hover:bg-stone-200 duration-300 px-3 py-1 rounded-lg" @click="isShowDialog = false">
          Close
        </button>
      </div>
    </div>
  </Teleport>
</template>
