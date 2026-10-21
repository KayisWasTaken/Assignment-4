# Task 6 – Design the complete backend

The complete backend has two resources, instructors and departments, and
one operation with rules of its own: hiring an instructor into a
department. For a hire, the department must exist, the id must not be
taken, and the budget must cover the salary. The instructor is then stored,
and the salary is taken off the department's budget.

Fill in one row per operation. Name the query parameters, give every
failure its status code, and mark the operations that need a service.

| Method and path | Request body | Success, and what comes back | Failures | Service? |
|---|---|---|---|---|
| `GET /instructors?…` | none | 200 |  |  |
| `GET /instructors/{id}` | none | 200 |  |  |
| `PUT /instructors/{id}` |  |  |  |  |
| `DELETE /instructors/{id}` | none |  |  |  |
| `GET /departments` | none |  |  |  |
| `GET /departments/{name}` | none |  |  |  |
| `POST /departments/{name}/instructors` |  |  |  |  |

What does the collection send besides the items, and why?

The default page size is ___, and the maximum is ___.

Which operations need a service, and why those?
