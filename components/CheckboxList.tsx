import { ChangeEvent } from "react";
import clsx from "clsx";
import { TodoItem } from "../types";
import { TrashIcon } from "@heroicons/react/24/outline";

function CheckboxListSkeletons() {
  const widthClasses = ["w-64", "w-32", "w-48"];

  return (
    <>
      {Array.from({ length: 3 }).map((_, index) => {
        const widthClass = widthClasses[index % widthClasses.length];

        return (
          <div
            key={index}
            className={clsx([
              "h-4 bg-gray-200 rounded-md animate-pulse max-w-full",
              widthClass,
            ])}
          />
        );
      })}
    </>
  );
}

interface CheckboxListProps {
  isLoading: boolean;
  items: TodoItem[];
  onCheckboxChange: (id: string, checked: boolean) => void;
  onTextChange: (id: string, text: string) => void;
  onDelete: (id: string) => void;
  title: string;
}

function CheckboxList({
  isLoading,
  title,
  items,
  onCheckboxChange,
  onTextChange,
  onDelete,
}: CheckboxListProps) {
  function handleCheckboxChangeEvent(
    id: string,
    event: ChangeEvent<HTMLInputElement>
  ) {
    const target = event.target;
    if (target === null) {
      return;
    }
    const inputTarget = target as HTMLInputElement;

    onCheckboxChange(id, inputTarget.checked);
  }

  function handleInputChangeEvent(
    id: string,
    event: ChangeEvent<HTMLInputElement>
  ) {
    console.log("handleInputChangeEvent", { id, value: event.target.value });

    const target = event.target;
    if (target === null) {
      return;
    }
    const inputTarget = target as HTMLInputElement;

    onTextChange(id, inputTarget.value);
  }

  return (
    <fieldset className="grid grid-cols-1">
      <legend className="text-lg font-medium leading-6 text-gray-900">
        {title}
      </legend>

      <ul className="mt-4 space-y-2">
        {isLoading === true ? (
          <CheckboxListSkeletons />
        ) : items.length === 0 ? (
          <p className="text-base text-gray-500">No todos here!</p>
        ) : (
          items.map(({ id, label, checked }) => (
            <li key={id} className="relative flex items-start">
              <div className="flex items-center h-5">
                <input
                  checked={checked}
                  aria-describedby={`todo-${id}-description`}
                  name={`todo-${id}`}
                  type="checkbox"
                  className="w-4 h-4 text-yellow-600 border-gray-300 rounded focus:ring-yellow-500"
                  onChange={(event) => handleCheckboxChangeEvent(id, event)}
                />
              </div>

              <div className="ml-3 text-sm">
                <input
                  id={`todo-${id}-description`}
                  value={label}
                  onChange={(event) => handleInputChangeEvent(id, event)}
                  className="font-medium text-gray-700"
                />
              </div>

              <div className="ml-6">
                <button
                  onClick={() => onDelete(id)}
                  className="focus:outline-none focus:ring-2 focus:ring-yellow-500 rounded"
                >
                  <TrashIcon className="h-5 w-5" />
                </button>
              </div>
            </li>
          ))
        )}
      </ul>
    </fieldset>
  );
}

export default CheckboxList;
