/**
 * Stellix UI Material — Shared Icon Components
 * Uses @heroicons/react (Heroicons v2) — all SVG, no emojis
 */

import React from 'react';
import {
  ClipboardDocumentListIcon,
  CpuChipIcon,
  MagnifyingGlassIcon,
  CodeBracketIcon,
  CogIcon,
  DocumentTextIcon,
  MicrophoneIcon,
  XMarkIcon,
  Bars3Icon,
  PencilSquareIcon,
  LightBulbIcon,
  LanguageIcon,
  DocumentDuplicateIcon,
  SwatchIcon,
  FolderIcon,
  CheckIcon,
  XCircleIcon,
  ArrowPathIcon,
  ChevronDownIcon,
  ChevronUpIcon,
  ClipboardIcon,
  SparklesIcon,
  BookOpenIcon,
  PaintBrushIcon,
  CommandLineIcon,
  ChatBubbleLeftRightIcon,
  ArrowUturnLeftIcon,
  DocumentMagnifyingGlassIcon,
} from '@heroicons/react/24/outline';

// Re-export commonly used icons with semantic names
export {
  ChevronDownIcon,
  ChevronUpIcon,
  XMarkIcon,
  Bars3Icon,
  MagnifyingGlassIcon,
  CheckIcon,
  ClipboardIcon,
};

interface IconProps {
  className?: string;
}

// ─── Thinking Trace Icons ───

export function StepsIcon({ className = 'h-4 w-4' }: IconProps) {
  return <ClipboardDocumentListIcon className={className} />;
}

export function ReasoningIcon({ className = 'h-4 w-4' }: IconProps) {
  return <CpuChipIcon className={className} />;
}

export function SearchTraceIcon({ className = 'h-4 w-4' }: IconProps) {
  return <MagnifyingGlassIcon className={className} />;
}

export function CodingIcon({ className = 'h-4 w-4' }: IconProps) {
  return <CodeBracketIcon className={className} />;
}

export function ThinkingGearIcon({ className = 'h-4 w-4 animate-spin' }: IconProps) {
  return <CogIcon className={className} />;
}

// ─── PromptBar Icons ───

export function DictationIcon({ className = 'h-4 w-4' }: IconProps) {
  return <MicrophoneIcon className={className} />;
}

export function DocumentIcon({ className = 'h-4 w-4' }: IconProps) {
  return <DocumentTextIcon className={className} />;
}

export function FolderSourceIcon({ className = 'h-4 w-4' }: IconProps) {
  return <FolderIcon className={className} />;
}

export function CodebaseIcon({ className = 'h-4 w-4' }: IconProps) {
  return <CommandLineIcon className={className} />;
}

// ─── SelectionActions Icons ───

export function RewriteIcon({ className = 'h-4 w-4' }: IconProps) {
  return <PencilSquareIcon className={className} />;
}

export function SummarizeIcon({ className = 'h-4 w-4' }: IconProps) {
  return <DocumentDuplicateIcon className={className} />;
}

export function ExplainIcon({ className = 'h-4 w-4' }: IconProps) {
  return <LightBulbIcon className={className} />;
}

export function TranslateIcon({ className = 'h-4 w-4' }: IconProps) {
  return <LanguageIcon className={className} />;
}

// ─── ContextCards Icons ───

export function ReactIcon({ className = 'h-4 w-4' }: IconProps) {
  return <SparklesIcon className={className} />;
}

export function StyleIcon({ className = 'h-4 w-4' }: IconProps) {
  return <PaintBrushIcon className={className} />;
}

export function BookIcon({ className = 'h-4 w-4' }: IconProps) {
  return <BookOpenIcon className={className} />;
}

// ─── Status Icons ───

export function SuccessIcon({ className = 'h-3.5 w-3.5 text-green' }: IconProps) {
  return <CheckIcon className={className} />;
}

export function ErrorIcon({ className = 'h-3.5 w-3.5 text-red' }: IconProps) {
  return <XCircleIcon className={className} />;
}

export function SpinnerIcon({ className = 'h-3.5 w-3.5 animate-spin text-blue' }: IconProps) {
  return <ArrowPathIcon className={className} />;
}

// ─── Navigation Icons ───

export function RecentIcon({ className = 'h-4 w-4' }: IconProps) {
  return <ArrowUturnLeftIcon className={className} />;
}

export function SearchResultIcon({ className = 'h-4 w-4' }: IconProps) {
  return <DocumentMagnifyingGlassIcon className={className} />;
}

export function ChatIcon({ className = 'h-4 w-4' }: IconProps) {
  return <ChatBubbleLeftRightIcon className={className} />;
}
