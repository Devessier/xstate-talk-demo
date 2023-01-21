import { TodoItem } from "@/types";
import { nanoid } from "nanoid/non-secure";

export function generateId() {
  return nanoid();
}

function waitForTimeout(ms: number) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

export async function fetchInitialTodos() {
  await waitForTimeout(1_000);

  const initialTodos = [
    {
      id: generateId(),
      label: "Prepare my talk about XState",
      checked: true,
    },
    {
      id: generateId(),
      label: "Buy a new keyboard",
      checked: false,
    },
    {
      id: generateId(),
      label: "Write an article about XState",
      checked: false,
    },
  ];

  return initialTodos;
}

export async function synchronizeTodoList(todos: TodoItem[]) {
  // Synchronize todos with IndexDB, a server, etc.

  await waitForTimeout(2_000);
}
