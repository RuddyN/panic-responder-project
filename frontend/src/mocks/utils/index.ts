import { render, type RenderOptions } from "@testing-library/react";
import type { ReactElement } from "react";
import { ProviderWrapper } from "./providers";

export default function renderInWrapper(
  element: ReactElement,
  options?: Omit<RenderOptions, "wrapper">
) {
  return render(element, { wrapper: ProviderWrapper, ...options });
}
