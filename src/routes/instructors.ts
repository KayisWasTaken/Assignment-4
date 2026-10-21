// The instructors endpoints, given to you. They work: this is a version of
// what you built in the Express exercises. But every handler checks its own
// input and deals with its own errors, and the rule about raises has nowhere
// to go yet. Tasks 1 to 4 change that.

import { Router } from 'express';
import * as instructors from '../data/instructors.js';

export const instructorsRouter = Router();

const DEFAULT_LIMIT = 20;
const MAX_LIMIT = 100;

/** Query parameters are strings or undefined. Never trust them. */
function pageOf(query: Record<string, unknown>): { limit: number; offset: number } {
  const asked = Number(query.limit ?? DEFAULT_LIMIT);
  const limit = Number.isFinite(asked) && asked > 0 ? Math.min(asked, MAX_LIMIT) : DEFAULT_LIMIT;
  const from = Number(query.offset ?? 0);
  const offset = Number.isFinite(from) && from >= 0 ? from : 0;
  return { limit, offset };
}

instructorsRouter.get('/', async (req, res) => {
  try {
    const { limit, offset } = pageOf(req.query as Record<string, unknown>);
    const dept = typeof req.query.dept === 'string' ? req.query.dept : undefined;
    res.json(await instructors.list(dept, limit, offset));
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: (err as Error).message });
  }
});

instructorsRouter.get('/:id', async (req, res) => {
  try {
    const found = await instructors.find(req.params.id);
    if (found === undefined) {
      res.status(404).json({ error: `no instructor with id ${req.params.id}` });
      return;
    }
    res.json(found);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: (err as Error).message });
  }
});

instructorsRouter.post('/', async (req, res) => {
  try {
    const b = req.body as Record<string, unknown>;
    if (b === null || typeof b !== 'object' ||
        typeof b.id !== 'string' || b.id.trim() === '' ||
        typeof b.name !== 'string' || b.name.trim() === '' ||
        typeof b.deptName !== 'string' || b.deptName.trim() === '' ||
        typeof b.salary !== 'number' || !(b.salary > 0)) {
      res.status(400).json({ error: 'id, name, deptName and salary are required' });
      return;
    }
    const created = await instructors.insert(
      { id: b.id, name: b.name, deptName: b.deptName, salary: b.salary });
    res.status(201).location(`/instructors/${created.id}`).json(created);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: (err as Error).message });
  }
});

instructorsRouter.put('/:id', async (req, res) => {
  try {
    const b = req.body as Record<string, unknown>;
    if (b === null || typeof b !== 'object' ||
        typeof b.salary !== 'number' || !(b.salary > 0)) {
      res.status(400).json({ error: 'salary must be a number above 0' });
      return;
    }
    const updated = await instructors.updateSalary(req.params.id, b.salary);
    if (updated === undefined) {
      res.status(404).json({ error: `no instructor with id ${req.params.id}` });
      return;
    }
    res.json(updated);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: (err as Error).message });
  }
});

instructorsRouter.delete('/:id', async (req, res) => {
  try {
    const gone = await instructors.remove(req.params.id);
    if (!gone) {
      res.status(404).json({ error: `no instructor with id ${req.params.id}` });
      return;
    }
    res.status(204).end();
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: (err as Error).message });
  }
});
