export async function promisifyLessonIdStream(
  response: Response,
  onProgressUpdate: (progressMessage: string, progressValue: number) => void
): Promise<string | null> {
  if (!response.body) {
    throw new Error("No ReadableStream received");
  }

  const reader = response.body.getReader();
  const decoder = new TextDecoder();
  let result = "";

  try {
    while (true) {
      const { done, value } = await reader.read();

      if (done) {
        console.log("full stream result");
        console.log(result);
        // Extract the JSON part of the result string
        const jsonStartIndex = result.indexOf("{");
        if (jsonStartIndex >= 0) {
          const jsonPart = result.substring(jsonStartIndex);
          try {
            // Parse the JSON part of the result string
            const parsedResult = JSON.parse(jsonPart);
            return parsedResult.id;
          } catch (e) {
            throw new Error("Failed to parse the final JSON result");
          }
        }
        return null;
      }

      // Append the chunk to the result string
      result += decoder.decode(value, { stream: true });

      // Check for progress updates
      if (result.includes('{"status":"in-progress"')) {
        const endIndex = result.indexOf("}") + 1;
        const progressJson = result.slice(0, endIndex);
        result = result.slice(endIndex);

        try {
          const progressObj = JSON.parse(progressJson);
          onProgressUpdate(progressObj.message, progressObj.progress);
        } catch (e) {
          console.error("Failed parsing progress JSON", e);
        }
      }
    }
  } catch (e: unknown) {
    throw new Error("An error occurred while reading the stream");
  }
}
