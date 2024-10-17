<template>
  <form @submit.prevent="handleSubmit" class="mb-8 bg-white shadow-lg rounded-lg p-6">
    <h2 class="text-2xl font-bold text-indigo-700 mb-4">Add New Job</h2>
    <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
      <div>
        <label for="orderNumber" class="block text-sm font-medium text-gray-700 mb-1">
          Order Number
        </label>
        <input
          type="text"
          id="orderNumber"
          v-model="orderNumber"
          class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all duration-300"
          required
        />
      </div>
      <div>
        <label for="name" class="block text-sm font-medium text-gray-700 mb-1">
          Job Name (Optional)
        </label>
        <input
          type="text"
          id="name"
          v-model="name"
          class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all duration-300"
        />
      </div>
      <div>
        <label for="impressions" class="block text-sm font-medium text-gray-700 mb-1">
          Number of Impressions
        </label>
        <input
          type="number"
          id="impressions"
          v-model="impressions"
          class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all duration-300"
          required
        />
      </div>
    </div>
    <button
      type="submit"
      class="mt-4 w-full bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 text-white font-semibold py-3 px-4 rounded-md transition-all duration-300 transform hover:scale-105"
    >
      Add New Job
    </button>
  </form>
</template>

<script>
import { ref } from 'vue'

export default {
  setup(props, { emit }) {
    const orderNumber = ref('')
    const name = ref('')
    const impressions = ref('')

    const handleSubmit = () => {
      if (orderNumber.value.trim() && parseInt(impressions.value)) {
        emit('add-job', {
          id: Date.now().toString(),
          orderNumber: orderNumber.value.trim(),
          name: name.value.trim() || undefined,
          impressions: parseInt(impressions.value),
          status: 'coming up',
          createdAt: new Date()
        })
        orderNumber.value = ''
        name.value = ''
        impressions.value = ''
      }
    }

    return {
      orderNumber,
      name,
      impressions,
      handleSubmit
    }
  }
}
</script>