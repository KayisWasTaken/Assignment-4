// Task 4 - a rule in a service (lesson Application architecture and MVC)
//
// The rule: a new salary may be at most 10% above the current one. A lower
// salary is always allowed. This is a rule about the university, not about
// HTTP and not about SQL, so it lives here. Nothing in this file knows about
// req, res or status codes.

import { Instructor } from '../data/instructors.js';

/** What changeSalary tells its caller. */
export type SalaryChange =
  | { ok: true; instructor: Instructor }
  | { ok: false; reason: 'not-found' | 'raise-too-large' };

/**
 * Gives an instructor a new salary, if the rule allows it.
 *
 *     changeSalary('22222', 100000)   ->  { ok: true, instructor: ... }
 *     changeSalary('22222', 110000)   ->  { ok: false, reason: 'raise-too-large' }
 *     changeSalary('99999', 50000)    ->  { ok: false, reason: 'not-found' }
 */
export async function changeSalary(id: string, salary: number): Promise<SalaryChange> {
  // TODO
  throw new Error('not implemented');
}
