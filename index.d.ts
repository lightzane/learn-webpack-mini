// below are used to satisfy typescript compiler

declare module '*.vue'; // to fix compile errors when importing *.vue files
declare module '@/*'; // to fix compile errosr when importing path resolved from alias (see webpack.config.ts - resolve.alias)