import { createNavigationContainerRef, StackActions } from "@react-navigation/native";

export const navigationRef = createNavigationContainerRef();

// Function to navigate safely
export function navigate(name, params) {
  if (navigationRef.isReady()) {
    //.log(`🔄 Navigating to ${name}...`);
    navigationRef.navigate(name, params);
  } else {
    //.warn("⚠️ Navigation not ready yet. Storing request...");
    setTimeout(() => navigate(name, params), 500); // Retry after delay
  }
}

// Function to go back safely
export function goBack() {
  if (navigationRef.isReady() && navigationRef.canGoBack()) {
    //.log("↩️ Going back...");
    navigationRef.goBack();
  } else {
    //.warn("⚠️ Cannot go back. No previous screen.");
  }
}

// Function to reset navigation (useful for logout scenarios)
export function reset(routeName) {
  if (navigationRef.isReady()) {
    //.log(`🔄 Resetting navigation to ${routeName}...`);
    navigationRef.dispatch(StackActions.replace(routeName));
  } else {
    //.warn("⚠️ Navigation not ready for reset.");
  }
}
