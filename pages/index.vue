<script setup lang="ts">
const { data } = await useFetch("/api/sixhat", {
  method: "POST",
  body: {
    color: "Yellow",
    prompt: "今日はどこかに行こうかな、水天宮とかどうでしょうか。夕方の天気次第ですけど博多天神にも行きたいです。",
  },
});
</script>

<template>
  <main>
    <Suspense>
      <pre v-for="message in data?.hello">
        {{ message }}
      </pre>
    </Suspense>
  </main>
</template>
