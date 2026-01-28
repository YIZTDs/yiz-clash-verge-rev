import { GitHub, HelpOutlineRounded, Telegram } from "@mui/icons-material";
import { Box, ButtonGroup, IconButton, Grid } from "@mui/material";
import { useLockFn } from "ahooks";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";

import { BasePage } from "@/components/base";
import SettingClash from "@/components/setting/setting-clash";
import SettingSystem from "@/components/setting/setting-system";
import SettingVergeAdvanced from "@/components/setting/setting-verge-advanced";
import SettingVergeBasic from "@/components/setting/setting-verge-basic";
import { openWebUrl } from "@/services/cmds";
import { showNotice } from "@/services/notice-service";
import { useAdminUI, useSetAdminUI, useThemeMode } from "@/services/states";

const isYizEdition =
  import.meta.env.VITE_YIZ_EDITION === "1" ||
  import.meta.env.VITE_YIZ_EDITION === "true";

const SettingPage = () => {
  const { t } = useTranslation();

  const onError = (err: any) => {
    showNotice.error(err);
  };

  const toGithubRepo = useLockFn(() => {
    return openWebUrl("https://github.com/clash-verge-rev/clash-verge-rev");
  });

  const toGithubDoc = useLockFn(() => {
    return openWebUrl("https://clash-verge-rev.github.io/index.html");
  });

  const toTelegramChannel = useLockFn(() => {
    return openWebUrl("https://t.me/clash_verge_re");
  });

  const mode = useThemeMode();
  const isDark = mode === "light" ? false : true;
  const setAdminUI = useSetAdminUI();
  const isYizAdminUI = useAdminUI();

  useEffect(() => {
    if (!isYizEdition) return;
    const onKeyDown = (event: KeyboardEvent) => {
      const target = event.target as HTMLElement | null;
      const isEditable =
        target?.tagName === "INPUT" ||
        target?.tagName === "TEXTAREA" ||
        target?.isContentEditable;
      if (isEditable) return;

      if (event.ctrlKey && event.shiftKey && event.code === "KeyY") {
        event.preventDefault();
        setAdminUI((prev) => {
          const next = !prev;
          showNotice.success(
            next ? "Admin 模式已开启" : "Admin 模式已关闭",
            2000,
          );
          return next;
        });
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => {
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [setAdminUI]);

  return (
    <BasePage
      title={t("settings.page.title")}
      header={
        <ButtonGroup variant="contained" aria-label="Basic button group">
          <IconButton
            size="medium"
            color="inherit"
            title={t("settings.page.actions.manual")}
            onClick={toGithubDoc}
          >
            <HelpOutlineRounded fontSize="inherit" />
          </IconButton>
          <IconButton
            size="medium"
            color="inherit"
            title={t("settings.page.actions.telegram")}
            onClick={toTelegramChannel}
          >
            <Telegram fontSize="inherit" />
          </IconButton>

          <IconButton
            size="medium"
            color="inherit"
            title={t("settings.page.actions.github")}
            onClick={toGithubRepo}
          >
            <GitHub fontSize="inherit" />
          </IconButton>
        </ButtonGroup>
      }
    >
      <Grid container spacing={1.5} columns={{ xs: 6, sm: 6, md: 12 }}>
        <Grid size={6}>
          <Box
            sx={{
              borderRadius: 2,
              marginBottom: 1.5,
              backgroundColor: isDark ? "#282a36" : "#ffffff",
            }}
          >
            <SettingSystem onError={onError} />
          </Box>
          {(!isYizEdition || isYizAdminUI) && (
            <Box
              sx={{
                borderRadius: 2,
                backgroundColor: isDark ? "#282a36" : "#ffffff",
              }}
            >
              <SettingClash onError={onError} />
            </Box>
          )}
        </Grid>
        <Grid size={6}>
          <Box
            sx={{
              borderRadius: 2,
              marginBottom: 1.5,
              backgroundColor: isDark ? "#282a36" : "#ffffff",
            }}
          >
            <SettingVergeBasic onError={onError} />
          </Box>
          {(!isYizEdition || isYizAdminUI) && (
            <Box
              sx={{
                borderRadius: 2,
                backgroundColor: isDark ? "#282a36" : "#ffffff",
              }}
            >
              <SettingVergeAdvanced onError={onError} />
            </Box>
          )}
        </Grid>
      </Grid>
    </BasePage>
  );
};

export default SettingPage;
