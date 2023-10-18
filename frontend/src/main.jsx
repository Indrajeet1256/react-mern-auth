import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "bootstrap/dist/css/bootstrap.min.css";
import "./index.css";
import {
	createBrowserRouter,
	createRoutesFromElements,
	Navigate,
	Route,
	RouterProvider,
} from "react-router-dom";
import HomeScreen from "./pages/HomeScreen.jsx";
import LoginScreen from "./pages/LoginScreen.jsx";
import RegisterScreen from "./pages/RegisterScreen.jsx";
import ProfileScreen from "./pages/ProfileScreen.jsx";
import PrivateRoute from "./components/PrivateRoute.jsx";
import { Provider } from "react-redux";
import store from "./store";

const router = createBrowserRouter(
	createRoutesFromElements(
		<Route path="/" element={<App />}>
			<Route path="/" index element={<HomeScreen />} />
			<Route path="/login" element={<LoginScreen />} />
			<Route path="/register" element={<RegisterScreen />} />
			<Route element={<PrivateRoute />} path="">
				{/* Private Routes */}
				<Route path="/profile" element={<ProfileScreen />} />
			</Route>
			<Route path="*" element={<Navigate to="/" />} />
		</Route>
	)
);

ReactDOM.createRoot(document.getElementById("root")).render(
	<React.StrictMode>
		<Provider store={store}>
			<RouterProvider router={router} />
		</Provider>
	</React.StrictMode>
);
