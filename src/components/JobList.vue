<template>
  <div class="space-y-4">
    <JobCard
      v-for="job in jobs"
      :key="job.id"
      :job="job"
      @update-status="updateStatus"
      @update-impressions="updateImpressions"
      @delete-job="deleteJob"
    />
  </div>
</template>

<script>
import JobCard from './JobCard.vue'

export default {
  name: 'JobList',
  components: {
    JobCard
  },
  props: {
    jobs: {
      type: Array,
      required: true
    }
  },
  setup(props, { emit }) {
    const updateStatus = (id, newStatus) => {
      emit('update-status', id, newStatus)
    }

    const updateImpressions = (id, impressions) => {
      emit('update-impressions', id, impressions)
    }

    const deleteJob = (id) => {
      emit('delete-job', id)
    }

    return {
      updateStatus,
      updateImpressions,
      deleteJob
    }
  }
}
</script>