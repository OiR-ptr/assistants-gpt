import { OpenAI } from 'openai';
import { Run } from 'openai/resources/beta/threads/index.mjs';

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

const handleRequiresAction = async (threadId: string, run: Run) => {
  const toolOutputs = run?.required_action?.submit_tool_outputs?.tool_calls?.map(tool => {
    if (tool.function.name === "get_weather") {
      return {
        tool_call_id: tool.id,
        output: JSON.stringify({
          weather: "晴のち曇ところにより雪、夕方から嵐",
          tempMax: Math.ceil(Math.random() * 30) + 10,
          tempMin: Math.ceil(Math.random() * 17),
        }),
      };
    }

    return {
      tool_call_id: tool.id,
      output: "FAILED",
    };
  }) ?? [];

  let rerun = run;
  if(0 < toolOutputs.length) {
    rerun = await openai.beta.threads.runs.submitToolOutputsAndPoll(threadId, run.id, {
      tool_outputs: toolOutputs,
    });
  }

  return rerun;
}

const restoreThread = async (threadId: string, limit: number) => {
  const messages = await openai.beta.threads.messages.list(threadId, {limit});
  return messages.data.flatMap(message => {
    const [content] = message.content;
    if(content.type === 'text') {
      return {
        role: message.role,
        text: content.text.value,
      };
    }

    return [];
  }).reverse();
}

const reply = async (threadId: string, assistantId: string, prompt: string) => {
  openai.beta.threads.messages.create(threadId, {
    role: "user",
    content: prompt,
  });

  let run = await openai.beta.threads.runs.createAndPoll(threadId, {
    assistant_id: assistantId,
  });

  while(true) {
    const done = await openai.beta.threads.runs.retrieve(threadId, run.id);

    if(done.status == "completed") break;
    if(done.status == "requires_action") {
      run = await handleRequiresAction(threadId, run);
    }
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
  restoreThread,
}
