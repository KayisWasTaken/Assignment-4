// Task 3 - who is asking (lesson Implementing the Web API)
//
// A fixed token from .env, for practice. A real API checks a token issued at
// login, which the security section of the course covers.

import { Request, Response, NextFunction } from 'express';

/**
 * Lets the request through only when it carries the header
 *
 *     Authorization: Bearer <the API_TOKEN from .env>
 *
 * Otherwise it answers 401 and a JSON error message, and the route handler
 * never runs.
 */
export function requireToken(req: Request, res: Response, next: NextFunction): void {
  // TODO
  throw new Error('not implemented');
}
