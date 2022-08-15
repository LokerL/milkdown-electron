<template>
  <div class="app">
    <Header />
    <div class="container">
      <div class="aside"></div>
      <div class="editor-area">
        <VueEditor />
      </div>
    </div>
  </div>
</template>

<script setup>
import VueEditor from "./components/milkdown/milkdown";
import Header from "./components/Header.vue";
</script>

<style>
@font-face {
  font-family: "Material Icons";
  font-style: normal;
  font-weight: 400;
  src: url(./assets/flUhRq6tzZclQEJ-Vdg-IuiaDsNc.woff2) format("woff2");
}

:root {
  --milkdown-menu-height: 30px;
  --milkdown-border-radius: 10px;
  --milkdown-menu-margin-bottom: 1px;
}
body {
  background-color: #fff0;
}
.app {
  background-color: #fff;
  border-radius: var(--milkdown-border-radius);
  height: calc(100vh - 20px);
}
.app .container {
  display: flex;
  justify-content: center;
  overflow-x: hidden;
  overflow-y: scroll;
  scroll-behavior: smooth;
  width: calc(100vw - 18px);
  height: calc(100vh - 16px - var(--milkdown-menu-height) - 10px);
}

.app .container::-webkit-scrollbar {
  width: 5px;
  height: 10px;
  background-color: #b5b1b1;
  cursor: pointer;
}
.app .container::-webkit-scrollbar-track {
  -webkit-box-shadow: inset 0 0 6px #fff;
  border-radius: 10px;
  background-color: #fff;
}
.app .container::-webkit-scrollbar-thumb {
  cursor: pointer;
  border-radius: 10px;
  -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.32);
  background-color: #ececec;
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
