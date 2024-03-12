import React from "react";
import { Slot, Tabs } from "expo-router";
import Header from "./header";
import Footer from "./footer";

export default function RootLayout() {
  return (
    <>
      <Header />
      <Slot />
      <Footer />
    </>
  );
}
