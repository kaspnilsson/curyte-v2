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
      const { value, done } = await reader.read();

      // Append the chunk to the buffer
      buffer += decoder.decode(value, { stream: true });
      console.log("buffer so far", buffer);

      // Process the buffer
      const processed = processBuffer(buffer, onProgressUpdate);
      buffer = processed.remainingBuffer;
      finalResult = processed.finalResult || finalResult;
      if (finalResult) return finalResult;
      if (done) {
        throw new Error("Stream is closed, but no result!");
      }
    }
  } catch (e) {
    throw new Error("An error occurred while reading the stream: " + e);
  }
}

function processBuffer(
  buffer: string,
  onProgressUpdate: (message: string, progress: number) => void
): { remainingBuffer: string; finalResult: string | null } {
  // Regular expression to match JSON objects
  const regex = /{.*?}/g;
  const jsonObjects = buffer.match(regex) || [];
  let finalResult = null;

  for (const jsonObject of jsonObjects) {
    try {
      console.log("Trying to parse JSON object:", jsonObject);
      const parsedObject = JSON.parse(jsonObject);
      if (parsedObject.status === "in-progress") {
        console.log("Got progress update:", parsedObject);
        if (parsedObject.message && parsedObject.progress) {
          // Call the onProgressUpdate callback
          onProgressUpdate(parsedObject.message, parsedObject.progress);
        }
      } else if (parsedObject.status === "error") {
        throw new Error(
          "Error during generation:" + JSON.stringify(parsedObject)
        );
      } else if (parsedObject.status === "success") {
        console.log("Got final result:", parsedObject);
        if (!parsedObject.id) {
          throw new Error(
            "Final result does not contain an id:" +
              JSON.stringify(parsedObject)
          );
        }
        // Handle the final result
        finalResult = parsedObject.id;
      }
    } catch (e) {
      throw new Error(
        "Failed to parse JSON object:\n" + JSON.stringify(jsonObject)
      );
    }
  }

  // Return the remaining data in the buffer that is not part of a complete JSON object,
  // and the final result if found
  return {
    remainingBuffer: buffer.replace(regex, ""),
    finalResult: finalResult,
  };
}
