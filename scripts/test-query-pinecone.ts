/**
 * Test querying pinecone
 *
 * To run: `ts-node --compiler-options {\"module\":\"CommonJS\"} scripts/test-query-pinecone.ts`
 */
import { questionPrompt, refinePrompt } from "@/ai/openai";
import { getStandardsIndex } from "@/ai/pinecone";
import { querySimple } from "@/ai/query";
import * as dotenv from "dotenv";
import { RetrievalQAChain, loadQARefineChain } from "langchain/chains";
import { ChatOpenAI } from "langchain/chat_models/openai";
import { OpenAIEmbeddings } from "langchain/embeddings/openai";
import { PineconeStore } from "langchain/vectorstores/pinecone";

const TEST_QUERIES = [
  "Generate a lesson plan for a Grade 5 Mathematics class. The lesson should focus on the standard CCSS.MATH.CONTENT.5.NF.A.1, which requires students to add and subtract fractions with unlike denominators. The lesson should include a real-world application of the concept.",
  "Create a lesson plan for a Grade 8 English Language Arts class. The lesson should be based on the standard CCSS.ELA-LITERACY.RL.8.3, which involves analyzing how particular lines of dialogue or incidents in a story or drama propel the action, reveal aspects of a character, or provoke a decision. Incorporate a popular young adult novel for this lesson.",
  "Design a lesson plan for a Grade 10 History class. The lesson should cover the standard CCSS.ELA-LITERACY.RH.9-10.2, focusing on determining the central ideas or information of a primary or secondary source and providing an accurate summary of how key events or ideas develop over the course of the text. Use a primary source from the Civil War era.",
  "Develop a lesson plan for a Grade 12 Science class. The lesson should follow the standard HS-PS1-1, which requires students to use the periodic table as a model to predict the relative properties of elements based on the patterns of electrons in the outermost energy level of atoms. Include an interactive lab activity to reinforce the concept.",
  "Formulate a lesson plan for a Grade 4 Social Studies class. The lesson should address the standard D2.Civ.2.3-5, focusing on explaining how a democracy relies on people's responsible participation, and drawing on examples from historical and contemporary contexts. Include a role-play activity to make the lesson more engaging.",
];

dotenv.config();

async function runQuery(index = 0) {
  await querySimple(TEST_QUERIES[index]);
}

// let promise: Promise<any> | undefined;
// for (let i = 0; i < TEST_QUERIES.length; i++) {
//   if (promise) {
//     promise.then(() => query(i));
//   } else {
//     promise = query(i);
//   }
// }

runQuery(0).catch(console.error);
