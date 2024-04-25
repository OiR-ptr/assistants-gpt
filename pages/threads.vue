<script setup lang="ts">
definePageMeta({
  layout: "with-navigation",
});

const { pushThreads } = useChatThreads();
const { chatThreads } = storeToRefs(useChatThreads());
const threads = computed(() => {
  return [[{
    label: '新しいチャット',
    icon: 'i-heroicons-chat-bubble-oval-left',
    click: async () => {
      threadId.value = undefined;
      messages.splice(0, messages.length);
    },
  }]].concat([chatThreads.value.map((chat) => {
    return {
      label: chat,
      icon: 'i-heroicons-chat-bubble-oval-left-ellipsis',
      click: async () => {
        threadId.value = chat;

        const { data } = await useFetch(`/api/sixhat?thread_id=${threadId.value}`, {
          method: "get",
        });

        messages.splice(0, messages.length, ...data.value?.messages?.map(msg => {
          return {
            text: msg.text,
            isMine: msg.role == "user",
            otherName: msg.whois,
          };
        }) ?? []);
      }
    };
  })]);
});

const threadId: Ref<string | undefined> = ref(undefined);
const newMessage = ref("");
const messages: Array<{ text: string; isMine: boolean; otherName: string|null; }> = reactive([]);

const sendMessage = async () => {
  if (newMessage.value.trim() !== "") {
    const message = newMessage.value;
    messages.push({ text: message, isMine: true, otherName: null });
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

    messages.push({ text: reply.value?.replies[0] ?? "", isMine: false, otherName: assistant.value });
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
        <template v-for="(message, index) in messages" :key="index">
          <div v-if="message.isMine" class="message my-message">
            {{ message.text }}
          </div>

          <div v-else class="message other-message relative">
            <div class="absolute -top-4" style="-webkit-text-stroke: 0.075em; -webkit-text-stroke-color: aqua;">{{ message.otherName?.length ? '@' + message.otherName : null }}</div>
            {{ message.text }}
          </div>
        </template>
      </div>
      <div class="input-area flex justify-center">
        <USelect v-model="assistant" :options="assistants" icon="i-heroicons-at-symbol" class="flex" />
        <UTextarea v-model="newMessage" :rows="1" autoresize placeholder="メッセージを入力" class="flex-auto" />
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
