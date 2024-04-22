<script setup lang="ts">
const { data } = await useFetch("/api/sixhat", {
  method: "POST",
  body: {
    color: "Black",
    prompt: "日本には四季があってよいですね",
  },
});
</script>

<template>
  <main>
    <Suspense>
      <pre>{{ data }}</pre>
    </Suspense>
  </main>
</template>
