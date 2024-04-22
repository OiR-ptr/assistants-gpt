import { reply, useAssistant } from "../utils/gpts";
import { SixHats, getAssistantId } from "../utils/sixhat";

interface SixhatRequest {
  color: SixHats,
  prompt: string,
}

export default defineEventHandler(async (event) => {
  try {
    const body: SixhatRequest = await readBody(event);

    const hatId = getAssistantId(body.color);
    const assistant = await useAssistant(hatId);
    console.log(assistant.id);

    const thread = await createThread();
    console.log(thread.id);

    const rep = await reply(thread.id, assistant.id, body.prompt);

    return {
      hello: rep,
    };
  } catch (error) {
    console.error(error);
  }
});
