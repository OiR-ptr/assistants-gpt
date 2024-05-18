<script setup lang="ts">
const links = [
  {
    label: 'Home',
    icon: 'i-heroicons-home',
    to: '/'
  },
  {
    label: 'Threads',
    icon: 'i-heroicons-chat-bubble-left-ellipsis-16-solid',
    to: '/threads'
  },
]
</script>

<template>
  <nav class="w-1/4">
    <UVerticalNavigation :links="links" />
  </nav>
</template>
