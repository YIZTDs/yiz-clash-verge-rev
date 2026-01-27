!macro NSIS_HOOK_POSTINSTALL
  ; Mark YIZ edition install and store metadata for external detection.
  WriteRegStr SHCTX "Software\\YIZTDs\\ClashVergeYiz" "Edition" "YIZ"
  WriteRegStr SHCTX "Software\\YIZTDs\\ClashVergeYiz" "InstallPath" "$INSTDIR"
  WriteRegStr SHCTX "Software\\YIZTDs\\ClashVergeYiz" "Version" "${VERSION}"
!macroend

!macro NSIS_HOOK_POSTUNINSTALL
  DeleteRegKey SHCTX "Software\\YIZTDs\\ClashVergeYiz"
!macroend
