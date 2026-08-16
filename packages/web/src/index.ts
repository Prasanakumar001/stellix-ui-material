// Provider
export { StellixProvider, useStellixTheme, type StellixTheme, type StellixProviderProps } from './components/StellixProvider';

// Icons
export * from './components/Icons';

// Components
export { LoadingState } from './components/LoadingState';
export { Thinking } from './components/Thinking';
export { StreamingText } from './components/StreamingText';
export { ApprovalCard } from './components/ApprovalCard';
export { ToolChips } from './components/ToolChips';
export { TaskRows } from './components/TaskRows';
export { Chat } from './components/Chat';
export { PromptBar } from './components/PromptBar';
export { RecommendationCard } from './components/RecommendationCard';
export { ContextCards } from './components/ContextCards';
export { DiffTable } from './components/DiffTable';
export { RecordsTable } from './components/RecordsTable';
export { FilterTable } from './components/FilterTable';
export { SidebarNav } from './components/SidebarNav';
export { Search } from './components/Search';
export { InsightCards } from './components/InsightCards';
export { CodeBlock } from './components/CodeBlock';
export { FineTuneCard } from './components/FineTuneCard';
export { SelectionActions } from './components/SelectionActions';

// Tailwind preset
export { default as stellixPreset } from './tokens/tailwind-preset';

// Re-export core hooks & utilities for convenience
export {
  useTimer,
  useExpandable,
  useStreamingText,
  useStaggeredReveal,
  useSearch,
  useSortable,
  useTextSelection,
  useTaskProgress,
  useCodeStream,
  useDictation,
  useBreakpoint,
  cn,
  formatTime,
  formatNumber,
  truncate,
  clamp,
  percentage,
} from '@stellix/ui-core';

// Re-export types
export type {
  LoadingStateProps,
  ThinkingProps,
  StreamingTextProps,
  ApprovalCardProps,
  ToolChipsProps,
  TaskRowsProps,
  ChatProps,
  PromptBarProps,
  RecommendationCardProps,
  ContextCardsProps,
  DiffTableProps,
  RecordsTableProps,
  FilterTableProps,
  SidebarNavProps,
  SearchProps,
  InsightCardsProps,
  CodeBlockProps,
  FineTuneCardProps,
  SelectionActionsProps,
} from '@stellix/ui-core';
