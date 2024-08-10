import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { PersistGate } from "redux-persist/integration/react";
import App from "./App.tsx";
import { PermissionProvider } from "./context/PermissionContext.tsx";
import { RegisterProvider } from "./context/RegisterContext.tsx";
import { SidebarProvider } from "./context/Sidebarcontext.tsx";
import "./index.css";
import { persistor, store } from "./redux/store";
import ReactGA from "react-ga4";

ReactGA.initialize("G-SV4CBBR4ER");
ReactGA.send({
	hitType: "pageview",
	page: window.location.pathname,
});

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")!).render(
	<BrowserRouter>
		<PermissionProvider>
			<SidebarProvider>
				<RegisterProvider>
					<Provider store={store}>
						<PersistGate loading={null} persistor={persistor}>
							<QueryClientProvider client={queryClient}>
								<App />
							</QueryClientProvider>
						</PersistGate>
					</Provider>
				</RegisterProvider>
			</SidebarProvider>
		</PermissionProvider>
	</BrowserRouter>
);
