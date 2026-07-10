import "./global.css";
import { ExpoRoot } from "expo-router";
import { StatusBar } from "expo-status-bar";

export default function App() {
  return (
    <>
      <StatusBar style="light" />
      <ExpoRoot context={require.context("./src/app")} />
    </>
  );
}
