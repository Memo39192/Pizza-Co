import { Outlet, useNavigation } from "react-router";
import CartOverview from "../features/cart/CartOverview";
import Header from "./Header";
import Loader from "./Loader";

function AppLayout() {
  const isLoading = useNavigation().state === "loading";

  return (
    <div className="grid h-dvh grid-rows-[auto_1fr_auto]">
      {isLoading && <Loader />}
      <Header />

      <main className="mx-auto w-full max-w-3xl overflow-auto">
        <Outlet />
      </main>

      <CartOverview />
    </div>
  );
}

export default AppLayout;
