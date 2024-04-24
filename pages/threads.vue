<script setup lang="ts">
definePageMeta({
  layout: "with-navigation"
});

const threadId: Ref<string|undefined> = ref(undefined);
const newMessage = ref('');
const messages: Array<{text: string, isMine: boolean}> = reactive([
]);

const sendMessage = async () => {
  if (newMessage.value.trim() !== '') {
    const message = newMessage.value;
    messages.push({ text: message, isMine: true });
    newMessage.value = '';

    const { data: reply } = await useFetch("/api/sixhat", {
      method: "POST",
      body: {
        color: "Fast",
        prompt: message,
        threadId: threadId.value,
      }
    });
    threadId.value = reply.value?.threadId;

    messages.push({ text: reply.value?.replies[0] ?? "", isMine: false });
  }
}
</script>

<template>
  <div class="chat-container">
    <div class="messages">
      <div v-for="(message, index) in messages" :key="index" class="message">
        <div :class="{'my-message': message.isMine, 'other-message': !message.isMine}">
          {{ message.text }}
        </div>
      </div>
    </div>
    <div class="input-area flex justify-center">
      <UInput v-model="newMessage" placeholder="メッセージを入力" />
      <UButton @click="sendMessage">送信</UButton>
    </div>
  </div>
</template>

<style>
.chat-container {
  display: flex;
  flex-direction: column;
  height: 100vh;
  max-width: 500px;
  margin: auto;
}
.messages {
  flex-grow: 1;
  overflow-y: auto;
  padding: 16px;
}
.message {
  margin-bottom: 12px;
}
.my-message {
  align-self: flex-end;
  background-color: #DCF8C6;
  color: black;
  padding: 8px 16px;
  border-radius: 20px;
}
.other-message {
  align-self: flex-start;
  background-color: #ECECEC;
  color: black;
  padding: 8px 16px;
  border-radius: 20px;
}
.input-area {
  display: flex;
  padding: 8px;
}
</style>