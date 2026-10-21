# Exercises: a structured API

Complex IT Systems – Theory E2026 (40417)
Section 2 - backend development

Lessons: Implementing the Web API, and Application architecture and MVC.

This project is the instructors API from the Express exercises, complete and
working. You add no new endpoints. You rearrange the API: validation in one
place, errors in one place, a check of who is asking, and a business rule in
a service. Then you design the complete backend.

---

## Before you start

The same database as before. Copy `.env.example` to `.env`, fill in your
password, and choose a token of your own for `API_TOKEN`.

```
npm install
npm run build
npm start
```

Expected: `Listening on http://localhost:3000`. Read `src/routes/instructors.ts`
before you start: every task in this package changes it.

---

## Task 1 – Validation in one place

In `src/validation.ts`, write two functions:

- `validateNewInstructor(body)` returns the body as an `Instructor` when it
  is a valid one, and `undefined` otherwise. `id`, `name` and `deptName` must
  be non-empty strings, and `salary` a number above 0.
- `validateSalary(body)` returns the salary from a body `{ "salary": ... }`
  when it is a number above 0, and `undefined` otherwise.

Then make `POST /instructors` and `PUT /instructors/:id` use them, so that
no handler checks a body itself. The answers do not change: a bad body still
gives 400.

---

## Task 2 – Errors in one place

In `src/app.ts`, add one error handler for the whole API. Every route
handler passes its errors to it, and no handler answers 500 itself any more.
The error handler answers 500 and `{ "error": "internal error" }`, and never
sends the error's own text to the client.

Example: posting an instructor with Einstein's id now returns 500 and
`{ "error": "internal error" }`, instead of the database's own message.

---

## Task 3 – Who is asking

In `src/middleware/auth.ts`, write `requireToken`. `POST`, `PUT` and
`DELETE` on `/instructors` are allowed only with the header
`Authorization: Bearer <token>`, where the token is `API_TOKEN` from `.env`.
Without it, or with a wrong token, the answer is 401 and a JSON error
message, and the route handler never runs. Every `GET` stays open.

Example: `DELETE /instructors/99999` without the header returns 401, and the
instructor is still there.

---

## Task 4 – A rule in a service

The university has a rule: a new salary may be at most 10% above the
current one. A lower salary is always allowed.

In `src/services/salaries.ts`, write `changeSalary(id, salary)`. It returns
the updated instructor, or tells its caller that there is no such
instructor, or that the raise is too large. It knows nothing about HTTP: no
`req`, no `res`, no status code. The type it returns is in the file.

Then make `PUT /instructors/:id` use it. It answers 200 and the updated
instructor, 404 when there is no such instructor, and 409 when the raise is
too large.

Example: Einstein earns 95000. Setting 100000 returns 200. Setting 110000
returns 409, and the salary stays 95000.

---

## Task 5 – Testing without a client

In `requests.http`, add the `Authorization` header to every `POST`, `PUT`
and `DELETE` request. Then add a request for each new answer: 400 for a bad
salary, 401 without a token, 409 for a raise that is too large, and 500 from
the error handler. Send each one and check its status code.

---

## Task 6 – Design the complete backend

`backend-design.md`

The complete backend, which you build in the next exercises, has two
resources, instructors and departments, and one operation with rules of its
own: hiring an instructor into a department. Write down every endpoint with
its failures and status codes, and say which operations need a service.

---

## If you finish early

- Should a `GET` need a token too? Answer for two cases: an API that a
  public website reads, and an API that only university staff use.
- Where would you put a rule like "no salary may be higher than the
  department's budget"? Which modules would it need?
- Write a small script that calls `changeSalary` directly, without starting
  the server. Why is that possible here, and why would it not be if the rule
  were written inside the `PUT` handler?

---

## Reference

- **[EXP]** Express: Using middleware, Writing middleware, Error handling
- **[EAA]** Catalog of Patterns of Enterprise Application Architecture:
  Model View Controller, Service Layer, Transaction Script
- **[HTTP]** MDN HTTP: response status codes (401, 409)
