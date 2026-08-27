import { RouterProvider } from "react-router-dom";
import { router } from "./router/routerConfig";
import { StoreProvider } from "./providers/StoreProvider/StoreProvider";

function App() {
  return (
    <StoreProvider>
      <RouterProvider router={router} />
    </StoreProvider>
  );
}

export default App;