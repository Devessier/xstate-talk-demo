import {
  fetchInitialTodos,
  generateId,
  synchronizeTodoList,
} from "@/services/todos";
import { assign, createMachine, send } from "xstate";
import { TodoItem } from "../types";

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

/** @xstate-layout N4IgpgJg5mDOIC5QBcD2FWwHQDEzIGMALASwDsoACck5EgQwBtK0NYBiDMsLcgN1QBrHq0y58xclRp0mLdJgT9UBenVRkA2gAYAujt2JQAB0y0SGoyAAeiAEwBmACxYnAVgDsD7R4CcvxwBGJwcAGhAAT3s7AA4sGO0HN207NzdU7W1AgDYAX1zw0Ww8QlIKajJzOSL2MAAnOtQ6rGNGNQAzJoBbLCLxUqkKquYipTIBVXUtPQMrU1hzSyQbRDcHDyxfJ19s7xidh19At3CohF8N7OOEu2yjwMCYnPzChWKJIkgh2RG3rABlCJkYiNSoAL3qWAA6vRzOVOnUWHUSFAYHV2IDgURQSQIfIMJRGCRYMhZst5osyFZbAgQoEsIEDsFHE4PGkYidIogPB44jtfCkkh4nE87L4XiA+iViF8ZAxfmwAUCQRpcZCACJgABGqAArsCpBjldjVXjRITiaS9HMzFNqfYYnFWe5stlHPseb5TogLr4sNpsj4Yk47IFUr43E4JVKPrLKj98WJMSrwRrtXqDRR2NYSWoePR2sh6gAKQKZbQASnYMdKceGiewyZNqeamp1+oIUjJJltFipyxprocWDsdLcMQ82icx0S3oQHtcTm0E4c2Wndi8eQKkr+0s+EG+8obSqxOIhzSbZ8NXB4ymEvV3sYPcuqf0vpsh7-BUjGEzUfYMbsQApO0B25JwXBdBwYnWGD1lZOcPEeVwYNiUdWVSbZo0fWtn3jI8+i-NUL2NK8s3qRpmlaDpugfRU9zrBNCNIj8SNPU0f2USYAJma1yV7JZQBpR07FcHIwwjEIJzsOdxz9D1vEnB5oIg7D6KfQ9X0VAAVN5KC6egyHoNF2AAVWMCA80TFgwGsK1DH4hZQKEn1tHktltGSNy3QnDw5weWJNiOLwniyGCIzUsQGLw+s+l0th9MM4z6jMiyrPNXNkF1WAgJAvt7QQTw3AZX1pxSYNg38sM+WC6Cy0eKNtxrGUYqYv54swRKjJMzVGHwMBE1ygT+xchAHGCLBsh5EMLmSDwrhibIqsC-xAhC+rwrcSL3lwzSFTEDrYC65LmhwbpKAIRhMEgdgAHljDAMhrIIOowH-DRKARLohqc-KwMKmDNiSWJJ3HGJQz8rkEECdZhzWxIQwcJG1gcbb+havbj0O460Vwc7UAe7gIHYAAFV7YCOgBRf4AGFKGECIfspAq3W0SbwYubYyzuCd-LXDYA3Btk7A3JHjjR6LMbivSDO6yEzrqLpKAJx6bv+XUtS6Whnte96nq+pnnJWQqeSwYX+dSK4I05M5ghDdnWV8fYxVdJwt1edTdpffbsGx2WTrxxXlcJm6acMggwH2i7damT7ukNv7Rs8OJwxSGGnbFGSoeOI4sHGi51iyAJgw8fJtzIdA4CsIobV+wTjbt1xhTcV13QuPw5wAWnGsTnDcp5FvWFGJY+QZvYbWvmf+91-XHaC3KSAM3aWqGW-9GCZx2ENbmFd2d09jHx5rxyp9GxlROdFu3Wg9uvSh6cXAFEMYcZYMW-FpqcMP-CtKTFiW0nkbGko42aX1bjfT0skUiuEyDyQ4TwHB2CnCPL2P8fYnhTMRaEsI6DwiaEiFEaJAGJ2NhBYcbhfCIMQW6Z06w5zZEjJscGax0hINXMuFB39Ypvn-lgtsGZOwUGIfXGkbtipIR2D4NIlDxocjnPsYqMigxIMnAETh+4pY8PYi2DBzZcRSGESNY2zCzYeFDAw10awvCQzONJVwq4-BmJgpkNI6jGIEXajLJKRCT5APsNOEqi0RSeAjBkGxiBqrFSmvPShCM7huNah4nSXi5anXOpda6EBDEFViH6V+a4OR+HSHNfyIQXBPGyKFFIng7h2ASZo5JCV-a4wVkrFWRNsn-X8MVdYTjIxTQCEjUpzh4g5Cqakeaaiy5AA */
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

            states: {
              "Form closed": {
                on: {
                  "Open todo creation form": "Form opened",
                },
              },
              "Form opened": {
                on: {
                  "Press ESC key": "Form closed",
                  "Submit todo creation form": {
                    target: "Form closed",
                    actions: [
                      "Assign new todo to context",
                      "Wake up synchronizer",
                    ],
                  },
                  "Cancel todo creation form": "Form closed",
                },
              },
            },

            initial: "Form closed",
          },
        },
      },
    },

    initial: "Fetching initial todos",
  },
  {
    services: {
      "Fetch todos": (_context, _event) => {
        return fetchInitialTodos();
      },

      "Synchronize todo list": ({ todos }) => {
        return synchronizeTodoList(todos);
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
