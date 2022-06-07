import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./App";
import Workshop from "./routes/Workshop";
import { ShoppingCartProvider } from "./context/ShoppingCartContext";
function AppRouter() {
  return (
    <ShoppingCartProvider >
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} exact />
        <Route path="workshops/:workshopID" element={<Workshop />}/>
      </Routes>
    </BrowserRouter>
    </ShoppingCartProvider>

  );
}
export default AppRouter;
