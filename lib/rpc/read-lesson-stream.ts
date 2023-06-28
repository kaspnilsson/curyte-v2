export async function promisifyLessonIdStream(
  response: Response,
  onProgressUpdate: (message: string, progress: number) => void
): Promise<string | null> {
  if (!response.body) {
    throw new Error("No ReadableStream received");
  }

  const reader = response.body.getReader();
  const decoder = new TextDecoder();
  let buffer = "";
  let finalResult = null;

  try {
    while (true) {
      const { done, value } = await reader.read();

      if (done) {
        // Process any remaining data in the buffer
        const processed = processBuffer(buffer, onProgressUpdate);
        finalResult = processed.finalResult;
        break;
      }

      // Append the chunk to the buffer
      buffer += decoder.decode(value, { stream: true });

      // Process the buffer
      const processed = processBuffer(buffer, onProgressUpdate);
      buffer = processed.remainingBuffer;
      finalResult = processed.finalResult || finalResult;
    }
  } catch (e) {
    throw new Error("An error occurred while reading the stream: " + e);
  }

  return finalResult;
}

function processBuffer(
  buffer: string,
  onProgressUpdate: (message: string, progress: number) => void
) {
  // Regular expression to match JSON objects
  const regex = /{.*?}/g;
  const jsonObjects = buffer.match(regex) || [];
  let finalResult = null;

  for (const jsonObject of jsonObjects) {
    try {
      const parsedObject = JSON.parse(jsonObject);
      if (
        parsedObject.status === "in-progress" &&
        typeof parsedObject.message === "string" &&
        typeof parsedObject.progress === "number"
      ) {
        // Call the onProgressUpdate callback
        onProgressUpdate(parsedObject.message, parsedObject.progress);
      } else {
        // Handle the final result
        finalResult = parsedObject;
      }
    } catch (e) {
      console.error("Failed to parse JSON object:", jsonObject);
    }
  }

  // Return the remaining data in the buffer that is not part of a complete JSON object,
  // and the final result if found
  return {
    remainingBuffer: buffer.replace(regex, ""),
    finalResult: finalResult,
  };
}
