import { useKey } from "react-use";
import { PlusIcon } from "@heroicons/react/24/solid";
import { ArrowPathIcon } from "@heroicons/react/20/solid";
import debounce from "lodash.debounce";
import CheckboxList from "@/components/CheckboxList";
import CreateTodoForm from "@/components/CreateTodoForm";
import { useEffect, useMemo, useState } from "react";
import { TodoItem } from "@/types";
import {
  fetchInitialTodos,
  generateId,
  synchronizeTodoList,
} from "@/services/todos";
import { useEvent } from "@/utils/useEvent";

export default function WithNothing() {
  const todos: TodoItem[] = [];
  const thingsToDo = todos.filter(({ checked }) => checked === false);
  const thingsDone = todos.filter(({ checked }) => checked === true);

  const isSynchronizing = false as boolean;
  const isLoadingInitialTodos = false as boolean;
  const showTodoCreationForm = false as boolean;

  function handleOpenTodoCreation() {}

  function handleCloseTodoCreation() {}

  function handleSaveTodo(newTodo: string) {}

  function handleTodoStatusUpdate(todoId: string, checked: boolean) {}

  function handleTodoTextUpdate(todoId: string, text: string) {}

  function handleTodoDelete(todoId: string) {}

  useKey("Escape", (event) => {
    event.preventDefault();
  });

  return (
    <div className="min-h-screen bg-white">
      <nav className="bg-white border-b border-gray-200">
        <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <p className="text-xl font-medium leading-6 text-gray-900 sm:truncate">
              XTodo
            </p>
          </div>
        </div>
      </nav>

      <div className="py-10">
        <div className="mx-auto max-w-7xl">
          <header>
            <div className="px-4 sm:px-6 lg:px-8 md:flex md:items-center md:justify-between">
              <div className="flex items-center flex-1 min-w-0">
                <h1 className="text-3xl font-bold leading-tight text-gray-900">
                  Things to get done
                </h1>

                {isSynchronizing === true ? (
                  <div className="ml-4">
                    <ArrowPathIcon className="w-6 h-6 text-yellow-500 animate-spin" />
                  </div>
                ) : null}
              </div>
            </div>
          </header>

          <main>
            <div className="transition-opacity duration-200 sm:px-6 lg:px-8">
              <div className="px-4 py-8 space-y-4 sm:px-0">
                <CheckboxList
                  isLoading={isLoadingInitialTodos}
                  items={thingsToDo}
                  onCheckboxChange={handleTodoStatusUpdate}
                  onTextChange={handleTodoTextUpdate}
                  onDelete={handleTodoDelete}
                  title="Things to do"
                />

                {showTodoCreationForm === true ? (
                  <CreateTodoForm
                    handleSaveTodo={handleSaveTodo}
                    handleCloseTodoCreation={handleCloseTodoCreation}
                  />
                ) : (
                  <button
                    type="button"
                    className="inline-flex items-center px-3 py-2 text-sm font-medium leading-4 text-white bg-yellow-500 border border-transparent rounded-full shadow-sm hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500"
                    onClick={handleOpenTodoCreation}
                  >
                    <PlusIcon
                      className="-ml-0.5 mr-2 h-4 w-4"
                      aria-hidden="true"
                    />
                    Add a todo
                  </button>
                )}

                <CheckboxList
                  isLoading={isLoadingInitialTodos}
                  items={thingsDone}
                  onCheckboxChange={handleTodoStatusUpdate}
                  onTextChange={handleTodoTextUpdate}
                  onDelete={handleTodoDelete}
                  title="Things done"
                />
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
