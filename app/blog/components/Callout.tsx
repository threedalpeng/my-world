import {
  CheckCircleIcon,
  ExclamationTriangleIcon,
  InformationCircleIcon,
  XCircleIcon,
} from "@heroicons/react/24/outline";
import { ComponentType, ReactNode } from "react";

interface CalloutProps {
  children?: ReactNode;
  type?: CalloutType;
  colored?: boolean;
}
type CalloutType = "info" | "success" | "warning" | "error";
interface CalloutStyle {
  alert: `alert-${CalloutType}`;
  icon: `text-${CalloutType}`;
}

const CalloutStyleMap: Record<CalloutType, CalloutStyle> = {
  info: {
    alert: "alert-info",
    icon: "text-info",
  },
  success: {
    alert: "alert-success",
    icon: "text-success",
  },
  warning: {
    alert: "alert-warning",
    icon: "text-warning",
  },
  error: {
    alert: "alert-error",
    icon: "text-error",
  },
};
const CalloutTypeIconMap: Record<
  CalloutType,
  ComponentType<{ className?: string }>
> = {
  info: InformationCircleIcon,
  error: XCircleIcon,
  warning: ExclamationTriangleIcon,
  success: CheckCircleIcon,
};

export default function Callout({
  children,
  type = "info",
  colored = false,
}: CalloutProps) {
  const IconComponent = CalloutTypeIconMap[type];
  const style = CalloutStyleMap[type];
  return (
    <aside
      className={`alert shadow ${colored ? style.alert : ""} flex flex-row`}
    >
      <IconComponent
        className={`w-8 min-w-[2rem] min-h-[2rem] h-8 ${
          colored ? "" : style.icon
        }`}
      ></IconComponent>
      <span>{children}</span>
    </aside>
  );
}
