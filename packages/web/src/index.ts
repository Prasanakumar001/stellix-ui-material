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

// Variants — LoadingState
export { PulseLoader, SkeletonLoader, ProgressLoader, WaveLoader, TypingLoader } from './components/LoadingState';
// Variants — TaskRows
export { CapsuleTaskRows, KanbanTaskRows, TimelineTaskRows } from './components/TaskRows';
// Variants — Chat
export { BubbleChat, ThreadChat, AgentChat } from './components/Chat';
// Variants — CodeBlock
export { TerminalBlock, MultiFileBlock, DiffBlock } from './components/CodeBlock';
// Variants — InsightCards
export { DonutChart, GaugeChart } from './components/InsightCards';
// Variants — ApprovalCard
export { MultiStepApproval } from './components/ApprovalCard';
// Variants — RecommendationCard
export { ComparisonCard } from './components/RecommendationCard';

// Phase 11 — Primitives
export { Button } from './components/Button';
export { Badge } from './components/Badge';
export { Avatar } from './components/Avatar';
export { Tag } from './components/Tag';
export { Tooltip } from './components/Tooltip';
export { Toggle } from './components/Toggle';
export { Input } from './components/Input';
export { Textarea } from './components/Textarea';
export { Select } from './components/Select';
export { Checkbox } from './components/Checkbox';
export { Radio } from './components/Radio';
export { Switch } from './components/Switch';

// Phase 11 — Feedback
export { Toast } from './components/Toast';
export { Alert } from './components/Alert';
export { ProgressBar } from './components/ProgressBar';
export { Spinner } from './components/Spinner';
export { SkeletonBlock } from './components/SkeletonBlock';
export { EmptyState } from './components/EmptyState';
export { StepIndicator } from './components/StepIndicator';

// Phase 11 — Layout
export { Tabs } from './components/Tabs';
export { Breadcrumb } from './components/Breadcrumb';
export { Pagination } from './components/Pagination';
export { Dropdown } from './components/Dropdown';
export { Modal } from './components/Modal';
export { Drawer } from './components/Drawer';
export { Accordion } from './components/Accordion';

// Phase 11 — Data Display
export { DataCard } from './components/DataCard';
export { TimelineView } from './components/TimelineView';
export { FileTree } from './components/FileTree';
export { JSONViewer } from './components/JSONViewer';
export { MarkdownView } from './components/MarkdownView';
export { Changelog } from './components/Changelog';
export { ActivityFeed } from './components/ActivityFeed';

// Phase 11 — AI / Agent
export { AgentStatus } from './components/AgentStatus';
export { ToolCallCard } from './components/ToolCallCard';
export { ModelSelector } from './components/ModelSelector';
export { TokenCounter } from './components/TokenCounter';
export { ConversationList } from './components/ConversationList';
export { SystemPrompt } from './components/SystemPrompt';

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
