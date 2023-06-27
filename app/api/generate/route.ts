import { NextResponse } from "next/server";
import { query } from "@/ai/query";

import {
  LessonPlanGenerationSchema,
  generateLessonPlanStr,
} from "@/lib/validations/generate";

const FAKE_OUT = `
# Lesson Plan: Adding and Subtracting Fractions with Unlike Denominators

## Grade Level: 5th Grade

## Subject: Mathematics

## Objective:
- Students will be able to add and subtract fractions with unlike denominators
- Students will be able to apply their understanding of fractions to real-world scenarios
- Students will be able to compute with very large and very small numbers, positive integers, decimals, and fractions

## Standards:
- CCSS.MATH.CONTENT.5.NF.A.1: Add and subtract fractions with unlike denominators (including mixed numbers) by replacing given fractions with equivalent fractions in such a way as to produce an equivalent sum or difference of fractions with like denominators.
- CCSS.MATH.CONTENT.5.NF.B.5: Interpret multiplication as scaling (resizing), by:
  - Comparing the size of a product to the size of one factor on the basis of the size of the other factor, without performing the indicated multiplication.
  - Explaining why multiplying a given number by a fraction greater than 1 results in a product greater than the given number (recognizing multiplication by whole numbers greater than 1 as a familiar case); explaining why multiplying a given number by a fraction less than 1 results in a product smaller than the given number; and relating the principle of fraction equivalence a/b = (n × a)/(n × b) to the effect of multiplying a/b by 1.

## Materials:
- Whiteboard and markers
- Fractions worksheet
- Different types of fruit (e.g. apples, bananas, oranges)
- Knife for cutting fruit
- Calculator

## Anticipatory Set:
- Ask students if they have ever had to divide something equally among a group of people and how they did it. This will help to introduce the concept of fractions and how they can be used in real-world scenarios.

## Instruction:
1. Review with students how to add and subtract fractions with unlike denominators. Explain to students that when adding or subtracting fractions with unlike denominators, we need to find a common denominator so that we can add or subtract the fractions.
2. Demonstrate how to find a common denominator by using the least common multiple (LCM) of the denominators.
3. Give examples of how to add and subtract fractions with unlike denominators using the common denominator method.
4. Hand out the fractions worksheet, which contains addition and subtraction problems with unlike denominators. Have students work in pairs to solve the problems.
5. After students have had time to work on the worksheet, go over the answers as a class, discussing any questions or concerns students may have had.
6. Introduce the real-world application of adding and subtracting fractions by using a scenario where a baking recipe needs to be doubled. For example, say that a recipe calls for 3/4 cup of sugar, but you need to make twice as much. Ask students how much sugar is needed and have them use fractions to find the answer.
7. Have students work in pairs to come up with a solution to the recipe scenario using fractions. After they have completed their work, ask a few pairs to share their answers with the class. Discuss any differences or similarities in their solutions.
8. Review with students how to compute with very large and very small numbers, including decimals and fractions. Use a calculator to demonstrate how to add and subtract decimals and fractions.
9. Hand out a new worksheet that includes problems with computing very large and very small numbers. Have students work in pairs to solve the problems.
10. After students have had time to work on the worksheet, go over the answers as a class, discussing any questions or concerns students may have had.

## Closure:
- Provide a summary of what was learned in the lesson, emphasizing the importance of finding a common denominator when adding or subtracting fractions with unlike denominators.
- Review the concept of scaling fractions and how it can be used in real-world scenarios.
- Ask students to think of a real-world scenario where they used the concepts of fractions and computing with large and small numbers.

## Assessment:
- Check the students' worksheets for accuracy and understanding of the concepts.
- Observe students during the recipe scenario activity and computing with large and small numbers activity to ensure they are able to apply their understanding of fractions and computing to real-world problems.

## Differentiation:
- Students who need additional support will be provided with manipulatives such as fraction bars or circles to help visualize the concept.
- For advanced students, provide additional challenging problems in the worksheet or encourage them to find alternative methods for finding the common denominator.

## Context:
In grade five, students increase their facility with basic arithmetic operations applied to fractions, decimals, and positive and negative numbers. They learn how to apply fractions in real-world situations and how to compute with very large and very small numbers. Fluency expectations include fluently multiplying and dividing within 100 using strategies, and knowing from memory all products of two one-digit numbers. By connecting mathematics to everyday situations, students learn to see the relevance of mathematics in their lives.
`;

/**
 * TODO
 * - write this to a DB
 * - return the ID of the plan
 * - redirect user to the plan
 */
export async function POST(request: Request) {
  const body = (await request.json()) as LessonPlanGenerationSchema;
  const queryStr = generateLessonPlanStr(body);
  console.log("queryStr", queryStr);
  const out = await query(queryStr);
  console.log(out);
  return NextResponse.json({ content: out });
  // return NextResponse.json({ content: FAKE_OUT });
}
