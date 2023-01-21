import { FormEvent } from "react";

interface CreateTodoFormProps {
  handleSaveTodo: (newTodo: string) => void;
  handleCloseTodoCreation: () => void;
}

function CreateTodoForm({
  handleSaveTodo,
  handleCloseTodoCreation,
}: CreateTodoFormProps) {
  function handleFormSubmit({ target }: FormEvent<HTMLFormElement>) {
    if (target === null) {
      return;
    }

    const formData = new FormData(target as HTMLFormElement);
    const newTodo = formData.get("new-todo");
    if (typeof newTodo !== "string") {
      return;
    }

    const sanitizedNewTodo = sanitizeNewTodo(newTodo);
    if (sanitizedNewTodo.length === 0) {
      return;
    }

    handleSaveTodo(newTodo);
  }

  function sanitizeNewTodo(todo: string): string {
    return todo.trim();
  }

  return (
    <div className="bg-white shadow sm:rounded-lg">
      <div className="px-4 py-5 sm:p-6">
        <h3 className="text-lg font-medium leading-6 text-gray-900">
          Create a todo
        </h3>

        <form
          className="mt-5"
          onSubmit={(event) => {
            event.preventDefault();

            handleFormSubmit(event);
          }}
        >
          <div className="w-full sm:max-w-xs">
            <label htmlFor="new-todo" className="sr-only">
              New Todo
            </label>

            <input
              id="new-todo"
              type="text"
              name="new-todo"
              className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-yellow-500 focus:border-yellow-500 sm:text-sm"
              placeholder="Write an article about XState"
            />
          </div>

          <div className="flex justify-start pt-5">
            <button
              type="submit"
              className="inline-flex justify-center px-4 py-2 text-sm font-medium text-white bg-yellow-500 border border-transparent rounded-md shadow-sm hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500"
            >
              Save
            </button>

            <button
              type="button"
              className="px-4 py-2 ml-3 text-sm font-medium bg-white border border-gray-300 rounded-md shadow-sm text-blue-gray-900 hover:bg-blue-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500"
              onClick={handleCloseTodoCreation}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default CreateTodoForm;
