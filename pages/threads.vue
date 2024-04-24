<script setup lang="ts">
definePageMeta({
  layout: "with-navigation",
});

const { pushThreads } = useChatThreads();
const { chatThreads } = storeToRefs(useChatThreads());
const threads = computed(() => {
  return chatThreads.value.map((chat) => {
    return {
      label: chat,
      icon: 'i-heroicons-chat-bubble-oval-left',
      click: async () => {
        threadId.value = chat;

        const { data } = await useFetch(`/api/sixhat?thread_id=${threadId.value}`, {
          method: "get",
        });

        messages.splice(0, messages.length, ...data.value?.messages?.map(msg => {
          return {
            text: msg.text,
            isMine: msg.role == "user",
          };
        }) ?? []);
      }
    };
  });
});

const threadId: Ref<string | undefined> = ref(undefined);
const newMessage = ref("");
const messages: Array<{ text: string; isMine: boolean }> = reactive([]);

const sendMessage = async () => {
  if (newMessage.value.trim() !== "") {
    const message = newMessage.value;
    messages.push({ text: message, isMine: true });
    newMessage.value = "";

    const { data: reply } = await useFetch("/api/sixhat", {
      method: "post",
      body: {
        color: assistant.value,
        prompt: message,
        threadId: threadId.value,
      },
    });
    threadId.value = reply.value?.threadId;
    if(!chatThreads.value.includes(threadId.value!)) {
      pushThreads(threadId.value!);
    }

    messages.push({ text: reply.value?.replies[0] ?? "", isMine: false });
  }
};

const messagesRef: Ref<HTMLElement|null> = ref(null);
watch(messages, () => {
  nextTick(() => {
    if (messagesRef.value) {
      messagesRef.value.scrollTop = messagesRef.value.scrollHeight;
    }
  });
});

const assistants = ['Fast', 'Red', 'Green', 'Blue', 'Black', 'White', 'Yellow'];
const assistant = ref(assistants[0]);
</script>

<template>
  <div class="flex">
    <nav class="w-1/6">
      <UVerticalNavigation :links="threads" />
    </nav>
    <div class="w-full chat-container">
      <div class="messages" ref="messagesRef">
        <div v-for="(message, index) in messages" :key="index" class="message" :class="{'my-message': message.isMine, 'other-message': !message.isMine,}">
          <div>
            {{ message.text }}
          </div>
        </div>
      </div>
      <div class="input-area flex justify-center">
        <USelect v-model="assistant" :options="assistants" />
        <UInput v-model="newMessage" placeholder="メッセージを入力" />
        <UButton @click="sendMessage">送信</UButton>
      </div>
    </div>
  </div>
</template>

<style>
.chat-container {
  display: flex;
  flex-direction: column;
  height: 100vh;
  max-width: 700px;
  margin: auto;
}
.messages {
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  overflow-y: auto;
  padding: 16px;
}
.message {
  width: fit-content;
  margin-bottom: 12px;
}
.my-message {
  align-self: flex-end;
  background-color: #dcf8c6;
  color: black;
  padding: 8px 16px;
  border-radius: 20px;
}
.other-message {
  align-self: flex-start;
  background-color: #ececec;
  color: black;
  padding: 8px 16px;
  border-radius: 20px;
}
.input-area {
  display: flex;
  padding: 8px;
}
</style>
