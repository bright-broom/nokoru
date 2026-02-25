/**
 * パスワードマネージャーや自動補完による意図しないスタイルの崩れや
 * 誤動作を防止するための共通属性
 */
export const PASSWORD_MANAGER_IGNORE_PROPS = {
   'data-np-ignore': 'true',
   'data-lpignore': 'true',
   suppressHydrationWarning: true,
} as const;
