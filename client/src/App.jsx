import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import Connect from "./Connect";

const App = () => (
  <StrictMode>
    <div className="p-4">
      <h1 className="text-3xl font-bold underline">Hello World!</h1>
      <Connect />
    </div>
  </StrictMode>
);

const container = document.getElementById("root");
const root = createRoot(container);
root.render(<App />);
