import { reply, useAssistant } from "../utils/gpts";
import { SixHats } from "../utils/sixhat";

interface SixhatRequest {
  color: SixHats,
  prompt: string,
}

const getAssistantId = (hat: SixHats) => {
  switch(hat) {
    case SixHats.BlackHat: return "<<ASSISTANT_ID_BLACKHAT>>";
    case SixHats.BlueHat: return "<<ASSISTANT_ID_BLUEHAT>>";
    case SixHats.GreenHat: return "<<ASSISTANT_ID_GREENHAT>>";
    case SixHats.RedHat: return "<<ASSISTANT_ID_REDHAT>>";
    case SixHats.WhiteHat: return "<<ASSISTANT_ID_WHITEHAT>>";
    case SixHats.YellowHat: return "<<ASSISTANT_ID_YELLOWHAT>>";
  }
};

export default defineEventHandler(async (event) => {
  try {
    const body: SixhatRequest = await readBody(event);

    const hatId = getAssistantId(body.color);
    const assistant = await useAssistant(hatId);
    console.log(assistant.id);

    const thread = await useThread("<<DIALOG_THREAD_ID>>");
    console.log(thread.id);

    const rep = await reply(thread.id, assistant.id, body.prompt);

    return {
      hello: rep,
    };
  } catch (error) {
    console.error(error);
  }
});
