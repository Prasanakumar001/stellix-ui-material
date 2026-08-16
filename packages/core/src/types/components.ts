// ─── Loading State ───
export type LoadingVariant = 'drive' | 'dots' | 'orbit';

export interface LoadingStateProps {
  variant?: LoadingVariant;
  label?: string;
  showTimer?: boolean;
}

// ─── Thinking ───
export type ThinkingTraceType = 'steps' | 'reasoning' | 'search' | 'coding';

export interface ThinkingStep {
  id: string;
  type: ThinkingTraceType;
  content: string;
  timestamp?: number;
  status?: 'active' | 'completed';
}

export interface ThinkingProps {
  steps: ThinkingStep[];
  defaultOpen?: boolean;
}

// ─── Streaming Text ───
export interface Citation {
  id: string;
  label: string;
  url?: string;
}

export interface StreamingTextProps {
  text: string;
  citations?: Citation[];
  followUps?: string[];
  speed?: number;
  onComplete?: () => void;
}

// ─── Approval Card ───
export interface ApprovalOption {
  id: string;
  label: string;
  description?: string;
}

export interface ApprovalCardProps {
  title: string;
  description?: string;
  options: ApprovalOption[];
  type?: 'radio' | 'checkbox';
  allowCustom?: boolean;
  onApprove?: (selected: string[]) => void;
  onReject?: () => void;
}

// ─── Tool Chips ───
export interface ToolCall {
  id: string;
  name: string;
  status: 'running' | 'success' | 'error';
  file?: string;
  additions?: number;
  deletions?: number;
  summary?: string;
}

export interface ToolChipsProps {
  tools: ToolCall[];
}

// ─── Task Rows ───
export type TaskStatus = 'running' | 'completed' | 'failed' | 'queued';

export interface TaskItem {
  id: string;
  title: string;
  status: TaskStatus;
  description?: string;
  progress?: number;
  duration?: number;
}

export interface TaskRowsProps {
  tasks: TaskItem[];
  expandable?: boolean;
}

// ─── Chat ───
export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  reasoning?: string;
  timestamp: number;
}

export interface ChatProps {
  messages: ChatMessage[];
  onSend?: (message: string) => void;
  tabs?: string[];
  activeTab?: string;
}

// ─── Prompt Bar ───
export interface SourceItem {
  id: string;
  name: string;
  icon?: string;
  type: 'file' | 'url' | 'doc';
}

export interface CommandItem {
  id: string;
  name: string;
  description?: string;
  shortcut?: string;
}

export interface ModelOption {
  id: string;
  name: string;
  provider?: string;
}

export interface PromptBarProps {
  placeholder?: string;
  sources?: SourceItem[];
  commands?: CommandItem[];
  models?: ModelOption[];
  onSubmit?: (value: string, attachments?: File[]) => void;
  enableDictation?: boolean;
}

// ─── Recommendation Card ───
export interface Alternative {
  id: string;
  label: string;
  confidence: number;
}

export interface RecommendationCardProps {
  title: string;
  description: string;
  confidence: number;
  alternatives?: Alternative[];
  onAccept?: () => void;
  onReject?: () => void;
  onModify?: () => void;
}

// ─── Context Cards ───
export interface ContextChunk {
  id: string;
  title: string;
  source: string;
  content: string;
  relevance?: number;
  icon?: string;
}

export interface ContextCardsProps {
  chunks: ContextChunk[];
}

// ─── Diff Table ───
export interface DiffLine {
  type: 'add' | 'remove' | 'unchanged';
  content: string;
  oldLineNumber?: number;
  newLineNumber?: number;
}

export interface DiffHunk {
  id: string;
  lines: DiffLine[];
}

export interface DiffTableProps {
  hunks: DiffHunk[];
  mode?: 'split' | 'unified';
  language?: string;
  onAccept?: (hunkId: string) => void;
  onReject?: (hunkId: string) => void;
}

// ─── Records Table ───
export interface TableColumn {
  key: string;
  label: string;
  sortable?: boolean;
  width?: string;
}

export interface TableTag {
  label: string;
  color?: string;
}

export interface RecordsTableProps {
  columns: TableColumn[];
  data: Record<string, unknown>[];
  selectable?: boolean;
  onSort?: (key: string, direction: 'asc' | 'desc') => void;
  onSelect?: (ids: string[]) => void;
}

// ─── Filter Table ───
export interface FilterChip {
  id: string;
  label: string;
  count?: number;
  active?: boolean;
}

export interface FilterTableProps {
  filters: FilterChip[];
  data: Record<string, unknown>[];
  columns: TableColumn[];
  onFilterChange?: (activeFilters: string[]) => void;
}

// ─── Sidebar Nav ───
export interface NavItem {
  id: string;
  label: string;
  icon?: string;
  href?: string;
  active?: boolean;
  children?: NavItem[];
}

export interface SidebarNavProps {
  items: NavItem[];
  onSearch?: (query: string) => void;
  collapsed?: boolean;
}

// ─── Search ───
export interface SearchResult {
  id: string;
  title: string;
  description?: string;
  category?: string;
  icon?: string;
  action?: () => void;
}

export interface SearchProps {
  results?: SearchResult[];
  placeholder?: string;
  onSearch?: (query: string) => void;
  onSelect?: (result: SearchResult) => void;
  recentSearches?: string[];
}

// ─── Insight Cards ───
export interface ChartDataPoint {
  label: string;
  value: number;
}

export interface InsightItem {
  id: string;
  title: string;
  description?: string;
  data: ChartDataPoint[];
  chartType?: 'line' | 'bar' | 'area';
}

export interface InsightCardsProps {
  insights: InsightItem[];
}

// ─── Code Block ───
export interface CodeBlockProps {
  code: string;
  language?: string;
  streaming?: boolean;
  showLineNumbers?: boolean;
  onCopy?: () => void;
}

// ─── Fine-tune Card ───
export interface PropertyControl {
  id: string;
  label: string;
  type: 'slider' | 'color' | 'toggle' | 'select';
  value: number | string | boolean;
  min?: number;
  max?: number;
  step?: number;
  options?: string[];
}

export interface FineTuneCardProps {
  title: string;
  properties: PropertyControl[];
  onChange?: (id: string, value: number | string | boolean) => void;
}

// ─── Selection Actions ───
export type SelectionAction = 'rewrite' | 'summarize' | 'explain' | 'translate';

export interface SelectionActionsProps {
  actions?: SelectionAction[];
  onAction?: (action: SelectionAction, selectedText: string) => void;
}
