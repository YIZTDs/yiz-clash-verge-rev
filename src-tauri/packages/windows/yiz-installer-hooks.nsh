!macro NSIS_HOOK_POSTINSTALL
  ; Align with installer MANUPRODUCTKEY (stores InstallPath in default value).
  WriteRegStr SHCTX "${MANUPRODUCTKEY}" "Edition" "YIZ"
  WriteRegStr SHCTX "${MANUPRODUCTKEY}" "Version" "${VERSION}"
!macroend

!macro NSIS_HOOK_POSTUNINSTALL
  DeleteRegValue SHCTX "${MANUPRODUCTKEY}" "Edition"
  DeleteRegValue SHCTX "${MANUPRODUCTKEY}" "Version"
!macroend
