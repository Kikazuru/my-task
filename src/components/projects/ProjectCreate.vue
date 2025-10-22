<template>
  <u-modal
    v-model:open="open"
    title="Create New Project"
    :ui="{
      footer: 'justify-end',
    }"
  >
    <slot button></slot>

    <template #body>
      <u-form :schema="schema" :state="state" class="space-y-4" @submit="submit">
        <u-form-field label="Name" name="name">
          <u-input v-model="state.name"></u-input>
        </u-form-field>

        <u-form-field label="Description" name="description">
          <u-textarea v-model="state.description"></u-textarea>
        </u-form-field>

        <div class="flex justify-end">
          <u-button type="submit">Submit</u-button>
        </div>
      </u-form>
    </template>
  </u-modal>
</template>

<script setup lang="ts">
import projectRepo from '@/db/repositories/project'
import type { FormSubmitEvent } from '@nuxt/ui'
import * as v from 'valibot'
import { reactive, ref } from 'vue'

const schema = v.object({
  name: v.pipe(v.string(), v.minLength(1, 'Project name is required')),
  description: v.optional(v.string()),
})

type Schema = v.InferOutput<typeof schema>

const state = reactive<Schema>({
  name: '',
  description: undefined,
})

const open = ref(false)

const emits = defineEmits(['created'])
const toast = useToast()

function submit(event: FormSubmitEvent<Schema>) {
  projectRepo
    .create({ name: event.data.name, description: event.data.description })
    .then(() => {
      toast.add({
        title: 'Created',
        description: 'Project successfully created',
        color: 'success',
        duration: 2000,
      })
      open.value = false
      emits('created')
      resetForm()
    })
    .catch(() => {
      toast.add({
        title: 'Error',
        description: 'Failed to create project',
        color: 'error',
      })
    })
}

function resetForm() {
  state.name = ''
  state.description = undefined
}
</script>

<style scoped></style>
