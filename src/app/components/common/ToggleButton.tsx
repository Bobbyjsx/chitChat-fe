import { Switch } from "@headlessui/react";
import classNames from "classnames";

export type ToggleButtonProps = {
  checked?: boolean;
  label?: string | React.ReactNode;
  onChange: (checked: boolean) => void;
  isDisabled?: boolean;
};

export const ToggleButton = ({
  checked,
  onChange,
  label,
  isDisabled,
}: ToggleButtonProps) => {
  return (
    <Switch.Group as="div" className="flex items-center">
      <Switch
        checked={checked}
        className={classNames(
          checked ? "bg-purple-600" : "bg-gray-200",
          "relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-purple-600 focus:ring-offset-2",
        )}
        disabled={isDisabled}
        onChange={onChange}
      >
        <span
          aria-hidden="true"
          className={classNames(
            checked ? "translate-x-5" : "translate-x-0",
            "pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out",
          )}
        />
      </Switch>
      {label && (
        <Switch.Label as="span" className="ml-3 text-sm">
          <span className="text-gray-900">{label}</span>
        </Switch.Label>
      )}
    </Switch.Group>
  );
};
