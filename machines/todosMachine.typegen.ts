
  // This file was automatically generated. Edits will be overwritten

  export interface Typegen0 {
        '@@xstate/typegen': true;
        internalEvents: {
          "done.invoke.todos.Fetching initial todos:invocation[0]": { type: "done.invoke.todos.Fetching initial todos:invocation[0]"; data: unknown; __tip: "See the XState TS docs to learn how to strongly type this." };
"xstate.after(1000)#todos.Fetched initial todos.Synchronizer.Debouncing": { type: "xstate.after(1000)#todos.Fetched initial todos.Synchronizer.Debouncing" };
"xstate.init": { type: "xstate.init" };
        };
        invokeSrcNameMap: {
          "Fetch todos": "done.invoke.todos.Fetching initial todos:invocation[0]";
"Synchronize todo list": "done.invoke.todos.Fetched initial todos.Synchronizer.Synchronizing:invocation[0]";
        };
        missingImplementations: {
          actions: never;
          delays: never;
          guards: never;
          services: never;
        };
        eventsCausingActions: {
          "Assign new status of todo into context": "Update todo status";
"Assign new text of todo into context": "Update todo text";
"Assign new todo to context": "Submit todo creation form";
"Assign todos to context": "done.invoke.todos.Fetching initial todos:invocation[0]";
"Delete todo from context": "Delete todo";
"Wake up synchronizer": "Delete todo" | "Submit todo creation form" | "Update todo status" | "Update todo text";
        };
        eventsCausingDelays: {
          
        };
        eventsCausingGuards: {
          
        };
        eventsCausingServices: {
          "Fetch todos": "xstate.init";
"Synchronize todo list": "xstate.after(1000)#todos.Fetched initial todos.Synchronizer.Debouncing";
        };
        matchesStates: "Fetched initial todos" | "Fetched initial todos.Synchronizer" | "Fetched initial todos.Synchronizer.Debouncing" | "Fetched initial todos.Synchronizer.Synchronizing" | "Fetched initial todos.Synchronizer.Waiting for trigger" | "Fetched initial todos.Todos manager" | "Fetched initial todos.Todos manager.Form closed" | "Fetched initial todos.Todos manager.Form opened" | "Fetching initial todos" | { "Fetched initial todos"?: "Synchronizer" | "Todos manager" | { "Synchronizer"?: "Debouncing" | "Synchronizing" | "Waiting for trigger";
"Todos manager"?: "Form closed" | "Form opened"; }; };
        tags: never;
      }
  