import { reply, useAssistant } from "../utils/gpts";
import { SixHats, getAssistantId } from "../utils/sixhat";

interface SixhatRequest {
  color: SixHats,
  prompt: string,
  threadId: string | undefined,
}

export default defineEventHandler(async (event) => {
  try {
    const body: SixhatRequest = await readBody(event);
    const hatId = getAssistantId(body.color);
    const assistant = await useAssistant(hatId);
    const thread = body.threadId ? await useThread(body.threadId) : await createThread();
    const rep = await reply(thread.id, assistant.id, body.prompt);

    return {
      replies: rep,
      threadId: thread.id,
    };
  } catch (error) {
    console.error(error);
  }
});
