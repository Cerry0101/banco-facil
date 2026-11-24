import React from 'react';
import { Pressable, ScrollView, StyleSheet, Text, TextProps, View, useWindowDimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { router, useLocalSearchParams } from 'expo-router';
import { useLearning } from '../hooks/useLearning';
import { palette } from '../theme';
export function useColors() {
 const { state } = useLearning();
 const { bank, id } = useLocalSearchParams<{ bank?: string; id?: string }>();
 const bb = bank === 'bb' || id?.startsWith('bb-');
 const c = bb ? { ...palette, bg: '#FFFCEB', primary: '#173D88', soft: '#FFF19A', border: '#E1D79E', accent: '#FFE033', onAccent: '#12336F', bankName: 'Banco do Brasil' } : { ...palette, bg: '#F3F8FC', primary: '#005A9C', soft: '#E5F2FC', accent: '#0066AE', onAccent: '#FFFFFF', bankName: bank === 'caixa' || id?.startsWith('caixa-') ? 'CAIXA' : '' };
 return state.preferences.contrast ? { ...c, bg: '#000000', surface: '#101010', text: '#FFFFFF', muted: '#FFFFFF', primary: '#8DC5FF', border: '#FFFFFF', soft: '#192A3D', accent: '#8DC5FF', onAccent: '#000000' } : c;
}
export function Txt({ style, ...props }: TextProps) { const { state } = useLearning(); const c = useColors(); const merged = StyleSheet.flatten([{ color: c.text, fontSize: 19, lineHeight: 29 }, style]) ?? {}; return <Text {...props} style={[merged, { fontSize: (merged.fontSize ?? 19) * state.preferences.font, lineHeight: Math.max(merged.lineHeight ?? 29, (merged.fontSize ?? 19) * 1.4) * state.preferences.font }]} />; }
export function AccessibleButton({ title, onPress, secondary = false, disabled = false, icon }: { title: string; onPress: () => void; secondary?: boolean; disabled?: boolean; icon?: React.ComponentProps<typeof Ionicons>['name'] }) {
  const c = useColors();
  return <Pressable accessibilityRole="button" accessibilityState={{ disabled }} disabled={disabled} onPress={onPress} style={({ pressed }) => [styles.button, { backgroundColor: secondary ? c.surface : c.accent, borderColor: c.primary, opacity: disabled ? 0.5 : pressed ? 0.75 : 1 }]}>{icon && <Ionicons name={icon} size={25} color={secondary ? c.primary : c.onAccent} />}<Txt style={{ color: secondary ? c.primary : c.onAccent, fontWeight: '700', textAlign: 'center', flexShrink: 1 }}>{title}</Txt></Pressable>;
}
export function Card({ children }: { children: React.ReactNode }) { const c = useColors(); const { width } = useWindowDimensions(); return <View style={[styles.card, { padding: width < 400 ? 14 : 20 }, { backgroundColor: c.surface, borderColor: c.border }]}>{children}</View>; }
export function Page({ title, subtitle, children, back = true }: { title: string; subtitle?: string; children: React.ReactNode; back?: boolean }) {
  const c = useColors(); return <ScrollView style={{ flex: 1, backgroundColor: c.bg }} contentContainerStyle={styles.page} keyboardShouldPersistTaps="handled"><View style={[styles.top, { backgroundColor: c.bankName ? c.accent : c.soft, padding: 20, borderRadius: 20 }]}><Txt style={{ fontWeight: '800', fontSize: 25, color: c.bankName ? c.onAccent : c.primary }}>{c.bankName || 'Banco Fácil'}</Txt><Txt style={{ fontSize: 15, color: c.bankName ? c.onAccent : c.muted }}>Aprenda no seu ritmo</Txt></View>{back && <AccessibleButton title="Voltar" icon="arrow-back" secondary onPress={() => router.canGoBack() ? router.back() : router.replace('/')} />}<Txt accessibilityRole="header" style={styles.heading}>{title}</Txt>{subtitle && <Txt style={{ color: c.muted }}>{subtitle}</Txt>}{children}<Txt style={{ fontSize: 15, color: c.muted, marginTop: 16 }}>Treino educativo. Não é o aplicativo do banco.</Txt></ScrollView>;
}
export function ProgressIndicator({ current, total }: { current: number; total: number }) { const c = useColors(); return <View accessible accessibilityRole="progressbar" accessibilityValue={{ min: 0, max: total, now: current }} style={{ gap: 10 }}><Txt>Etapa {current} de {total}</Txt><View style={{ height: 10, backgroundColor: c.border, borderRadius: 8 }}><View style={{ height: 10, width: `${current / total * 100}%`, backgroundColor: c.primary, borderRadius: 8 }} /></View></View>; }
export const styles = StyleSheet.create({ page: { padding: 16, paddingBottom: 32, gap: 16, width: '100%', maxWidth: 480, alignSelf: 'center' }, top: { gap: 4, paddingVertical: 12 }, heading: { fontSize: 28, lineHeight: 37, fontWeight: '800', marginTop: 8 }, button: { minHeight: 58, padding: 15, borderRadius: 16, borderWidth: 1.5, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 12 }, card: { padding: 22, borderRadius: 22, borderWidth: 1, gap: 15 }, row: { flexDirection: 'row', flexWrap: 'wrap', gap: 12, alignItems: 'center' } });



