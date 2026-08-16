import React, { useState } from 'react';
import { View, Text, TouchableOpacity, TextInput, Modal, useWindowDimensions } from 'react-native';
import { type SidebarNavProps, type NavItem } from '@stellix/ui-core';
import { nativeColors } from '../tokens/theme';
import { getBreakpoint } from '../utils/responsive';

function NavItemRow({ item, collapsed }: { item: NavItem; collapsed: boolean }) {
  const [open, setOpen] = useState(true);

  return (
    <View>
      <TouchableOpacity
        onPress={item.children?.length ? () => setOpen(!open) : undefined}
        className="flex-row items-center gap-3 rounded-lg px-3 py-2"
        style={{ backgroundColor: item.active ? nativeColors.accent + '1A' : 'transparent' }}
      >
        {item.icon && <Text className="text-base">{item.icon}</Text>}
        {!collapsed && (
          <>
            <Text className="flex-1 text-sm" style={{ color: item.active ? nativeColors.accent : nativeColors.ink2, fontWeight: item.active ? '500' : '400' }}>
              {item.label}
            </Text>
            {item.children?.length ? <Text style={{ color: nativeColors.ink3 }}>{open ? '▲' : '▼'}</Text> : null}
          </>
        )}
      </TouchableOpacity>
      {open && item.children && !collapsed && (
        <View className="ml-6 gap-0.5" style={{ borderLeftWidth: 1, borderLeftColor: nativeColors.line, paddingLeft: 12 }}>
          {item.children.map((child) => (
            <TouchableOpacity key={child.id} className="rounded-md px-2 py-1.5">
              <Text className="text-sm" style={{ color: child.active ? nativeColors.accent : nativeColors.ink3 }}>{child.label}</Text>
            </TouchableOpacity>
          ))}
        </View>
      )}
    </View>
  );
}

export function SidebarNav({ items, onSearch, collapsed = false }: SidebarNavProps) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const { width } = useWindowDimensions();
  const bp = getBreakpoint(width);

  const navContent = (
    <View className="flex-1">
      {!collapsed && onSearch && (
        <View className="p-3">
          <TextInput
            value={searchQuery}
            onChangeText={(v) => { setSearchQuery(v); onSearch(v); }}
            placeholder="Quick search..."
            placeholderTextColor={nativeColors.ink3}
            className="rounded-lg px-3 py-2 text-sm"
            style={{ borderWidth: 1, borderColor: nativeColors.line, backgroundColor: nativeColors.surfaceField, color: nativeColors.ink }}
          />
        </View>
      )}
      <View className="gap-1 p-2">
        {items.map((item) => <NavItemRow key={item.id} item={item} collapsed={collapsed} />)}
      </View>
    </View>
  );

  // Mobile: Drawer
  if (bp === 'mobile') {
    return (
      <>
        <TouchableOpacity onPress={() => setMobileOpen(true)} className="rounded-lg p-2" style={{ borderWidth: 1, borderColor: nativeColors.line, backgroundColor: nativeColors.surface }}>
          <Text style={{ color: nativeColors.ink }}>☰</Text>
        </TouchableOpacity>
        <Modal visible={mobileOpen} transparent animationType="slide">
          <View className="flex-1 flex-row">
            <View className="w-64 flex-1" style={{ backgroundColor: nativeColors.surface, borderRightWidth: 1, borderRightColor: nativeColors.line }}>
              <View className="flex-row justify-end p-2">
                <TouchableOpacity onPress={() => setMobileOpen(false)} className="p-2">
                  <Text style={{ color: nativeColors.ink3 }}>✕</Text>
                </TouchableOpacity>
              </View>
              {navContent}
            </View>
            <TouchableOpacity className="flex-1" onPress={() => setMobileOpen(false)} style={{ backgroundColor: 'rgba(0,0,0,0.3)' }} />
          </View>
        </Modal>
      </>
    );
  }

  return (
    <View style={{ width: collapsed ? 56 : 240, borderRightWidth: 1, borderRightColor: nativeColors.line, backgroundColor: nativeColors.surface }}>
      {navContent}
    </View>
  );
}
