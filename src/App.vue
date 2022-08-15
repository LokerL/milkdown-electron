<template>
  <VueEditor />
</template>

<script setup>
import VueEditor from "./components/milkdown/milkdown";
</script>

<style>
@font-face {
  font-family: "Material Icons";
  font-style: normal;
  font-weight: 400;
  src: url(./assets/flUhRq6tzZclQEJ-Vdg-IuiaDsNc.woff2) format("woff2");
}

:root {
  --milkdown-menu-height: 40px;
}
body {
  background-color: #fff;
}
.milkdown {
  height: calc(100vh - 16px - 56px);
}
.milkdown-menu {
  height: var(--milkdown-menu-height);
  display: flex !important;
  align-items: center;
  border-radius: 10px;
}

.material-icons {
  font-family: "Material Icons";
  font-weight: normal;
  font-style: normal;
  font-size: 24px;
  line-height: 1;
  letter-spacing: normal;
  text-transform: none;
  display: inline-block;
  white-space: nowrap;
  word-wrap: normal;
  direction: ltr;
  font-feature-settings: "liga";
  -webkit-font-smoothing: antialiased;
}
</style>
