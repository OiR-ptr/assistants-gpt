import { defineStore } from "pinia";

const useChatThreads = defineStore(
  "chat-thread",
  {
    state: () => {
      return {
        _threads: [] as string[],
      }
    },
    getters: {
      chatThreads: (state) => {
        return state._threads.slice();
      }
    },
    actions: {
      pushThreads(threadId: string) {
        this._threads.push(threadId);
      }
    },
    persist: {
      storage: persistedState.localStorage,
    },
  }
);

export {
  useChatThreads,
};