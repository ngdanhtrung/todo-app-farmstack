import { TodoScreen } from "../components/views/TodoScreen";
import { AboutScreen } from "../components/views/AboutScreen";
export const Routes = [
  {
    path: "/about",
    component: AboutScreen,
    label: "About me",
  },
  {
    path: "/",
    component: TodoScreen,
    label: "Todo List",
  },
];
