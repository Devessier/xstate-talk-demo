import { assign, createMachine, send } from "xstate";
import { nanoid } from "nanoid/non-secure";
import { TodoItem } from "../types";

function generateId() {
  return nanoid();
}

function waitForTimeout(ms: number) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

type Context = {
  todos: TodoItem[];
};

type Event =
  | { type: "Synchronize todo list" }
  | { type: "Update todo text"; todoId: string; text: string }
  | { type: "Update todo status"; todoId: string; checked: boolean }
  | { type: "Delete todo"; todoId: string }
  | { type: "Open todo creation form" }
  | { type: "Press ESC key" }
  | { type: "Submit todo creation form"; text: string }
  | { type: "Cancel todo creation form" };

/** @xstate-layout N4IgpgJg5mDOIC5QBcD2FWwHQDEzIGMALASwDsoACck5EgQwBtK0NYBiDMsLcgN1QBrHq0y58xclRp0mLdJgT9UBenVRkA2gAYAujt2JQAB0y0SGoyAAeiAEwBOAKxY7AZgCMAFgBsXr3Y+bk5eDm4ANCAAnogAHG5YIe5uDl7x2v4OPgC+2ZGi2HiEpBTUZOZyBexgAE41qDVYxoxqAGYNALZYBeLFUmUVzAVKZAKq6lp6BlamsOaWSDaIALReCV5OsXaxHtp2dtoA7NoeWZExCHYeLhneviFuGdo5eSA9RcSQA7JDCtgAylEyMR6uUAF61LAAdXo5lK7RqLBqJCgMBq7EBwKIoJIEPkGEojBIsGQ00Ws3mZCstgQjx8WFihx8uw8PicTjcjic50QHjshxcXkO-jcbkOnh8YVy+T+vU+EG+DF+bCwmJBGlxkIAImAAEaoACuwKkGKB6vBYHxqEJxNJehmZgm1N5Plirj2p202gch28x250V5G0OiTFHliTjZWQcp2lb1lHyIXxkSqtALN2I1EMaOv1RoIJusJLUPHorWQtQAFLsvQBKdjvCRJhUpyqytWZi05vWG40UMkmR0WKmLGlOb2uOyR3xs5n8nw8hAeNyxekeXaOJ5TjZ2OON4rJ8o-NOqjM47OnrHnk1cHjKYTdBNNw+DE8d8+Q99ZqQjMZqYcGAOIAUk6o6IMy2gMvsBxCgEjLCou66HCGbg+Acmz+Okbh7k+B4tkeqY9F+XaXuauImrU9SNM0bSdI+KqJi+x5EWeWafqx4I-so4wAVM9rkkOCygDS4oOFgfibMhsSpDG1yIbsLiStoopMl4XqxAEOEMc++Gvj0AAqfyUB09BkPQaLsAAqsYEAllaLBgNYdqGAJcygcJiBOMhWDruy3joY8pyIVsHgMg4U6nIEbhpBsWliIxunMbKhlsMZpnmbUVk2XZoiUMWyAGrAQEgcOzoIF5kEBAEmzSaukqxIhTgOJBrIcnYalwSucWFDpiptiqKWYGlZkWTqjD4JaojFYJI4eUu0VYN6zzHKumxZHsiGSqF-LhZKjhZJprz7vKfXKmIg2wJQBA1GA-4aFgACSEDjewADyxhgGQ9nXbdEyUAiHTTW5pVgQgO5YF4y4+h4hyrls2wLoG5UpFgYohGEjKchpTjdXKzanSeF1XTdd1kLgnSUKgH3cBA7AAAo3bAl0AKL-AAwpQwhREDlJlWkYmsqyyGHI4jIeIuEYJJGDirmEeyoUEuMJQTBlGT9pPkzUHSU9TkAYgauodLQ30k39AM8+5Sxg74rieJyTI7DJ-KLmhLiy1cnIVeuDhK71rZndgRPqxMmva1Tn162zpkEGAZ3E79w7-Z0Fsg3N-j0uKDt+DLRyBIusNiWpU7BF6DipHyuSvGQ6BwFYBQOsDQlW8sMYQ5s2wbgcxx2Iuyz0l6A-aOykb7LD2FHbhkilP7aYN7zoMBBLoWhGynLaDsVyOC8MraXhKt-HPlsiXY7pXM13q+kKQ+LqhXio1sIp8vykPRb7e8zyxV5sTUh+p1bfKQQOGfUul9-SIROG6U4K52qhHHJGbe8Zd4nQ-u2DimpGgwjhFQBESIURol-k3GkngxL8jpKhYU64fDIXkgKBkSQ0KQxhhsDwb9kEEX6mIYi6CsC5l7AWCgBDZpW2iqFFIqR-Ar3auLJGy4NLiT2LA-wG5wysPxiglUXCLyaKkIIsqUYfJX35FsKhzIGoyNQqFXYpiOR7GUsKVRTFCLJSMiZEatRdELy9FgcUVC7g+GZBsLwiERYhj2ikSSRiHGJScQNNWps-4lUIbyX0DINhHB8LnHYXkglI2YQyAurpxycjLl4KJ+9YmpWDsOR6z0wAeLmmfVJ44mSZOuAhJG-iT7bHcEo2GfhYoTyQWo9hAcsBB3ifdHAFNw403qVbB+qMggaUCCcdkRwXZoVcFsaKkM+n+BxpXIAA */
export const todosMachine = createMachine(
  {
    context: { todos: [] },
    tsTypes: {} as import("./todosMachine.typegen").Typegen0,

    schema: {
      context: {} as Context,
      events: {} as Event,
      services: {} as {
        "Fetch todos": {
          data: TodoItem[];
        };
        "Synchronize todo list": {
          data: void;
        };
      },
    },

    id: "todos",

    states: {
      "Fetching initial todos": {
        invoke: {
          src: "Fetch todos",

          onDone: {
            target: "Fetched initial todos",
            actions: "Assign todos to context",
          },

          onError: {
            target: "Fetched initial todos",
            description: `Initial todos could not be recovered. We start the app with a blank todo list.`,
          },
        },
      },
      "Fetched initial todos": {
        type: "parallel",

        states: {
          Synchronizer: {
            states: {
              "Waiting for trigger": {
                on: {
                  "Synchronize todo list": "Debouncing",
                },
              },

              Debouncing: {
                on: {
                  "Synchronize todo list": {
                    target: "Debouncing",
                    internal: false,
                  },
                },

                after: {
                  "1000": "Synchronizing",
                },
              },

              Synchronizing: {
                invoke: {
                  src: "Synchronize todo list",
                  onDone: "Waiting for trigger",
                  onError: "Waiting for trigger",
                },
              },
            },

            initial: "Waiting for trigger",
          },
          "Todos manager": {
            on: {
              "Update todo text": {
                target: "Todos manager",
                internal: true,
                actions: [
                  "Assign new text of todo into context",
                  "Wake up synchronizer",
                ],
              },

              "Update todo status": {
                target: "Todos manager",
                internal: true,
                actions: [
                  "Assign new status of todo into context",
                  "Wake up synchronizer",
                ],
              },

              "Delete todo": {
                target: "Todos manager",
                internal: true,
                actions: ["Delete todo from context", "Wake up synchronizer"],
              },
            },
          },
          "Todos creation": {
            states: {
              Idle: {
                on: {
                  "Open todo creation form": "Form opened",
                },
              },
              "Form opened": {
                on: {
                  "Press ESC key": "Idle",
                  "Submit todo creation form": {
                    target: "Idle",
                    actions: [
                      "Assign new todo to context",
                      "Wake up synchronizer",
                    ],
                  },
                  "Cancel todo creation form": "Idle",
                },
              },
            },

            initial: "Idle",
          },
        },
      },
    },

    initial: "Fetching initial todos",
  },
  {
    services: {
      "Fetch todos": async (_context, _event): Promise<TodoItem[]> => {
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
      },

      "Synchronize todo list": async ({ todos }) => {
        // Synchronize todos with IndexDB, a server, etc.

        await waitForTimeout(2_000);
      },
    },

    actions: {
      "Assign todos to context": assign({
        todos: (_context, { data: todos }) => todos,
      }),
      "Assign new todo to context": assign({
        todos: ({ todos }, { text }) => [
          ...todos,
          {
            id: generateId(),
            label: text,
            checked: false,
          },
        ],
      }),
      "Delete todo from context": assign({
        todos: ({ todos }, { todoId }) =>
          todos.filter(({ id }) => id !== todoId),
      }),
      "Assign new status of todo into context": assign({
        todos: ({ todos }, { todoId, checked }) =>
          todos.map(({ id, ...props }) => {
            if (id === todoId) {
              return {
                id,
                ...props,
                checked,
              };
            }

            return {
              id,
              ...props,
            };
          }),
      }),
      "Assign new text of todo into context": assign({
        todos: ({ todos }, { todoId, text }) =>
          todos.map(({ id, ...props }) => {
            if (id === todoId) {
              return {
                id,
                ...props,
                label: text,
              };
            }

            return {
              id,
              ...props,
            };
          }),
      }),
      "Wake up synchronizer": send({
        type: "Synchronize todo list",
      }),
    },
  }
);
