import { AppRouter } from "./router/AppRouter";
import { AppTheme } from "./theme";

export const RpaApp = () => {
  return (
    <AppTheme>
      <AppRouter />
    </AppTheme>
  );
};
