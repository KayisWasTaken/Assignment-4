// Task 1 - validation in one place (lesson Implementing the Web API)
//
// A request body comes from a client, so it is untrusted until it has been
// checked. These functions do the checking, so that no handler has to.

import { Instructor } from './data/instructors.js';

/**
 * The body of POST /instructors as an Instructor, or undefined when it is
 * not a valid one: id, name and deptName must be non-empty strings, and
 * salary a number above 0.
 */
export function validateNewInstructor(body: unknown): Instructor | undefined {
  // TODO
  throw new Error('not implemented');
}

/**
 * The salary from the body of PUT /instructors/:id, { "salary": number }, or
 * undefined when it is missing or not a number above 0.
 */
export function validateSalary(body: unknown): number | undefined {
  // TODO
  throw new Error('not implemented');
}
