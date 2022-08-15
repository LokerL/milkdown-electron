import { defineComponent, h } from "vue";
import {
  Editor,
  rootCtx,
  defaultValueCtx,
  ThemeIcon,
  themeManagerCtx,
} from "@milkdown/core";
import { nord } from "@milkdown/theme-nord";
import { VueEditor, useEditor } from "@milkdown/vue";
import { gfm } from "@milkdown/preset-gfm";
import { emoji } from "@milkdown/plugin-emoji";
// import { menu } from "@milkdown/plugin-menu";
import { tooltipPlugin, tooltip } from "@milkdown/plugin-tooltip";
import { listener, listenerCtx } from "@milkdown/plugin-listener";
import {
  slash,
  createDropdownItem,
  defaultActions,
  slashPlugin,
} from "@milkdown/plugin-slash";
import { getIcon } from "./icon";

export default defineComponent(() => {
  const editor = useEditor((root) =>
    Editor.make()
      .config((ctx) => {
        ctx.set(rootCtx, root);
        ctx.set(defaultValueCtx, "# Milkdown 💖 Vue");
      })
      .use(
        nord.override((emotion, manager) => {
          manager.set(ThemeIcon, (icon) => {
            if (!icon) return;
            return getIcon(icon);
          });
        })
      )
      .use(emoji)
      // .use(menu)
      .use(gfm)
      .use(
        tooltip.configure(tooltipPlugin, {
          top: true,
        })
      )
      .use(
        slash.configure(slashPlugin, {
          config: (ctx) => {
            return ({ content, isTopLevel }) => {
              if (!isTopLevel) return null;
              if (!content) {
                return { placeholder: "键入文字或'/'选择" };
              }

              const mapActions = (action) => {
                const { id = "" } = action;
                switch (id) {
                  case "h1":
                    action.dom = createDropdownItem(
                      ctx.get(themeManagerCtx),
                      "标题1",
                      "h1"
                    );
                    return action;
                  case "h2":
                    action.dom = createDropdownItem(
                      ctx.get(themeManagerCtx),
                      "标题2",
                      "h2"
                    );
                    return action;
                  case "h3":
                    action.dom = createDropdownItem(
                      ctx.get(themeManagerCtx),
                      "标题3",
                      "h3"
                    );
                    return action;
                  case "bulletList":
                    action.dom = createDropdownItem(
                      ctx.get(themeManagerCtx),
                      "无序列表",
                      "bulletList"
                    );
                    return action;
                  case "orderedList":
                    action.dom = createDropdownItem(
                      ctx.get(themeManagerCtx),
                      "有序列表",
                      "orderedList"
                    );
                    return action;
                  case "taskList":
                    action.dom = createDropdownItem(
                      ctx.get(themeManagerCtx),
                      "任务列表",
                      "taskList"
                    );
                    return action;
                  case "image":
                    action.dom = createDropdownItem(
                      ctx.get(themeManagerCtx),
                      "图片",
                      "image"
                    );
                    return action;
                  case "blockquote":
                    action.dom = createDropdownItem(
                      ctx.get(themeManagerCtx),
                      "引用",
                      "quote"
                    );
                    return action;
                  case "table":
                    action.dom = createDropdownItem(
                      ctx.get(themeManagerCtx),
                      "表格",
                      "table"
                    );
                    return action;

                  case "code":
                    action.dom = createDropdownItem(
                      ctx.get(themeManagerCtx),
                      "代码块",
                      "code"
                    );
                    return action;

                  case "divider":
                    action.dom = createDropdownItem(
                      ctx.get(themeManagerCtx),
                      "分割线",
                      "divider"
                    );
                    return action;

                  default:
                    return action;
                }
              };

              if (content.startsWith("/")) {
                return content === "/"
                  ? {
                      placeholder: " ",
                      actions: defaultActions(ctx).map(mapActions),
                    }
                  : {
                      actions: defaultActions(ctx, content).map(mapActions),
                    };
              }
              return null;
            };
          },
        })
      )
  );
  return () => <VueEditor editor={editor} />;
});
