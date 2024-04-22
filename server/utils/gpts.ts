import { OpenAI } from 'openai';

const config = useRuntimeConfig();
const openai = new OpenAI({
  apiKey: config.openai_apikey,
});

const createAssistant = () => {
  return openai.beta.assistants.create({
      name: "ASSISTANT_NAME",
      instructions: "あなたは有能な秘書です。私の質問に対して端的で鋭い洞察を与えてください。",
      model: "gpt-4-turbo"
  });
};

const useAssistant = (assistant_key: string) => {
  return openai.beta.assistants.retrieve(assistant_key);
};

const createThread = () => {
  return openai.beta.threads.create();
};

const useThread = (thread_id: string) => {
  return openai.beta.threads.retrieve(thread_id);
};

const reply = async (threadId: string, assistantId: string, prompt: string) => {
  openai.beta.threads.messages.create(threadId, {
    role: "user",
    content: prompt,
  });

  const run = await openai.beta.threads.runs.create(threadId, {
    assistant_id: assistantId,
  });

  while(true) {
    const done = await openai.beta.threads.runs.retrieve(threadId, run.id);
    if(done.status == "completed") break;
  }

  const messages = await openai.beta.threads.messages.list(threadId, { run_id: run.id });
  return messages.data.flatMap(message => {
    const [content] = message.content;
    if(content.type === 'text') {
      return content.text.value;
    }

    return [];
  });
};

export {
  createAssistant,
  useAssistant,
  createThread,
  useThread,
  reply,
}
