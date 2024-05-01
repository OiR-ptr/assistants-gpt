import { OpenAI } from 'openai';
import { Run } from 'openai/resources/beta/threads/index.mjs';
import { getSixHats } from './sixhat';
import Nedb from 'nedb';

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

const handleRequiresAction = async (threadId: string, run: Run, db: Nedb) => {
  const toolOutputs = run?.required_action?.submit_tool_outputs?.tool_calls?.map(async tool => {
    if (tool.function.name === "get_weather") {
      return await {
        tool_call_id: tool.id,
        output: JSON.stringify({
          weather: "晴のち曇ところにより雪、夕方から嵐",
          tempMax: Math.ceil(Math.random() * 30) + 10,
          tempMin: Math.ceil(Math.random() * 17),
        }),
      };
    }

    if (tool.function.name === "memory_baton") {
      const { category, theme } = JSON.parse(tool.function.arguments);
      console.log(`[memory_baton]category: ${category}, theme: ${theme}`);

      return await new Promise<OpenAI.Beta.Threads.Runs.RunSubmitToolOutputsParams.ToolOutput>((resolve) => {
        db.find({
          category,
          theme,
        }, (_: any, docs: any) => {
          console.log(`content: ${docs}`);
          resolve({
            tool_call_id: tool.id,
            output: JSON.stringify(docs),
          });
        });
      });
    }

    if (tool.function.name === "memory_hold") {
      const { category, theme, content, prompt = null } = JSON.parse(tool.function.arguments);
      console.log(`[memory_hold]category: ${category}, theme: ${theme}, content: ${content}`);
      if(prompt) console.log(`[memory_hold]prompt: ${prompt}`);
      db.insert({
        category,
        theme,
        content,
        prompt, // word2vec用に用例を試す
      });

      return await {
        tool_call_id: tool.id,
        output: JSON.stringify({
          status: 200,
        }),
      }
    }

    return await {
      tool_call_id: tool.id,
      output: "FAILED",
    };
  }) ?? [];

  let rerun = run;
  if(0 < toolOutputs.length) {
    rerun = await openai.beta.threads.runs.submitToolOutputsAndPoll(threadId, run.id, {
      tool_outputs: await Promise.all(toolOutputs),
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
        whois: getSixHats(message.assistant_id),
        text: content.text.value,
      };
    }

    return [];
  }).reverse();
}

const reply = async (threadId: string, assistantId: string, prompt: string, db: Nedb) => {
  openai.beta.threads.messages.create(threadId, {
    role: "user",
    content: prompt,
  });

  let run = await openai.beta.threads.runs.createAndPoll(threadId, {
    assistant_id: assistantId,
    // max_completion_tokens: 3000,
    // max_prompt_tokens: 1200
  });

  while(true) {
    const done = await openai.beta.threads.runs.retrieve(threadId, run.id);

    if(done.status == "completed") break;
    if(done.status == "requires_action") {
      console.log(`requires-action`);
      run = await handleRequiresAction(threadId, run, db);
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
