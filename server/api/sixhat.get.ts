
interface SixhatGetParameters {
  thread_id: string | undefined
  limit: number | undefined
}

export default defineEventHandler(async (event) => {
  try {
    const query = getQuery(event) as SixhatGetParameters;

    if(query.thread_id) {
      const messages = await restoreThread(query.thread_id, query.limit ?? 10);
      return {
        messages,
      };
    }

    return {
      messages: [],
    };

  } catch(error) {
    console.error(error);
  }
});