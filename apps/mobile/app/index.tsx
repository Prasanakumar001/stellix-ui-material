import React from 'react';
import { ScrollView, View, Text } from 'react-native';
import {
  LoadingState,
  Thinking,
  StreamingText,
  ApprovalCard,
  ToolChips,
  TaskRows,
  CodeBlock,
} from '@stellix/ui-native';

const sampleThinkingSteps = [
  { id: '1', type: 'reasoning' as const, content: 'Analyzing the user request...', status: 'completed' as const },
  { id: '2', type: 'search' as const, content: 'Searching knowledge base...', status: 'active' as const },
];

const sampleTools = [
  { id: '1', name: 'readFile', status: 'success' as const, file: 'index.ts', additions: 12, deletions: 3, summary: 'Read entry file' },
  { id: '2', name: 'writeCode', status: 'running' as const, file: 'utils.ts' },
];

const sampleTasks = [
  { id: '1', title: 'Initialize project', status: 'completed' as const },
  { id: '2', title: 'Generate components', status: 'running' as const, progress: 65 },
  { id: '3', title: 'Run tests', status: 'queued' as const },
];

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <View style={{ marginBottom: 32 }}>
      <Text style={{ fontSize: 18, fontWeight: '600', color: '#1a1a1a', marginBottom: 12 }}>{title}</Text>
      {children}
    </View>
  );
}

export default function Home() {
  return (
    <ScrollView
      style={{ flex: 1, backgroundColor: '#fafafa' }}
      contentContainerStyle={{ padding: 16 }}
    >
      <Text style={{ fontSize: 14, color: '#6b6b6b', marginBottom: 24 }}>
        19 components · Cross-platform · Fully responsive
      </Text>

      <Section title="Loading State">
        <View style={{ gap: 12 }}>
          <LoadingState variant="drive" label="Drive" />
          <LoadingState variant="dots" label="Dots" />
          <LoadingState variant="orbit" label="Orbit" />
        </View>
      </Section>

      <Section title="Thinking">
        <Thinking steps={sampleThinkingSteps} defaultOpen />
      </Section>

      <Section title="Streaming Text">
        <StreamingText
          text="This is a streaming text demo. Words appear one by one, simulating real-time AI generation."
          citations={[{ id: '1', label: 'React Docs' }]}
          followUps={['Tell me more', 'Show example']}
        />
      </Section>

      <Section title="Approval Card">
        <ApprovalCard
          title="Deploy to Production?"
          description="The agent wants to deploy changes."
          options={[
            { id: '1', label: 'Deploy now' },
            { id: '2', label: 'Schedule later' },
          ]}
        />
      </Section>

      <Section title="Tool Chips">
        <ToolChips tools={sampleTools} />
      </Section>

      <Section title="Task Rows">
        <TaskRows tasks={sampleTasks} />
      </Section>

      <Section title="Code Block">
        <CodeBlock
          code={`import { LoadingState } from '@stellix/ui-native';

export default function App() {
  return <LoadingState variant="orbit" />;
}`}
          language="tsx"
          streaming
        />
      </Section>
    </ScrollView>
  );
}
