import { Prisma, Todo } from "@prisma/client";

const headers = {
  Accept: "application/json",
  "Content-Type": "application/json",
};

/**
 * GET /api/todos/:id
 *
 * Retrieve a single todo.
 */
export async function get(id: number): Promise<Todo> {
  const response = await fetch(`/api/todos/${id}`);
  const json = await response.json();

  if (!response.ok) {
    throw json;
  }

  return json;
}

/**
 * POST /api/todos/create
 *
 * Create a todo.
 */
export async function create(todo: Prisma.TodoCreateInput): Promise<Todo> {
  const response = await fetch("/api/todos/create", {
    method: "POST",
    body: JSON.stringify(todo),
    headers,
  });

  const json = await response.json();

  if (!response.ok) {
    throw json;
  }

  return json;
}

/**
 * PATCH /api/todos/:id/update
 *
 * Update a todo.
 */
export async function update(
  id: number,
  todo: Prisma.TodoUpdateInput
): Promise<Todo> {
  const response = await fetch(`/api/todos/${id}/update`, {
    method: "PATCH",
    headers,
    body: JSON.stringify(todo),
  });

  const json = response.json();

  if (!response.ok) {
    throw json;
  }

  return json;
}

/**
 * DELETE /api/todos/:id/delete
 *
 * Delete a todo.
 */
export async function destroy(id: number): Promise<Todo> {
  const response = await fetch(`/api/todos/${id}/delete`, {
    method: "DELETE",
    headers,
  });

  const json = await response.json();

  if (!response.ok) {
    throw json;
  }

  return json;
}
/**
 * GET /api/todos
 *
 * Fetch all todos.
 */
export async function list(id: number): Promise<Todo[]> {
  const response = await fetch(`/api/todos`, {
    method: "GET",
    headers,
  });

  const json = await response.json();

  if (!response.ok) {
    throw json;
  }

  return json;
}
