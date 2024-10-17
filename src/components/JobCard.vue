<template>
  <div class="bg-white shadow-lg rounded-lg p-6 mb-6 transition-all duration-300 hover:shadow-xl relative">
    <div class="flex justify-between items-center mb-4">
      <h3 class="text-2xl font-bold text-indigo-700">Order #{{ job.orderNumber }}</h3>
      <p v-if="job.name" class="text-lg text-gray-600 font-medium">{{ job.name }}</p>
    </div>

    <div v-if="job.status !== 'archived'" class="mb-6">
      <div class="relative">
        <div class="overflow-hidden h-3 mb-4 text-xs flex rounded-full bg-gray-200">
          <div 
            :style="{ width: `${progressPercentage}%` }"
            class="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-gradient-to-r from-blue-500 to-indigo-500 transition-all duration-500"
          ></div>
        </div>
        <div class="flex justify-between">
          <div v-for="status in statusOrder" :key="status" class="text-center" style="width: 25%">
            <div :class="[
              'w-12 h-12 mx-auto rounded-full flex items-center justify-center transition-all duration-300',
              statusOrder.indexOf(job.status) >= statusOrder.indexOf(status) 
                ? 'bg-gradient-to-r from-blue-500 to-indigo-500 text-white' 
                : 'bg-gray-200 text-gray-600'
            ]">
              <!-- Add icons here if needed -->
            </div>
            <div class="mt-2 text-xs font-medium uppercase">{{ status }}</div>
          </div>
        </div>
      </div>
    </div>

    <div class="grid grid-cols-2 gap-6 mb-4">
      <div>
        <label for="impressions" class="block text-sm font-medium text-gray-700 mb-1">
          Impressions:
        </label>
        <input
          type="number"
          id="impressions"
          :value="job.impressions"
          @input="updateImpressions"
          class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all duration-300"
          :disabled="job.status === 'archived'"
        />
      </div>
      <div>
        <p class="text-sm font-medium text-gray-700 mb-1">Job Value:</p>
        <p class="text-3xl font-bold text-green-600">${{ jobValue }}</p>
      </div>
    </div>

    <div class="flex justify-between items-center">
      <button
        @click="confirmDelete"
        class="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md text-sm font-medium transition-all duration-300 transform hover:scale-105 flex items-center"
      >
        Delete
      </button>
      <button
        v-if="job.status !== 'archived'"
        @click="updateStatus"
        class="bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 text-white px-6 py-3 rounded-md text-sm font-medium transition-all duration-300 transform hover:scale-105"
      >
        Update to {{ nextStatus }}
      </button>
    </div>
  </div>
</template>

<script>
import { computed } from 'vue'

export default {
  props: {
    job: {
      type: Object,
      required: true
    }
  },
  setup(props, { emit }) {
    const statusOrder = ['coming up', 'in progress', 'complete', 'paid']

    const jobValue = computed(() => (props.job.impressions * 0.25).toFixed(2))
    const nextStatus = computed(() => {
      const currentIndex = statusOrder.indexOf(props.job.status)
      return statusOrder[(currentIndex + 1) % statusOrder.length]
    })
    const progressPercentage = computed(() => {
      return ((statusOrder.indexOf(props.job.status) + 1) / statusOrder.length) * 100
    })

    const updateImpressions = (event) => {
      emit('update-impressions', props.job.id, parseInt(event.target.value) || 0)
    }

    const updateStatus = () => {
      emit('update-status', props.job.id, nextStatus.value)
    }

    const confirmDelete = () => {
      if (confirm('Are you sure you want to delete this job?')) {
        emit('delete-job', props.job.id)
      }
    }

    return {
      jobValue,
      nextStatus,
      statusOrder,
      progressPercentage,
      updateImpressions,
      updateStatus,
      confirmDelete
    }
  }
}
</script>