import React, { useState, useEffect } from 'react';

// =============================================================================
// PALETTE DE COULEURS (harmonisée)
// =============================================================================
const colors = {
  primary: '#0066CC',
  primaryLight: '#E6F0FA',
  primaryDark: '#1E3A5F',
  accent: '#F5A623',
  accentLight: '#FEF5E6',
  background: '#F8FAFC',
  surface: '#FFFFFF',
  textPrimary: '#1E293B',
  textSecondary: '#64748B',
  border: '#E2E8F0',
  success: '#10B981',
  successLight: '#DCFCE7',
  warning: '#F59E0B',
  warningLight: '#FEF3C7',
  error: '#EF4444',
  errorLight: '#FEE2E2',
  purple: '#8B5CF6',
  purpleLight: '#EDE9FE',
};

// =============================================================================
// ICÔNES SVG
// =============================================================================
const Icons = {
  Home: () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9,22 9,12 15,12 15,22"/></svg>,
  Info: () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></svg>,
  Users: () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>,
  Folder: () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"/></svg>,
  FileSignature: () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><path d="M14 2v6h6"/><path d="M12 18v-6"/><path d="M9 15h6"/></svg>,
  ClipboardList: () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"/><rect x="8" y="2" width="8" height="4" rx="1" ry="1"/></svg>,
  List: () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="8" y1="6" x2="21" y2="6"/><line x1="8" y1="12" x2="21" y2="12"/><line x1="8" y1="18" x2="21" y2="18"/><line x1="3" y1="6" x2="3.01" y2="6"/><line x1="3" y1="12" x2="3.01" y2="12"/><line x1="3" y1="18" x2="3.01" y2="18"/></svg>,
  Layers: () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polygon points="12,2 2,7 12,12 22,7 12,2"/><polyline points="2,17 12,22 22,17"/><polyline points="2,12 12,17 22,12"/></svg>,
  Shield: () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>,
  Code: () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="16,18 22,12 16,6"/><polyline points="8,6 2,12 8,18"/></svg>,
  Play: () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polygon points="5,3 19,12 5,21 5,3"/></svg>,
  FileCheck: () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14,2 14,8 20,8"/><path d="M9 15l2 2 4-4"/></svg>,
  Award: () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="8" r="7"/><polyline points="8.21,13.89 7,23 12,20 17,23 15.79,13.88"/></svg>,
  ChevronDown: () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="6,9 12,15 18,9"/></svg>,
  ChevronUp: () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="18,15 12,9 6,15"/></svg>,
  ChevronRight: () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="9,18 15,12 9,6"/></svg>,
  Bell: () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/></svg>,
  HelpCircle: () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>,
  CheckCircle: () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22,4 12,14.01 9,11.01"/></svg>,
  Clock: () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><polyline points="12,6 12,12 16,14"/></svg>,
  AlertTriangle: () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>,
  AlertCircle: () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>,
  TrendingUp: () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="23,6 13.5,15.5 8.5,10.5 1,18"/><polyline points="17,6 23,6 23,12"/></svg>,
  Target: () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/></svg>,
  Activity: () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="22,12 18,12 15,21 9,3 6,12 2,12"/></svg>,
  Calendar: () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>,
  FileText: () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14,2 14,8 20,8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10,9 9,9 8,9"/></svg>,
  Download: () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7,10 12,15 17,10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>,
  Eye: () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>,
  Settings: () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>,
  CheckCheck: () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="2,12 7,17 12,7"/><polyline points="12,12 17,17 22,7"/></svg>,
  Search: () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>,
  Filter: () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polygon points="22,3 2,3 10,12.46 10,19 14,21 14,12.46 22,3"/></svg>,
  Plus: () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>,
  X: () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>,
  Sparkles: () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 3l1.5 4.5L18 9l-4.5 1.5L12 15l-1.5-4.5L6 9l4.5-1.5L12 3z"/><path d="M5 19l.5 1.5L7 21l-1.5.5L5 23l-.5-1.5L3 21l1.5-.5L5 19z"/><path d="M19 13l.5 1.5 1.5.5-1.5.5-.5 1.5-.5-1.5-1.5-.5 1.5-.5.5-1.5z"/></svg>,
  Zap: () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polygon points="13,2 3,14 12,14 11,22 21,10 12,10 13,2"/></svg>,
  Upload: () => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17,8 12,3 7,8"/><line x1="12" y1="3" x2="12" y2="15"/></svg>,
  Building: () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 21h18"/><path d="M5 21V7l8-4v18"/><path d="M19 21V11l-6-4"/><path d="M9 9h.01"/><path d="M9 12h.01"/><path d="M9 15h.01"/><path d="M9 18h.01"/></svg>,
  Check: () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="20,6 9,17 4,12"/></svg>,
  Link: () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg>,
  ExternalLink: () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15,3 21,3 21,9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>,
  Trash: () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="3,6 5,6 21,6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg>,
  Edit: () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>,
  RefreshCw: () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="23,4 23,10 17,10"/><polyline points="1,20 1,14 7,14"/><path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15"/></svg>,
  User: () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>,
  Loader: () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="12" y1="2" x2="12" y2="6"/><line x1="12" y1="18" x2="12" y2="22"/><line x1="4.93" y1="4.93" x2="7.76" y2="7.76"/><line x1="16.24" y1="16.24" x2="19.07" y2="19.07"/><line x1="2" y1="12" x2="6" y2="12"/><line x1="18" y1="12" x2="22" y2="12"/><line x1="4.93" y1="19.07" x2="7.76" y2="16.24"/><line x1="16.24" y1="7.76" x2="19.07" y2="4.93"/></svg>,
  ArrowLeft: () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="19" y1="12" x2="5" y2="12"/><polyline points="12,19 5,12 12,5"/></svg>,
  ArrowRight: () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12,5 19,12 12,19"/></svg>,
  Send: () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22,2 15,22 11,13 2,9"/></svg>,
  MessageCircle: () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/></svg>,
  Lightbulb: () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 18h6"/><path d="M10 22h4"/><path d="M15.09 14c.18-.98.65-1.74 1.41-2.5A4.65 4.65 0 0 0 18 8 6 6 0 0 0 6 8c0 1 .23 2.23 1.5 3.5A4.61 4.61 0 0 1 8.91 14"/></svg>,
  History: () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 3v5h5"/><path d="M3.05 13A9 9 0 1 0 6 5.3L3 8"/><path d="M12 7v5l4 2"/></svg>,
  Server: () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="2" width="20" height="8" rx="2" ry="2"/><rect x="2" y="14" width="20" height="8" rx="2" ry="2"/><line x1="6" y1="6" x2="6.01" y2="6"/><line x1="6" y1="18" x2="6.01" y2="18"/></svg>,
  GitBranch: () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="6" y1="3" x2="6" y2="15"/><circle cx="18" cy="6" r="3"/><circle cx="6" cy="18" r="3"/><path d="M18 9a9 9 0 0 1-9 9"/></svg>,
  Copy: () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>,
  Edit3: () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"/></svg>,
  MoreHorizontal: () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="1"/><circle cx="19" cy="12" r="1"/><circle cx="5" cy="12" r="1"/></svg>,
  Mail: () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>,
  MessageSquare: () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>,
};

// =============================================================================
// LOGO
// =============================================================================
const AppLogo = () => (
  <div style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '0 4px' }}>
    <div style={{
      width: '36px',
      height: '36px',
      background: `linear-gradient(135deg, ${colors.primary} 0%, ${colors.primaryDark} 100%)`,
      borderRadius: '10px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      boxShadow: '0 2px 8px rgba(0, 102, 204, 0.3)',
      color: 'white',
    }}>
      <Icons.Shield />
    </div>
    <div>
      <span style={{ fontWeight: 700, fontSize: '17px', color: colors.primaryDark, letterSpacing: '-0.3px', display: 'block', lineHeight: 1.2 }}>
        GxP<span style={{ color: colors.primary }}>Doc</span>
      </span>
      <span style={{ fontSize: '10px', color: colors.textSecondary, letterSpacing: '0.5px' }}>Qualification Platform</span>
    </div>
  </div>
);

// =============================================================================
// HEADER (avec sélecteur de rôle)
// =============================================================================
const Header = ({ projectName, userRole, onRoleChange, onBackToHome, wireframe, onToggleWireframe }) => (
  <header style={{ 
    height: '56px', 
    backgroundColor: 'white', 
    borderBottom: `1px solid ${colors.border}`, 
    display: 'flex', 
    alignItems: 'center', 
    justifyContent: 'space-between', 
    padding: '0 20px', 
    position: 'sticky', 
    top: 0, 
    zIndex: 100 
  }}>
    <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
      {/* Bouton retour accueil */}
      {onBackToHome && (
        <button onClick={onBackToHome} style={{ display: 'flex', alignItems: 'center', gap: '6px', padding: '8px 12px', borderRadius: '8px', border: `1px solid ${colors.border}`, backgroundColor: 'white', cursor: 'pointer', fontSize: '13px', color: colors.textSecondary, fontWeight: 500 }}>
          <Icons.ArrowLeft /> Accueil
        </button>
      )}
      <AppLogo />
      <div style={{ height: '28px', width: '1px', backgroundColor: colors.border }} />
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        <span style={{ fontSize: '14px', color: colors.textSecondary }}>Projet</span>
        <span style={{ fontSize: '14px', fontWeight: 600, color: colors.textPrimary }}>{projectName}</span>
      </div>
    </div>
    <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
      {/* Sélecteur de rôle (démo) */}
      <div style={{ 
        display: 'flex', 
        alignItems: 'center', 
        gap: '8px',
        padding: '6px 12px',
        backgroundColor: colors.background,
        borderRadius: '8px',
        border: `1px solid ${colors.border}`,
      }}>
        <span style={{ fontSize: '12px', color: colors.textSecondary }}>Rôle :</span>
        <select 
          value={userRole}
          onChange={(e) => onRoleChange(e.target.value)}
          style={{
            padding: '4px 8px',
            borderRadius: '4px',
            border: 'none',
            fontSize: '13px',
            fontWeight: 600,
            backgroundColor: userRole === 'qualite' ? colors.purpleLight : userRole === 'admin' ? colors.primaryLight : colors.accentLight,
            color: userRole === 'qualite' ? colors.purple : userRole === 'admin' ? colors.primary : colors.primaryDark,
            cursor: 'pointer',
            outline: 'none',
          }}
        >
          <option value="metier">👤 Métier</option>
          <option value="qualite">🔬 Qualité</option>
          <option value="admin">⚙️ Admin</option>
        </select>
      </div>
      
      <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
        <button style={{ 
          width: '40px', height: '40px', borderRadius: '8px', border: 'none', 
          backgroundColor: 'transparent', cursor: 'pointer', display: 'flex', 
          alignItems: 'center', justifyContent: 'center', color: colors.textSecondary, position: 'relative' 
        }}>
          <Icons.Bell />
          <span style={{ position: 'absolute', top: '8px', right: '8px', width: '8px', height: '8px', backgroundColor: colors.error, borderRadius: '50%', border: '2px solid white' }} />
        </button>
        <button style={{ width: '40px', height: '40px', borderRadius: '8px', border: 'none', backgroundColor: 'transparent', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', color: colors.textSecondary }}>
          <Icons.HelpCircle />
        </button>
        {/* Toggle wireframe */}
        <button
          onClick={onToggleWireframe}
          title={wireframe ? 'Mode couleur' : 'Mode wireframe'}
          style={{
            display: 'flex', alignItems: 'center', gap: '6px',
            padding: '6px 10px', borderRadius: '6px', cursor: 'pointer',
            border: `1px solid ${wireframe ? colors.textPrimary : colors.border}`,
            backgroundColor: wireframe ? colors.textPrimary : 'transparent',
            color: wireframe ? 'white' : colors.textSecondary,
            fontSize: '11px', fontWeight: 500,
          }}
        >
          <Icons.Eye /> {wireframe ? 'WF' : 'WF'}
        </button>
        <div style={{ width: '36px', height: '36px', borderRadius: '50%', backgroundColor: colors.accentLight, display: 'flex', alignItems: 'center', justifyContent: 'center', marginLeft: '8px', cursor: 'pointer', border: '2px solid white', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
          <span style={{ fontSize: '13px', fontWeight: 600, color: colors.primaryDark }}>JD</span>
        </div>
      </div>
    </div>
  </header>
);

// =============================================================================
// SIDEBAR NAVIGATION
// =============================================================================
const SidebarNavigation = ({ activeSection, onSectionChange, onBackToHome }) => {
  const [expandedSections, setExpandedSections] = useState(['project', 'strategy', 'features-risks', 'exports']);

  const menuStructure = [
    { id: 'project', title: 'Projet', items: [
      { id: 'info', label: 'Informations projet', icon: Icons.Info },
      { id: 'raci', label: 'Équipe', icon: Icons.Users },
      { id: 'documents', label: 'Documentation projet', icon: Icons.Folder },
    ]},
    { id: 'strategy', title: 'Stratégie', items: [
      { id: 'svp', label: 'Plan de validation (SVP)', icon: Icons.FileSignature, status: 'in-progress' },
    ]},
    { id: 'features-risks', title: 'Fonctionnalités et Risques', items: [
      { id: 'urs', label: 'Besoins métier (URS)', icon: Icons.ClipboardList, status: 'completed' },
      { id: 'fs', label: 'Spécifications (FS)', icon: Icons.List, status: 'in-progress' },
      { id: 'fra', label: 'Analyse des risques (FRA)', icon: Icons.Shield, status: 'in-progress' },
    ]},
    { id: 'exports', title: 'Exports', items: [
      { id: 'exports', label: 'Documents signés', icon: Icons.Download },
    ]},
  ];
  
  const toggleSection = (sectionId) => {
    setExpandedSections(prev => 
      prev.includes(sectionId) 
        ? prev.filter(id => id !== sectionId)
        : [...prev, sectionId]
    );
  };
  
  const statusDot = (status) => {
    if (!status) return null;
    const statusColors = {
      'completed': colors.success,
      'in-progress': colors.primary,
      'pending': colors.border,
      'active': colors.accent,
    };
    return (
      <span style={{
        width: '8px',
        height: '8px',
        borderRadius: '50%',
        backgroundColor: statusColors[status] || colors.border,
      }} />
    );
  };

  return (
    <div style={{
      width: '260px',
      backgroundColor: 'white',
      borderRight: `1px solid ${colors.border}`,
      height: 'calc(100vh - 56px)',
      overflow: 'auto',
      flexShrink: 0,
    }}>
      <div style={{ padding: '16px 12px' }}>
        {menuStructure.map(section => {
          const isExpanded = expandedSections.includes(section.id);
          return (
            <div key={section.id} style={{ marginBottom: '8px' }}>
              <button
                onClick={() => toggleSection(section.id)}
                style={{ 
                  width: '100%', 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'space-between', 
                  padding: '8px 12px', 
                  border: 'none', 
                  backgroundColor: 'transparent', 
                  cursor: 'pointer', 
                  borderRadius: '6px' 
                }}
              >
                <span style={{ 
                  fontSize: '11px', 
                  fontWeight: 600, 
                  color: colors.textSecondary, 
                  textTransform: 'uppercase', 
                  letterSpacing: '0.5px' 
                }}>
                  {section.title}
                </span>
                <span style={{ 
                  color: colors.textSecondary, 
                  transform: isExpanded ? 'rotate(0deg)' : 'rotate(-90deg)', 
                  transition: 'transform 0.2s' 
                }}>
                  <Icons.ChevronDown />
                </span>
              </button>
              {isExpanded && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '2px', marginTop: '4px' }}>
                  {section.items.map(item => {
                    const Icon = item.icon;
                    const isActive = activeSection === item.id;
                    return (
                      <button 
                        key={item.id} 
                        onClick={() => onSectionChange(item.id)} 
                        style={{ 
                          padding: '10px 12px', 
                          border: 'none', 
                          borderRadius: '8px', 
                          backgroundColor: isActive ? colors.primaryLight : 'transparent', 
                          cursor: 'pointer', 
                          display: 'flex', 
                          alignItems: 'center', 
                          gap: '10px', 
                          fontSize: '13px', 
                          fontWeight: isActive ? 600 : 400, 
                          color: isActive ? colors.primary : colors.textSecondary, 
                          textAlign: 'left', 
                          width: '100%', 
                          borderLeft: isActive ? `3px solid ${colors.primary}` : '3px solid transparent' 
                        }}
                      >
                        <span style={{ 
                          color: isActive ? colors.primary : colors.textSecondary, 
                          display: 'flex', 
                          alignItems: 'center' 
                        }}>
                          <Icon />
                        </span>
                        <span style={{ flex: 1 }}>{item.label}</span>
                        {statusDot(item.status)}
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

// =============================================================================
// DONNÉES MOCKÉES
// =============================================================================
const projectData = {
  name: 'LIMS Laboratory v3.2',
  description: 'Système de gestion des informations de laboratoire pour le contrôle qualité des matières premières et produits finis',
  gxpCategory: 'GLP / GMP Direct',
  gampCategory: 'GAMP 4',
  status: 'En validation',
  startDate: '2024-09-15',
  targetDate: '2025-03-31',
  goLiveDate: '2025-04-15',
  currentPhase: 'FRA',
  processOwner: 'Dr. Marie Dupont',
  systemOwner: 'Thomas Bernard',
};

const workflowSteps = [
  { id: 'svp', label: 'SVP', fullName: 'System Validation Plan', status: 'completed', date: '15/10/2024' },
  { id: 'urs', label: 'URS', fullName: 'User Requirements', status: 'completed', date: '30/10/2024' },
  { id: 'fs', label: 'FS', fullName: 'Functional Specifications', status: 'in-progress', progress: 78 },
  { id: 'fra', label: 'FRA', fullName: 'Functional Risk Analysis', status: 'in-progress', progress: 45 },
  { id: 'iq', label: 'IQ', fullName: 'Installation Qualification', status: 'pending' },
  { id: 'oq', label: 'OQ', fullName: 'Operational Qualification', status: 'pending' },
  { id: 'pq', label: 'PQ', fullName: 'Performance Qualification', status: 'pending' },
  { id: 'vsr', label: 'VSR', fullName: 'Validation Summary Report', status: 'pending' },
];

const pendingActions = [
  { id: 1, type: 'validation', category: 'Spécifications fonctionnelles', count: 9, total: 23, priority: 'high', assignedRole: 'Solution Owner', dueDate: '2024-12-10' },
  { id: 2, type: 'scoring', category: 'Analyse des risques', count: 5, total: 23, priority: 'medium', assignedRole: 'QA Expert', dueDate: '2024-12-15' },
  { id: 3, type: 'review', category: 'Révision URS', count: 2, total: 15, priority: 'low', assignedRole: 'Process Owner', dueDate: '2024-12-20' },
  { id: 4, type: 'approval', category: 'Approbation SVP', count: 1, total: 1, priority: 'high', assignedRole: 'QA Expert', dueDate: '2024-12-05' },
];

const recentActivity = [
  { id: 1, action: 'Validation FS-012', user: 'M. Dupont', role: 'SolO', time: 'Il y a 15 min', type: 'validation' },
  { id: 2, action: 'Scoring risque ajouté sur FS-008', user: 'A. Martin', role: 'QA', time: 'Il y a 1h', type: 'scoring' },
  { id: 3, action: 'Commentaire sur URS-005', user: 'T. Bernard', role: 'SO', time: 'Il y a 2h', type: 'comment' },
  { id: 4, action: 'Nouvelle FS-023 créée', user: 'S. Leroy', role: 'UPM', time: 'Il y a 3h', type: 'create' },
  { id: 5, action: 'Modification URS-012', user: 'M. Dupont', role: 'SolO', time: 'Hier', type: 'edit' },
];

const kpis = {
  urs: { total: 15, validated: 15, coverage: 100 },
  fs: { total: 23, validated: 14, coverage: 61 },
  risks: { total: 47, high: 8, medium: 24, low: 15 },
  tests: { total: 0, passed: 0, failed: 0, pending: 0 },
};

const teamMembers = [
  { role: 'Process Owner', abbr: 'PO', name: 'Dr. Marie Dupont', department: 'Contrôle Qualité' },
  { role: 'System Owner', abbr: 'SO', name: 'Thomas Bernard', department: 'IT' },
  { role: 'Solution Owner', abbr: 'SolO', name: 'Sophie Leroy', department: 'IT' },
  { role: 'QA Expert', abbr: 'QA', name: 'Antoine Martin', department: 'QA R&D' },
  { role: 'User Project Manager', abbr: 'UPM', name: 'Claire Moreau', department: 'Laboratoire' },
];

const alerts = [
  { id: 1, type: 'warning', message: 'Échéance SVP dans 4 jours', action: 'Voir SVP' },
  { id: 2, type: 'danger', message: '3 risques High sans mitigation définie', action: 'Voir FRA' },
];

const recentDocuments = [
  { id: 1, name: 'SVP_LIMS_v1.2.pdf', type: 'SVP', date: '28/11/2024', status: 'En attente approbation' },
  { id: 2, name: 'URS_LIMS_v2.0.pdf', type: 'URS', date: '30/10/2024', status: 'Approuvé' },
  { id: 3, name: 'FRA_LIMS_draft.xlsx', type: 'FRA', date: '25/11/2024', status: 'Brouillon' },
];

// Définition des rôles du projet (RACI)
const roleDefinitions = [
  { id: 'po', abbr: 'PO', name: 'Process Owner', description: 'Responsable du processus métier supporté par le système. Définit les besoins fonctionnels et valide que le système répond aux exigences métier.', required: true, category: 'Métier' },
  { id: 'so', abbr: 'SO', name: 'System Owner', description: 'Responsable de la disponibilité, maintenance et évolution du système. Assure le bon fonctionnement technique au quotidien.', required: true, category: 'IT' },
  { id: 'solo', abbr: 'SolO', name: 'Solution Owner', description: 'Expert technique et fonctionnel du système. Fait le lien entre les besoins métier et les solutions techniques.', required: true, category: 'IT' },
  { id: 'upm', abbr: 'UPM', name: 'User Project Manager', description: 'Représente les utilisateurs métier dans le projet. Coordonne les activités côté utilisateur et facilite la communication.', required: false, category: 'Métier' },
  { id: 'itpm', abbr: 'ITPM', name: 'IT Project Manager', description: 'Gère le projet côté IT. Planifie les ressources, suit les délais et coordonne les équipes techniques.', required: false, category: 'IT' },
  { id: 'qa', abbr: 'QA', name: 'QA Expert', description: 'Assure la conformité qualité et réglementaire. Valide les documents de qualification et supervise les activités de test.', required: true, category: 'Qualité' },
  { id: 'qc', abbr: 'QC', name: 'Quality Champion', description: 'Responsable des activités de validation au quotidien. Point de contact principal pour les questions qualité du projet.', required: true, category: 'Qualité' },
];

// Liste des personnes disponibles
const availablePeople = [
  { id: 1, name: 'Dr. Marie Dupont', department: 'Contrôle Qualité', email: 'marie.dupont@company.com' },
  { id: 2, name: 'Thomas Bernard', department: 'IT', email: 'thomas.bernard@company.com' },
  { id: 3, name: 'Sophie Leroy', department: 'IT', email: 'sophie.leroy@company.com' },
  { id: 4, name: 'Antoine Martin', department: 'QA R&D', email: 'antoine.martin@company.com' },
  { id: 5, name: 'Claire Moreau', department: 'Laboratoire', email: 'claire.moreau@company.com' },
  { id: 6, name: 'Marc Durand', department: 'QA Production', email: 'marc.durand@company.com' },
  { id: 7, name: 'Julien Petit', department: 'IT', email: 'julien.petit@company.com' },
  { id: 8, name: 'Émilie Roux', department: 'Production', email: 'emilie.roux@company.com' },
];

// Types de documents disponibles
const documentTypes = [
  { id: 'urs', label: 'Expression de besoin / URS', icon: '📋' },
  { id: 'fs', label: 'Spécifications fonctionnelles', icon: '📄' },
  { id: 'ts', label: 'Spécifications techniques / Architecture', icon: '🏗️' },
  { id: 'manual', label: 'Manuel utilisateur / Guide', icon: '📖' },
  { id: 'sop', label: 'SOP / Procédure interne', icon: '📑' },
  { id: 'meeting', label: 'Compte-rendu de réunion', icon: '📝' },
  { id: 'audit', label: 'Rapport d\'audit / qualification', icon: '🔍' },
  { id: 'other', label: 'Autre', icon: '📎' },
];

// Sources externes
const externalSources = [
  { id: 'url', label: 'Lien URL', icon: '🔗', placeholder: 'https://...' },
  { id: 'jira', label: 'Jira', icon: '🎫', placeholder: 'URL du ticket ou projet Jira' },
  { id: 'confluence', label: 'Confluence', icon: '📚', placeholder: 'URL de la page Confluence' },
  { id: 'sharepoint', label: 'SharePoint', icon: '☁️', placeholder: 'URL du document SharePoint' },
];

// Documents mockés
const initialDocuments = [
  { id: 1, name: 'Expression_Besoin_v2.1.pdf', source: 'upload', type: 'urs', pages: '1-15', comment: 'Version validée par le métier', status: 'analyzed', addedAt: '2024-01-10' },
  { id: 2, name: 'Architecture_Technique.docx', source: 'upload', type: 'ts', pages: '', comment: '', status: 'analyzed', addedAt: '2024-01-12' },
  { id: 3, name: 'Specs_Fonctionnelles_Module_A.pdf', source: 'upload', type: 'fs', pages: '1-45', comment: 'Focus sur le module de gestion', status: 'pending', addedAt: '2024-01-15' },
  { id: 4, name: 'Projet LIMS - Backlog', source: 'jira', type: 'urs', pages: '', comment: 'User stories validées sprint 1-5', status: 'pending', addedAt: '2024-01-18', url: 'https://jira.company.com/browse/LIMS' },
];

// Catégories de findings
const findingCategories = {
  missing: { label: 'Éléments manquants', color: colors.error, bg: colors.errorLight, icon: Icons.AlertCircle },
  inconsistency: { label: 'Incohérences', color: colors.warning, bg: colors.warningLight, icon: Icons.AlertTriangle },
  inaccuracy: { label: 'Inexactitudes', color: colors.purple, bg: colors.purpleLight, icon: Icons.AlertCircle },
  suggestion: { label: 'Suggestions', color: colors.primary, bg: colors.primaryLight, icon: Icons.Lightbulb },
};

// Findings mockés
const mockFindings = [
  {
    id: 1,
    category: 'missing',
    severity: 'critical',
    title: 'Exigences de performance non spécifiées',
    description: 'Aucune exigence de temps de réponse ou de capacité n\'est définie dans le document URS.',
    sources: [{ doc: 'Expression_Besoin_v2.1.pdf', pages: 'Sections 3-5', type: 'absence' }],
    status: 'pending',
    aiQuestion: {
      type: 'choice',
      question: 'Souhaitez-vous que je génère des exigences de performance basées sur les standards du secteur ?',
      options: [
        { id: 'generate', label: 'Oui, générer des propositions' },
        { id: 'manual', label: 'Non, je les ajouterai manuellement' },
        { id: 'na', label: 'Non applicable pour ce projet' },
      ]
    }
  },
  {
    id: 2,
    category: 'missing',
    severity: 'major',
    title: 'Procédure de sauvegarde et restauration absente',
    description: 'Le document d\'architecture technique ne mentionne pas de stratégie de backup.',
    sources: [{ doc: 'Architecture_Technique.docx', pages: 'Document complet', type: 'absence' }],
    status: 'pending',
    aiQuestion: {
      type: 'freetext',
      question: 'Pouvez-vous préciser la stratégie de sauvegarde prévue pour ce système ?',
      placeholder: 'Décrivez la politique de backup (fréquence, rétention, procédure de restauration...)'
    }
  },
  {
    id: 3,
    category: 'inconsistency',
    severity: 'critical',
    title: 'Contradiction sur le nombre d\'utilisateurs simultanés',
    description: 'L\'expression de besoin indique 50 utilisateurs max, l\'architecture technique est dimensionnée pour 200.',
    sources: [
      { doc: 'Expression_Besoin_v2.1.pdf', pages: 'Page 7, §3.2', type: 'reference' },
      { doc: 'Architecture_Technique.docx', pages: 'Page 12, §4.1', type: 'reference' }
    ],
    excerpt: 'URS: « 50 utilisateurs simultanés »\nTAD: « 200 connexions concurrentes »',
    status: 'pending',
    aiQuestion: {
      type: 'choice',
      question: 'Quelle valeur doit être retenue pour le dimensionnement ?',
      options: [
        { id: '50', label: '50 utilisateurs (comme l\'URS)' },
        { id: '200', label: '200 utilisateurs (comme le TAD)' },
        { id: 'other', label: 'Autre valeur (préciser)' },
      ]
    }
  },
  {
    id: 4,
    category: 'inaccuracy',
    severity: 'major',
    title: 'Version de base de données obsolète référencée',
    description: 'Le TAD mentionne SQL Server 2016, qui est en fin de support.',
    sources: [{ doc: 'Architecture_Technique.docx', pages: 'Page 5, §2.3', type: 'reference' }],
    status: 'resolved',
    resolution: 'Mis à jour vers SQL Server 2022',
    resolvedAt: '2024-01-18',
  },
  {
    id: 5,
    category: 'suggestion',
    severity: 'minor',
    title: 'Ajouter un diagramme de flux de données',
    description: 'Un DFD faciliterait la compréhension des échanges entre les modules.',
    sources: [{ doc: 'Specs_Fonctionnelles_Module_A.pdf', pages: 'Section 4', type: 'suggestion' }],
    status: 'pending',
    aiQuestion: {
      type: 'choice',
      question: 'Souhaitez-vous que je génère un diagramme de flux basé sur les spécifications ?',
      options: [
        { id: 'generate', label: 'Oui, générer un DFD' },
        { id: 'later', label: 'À traiter plus tard' },
        { id: 'skip', label: 'Non nécessaire' },
      ]
    }
  },
];

// Catégories URS
const ursCategories = [
  { id: 'identity', label: 'Gestion des identités', icon: '🔐' },
  { id: 'audit', label: 'Traçabilité & Audit', icon: '📋' },
  { id: 'data', label: 'Gestion des données', icon: '📊' },
  { id: 'integration', label: 'Intégrations', icon: '🔗' },
  { id: 'reporting', label: 'Reporting', icon: '📈' },
];

// Données URS mockées
const ursData = [
  { 
    id: 'URS-001', 
    title: 'Authentification des utilisateurs', 
    description: 'Le système doit permettre l\'authentification sécurisée des utilisateurs via SSO Active Directory ou login/mot de passe.',
    priority: 'must',
    validated: true,
    qaOpinion: 'ok',
    categoryId: 'identity',
    source: { doc: 'Expression_Besoin_v2.1.pdf', page: '8' },
    linkedFS: [
      { id: 'FS-001', title: 'Gestion des accès utilisateurs' },
      { id: 'FS-002', title: 'Authentification SSO' },
    ]
  },
  { 
    id: 'URS-002', 
    title: 'Gestion des rôles et permissions', 
    description: 'Le système doit implémenter un modèle de contrôle d\'accès basé sur les rôles (RBAC) avec au minimum les profils : Admin, Manager, Utilisateur, Lecteur.',
    priority: 'must',
    validated: true,
    qaOpinion: 'ok',
    categoryId: 'identity',
    source: { doc: 'Expression_Besoin_v2.1.pdf', page: '10' },
    linkedFS: [{ id: 'FS-001', title: 'Gestion des accès utilisateurs' }]
  },
  { 
    id: 'URS-003', 
    title: 'Politique de mots de passe', 
    description: 'Les mots de passe doivent respecter les règles de sécurité : 12 caractères minimum, complexité, expiration 90 jours.',
    priority: 'must',
    validated: false,
    qaOpinion: 'improve',
    categoryId: 'identity',
    source: { doc: 'Expression_Besoin_v2.1.pdf', page: '11' },
    linkedFS: [{ id: 'FS-005', title: 'Politique mots de passe' }]
  },
  { 
    id: 'URS-004', 
    title: 'Journalisation des actions critiques', 
    description: 'Toute action critique (création, modification, suppression, export) doit être tracée avec horodatage, identifiant utilisateur et description.',
    priority: 'must',
    validated: true,
    qaOpinion: 'ok',
    categoryId: 'audit',
    source: { doc: 'Expression_Besoin_v2.1.pdf', page: '14' },
    linkedFS: [{ id: 'FS-003', title: 'Journalisation des actions' }]
  },
  { 
    id: 'URS-005', 
    title: 'Export des traces d\'audit', 
    description: 'Les utilisateurs autorisés doivent pouvoir exporter les journaux d\'audit au format PDF et CSV avec filtres temporels.',
    priority: 'should',
    validated: false,
    qaOpinion: null,
    categoryId: 'audit',
    source: { doc: 'CR_Kickoff.docx', page: '5' },
    linkedFS: [{ id: 'FS-004', title: 'Export audit trail' }]
  },
  { 
    id: 'URS-006', 
    title: 'Intégrité des données', 
    description: 'Le système doit garantir l\'intégrité des données conformément aux exigences 21 CFR Part 11 (signature électronique, non-répudiation).',
    priority: 'must',
    validated: true,
    qaOpinion: 'ok',
    categoryId: 'data',
    source: { doc: 'Expression_Besoin_v2.1.pdf', page: '16' },
    linkedFS: []
  },
  { 
    id: 'URS-007', 
    title: 'Sauvegarde des données', 
    description: 'Les données doivent être sauvegardées quotidiennement avec une rétention de 7 ans minimum.',
    priority: 'must',
    validated: false,
    qaOpinion: null,
    categoryId: 'data',
    source: { doc: 'Expression_Besoin_v2.1.pdf', page: '18' },
    linkedFS: []
  },
  { 
    id: 'URS-008', 
    title: 'Interface avec ERP', 
    description: 'Le système doit s\'interfacer avec l\'ERP existant pour l\'échange bidirectionnel des données de production.',
    priority: 'should',
    validated: false,
    qaOpinion: null,
    categoryId: 'integration',
    source: { doc: 'CR_Kickoff.docx', page: '8' },
    linkedFS: []
  },
  { 
    id: 'URS-009', 
    title: 'Tableaux de bord temps réel', 
    description: 'Le système doit fournir des tableaux de bord avec indicateurs clés mis à jour en temps réel.',
    priority: 'could',
    validated: false,
    qaOpinion: null,
    categoryId: 'reporting',
    source: { doc: 'CR_Kickoff.docx', page: '12' },
    linkedFS: []
  },
];

// Catégories FS
const fsCategories = [
  { id: 'all', label: 'Toutes les FS', icon: '📋' },
  { id: 'security', label: 'Sécurité & Accès', icon: '🔐' },
  { id: 'audit', label: 'Traçabilité', icon: '📋' },
  { id: 'data', label: 'Gestion des données', icon: '📊' },
  { id: 'integration', label: 'Intégrations', icon: '🔗' },
];

// Données FS mockées
const fsData = [
  { 
    id: 'FS-001', 
    title: 'Gestion des accès utilisateurs', 
    description: 'Le système doit permettre la création, modification et suppression des comptes utilisateurs avec attribution de rôles et permissions selon le modèle RBAC.',
    status: 'validated',
    qaReviewed: true,
    category: 'Sécurité & Accès',
    categoryId: 'security',
    linkedURS: [
      { id: 'URS-001', title: 'Authentification des utilisateurs' },
      { id: 'URS-002', title: 'Gestion des rôles et permissions' },
    ]
  },
  { 
    id: 'FS-002', 
    title: 'Authentification SSO', 
    description: 'Le système doit s\'intégrer avec l\'Active Directory pour permettre une authentification unique. Session expire après 15 min d\'inactivité.',
    status: 'review',
    qaReviewed: true,
    category: 'Sécurité & Accès',
    categoryId: 'security',
    linkedURS: [
      { id: 'URS-001', title: 'Authentification des utilisateurs' },
    ]
  },
  { 
    id: 'FS-003', 
    title: 'Journalisation des actions', 
    description: 'Toutes les actions critiques doivent être enregistrées avec horodatage, identifiant utilisateur et description de l\'action.',
    status: 'pending',
    qaReviewed: false,
    category: 'Traçabilité',
    categoryId: 'audit',
    linkedURS: [
      { id: 'URS-004', title: 'Journalisation des actions critiques' },
    ]
  },
  { 
    id: 'FS-004', 
    title: 'Export audit trail', 
    description: 'Export des données d\'audit au format PDF et CSV, avec filtres par période, utilisateur et type d\'action.',
    status: 'draft',
    qaReviewed: false,
    category: 'Traçabilité',
    categoryId: 'audit',
    linkedURS: [
      { id: 'URS-005', title: 'Export des traces d\'audit' },
    ]
  },
  { 
    id: 'FS-005', 
    title: 'Politique mots de passe', 
    description: 'Minimum 12 caractères, complexité requise (majuscules, minuscules, chiffres, caractères spéciaux), expiration 90 jours, historique des 12 derniers mots de passe.',
    status: 'draft',
    qaReviewed: false,
    category: 'Sécurité & Accès',
    categoryId: 'security',
    linkedURS: [
      { id: 'URS-003', title: 'Politique de mots de passe' },
    ]
  },
];

// =============================================================================
// DONNÉES FRA (Functional Risk Assessment)
// =============================================================================

// Définitions GxP pour les critères
const gxpDefinitions = {
  severity: {
    L: { label: 'Low', definition: "Pas d'impact sur la sécurité patient, qualité produit, intégrité des données." },
    M: { label: 'Medium', definition: "Impact sur l'intégrité des données (traçabilité, sécurité d'accès). Pas d'impact sur sécurité patient." },
    H: { label: 'High', definition: "Impact sur la sécurité patient, qualité produit avec ou sans impact sur l'intégrité des données." }
  },
  likelihood: {
    L: { label: 'Low', definition: "Fonctionnalité standard, comportement prévisible et bien connu." },
    M: { label: 'Medium', definition: "Configuration ou customisation du système, paramétrage spécifique." },
    H: { label: 'High', definition: "Code custom, développement spécifique avec risque d'erreur plus élevé." }
  },
  detectability: {
    L: { label: 'Low', definition: "Pas de moyen de contrôle, défaillance improbable à détecter." },
    M: { label: 'Medium', definition: "Défaillance détectable par l'utilisateur via des procédures de contrôle externes." },
    H: { label: 'High', definition: "Défaillance menant à un blocage ou message d'erreur. Détection très probable." }
  }
};

// Catégories de risques GxP
const riskCategories = [
  { id: 'data_loss', label: 'Perte, altération ou indisponibilité des données', shortLabel: 'Perte données' },
  { id: 'functionality', label: 'Fonctionnalités et utilisation du système non maîtrisées', shortLabel: 'Fonctionnalités' },
  { id: 'records', label: 'Enregistrements indisponibles, incorrects ou incomplets', shortLabel: 'Enregistrements' },
  { id: 'data_source', label: 'Source de données non maîtrisée', shortLabel: 'Source données' },
  { id: 'compliance', label: 'Non-conformité aux exigences légales et réglementaires', shortLabel: 'Conformité' },
  { id: 'documentation', label: 'Documentation obsolète ou incorrecte', shortLabel: 'Documentation' },
];

// Matrices de calcul
const calculateRiskClass = (severity, likelihood) => {
  const matrix = {
    'H-H': 'H', 'H-M': 'H', 'H-L': 'M',
    'M-H': 'H', 'M-M': 'M', 'M-L': 'L',
    'L-H': 'M', 'L-M': 'L', 'L-L': 'L',
  };
  return matrix[`${severity}-${likelihood}`] || 'L';
};

const calculateRiskPriority = (riskClass, detectability) => {
  const matrix = {
    'H-L': 'H', 'H-M': 'H', 'H-H': 'M',
    'M-L': 'H', 'M-M': 'M', 'M-H': 'L',
    'L-L': 'M', 'L-M': 'L', 'L-H': 'L',
  };
  return matrix[`${riskClass}-${detectability}`] || 'L';
};

// Données FS avec risques pour FRA
const fraData = [
  { 
    id: 'FS-001', 
    title: 'Gestion des accès utilisateurs', 
    category: '🔐 Sécurité',
    status: 'validated',
    risks: [
      { id: 1, category: 'compliance', severity: 'H', likelihood: 'M', detectability: 'H', aiSeverity: 'H', aiLikelihood: 'M', aiDetectability: 'H' },
      { id: 2, category: 'records', severity: 'M', likelihood: 'L', detectability: 'M', aiSeverity: 'M', aiLikelihood: 'L', aiDetectability: 'M' },
    ]
  },
  { 
    id: 'FS-002', 
    title: 'Authentification SSO', 
    category: '🔐 Sécurité',
    status: 'review',
    risks: [
      { id: 1, category: 'data_loss', severity: 'M', likelihood: 'M', detectability: 'H', aiSeverity: 'M', aiLikelihood: 'L', aiDetectability: 'H' },
    ]
  },
  { 
    id: 'FS-003', 
    title: 'Journalisation des actions', 
    category: '📋 Traçabilité',
    status: 'aiScored',
    risks: [
      { id: 1, category: 'records', severity: 'H', likelihood: 'L', detectability: 'L', aiSeverity: 'H', aiLikelihood: 'L', aiDetectability: 'L' },
    ]
  },
  { 
    id: 'FS-004', 
    title: 'Export audit trail', 
    category: '📋 Traçabilité',
    status: 'aiScored',
    risks: [
      { id: 1, category: 'documentation', severity: 'L', likelihood: 'M', detectability: 'M', aiSeverity: 'L', aiLikelihood: 'M', aiDetectability: 'M' },
    ]
  },
  { 
    id: 'FS-005', 
    title: 'Politique mots de passe', 
    category: '🔐 Sécurité',
    status: 'draft',
    risks: [
      { id: 1, category: 'compliance', severity: 'M', likelihood: 'M', detectability: 'M', aiSeverity: null, aiLikelihood: null, aiDetectability: null },
    ]
  },
];

// =============================================================================
// COMPOSANTS UI PARTAGÉS
// =============================================================================
const PriorityBadge = ({ priority }) => {
  const configs = {
    high: { bg: colors.errorLight, color: colors.error, label: 'Urgent' },
    medium: { bg: colors.warningLight, color: colors.warning, label: 'Normal' },
    low: { bg: '#F1F5F9', color: colors.textSecondary, label: 'Faible' },
  };
  const config = configs[priority] || configs.medium;
  
  return (
    <span style={{
      display: 'inline-flex',
      alignItems: 'center',
      padding: '2px 6px',
      borderRadius: '4px',
      fontSize: '10px',
      fontWeight: '600',
      textTransform: 'uppercase',
      letterSpacing: '0.5px',
      backgroundColor: config.bg,
      color: config.color,
    }}>
      {config.label}
    </span>
  );
};

const StatusBadge = ({ status }) => {
  const configs = {
    completed: { bg: colors.successLight, color: colors.success, label: 'Terminé' },
    'in-progress': { bg: colors.primaryLight, color: colors.primary, label: 'En cours' },
    pending: { bg: '#F1F5F9', color: colors.textSecondary, label: 'À venir' },
    blocked: { bg: colors.errorLight, color: colors.error, label: 'Bloqué' },
  };
  const config = configs[status] || configs.pending;
  
  return (
    <span style={{
      display: 'inline-flex',
      alignItems: 'center',
      gap: '4px',
      padding: '2px 8px',
      borderRadius: '12px',
      fontSize: '11px',
      fontWeight: '500',
      backgroundColor: config.bg,
      color: config.color,
    }}>
      {status === 'completed' && <Icons.CheckCircle />}
      {status === 'in-progress' && <Icons.Clock />}
      {config.label}
    </span>
  );
};

const Card = ({ children, title, icon: Icon, action, style = {} }) => (
  <div style={{
    backgroundColor: 'white',
    borderRadius: '12px',
    border: `1px solid ${colors.border}`,
    overflow: 'hidden',
    ...style,
  }}>
    {title && (
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '16px 20px',
        borderBottom: `1px solid ${colors.border}`,
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          {Icon && <span style={{ color: colors.primary }}><Icon /></span>}
          <h3 style={{ margin: 0, fontSize: '14px', fontWeight: '600', color: colors.textPrimary }}>
            {title}
          </h3>
        </div>
        {action}
      </div>
    )}
    <div style={{ padding: '16px 20px' }}>
      {children}
    </div>
  </div>
);

// =============================================================================
// PAGE: ÉQUIPE PROJET (RACI)
// =============================================================================

// Modal info rôle
const RoleInfoModal = ({ role, onClose }) => {
  if (!role) return null;
  
  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 1000,
      }}
      onClick={onClose}
    >
      <div
        style={{
          backgroundColor: 'white',
          borderRadius: '16px',
          padding: '24px',
          maxWidth: '480px',
          width: '90%',
          boxShadow: '0 20px 60px rgba(0,0,0,0.2)',
        }}
        onClick={e => e.stopPropagation()}
      >
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '20px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <div style={{
              width: '56px',
              height: '56px',
              borderRadius: '12px',
              backgroundColor: colors.primaryLight,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: colors.primary,
              fontSize: '20px',
              fontWeight: 700,
            }}>
              {role.abbr}
            </div>
            <div>
              <h3 style={{ margin: 0, fontSize: '18px', fontWeight: 600, color: colors.textPrimary }}>{role.name}</h3>
              <span style={{ display: 'inline-block', marginTop: '4px', padding: '2px 8px', borderRadius: '4px', backgroundColor: colors.background, fontSize: '11px', fontWeight: 500, color: colors.textSecondary }}>
                {role.category}
              </span>
            </div>
          </div>
          <button onClick={onClose} style={{ width: '32px', height: '32px', borderRadius: '8px', border: 'none', backgroundColor: colors.background, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', color: colors.textSecondary }}>
            <Icons.X />
          </button>
        </div>
        <p style={{ margin: 0, fontSize: '14px', color: colors.textSecondary, lineHeight: 1.7 }}>{role.description}</p>
        {role.required && (
          <div style={{ marginTop: '20px', padding: '12px 16px', backgroundColor: colors.warningLight, borderRadius: '8px', display: 'flex', alignItems: 'center', gap: '10px' }}>
            <Icons.AlertCircle />
            <span style={{ fontSize: '13px', color: colors.textPrimary }}>Ce rôle est obligatoire pour le projet</span>
          </div>
        )}
      </div>
    </div>
  );
};

// Carte de rôle
const RoleCard = ({ role, assignedPerson, onAssign, onShowInfo, otherRolesForPerson }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  
  const filteredPeople = availablePeople.filter(p => 
    p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.department.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  const handleSelect = (person) => {
    onAssign(role.id, person);
    setIsDropdownOpen(false);
    setSearchTerm('');
  };
  
  const handleClear = (e) => {
    e.stopPropagation();
    onAssign(role.id, null);
  };

  return (
    <div style={{ backgroundColor: 'white', borderRadius: '12px', border: `1px solid ${colors.border}`, overflow: 'hidden' }}>
      {/* En-tête du rôle */}
      <div style={{ padding: '16px 20px', borderBottom: `1px solid ${colors.border}`, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{ width: '44px', height: '44px', borderRadius: '10px', backgroundColor: colors.primaryLight, display: 'flex', alignItems: 'center', justifyContent: 'center', color: colors.primary, fontSize: '15px', fontWeight: 700 }}>
            {role.abbr}
          </div>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ fontSize: '15px', fontWeight: 600, color: colors.textPrimary }}>{role.name}</span>
              {role.required && (
                <span style={{ padding: '2px 6px', borderRadius: '4px', backgroundColor: colors.errorLight, fontSize: '10px', fontWeight: 600, color: colors.error }}>Requis</span>
              )}
            </div>
            <span style={{ fontSize: '12px', color: colors.textSecondary }}>{role.category}</span>
          </div>
        </div>
        <button onClick={() => onShowInfo(role)} style={{ width: '32px', height: '32px', borderRadius: '8px', border: `1px solid ${colors.border}`, backgroundColor: 'white', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', color: colors.textSecondary }} title="En savoir plus">
          <Icons.HelpCircle />
        </button>
      </div>
      
      {/* Sélection de personne */}
      <div style={{ padding: '16px 20px', position: 'relative' }}>
        {assignedPerson ? (
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px 16px', backgroundColor: colors.successLight, borderRadius: '10px', border: `1px solid ${colors.success}30` }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div style={{ width: '40px', height: '40px', borderRadius: '50%', backgroundColor: colors.success, display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontSize: '14px', fontWeight: 600 }}>
                {assignedPerson.name.split(' ').map(n => n[0]).join('')}
              </div>
              <div>
                <div style={{ fontSize: '14px', fontWeight: 600, color: colors.textPrimary }}>{assignedPerson.name}</div>
                <div style={{ fontSize: '12px', color: colors.textSecondary, display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <Icons.Building />
                  {assignedPerson.department}
                </div>
                {otherRolesForPerson && otherRolesForPerson.length > 0 && (
                  <div style={{ marginTop: '4px', display: 'flex', gap: '4px', flexWrap: 'wrap' }}>
                    {otherRolesForPerson.map(r => (
                      <span key={r} style={{ padding: '1px 6px', borderRadius: '4px', backgroundColor: colors.primary, color: 'white', fontSize: '10px', fontWeight: 600 }}>+{r}</span>
                    ))}
                  </div>
                )}
              </div>
            </div>
            <button onClick={handleClear} style={{ width: '28px', height: '28px', borderRadius: '6px', border: 'none', backgroundColor: 'white', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', color: colors.textSecondary }}>
              <Icons.X />
            </button>
          </div>
        ) : (
          <div>
            <button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              style={{ width: '100%', padding: '12px 16px', borderRadius: '10px', border: `2px dashed ${colors.border}`, backgroundColor: colors.background, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', fontSize: '14px', color: colors.textSecondary }}
            >
              <Icons.Plus />
              Assigner une personne
            </button>
            
            {isDropdownOpen && (
              <div style={{ position: 'absolute', top: '100%', left: '20px', right: '20px', backgroundColor: 'white', borderRadius: '12px', border: `1px solid ${colors.border}`, boxShadow: '0 10px 40px rgba(0,0,0,0.15)', zIndex: 100, marginTop: '4px', overflow: 'hidden' }}>
                <div style={{ padding: '12px' }}>
                  <div style={{ position: 'relative' }}>
                    <span style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: colors.textSecondary, display: 'flex', alignItems: 'center' }}><Icons.Search /></span>
                    <input
                      type="text"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      placeholder="Rechercher..."
                      style={{ width: '100%', padding: '10px 12px 10px 40px', borderRadius: '8px', border: `1px solid ${colors.border}`, fontSize: '13px', outline: 'none' }}
                      autoFocus
                    />
                  </div>
                </div>
                <div style={{ maxHeight: '200px', overflow: 'auto' }}>
                  {filteredPeople.map(person => (
                    <button
                      key={person.id}
                      onClick={() => handleSelect(person)}
                      style={{ width: '100%', padding: '12px 16px', border: 'none', backgroundColor: 'transparent', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '12px', textAlign: 'left' }}
                    >
                      <div style={{ width: '36px', height: '36px', borderRadius: '50%', backgroundColor: colors.primaryLight, display: 'flex', alignItems: 'center', justifyContent: 'center', color: colors.primary, fontSize: '12px', fontWeight: 600 }}>
                        {person.name.split(' ').map(n => n[0]).join('')}
                      </div>
                      <div>
                        <div style={{ fontSize: '13px', fontWeight: 500, color: colors.textPrimary }}>{person.name}</div>
                        <div style={{ fontSize: '11px', color: colors.textSecondary }}>{person.department}</div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

// Contenu page RACI
const ProjectRaciContent = () => {
  const [assignments, setAssignments] = useState({
    po: availablePeople[0],
    so: availablePeople[1],
    solo: availablePeople[2],
    upm: availablePeople[4],
    itpm: null,
    qa: availablePeople[3],
    qc: availablePeople[3],
  });
  
  const [selectedRoleInfo, setSelectedRoleInfo] = useState(null);
  
  const handleAssign = (roleId, person) => {
    setAssignments(prev => ({ ...prev, [roleId]: person }));
  };
  
  const getOtherRolesForPerson = (roleId, person) => {
    if (!person) return [];
    return Object.entries(assignments)
      .filter(([id, p]) => id !== roleId && p?.id === person.id)
      .map(([id]) => roleDefinitions.find(r => r.id === id)?.abbr)
      .filter(Boolean);
  };
  
  const assignedCount = Object.values(assignments).filter(Boolean).length;
  const requiredCount = roleDefinitions.filter(r => r.required).length;
  const requiredAssigned = roleDefinitions.filter(r => r.required && assignments[r.id]).length;
  const uniquePeople = new Set(Object.values(assignments).filter(Boolean).map(p => p.id)).size;
  const categories = [...new Set(roleDefinitions.map(r => r.category))];

  return (
    <div style={{ flex: 1, padding: '24px', overflow: 'auto', backgroundColor: colors.background, height: 'calc(100vh - 56px)' }}>
      {/* En-tête */}
      <div style={{ marginBottom: '24px' }}>
        <h1 style={{ margin: 0, fontSize: '24px', fontWeight: 700, color: colors.textPrimary, marginBottom: '8px' }}>Équipe projet</h1>
        <p style={{ margin: 0, fontSize: '14px', color: colors.textSecondary }}>Assignez les membres de l'équipe aux différents rôles du projet de validation</p>
      </div>
      
      {/* Stats */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px', marginBottom: '24px' }}>
        <div style={{ padding: '20px', backgroundColor: 'white', borderRadius: '12px', border: `1px solid ${colors.border}` }}>
          <div style={{ fontSize: '12px', color: colors.textSecondary, marginBottom: '4px' }}>Rôles assignés</div>
          <div style={{ fontSize: '28px', fontWeight: 700, color: colors.textPrimary }}>{assignedCount}<span style={{ fontSize: '16px', fontWeight: 400, color: colors.textSecondary }}>/{roleDefinitions.length}</span></div>
        </div>
        <div style={{ padding: '20px', backgroundColor: requiredAssigned === requiredCount ? colors.successLight : colors.warningLight, borderRadius: '12px', border: `1px solid ${requiredAssigned === requiredCount ? colors.success : colors.warning}30` }}>
          <div style={{ fontSize: '12px', color: colors.textSecondary, marginBottom: '4px' }}>Rôles requis</div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ fontSize: '28px', fontWeight: 700, color: colors.textPrimary }}>{requiredAssigned}<span style={{ fontSize: '16px', fontWeight: 400, color: colors.textSecondary }}>/{requiredCount}</span></span>
            {requiredAssigned === requiredCount && <span style={{ color: colors.success }}><Icons.Check /></span>}
          </div>
        </div>
        <div style={{ padding: '20px', backgroundColor: 'white', borderRadius: '12px', border: `1px solid ${colors.border}` }}>
          <div style={{ fontSize: '12px', color: colors.textSecondary, marginBottom: '4px' }}>Personnes impliquées</div>
          <div style={{ fontSize: '28px', fontWeight: 700, color: colors.textPrimary }}>{uniquePeople}</div>
        </div>
      </div>
      
      {/* Rôles groupés par catégorie */}
      {categories.map(category => (
        <div key={category} style={{ marginBottom: '32px' }}>
          <h2 style={{ margin: 0, fontSize: '13px', fontWeight: 600, color: colors.textSecondary, textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '16px', paddingLeft: '4px' }}>{category}</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(380px, 1fr))', gap: '16px' }}>
            {roleDefinitions.filter(r => r.category === category).map(role => (
              <RoleCard
                key={role.id}
                role={role}
                assignedPerson={assignments[role.id]}
                onAssign={handleAssign}
                onShowInfo={setSelectedRoleInfo}
                otherRolesForPerson={getOtherRolesForPerson(role.id, assignments[role.id])}
              />
            ))}
          </div>
        </div>
      ))}
      
      <RoleInfoModal role={selectedRoleInfo} onClose={() => setSelectedRoleInfo(null)} />
    </div>
  );
};

// =============================================================================
// PAGE: DOCUMENTATION INITIALE
// =============================================================================

// Ligne de document
const DocumentRow = ({ doc, onDelete }) => {
  const typeInfo = documentTypes.find(t => t.id === doc.type) || { icon: '📎', label: 'Autre' };
  const sourceInfo = doc.source === 'upload' 
    ? { icon: '💾', label: 'Fichier local' }
    : externalSources.find(s => s.id === doc.source) || { icon: '🔗', label: 'Externe' };
  
  const statusConfig = {
    pending: { label: 'Non analysé', color: colors.textSecondary, bg: colors.background },
    analyzing: { label: 'En cours...', color: colors.warning, bg: colors.warningLight },
    analyzed: { label: 'Analysé', color: colors.success, bg: colors.successLight },
  };
  const status = statusConfig[doc.status] || statusConfig.pending;
  
  return (
    <div style={{ padding: '16px', backgroundColor: 'white', borderRadius: '10px', border: `1px solid ${colors.border}`, display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '8px' }}>
      <div style={{ width: '40px', height: '40px', borderRadius: '8px', backgroundColor: colors.background, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '20px' }}>
        {typeInfo.icon}
      </div>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
          <p style={{ margin: 0, fontSize: '14px', fontWeight: 500, color: colors.textPrimary, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{doc.name}</p>
          {doc.source !== 'upload' && <span style={{ color: colors.textSecondary }}><Icons.ExternalLink /></span>}
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', fontSize: '12px', color: colors.textSecondary }}>
          <span>{typeInfo.label}</span>
          <span>•</span>
          <span>{sourceInfo.icon} {sourceInfo.label}</span>
          {doc.pages && <><span>•</span><span>Pages: {doc.pages}</span></>}
        </div>
      </div>
      <div style={{ padding: '6px 12px', borderRadius: '6px', backgroundColor: status.bg, color: status.color, fontSize: '12px', fontWeight: 500, display: 'flex', alignItems: 'center', gap: '6px' }}>
        {doc.status === 'analyzed' && <Icons.CheckCircle />}
        {doc.status === 'pending' && <Icons.Clock />}
        {status.label}
      </div>
      <button onClick={() => onDelete(doc.id)} style={{ width: '32px', height: '32px', borderRadius: '6px', border: `1px solid ${colors.border}`, backgroundColor: 'white', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', color: colors.error }} title="Supprimer">
        <Icons.Trash />
      </button>
    </div>
  );
};

// Contenu page Documents
const DocumentsContent = ({ onNavigateToAnalysis }) => {
  const [documents, setDocuments] = useState(initialDocuments);
  const [showAddForm, setShowAddForm] = useState(false);
  const [newDocName, setNewDocName] = useState('');
  const [newDocType, setNewDocType] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisProgress, setAnalysisProgress] = useState(0);
  
  const pendingDocs = documents.filter(d => d.status === 'pending');
  const analyzedDocs = documents.filter(d => d.status === 'analyzed');
  
  const handleAddDocument = () => {
    if (!newDocName) return;
    const newDoc = {
      id: Date.now(),
      name: newDocName,
      source: 'upload',
      type: newDocType || 'other',
      pages: '',
      comment: '',
      status: 'pending',
      addedAt: new Date().toISOString().split('T')[0],
    };
    setDocuments([...documents, newDoc]);
    setShowAddForm(false);
    setNewDocName('');
    setNewDocType('');
  };
  
  const handleDeleteDocument = (id) => {
    setDocuments(documents.filter(d => d.id !== id));
  };
  
  const handleStartAnalysis = () => {
    setIsAnalyzing(true);
    setAnalysisProgress(0);
    const interval = setInterval(() => {
      setAnalysisProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsAnalyzing(false);
          setDocuments(docs => docs.map(d => d.status === 'pending' ? { ...d, status: 'analyzed' } : d));
          return 100;
        }
        return prev + 10;
      });
    }, 500);
  };

  return (
    <div style={{ flex: 1, padding: '24px', overflow: 'auto', backgroundColor: colors.background, height: 'calc(100vh - 56px)' }}>
      {/* En-tête */}
      <div style={{ marginBottom: '24px' }}>
        <h1 style={{ margin: 0, fontSize: '24px', fontWeight: 700, color: colors.textPrimary, marginBottom: '8px' }}>Documentation initiale</h1>
        <p style={{ margin: 0, fontSize: '14px', color: colors.textSecondary }}>Importez les documents sources pour l'analyse IA et la génération des livrables</p>
      </div>
      
      {/* Stats */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px', marginBottom: '24px' }}>
        <div style={{ padding: '20px', backgroundColor: 'white', borderRadius: '12px', border: `1px solid ${colors.border}` }}>
          <div style={{ fontSize: '12px', color: colors.textSecondary, marginBottom: '4px' }}>Documents total</div>
          <div style={{ fontSize: '28px', fontWeight: 700, color: colors.textPrimary }}>{documents.length}</div>
        </div>
        <div style={{ padding: '20px', backgroundColor: colors.successLight, borderRadius: '12px', border: `1px solid ${colors.success}30` }}>
          <div style={{ fontSize: '12px', color: colors.textSecondary, marginBottom: '4px' }}>Analysés</div>
          <div style={{ fontSize: '28px', fontWeight: 700, color: colors.success }}>{analyzedDocs.length}</div>
        </div>
        <div style={{ padding: '20px', backgroundColor: pendingDocs.length > 0 ? colors.warningLight : 'white', borderRadius: '12px', border: `1px solid ${pendingDocs.length > 0 ? colors.warning : colors.border}30` }}>
          <div style={{ fontSize: '12px', color: colors.textSecondary, marginBottom: '4px' }}>En attente</div>
          <div style={{ fontSize: '28px', fontWeight: 700, color: pendingDocs.length > 0 ? colors.warning : colors.textPrimary }}>{pendingDocs.length}</div>
        </div>
      </div>
      
      {/* Barre de progression analyse */}
      {isAnalyzing && (
        <div style={{ padding: '16px 20px', backgroundColor: colors.primaryLight, borderRadius: '10px', border: `1px solid ${colors.primary}30`, marginBottom: '16px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <span style={{ color: colors.primary, animation: 'spin 1s linear infinite' }}><Icons.RefreshCw /></span>
              <span style={{ fontSize: '14px', fontWeight: 500, color: colors.textPrimary }}>Analyse en cours...</span>
            </div>
            <span style={{ fontSize: '13px', color: colors.textSecondary }}>{analysisProgress}%</span>
          </div>
          <div style={{ height: '8px', backgroundColor: 'white', borderRadius: '4px', overflow: 'hidden' }}>
            <div style={{ height: '100%', width: `${analysisProgress}%`, backgroundColor: colors.primary, borderRadius: '4px', transition: 'width 0.3s ease' }} />
          </div>
          <style>{`@keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }`}</style>
        </div>
      )}
      
      {/* Actions */}
      <div style={{ display: 'flex', gap: '12px', marginBottom: '24px' }}>
        <button onClick={() => setShowAddForm(true)} style={{ padding: '12px 20px', borderRadius: '8px', border: `1px solid ${colors.border}`, backgroundColor: 'white', color: colors.textPrimary, fontSize: '14px', fontWeight: 500, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Icons.Plus /> Ajouter un document
        </button>
        {pendingDocs.length > 0 && !isAnalyzing && (
          <button onClick={handleStartAnalysis} style={{ padding: '12px 20px', borderRadius: '8px', border: 'none', backgroundColor: colors.primary, color: 'white', fontSize: '14px', fontWeight: 500, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Icons.Zap /> Analyser {pendingDocs.length} document(s)
          </button>
        )}
        {analyzedDocs.length > 0 && (
          <button onClick={onNavigateToAnalysis} style={{ padding: '12px 20px', borderRadius: '8px', border: `2px solid ${colors.purple}`, backgroundColor: colors.purpleLight, color: colors.purple, fontSize: '14px', fontWeight: 500, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Icons.Search /> Voir l'analyse critique
          </button>
        )}
      </div>
      
      {/* Formulaire d'ajout simplifié */}
      {showAddForm && (
        <div style={{ backgroundColor: 'white', borderRadius: '12px', border: `1px solid ${colors.border}`, padding: '20px', marginBottom: '20px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
            <h3 style={{ margin: 0, fontSize: '16px', fontWeight: 600, color: colors.textPrimary }}>Ajouter un document</h3>
            <button onClick={() => setShowAddForm(false)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: colors.textSecondary }}><Icons.X /></button>
          </div>
          <div style={{ display: 'flex', gap: '12px', marginBottom: '16px' }}>
            <input type="text" value={newDocName} onChange={(e) => setNewDocName(e.target.value)} placeholder="Nom du document..." style={{ flex: 1, padding: '12px', borderRadius: '8px', border: `1px solid ${colors.border}`, fontSize: '14px', outline: 'none' }} />
            <select value={newDocType} onChange={(e) => setNewDocType(e.target.value)} style={{ padding: '12px', borderRadius: '8px', border: `1px solid ${colors.border}`, fontSize: '14px', outline: 'none', minWidth: '200px' }}>
              <option value="">Type de document...</option>
              {documentTypes.map(type => <option key={type.id} value={type.id}>{type.icon} {type.label}</option>)}
            </select>
          </div>
          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px' }}>
            <button onClick={() => setShowAddForm(false)} style={{ padding: '10px 20px', borderRadius: '8px', border: `1px solid ${colors.border}`, backgroundColor: 'white', color: colors.textSecondary, fontSize: '14px', cursor: 'pointer' }}>Annuler</button>
            <button onClick={handleAddDocument} disabled={!newDocName} style={{ padding: '10px 20px', borderRadius: '8px', border: 'none', backgroundColor: newDocName ? colors.primary : colors.border, color: 'white', fontSize: '14px', cursor: newDocName ? 'pointer' : 'not-allowed' }}>Ajouter</button>
          </div>
        </div>
      )}
      
      {/* Liste des documents */}
      <div>
        <h2 style={{ margin: '0 0 16px', fontSize: '14px', fontWeight: 600, color: colors.textSecondary, textTransform: 'uppercase', letterSpacing: '0.5px' }}>Documents ({documents.length})</h2>
        {documents.length === 0 ? (
          <div style={{ padding: '40px', textAlign: 'center', backgroundColor: 'white', borderRadius: '12px', border: `2px dashed ${colors.border}` }}>
            <p style={{ margin: 0, color: colors.textSecondary }}>Aucun document ajouté. Cliquez sur "Ajouter un document" pour commencer.</p>
          </div>
        ) : (
          documents.map(doc => <DocumentRow key={doc.id} doc={doc} onDelete={handleDeleteDocument} />)
        )}
      </div>
    </div>
  );
};

// =============================================================================
// PAGE: ANALYSE CRITIQUE
// =============================================================================

// Carte de finding
const FindingCard = ({ finding, categories, onAction }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);
  const [freeTextResponse, setFreeTextResponse] = useState('');
  
  // Utiliser les catégories passées en prop, ou fallback sur findingCategories
  const categoryData = categories || findingCategories;
  const category = categoryData[finding.category];
  
  // Si la catégorie n'existe pas, utiliser un fallback
  if (!category) {
    console.warn('Category not found:', finding.category);
    return null;
  }
  
  const severityConfig = {
    critical: { label: 'Critique', color: colors.error },
    high: { label: 'Élevé', color: colors.error },
    major: { label: 'Majeur', color: colors.warning },
    medium: { label: 'Moyen', color: colors.warning },
    minor: { label: 'Mineur', color: colors.textSecondary },
    low: { label: 'Faible', color: colors.textSecondary },
  };
  const severity = severityConfig[finding.severity] || severityConfig.medium;
  
  const statusConfig = {
    pending: { label: 'À traiter', color: colors.textSecondary, bg: colors.background },
    resolved: { label: 'Résolu', color: colors.success, bg: colors.successLight },
  };
  const status = statusConfig[finding.status] || statusConfig.pending;
  
  const CategoryIcon = category.icon;
  
  return (
    <div style={{ backgroundColor: 'white', borderRadius: '10px', border: `1px solid ${colors.border}`, marginBottom: '12px', overflow: 'hidden' }}>
      <div style={{ padding: '16px', cursor: 'pointer', borderLeft: `4px solid ${category.color}` }} onClick={() => setIsExpanded(!isExpanded)}>
        <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
          <div style={{ width: '32px', height: '32px', borderRadius: '8px', backgroundColor: category.bg, color: category.color, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
            <CategoryIcon />
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px', flexWrap: 'wrap' }}>
              <span style={{ fontSize: '14px', fontWeight: 600, color: colors.textPrimary }}>{finding.title}</span>
              <span style={{ padding: '2px 6px', borderRadius: '4px', backgroundColor: `${severity.color}20`, color: severity.color, fontSize: '10px', fontWeight: 600, textTransform: 'uppercase' }}>{severity.label}</span>
              <span style={{ padding: '2px 8px', borderRadius: '10px', backgroundColor: status.bg, color: status.color, fontSize: '11px', fontWeight: 500 }}>{status.label}</span>
            </div>
            <p style={{ margin: 0, fontSize: '13px', color: colors.textSecondary, lineHeight: 1.5 }}>{finding.description}</p>
          </div>
          <span style={{ color: colors.textSecondary, transform: isExpanded ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.2s' }}>
            <Icons.ChevronDown />
          </span>
        </div>
      </div>
      
      {isExpanded && (
        <div style={{ padding: '16px', borderTop: `1px solid ${colors.border}`, backgroundColor: colors.background }}>
          {/* Élément concerné (pour URS/FS) */}
          {finding.element && (
            <div style={{ marginBottom: '16px' }}>
              <div style={{ fontSize: '12px', fontWeight: 600, color: colors.textSecondary, marginBottom: '8px', textTransform: 'uppercase' }}>Élément(s) concerné(s)</div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '8px 12px', backgroundColor: 'white', borderRadius: '6px', border: `1px solid ${colors.border}` }}>
                <Icons.FileText style={{ color: colors.primary }} />
                <span style={{ fontSize: '13px', fontWeight: 500, color: colors.textPrimary }}>{finding.element}</span>
                {finding.linkedElement && (
                  <>
                    <Icons.ArrowRight style={{ color: colors.textSecondary, width: 14, height: 14 }} />
                    <span style={{ fontSize: '13px', color: colors.textSecondary }}>Lié à {finding.linkedElement}</span>
                  </>
                )}
              </div>
            </div>
          )}
          
          {/* Suggestion (pour URS/FS) */}
          {finding.suggestion && (
            <div style={{ marginBottom: '16px', padding: '12px 16px', backgroundColor: colors.primaryLight, borderRadius: '8px', borderLeft: `3px solid ${colors.primary}` }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '6px' }}>
                <Icons.Sparkles style={{ color: colors.primary, width: 14, height: 14 }} />
                <span style={{ fontSize: '11px', fontWeight: 600, color: colors.primary, textTransform: 'uppercase' }}>Suggestion</span>
              </div>
              <p style={{ margin: 0, fontSize: '13px', color: colors.textPrimary, lineHeight: 1.5 }}>{finding.suggestion}</p>
            </div>
          )}
          
          {/* Sources (pour Documents) */}
          {finding.sources && finding.sources.length > 0 && (
            <div style={{ marginBottom: '16px' }}>
              <div style={{ fontSize: '12px', fontWeight: 600, color: colors.textSecondary, marginBottom: '8px', textTransform: 'uppercase' }}>Sources</div>
              {finding.sources.map((source, idx) => (
                <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '8px 12px', backgroundColor: 'white', borderRadius: '6px', marginBottom: '4px', border: `1px solid ${colors.border}` }}>
                  <Icons.FileText style={{ color: colors.textSecondary }} />
                  <span style={{ fontSize: '13px', color: colors.textPrimary }}>{source.doc}</span>
                  <span style={{ fontSize: '12px', color: colors.textSecondary }}>• {source.pages}</span>
                </div>
              ))}
            </div>
          )}
          
          {/* Excerpt (pour Documents) */}
          {finding.excerpt && (
            <div style={{ marginBottom: '16px', padding: '12px 16px', backgroundColor: colors.warningLight, borderRadius: '8px', borderLeft: `3px solid ${colors.warning}` }}>
              <pre style={{ margin: 0, fontSize: '12px', color: colors.textPrimary, whiteSpace: 'pre-wrap', fontFamily: 'inherit' }}>{finding.excerpt}</pre>
            </div>
          )}
          
          {/* Résolution */}
          {finding.status === 'resolved' && (
            <div style={{ padding: '12px 16px', backgroundColor: colors.successLight, borderRadius: '8px', display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
              <Icons.CheckCircle style={{ color: colors.success }} />
              <div>
                <div style={{ fontSize: '13px', fontWeight: 500, color: colors.success }}>{finding.resolution ? `Résolu le ${finding.resolvedAt}` : 'Résolu'}</div>
                {finding.resolution && <div style={{ fontSize: '13px', color: colors.textPrimary }}>{finding.resolution}</div>}
              </div>
            </div>
          )}
          
          {/* Actions pour findings non résolus */}
          {finding.status !== 'resolved' && (
            <div style={{ display: 'flex', gap: '8px' }}>
              <button style={{ padding: '8px 16px', borderRadius: '6px', border: 'none', backgroundColor: colors.success, color: 'white', fontSize: '12px', fontWeight: 500, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px' }}>
                <Icons.Check /> Marquer résolu
              </button>
              <button style={{ padding: '8px 16px', borderRadius: '6px', border: `1px solid ${colors.border}`, backgroundColor: 'white', color: colors.textSecondary, fontSize: '12px', fontWeight: 500, cursor: 'pointer' }}>
                Ignorer
              </button>
            </div>
          )}
          
          {/* Question IA (pour Documents) */}
          {finding.status !== 'resolved' && finding.aiQuestion && (
            <div style={{ padding: '16px', backgroundColor: colors.primaryLight, borderRadius: '8px', border: `1px solid ${colors.primary}30`, marginTop: '16px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
                <Icons.Sparkles style={{ color: colors.primary }} />
                <span style={{ fontSize: '13px', fontWeight: 600, color: colors.primary }}>Assistant IA</span>
              </div>
              <p style={{ margin: '0 0 12px', fontSize: '14px', color: colors.textPrimary }}>{finding.aiQuestion.question}</p>
              
              {finding.aiQuestion.type === 'choice' && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  {finding.aiQuestion.options.map(option => (
                    <button
                      key={option.id}
                      onClick={() => setSelectedOption(option.id)}
                      style={{
                        padding: '12px 16px',
                        borderRadius: '8px',
                        border: selectedOption === option.id ? `2px solid ${colors.primary}` : `1px solid ${colors.border}`,
                        backgroundColor: selectedOption === option.id ? colors.primaryLight : 'white',
                        color: colors.textPrimary,
                        fontSize: '13px',
                        textAlign: 'left',
                        cursor: 'pointer',
                      }}
                    >
                      {option.label}
                    </button>
                  ))}
                </div>
              )}
              
              {finding.aiQuestion.type === 'freetext' && (
                <div>
                  <textarea
                    value={freeTextResponse}
                    onChange={(e) => setFreeTextResponse(e.target.value)}
                    placeholder={finding.aiQuestion.placeholder}
                    style={{ width: '100%', minHeight: '80px', padding: '12px', borderRadius: '8px', border: `1px solid ${colors.border}`, fontSize: '13px', resize: 'vertical', fontFamily: 'inherit', marginBottom: '12px', outline: 'none' }}
                  />
                  <button
                    disabled={!freeTextResponse.trim()}
                    style={{ padding: '10px 20px', borderRadius: '8px', border: 'none', backgroundColor: freeTextResponse.trim() ? colors.primary : colors.border, color: 'white', fontSize: '13px', fontWeight: 500, cursor: freeTextResponse.trim() ? 'pointer' : 'not-allowed', display: 'flex', alignItems: 'center', gap: '6px' }}
                  >
                    <Icons.Send /> Envoyer
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

// Contenu page Analyse critique
const CriticalAnalysisContent = ({ onBack }) => {
  const [activeTab, setActiveTab] = useState('missing');
  const [findings] = useState(mockFindings);
  const [statusFilter, setStatusFilter] = useState('all');
  
  const filteredFindings = findings.filter(f => {
    if (f.category !== activeTab) return false;
    if (statusFilter === 'pending') return f.status === 'pending';
    if (statusFilter === 'resolved') return f.status === 'resolved';
    return true;
  });
  
  const countByCategory = (cat) => findings.filter(f => f.category === cat).length;
  const countPendingByCategory = (cat) => findings.filter(f => f.category === cat && f.status !== 'resolved').length;
  const totalPending = findings.filter(f => f.status !== 'resolved').length;

  return (
    <div style={{ flex: 1, padding: '24px', overflow: 'auto', backgroundColor: colors.background, height: 'calc(100vh - 56px)' }}>
      {/* Header */}
      <div style={{ marginBottom: '24px' }}>
        <button onClick={onBack} style={{ display: 'flex', alignItems: 'center', gap: '6px', padding: '8px 12px', marginBottom: '16px', borderRadius: '6px', border: `1px solid ${colors.border}`, backgroundColor: 'white', color: colors.textSecondary, fontSize: '13px', cursor: 'pointer' }}>
          <Icons.ArrowLeft /> Retour aux documents
        </button>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div>
            <h1 style={{ margin: 0, fontSize: '24px', fontWeight: 700, color: colors.textPrimary }}>Analyse critique</h1>
            <p style={{ margin: '8px 0 0', fontSize: '14px', color: colors.textSecondary }}>{findings.length} findings identifiés • {totalPending} à traiter</p>
          </div>
          <button style={{ padding: '10px 16px', borderRadius: '8px', border: 'none', backgroundColor: colors.primary, color: 'white', fontSize: '13px', fontWeight: 500, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px' }}>
            <Icons.RefreshCw /> Relancer l'analyse
          </button>
        </div>
      </div>
      
      {/* Tabs catégories */}
      <div style={{ display: 'flex', gap: '8px', marginBottom: '20px', flexWrap: 'wrap' }}>
        {Object.entries(findingCategories).map(([key, cat]) => {
          const count = countByCategory(key);
          const pending = countPendingByCategory(key);
          const isActive = activeTab === key;
          const CatIcon = cat.icon;
          return (
            <button
              key={key}
              onClick={() => setActiveTab(key)}
              style={{
                padding: '10px 16px',
                borderRadius: '8px',
                border: isActive ? `2px solid ${cat.color}` : `1px solid ${colors.border}`,
                backgroundColor: isActive ? cat.bg : 'white',
                color: isActive ? cat.color : colors.textSecondary,
                fontSize: '13px',
                fontWeight: 500,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
              }}
            >
              <CatIcon />
              {cat.label}
              <span style={{ padding: '2px 8px', borderRadius: '10px', backgroundColor: isActive ? cat.color : colors.background, color: isActive ? 'white' : colors.textSecondary, fontSize: '11px', fontWeight: 600 }}>
                {pending > 0 ? pending : count}
              </span>
            </button>
          );
        })}
      </div>
      
      {/* Filtre statut */}
      <div style={{ display: 'flex', gap: '8px', marginBottom: '20px' }}>
        {[{ id: 'all', label: 'Tous' }, { id: 'pending', label: 'À traiter' }, { id: 'resolved', label: 'Résolus' }].map(filter => (
          <button
            key={filter.id}
            onClick={() => setStatusFilter(filter.id)}
            style={{
              padding: '6px 12px',
              borderRadius: '6px',
              border: 'none',
              backgroundColor: statusFilter === filter.id ? colors.textPrimary : colors.background,
              color: statusFilter === filter.id ? 'white' : colors.textSecondary,
              fontSize: '12px',
              fontWeight: 500,
              cursor: 'pointer',
            }}
          >
            {filter.label}
          </button>
        ))}
      </div>
      
      {/* Liste des findings */}
      {filteredFindings.length === 0 ? (
        <div style={{ padding: '40px', textAlign: 'center', backgroundColor: 'white', borderRadius: '12px', border: `1px solid ${colors.border}` }}>
          <p style={{ margin: 0, color: colors.textSecondary }}>Aucun finding dans cette catégorie</p>
        </div>
      ) : (
        filteredFindings.map(finding => <FindingCard key={finding.id} finding={finding} />)
      )}
    </div>
  );
};

// =============================================================================
// SYSTÈME DE VALIDATION & SIGNATURES (UNIFIÉ)
// =============================================================================

// Statuts de validation
const validationStatuses = {
  draft: { label: 'En rédaction', color: colors.textSecondary, bgColor: colors.background, icon: '✏️' },
  validated: { label: 'Validé', color: colors.primary, bgColor: colors.primaryLight, icon: '✓' },
  signed: { label: 'Signé', color: colors.success, bgColor: colors.successLight, icon: '✅' },
};

// Données de validation pour chaque étape du projet
const validationData = {
  svp: {
    id: 'svp',
    name: 'Plan de Validation (SVP)',
    shortName: 'SVP',
    status: 'draft',
    approver: { name: 'Jean Dupont', initials: 'JD', role: 'UPM' },
    validatedAt: '2024-11-12',
    validatedBy: { name: 'Jean Dupont', initials: 'JD' },
    signatures: [
      { id: 1, name: 'Jean Dupont', role: 'UPM', initials: 'JD', status: 'signed', signedAt: '2024-11-15 10:30' },
      { id: 2, name: 'Marie Lambert', role: 'QA Manager', initials: 'ML', status: 'signed', signedAt: '2024-11-15 14:45' },
    ],
    signedAt: '2024-11-15',
    document: { name: 'SVP_LIMS_v3.2_signed.pdf', generatedAt: '2024-11-15', size: '245 KB' },
    criticalAnalysis: null, // SVP n'a pas d'analyse critique
  },
  urs: {
    id: 'urs',
    name: 'Besoins métier (URS)',
    shortName: 'URS',
    status: 'signed',
    approver: { name: 'Pierre Thomas', initials: 'PT', role: 'Business Owner' },
    validatedAt: '2024-11-17',
    validatedBy: { name: 'Pierre Thomas', initials: 'PT' },
    signatures: [
      { id: 1, name: 'Pierre Thomas', role: 'Business Owner', initials: 'PT', status: 'signed', signedAt: '2024-11-18 09:00' },
      { id: 2, name: 'Marie Lambert', role: 'QA Manager', initials: 'ML', status: 'signed', signedAt: '2024-11-18 11:30' },
      { id: 3, name: 'Jean Dupont', role: 'UPM', initials: 'JD', status: 'signed', signedAt: '2024-11-18 14:00' },
    ],
    signedAt: '2024-11-18',
    document: { name: 'URS_LIMS_v3.2_signed.pdf', generatedAt: '2024-11-18', size: '312 KB' },
    criticalAnalysis: { status: 'ok', lastRun: '2024-11-17', findings: 0 },
    dependsOn: [], // URS est le premier de la chaîne
    triggers: ['fs'], // Réouvrir URS réouvre FS (et par cascade FRA)
  },
  fs: {
    id: 'fs',
    name: 'Spécifications Fonctionnelles (FS)',
    shortName: 'FS',
    status: 'validated',
    approver: { name: 'Sophie Laurent', initials: 'SL', role: 'Lead Dev' },
    validatedAt: '2024-11-26',
    validatedBy: { name: 'Sophie Laurent', initials: 'SL' },
    signatures: [
      { id: 1, name: 'Sophie Laurent', role: 'Lead Dev', initials: 'SL', status: 'signed', signedAt: '2024-11-28 10:00' },
      { id: 2, name: 'Marie Lambert', role: 'QA Manager', initials: 'ML', status: 'pending', signedAt: null },
      { id: 3, name: 'Pierre Thomas', role: 'Business Owner', initials: 'PT', status: 'pending', signedAt: null },
    ],
    signedAt: null,
    document: { name: 'FS_LIMS_v3.2_draft.pdf', generatedAt: '2024-11-28', size: '456 KB' },
    criticalAnalysis: { status: 'ok', lastRun: '2024-11-25', findings: 2 },
    dependsOn: ['urs'],
    triggers: ['fra'],
  },
  fra: {
    id: 'fra',
    name: 'Analyse des risques (FRA)',
    shortName: 'FRA',
    status: 'draft',
    approver: { name: 'Marie Lambert', initials: 'ML', role: 'QA Manager' },
    validatedAt: null,
    validatedBy: null,
    signatures: [
      { id: 1, name: 'Marie Lambert', role: 'QA Manager', initials: 'ML', status: 'pending', signedAt: null },
      { id: 2, name: 'Jean Dupont', role: 'UPM', initials: 'JD', status: 'pending', signedAt: null },
    ],
    signedAt: null,
    document: { name: 'FRA_LIMS_v3.2_draft.xlsx', generatedAt: '2024-11-25', size: '128 KB' },
    criticalAnalysis: null, // FRA n'a pas d'analyse critique
    dependsOn: ['fs'],
    triggers: [],
  },
  protocols: {
    id: 'protocols',
    name: 'Protocoles de test',
    shortName: 'Protocoles',
    status: 'draft',
    approver: { name: 'Alain Bernard', initials: 'AB', role: 'Validation Lead' },
    validatedAt: null,
    validatedBy: null,
    signatures: [],
    signedAt: null,
    document: null,
    criticalAnalysis: null,
  },
  vsr: {
    id: 'vsr',
    name: 'Rapport de validation (VSR)',
    shortName: 'VSR',
    status: 'draft',
    approver: { name: 'Jean Dupont', initials: 'JD', role: 'UPM' },
    validatedAt: null,
    validatedBy: null,
    signatures: [],
    signedAt: null,
    document: null,
    criticalAnalysis: null,
  },
};

// Badge de statut de validation
const ValidationStatusBadge = ({ status, size = 'normal' }) => {
  const config = validationStatuses[status] || validationStatuses.draft;
  const padding = size === 'small' ? '4px 8px' : '6px 12px';
  const fontSize = size === 'small' ? '11px' : '12px';
  
  return (
    <span style={{
      display: 'inline-flex',
      alignItems: 'center',
      gap: '6px',
      padding,
      borderRadius: '6px',
      backgroundColor: config.bgColor,
      color: config.color,
      fontSize,
      fontWeight: 600,
    }}>
      <span>{config.icon}</span>
      {config.label}
    </span>
  );
};

// =============================================================================
// NOUVEAU SYSTÈME DE WORKFLOW DE VALIDATION (COMPACT)
// =============================================================================

// Modal de confirmation de réouverture
const ReopenConfirmModal = ({ isOpen, onClose, onConfirm, stepName, cascadeSteps = [] }) => {
  const [reason, setReason] = useState('');
  
  if (!isOpen) return null;
  
  const handleConfirm = () => {
    if (reason.trim()) {
      onConfirm(reason);
      setReason('');
    }
  };
  
  return (
    <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, zIndex: 1100, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div onClick={onClose} style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.5)' }} />
      <div style={{ position: 'relative', backgroundColor: 'white', borderRadius: '16px', padding: '24px', width: '480px', maxWidth: '90vw', boxShadow: '0 20px 60px rgba(0,0,0,0.3)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '20px' }}>
          <div style={{ width: '48px', height: '48px', borderRadius: '12px', backgroundColor: colors.warningLight, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '24px' }}>⚠️</div>
          <div>
            <h3 style={{ margin: 0, fontSize: '18px', fontWeight: 700, color: colors.textPrimary }}>Réouverture du document</h3>
            <p style={{ margin: '4px 0 0', fontSize: '13px', color: colors.textSecondary }}>{stepName}</p>
          </div>
        </div>
        
        <div style={{ padding: '16px', backgroundColor: colors.warningLight, borderRadius: '10px', marginBottom: '20px' }}>
          <p style={{ margin: '0 0 12px', fontSize: '13px', color: colors.textPrimary, fontWeight: 500 }}>Cette action va :</p>
          <ul style={{ margin: 0, paddingLeft: '20px', fontSize: '13px', color: colors.textPrimary, lineHeight: 1.8 }}>
            <li>Annuler la validation actuelle</li>
            <li>Invalider les signatures collectées</li>
            <li>Réinitialiser les statuts QA OK des éléments</li>
            <li>Marquer l'analyse critique comme "Obsolète"</li>
            {cascadeSteps.length > 0 && (
              <li style={{ color: colors.error, fontWeight: 500 }}>
                Réouvrir également : {cascadeSteps.join(', ')}
              </li>
            )}
          </ul>
        </div>
        
        <div style={{ marginBottom: '20px' }}>
          <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: colors.textPrimary, marginBottom: '8px' }}>
            Motif de réouverture <span style={{ color: colors.error }}>*</span>
          </label>
          <textarea
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            placeholder="Décrivez la raison de cette réouverture (audit trail)..."
            rows={3}
            style={{ width: '100%', padding: '12px', borderRadius: '8px', border: `1px solid ${colors.border}`, fontSize: '13px', resize: 'none', fontFamily: 'inherit', outline: 'none' }}
          />
        </div>
        
        <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end' }}>
          <button onClick={onClose} style={{ padding: '10px 20px', borderRadius: '8px', border: `1px solid ${colors.border}`, backgroundColor: 'white', color: colors.textSecondary, fontSize: '13px', fontWeight: 500, cursor: 'pointer' }}>Annuler</button>
          <button onClick={handleConfirm} disabled={!reason.trim()} style={{ padding: '10px 20px', borderRadius: '8px', border: 'none', backgroundColor: reason.trim() ? colors.warning : colors.background, color: reason.trim() ? 'white' : colors.textSecondary, fontSize: '13px', fontWeight: 600, cursor: reason.trim() ? 'pointer' : 'not-allowed' }}>Confirmer la réouverture</button>
        </div>
      </div>
    </div>
  );
};

// Panel latéral de détails du workflow
const ValidationDetailPanel = ({ isOpen, onClose, stepData, onReopen, userRole }) => {
  if (!isOpen || !stepData) return null;
  
  const signedCount = stepData.signatures?.filter(s => s.status === 'signed').length || 0;
  const canReopen = (userRole === 'metier' || userRole === 'qualite') && stepData.status !== 'draft';
  
  // Historique de validation
  const history = [
    stepData.signedAt && { type: 'signed', action: 'Document signé', date: stepData.signedAt, user: 'Tous les signataires' },
    stepData.validatedAt && { type: 'validated', action: 'Validé par l\'approbateur', date: stepData.validatedAt, user: stepData.validatedBy?.name },
    { type: 'created', action: 'Création du document', date: '2024-11-10', user: 'Jean Dupont' },
  ].filter(Boolean);
  
  return (
    <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, zIndex: 1000 }}>
      <div onClick={onClose} style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.3)' }} />
      <div style={{ position: 'absolute', top: 0, right: 0, bottom: 0, width: '450px', maxWidth: '100vw', backgroundColor: 'white', boxShadow: '-4px 0 20px rgba(0,0,0,0.15)', display: 'flex', flexDirection: 'column' }}>
        {/* Header */}
        <div style={{ padding: '20px', borderBottom: `1px solid ${colors.border}`, backgroundColor: colors.primaryLight }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
            <h2 style={{ margin: 0, fontSize: '18px', fontWeight: 700, color: colors.textPrimary }}>Détails du workflow</h2>
            <button onClick={onClose} style={{ width: '32px', height: '32px', borderRadius: '8px', border: 'none', backgroundColor: 'white', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', color: colors.textSecondary }}><Icons.X /></button>
          </div>
          <p style={{ margin: 0, fontSize: '14px', color: colors.textSecondary }}>{stepData.name}</p>
        </div>
        
        {/* Content */}
        <div style={{ flex: 1, overflow: 'auto', padding: '20px' }}>
          {/* Statut actuel */}
          <div style={{ marginBottom: '24px' }}>
            <label style={{ fontSize: '11px', fontWeight: 600, color: colors.textSecondary, textTransform: 'uppercase', letterSpacing: '0.5px', display: 'block', marginBottom: '8px' }}>Statut actuel</label>
            <ValidationStatusBadge status={stepData.status} />
          </div>
          
          {/* Approbateur */}
          <div style={{ marginBottom: '24px' }}>
            <label style={{ fontSize: '11px', fontWeight: 600, color: colors.textSecondary, textTransform: 'uppercase', letterSpacing: '0.5px', display: 'block', marginBottom: '8px' }}>Approbateur</label>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '12px', backgroundColor: colors.background, borderRadius: '8px' }}>
              <div style={{ width: '36px', height: '36px', borderRadius: '50%', backgroundColor: colors.primaryLight, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '13px', fontWeight: 600, color: colors.primary }}>{stepData.approver?.initials}</div>
              <div>
                <div style={{ fontSize: '14px', fontWeight: 500, color: colors.textPrimary }}>{stepData.approver?.name}</div>
                <div style={{ fontSize: '12px', color: colors.textSecondary }}>{stepData.approver?.role}</div>
              </div>
            </div>
          </div>
          
          {/* Signatures */}
          {stepData.signatures?.length > 0 && (
            <div style={{ marginBottom: '24px' }}>
              <label style={{ fontSize: '11px', fontWeight: 600, color: colors.textSecondary, textTransform: 'uppercase', letterSpacing: '0.5px', display: 'block', marginBottom: '8px' }}>Signatures ({signedCount}/{stepData.signatures.length})</label>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {stepData.signatures.map(sig => (
                  <div key={sig.id} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '10px 12px', backgroundColor: colors.background, borderRadius: '8px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <div style={{ width: '32px', height: '32px', borderRadius: '50%', backgroundColor: sig.status === 'signed' ? colors.successLight : colors.warningLight, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '11px', fontWeight: 600, color: sig.status === 'signed' ? colors.success : colors.warning }}>{sig.initials}</div>
                      <div>
                        <div style={{ fontSize: '13px', fontWeight: 500, color: colors.textPrimary }}>{sig.name}</div>
                        <div style={{ fontSize: '11px', color: colors.textSecondary }}>{sig.role}</div>
                      </div>
                    </div>
                    <div style={{ textAlign: 'right' }}>
                      {sig.status === 'signed' ? (
                        <>
                          <div style={{ fontSize: '12px', fontWeight: 600, color: colors.success }}>✓ Signé</div>
                          <div style={{ fontSize: '10px', color: colors.textSecondary }}>{sig.signedAt}</div>
                        </>
                      ) : (
                        <div style={{ fontSize: '12px', fontWeight: 500, color: colors.warning }}>⏳ En attente</div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
          
          {/* Document */}
          {stepData.document && (
            <div style={{ marginBottom: '24px' }}>
              <label style={{ fontSize: '11px', fontWeight: 600, color: colors.textSecondary, textTransform: 'uppercase', letterSpacing: '0.5px', display: 'block', marginBottom: '8px' }}>Document généré</label>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px', backgroundColor: colors.background, borderRadius: '8px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <Icons.FileText style={{ color: colors.primary }} />
                  <div>
                    <div style={{ fontSize: '13px', fontWeight: 500, color: colors.textPrimary }}>{stepData.document.name}</div>
                    <div style={{ fontSize: '11px', color: colors.textSecondary }}>{stepData.document.size} • {stepData.document.generatedAt}</div>
                  </div>
                </div>
                <button style={{ padding: '6px 12px', borderRadius: '6px', border: `1px solid ${colors.border}`, backgroundColor: 'white', cursor: 'pointer', fontSize: '12px', color: colors.primary, display: 'flex', alignItems: 'center', gap: '4px' }}><Icons.Download /> Télécharger</button>
              </div>
            </div>
          )}
          
          {/* Historique */}
          <div style={{ marginBottom: '24px' }}>
            <label style={{ fontSize: '11px', fontWeight: 600, color: colors.textSecondary, textTransform: 'uppercase', letterSpacing: '0.5px', display: 'block', marginBottom: '8px' }}>Historique</label>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0' }}>
              {history.map((event, i) => (
                <div key={i} style={{ display: 'flex', gap: '12px', padding: '10px 0', borderBottom: i < history.length - 1 ? `1px solid ${colors.border}` : 'none' }}>
                  <div style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: i === 0 ? colors.primary : colors.border, marginTop: '6px' }} />
                  <div>
                    <div style={{ fontSize: '13px', color: colors.textPrimary }}>{event.action}</div>
                    <div style={{ fontSize: '11px', color: colors.textSecondary }}>{event.user} • {event.date}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        
        {/* Footer actions */}
        {canReopen && (
          <div style={{ padding: '16px 20px', borderTop: `1px solid ${colors.border}`, backgroundColor: colors.background }}>
            <button onClick={onReopen} style={{ width: '100%', padding: '12px', borderRadius: '8px', border: `1px solid ${colors.warning}`, backgroundColor: colors.warningLight, color: colors.warning, fontSize: '13px', fontWeight: 600, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
              <Icons.RefreshCw /> Réouvrir le document
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

// Composant workflow de validation COMPACT (bandeau en haut des pages)
const ValidationWorkflowCompact = ({ 
  stepId, 
  status, 
  approver, 
  signatures = [], 
  userRole = 'metier',
  isApprover = false,
  onApprove, 
  onRequestApproval,
  onReopen,
  onOpenDetails 
}) => {
  const getCurrentStep = () => {
    if (status === 'draft') return 0;
    if (status === 'validated') return 1;
    if (status === 'signed') return 2;
    return 0;
  };
  
  const currentStep = getCurrentStep();
  const signedCount = signatures.filter(s => s.status === 'signed').length;
  
  const steps = [
    { id: 0, label: 'Rédaction' },
    { id: 1, label: 'Validé' },
    { id: 2, label: 'Signé' },
  ];
  
  return (
    <div style={{ 
      backgroundColor: 'white', 
      borderRadius: '10px', 
      border: `1px solid ${colors.border}`, 
      padding: '12px 20px',
      marginBottom: '16px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      gap: '16px',
      flexWrap: 'wrap'
    }}>
      {/* Left: Status badge + Stepper */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
        <ValidationStatusBadge status={status} size="small" />
        
        {/* Mini stepper */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
          {steps.map((step, index) => {
            const isCompleted = index < currentStep || (index === currentStep && status === 'signed');
            const isCurrent = index === currentStep && status !== 'signed';
            
            return (
              <React.Fragment key={step.id}>
                {index > 0 && (
                  <div style={{ 
                    width: '24px', 
                    height: '2px', 
                    backgroundColor: isCompleted ? colors.primary : colors.border,
                    borderRadius: '1px'
                  }} />
                )}
                <div style={{
                  width: '20px',
                  height: '20px',
                  borderRadius: '50%',
                  backgroundColor: isCompleted ? colors.primary : isCurrent ? colors.primaryLight : colors.background,
                  border: `2px solid ${isCompleted || isCurrent ? colors.primary : colors.border}`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '10px',
                  fontWeight: 600,
                  color: isCompleted ? 'white' : isCurrent ? colors.primary : colors.textSecondary,
                }}>
                  {isCompleted ? '✓' : index + 1}
                </div>
              </React.Fragment>
            );
          })}
        </div>
        
        {/* Signatures count if in signature phase */}
        {status === 'validated' && signatures.length > 0 && (
          <span style={{ fontSize: '12px', color: colors.textSecondary }}>
            ✍️ {signedCount}/{signatures.length} signatures
          </span>
        )}
      </div>
      
      {/* Center: Approver info */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        <span style={{ fontSize: '12px', color: colors.textSecondary }}>Approbateur :</span>
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          <div style={{ 
            width: '24px', 
            height: '24px', 
            borderRadius: '50%', 
            backgroundColor: colors.primaryLight, 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center', 
            fontSize: '10px', 
            fontWeight: 600, 
            color: colors.primary 
          }}>
            {approver?.initials}
          </div>
          <span style={{ fontSize: '13px', fontWeight: 500, color: colors.textPrimary }}>{approver?.name}</span>
        </div>
      </div>
      
      {/* Right: Actions */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        {status === 'draft' && (
          isApprover ? (
            <button onClick={onApprove} style={{ padding: '8px 14px', borderRadius: '6px', border: 'none', backgroundColor: colors.success, color: 'white', fontSize: '12px', fontWeight: 600, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <Icons.Check /> Approuver
            </button>
          ) : (
            <button onClick={onRequestApproval} style={{ padding: '8px 14px', borderRadius: '6px', border: `1px solid ${colors.primary}`, backgroundColor: 'white', color: colors.primary, fontSize: '12px', fontWeight: 500, cursor: 'pointer' }}>
              Demander validation
            </button>
          )
        )}
        
        {status === 'validated' && (
          <button style={{ padding: '8px 14px', borderRadius: '6px', border: 'none', backgroundColor: colors.accent, color: 'white', fontSize: '12px', fontWeight: 600, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px' }}>
            ✍️ Signer via DocuSign
          </button>
        )}
        
        {status === 'signed' && (
          <span style={{ fontSize: '12px', color: colors.success, fontWeight: 500 }}>✅ Finalisé</span>
        )}
        
        <button 
          onClick={onOpenDetails}
          style={{ 
            padding: '8px', 
            borderRadius: '6px', 
            border: `1px solid ${colors.border}`, 
            backgroundColor: 'white', 
            color: colors.textSecondary, 
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          <Icons.MoreHorizontal />
        </button>
      </div>
    </div>
  );
};

// Bandeau d'analyse critique
const CriticalAnalysisBanner = ({ status, lastRun, findings, onLaunchAnalysis }) => {
  // status: 'none' | 'obsolete' | 'running' | 'ok' | 'issues'
  const getStatusConfig = () => {
    switch (status) {
      case 'none':
        return { icon: '🔍', label: 'Non effectuée', color: colors.textSecondary, bgColor: colors.background };
      case 'obsolete':
        return { icon: '⚠️', label: 'Obsolète', color: colors.warning, bgColor: colors.warningLight };
      case 'running':
        return { icon: '⏳', label: 'En cours...', color: colors.primary, bgColor: colors.primaryLight };
      case 'ok':
        return { icon: '✅', label: findings > 0 ? `${findings} finding${findings > 1 ? 's' : ''} résolu${findings > 1 ? 's' : ''}` : 'Aucun problème', color: colors.success, bgColor: colors.successLight };
      case 'issues':
        return { icon: '🔴', label: `${findings} finding${findings > 1 ? 's' : ''} à traiter`, color: colors.error, bgColor: colors.errorLight };
      default:
        return { icon: '🔍', label: 'Non effectuée', color: colors.textSecondary, bgColor: colors.background };
    }
  };
  
  const config = getStatusConfig();
  const isClickable = status !== 'running';
  
  return (
    <button
      onClick={isClickable ? onLaunchAnalysis : undefined}
      disabled={!isClickable}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '10px',
        padding: '8px 14px',
        backgroundColor: config.bgColor,
        borderRadius: '8px',
        border: `1px solid ${config.color}40`,
        cursor: isClickable ? 'pointer' : 'default',
        transition: 'all 0.2s',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
        <span>{config.icon}</span>
        <span style={{ fontSize: '12px', fontWeight: 500, color: config.color }}>Analyse critique : {config.label}</span>
        {lastRun && status !== 'none' && status !== 'running' && (
          <span style={{ fontSize: '11px', color: colors.textSecondary }}>• {lastRun}</span>
        )}
      </div>
      
      {isClickable && (
        <span style={{
          padding: '3px 8px',
          borderRadius: '4px',
          backgroundColor: status === 'obsolete' || status === 'issues' ? colors.primary : 'white',
          color: status === 'obsolete' || status === 'issues' ? 'white' : colors.primary,
          fontSize: '11px',
          fontWeight: 600,
        }}>
          {status === 'none' || status === 'obsolete' ? 'Lancer' : 'Voir'} →
        </span>
      )}
    </button>
  );
};

// Données des findings pour l'analyse critique URS
const ursFindingCategories = {
  incomplete: { label: 'Incomplètes', color: colors.error, bg: colors.errorLight, icon: Icons.AlertCircle },
  duplicates: { label: 'Doublons potentiels', color: colors.warning, bg: colors.warningLight, icon: Icons.Copy },
  inconsistent: { label: 'Incohérences', color: '#F59E0B', bg: '#FEF3C7', icon: Icons.AlertTriangle },
};

const mockURSFindings = [
  { id: 1, category: 'incomplete', severity: 'high', title: 'URS-008 : Description manquante', description: 'L\'exigence URS-008 n\'a pas de description détaillée.', element: 'URS-008', status: 'pending', suggestion: 'Ajouter une description claire des besoins métier.' },
  { id: 2, category: 'incomplete', severity: 'medium', title: 'URS-012 : Source non renseignée', description: 'Aucune source documentaire n\'est liée à cette exigence.', element: 'URS-012', status: 'pending', suggestion: 'Lier le document source ou indiquer "Entretien utilisateur".' },
  { id: 3, category: 'duplicates', severity: 'medium', title: 'URS-003 et URS-015 similaires', description: 'Ces deux exigences semblent couvrir le même besoin d\'authentification.', element: 'URS-003, URS-015', status: 'pending', suggestion: 'Fusionner ces exigences ou clarifier leurs différences.' },
  { id: 4, category: 'inconsistent', severity: 'high', title: 'Contradiction URS-005 / URS-009', description: 'URS-005 demande un délai de session de 30 min, URS-009 indique 15 min.', element: 'URS-005, URS-009', status: 'resolved', suggestion: 'Harmoniser les délais de session.' },
];

// Données des findings pour l'analyse critique FS
const fsFindingCategories = {
  incomplete: { label: 'Incomplètes', color: colors.error, bg: colors.errorLight, icon: Icons.AlertCircle },
  duplicates: { label: 'Doublons potentiels', color: colors.warning, bg: colors.warningLight, icon: Icons.Copy },
  inconsistent: { label: 'Incohérences/Contradictions', color: '#F59E0B', bg: '#FEF3C7', icon: Icons.AlertTriangle },
  untestable: { label: 'Non testables', color: colors.purple, bg: colors.purpleLight, icon: Icons.HelpCircle },
};

const mockFSFindings = [
  { id: 1, category: 'incomplete', severity: 'medium', title: 'FS-011 : Description trop vague', description: 'La description "Gérer les utilisateurs" manque de détails fonctionnels.', element: 'FS-011', status: 'pending', suggestion: 'Préciser les actions CRUD et les règles de gestion.' },
  { id: 2, category: 'duplicates', severity: 'medium', title: 'FS-002 et FS-014 similaires', description: 'Ces deux spécifications couvrent le même périmètre de gestion des droits.', element: 'FS-002, FS-014', status: 'pending', suggestion: 'Fusionner ces spécifications ou clarifier leurs différences.' },
  { id: 3, category: 'inconsistent', severity: 'high', title: 'FS-004 incohérente avec URS-002', description: 'La spécification mentionne SSO uniquement, alors que l\'URS demande aussi MFA.', element: 'FS-004', linkedElement: 'URS-002', status: 'pending', suggestion: 'Ajouter les spécifications MFA dans FS-004.' },
  { id: 4, category: 'inconsistent', severity: 'high', title: 'FS-003 vs FS-008 : Formats de date contradictoires', description: 'FS-003 spécifie DD/MM/YYYY, FS-008 indique YYYY-MM-DD.', element: 'FS-003, FS-008', status: 'resolved', suggestion: 'Standardiser le format de date dans tout le système.' },
  { id: 5, category: 'untestable', severity: 'medium', title: 'FS-007 : Critères d\'acceptation manquants', description: 'Aucun critère mesurable n\'est défini pour valider cette spécification.', element: 'FS-007', status: 'pending', suggestion: 'Définir des critères Given/When/Then.' },
];

// Page d'analyse critique URS
const URSCriticalAnalysisContent = ({ onBack }) => {
  const [activeTab, setActiveTab] = useState('incomplete');
  const [findings] = useState(mockURSFindings);
  const [statusFilter, setStatusFilter] = useState('all');
  
  const filteredFindings = findings.filter(f => {
    if (f.category !== activeTab) return false;
    if (statusFilter === 'pending') return f.status === 'pending';
    if (statusFilter === 'resolved') return f.status === 'resolved';
    return true;
  });
  
  const countByCategory = (cat) => findings.filter(f => f.category === cat).length;
  const countPendingByCategory = (cat) => findings.filter(f => f.category === cat && f.status !== 'resolved').length;
  const totalPending = findings.filter(f => f.status !== 'resolved').length;

  return (
    <div style={{ flex: 1, padding: '24px', overflow: 'auto', backgroundColor: colors.background, height: 'calc(100vh - 56px)' }}>
      {/* Header */}
      <div style={{ marginBottom: '24px' }}>
        <button onClick={onBack} style={{ display: 'flex', alignItems: 'center', gap: '6px', padding: '8px 12px', marginBottom: '16px', borderRadius: '6px', border: `1px solid ${colors.border}`, backgroundColor: 'white', color: colors.textSecondary, fontSize: '13px', cursor: 'pointer' }}>
          <Icons.ArrowLeft /> Retour aux URS
        </button>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div>
            <h1 style={{ margin: 0, fontSize: '24px', fontWeight: 700, color: colors.textPrimary }}>Analyse critique — URS</h1>
            <p style={{ margin: '8px 0 0', fontSize: '14px', color: colors.textSecondary }}>{findings.length} findings identifiés • {totalPending} à traiter</p>
          </div>
          <button style={{ padding: '10px 16px', borderRadius: '8px', border: 'none', backgroundColor: colors.primary, color: 'white', fontSize: '13px', fontWeight: 500, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px' }}>
            <Icons.RefreshCw /> Relancer l'analyse
          </button>
        </div>
      </div>
      
      {/* Tabs catégories */}
      <div style={{ display: 'flex', gap: '8px', marginBottom: '20px', flexWrap: 'wrap' }}>
        {Object.entries(ursFindingCategories).map(([key, cat]) => {
          const count = countByCategory(key);
          const pending = countPendingByCategory(key);
          const isActive = activeTab === key;
          const CatIcon = cat.icon;
          return (
            <button
              key={key}
              onClick={() => setActiveTab(key)}
              style={{
                padding: '10px 16px',
                borderRadius: '8px',
                border: isActive ? `2px solid ${cat.color}` : `1px solid ${colors.border}`,
                backgroundColor: isActive ? cat.bg : 'white',
                color: isActive ? cat.color : colors.textSecondary,
                fontSize: '13px',
                fontWeight: 500,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
              }}
            >
              <CatIcon />
              {cat.label}
              <span style={{ padding: '2px 8px', borderRadius: '10px', backgroundColor: isActive ? cat.color : colors.background, color: isActive ? 'white' : colors.textSecondary, fontSize: '11px', fontWeight: 600 }}>
                {pending > 0 ? pending : count}
              </span>
            </button>
          );
        })}
      </div>
      
      {/* Filtre statut */}
      <div style={{ display: 'flex', gap: '8px', marginBottom: '20px' }}>
        {[{ id: 'all', label: 'Tous' }, { id: 'pending', label: 'À traiter' }, { id: 'resolved', label: 'Résolus' }].map(filter => (
          <button
            key={filter.id}
            onClick={() => setStatusFilter(filter.id)}
            style={{
              padding: '6px 12px',
              borderRadius: '6px',
              border: 'none',
              backgroundColor: statusFilter === filter.id ? colors.textPrimary : colors.background,
              color: statusFilter === filter.id ? 'white' : colors.textSecondary,
              fontSize: '12px',
              fontWeight: 500,
              cursor: 'pointer',
            }}
          >
            {filter.label}
          </button>
        ))}
      </div>
      
      {/* Liste des findings */}
      {filteredFindings.length === 0 ? (
        <div style={{ padding: '40px', textAlign: 'center', backgroundColor: 'white', borderRadius: '12px', border: `1px solid ${colors.border}` }}>
          <p style={{ margin: 0, color: colors.textSecondary }}>Aucun finding dans cette catégorie</p>
        </div>
      ) : (
        filteredFindings.map(finding => <FindingCard key={finding.id} finding={finding} categories={ursFindingCategories} />)
      )}
    </div>
  );
};

// Page d'analyse critique FS
const FSCriticalAnalysisContent = ({ onBack }) => {
  const [activeTab, setActiveTab] = useState('incomplete');
  const [findings] = useState(mockFSFindings);
  const [statusFilter, setStatusFilter] = useState('all');
  
  const filteredFindings = findings.filter(f => {
    if (f.category !== activeTab) return false;
    if (statusFilter === 'pending') return f.status === 'pending';
    if (statusFilter === 'resolved') return f.status === 'resolved';
    return true;
  });
  
  const countByCategory = (cat) => findings.filter(f => f.category === cat).length;
  const countPendingByCategory = (cat) => findings.filter(f => f.category === cat && f.status !== 'resolved').length;
  const totalPending = findings.filter(f => f.status !== 'resolved').length;

  return (
    <div style={{ flex: 1, padding: '24px', overflow: 'auto', backgroundColor: colors.background, height: 'calc(100vh - 56px)' }}>
      {/* Header */}
      <div style={{ marginBottom: '24px' }}>
        <button onClick={onBack} style={{ display: 'flex', alignItems: 'center', gap: '6px', padding: '8px 12px', marginBottom: '16px', borderRadius: '6px', border: `1px solid ${colors.border}`, backgroundColor: 'white', color: colors.textSecondary, fontSize: '13px', cursor: 'pointer' }}>
          <Icons.ArrowLeft /> Retour aux FS
        </button>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div>
            <h1 style={{ margin: 0, fontSize: '24px', fontWeight: 700, color: colors.textPrimary }}>Analyse critique — FS</h1>
            <p style={{ margin: '8px 0 0', fontSize: '14px', color: colors.textSecondary }}>{findings.length} findings identifiés • {totalPending} à traiter</p>
          </div>
          <button style={{ padding: '10px 16px', borderRadius: '8px', border: 'none', backgroundColor: colors.primary, color: 'white', fontSize: '13px', fontWeight: 500, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px' }}>
            <Icons.RefreshCw /> Relancer l'analyse
          </button>
        </div>
      </div>
      
      {/* Tabs catégories */}
      <div style={{ display: 'flex', gap: '8px', marginBottom: '20px', flexWrap: 'wrap' }}>
        {Object.entries(fsFindingCategories).map(([key, cat]) => {
          const count = countByCategory(key);
          const pending = countPendingByCategory(key);
          const isActive = activeTab === key;
          const CatIcon = cat.icon;
          return (
            <button
              key={key}
              onClick={() => setActiveTab(key)}
              style={{
                padding: '10px 16px',
                borderRadius: '8px',
                border: isActive ? `2px solid ${cat.color}` : `1px solid ${colors.border}`,
                backgroundColor: isActive ? cat.bg : 'white',
                color: isActive ? cat.color : colors.textSecondary,
                fontSize: '13px',
                fontWeight: 500,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
              }}
            >
              <CatIcon />
              {cat.label}
              <span style={{ padding: '2px 8px', borderRadius: '10px', backgroundColor: isActive ? cat.color : colors.background, color: isActive ? 'white' : colors.textSecondary, fontSize: '11px', fontWeight: 600 }}>
                {pending > 0 ? pending : count}
              </span>
            </button>
          );
        })}
      </div>
      
      {/* Filtre statut */}
      <div style={{ display: 'flex', gap: '8px', marginBottom: '20px' }}>
        {[{ id: 'all', label: 'Tous' }, { id: 'pending', label: 'À traiter' }, { id: 'resolved', label: 'Résolus' }].map(filter => (
          <button
            key={filter.id}
            onClick={() => setStatusFilter(filter.id)}
            style={{
              padding: '6px 12px',
              borderRadius: '6px',
              border: 'none',
              backgroundColor: statusFilter === filter.id ? colors.textPrimary : colors.background,
              color: statusFilter === filter.id ? 'white' : colors.textSecondary,
              fontSize: '12px',
              fontWeight: 500,
              cursor: 'pointer',
            }}
          >
            {filter.label}
          </button>
        ))}
      </div>
      
      {/* Liste des findings */}
      {filteredFindings.length === 0 ? (
        <div style={{ padding: '40px', textAlign: 'center', backgroundColor: 'white', borderRadius: '12px', border: `1px solid ${colors.border}` }}>
          <p style={{ margin: 0, color: colors.textSecondary }}>Aucun finding dans cette catégorie</p>
        </div>
      ) : (
        filteredFindings.map(finding => <FindingCard key={finding.id} finding={finding} categories={fsFindingCategories} />)
      )}
    </div>
  );
};

// Garder l'ancien composant pour compatibilité SVP (qui n'a pas les mêmes besoins)
const ValidationWorkflow = ({ stepId, status, approver, validatedBy, validatedAt, signatures = [], onSubmitValidation, onRequestSignatures }) => {
  const steps = [
    { id: 'draft', label: 'Rédaction', description: 'En cours de rédaction' },
    { id: 'validation', label: 'Validation', description: 'Approbation responsable' },
    { id: 'signature', label: 'Signature', description: 'Signatures électroniques' },
  ];
  
  const getCurrentStep = () => {
    if (status === 'draft') return 0;
    if (status === 'validated') return 1;
    if (status === 'signed') return 2;
    return 0;
  };
  
  const currentStep = getCurrentStep();
  const signedCount = signatures.filter(s => s.status === 'signed').length;
  
  return (
    <div style={{ backgroundColor: 'white', borderRadius: '12px', border: `1px solid ${colors.border}`, padding: '20px', marginBottom: '20px' }}>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <span style={{ fontSize: '14px', fontWeight: 600, color: colors.textPrimary }}>Workflow de validation</span>
          <ValidationStatusBadge status={status} />
        </div>
        {approver && (
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', color: colors.textSecondary }}>
            <span>Approbateur :</span>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <div style={{ width: '24px', height: '24px', borderRadius: '50%', backgroundColor: colors.primaryLight, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '10px', fontWeight: 600, color: colors.primary }}>{approver.initials}</div>
              <span style={{ color: colors.textPrimary, fontWeight: 500 }}>{approver.name}</span>
            </div>
          </div>
        )}
      </div>
      
      {/* Steps */}
      <div style={{ display: 'flex', alignItems: 'flex-start', gap: '16px', marginBottom: '20px' }}>
        {steps.map((step, index) => {
          const isCompleted = index < currentStep || (index === currentStep && status === 'signed');
          const isCurrent = index === currentStep && status !== 'signed';
          
          return (
            <div key={step.id} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <div style={{ display: 'flex', alignItems: 'center', width: '100%', marginBottom: '12px' }}>
                {index > 0 && (
                  <div style={{ flex: 1, height: '3px', backgroundColor: isCompleted || isCurrent ? colors.primary : colors.border, marginRight: '8px', borderRadius: '2px' }} />
                )}
                <div style={{
                  width: '36px',
                  height: '36px',
                  borderRadius: '50%',
                  backgroundColor: isCompleted ? colors.primary : isCurrent ? colors.primaryLight : colors.background,
                  border: `2px solid ${isCompleted || isCurrent ? colors.primary : colors.border}`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: isCompleted ? 'white' : isCurrent ? colors.primary : colors.textSecondary,
                  fontWeight: 600,
                  fontSize: '14px',
                }}>
                  {isCompleted ? '✓' : index + 1}
                </div>
                {index < steps.length - 1 && (
                  <div style={{ flex: 1, height: '3px', backgroundColor: isCompleted ? colors.primary : colors.border, marginLeft: '8px', borderRadius: '2px' }} />
                )}
              </div>
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '13px', fontWeight: 600, color: isCompleted || isCurrent ? colors.textPrimary : colors.textSecondary }}>{step.label}</div>
                <div style={{ fontSize: '11px', color: colors.textSecondary, marginTop: '2px' }}>{step.description}</div>
              </div>
            </div>
          );
        })}
      </div>
      
      {/* Status details & Actions */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '16px', backgroundColor: colors.background, borderRadius: '8px' }}>
        <div style={{ fontSize: '13px' }}>
          {status === 'draft' && (
            <span style={{ color: colors.textSecondary }}>Document en cours de rédaction. Soumettez-le pour validation lorsqu'il est prêt.</span>
          )}
          {status === 'validated' && (
            <span style={{ color: colors.primary }}>✓ Validé par {validatedBy?.name} le {validatedAt} — Prêt pour signature</span>
          )}
          {status === 'signed' && (
            <span style={{ color: colors.success }}>✅ Document finalisé et signé — Disponible dans les exports</span>
          )}
        </div>
        
        <div style={{ display: 'flex', gap: '8px' }}>
          {status === 'draft' && (
            <button onClick={onSubmitValidation} style={{ padding: '8px 16px', borderRadius: '8px', border: 'none', backgroundColor: colors.primary, color: 'white', fontSize: '13px', fontWeight: 500, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <Icons.Send /> Soumettre pour validation
            </button>
          )}
          {status === 'validated' && (
            <button onClick={onRequestSignatures} style={{ padding: '8px 16px', borderRadius: '8px', border: 'none', backgroundColor: colors.accent, color: 'white', fontSize: '13px', fontWeight: 500, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px' }}>
              ✍️ Demander les signatures
            </button>
          )}
        </div>
      </div>
      
      {/* Signatures status */}
      {status === 'signed' && signatures.length > 0 && (
        <div style={{ marginTop: '12px', padding: '16px', backgroundColor: 'white', border: `1px solid ${colors.border}`, borderRadius: '8px' }}>
          <div style={{ fontSize: '13px', fontWeight: 600, color: colors.textPrimary, marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span>✍️</span> Signatures ({signedCount}/{signatures.length})
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {signatures.map(sig => (
              <div key={sig.id} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '10px 12px', backgroundColor: colors.background, borderRadius: '6px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <div style={{ width: '32px', height: '32px', borderRadius: '50%', backgroundColor: sig.status === 'signed' ? colors.successLight : colors.warningLight, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '11px', fontWeight: 600, color: sig.status === 'signed' ? colors.success : colors.warning }}>{sig.initials}</div>
                  <div>
                    <div style={{ fontSize: '13px', fontWeight: 500, color: colors.textPrimary }}>{sig.name}</div>
                    <div style={{ fontSize: '11px', color: colors.textSecondary }}>{sig.role}</div>
                  </div>
                </div>
                <div style={{ textAlign: 'right' }}>
                  {sig.status === 'signed' ? (
                    <>
                      <div style={{ fontSize: '12px', fontWeight: 600, color: colors.success }}>✓ Signé</div>
                      <div style={{ fontSize: '11px', color: colors.textSecondary }}>{sig.signedAt}</div>
                    </>
                  ) : (
                    <div style={{ fontSize: '12px', fontWeight: 500, color: colors.warning }}>⏳ En attente</div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

// =============================================================================
// PAGE: EXPORTS ET SIGNATURES
// =============================================================================

const ExportsContent = () => {
  const stages = Object.values(validationData);
  const completedStages = stages.filter(s => s.status === 'signed').length;
  const totalStages = stages.length;
  const progressPercent = Math.round((completedStages / totalStages) * 100);
  
  const exportedDocuments = stages
    .filter(s => s.document)
    .map(s => ({
      ...s.document,
      stage: s.shortName,
      status: s.status,
    }));
  
  const getStageIcon = (status) => {
    switch (status) {
      case 'signed': return '✅';
      case 'pending_signature': return '✍️';
      case 'validated': return '✓';
      case 'pending_validation': return '⏳';
      case 'pending_qa_review': return '🔬';
      default: return '○';
    }
  };
  
  return (
    <div style={{ flex: 1, padding: '24px', overflow: 'auto', backgroundColor: colors.background, height: 'calc(100vh - 56px)' }}>
      {/* Header */}
      <div style={{ marginBottom: '24px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', color: colors.textSecondary, marginBottom: '8px' }}>
          <span>Projet</span>
          <Icons.ChevronRight />
          <span style={{ color: colors.textPrimary }}>Exports et signatures</span>
        </div>
        <h1 style={{ fontSize: '24px', fontWeight: 700, color: colors.textPrimary, margin: '0 0 4px 0' }}>Exports et signatures</h1>
        <p style={{ fontSize: '14px', color: colors.textSecondary, margin: 0 }}>Suivez l'avancement des validations et accédez aux documents signés</p>
      </div>
      
      {/* Progression globale */}
      <div style={{ backgroundColor: 'white', borderRadius: '12px', border: `1px solid ${colors.border}`, padding: '24px', marginBottom: '24px' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
          <div>
            <h2 style={{ fontSize: '16px', fontWeight: 600, color: colors.textPrimary, margin: '0 0 4px 0' }}>Progression globale</h2>
            <p style={{ fontSize: '13px', color: colors.textSecondary, margin: 0 }}>{completedStages}/{totalStages} étapes finalisées</p>
          </div>
          <div style={{ fontSize: '32px', fontWeight: 700, color: progressPercent === 100 ? colors.success : colors.primary }}>{progressPercent}%</div>
        </div>
        <div style={{ height: '12px', backgroundColor: colors.background, borderRadius: '6px', overflow: 'hidden' }}>
          <div style={{ height: '100%', width: `${progressPercent}%`, backgroundColor: progressPercent === 100 ? colors.success : colors.primary, borderRadius: '6px', transition: 'width 0.3s ease' }} />
        </div>
      </div>
      
      {/* Étapes du projet */}
      <div style={{ backgroundColor: 'white', borderRadius: '12px', border: `1px solid ${colors.border}`, padding: '24px', marginBottom: '24px' }}>
        <h2 style={{ fontSize: '16px', fontWeight: 600, color: colors.textPrimary, margin: '0 0 20px 0', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Icons.ClipboardList /> Étapes du projet
        </h2>
        
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {stages.map((stage, index) => (
            <div key={stage.id} style={{ padding: '16px 20px', backgroundColor: colors.background, borderRadius: '10px', border: stage.status === 'pending_signature' ? `2px solid ${colors.accent}` : `1px solid ${colors.border}` }}>
              <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '14px' }}>
                  <div style={{ fontSize: '20px', marginTop: '2px' }}>{getStageIcon(stage.status)}</div>
                  <div>
                    <div style={{ fontSize: '15px', fontWeight: 600, color: colors.textPrimary, marginBottom: '4px' }}>{stage.name}</div>
                    {stage.status === 'signed' && (
                      <div style={{ fontSize: '12px', color: colors.textSecondary }}>
                        Signé le {stage.signedAt} par {stage.signatures.map(s => s.initials).join(', ')}
                      </div>
                    )}
                    {stage.status === 'pending_signature' && (
                      <div style={{ fontSize: '12px', color: colors.accent }}>
                        {stage.signatures.filter(s => s.status === 'signed').length}/{stage.signatures.length} signatures collectées
                      </div>
                    )}
                    {stage.status === 'pending_validation' && (
                      <div style={{ fontSize: '12px', color: colors.warning }}>
                        En attente de validation par {stage.responsible?.name}
                      </div>
                    )}
                    {stage.status === 'validated' && (
                      <div style={{ fontSize: '12px', color: colors.primary }}>
                        Validé par {stage.validatedBy?.name} — Prêt pour signature
                      </div>
                    )}
                    {stage.status === 'draft' && (
                      <div style={{ fontSize: '12px', color: colors.textSecondary }}>
                        Non démarré — Responsable : {stage.responsible?.name}
                      </div>
                    )}
                  </div>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <ValidationStatusBadge status={stage.status} size="small" />
                  {stage.document && (
                    <button style={{ padding: '6px 12px', borderRadius: '6px', border: `1px solid ${colors.border}`, backgroundColor: 'white', fontSize: '12px', color: colors.primary, fontWeight: 500, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px' }}>
                      <Icons.Eye /> Voir PDF
                    </button>
                  )}
                </div>
              </div>
              
              {/* Signatures detail for pending_signature */}
              {stage.status === 'pending_signature' && (
                <div style={{ marginTop: '16px', paddingTop: '16px', borderTop: `1px solid ${colors.border}` }}>
                  <div style={{ fontSize: '12px', fontWeight: 600, color: colors.textSecondary, marginBottom: '10px' }}>Signatures</div>
                  <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                    {stage.signatures.map(sig => (
                      <div key={sig.id} style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '8px 12px', backgroundColor: 'white', borderRadius: '8px', border: `1px solid ${colors.border}` }}>
                        <div style={{ width: '28px', height: '28px', borderRadius: '50%', backgroundColor: sig.status === 'signed' ? colors.successLight : colors.warningLight, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '10px', fontWeight: 600, color: sig.status === 'signed' ? colors.success : colors.warning }}>
                          {sig.status === 'signed' ? '✓' : sig.initials}
                        </div>
                        <div>
                          <div style={{ fontSize: '12px', fontWeight: 500, color: colors.textPrimary }}>{sig.name}</div>
                          <div style={{ fontSize: '10px', color: sig.status === 'signed' ? colors.success : colors.warning }}>
                            {sig.status === 'signed' ? `Signé ${sig.signedAt}` : 'En attente'}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  <button style={{ marginTop: '12px', padding: '8px 14px', borderRadius: '6px', border: 'none', backgroundColor: colors.accent, color: 'white', fontSize: '12px', fontWeight: 500, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <Icons.ExternalLink /> Voir dans DocuSign
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
      
      {/* Documents exportés */}
      <div style={{ backgroundColor: 'white', borderRadius: '12px', border: `1px solid ${colors.border}`, padding: '24px' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px' }}>
          <h2 style={{ fontSize: '16px', fontWeight: 600, color: colors.textPrimary, margin: 0, display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Icons.Download /> Documents exportés
          </h2>
          <button style={{ padding: '8px 16px', borderRadius: '8px', border: `1px solid ${colors.border}`, backgroundColor: 'white', fontSize: '13px', color: colors.textPrimary, fontWeight: 500, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px' }}>
            <Icons.Download /> Télécharger tout (.zip)
          </button>
        </div>
        
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          {exportedDocuments.map((doc, index) => (
            <div key={index} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '14px 16px', backgroundColor: colors.background, borderRadius: '8px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <span style={{ fontSize: '24px' }}>📄</span>
                <div>
                  <div style={{ fontSize: '14px', fontWeight: 500, color: colors.textPrimary }}>{doc.name}</div>
                  <div style={{ fontSize: '12px', color: colors.textSecondary }}>
                    {doc.stage} • Généré le {doc.generatedAt} • {doc.size}
                    {doc.status === 'signed' && <span style={{ color: colors.success, marginLeft: '8px' }}>✓ Signé</span>}
                  </div>
                </div>
              </div>
              <div style={{ display: 'flex', gap: '8px' }}>
                <button style={{ padding: '6px 12px', borderRadius: '6px', border: `1px solid ${colors.border}`, backgroundColor: 'white', fontSize: '12px', color: colors.textSecondary, cursor: 'pointer' }}>
                  <Icons.Eye />
                </button>
                <button style={{ padding: '6px 12px', borderRadius: '6px', border: `1px solid ${colors.border}`, backgroundColor: 'white', fontSize: '12px', color: colors.primary, fontWeight: 500, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <Icons.Download /> Télécharger
                </button>
              </div>
            </div>
          ))}
        </div>
        
        {exportedDocuments.length === 0 && (
          <div style={{ textAlign: 'center', padding: '40px', color: colors.textSecondary }}>
            <Icons.FileText style={{ marginBottom: '12px', opacity: 0.5 }} />
            <p style={{ margin: 0 }}>Aucun document exporté pour le moment</p>
          </div>
        )}
      </div>
    </div>
  );
};

// =============================================================================
// PAGE: PLAN DE VALIDATION (SVP)
// =============================================================================

// Options de stratégie
const strategyOptions = [
  { id: 'full', name: 'Validation complète', description: 'IQ + OQ + PQ - Recommandée pour les systèmes critiques GAMP 4/5', color: colors.error },
  { id: 'standard', name: 'Validation standard', description: 'OQ + PQ - Pour les systèmes GAMP 3/4 avec risques modérés', color: colors.warning },
  { id: 'light', name: 'Validation allégée', description: 'PQ uniquement - Pour les systèmes GAMP 1/3 à faible risque', color: colors.success },
  { id: 'revalidation', name: 'Re-validation partielle', description: 'Ciblée sur les changements - Pour les évolutions mineures', color: colors.primary },
];

// Types de sections système
const systemSectionTypes = [
  { id: 'components', label: 'Composants du système', icon: Icons.Server },
  { id: 'environments', label: 'Environnements', icon: Icons.Layers },
  { id: 'interfaces', label: 'Interfaces et systèmes périphériques', icon: Icons.GitBranch },
  { id: 'data', label: 'Données gérées', icon: Icons.FileText },
  { id: 'users', label: 'Utilisateurs et accès', icon: Icons.Users },
];

// Section éditable avec génération IA
// Badge confiance IA réutilisable
const AIConfidenceBadge = ({ confidence }) => {
  const cfg = confidence >= 75
    ? { bg: colors.successLight, color: colors.success, border: colors.success }
    : confidence >= 50
    ? { bg: colors.warningLight, color: colors.warning, border: colors.warning }
    : { bg: colors.errorLight, color: colors.error, border: colors.error };
  return (
    <span style={{ padding: '2px 8px', borderRadius: '4px', backgroundColor: cfg.bg, color: cfg.color, fontSize: '11px', fontWeight: 600 }}>Confiance : {confidence}%</span>
  );
};

// Panneau de proposition IA réutilisable
const AIProposalPanel = ({ isLoading, proposal, confidence, lowConfidenceReason, onApply, applyLabel }) => {
  if (!isLoading && !proposal) return null;
  const isLow = confidence < 50;
  const borderColor = confidence >= 75 ? colors.success : confidence >= 50 ? colors.warning : colors.error;
  return (
    <div style={{ padding: '16px', backgroundColor: colors.accentLight, borderRadius: '10px', marginBottom: '16px', border: `1px solid ${borderColor}30` }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
        <span style={{ color: colors.accent, display: 'flex', alignItems: 'center' }}><Icons.Sparkles /></span>
        <span style={{ fontWeight: 600, color: colors.textPrimary }}>Proposition IA</span>
        {!isLoading && <span style={{ marginLeft: 'auto' }}><AIConfidenceBadge confidence={confidence} /></span>}
      </div>
      {isLoading ? (
        <div style={{ textAlign: 'center', padding: '20px', color: colors.textSecondary }}>Analyse des documents projet en cours...</div>
      ) : (
        <div>
          {isLow && lowConfidenceReason && (
            <div style={{ padding: '8px 12px', backgroundColor: colors.errorLight, borderRadius: '6px', marginBottom: '12px', fontSize: '12px', color: colors.error, display: 'flex', alignItems: 'center', gap: '6px' }}>
              <span style={{ display: 'flex', alignItems: 'center' }}><Icons.AlertTriangle /></span> {lowConfidenceReason}
            </div>
          )}
          <pre style={{ margin: 0, fontSize: '13px', color: colors.textPrimary, whiteSpace: 'pre-wrap', fontFamily: 'inherit', lineHeight: 1.6, backgroundColor: 'white', padding: '12px', borderRadius: '6px', border: `1px solid ${colors.border}` }}>{proposal}</pre>
          <button onClick={onApply} style={{ marginTop: '12px', padding: '8px 14px', borderRadius: '8px', fontSize: '13px', fontWeight: 500, cursor: 'pointer', ...(isLow ? { border: `1px solid ${colors.border}`, backgroundColor: 'white', color: colors.textPrimary } : { border: 'none', backgroundColor: colors.primary, color: 'white' }) }}>
            {applyLabel || (isLow ? 'Appliquer comme brouillon' : 'Appliquer cette proposition')}
          </button>
        </div>
      )}
    </div>
  );
};

const EditableSection = ({ title, icon: Icon, content, onChange, onGenerate, placeholder, isGenerating, aiSource, aiProposal, aiConfidence, aiLowReason }) => {
  const [isExpanded, setIsExpanded] = useState(true);
  const [showProposal, setShowProposal] = useState(false);

  const handleGenerate = (e) => {
    e.stopPropagation();
    setShowProposal(true);
    onGenerate();
  };

  const handleApply = () => {
    if (aiProposal) onChange(aiProposal);
    setShowProposal(false);
  };

  return (
    <div style={{ backgroundColor: 'white', borderRadius: '12px', border: `1px solid ${colors.border}`, marginBottom: '16px', overflow: 'hidden' }}>
      <div style={{ padding: '16px 20px', borderBottom: isExpanded ? `1px solid ${colors.border}` : 'none', display: 'flex', alignItems: 'center', justifyContent: 'space-between', cursor: 'pointer' }} onClick={() => setIsExpanded(!isExpanded)}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{ width: '36px', height: '36px', borderRadius: '8px', backgroundColor: colors.primaryLight, display: 'flex', alignItems: 'center', justifyContent: 'center', color: colors.primary }}><Icon /></div>
          <div>
            <h3 style={{ margin: 0, fontSize: '15px', fontWeight: 600, color: colors.textPrimary }}>{title}</h3>
            {aiSource && <span style={{ fontSize: '11px', color: colors.textSecondary }}>Pré-rempli à partir de : {aiSource}</span>}
          </div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          {content && <span style={{ padding: '4px 8px', borderRadius: '4px', backgroundColor: colors.successLight, color: colors.success, fontSize: '11px', fontWeight: 600 }}>Renseigné</span>}
          <span style={{ color: colors.textSecondary }}>{isExpanded ? <Icons.ChevronUp /> : <Icons.ChevronDown />}</span>
        </div>
      </div>
      {isExpanded && (
        <div style={{ padding: '20px' }}>
          <div style={{ marginBottom: '12px' }}>
            <button onClick={handleGenerate} disabled={isGenerating} style={{ padding: '8px 14px', borderRadius: '8px', border: 'none', backgroundColor: colors.accentLight, color: colors.accent, fontSize: '13px', fontWeight: 500, cursor: isGenerating ? 'not-allowed' : 'pointer', display: 'flex', alignItems: 'center', gap: '6px', opacity: isGenerating ? 0.7 : 1 }}>
              <Icons.Sparkles />{isGenerating ? 'Analyse en cours...' : 'Proposition IA'}
            </button>
          </div>
          {showProposal && (
            <AIProposalPanel isLoading={isGenerating} proposal={aiProposal} confidence={aiConfidence} lowConfidenceReason={aiLowReason} onApply={handleApply} />
          )}
          <textarea value={content} onChange={(e) => onChange(e.target.value)} placeholder={placeholder} style={{ width: '100%', minHeight: '150px', padding: '14px', borderRadius: '8px', border: `1px solid ${colors.border}`, fontSize: '14px', lineHeight: 1.6, resize: 'vertical', fontFamily: 'inherit', color: colors.textPrimary, outline: 'none' }} />
        </div>
      )}
    </div>
  );
};

// Section dynamique (sous-sections ajoutables)
const DynamicSection = ({ title, icon: Icon, sections, onAdd, onRemove, onUpdate, onGenerate, isGenerating, aiProposal, aiConfidence, aiLowReason }) => {
  const [isExpanded, setIsExpanded] = useState(true);
  const [showAddMenu, setShowAddMenu] = useState(false);
  const [showProposal, setShowProposal] = useState(false);

  const handleGenerate = () => {
    setShowProposal(true);
    onGenerate();
  };

  return (
    <div style={{ backgroundColor: 'white', borderRadius: '12px', border: `1px solid ${colors.border}`, marginBottom: '16px', overflow: 'hidden' }}>
      <div style={{ padding: '16px 20px', borderBottom: isExpanded ? `1px solid ${colors.border}` : 'none', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', cursor: 'pointer' }} onClick={() => setIsExpanded(!isExpanded)}>
          <div style={{ width: '36px', height: '36px', borderRadius: '8px', backgroundColor: colors.primaryLight, display: 'flex', alignItems: 'center', justifyContent: 'center', color: colors.primary }}><Icon /></div>
          <div>
            <h3 style={{ margin: 0, fontSize: '15px', fontWeight: 600, color: colors.textPrimary }}>{title}</h3>
            <span style={{ fontSize: '11px', color: colors.textSecondary }}>{sections.length} section(s)</span>
          </div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <div style={{ position: 'relative' }}>
            <button onClick={() => setShowAddMenu(!showAddMenu)} style={{ padding: '8px 14px', borderRadius: '8px', border: `1px solid ${colors.border}`, backgroundColor: 'white', color: colors.textPrimary, fontSize: '13px', fontWeight: 500, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px' }}><Icons.Plus /> Ajouter</button>
            {showAddMenu && (
              <div style={{ position: 'absolute', top: '100%', right: 0, marginTop: '4px', backgroundColor: 'white', borderRadius: '8px', border: `1px solid ${colors.border}`, boxShadow: '0 4px 12px rgba(0,0,0,0.1)', zIndex: 10, minWidth: '220px' }}>
                {systemSectionTypes.map(type => {
                  const TypeIcon = type.icon;
                  return (
                    <button key={type.id} onClick={() => { onAdd(type); setShowAddMenu(false); }} style={{ width: '100%', padding: '10px 14px', border: 'none', backgroundColor: 'transparent', display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer', fontSize: '13px', color: colors.textPrimary, textAlign: 'left' }}>
                      <TypeIcon /> {type.label}
                    </button>
                  );
                })}
              </div>
            )}
          </div>
          <span style={{ color: colors.textSecondary, cursor: 'pointer' }} onClick={() => setIsExpanded(!isExpanded)}>{isExpanded ? <Icons.ChevronUp /> : <Icons.ChevronDown />}</span>
        </div>
      </div>
      {isExpanded && (
        <div style={{ padding: '20px' }}>
          <div style={{ marginBottom: '12px' }}>
            <button onClick={handleGenerate} disabled={isGenerating} style={{ padding: '8px 14px', borderRadius: '8px', border: 'none', backgroundColor: colors.accentLight, color: colors.accent, fontSize: '13px', fontWeight: 500, cursor: isGenerating ? 'not-allowed' : 'pointer', display: 'flex', alignItems: 'center', gap: '6px', opacity: isGenerating ? 0.7 : 1 }}><Icons.Sparkles /> {isGenerating ? 'Analyse...' : 'Proposition IA'}</button>
          </div>
          {showProposal && (
            <AIProposalPanel isLoading={isGenerating} proposal={aiProposal} confidence={aiConfidence} lowConfidenceReason={aiLowReason} onApply={() => { onGenerate('apply'); setShowProposal(false); }} />
          )}
          {sections.map((section, index) => (
            <div key={section.id} style={{ padding: '16px', backgroundColor: colors.background, borderRadius: '8px', marginBottom: '12px', border: `1px solid ${colors.border}` }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
                <input type="text" value={section.title} onChange={(e) => onUpdate(index, { ...section, title: e.target.value })} style={{ fontSize: '14px', fontWeight: 600, color: colors.textPrimary, border: 'none', backgroundColor: 'transparent', outline: 'none', flex: 1 }} />
                <button onClick={() => onRemove(index)} style={{ width: '28px', height: '28px', borderRadius: '6px', border: 'none', backgroundColor: 'white', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', color: colors.error }}><Icons.Trash /></button>
              </div>
              <textarea value={section.content} onChange={(e) => onUpdate(index, { ...section, content: e.target.value })} placeholder="Décrivez cette section..." style={{ width: '100%', minHeight: '80px', padding: '10px', borderRadius: '6px', border: `1px solid ${colors.border}`, fontSize: '13px', lineHeight: 1.5, resize: 'vertical', fontFamily: 'inherit', color: colors.textPrimary, backgroundColor: 'white', outline: 'none' }} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

// Panneau stratégie de validation
const StrategyPanel = ({ strategy, onStrategyChange }) => {
  const [isExpanded, setIsExpanded] = useState(true);
  const [showAIPanel, setShowAIPanel] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [aiResponse, setAiResponse] = useState(null);
  
  const handleAnalyze = () => {
    setIsAnalyzing(true);
    setShowAIPanel(true);
    setTimeout(() => {
      setAiResponse({
        recommendation: 'standard',
        reasoning: `Basé sur l'analyse des documents projet, je recommande une **validation standard (OQ + PQ)** pour les raisons suivantes :

• **Catégorie GAMP 4** : Le système avec configuration personnalisée nécessite des tests opérationnels
• **Interfaces critiques** : L'intégration avec les systèmes tiers requiert des tests fonctionnels approfondis
• **Données réglementées** : Les données GxP manipulées sont soumises à des exigences d'intégrité
• **IQ non nécessaire** : L'infrastructure Cloud est déjà qualifiée côté fournisseur`,
        confidence: 85,
      });
      setIsAnalyzing(false);
    }, 2000);
  };

  return (
    <div style={{ backgroundColor: 'white', borderRadius: '12px', border: `1px solid ${colors.border}`, marginBottom: '16px', overflow: 'hidden' }}>
      <div style={{ padding: '16px 20px', borderBottom: isExpanded ? `1px solid ${colors.border}` : 'none', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', cursor: 'pointer' }} onClick={() => setIsExpanded(!isExpanded)}>
          <div style={{ width: '36px', height: '36px', borderRadius: '8px', backgroundColor: colors.primaryLight, display: 'flex', alignItems: 'center', justifyContent: 'center', color: colors.primary }}><Icons.GitBranch /></div>
          <div>
            <h3 style={{ margin: 0, fontSize: '15px', fontWeight: 600, color: colors.textPrimary }}>Stratégie de validation</h3>
            <span style={{ fontSize: '11px', color: colors.textSecondary }}>Définie par le QA Expert</span>
          </div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span style={{ color: colors.textSecondary, cursor: 'pointer' }} onClick={() => setIsExpanded(!isExpanded)}>{isExpanded ? <Icons.ChevronUp /> : <Icons.ChevronDown />}</span>
        </div>
      </div>
      {isExpanded && (
        <div style={{ padding: '20px' }}>
          <div style={{ marginBottom: '12px' }}>
            <button onClick={handleAnalyze} disabled={isAnalyzing} style={{ padding: '8px 14px', borderRadius: '8px', border: 'none', backgroundColor: colors.accentLight, color: colors.accent, fontSize: '13px', fontWeight: 500, cursor: isAnalyzing ? 'not-allowed' : 'pointer', display: 'flex', alignItems: 'center', gap: '6px', opacity: isAnalyzing ? 0.7 : 1 }}><Icons.Sparkles />{isAnalyzing ? 'Analyse...' : 'Proposition IA'}</button>
          </div>
          {showAIPanel && (
            <AIProposalPanel isLoading={isAnalyzing} proposal={aiResponse?.reasoning} confidence={aiResponse?.confidence || 0} onApply={() => { onStrategyChange(aiResponse.recommendation); setShowAIPanel(false); }} applyLabel="Appliquer cette proposition" />
          )}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '12px', marginBottom: '20px' }}>
            {strategyOptions.map(option => (
              <div key={option.id} onClick={() => onStrategyChange(option.id)} style={{ padding: '16px', borderRadius: '10px', border: strategy === option.id ? `2px solid ${option.color}` : `1px solid ${colors.border}`, backgroundColor: strategy === option.id ? `${option.color}10` : 'white', cursor: 'pointer', transition: 'all 0.2s' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                  <div style={{ width: '12px', height: '12px', borderRadius: '50%', backgroundColor: option.color }} />
                  <span style={{ fontSize: '14px', fontWeight: 600, color: colors.textPrimary }}>{option.name}</span>
                  {strategy === option.id && <Icons.Check style={{ marginLeft: 'auto', color: option.color }} />}
                </div>
                <p style={{ margin: 0, fontSize: '12px', color: colors.textSecondary, lineHeight: 1.4 }}>{option.description}</p>
              </div>
            ))}
          </div>
          <div>
            <label style={{ fontSize: '13px', fontWeight: 600, color: colors.textPrimary, display: 'block', marginBottom: '8px' }}>Détails et justification</label>
            <textarea placeholder="Précisez les raisons du choix de cette stratégie, les éventuelles adaptations..." style={{ width: '100%', minHeight: '100px', padding: '14px', borderRadius: '8px', border: `1px solid ${colors.border}`, fontSize: '14px', lineHeight: 1.6, resize: 'vertical', fontFamily: 'inherit', color: colors.textPrimary, outline: 'none' }} />
          </div>
        </div>
      )}
    </div>
  );
};

// Indicateurs de dépendances
const DependenciesStatus = ({ onNavigate }) => {
  const dependencies = [
    { id: 'team', label: 'Équipe projet', status: 'ready', link: 'raci' },
    { id: 'docs', label: 'Documents de référence', status: 'ready', link: 'documents' },
    { id: 'fra', label: 'Analyse des risques (FRA)', status: 'pending', link: 'fra' },
    { id: 'tests', label: 'Plan de tests', status: 'pending', link: 'protocols' },
  ];
  
  return (
    <div style={{ backgroundColor: 'white', borderRadius: '12px', border: `1px solid ${colors.border}`, padding: '16px 20px', marginBottom: '16px' }}>
      <h3 style={{ margin: '0 0 16px', fontSize: '14px', fontWeight: 600, color: colors.textPrimary }}>Éléments liés (autres pages)</h3>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
        {dependencies.map(dep => (
          <div key={dep.id} onClick={() => onNavigate(dep.link)} style={{ padding: '8px 12px', borderRadius: '8px', backgroundColor: dep.status === 'ready' ? colors.successLight : colors.warningLight, display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
            {dep.status === 'ready' ? <Icons.CheckCircle style={{ color: colors.success }} /> : <Icons.Clock style={{ color: colors.warning }} />}
            <span style={{ fontSize: '13px', fontWeight: 500, color: dep.status === 'ready' ? colors.success : colors.warning }}>{dep.label}</span>
          </div>
        ))}
      </div>
      <p style={{ margin: '12px 0 0', fontSize: '12px', color: colors.textSecondary }}>Le SVP pourra être finalisé une fois tous les éléments prêts.</p>
    </div>
  );
};

// Contenu page SVP
const SVPContent = ({ onNavigate }) => {
  const [objectives, setObjectives] = useState('');
  const [scope, setScope] = useState('');
  const [strategy, setStrategy] = useState('');
  const [systemSections, setSystemSections] = useState([
    { id: 1, title: 'Composants du système', content: '' },
    { id: 2, title: 'Environnements', content: '' },
  ]);
  const [isGenerating, setIsGenerating] = useState({});
  const [aiProposals, setAiProposals] = useState({});
  const [validationStatus, setValidationStatus] = useState('draft');

  const aiData = {
    objectives: {
      text: `L'objectif de cette validation est de démontrer avec un haut niveau de confiance que le système fonctionnera correctement lorsqu'il sera utilisé conformément au périmètre d'utilisation décrit dans les exigences du système.\n\nLe plan de validation du système définit l'étendue et l'organisation des étapes de validation permettant d'atteindre cet objectif.`,
      confidence: 88,
    },
    scope: {
      text: `Cette validation concerne le système utilisé pour la gestion des données métier dans le cadre des activités réglementées.\n\nPérimètre inclus :\n• Module de gestion des données principales\n• Module d'enregistrement et de traçabilité\n• Interfaces avec les systèmes tiers\n• Génération des rapports réglementaires\n\nPérimètre exclu :\n• Infrastructure IT (qualifiée séparément)\n• Formation des utilisateurs (plan de formation dédié)`,
      confidence: 72,
      lowReason: 'Proposition partielle : les détails fournisseur ne sont pas encore renseignés.',
    },
  };

  const handleGenerate = (field) => {
    setIsGenerating(prev => ({ ...prev, [field]: true }));
    setTimeout(() => {
      setAiProposals(prev => ({ ...prev, [field]: aiData[field] }));
      setIsGenerating(prev => ({ ...prev, [field]: false }));
    }, 1500);
  };
  
  const handleAddSystemSection = (type) => {
    setSystemSections([...systemSections, { id: Date.now(), title: type.label, content: '' }]);
  };
  
  const systemProposalSections = [
    { id: 1, title: 'Composants du système', content: `Le système est composé de :\n\n• Infrastructure Cloud : Hébergement sécurisé (GAMP 1) - Non validé (infrastructure qualifiée fournisseur)\n• Base de données : SQL Server (GAMP 1)\n• Application principale : Module métier v3.2 (GAMP 4) - À valider\n• Module reporting : Générateur de rapports (GAMP 3) - Configuration à valider` },
    { id: 2, title: 'Environnements', content: `Trois environnements sont utilisés pour ce système :\n\n• Développement : Utilisé pour les développements et tests unitaires\n• Validation (Staging) : Utilisé pour les tests OQ\n• Production : Utilisé pour les tests PQ et l'exploitation` },
    { id: 3, title: 'Interfaces', content: `Le système interface avec :\n\n• ERP : Export des données de production (sortant)\n• Équipements de mesure : Acquisition automatique des données (entrant)\n• Annuaire d'entreprise : Authentification des utilisateurs (entrant)` },
  ];

  const handleGenerateSystem = (action) => {
    if (action === 'apply') {
      setSystemSections(systemProposalSections);
      return;
    }
    setIsGenerating(prev => ({ ...prev, system: true }));
    setTimeout(() => {
      setAiProposals(prev => ({ ...prev, system: { text: systemProposalSections.map(s => `**${s.title}**\n${s.content}`).join('\n\n'), confidence: 45, lowReason: 'Données insuffisantes : aucune documentation technique fournisseur n\'a été importée dans le projet.' } }));
      setIsGenerating(prev => ({ ...prev, system: false }));
    }, 2000);
  };

  const svpData = validationData.svp;

  return (
    <div style={{ flex: 1, padding: '24px', overflow: 'auto', backgroundColor: colors.background, height: 'calc(100vh - 56px)' }}>
      {/* Header */}
      <div style={{ marginBottom: '24px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', color: colors.textSecondary, marginBottom: '8px' }}>
          <span>Stratégie</span>
          <Icons.ChevronRight />
          <span style={{ color: colors.textPrimary }}>Plan de Validation (SVP)</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div>
            <h1 style={{ margin: 0, fontSize: '24px', fontWeight: 700, color: colors.textPrimary }}>Plan de Validation (SVP)</h1>
            <p style={{ margin: '4px 0 0 0', fontSize: '14px', color: colors.textSecondary }}>Définissez les objectifs, le périmètre et la stratégie de validation du système</p>
          </div>
          <button style={{ padding: '10px 16px', borderRadius: '8px', border: `1px solid ${colors.border}`, backgroundColor: 'white', color: colors.textPrimary, fontSize: '13px', fontWeight: 500, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px' }}><Icons.Eye /> Prévisualiser</button>
        </div>
      </div>
      
      {/* Workflow de validation */}
      <ValidationWorkflowCompact
        stepId="svp"
        status={validationStatus}
        approver={svpData.approver}
        signatures={svpData.signatures}
        onApprove={() => setValidationStatus('validated')}
        onRequestApproval={() => setValidationStatus('validated')}
      />
      
      {/* Dépendances */}
      <DependenciesStatus onNavigate={onNavigate} />
      
      {/* Objectifs */}
      <EditableSection title="Objectifs" icon={Icons.Target} content={objectives} onChange={setObjectives} onGenerate={() => handleGenerate('objectives')} placeholder="Décrivez les objectifs de cette validation..." isGenerating={isGenerating.objectives} aiSource="Documents projet" aiProposal={aiProposals.objectives?.text} aiConfidence={aiProposals.objectives?.confidence} />

      {/* Scope */}
      <EditableSection title="Périmètre (Scope)" icon={Icons.Layers} content={scope} onChange={setScope} onGenerate={() => handleGenerate('scope')} placeholder="Définissez ce qui est inclus et exclu de cette validation..." isGenerating={isGenerating.scope} aiSource="Documents projet" aiProposal={aiProposals.scope?.text} aiConfidence={aiProposals.scope?.confidence} aiLowReason={aiProposals.scope?.lowReason} />
      
      {/* Description du système */}
      <DynamicSection title="Description du système" icon={Icons.Server} sections={systemSections} onAdd={handleAddSystemSection} onRemove={(idx) => setSystemSections(systemSections.filter((_, i) => i !== idx))} onUpdate={(idx, updated) => { const newSections = [...systemSections]; newSections[idx] = updated; setSystemSections(newSections); }} onGenerate={handleGenerateSystem} isGenerating={isGenerating.system} aiProposal={aiProposals.system?.text} aiConfidence={aiProposals.system?.confidence} aiLowReason={aiProposals.system?.lowReason} />
      
      {/* Stratégie de validation */}
      <StrategyPanel strategy={strategy} onStrategyChange={setStrategy} />
    </div>
  );
};

// =============================================================================
// COMPOSANT RÉUTILISABLE: PANNEAU LATÉRAL (DRAWER)
// =============================================================================

const SidePanel = ({ isOpen, onClose, title, subtitle, children, width = '420px' }) => {
  if (!isOpen) return null;
  
  return (
    <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, zIndex: 1000 }}>
      {/* Overlay */}
      <div 
        onClick={onClose}
        style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.3)', transition: 'opacity 0.2s' }}
      />
      {/* Panel */}
      <div style={{
        position: 'absolute',
        top: 0,
        right: 0,
        bottom: 0,
        width: width,
        maxWidth: '100vw',
        backgroundColor: 'white',
        boxShadow: '-4px 0 20px rgba(0,0,0,0.15)',
        display: 'flex',
        flexDirection: 'column',
        animation: 'slideIn 0.2s ease-out',
      }}>
        {/* Header */}
        <div style={{ padding: '20px', borderBottom: `1px solid ${colors.border}`, backgroundColor: colors.primaryLight }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: subtitle ? '4px' : 0 }}>
            <h2 style={{ margin: 0, fontSize: '18px', fontWeight: 700, color: colors.textPrimary }}>{title}</h2>
            <button onClick={onClose} style={{ width: '32px', height: '32px', borderRadius: '8px', border: 'none', backgroundColor: 'white', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', color: colors.textSecondary }}><Icons.X /></button>
          </div>
          {subtitle && <p style={{ margin: 0, fontSize: '13px', color: colors.textSecondary }}>{subtitle}</p>}
        </div>
        {/* Content */}
        <div style={{ flex: 1, overflow: 'auto' }}>
          {children}
        </div>
      </div>
      <style>{`
        @keyframes slideIn {
          from { transform: translateX(100%); }
          to { transform: translateX(0); }
        }
      `}</style>
    </div>
  );
};

// =============================================================================
// COMPOSANTS PARTAGÉS POUR PANELS DE DÉTAIL (URS/FS/FRA)
// =============================================================================

// Onglets du panel de détail
const DetailPanelTabs = ({ activeTab, onTabChange, discussionCount = 0 }) => (
  <div style={{ display: 'flex', borderBottom: `1px solid ${colors.border}`, backgroundColor: 'white' }}>
    {[
      { id: 'details', label: 'Détails' },
      { id: 'discussion', label: 'Discussion', count: discussionCount },
      { id: 'history', label: 'Historique' }
    ].map(tab => (
      <button 
        key={tab.id} 
        onClick={() => onTabChange(tab.id)} 
        style={{ 
          flex: 1, 
          padding: '14px 12px', 
          border: 'none', 
          backgroundColor: 'transparent', 
          cursor: 'pointer', 
          fontSize: '13px', 
          fontWeight: activeTab === tab.id ? 600 : 400, 
          color: activeTab === tab.id ? colors.primary : colors.textSecondary, 
          borderBottom: activeTab === tab.id ? `2px solid ${colors.primary}` : '2px solid transparent',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '6px',
          transition: 'all 0.15s'
        }}
      >
        {tab.label}
        {tab.count > 0 && (
          <span style={{ 
            padding: '2px 6px', 
            borderRadius: '10px', 
            fontSize: '10px', 
            fontWeight: 600, 
            backgroundColor: activeTab === tab.id ? colors.primaryLight : colors.background, 
            color: activeTab === tab.id ? colors.primary : colors.textSecondary 
          }}>{tab.count}</span>
        )}
      </button>
    ))}
  </div>
);

// Module Copilot avec conversation
const CopilotChat = ({ contextId, suggestions = [] }) => {
  const [message, setMessage] = useState('');
  const [conversation, setConversation] = useState([]);
  const [isTyping, setIsTyping] = useState(false);

  const handleSend = () => {
    if (!message.trim()) return;
    
    // Ajouter le message utilisateur
    const userMsg = { role: 'user', content: message, time: 'À l\'instant' };
    setConversation(prev => [...prev, userMsg]);
    setMessage('');
    setIsTyping(true);
    
    // Simuler une réponse IA après un délai
    setTimeout(() => {
      const aiResponses = [
        "J'ai analysé cet élément. La formulation est conforme aux bonnes pratiques GxP. Voulez-vous que je propose des améliorations ?",
        "Cette spécification est cohérente avec les URS liées. Je n'ai pas détecté d'incohérences majeures.",
        "Sur la base des documents sources, je recommande de préciser les critères d'acceptation pour faciliter la testabilité.",
      ];
      const aiMsg = { 
        role: 'assistant', 
        content: aiResponses[Math.floor(Math.random() * aiResponses.length)], 
        time: 'À l\'instant' 
      };
      setConversation(prev => [...prev, aiMsg]);
      setIsTyping(false);
    }, 1500);
  };

  const handleSuggestion = (suggestion) => {
    setMessage(suggestion);
  };

  return (
    <div style={{ borderTop: `1px solid ${colors.border}`, backgroundColor: colors.background, display: 'flex', flexDirection: 'column' }}>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '10px 16px', borderBottom: conversation.length > 0 ? `1px solid ${colors.border}` : 'none' }}>
        <Icons.Sparkles style={{ color: colors.accent }} />
        <span style={{ fontSize: '12px', fontWeight: 600, color: colors.textSecondary }}>Copilot • {contextId}</span>
      </div>
      
      {/* Conversation */}
      {conversation.length > 0 && (
        <div style={{ maxHeight: '180px', overflow: 'auto', padding: '12px 16px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
          {conversation.map((msg, i) => (
            <div key={i} style={{ 
              display: 'flex', 
              flexDirection: 'column',
              alignItems: msg.role === 'user' ? 'flex-end' : 'flex-start',
            }}>
              <div style={{ 
                maxWidth: '85%',
                padding: '10px 14px', 
                borderRadius: msg.role === 'user' ? '14px 14px 4px 14px' : '14px 14px 14px 4px',
                backgroundColor: msg.role === 'user' ? colors.primary : 'white',
                color: msg.role === 'user' ? 'white' : colors.textPrimary,
                fontSize: '13px',
                lineHeight: 1.5,
                border: msg.role === 'assistant' ? `1px solid ${colors.border}` : 'none',
              }}>
                {msg.role === 'assistant' && <Icons.Sparkles style={{ width: 14, height: 14, marginRight: '6px', color: colors.accent, verticalAlign: 'middle' }} />}
                {msg.content}
              </div>
              <span style={{ fontSize: '10px', color: colors.textSecondary, marginTop: '4px', padding: '0 4px' }}>{msg.time}</span>
            </div>
          ))}
          {isTyping && (
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: colors.textSecondary, fontSize: '12px' }}>
              <div style={{ display: 'flex', gap: '4px' }}>
                <span style={{ width: 6, height: 6, borderRadius: '50%', backgroundColor: colors.accent, animation: 'pulse 1s infinite' }} />
                <span style={{ width: 6, height: 6, borderRadius: '50%', backgroundColor: colors.accent, animation: 'pulse 1s infinite 0.2s' }} />
                <span style={{ width: 6, height: 6, borderRadius: '50%', backgroundColor: colors.accent, animation: 'pulse 1s infinite 0.4s' }} />
              </div>
              Copilot réfléchit...
            </div>
          )}
        </div>
      )}
      
      {/* Input */}
      <div style={{ padding: '12px 16px' }}>
        <div style={{ display: 'flex', gap: '8px' }}>
          <input 
            type="text" 
            value={message} 
            onChange={(e) => setMessage(e.target.value)} 
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Posez une question au Copilot..." 
            style={{ flex: 1, padding: '10px 14px', borderRadius: '20px', border: `1px solid ${colors.border}`, fontSize: '13px', outline: 'none', backgroundColor: 'white' }} 
          />
          <button onClick={handleSend} style={{ width: '38px', height: '38px', borderRadius: '50%', border: 'none', backgroundColor: colors.primary, color: 'white', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Icons.Send />
          </button>
        </div>
        {suggestions.length > 0 && (
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginTop: '10px' }}>
            {suggestions.map(suggestion => (
              <button 
                key={suggestion} 
                onClick={() => handleSuggestion(suggestion)}
                style={{ padding: '6px 12px', borderRadius: '16px', border: `1px solid ${colors.border}`, backgroundColor: 'white', cursor: 'pointer', fontSize: '11px', color: colors.primary, fontWeight: 500 }}
              >
                {suggestion}
              </button>
            ))}
          </div>
        )}
      </div>
      
      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 0.4; }
          50% { opacity: 1; }
        }
      `}</style>
    </div>
  );
};

// Module de commentaire pour Discussion
const CommentModule = ({ onPost }) => {
  const [comment, setComment] = useState('');

  const handlePost = () => {
    if (!comment.trim()) return;
    onPost && onPost(comment);
    setComment('');
  };

  return (
    <div style={{ borderTop: `1px solid ${colors.border}`, padding: '16px', backgroundColor: 'white' }}>
      <div style={{ display: 'flex', gap: '12px' }}>
        <div style={{ width: '36px', height: '36px', borderRadius: '50%', backgroundColor: colors.primaryLight, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '13px', fontWeight: 600, color: colors.primary, flexShrink: 0 }}>JD</div>
        <div style={{ flex: 1 }}>
          <textarea 
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Ajouter un commentaire..."
            rows={3}
            style={{ width: '100%', padding: '12px', borderRadius: '10px', border: `1px solid ${colors.border}`, fontSize: '13px', outline: 'none', resize: 'none', fontFamily: 'inherit', lineHeight: 1.5 }}
          />
          <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '10px' }}>
            <button 
              onClick={handlePost}
              disabled={!comment.trim()}
              style={{ 
                padding: '8px 20px', 
                borderRadius: '8px', 
                border: 'none', 
                backgroundColor: comment.trim() ? colors.primary : colors.background, 
                color: comment.trim() ? 'white' : colors.textSecondary, 
                cursor: comment.trim() ? 'pointer' : 'not-allowed', 
                fontSize: '13px', 
                fontWeight: 600,
                display: 'flex',
                alignItems: 'center',
                gap: '6px'
              }}
            >
              <Icons.Send /> Publier
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// Élément de discussion
const DiscussionComment = ({ comment }) => {
  const typeStyles = {
    qa: { bg: '#F0F9FF', border: '#0369A1', roleBg: '#E0F2FE', roleColor: '#0369A1' },
    question: { bg: colors.background, border: colors.border, roleBg: colors.primaryLight, roleColor: colors.primary },
    response: { bg: colors.background, border: colors.success, roleBg: colors.successLight, roleColor: colors.success },
    default: { bg: colors.background, border: colors.border, roleBg: colors.background, roleColor: colors.textSecondary }
  };
  const style = typeStyles[comment.type] || typeStyles.default;
  
  return (
    <div style={{ padding: '14px', backgroundColor: style.bg, borderRadius: '10px', borderLeft: `3px solid ${style.border}` }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
        <div style={{ width: '28px', height: '28px', borderRadius: '50%', backgroundColor: colors.primaryLight, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '10px', fontWeight: 600, color: colors.primary }}>{comment.avatar || comment.user.split(' ').map(n => n[0]).join('')}</div>
        <span style={{ fontSize: '13px', fontWeight: 600, color: colors.textPrimary }}>{comment.user}</span>
        <span style={{ fontSize: '10px', padding: '2px 8px', backgroundColor: style.roleBg, color: style.roleColor, borderRadius: '4px', fontWeight: 600 }}>{comment.role}</span>
        <span style={{ fontSize: '11px', color: colors.textSecondary, marginLeft: 'auto' }}>{comment.time}</span>
      </div>
      <p style={{ margin: 0, fontSize: '13px', color: colors.textPrimary, lineHeight: 1.6 }}>{comment.message}</p>
    </div>
  );
};

// Timeline d'historique avec diffs
const HistoryTimeline = ({ events }) => {
  const [expandedEvents, setExpandedEvents] = useState([]);

  const toggleExpand = (index) => {
    setExpandedEvents(prev => 
      prev.includes(index) ? prev.filter(i => i !== index) : [...prev, index]
    );
  };

  const getEventIcon = (type) => {
    switch(type) {
      case 'created': return { icon: '🤖', color: colors.accent };
      case 'created_manual': return { icon: '➕', color: colors.primary };
      case 'modified': return { icon: '📝', color: colors.primary };
      case 'validated': return { icon: '✓', color: colors.success };
      case 'qa_ok': return { icon: '🔬', color: '#0369A1' };
      case 'comment': return { icon: '💬', color: colors.textSecondary };
      default: return { icon: '•', color: colors.border };
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '0' }}>
      {events.map((event, i) => {
        const { icon, color } = getEventIcon(event.type);
        const isExpanded = expandedEvents.includes(i);
        const hasDiff = event.diff;
        
        return (
          <div key={i} style={{ display: 'flex', gap: '12px', padding: '14px 0', borderBottom: i < events.length - 1 ? `1px solid ${colors.border}` : 'none' }}>
            {/* Timeline line */}
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '24px' }}>
              <div style={{ 
                width: '24px', 
                height: '24px', 
                borderRadius: '50%', 
                backgroundColor: i === 0 ? color + '20' : colors.background, 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center',
                fontSize: '12px',
                border: i === 0 ? `2px solid ${color}` : `1px solid ${colors.border}`
              }}>
                {icon}
              </div>
              {i < events.length - 1 && (
                <div style={{ width: '2px', flex: 1, backgroundColor: colors.border, marginTop: '4px' }} />
              )}
            </div>
            
            {/* Content */}
            <div style={{ flex: 1, paddingTop: '2px' }}>
              <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '8px' }}>
                <div>
                  <div style={{ fontSize: '13px', fontWeight: 500, color: colors.textPrimary, marginBottom: '2px' }}>{event.action}</div>
                  <div style={{ fontSize: '12px', color: colors.textSecondary }}>
                    {event.user} • {event.date}
                  </div>
                </div>
                {hasDiff && (
                  <button 
                    onClick={() => toggleExpand(i)}
                    style={{ 
                      padding: '4px 10px', 
                      borderRadius: '6px', 
                      border: `1px solid ${colors.border}`, 
                      backgroundColor: 'white', 
                      cursor: 'pointer', 
                      fontSize: '11px', 
                      color: colors.primary, 
                      fontWeight: 500,
                      display: 'flex',
                      alignItems: 'center',
                      gap: '4px'
                    }}
                  >
                    {isExpanded ? <Icons.ChevronUp /> : <Icons.ChevronDown />}
                    {isExpanded ? 'Masquer' : 'Voir'}
                  </button>
                )}
              </div>
              
              {/* Diff expanded */}
              {hasDiff && isExpanded && (
                <div style={{ marginTop: '12px', padding: '12px', backgroundColor: colors.background, borderRadius: '8px', fontSize: '12px' }}>
                  {event.diff.map((change, j) => (
                    <div key={j} style={{ marginBottom: j < event.diff.length - 1 ? '10px' : 0 }}>
                      <div style={{ fontWeight: 600, color: colors.textSecondary, marginBottom: '6px', fontSize: '11px', textTransform: 'uppercase' }}>{change.field}</div>
                      {change.old && (
                        <div style={{ padding: '8px 10px', backgroundColor: '#FEE2E2', borderRadius: '6px', marginBottom: '4px', color: '#991B1B' }}>
                          <span style={{ opacity: 0.6 }}>−</span> {change.old}
                        </div>
                      )}
                      <div style={{ padding: '8px 10px', backgroundColor: '#D1FAE5', borderRadius: '6px', color: '#065F46' }}>
                        <span style={{ opacity: 0.6 }}>+</span> {change.new}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};

// Boutons d'action selon les permissions
const DetailActionButtons = ({ 
  canModify, 
  canValidate, 
  canQaOk, 
  isEditing, 
  onEdit, 
  onSave, 
  onCancel, 
  onValidate, 
  onQaOk,
  isValidated,
  isQaOk 
}) => {
  if (isEditing) {
    return (
      <div style={{ display: 'flex', gap: '8px', paddingTop: '16px', borderTop: `1px solid ${colors.border}` }}>
        <button onClick={onCancel} style={{ flex: 1, padding: '12px', borderRadius: '8px', border: `1px solid ${colors.border}`, backgroundColor: 'white', cursor: 'pointer', fontSize: '13px', color: colors.textSecondary, fontWeight: 500 }}>Annuler</button>
        <button onClick={onSave} style={{ flex: 1, padding: '12px', borderRadius: '8px', border: 'none', backgroundColor: colors.success, cursor: 'pointer', fontSize: '13px', color: 'white', fontWeight: 600, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }}><Icons.Check /> Enregistrer</button>
      </div>
    );
  }

  const buttons = [];
  
  if (canModify) {
    buttons.push(
      <button key="edit" onClick={onEdit} style={{ flex: 1, padding: '12px', borderRadius: '8px', border: `1px solid ${colors.border}`, backgroundColor: 'white', cursor: 'pointer', fontSize: '13px', color: colors.textPrimary, fontWeight: 500, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }}><Icons.Edit /> Modifier</button>
    );
  }
  
  if (canValidate) {
    buttons.push(
      <button key="validate" onClick={onValidate} disabled={isValidated} style={{ flex: 1, padding: '12px', borderRadius: '8px', border: 'none', backgroundColor: isValidated ? colors.successLight : colors.primary, cursor: isValidated ? 'default' : 'pointer', fontSize: '13px', color: isValidated ? colors.success : 'white', fontWeight: 600, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }}>
        {isValidated ? <><Icons.CheckCircle /> Validé</> : <><Icons.Check /> Valider</>}
      </button>
    );
  }
  
  if (canQaOk) {
    buttons.push(
      <button key="qa" onClick={onQaOk} disabled={isQaOk} style={{ flex: 1, padding: '12px', borderRadius: '8px', border: 'none', backgroundColor: isQaOk ? '#E0F2FE' : '#0369A1', cursor: isQaOk ? 'default' : 'pointer', fontSize: '13px', color: isQaOk ? '#0369A1' : 'white', fontWeight: 600, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }}>
        {isQaOk ? <><Icons.CheckCircle /> QA OK</> : '🔬 Ok QA'}
      </button>
    );
  }

  if (buttons.length === 0) return null;

  return (
    <div style={{ display: 'flex', gap: '8px', paddingTop: '16px', borderTop: `1px solid ${colors.border}` }}>
      {buttons}
    </div>
  );
};

// =============================================================================
// MODALE DE GÉNÉRATION IA (URS / FS / FRA)
// =============================================================================

const AIGenerationModal = ({ isOpen, onClose, title, subtitle, sourceLabel, results, onApply }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [selected, setSelected] = useState({});
  const [loadingMessage, setLoadingMessage] = useState('');

  useEffect(() => {
    if (isOpen) {
      setIsLoading(true);
      setSelected({});
      const messages = [
        'Analyse des documents sources...',
        'Extraction des données pertinentes...',
        'Génération des propositions...',
        'Calcul des scores de confiance...',
      ];
      let i = 0;
      setLoadingMessage(messages[0]);
      const interval = setInterval(() => {
        i++;
        if (i < messages.length) {
          setLoadingMessage(messages[i]);
        } else {
          clearInterval(interval);
          setIsLoading(false);
          const initial = {};
          results.forEach(r => { initial[r.id] = true; });
          setSelected(initial);
        }
      }, 600);
      return () => clearInterval(interval);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const selectedCount = Object.values(selected).filter(Boolean).length;
  const allSelected = results.length > 0 && selectedCount === results.length;

  const toggleAll = () => {
    if (allSelected) {
      setSelected({});
    } else {
      const all = {};
      results.forEach(r => { all[r.id] = true; });
      setSelected(all);
    }
  };

  const confidenceConfig = (c) => c >= 75
    ? { bg: colors.successLight, color: colors.success, border: colors.success }
    : c >= 50
    ? { bg: colors.warningLight, color: colors.warning, border: colors.warning }
    : { bg: colors.errorLight, color: colors.error, border: colors.error };

  return (
    <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, zIndex: 1100, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div onClick={onClose} style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.5)' }} />
      <div style={{ position: 'relative', backgroundColor: 'white', borderRadius: '16px', width: '640px', maxWidth: '90vw', maxHeight: '80vh', display: 'flex', flexDirection: 'column', boxShadow: '0 20px 60px rgba(0,0,0,0.3)' }}>
        {/* Header */}
        <div style={{ padding: '24px 24px 16px', borderBottom: `1px solid ${colors.border}` }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div style={{ width: '40px', height: '40px', borderRadius: '10px', backgroundColor: colors.accentLight, display: 'flex', alignItems: 'center', justifyContent: 'center', color: colors.accent }}><Icons.Sparkles /></div>
              <div>
                <h3 style={{ margin: 0, fontSize: '17px', fontWeight: 700, color: colors.textPrimary }}>{title}</h3>
                <p style={{ margin: '2px 0 0', fontSize: '13px', color: colors.textSecondary }}>{subtitle}</p>
              </div>
            </div>
            <button onClick={onClose} style={{ width: '32px', height: '32px', borderRadius: '8px', border: `1px solid ${colors.border}`, backgroundColor: 'white', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', color: colors.textSecondary, fontSize: '16px' }}>✕</button>
          </div>
          {!isLoading && (
            <div style={{ marginTop: '12px', padding: '8px 12px', backgroundColor: colors.background, borderRadius: '8px', fontSize: '12px', color: colors.textSecondary, display: 'flex', alignItems: 'center', gap: '6px' }}>
              <Icons.Info /> Sources : {sourceLabel}
            </div>
          )}
        </div>

        {/* Content */}
        <div style={{ flex: 1, overflow: 'auto', padding: '16px 24px' }}>
          {isLoading ? (
            <div style={{ padding: '60px 20px', textAlign: 'center' }}>
              <div style={{ width: '48px', height: '48px', borderRadius: '50%', border: `3px solid ${colors.border}`, borderTopColor: colors.primary, margin: '0 auto 20px', animation: 'spin 1s linear infinite' }} />
              <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
              <p style={{ fontSize: '15px', fontWeight: 600, color: colors.textPrimary, margin: '0 0 8px' }}>{loadingMessage}</p>
              <p style={{ fontSize: '13px', color: colors.textSecondary, margin: 0 }}>Veuillez patienter...</p>
            </div>
          ) : (
            <>
              {/* Select all */}
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px', paddingBottom: '12px', borderBottom: `1px solid ${colors.border}` }}>
                <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', fontSize: '13px', fontWeight: 600, color: colors.textPrimary }}>
                  <input type="checkbox" checked={allSelected} onChange={toggleAll} style={{ width: '16px', height: '16px', accentColor: colors.primary, cursor: 'pointer' }} />
                  Tout sélectionner
                </label>
                <span style={{ fontSize: '12px', color: colors.textSecondary }}>{selectedCount} / {results.length} sélectionnés</span>
              </div>

              {/* Results list */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {results.map(r => {
                  const cfg = confidenceConfig(r.confidence);
                  return (
                    <div key={r.id} style={{ padding: '12px 14px', backgroundColor: selected[r.id] ? 'white' : colors.background, borderRadius: '10px', border: `1px solid ${selected[r.id] ? colors.primary + '40' : colors.border}`, opacity: selected[r.id] ? 1 : 0.6, transition: 'all 0.15s' }}>
                      <div style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
                        <input type="checkbox" checked={!!selected[r.id]} onChange={() => setSelected(prev => ({ ...prev, [r.id]: !prev[r.id] }))} style={{ marginTop: '2px', width: '16px', height: '16px', accentColor: colors.primary, cursor: 'pointer', flexShrink: 0 }} />
                        <div style={{ flex: 1, minWidth: 0 }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px', flexWrap: 'wrap' }}>
                            <span style={{ fontSize: '12px', fontWeight: 700, color: colors.primary, backgroundColor: colors.primaryLight, padding: '2px 8px', borderRadius: '4px' }}>{r.id}</span>
                            <span style={{ padding: '2px 8px', borderRadius: '4px', backgroundColor: cfg.bg, color: cfg.color, fontSize: '11px', fontWeight: 600 }}>Confiance : {r.confidence}%</span>
                            {r.badge && <span style={{ fontSize: '11px', color: colors.textSecondary, backgroundColor: colors.background, padding: '2px 6px', borderRadius: '4px' }}>{r.badge}</span>}
                          </div>
                          <p style={{ margin: '0 0 4px', fontSize: '13px', fontWeight: 600, color: colors.textPrimary }}>{r.title}</p>
                          {r.detail && <p style={{ margin: 0, fontSize: '12px', color: colors.textSecondary, lineHeight: 1.4 }}>{r.detail}</p>}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </>
          )}
        </div>

        {/* Footer */}
        {!isLoading && (
          <div style={{ padding: '16px 24px', borderTop: `1px solid ${colors.border}`, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <button onClick={onClose} style={{ padding: '10px 20px', borderRadius: '8px', border: `1px solid ${colors.border}`, backgroundColor: 'white', cursor: 'pointer', fontSize: '13px', color: colors.textSecondary }}>Annuler</button>
            <button onClick={() => { onApply(Object.keys(selected).filter(k => selected[k])); onClose(); }} disabled={selectedCount === 0} style={{ padding: '10px 24px', borderRadius: '8px', border: 'none', backgroundColor: selectedCount > 0 ? colors.primary : colors.border, color: 'white', cursor: selectedCount > 0 ? 'pointer' : 'default', fontSize: '13px', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '8px' }}><Icons.Check /> Appliquer la sélection ({selectedCount})</button>
          </div>
        )}
      </div>
    </div>
  );
};

// =============================================================================
// BARRE DE FILTRES UNIFIÉE (URS / FS / FRA)
// =============================================================================

const FilterBar = ({ categories, selectedCategory, onSelectCategory, viewMode, onViewModeChange, searchQuery, onSearchChange, filters, activeFilters, onFilterChange }) => {
  const [showSearch, setShowSearch] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const activeFilterCount = activeFilters ? Object.values(activeFilters).filter(v => v && v !== 'all').length : 0;

  return (
    <div style={{ marginBottom: '20px' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
        {/* Onglets catégories */}
        <div style={{ display: 'flex', gap: '6px', flex: 1, flexWrap: 'wrap' }}>
          {categories.map(cat => {
            const isActive = selectedCategory === cat.id;
            return (
              <button key={cat.id} onClick={() => onSelectCategory(cat.id)} style={{ padding: '7px 12px', borderRadius: '20px', border: isActive ? `2px solid ${colors.primary}` : `1px solid ${colors.border}`, backgroundColor: isActive ? colors.primaryLight : 'white', cursor: 'pointer', fontSize: '12px', fontWeight: isActive ? 600 : 400, color: isActive ? colors.primary : colors.textSecondary, display: 'flex', alignItems: 'center', gap: '5px', whiteSpace: 'nowrap' }}>
                {cat.icon && <span>{cat.icon}</span>}{cat.shortLabel || cat.label}
                {cat.count != null && <span style={{ padding: '1px 5px', backgroundColor: isActive ? colors.primary : colors.background, color: isActive ? 'white' : colors.textSecondary, borderRadius: '10px', fontSize: '10px', fontWeight: 600 }}>{cat.count}</span>}
              </button>
            );
          })}
        </div>

        {/* Actions droite */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          {/* Toggle vue Liste/Carte */}
          <div style={{ display: 'flex', backgroundColor: 'white', borderRadius: '8px', padding: '3px', border: `1px solid ${colors.border}` }}>
            <button onClick={() => onViewModeChange('list')} style={{ padding: '6px 10px', borderRadius: '6px', border: 'none', backgroundColor: viewMode === 'list' ? colors.primaryLight : 'transparent', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px', fontSize: '12px', color: viewMode === 'list' ? colors.primary : colors.textSecondary, fontWeight: viewMode === 'list' ? 600 : 400 }}><Icons.List /> Liste</button>
            <button onClick={() => onViewModeChange('map')} style={{ padding: '6px 10px', borderRadius: '6px', border: 'none', backgroundColor: viewMode === 'map' ? colors.primaryLight : 'transparent', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px', fontSize: '12px', color: viewMode === 'map' ? colors.primary : colors.textSecondary, fontWeight: viewMode === 'map' ? 600 : 400 }}><Icons.Layers /> Carte</button>
          </div>
          {/* Recherche */}
          <button onClick={() => setShowSearch(!showSearch)} style={{ padding: '7px 10px', borderRadius: '8px', border: `1px solid ${showSearch ? colors.primary : colors.border}`, backgroundColor: showSearch ? colors.primaryLight : 'white', cursor: 'pointer', display: 'flex', alignItems: 'center', color: showSearch ? colors.primary : colors.textSecondary }}><Icons.Search /></button>
          {/* Filtres */}
          {filters && filters.length > 0 && (
            <button onClick={() => setShowFilters(!showFilters)} style={{ padding: '7px 10px', borderRadius: '8px', border: `1px solid ${showFilters ? colors.primary : colors.border}`, backgroundColor: showFilters ? colors.primaryLight : 'white', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px', fontSize: '12px', color: showFilters ? colors.primary : colors.textSecondary }}>
              <Icons.Filter /> Filtres{activeFilterCount > 0 && <span style={{ padding: '1px 6px', backgroundColor: colors.primary, color: 'white', borderRadius: '10px', fontSize: '10px', fontWeight: 600 }}>{activeFilterCount}</span>}
            </button>
          )}
        </div>
      </div>

      {/* Barre de recherche expandable */}
      {showSearch && (
        <div style={{ marginTop: '10px' }}>
          <div style={{ position: 'relative' }}>
            <span style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: colors.textSecondary, display: 'flex', alignItems: 'center' }}><Icons.Search /></span>
            <input type="text" value={searchQuery} onChange={(e) => onSearchChange(e.target.value)} placeholder="Rechercher..." autoFocus style={{ width: '100%', padding: '10px 12px 10px 40px', borderRadius: '8px', border: `1px solid ${colors.border}`, fontSize: '13px', outline: 'none', backgroundColor: 'white', boxSizing: 'border-box' }} />
          </div>
        </div>
      )}

      {/* Zone filtres expandable */}
      {showFilters && filters && (
        <div style={{ marginTop: '10px', padding: '12px 16px', backgroundColor: 'white', borderRadius: '8px', border: `1px solid ${colors.border}`, display: 'flex', gap: '16px', alignItems: 'center', flexWrap: 'wrap' }}>
          {filters.map(f => (
            <div key={f.id} style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <label style={{ fontSize: '12px', fontWeight: 500, color: colors.textSecondary }}>{f.label}</label>
              <select value={activeFilters?.[f.id] || 'all'} onChange={(e) => onFilterChange(f.id, e.target.value)} style={{ padding: '4px 8px', borderRadius: '6px', border: `1px solid ${colors.border}`, fontSize: '12px', color: colors.textPrimary, cursor: 'pointer', outline: 'none' }}>
                <option value="all">Tous</option>
                {f.options.map(opt => <option key={opt.value} value={opt.value}>{opt.label}</option>)}
              </select>
            </div>
          ))}
          {activeFilterCount > 0 && (
            <button onClick={() => filters.forEach(f => onFilterChange(f.id, 'all'))} style={{ fontSize: '12px', color: colors.primary, backgroundColor: 'transparent', border: 'none', cursor: 'pointer', fontWeight: 500 }}>Réinitialiser</button>
          )}
        </div>
      )}
    </div>
  );
};

// =============================================================================
// PAGE: BESOINS MÉTIER (URS)
// =============================================================================

// Badge priorité MoSCoW
const MoscowBadge = ({ priority, size = 'normal' }) => {
  const config = {
    must: { bg: colors.errorLight, color: colors.error, label: 'Must' },
    should: { bg: colors.warningLight, color: colors.warning, label: 'Should' },
    could: { bg: colors.primaryLight, color: colors.primary, label: 'Could' },
    wont: { bg: colors.background, color: colors.textSecondary, label: 'Won\'t' },
  };
  const c = config[priority] || config.could;
  const padding = size === 'small' ? '2px 6px' : '3px 8px';
  const fontSize = size === 'small' ? '10px' : '11px';
  return <span style={{ padding, borderRadius: '4px', fontSize, fontWeight: 600, backgroundColor: c.bg, color: c.color }}>{c.label}</span>;
};

// Badge validation
const ValidationBadge = ({ validated, qaOpinion }) => (
  <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
    <span style={{ width: '22px', height: '22px', borderRadius: '50%', backgroundColor: validated ? colors.successLight : colors.background, border: `2px solid ${validated ? colors.success : colors.border}`, display: 'flex', alignItems: 'center', justifyContent: 'center', color: validated ? colors.success : colors.textSecondary }} title={validated ? 'Validé par le métier' : 'En attente'}>
      {validated && <Icons.Check />}
    </span>
    {qaOpinion && (
      <span style={{ padding: '2px 6px', borderRadius: '4px', fontSize: '10px', fontWeight: 600, backgroundColor: qaOpinion === 'ok' ? '#E0F2FE' : qaOpinion === 'improve' ? colors.warningLight : colors.background, color: qaOpinion === 'ok' ? '#0369A1' : qaOpinion === 'improve' ? colors.warning : colors.textSecondary }}>
        QA {qaOpinion === 'ok' ? '✓' : qaOpinion === 'improve' ? '!' : '?'}
      </span>
    )}
  </div>
);

// Ligne URS
const URSRow = ({ urs, onClick }) => (
  <div onClick={onClick} style={{ padding: '14px 16px', backgroundColor: 'white', borderRadius: '8px', marginBottom: '8px', cursor: 'pointer', border: `1px solid ${colors.border}`, transition: 'all 0.15s' }}>
    <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
      <span style={{ fontSize: '12px', fontWeight: 700, color: colors.primary, backgroundColor: colors.primaryLight, padding: '4px 8px', borderRadius: '4px', whiteSpace: 'nowrap' }}>{urs.id}</span>
      <div style={{ flex: 1, minWidth: 0 }}>
        <h4 style={{ margin: '0 0 4px 0', fontSize: '14px', fontWeight: 600, color: colors.textPrimary, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{urs.title}</h4>
        <p style={{ margin: 0, fontSize: '13px', color: colors.textSecondary, overflow: 'hidden', textOverflow: 'ellipsis', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', lineHeight: 1.4 }}>{urs.description}</p>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginTop: '10px' }}>
          {urs.linkedFS && urs.linkedFS.length > 0 && <span style={{ fontSize: '11px', color: colors.textSecondary, display: 'flex', alignItems: 'center', gap: '4px' }}><Icons.Link /> {urs.linkedFS.length} FS</span>}
          {urs.source && <span style={{ fontSize: '11px', color: colors.textSecondary, display: 'flex', alignItems: 'center', gap: '4px' }}><Icons.FileText /> {urs.source.doc}</span>}
        </div>
      </div>
      <ValidationBadge validated={urs.validated} qaOpinion={urs.qaOpinion} />
    </div>
  </div>
);

// Catégorie expandable
const URSCategorySection = ({ category, ursItems, onSelectURS, isExpanded, onToggle }) => {
  const validatedCount = ursItems.filter(u => u.validated).length;
  
  return (
    <div style={{ marginBottom: '16px' }}>
      <button onClick={onToggle} style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px 16px', backgroundColor: colors.background, border: 'none', borderRadius: '8px', cursor: 'pointer', marginBottom: isExpanded ? '12px' : '0' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <span style={{ fontSize: '18px' }}>{category.icon}</span>
          <span style={{ fontSize: '14px', fontWeight: 600, color: colors.textPrimary }}>{category.label}</span>
          <span style={{ padding: '2px 8px', borderRadius: '10px', fontSize: '12px', fontWeight: 500, backgroundColor: validatedCount === ursItems.length ? colors.successLight : 'white', color: validatedCount === ursItems.length ? colors.success : colors.textSecondary }}>{validatedCount}/{ursItems.length}</span>
        </div>
        <span style={{ color: colors.textSecondary, transform: isExpanded ? 'rotate(0deg)' : 'rotate(-90deg)', transition: 'transform 0.2s' }}><Icons.ChevronDown /></span>
      </button>
      {isExpanded && (
        <div style={{ paddingLeft: '8px' }}>
          {ursItems.map(urs => <URSRow key={urs.id} urs={urs} onClick={() => onSelectURS(urs)} />)}
        </div>
      )}
    </div>
  );
};

// Panneau détail URS (contenu du drawer)
const URSDetailContent = ({ urs, userRole = 'metier' }) => {
  const isNew = urs._isNew;
  const autoId = isNew ? `URS-${String(ursData.length + 1).padStart(3, '0')}` : urs.id;
  const [activeTab, setActiveTab] = useState('details');
  const [isEditing, setIsEditing] = useState(isNew);
  const [editData, setEditData] = useState({ title: urs.title, description: urs.description });
  const [isValidated, setIsValidated] = useState(urs.validated);
  const [isQaOk, setIsQaOk] = useState(urs.qaOpinion === 'ok');
  const [comments, setComments] = useState(isNew ? [] : [
    { user: 'Marie Lambert', role: 'QA', time: 'Hier 16:30', message: 'La formulation de cette exigence est claire et testable. Conforme aux standards.', type: 'qa', avatar: 'ML' },
    { user: 'Jean Dupont', role: 'UPM', time: 'Hier 10:15', message: 'Pouvons-nous préciser le délai d\'expiration de session ?', type: 'question', avatar: 'JD' },
  ]);

  // Historique avec diffs
  const historyEvents = isNew ? [] : [
    { type: 'validated', action: 'Validation métier', user: 'Jean Dupont', date: '28 nov. 14:32' },
    { type: 'qa_ok', action: 'Avis QA : Conforme', user: 'Marie Lambert', date: '27 nov. 16:15' },
    { type: 'modified', action: 'Description modifiée', user: 'Jean Dupont', date: '26 nov. 11:00', diff: [
      { field: 'Description', old: 'Le système doit permettre l\'authentification.', new: 'Le système doit permettre l\'authentification sécurisée des utilisateurs via SSO et MFA.' }
    ]},
    { type: 'created', action: 'Créé par extraction IA', user: 'Copilot', date: '25 nov. 10:00', diff: [
      { field: 'Source', new: 'Cahier des charges v2.1, page 12' }
    ]},
  ];

  // Permissions
  const canModify = userRole === 'metier' || userRole === 'qualite';
  const canValidate = userRole === 'metier';
  const canQaOk = userRole === 'qualite';

  const handleSave = () => {
    // Sauvegarder les modifications
    setIsEditing(false);
  };

  const handlePostComment = (message) => {
    const newComment = {
      user: 'Jean Dupont',
      role: userRole === 'qualite' ? 'QA' : 'UPM',
      time: 'À l\'instant',
      message,
      type: userRole === 'qualite' ? 'qa' : 'default',
      avatar: 'JD'
    };
    setComments(prev => [newComment, ...prev]);
  };
  
  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      {/* Header avec ID */}
      <div style={{ padding: '16px 20px', backgroundColor: colors.primaryLight, borderBottom: `1px solid ${colors.border}` }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px', flexWrap: 'wrap' }}>
          <span style={{ fontSize: '13px', fontWeight: 700, color: colors.primary, backgroundColor: 'white', padding: '4px 10px', borderRadius: '6px' }}>{autoId}</span>
          {isNew && <span style={{ padding: '4px 10px', borderRadius: '4px', fontSize: '11px', fontWeight: 600, backgroundColor: colors.accentLight, color: colors.primaryDark }}>Nouvelle</span>}
          {!isNew && isValidated && <span style={{ padding: '4px 10px', borderRadius: '4px', fontSize: '11px', fontWeight: 600, backgroundColor: colors.successLight, color: colors.success }}>✓ Validé</span>}
          {!isNew && isQaOk && <span style={{ padding: '4px 10px', borderRadius: '4px', fontSize: '11px', fontWeight: 600, backgroundColor: '#E0F2FE', color: '#0369A1' }}>🔬 QA OK</span>}
        </div>
        <h3 style={{ margin: 0, fontSize: '15px', fontWeight: 600, color: colors.textPrimary }}>{isNew ? (editData.title || 'Nouvelle exigence') : urs.title}</h3>
      </div>
      
      {/* Tabs */}
      <DetailPanelTabs activeTab={activeTab} onTabChange={setActiveTab} discussionCount={comments.length} />
      
      {/* Content */}
      <div style={{ flex: 1, overflow: 'auto', padding: '16px 20px' }}>
        {activeTab === 'details' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {/* Titre (éditable) */}
            <div>
              <label style={{ fontSize: '11px', fontWeight: 600, color: colors.textSecondary, textTransform: 'uppercase', letterSpacing: '0.5px', display: 'block', marginBottom: '8px' }}>Titre</label>
              {isEditing ? (
                <input 
                  type="text" 
                  value={editData.title} 
                  onChange={(e) => setEditData(prev => ({ ...prev, title: e.target.value }))}
                  style={{ width: '100%', padding: '12px', borderRadius: '8px', border: `1px solid ${colors.primary}`, fontSize: '14px', outline: 'none', fontWeight: 500 }}
                />
              ) : (
                <p style={{ margin: 0, fontSize: '14px', color: colors.textPrimary, fontWeight: 500 }}>{urs.title}</p>
              )}
            </div>

            {/* Description (éditable) */}
            <div>
              <label style={{ fontSize: '11px', fontWeight: 600, color: colors.textSecondary, textTransform: 'uppercase', letterSpacing: '0.5px', display: 'block', marginBottom: '8px' }}>Description</label>
              {isEditing ? (
                <textarea 
                  value={editData.description} 
                  onChange={(e) => setEditData(prev => ({ ...prev, description: e.target.value }))}
                  rows={4}
                  style={{ width: '100%', padding: '12px', borderRadius: '8px', border: `1px solid ${colors.primary}`, fontSize: '14px', outline: 'none', resize: 'vertical', fontFamily: 'inherit', lineHeight: 1.6 }}
                />
              ) : (
                <p style={{ margin: 0, fontSize: '14px', color: colors.textPrimary, lineHeight: 1.6, padding: '12px', backgroundColor: colors.background, borderRadius: '8px' }}>{urs.description}</p>
              )}
            </div>
            
            {/* Source */}
            {urs.source && (
              <div>
                <label style={{ fontSize: '11px', fontWeight: 600, color: colors.textSecondary, textTransform: 'uppercase', letterSpacing: '0.5px', display: 'block', marginBottom: '8px' }}>Source</label>
                <div style={{ padding: '12px 14px', backgroundColor: colors.background, borderRadius: '8px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <Icons.FileText style={{ color: colors.textSecondary }} />
                  <div style={{ flex: 1 }}>
                    <span style={{ fontSize: '13px', fontWeight: 500, color: colors.textPrimary }}>{urs.source.doc}</span>
                    <span style={{ fontSize: '12px', color: colors.textSecondary, marginLeft: '8px' }}>Page {urs.source.page}</span>
                  </div>
                  <button style={{ padding: '6px 12px', borderRadius: '6px', border: `1px solid ${colors.border}`, backgroundColor: 'white', cursor: 'pointer', fontSize: '12px', color: colors.primary, display: 'flex', alignItems: 'center', gap: '4px' }}><Icons.Eye /> Voir</button>
                </div>
              </div>
            )}

            {/* FS liées */}
            {urs.linkedFS && urs.linkedFS.length > 0 && (
              <div>
                <label style={{ fontSize: '11px', fontWeight: 600, color: colors.textSecondary, textTransform: 'uppercase', letterSpacing: '0.5px', display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '8px' }}><Icons.Link /> FS liées ({urs.linkedFS.length})</label>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  {urs.linkedFS.map(fs => (
                    <div key={fs.id} style={{ padding: '10px 12px', backgroundColor: colors.background, borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', cursor: 'pointer' }}>
                      <div>
                        <span style={{ fontSize: '12px', fontWeight: 600, color: colors.primary, marginRight: '8px' }}>{fs.id}</span>
                        <span style={{ fontSize: '13px', color: colors.textPrimary }}>{fs.title}</span>
                      </div>
                      <Icons.ExternalLink style={{ color: colors.textSecondary, width: 16, height: 16 }} />
                    </div>
                  ))}
                </div>
              </div>
            )}
            
            {/* Boutons d'action */}
            <DetailActionButtons 
              canModify={canModify}
              canValidate={canValidate}
              canQaOk={canQaOk}
              isEditing={isEditing}
              onEdit={() => setIsEditing(true)}
              onSave={handleSave}
              onCancel={() => { setIsEditing(false); setEditData({ title: urs.title, description: urs.description }); }}
              onValidate={() => setIsValidated(true)}
              onQaOk={() => setIsQaOk(true)}
              isValidated={isValidated}
              isQaOk={isQaOk}
            />
          </div>
        )}
        
        {activeTab === 'discussion' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {comments.length > 0 ? (
              comments.map((comment, i) => (
                <DiscussionComment key={i} comment={comment} />
              ))
            ) : (
              <div style={{ padding: '40px 20px', textAlign: 'center', color: colors.textSecondary }}>
                <Icons.MessageCircle style={{ width: 32, height: 32, marginBottom: '12px', opacity: 0.4 }} />
                <p style={{ margin: 0, fontSize: '14px' }}>Aucun commentaire pour le moment</p>
                <p style={{ margin: '4px 0 0', fontSize: '12px' }}>Soyez le premier à commenter</p>
              </div>
            )}
          </div>
        )}
        
        {activeTab === 'history' && (
          <HistoryTimeline events={historyEvents} />
        )}
      </div>
      
      {/* Zone du bas selon l'onglet */}
      {activeTab === 'discussion' && (
        <CommentModule onPost={handlePostComment} />
      )}
    </div>
  );
};

// Contenu page URS
const URSContent = ({ userRole = 'metier', onNavigateToAnalysis }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedURS, setSelectedURS] = useState(null);
  const [validationStatus, setValidationStatus] = useState('signed');
  const [viewMode, setViewMode] = useState('list');
  const [activeFilters, setActiveFilters] = useState({});
  const [showDetailPanel, setShowDetailPanel] = useState(false);
  const [showReopenModal, setShowReopenModal] = useState(false);
  const [showGenerateModal, setShowGenerateModal] = useState(false);
  const [criticalAnalysisStatus, setCriticalAnalysisStatus] = useState('ok'); // 'none' | 'obsolete' | 'ok' | 'issues'

  const ursGenerationResults = [
    { id: `URS-${String(ursData.length + 1).padStart(3, '0')}`, title: 'Gestion des sessions inactives', detail: 'Le système doit déconnecter automatiquement les utilisateurs après 15 min d\'inactivité. Source : CdC v2.1, p.14', confidence: 91, badge: '🔐 Identités' },
    { id: `URS-${String(ursData.length + 2).padStart(3, '0')}`, title: 'Export des données au format CSV', detail: 'Le système doit permettre l\'export de toutes les données tabulaires au format CSV. Source : CdC v2.1, p.22', confidence: 87, badge: '📊 Données' },
    { id: `URS-${String(ursData.length + 3).padStart(3, '0')}`, title: 'Notifications par email', detail: 'Le système doit envoyer des notifications par email lors de changements de statut. Source : CdC v2.1, p.18', confidence: 74, badge: '🔗 Intégrations' },
    { id: `URS-${String(ursData.length + 4).padStart(3, '0')}`, title: 'Archivage automatique des données', detail: 'Les données de plus de 5 ans doivent être archivées automatiquement. Source : Audit interne 2024, p.8', confidence: 68, badge: '📊 Données' },
    { id: `URS-${String(ursData.length + 5).padStart(3, '0')}`, title: 'Conformité 21 CFR Part 11', detail: 'Le système doit être conforme aux exigences 21 CFR Part 11. Source : CdC v2.1, p.3', confidence: 45, badge: '📋 Traçabilité' },
  ];
  
  const getFilteredURS = () => {
    let items = ursData;
    if (selectedCategory !== 'all') items = items.filter(u => u.categoryId === selectedCategory);
    if (searchQuery) items = items.filter(u => u.title.toLowerCase().includes(searchQuery.toLowerCase()) || u.id.toLowerCase().includes(searchQuery.toLowerCase()));
    if (activeFilters.status === 'validated') items = items.filter(u => u.validated);
    if (activeFilters.status === 'pending') items = items.filter(u => !u.validated);
    return items;
  };

  const ursCategoryTabs = [{ id: 'all', label: 'Toutes les URS', count: ursData.length }, ...ursCategories.map(c => ({ ...c, count: ursData.filter(u => u.categoryId === c.id).length }))];

  const ursFilters = [{ id: 'status', label: 'Statut', options: [{ value: 'validated', label: 'Validées' }, { value: 'pending', label: 'En attente' }] }];
  
  const totalURS = ursData.length;
  const validatedCount = ursData.filter(u => u.validated).length;
  const qaOkCount = ursData.filter(u => u.qaOpinion === 'ok').length;

  const ursValidationData = validationData.urs;
  const isApprover = userRole === 'metier'; // Simplification: métier est approbateur URS

  const handleReopen = (reason) => {
    console.log('Réouverture URS avec motif:', reason);
    setValidationStatus('draft');
    setCriticalAnalysisStatus('obsolete');
    setShowReopenModal(false);
    setShowDetailPanel(false);
    // En production: réouvrir aussi FS et FRA en cascade
  };

  const handleApprove = () => {
    setValidationStatus('validated');
  };

  return (
    <div style={{ flex: 1, padding: '24px', overflow: 'auto', backgroundColor: colors.background, height: 'calc(100vh - 56px)' }}>
      {/* Header */}
      <div style={{ marginBottom: '24px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', color: colors.textSecondary, marginBottom: '8px' }}>
          <span>Fonctionnalités et risques</span>
          <Icons.ChevronRight />
          <span style={{ color: colors.textPrimary }}>Besoins métier (URS)</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
          <div>
            <h1 style={{ fontSize: '24px', fontWeight: 700, color: colors.textPrimary, margin: '0 0 4px 0' }}>Besoins métier (URS)</h1>
            <p style={{ fontSize: '14px', color: colors.textSecondary, margin: 0 }}>{totalURS} exigences • <span style={{ color: colors.success, fontWeight: 600 }}>{validatedCount} validées</span> • <span style={{ color: '#0369A1', fontWeight: 600 }}>{qaOkCount} QA OK</span> • <span style={{ color: colors.warning, fontWeight: 600 }}>{totalURS - validatedCount} en attente</span></p>
          </div>
          <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
            {/* Analyse critique */}
            <CriticalAnalysisBanner
              status={criticalAnalysisStatus}
              lastRun={criticalAnalysisStatus !== 'none' ? '17 nov.' : null}
              findings={criticalAnalysisStatus === 'issues' ? 3 : 0}
              onLaunchAnalysis={onNavigateToAnalysis}
            />
            <button onClick={() => setShowGenerateModal(true)} style={{ padding: '10px 16px', borderRadius: '8px', border: `1px solid ${colors.accent}`, backgroundColor: colors.accentLight, cursor: 'pointer', fontSize: '13px', fontWeight: 500, color: colors.primaryDark, display: 'flex', alignItems: 'center', gap: '8px' }}><Icons.Sparkles /> Générer depuis documents</button>
            <button onClick={() => { setSelectedURS({ id: '', title: '', description: '', categoryId: 'identity', validated: false, qaOpinion: null, linkedFS: [], _isNew: true }); }} style={{ padding: '10px 16px', borderRadius: '8px', border: 'none', backgroundColor: colors.primary, color: 'white', cursor: 'pointer', fontSize: '13px', fontWeight: 500, display: 'flex', alignItems: 'center', gap: '8px' }}><Icons.Plus /> Nouvelle URS</button>
          </div>
        </div>
      </div>
      
      {/* Workflow de validation compact */}
      <ValidationWorkflowCompact 
        stepId="urs"
        status={validationStatus === 'signed' ? 'signed' : validationStatus === 'validated' ? 'validated' : 'draft'}
        approver={ursValidationData.approver}
        signatures={ursValidationData.signatures}
        userRole={userRole}
        isApprover={isApprover}
        onApprove={handleApprove}
        onRequestApproval={() => console.log('Demande de validation envoyée')}
        onOpenDetails={() => setShowDetailPanel(true)}
      />
      
      {/* FilterBar */}
      <FilterBar
        categories={ursCategoryTabs}
        selectedCategory={selectedCategory}
        onSelectCategory={setSelectedCategory}
        viewMode={viewMode}
        onViewModeChange={setViewMode}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        filters={ursFilters}
        activeFilters={activeFilters}
        onFilterChange={(id, val) => setActiveFilters(prev => ({ ...prev, [id]: val }))}
      />

      {/* Vue Liste */}
      {viewMode === 'list' && (
        <div>
          {getFilteredURS().map(urs => (
            <URSRow key={urs.id} urs={urs} onClick={() => setSelectedURS(urs)} />
          ))}
          {getFilteredURS().length === 0 && (
            <div style={{ padding: '40px', textAlign: 'center', color: colors.textSecondary, fontSize: '14px' }}>Aucune exigence ne correspond aux filtres sélectionnés</div>
          )}
        </div>
      )}
      
      {/* Vue Carte */}
      {viewMode === 'map' && (
        <URSFeatureMap 
          data={ursData}
          categories={ursCategories}
          selectedURS={selectedURS}
          onSelectURS={setSelectedURS}
        />
      )}
      
      {/* Side Panel */}
      <SidePanel
        isOpen={!!selectedURS}
        onClose={() => setSelectedURS(null)}
        title={selectedURS?._isNew ? `URS-${String(ursData.length + 1).padStart(3, '0')}` : (selectedURS?.id || '')}
        subtitle=""
        width="450px"
      >
        {selectedURS && <URSDetailContent urs={selectedURS} userRole={userRole} />}
      </SidePanel>
      
      {/* Panel détails workflow */}
      <ValidationDetailPanel
        isOpen={showDetailPanel}
        onClose={() => setShowDetailPanel(false)}
        stepData={ursValidationData}
        userRole={userRole}
        onReopen={() => { setShowDetailPanel(false); setShowReopenModal(true); }}
      />
      
      {/* Modal réouverture */}
      <ReopenConfirmModal
        isOpen={showReopenModal}
        onClose={() => setShowReopenModal(false)}
        onConfirm={handleReopen}
        stepName="Besoins métier (URS)"
        cascadeSteps={['FS - Spécifications Fonctionnelles', 'FRA - Analyse des Risques']}
      />

      {/* Modale génération IA */}
      <AIGenerationModal
        isOpen={showGenerateModal}
        onClose={() => setShowGenerateModal(false)}
        title="Générer des URS depuis documents"
        subtitle="Extraction automatique des exigences métier"
        sourceLabel="Cahier des charges v2.1, Audit interne 2024"
        results={ursGenerationResults}
        onApply={(ids) => console.log('URS générées:', ids)}
      />
    </div>
  );
};

// =============================================================================
// PAGE: SPÉCIFICATIONS FONCTIONNELLES (FS)
// =============================================================================

// Badge statut FS
const FSStatusBadge = ({ status, size = 'normal' }) => {
  const config = {
    validated: { bg: colors.successLight, color: colors.success, label: 'Validée' },
    review: { bg: colors.primaryLight, color: colors.primary, label: 'En revue' },
    pending: { bg: colors.warningLight, color: colors.warning, label: 'En attente' },
    draft: { bg: colors.background, color: colors.textSecondary, label: 'Brouillon' },
    qaOk: { bg: '#E0F2FE', color: '#0369A1', label: 'QA ✓' },
  };
  const c = config[status] || config.draft;
  const padding = size === 'small' ? '2px 6px' : '4px 10px';
  const fontSize = size === 'small' ? '10px' : '11px';
  return <span style={{ padding, borderRadius: '4px', fontSize, fontWeight: 600, backgroundColor: c.bg, color: c.color }}>{c.label}</span>;
};

// Ligne FS
const FSRow = ({ fs, onClick }) => (
  <div onClick={onClick} style={{ padding: '16px', backgroundColor: 'white', borderRadius: '10px', marginBottom: '10px', cursor: 'pointer', border: `1px solid ${colors.border}`, transition: 'all 0.15s' }}>
    <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
      <span style={{ fontSize: '12px', fontWeight: 700, color: 'white', backgroundColor: colors.primary, padding: '4px 10px', borderRadius: '6px', whiteSpace: 'nowrap' }}>{fs.id}</span>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
          <h4 style={{ margin: 0, fontSize: '14px', fontWeight: 600, color: colors.textPrimary }}>{fs.title}</h4>
        </div>
        <p style={{ margin: '0 0 10px 0', fontSize: '13px', color: colors.textSecondary, overflow: 'hidden', textOverflow: 'ellipsis', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', lineHeight: 1.4 }}>{fs.description}</p>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap' }}>
          <FSStatusBadge status={fs.status} size="small" />
          {fs.qaReviewed && <FSStatusBadge status="qaOk" size="small" />}
          <span style={{ fontSize: '11px', color: colors.textSecondary, display: 'flex', alignItems: 'center', gap: '4px' }}><Icons.Link /> {fs.linkedURS.length} URS</span>
          <span style={{ fontSize: '11px', color: colors.textSecondary }}>📁 {fs.category}</span>
        </div>
      </div>
    </div>
  </div>
);

// =============================================================================
// CARTE DES FONCTIONNALITÉS (FEATURE MAP) - Réutilisable
// =============================================================================

// Configuration des couleurs par groupe pour la carte
const mapGroupColors = {
  // Pour FS et URS
  security: { bg: '#FEF2F2', border: '#FECACA', icon: '🔐' },
  identity: { bg: '#FEF2F2', border: '#FECACA', icon: '🔐' },
  audit: { bg: '#F0FDF4', border: '#BBF7D0', icon: '📋' },
  data: { bg: '#EFF6FF', border: '#BFDBFE', icon: '📊' },
  integration: { bg: '#FDF4FF', border: '#E9D5FF', icon: '🔗' },
  reporting: { bg: '#FFFBEB', border: '#FDE68A', icon: '📈' },
  // Pour FRA
  high: { bg: '#FEF2F2', border: '#FECACA', icon: '🔴' },
  medium: { bg: '#FFFBEB', border: '#FDE68A', icon: '🟠' },
  low: { bg: '#F0FDF4', border: '#BBF7D0', icon: '🟢' },
};

// Composant groupe de la carte
const MapGroup = ({ title, icon, items, colorConfig, selectedId, onSelect, renderItem }) => (
  <div style={{
    padding: '16px',
    backgroundColor: colorConfig.bg,
    borderRadius: '12px',
    border: `2px solid ${colorConfig.border}`,
  }}>
    <div style={{ 
      fontSize: '14px', 
      fontWeight: 600, 
      marginBottom: '12px',
      display: 'flex',
      alignItems: 'center',
      gap: '8px',
    }}>
      {icon} {title}
      <span style={{
        padding: '2px 8px',
        backgroundColor: 'white',
        borderRadius: '10px',
        fontSize: '11px',
        color: colors.textSecondary,
      }}>{items.length}</span>
    </div>
    {items.map(item => renderItem(item, selectedId, onSelect))}
    {items.length === 0 && (
      <div style={{ padding: '12px', textAlign: 'center', color: colors.textSecondary, fontSize: '12px' }}>
        Aucun élément
      </div>
    )}
  </div>
);

// Carte pour FS
const FSFeatureMap = ({ data, categories, selectedFS, onSelectFS }) => {
  const getItemsByCategory = (catId) => data.filter(item => item.categoryId === catId);
  
  const renderFSItem = (fs, selectedId, onSelect) => (
    <div
      key={fs.id}
      onClick={() => onSelect(fs)}
      style={{
        padding: '10px 12px',
        backgroundColor: 'white',
        borderRadius: '8px',
        marginBottom: '8px',
        cursor: 'pointer',
        border: selectedId === fs.id ? `2px solid ${colors.primary}` : '2px solid transparent',
        transition: 'all 0.15s',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '4px' }}>
        <span style={{ fontSize: '12px', fontWeight: 600, color: colors.primary }}>{fs.id}</span>
        <FSStatusBadge status={fs.status} size="small" />
      </div>
      <div style={{ fontSize: '12px', color: colors.textPrimary, lineHeight: 1.3 }}>{fs.title}</div>
      {fs.linkedURS && fs.linkedURS.length > 0 && (
        <div style={{ display: 'flex', gap: '4px', marginTop: '6px', flexWrap: 'wrap' }}>
          {fs.linkedURS.slice(0, 3).map(urs => (
            <span key={urs.id} style={{ padding: '2px 6px', backgroundColor: colors.background, borderRadius: '4px', fontSize: '10px', color: colors.textSecondary }}>{urs.id}</span>
          ))}
          {fs.linkedURS.length > 3 && <span style={{ fontSize: '10px', color: colors.textSecondary }}>+{fs.linkedURS.length - 3}</span>}
        </div>
      )}
    </div>
  );

  return (
    <div style={{ backgroundColor: 'white', borderRadius: '12px', border: `1px solid ${colors.border}`, padding: '24px', minHeight: '500px' }}>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <Icons.Sparkles style={{ color: colors.accent }} />
          <span style={{ fontSize: '14px', fontWeight: 600, color: colors.textPrimary }}>Carte des fonctionnalités</span>
          <span style={{ padding: '4px 8px', backgroundColor: colors.accentLight, borderRadius: '4px', fontSize: '11px', color: colors.primaryDark }}>Généré par IA • Modifiable</span>
        </div>
        <button style={{ padding: '8px 14px', borderRadius: '6px', border: `1px solid ${colors.border}`, backgroundColor: 'white', cursor: 'pointer', fontSize: '12px', color: colors.textSecondary }}>Réorganiser</button>
      </div>
      
      {/* Grille des groupes */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px' }}>
        {categories.filter(c => c.id !== 'all').map(cat => {
          const items = getItemsByCategory(cat.id);
          const colorConfig = mapGroupColors[cat.id] || mapGroupColors.data;
          return (
            <MapGroup
              key={cat.id}
              title={cat.label}
              icon={cat.icon}
              items={items}
              colorConfig={colorConfig}
              selectedId={selectedFS?.id}
              onSelect={onSelectFS}
              renderItem={renderFSItem}
            />
          );
        })}
      </div>
      
      {/* Légende */}
      <div style={{ marginTop: '24px', padding: '16px', backgroundColor: colors.background, borderRadius: '8px', display: 'flex', alignItems: 'center', gap: '24px' }}>
        <span style={{ fontSize: '12px', fontWeight: 600, color: colors.textSecondary }}>Légende :</span>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <div style={{ width: '20px', height: '2px', backgroundColor: colors.primary }} />
          <span style={{ fontSize: '12px', color: colors.textSecondary }}>Lien vers URS</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <FSStatusBadge status="validated" size="small" />
          <span style={{ fontSize: '12px', color: colors.textSecondary }}>Validé</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <FSStatusBadge status="review" size="small" />
          <span style={{ fontSize: '12px', color: colors.textSecondary }}>En revue</span>
        </div>
      </div>
    </div>
  );
};

// Carte pour URS
const URSFeatureMap = ({ data, categories, selectedURS, onSelectURS }) => {
  const getItemsByCategory = (catId) => data.filter(item => item.categoryId === catId);
  
  const renderURSItem = (urs, selectedId, onSelect) => (
    <div
      key={urs.id}
      onClick={() => onSelect(urs)}
      style={{
        padding: '10px 12px',
        backgroundColor: 'white',
        borderRadius: '8px',
        marginBottom: '8px',
        cursor: 'pointer',
        border: selectedId === urs.id ? `2px solid ${colors.primary}` : '2px solid transparent',
        transition: 'all 0.15s',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '4px' }}>
        <span style={{ fontSize: '12px', fontWeight: 600, color: colors.primary }}>{urs.id}</span>
      </div>
      <div style={{ fontSize: '12px', color: colors.textPrimary, lineHeight: 1.3 }}>{urs.title}</div>
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: '6px' }}>
        {urs.validated && <span style={{ fontSize: '10px', color: colors.success }}>✓ Validé</span>}
        {urs.qaOpinion === 'ok' && <span style={{ fontSize: '10px', color: '#0369A1' }}>🔬 QA OK</span>}
        {urs.linkedFS && urs.linkedFS.length > 0 && (
          <span style={{ fontSize: '10px', color: colors.textSecondary }}>→ {urs.linkedFS.length} FS</span>
        )}
      </div>
    </div>
  );

  return (
    <div style={{ backgroundColor: 'white', borderRadius: '12px', border: `1px solid ${colors.border}`, padding: '24px', minHeight: '500px' }}>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <Icons.Sparkles style={{ color: colors.accent }} />
          <span style={{ fontSize: '14px', fontWeight: 600, color: colors.textPrimary }}>Carte des exigences</span>
          <span style={{ padding: '4px 8px', backgroundColor: colors.accentLight, borderRadius: '4px', fontSize: '11px', color: colors.primaryDark }}>Regroupement IA</span>
        </div>
        <button style={{ padding: '8px 14px', borderRadius: '6px', border: `1px solid ${colors.border}`, backgroundColor: 'white', cursor: 'pointer', fontSize: '12px', color: colors.textSecondary }}>Réorganiser</button>
      </div>
      
      {/* Grille des groupes */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px' }}>
        {categories.map(cat => {
          const items = getItemsByCategory(cat.id);
          const colorConfig = mapGroupColors[cat.id] || mapGroupColors.data;
          return (
            <MapGroup
              key={cat.id}
              title={cat.label}
              icon={cat.icon}
              items={items}
              colorConfig={colorConfig}
              selectedId={selectedURS?.id}
              onSelect={onSelectURS}
              renderItem={renderURSItem}
            />
          );
        })}
      </div>
      
    </div>
  );
};

// Carte pour FRA (par niveau de risque)
const FRAFeatureMap = ({ data, selectedFS, onSelectFS, calculatePriority }) => {
  const getItemsByPriority = (priority) => data.filter(fs => calculatePriority(fs.risks) === priority);
  
  const priorityGroups = [
    { id: 'high', label: 'Priorité High', priority: 'H' },
    { id: 'medium', label: 'Priorité Medium', priority: 'M' },
    { id: 'low', label: 'Priorité Low', priority: 'L' },
  ];

  const renderFRAItem = (fs, selectedId, onSelect) => {
    const maxPriority = calculatePriority(fs.risks);
    return (
      <div
        key={fs.id}
        onClick={() => onSelect(fs)}
        style={{
          padding: '10px 12px',
          backgroundColor: 'white',
          borderRadius: '8px',
          marginBottom: '8px',
          cursor: 'pointer',
          border: selectedId === fs.id ? `2px solid ${colors.primary}` : '2px solid transparent',
          transition: 'all 0.15s',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '4px' }}>
          <span style={{ fontSize: '12px', fontWeight: 600, color: colors.primary }}>{fs.id}</span>
          <FRAStatusBadge status={fs.status} size="small" />
        </div>
        <div style={{ fontSize: '12px', color: colors.textPrimary, lineHeight: 1.3 }}>{fs.title}</div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: '6px' }}>
          <span style={{ fontSize: '10px', color: colors.textSecondary }}>{fs.risks.length} risque(s)</span>
          <RiskLevelBadge level={maxPriority} size="small" showLabel={false} />
        </div>
      </div>
    );
  };

  return (
    <div style={{ backgroundColor: 'white', borderRadius: '12px', border: `1px solid ${colors.border}`, padding: '24px', minHeight: '500px' }}>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <Icons.Sparkles style={{ color: colors.accent }} />
          <span style={{ fontSize: '14px', fontWeight: 600, color: colors.textPrimary }}>Carte des risques</span>
          <span style={{ padding: '4px 8px', backgroundColor: colors.accentLight, borderRadius: '4px', fontSize: '11px', color: colors.primaryDark }}>Groupé par priorité</span>
        </div>
        <button style={{ padding: '8px 14px', borderRadius: '6px', border: `1px solid ${colors.border}`, backgroundColor: 'white', cursor: 'pointer', fontSize: '12px', color: colors.textSecondary }}>Matrice de risques</button>
      </div>
      
      {/* Grille des groupes */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px' }}>
        {priorityGroups.map(group => {
          const items = getItemsByPriority(group.priority);
          const colorConfig = mapGroupColors[group.id];
          return (
            <MapGroup
              key={group.id}
              title={group.label}
              icon={colorConfig.icon}
              items={items}
              colorConfig={colorConfig}
              selectedId={selectedFS?.id}
              onSelect={onSelectFS}
              renderItem={renderFRAItem}
            />
          );
        })}
      </div>
      
      {/* Légende */}
      <div style={{ marginTop: '24px', padding: '16px', backgroundColor: colors.background, borderRadius: '8px', display: 'flex', alignItems: 'center', gap: '24px' }}>
        <span style={{ fontSize: '12px', fontWeight: 600, color: colors.textSecondary }}>Priorité = Risk Class × Detectability</span>
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}><RiskLevelBadge level="H" size="small" /><span style={{ fontSize: '12px', color: colors.textSecondary }}>Action immédiate</span></div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}><RiskLevelBadge level="M" size="small" /><span style={{ fontSize: '12px', color: colors.textSecondary }}>À surveiller</span></div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}><RiskLevelBadge level="L" size="small" /><span style={{ fontSize: '12px', color: colors.textSecondary }}>Acceptable</span></div>
      </div>
    </div>
  );
};

// Panneau détail FS (contenu du drawer)
const FSDetailContent = ({ fs, userRole = 'metier' }) => {
  const isNew = fs._isNew;
  const autoId = isNew ? `FS-${String(fsData.length + 1).padStart(3, '0')}` : fs.id;
  const [activeTab, setActiveTab] = useState('details');
  const [isEditing, setIsEditing] = useState(isNew);
  const [editData, setEditData] = useState({ title: fs.title, description: fs.description });
  const [isValidated, setIsValidated] = useState(fs.status === 'validated');
  const [isQaOk, setIsQaOk] = useState(fs.qaReviewed);
  const [comments, setComments] = useState(isNew ? [] : [
    { user: 'Marie Lambert', role: 'QA', time: 'Hier 16:30', message: 'La description de la complexité des mots de passe est conforme à notre politique de sécurité.', type: 'qa', avatar: 'ML' },
    { user: 'Jean Dupont', role: 'UPM', time: 'Hier 14:15', message: 'Pouvons-nous préciser la durée d\'expiration de session pour le SSO ?', type: 'question', avatar: 'JD' },
  ]);

  // Historique avec diffs
  const historyEvents = isNew ? [] : [
    { type: 'qa_ok', action: 'Avis QA : Conforme', user: 'Marie Lambert', date: '28 nov. 16:30' },
    { type: 'modified', action: 'Passage en revue', user: 'Jean Dupont', date: '27 nov. 14:15', diff: [
      { field: 'Statut', old: 'Brouillon', new: 'En revue' }
    ]},
    { type: 'modified', action: 'Description enrichie', user: 'Jean Dupont', date: '26 nov. 15:00', diff: [
      { field: 'Description', old: 'Le système gère l\'authentification.', new: fs.description }
    ]},
    { type: 'created', action: 'Généré depuis URS par IA', user: 'Copilot', date: '26 nov. 10:00', diff: [
      { field: 'URS sources', new: isNew ? '' : fs.linkedURS.map(u => u.id).join(', ') }
    ]},
  ];

  // Permissions
  const canModify = userRole === 'metier' || userRole === 'qualite';
  const canValidate = userRole === 'metier';
  const canQaOk = userRole === 'qualite';

  const handleSave = () => {
    setIsEditing(false);
  };

  const handlePostComment = (message) => {
    const newComment = {
      user: 'Jean Dupont',
      role: userRole === 'qualite' ? 'QA' : 'UPM',
      time: 'À l\'instant',
      message,
      type: userRole === 'qualite' ? 'qa' : 'default',
      avatar: 'JD'
    };
    setComments(prev => [newComment, ...prev]);
  };
  
  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      {/* Header */}
      <div style={{ padding: '16px 20px', backgroundColor: colors.primaryLight, borderBottom: `1px solid ${colors.border}` }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px', flexWrap: 'wrap' }}>
          <span style={{ fontSize: '13px', fontWeight: 700, color: 'white', backgroundColor: colors.primary, padding: '4px 10px', borderRadius: '6px' }}>{autoId}</span>
          {isNew && <span style={{ padding: '4px 10px', borderRadius: '4px', fontSize: '11px', fontWeight: 600, backgroundColor: colors.accentLight, color: colors.primaryDark }}>Nouvelle</span>}
          {!isNew && <FSStatusBadge status={fs.status} />}
          {!isNew && isValidated && <span style={{ padding: '4px 10px', borderRadius: '4px', fontSize: '11px', fontWeight: 600, backgroundColor: colors.successLight, color: colors.success }}>✓ Validé</span>}
          {!isNew && isQaOk && <span style={{ padding: '4px 10px', borderRadius: '4px', fontSize: '11px', fontWeight: 600, backgroundColor: '#E0F2FE', color: '#0369A1' }}>🔬 QA OK</span>}
        </div>
        <h3 style={{ margin: 0, fontSize: '15px', fontWeight: 600, color: colors.textPrimary }}>{isNew ? (editData.title || 'Nouvelle spécification') : fs.title}</h3>
        {!isNew && <span style={{ display: 'inline-block', marginTop: '8px', padding: '3px 8px', backgroundColor: 'white', borderRadius: '4px', fontSize: '11px', color: colors.textSecondary }}>📁 {fs.category}</span>}
      </div>
      
      {/* Tabs */}
      <DetailPanelTabs activeTab={activeTab} onTabChange={setActiveTab} discussionCount={comments.length} />
      
      {/* Content */}
      <div style={{ flex: 1, overflow: 'auto', padding: '16px 20px' }}>
        {activeTab === 'details' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {/* Titre (éditable) */}
            <div>
              <label style={{ fontSize: '11px', fontWeight: 600, color: colors.textSecondary, textTransform: 'uppercase', letterSpacing: '0.5px', display: 'block', marginBottom: '8px' }}>Titre</label>
              {isEditing ? (
                <input 
                  type="text" 
                  value={editData.title} 
                  onChange={(e) => setEditData(prev => ({ ...prev, title: e.target.value }))}
                  style={{ width: '100%', padding: '12px', borderRadius: '8px', border: `1px solid ${colors.primary}`, fontSize: '14px', outline: 'none', fontWeight: 500 }}
                />
              ) : (
                <p style={{ margin: 0, fontSize: '14px', color: colors.textPrimary, fontWeight: 500 }}>{fs.title}</p>
              )}
            </div>

            {/* Description (éditable) */}
            <div>
              <label style={{ fontSize: '11px', fontWeight: 600, color: colors.textSecondary, textTransform: 'uppercase', letterSpacing: '0.5px', display: 'block', marginBottom: '8px' }}>Description</label>
              {isEditing ? (
                <textarea 
                  value={editData.description} 
                  onChange={(e) => setEditData(prev => ({ ...prev, description: e.target.value }))}
                  rows={4}
                  style={{ width: '100%', padding: '12px', borderRadius: '8px', border: `1px solid ${colors.primary}`, fontSize: '14px', outline: 'none', resize: 'vertical', fontFamily: 'inherit', lineHeight: 1.6 }}
                />
              ) : (
                <p style={{ margin: 0, fontSize: '14px', color: colors.textPrimary, lineHeight: 1.6, padding: '12px', backgroundColor: colors.background, borderRadius: '8px' }}>{fs.description}</p>
              )}
            </div>
            
            {/* URS liées */}
            {fs.linkedURS && fs.linkedURS.length > 0 && (
              <div>
                <label style={{ fontSize: '11px', fontWeight: 600, color: colors.textSecondary, textTransform: 'uppercase', letterSpacing: '0.5px', display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '8px' }}><Icons.Link /> URS liées ({fs.linkedURS.length})</label>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  {fs.linkedURS.map(urs => (
                    <div key={urs.id} style={{ padding: '10px 12px', backgroundColor: colors.background, borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', cursor: 'pointer' }}>
                      <div>
                        <span style={{ fontSize: '12px', fontWeight: 600, color: colors.primary, marginRight: '8px' }}>{urs.id}</span>
                        <span style={{ fontSize: '13px', color: colors.textPrimary }}>{urs.title}</span>
                      </div>
                      <Icons.ExternalLink style={{ color: colors.textSecondary, width: 16, height: 16 }} />
                    </div>
                  ))}
                </div>
              </div>
            )}
            
            {/* Boutons d'action */}
            <DetailActionButtons 
              canModify={canModify}
              canValidate={canValidate}
              canQaOk={canQaOk}
              isEditing={isEditing}
              onEdit={() => setIsEditing(true)}
              onSave={handleSave}
              onCancel={() => { setIsEditing(false); setEditData({ title: fs.title, description: fs.description }); }}
              onValidate={() => setIsValidated(true)}
              onQaOk={() => setIsQaOk(true)}
              isValidated={isValidated}
              isQaOk={isQaOk}
            />
          </div>
        )}
        
        {activeTab === 'discussion' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {comments.length > 0 ? (
              comments.map((comment, i) => (
                <DiscussionComment key={i} comment={comment} />
              ))
            ) : (
              <div style={{ padding: '40px 20px', textAlign: 'center', color: colors.textSecondary }}>
                <Icons.MessageCircle style={{ width: 32, height: 32, marginBottom: '12px', opacity: 0.4 }} />
                <p style={{ margin: 0, fontSize: '14px' }}>Aucun commentaire pour le moment</p>
                <p style={{ margin: '4px 0 0', fontSize: '12px' }}>Soyez le premier à commenter</p>
              </div>
            )}
          </div>
        )}
        
        {activeTab === 'history' && (
          <HistoryTimeline events={historyEvents} />
        )}
      </div>
      
      {/* Zone du bas selon l'onglet */}
      {activeTab === 'discussion' && (
        <CommentModule onPost={handlePostComment} />
      )}
    </div>
  );
};

// Contenu page FS
const FSContent = ({ userRole = 'metier', onNavigateToAnalysis }) => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [viewMode, setViewMode] = useState('list');
  const [selectedFS, setSelectedFS] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilters, setActiveFilters] = useState({});
  const [validationStatus, setValidationStatus] = useState('validated'); // Pour la démo, FS est validée
  const [showDetailPanel, setShowDetailPanel] = useState(false);
  const [showReopenModal, setShowReopenModal] = useState(false);
  const [showGenerateModal, setShowGenerateModal] = useState(false);
  const [criticalAnalysisStatus, setCriticalAnalysisStatus] = useState('issues'); // Pour la démo, 2 findings

  const fsGenerationResults = [
    { id: `FS-${String(fsData.length + 1).padStart(3, '0')}`, title: 'Timeout de session configurable', detail: 'Depuis URS-001, URS-003 • Catégorie : Sécurité & Accès', confidence: 92, badge: '🔐 Sécurité' },
    { id: `FS-${String(fsData.length + 2).padStart(3, '0')}`, title: 'Export CSV des rapports d\'audit', detail: 'Depuis URS-005, URS-009 • Catégorie : Traçabilité', confidence: 85, badge: '📋 Traçabilité' },
    { id: `FS-${String(fsData.length + 3).padStart(3, '0')}`, title: 'Notification email sur changement de statut', detail: 'Depuis URS-007 • Catégorie : Intégrations', confidence: 78, badge: '🔗 Intégrations' },
    { id: `FS-${String(fsData.length + 4).padStart(3, '0')}`, title: 'Archivage automatique après 5 ans', detail: 'Depuis URS-010 • Catégorie : Gestion des données', confidence: 65, badge: '📊 Données' },
  ];

  const getFilteredFS = () => {
    let items = fsData;
    if (selectedCategory !== 'all') items = items.filter(f => f.categoryId === selectedCategory);
    if (searchQuery) items = items.filter(f => f.title.toLowerCase().includes(searchQuery.toLowerCase()) || f.id.toLowerCase().includes(searchQuery.toLowerCase()));
    if (activeFilters.status === 'validated') items = items.filter(f => f.status === 'validated');
    if (activeFilters.status === 'review') items = items.filter(f => f.status === 'review');
    if (activeFilters.status === 'pending') items = items.filter(f => f.status !== 'validated' && f.status !== 'review');
    return items;
  };

  const fsCategoryTabs = fsCategories.map(c => ({ ...c, count: c.id === 'all' ? fsData.length : fsData.filter(f => f.categoryId === c.id).length }));

  const fsFilters = [{ id: 'status', label: 'Statut', options: [{ value: 'validated', label: 'Validées' }, { value: 'review', label: 'En revue' }, { value: 'pending', label: 'En attente' }] }];

  const filteredFS = getFilteredFS();
  const validatedCount = fsData.filter(f => f.status === 'validated').length;
  const qaReviewedCount = fsData.filter(f => f.qaReviewed).length;

  const fsValidationData = validationData.fs;
  const isApprover = userRole === 'metier'; // Simplification: métier est approbateur FS

  const handleReopen = (reason) => {
    console.log('Réouverture FS avec motif:', reason);
    setValidationStatus('draft');
    setCriticalAnalysisStatus('obsolete');
    setShowReopenModal(false);
    setShowDetailPanel(false);
    // En production: réouvrir aussi FRA en cascade
  };

  const handleApprove = () => {
    setValidationStatus('validated');
  };

  return (
    <div style={{ flex: 1, padding: '24px', overflow: 'auto', backgroundColor: colors.background, height: 'calc(100vh - 56px)' }}>
      {/* Header */}
      <div style={{ marginBottom: '24px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', color: colors.textSecondary, marginBottom: '8px' }}>
          <span>Fonctionnalités et risques</span>
          <Icons.ChevronRight />
          <span style={{ color: colors.textPrimary }}>Spécifications Fonctionnelles</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
          <div>
            <h1 style={{ fontSize: '24px', fontWeight: 700, color: colors.textPrimary, margin: '0 0 4px 0' }}>Spécifications Fonctionnelles</h1>
            <p style={{ fontSize: '14px', color: colors.textSecondary, margin: 0 }}>{fsData.length} spécifications • <span style={{ color: colors.success, fontWeight: 600 }}>{validatedCount} validées</span> • <span style={{ color: colors.primary, fontWeight: 600 }}>{fsData.filter(f => f.status === 'review').length} en revue</span> • <span style={{ color: '#0369A1', fontWeight: 600 }}>{qaReviewedCount} QA OK</span></p>
          </div>
          <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
            {/* Analyse critique */}
            <CriticalAnalysisBanner
              status={criticalAnalysisStatus}
              lastRun={criticalAnalysisStatus !== 'none' ? '25 nov.' : null}
              findings={criticalAnalysisStatus === 'issues' ? 2 : 0}
              onLaunchAnalysis={onNavigateToAnalysis}
            />
            <button onClick={() => setShowGenerateModal(true)} style={{ padding: '10px 16px', borderRadius: '8px', border: `1px solid ${colors.accent}`, backgroundColor: colors.accentLight, cursor: 'pointer', fontSize: '13px', fontWeight: 500, color: colors.primaryDark, display: 'flex', alignItems: 'center', gap: '8px' }}><Icons.Sparkles /> Générer depuis URS</button>
            <button onClick={() => { setSelectedFS({ id: '', title: '', description: '', category: '', categoryId: 'security', status: 'draft', qaReviewed: false, linkedURS: [], _isNew: true }); }} style={{ padding: '10px 16px', borderRadius: '8px', border: 'none', backgroundColor: colors.primary, color: 'white', cursor: 'pointer', fontSize: '13px', fontWeight: 500, display: 'flex', alignItems: 'center', gap: '8px' }}><Icons.Plus /> Nouvelle FS</button>
          </div>
        </div>
      </div>
      
      {/* Workflow de validation compact */}
      <ValidationWorkflowCompact 
        stepId="fs"
        status={validationStatus}
        approver={fsValidationData.approver}
        signatures={fsValidationData.signatures}
        userRole={userRole}
        isApprover={isApprover}
        onApprove={handleApprove}
        onRequestApproval={() => console.log('Demande de validation envoyée')}
        onOpenDetails={() => setShowDetailPanel(true)}
      />
      
      {/* FilterBar */}
      <FilterBar
        categories={fsCategoryTabs}
        selectedCategory={selectedCategory}
        onSelectCategory={setSelectedCategory}
        viewMode={viewMode}
        onViewModeChange={setViewMode}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        filters={fsFilters}
        activeFilters={activeFilters}
        onFilterChange={(id, val) => setActiveFilters(prev => ({ ...prev, [id]: val }))}
      />

      {/* Liste */}
      {viewMode === 'list' && (
        <div>
          {filteredFS.map(fs => <FSRow key={fs.id} fs={fs} onClick={() => setSelectedFS(fs)} />)}
          {filteredFS.length === 0 && (
            <div style={{ padding: '40px', textAlign: 'center', color: colors.textSecondary, fontSize: '14px' }}>Aucune spécification ne correspond aux filtres sélectionnés</div>
          )}
        </div>
      )}
      
      {/* Vue Carte */}
      {viewMode === 'map' && (
        <FSFeatureMap 
          data={fsData}
          categories={fsCategories}
          selectedFS={selectedFS}
          onSelectFS={setSelectedFS}
        />
      )}
      
      {/* Side Panel */}
      <SidePanel isOpen={!!selectedFS} onClose={() => setSelectedFS(null)} title={selectedFS?._isNew ? `FS-${String(fsData.length + 1).padStart(3, '0')}` : (selectedFS?.id || '')} width="450px">
        {selectedFS && <FSDetailContent fs={selectedFS} userRole={userRole} />}
      </SidePanel>
      
      {/* Panel détails workflow */}
      <ValidationDetailPanel
        isOpen={showDetailPanel}
        onClose={() => setShowDetailPanel(false)}
        stepData={fsValidationData}
        userRole={userRole}
        onReopen={() => { setShowDetailPanel(false); setShowReopenModal(true); }}
      />
      
      {/* Modal réouverture */}
      <ReopenConfirmModal
        isOpen={showReopenModal}
        onClose={() => setShowReopenModal(false)}
        onConfirm={handleReopen}
        stepName="Spécifications Fonctionnelles (FS)"
        cascadeSteps={['FRA - Analyse des Risques']}
      />

      {/* Modale génération IA */}
      <AIGenerationModal
        isOpen={showGenerateModal}
        onClose={() => setShowGenerateModal(false)}
        title="Générer des FS depuis les URS"
        subtitle="Création automatique de spécifications fonctionnelles"
        sourceLabel={`${ursData.filter(u => u.validated).length} URS validées, Documentation projet`}
        results={fsGenerationResults}
        onApply={(ids) => console.log('FS générées:', ids)}
      />
    </div>
  );
};

// =============================================================================
// PAGE: ANALYSE DES RISQUES (FRA)
// =============================================================================

// Badge niveau de risque L/M/H
const RiskLevelBadge = ({ level, size = 'normal', showLabel = true }) => {
  const config = {
    L: { bg: colors.successLight, color: colors.success, label: 'Low' },
    M: { bg: colors.warningLight, color: colors.warning, label: 'Medium' },
    H: { bg: colors.errorLight, color: colors.error, label: 'High' },
  };
  const c = config[level] || config.L;
  const padding = size === 'small' ? '2px 8px' : '4px 12px';
  const fontSize = size === 'small' ? '11px' : '13px';
  return (
    <span style={{ padding, borderRadius: '6px', fontSize, fontWeight: 600, backgroundColor: c.bg, color: c.color, display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
      {level}{showLabel && size !== 'small' && ` - ${c.label}`}
    </span>
  );
};

// Badge statut FRA
const FRAStatusBadge = ({ status, size = 'normal' }) => {
  const config = {
    validated: { bg: colors.successLight, color: colors.success, label: 'Validé' },
    review: { bg: colors.primaryLight, color: colors.primary, label: 'En revue' },
    aiScored: { bg: colors.accentLight, color: '#92400E', label: 'Pré-évalué IA' },
    draft: { bg: colors.background, color: colors.textSecondary, label: 'Brouillon' },
  };
  const c = config[status] || config.draft;
  const padding = size === 'small' ? '2px 8px' : '4px 10px';
  const fontSize = size === 'small' ? '10px' : '11px';
  return <span style={{ padding, borderRadius: '12px', fontSize, fontWeight: 500, backgroundColor: c.bg, color: c.color }}>{c.label}</span>;
};

// Sélecteur de niveau L/M/H avec tooltip
const RiskLevelSelector = ({ label, value, onChange, criterion, aiValue }) => {
  const [hoveredLevel, setHoveredLevel] = useState(null);
  const definitions = gxpDefinitions[criterion];
  const isModified = aiValue && value !== aiValue;

  return (
    <div style={{ marginBottom: '16px' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
        <span style={{ fontSize: '13px', fontWeight: 600, color: colors.textPrimary }}>{label}</span>
        {isModified && <span style={{ fontSize: '10px', padding: '2px 6px', backgroundColor: colors.primaryLight, color: colors.primary, borderRadius: '4px' }}>Modifié (IA: {aiValue})</span>}
      </div>
      <div style={{ display: 'flex', gap: '8px' }}>
        {['L', 'M', 'H'].map(level => {
          const def = definitions[level];
          const isSelected = value === level;
          const levelConfig = {
            L: { bg: colors.successLight, color: colors.success, activeBg: colors.success },
            M: { bg: colors.warningLight, color: colors.warning, activeBg: colors.warning },
            H: { bg: colors.errorLight, color: colors.error, activeBg: colors.error },
          }[level];

          return (
            <div key={level} style={{ flex: 1, position: 'relative' }}>
              <button
                onClick={() => onChange(level)}
                onMouseEnter={() => setHoveredLevel(level)}
                onMouseLeave={() => setHoveredLevel(null)}
                style={{
                  width: '100%', padding: '12px 8px', borderRadius: '8px',
                  border: isSelected ? 'none' : `2px solid ${colors.border}`,
                  cursor: 'pointer', fontSize: '14px', fontWeight: 600,
                  backgroundColor: isSelected ? levelConfig.activeBg : 'white',
                  color: isSelected ? 'white' : levelConfig.color,
                  transition: 'all 0.15s',
                }}
              >
                {level} - {def.label}
              </button>
              {hoveredLevel === level && (
                <div style={{
                  position: 'absolute', bottom: '100%', left: '50%', transform: 'translateX(-50%)',
                  marginBottom: '8px', padding: '10px 12px', backgroundColor: colors.textPrimary,
                  color: 'white', borderRadius: '8px', fontSize: '12px', lineHeight: 1.4,
                  width: '220px', zIndex: 100, boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
                }}>
                  {def.definition}
                  <div style={{ position: 'absolute', bottom: '-6px', left: '50%', transform: 'translateX(-50%)', width: 0, height: 0, borderLeft: '6px solid transparent', borderRight: '6px solid transparent', borderTop: `6px solid ${colors.textPrimary}` }} />
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

// Ligne FRA
const FRARow = ({ fs, maxPriority, onClick, isSelected }) => (
  <div onClick={onClick} style={{ display: 'grid', gridTemplateColumns: '80px 1fr 100px 100px 120px', padding: '16px 20px', backgroundColor: isSelected ? colors.primaryLight : 'white', borderBottom: `1px solid ${colors.border}`, cursor: 'pointer', alignItems: 'center', transition: 'background-color 0.15s' }}>
    <span style={{ fontSize: '13px', fontWeight: 600, color: colors.primary }}>{fs.id}</span>
    <div>
      <div style={{ fontSize: '14px', fontWeight: 500, color: colors.textPrimary, marginBottom: '2px' }}>{fs.title}</div>
      <div style={{ fontSize: '12px', color: colors.textSecondary }}>{fs.category}</div>
    </div>
    <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
      <span style={{ fontSize: '13px', color: colors.textPrimary }}>{fs.risks.length}</span>
      <span style={{ fontSize: '12px', color: colors.textSecondary }}>risque{fs.risks.length > 1 ? 's' : ''}</span>
    </div>
    <RiskLevelBadge level={maxPriority} size="small" showLabel={false} />
    <FRAStatusBadge status={fs.status} size="small" />
  </div>
);

// Panneau détail FRA (contenu du drawer)
const FRADetailContent = ({ fs, onUpdateRisks, userRole = 'qualite' }) => {
  const [activeTab, setActiveTab] = useState('details');
  const [activeRiskIndex, setActiveRiskIndex] = useState(0);
  const [risks, setRisks] = useState([...fs.risks]);
  const [isEditing, setIsEditing] = useState(false);
  const [isValidated, setIsValidated] = useState(fs.status === 'validated');
  const [comments, setComments] = useState([
    { user: 'Marie Lambert', role: 'QA', time: 'Hier 14:30', message: 'Le niveau de severity semble approprié compte tenu des conséquences potentielles sur l\'intégrité des données.', type: 'qa', avatar: 'ML' },
    { user: 'Jean Dupont', role: 'UPM', time: 'Il y a 2 jours', message: 'Pouvez-vous confirmer que tous les risques critiques ont été identifiés ?', type: 'question', avatar: 'JD' },
  ]);

  const activeRisk = risks[activeRiskIndex];
  
  const updateRisk = (field, value) => {
    const newRisks = [...risks];
    newRisks[activeRiskIndex] = { ...newRisks[activeRiskIndex], [field]: value };
    setRisks(newRisks);
  };

  const addRisk = () => {
    const newRisk = { id: risks.length + 1, category: 'data_loss', severity: 'M', likelihood: 'M', detectability: 'M', aiSeverity: null, aiLikelihood: null, aiDetectability: null };
    setRisks([...risks, newRisk]);
    setActiveRiskIndex(risks.length);
  };

  const deleteRisk = (index) => {
    if (risks.length > 1) {
      const newRisks = risks.filter((_, i) => i !== index);
      setRisks(newRisks);
      setActiveRiskIndex(Math.max(0, activeRiskIndex - 1));
    }
  };

  // Historique avec diffs
  const historyEvents = [
    { type: 'modified', action: 'Severity du risque 1 modifiée', user: 'Marie Lambert', date: '28 nov. 15:00', diff: [
      { field: 'Severity', old: 'Medium (M)', new: 'High (H)' }
    ]},
    { type: 'modified', action: 'Nouveau risque ajouté', user: 'Marie Lambert', date: '27 nov. 11:30', diff: [
      { field: 'Risque 2', new: 'Catégorie: Accès non autorisé' }
    ]},
    { type: 'created', action: 'Pré-évaluation IA', user: 'Copilot', date: '26 nov. 10:00', diff: [
      { field: 'Risques identifiés', new: '2 risques détectés automatiquement' }
    ]},
  ];

  // Permissions FRA : métier peut seulement commenter, QA peut modifier et valider
  const canModify = userRole === 'qualite';
  const canValidate = userRole === 'qualite';

  if (!activeRisk) return null;

  const riskClass = calculateRiskClass(activeRisk.severity, activeRisk.likelihood);
  const priority = calculateRiskPriority(riskClass, activeRisk.detectability);

  // Compter les priorités
  const priorityCounts = { H: 0, M: 0, L: 0 };
  risks.forEach(r => {
    const rc = calculateRiskClass(r.severity, r.likelihood);
    const p = calculateRiskPriority(rc, r.detectability);
    priorityCounts[p]++;
  });

  const handleSave = () => {
    setIsEditing(false);
  };

  const handlePostComment = (message) => {
    const newComment = {
      user: 'Jean Dupont',
      role: userRole === 'qualite' ? 'QA' : 'UPM',
      time: 'À l\'instant',
      message,
      type: userRole === 'qualite' ? 'qa' : 'default',
      avatar: 'JD'
    };
    setComments(prev => [newComment, ...prev]);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      {/* Header */}
      <div style={{ padding: '16px 20px', backgroundColor: colors.primaryLight, borderBottom: `1px solid ${colors.border}` }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px', flexWrap: 'wrap' }}>
          <span style={{ fontSize: '13px', fontWeight: 700, color: 'white', backgroundColor: colors.primary, padding: '4px 10px', borderRadius: '6px' }}>{fs.id}</span>
          <FRAStatusBadge status={fs.status} />
          {isValidated && <span style={{ padding: '4px 10px', borderRadius: '4px', fontSize: '11px', fontWeight: 600, backgroundColor: colors.successLight, color: colors.success }}>✓ Validé</span>}
        </div>
        <h3 style={{ margin: '0 0 8px 0', fontSize: '15px', fontWeight: 600, color: colors.textPrimary }}>{fs.title}</h3>
        <div style={{ display: 'flex', gap: '8px' }}>
          <span style={{ fontSize: '11px', padding: '3px 8px', backgroundColor: colors.errorLight, color: colors.error, borderRadius: '4px' }}>{priorityCounts.H} High</span>
          <span style={{ fontSize: '11px', padding: '3px 8px', backgroundColor: colors.warningLight, color: colors.warning, borderRadius: '4px' }}>{priorityCounts.M} Medium</span>
          <span style={{ fontSize: '11px', padding: '3px 8px', backgroundColor: colors.successLight, color: colors.success, borderRadius: '4px' }}>{priorityCounts.L} Low</span>
        </div>
      </div>

      {/* Tabs principaux */}
      <DetailPanelTabs activeTab={activeTab} onTabChange={setActiveTab} discussionCount={comments.length} />

      {/* Content */}
      <div style={{ flex: 1, overflow: 'auto' }}>
        {activeTab === 'details' && (
          <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
            {/* Sous-navigation risques */}
            <div style={{ display: 'flex', alignItems: 'center', padding: '10px 16px', borderBottom: `1px solid ${colors.border}`, gap: '8px', flexWrap: 'wrap', backgroundColor: colors.background }}>
              {risks.map((risk, index) => {
                const rc = calculateRiskClass(risk.severity, risk.likelihood);
                const p = calculateRiskPriority(rc, risk.detectability);
                const pColor = { H: colors.error, M: colors.warning, L: colors.success }[p];
                return (
                  <button key={index} onClick={() => setActiveRiskIndex(index)} style={{ padding: '6px 12px', borderRadius: '6px', border: activeRiskIndex === index ? `2px solid ${colors.primary}` : `1px solid ${colors.border}`, backgroundColor: activeRiskIndex === index ? 'white' : 'transparent', cursor: 'pointer', fontSize: '12px', fontWeight: activeRiskIndex === index ? 600 : 500, color: colors.textPrimary, display: 'flex', alignItems: 'center', gap: '6px' }}>
                    Risque {index + 1}
                    <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: pColor }} />
                  </button>
                );
              })}
              {canModify && (
                <button onClick={addRisk} style={{ padding: '6px 10px', borderRadius: '6px', border: `1px dashed ${colors.border}`, backgroundColor: 'transparent', cursor: 'pointer', fontSize: '12px', color: colors.textSecondary, display: 'flex', alignItems: 'center', gap: '4px' }}><Icons.Plus /> Ajouter</button>
              )}
            </div>

            {/* Contenu scoring */}
            <div style={{ flex: 1, overflow: 'auto', padding: '16px 20px' }}>
              {/* Catégorie */}
              <div style={{ marginBottom: '16px' }}>
                <label style={{ fontSize: '11px', fontWeight: 600, color: colors.textSecondary, textTransform: 'uppercase', letterSpacing: '0.5px', display: 'block', marginBottom: '8px' }}>Catégorie de risque</label>
                {isEditing ? (
                  <select value={activeRisk.category} onChange={(e) => updateRisk('category', e.target.value)} style={{ width: '100%', padding: '10px 12px', borderRadius: '8px', border: `1px solid ${colors.primary}`, fontSize: '13px', color: colors.textPrimary, backgroundColor: 'white', cursor: 'pointer' }}>
                    {riskCategories.map(cat => <option key={cat.id} value={cat.id}>{cat.label}</option>)}
                  </select>
                ) : (
                  <div style={{ padding: '10px 12px', borderRadius: '8px', backgroundColor: colors.background, fontSize: '13px', color: colors.textPrimary }}>
                    {riskCategories.find(c => c.id === activeRisk.category)?.label || activeRisk.category}
                  </div>
                )}
              </div>

              {/* Sélecteurs L/M/H */}
              {isEditing ? (
                <>
                  <RiskLevelSelector label="Severity (Gravité)" value={activeRisk.severity} onChange={(v) => updateRisk('severity', v)} criterion="severity" aiValue={activeRisk.aiSeverity} />
                  <RiskLevelSelector label="Likelihood (Probabilité)" value={activeRisk.likelihood} onChange={(v) => updateRisk('likelihood', v)} criterion="likelihood" aiValue={activeRisk.aiLikelihood} />
                  <RiskLevelSelector label="Detectability (Détectabilité)" value={activeRisk.detectability} onChange={(v) => updateRisk('detectability', v)} criterion="detectability" aiValue={activeRisk.aiDetectability} />
                </>
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '16px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 12px', backgroundColor: colors.background, borderRadius: '8px' }}>
                    <span style={{ fontSize: '13px', color: colors.textSecondary }}>Severity (Gravité)</span>
                    <RiskLevelBadge level={activeRisk.severity} />
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 12px', backgroundColor: colors.background, borderRadius: '8px' }}>
                    <span style={{ fontSize: '13px', color: colors.textSecondary }}>Likelihood (Probabilité)</span>
                    <RiskLevelBadge level={activeRisk.likelihood} />
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 12px', backgroundColor: colors.background, borderRadius: '8px' }}>
                    <span style={{ fontSize: '13px', color: colors.textSecondary }}>Detectability (Détectabilité)</span>
                    <RiskLevelBadge level={activeRisk.detectability} />
                  </div>
                </div>
              )}

              {/* Résultat calcul */}
              <div style={{ padding: '16px', backgroundColor: colors.background, borderRadius: '10px', marginTop: '8px' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
                  <span style={{ fontSize: '12px', color: colors.textSecondary }}>Risk Class (S × L)</span>
                  <RiskLevelBadge level={riskClass} size="small" />
                </div>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <span style={{ fontSize: '13px', fontWeight: 600, color: colors.textPrimary }}>Priorité finale (RC × D)</span>
                  <RiskLevelBadge level={priority} />
                </div>
              </div>

              {/* Actions */}
              {isEditing ? (
                <div style={{ display: 'flex', gap: '8px', marginTop: '16px', paddingTop: '16px', borderTop: `1px solid ${colors.border}` }}>
                  {risks.length > 1 && (
                    <button onClick={() => deleteRisk(activeRiskIndex)} style={{ padding: '10px 16px', borderRadius: '8px', border: `1px solid ${colors.error}`, backgroundColor: colors.errorLight, cursor: 'pointer', fontSize: '13px', color: colors.error, fontWeight: 500, display: 'flex', alignItems: 'center', gap: '6px' }}><Icons.Trash /> Supprimer</button>
                  )}
                  <button onClick={() => setIsEditing(false)} style={{ flex: 1, padding: '12px', borderRadius: '8px', border: `1px solid ${colors.border}`, backgroundColor: 'white', cursor: 'pointer', fontSize: '13px', color: colors.textSecondary, fontWeight: 500 }}>Annuler</button>
                  <button onClick={handleSave} style={{ flex: 1, padding: '12px', borderRadius: '8px', border: 'none', backgroundColor: colors.success, cursor: 'pointer', fontSize: '13px', color: 'white', fontWeight: 600, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }}><Icons.Check /> Enregistrer</button>
                </div>
              ) : (
                <div style={{ display: 'flex', gap: '8px', marginTop: '16px', paddingTop: '16px', borderTop: `1px solid ${colors.border}` }}>
                  {canModify && (
                    <button onClick={() => setIsEditing(true)} style={{ flex: 1, padding: '12px', borderRadius: '8px', border: `1px solid ${colors.border}`, backgroundColor: 'white', cursor: 'pointer', fontSize: '13px', color: colors.textPrimary, fontWeight: 500, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }}><Icons.Edit /> Modifier</button>
                  )}
                  {canValidate && (
                    <button onClick={() => setIsValidated(true)} disabled={isValidated} style={{ flex: 1, padding: '12px', borderRadius: '8px', border: 'none', backgroundColor: isValidated ? colors.successLight : colors.primary, cursor: isValidated ? 'default' : 'pointer', fontSize: '13px', color: isValidated ? colors.success : 'white', fontWeight: 600, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }}>
                      {isValidated ? <><Icons.CheckCircle /> Validé</> : <><Icons.Check /> Valider l'évaluation</>}
                    </button>
                  )}
                  {!canModify && !canValidate && (
                    <div style={{ padding: '12px', backgroundColor: colors.background, borderRadius: '8px', fontSize: '12px', color: colors.textSecondary, textAlign: 'center', width: '100%' }}>
                      🔒 Lecture seule — Seul le rôle Qualité peut modifier et valider le FRA
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        )}
        
        {activeTab === 'discussion' && (
          <div style={{ padding: '16px 20px' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {comments.length > 0 ? (
                comments.map((comment, i) => (
                  <DiscussionComment key={i} comment={comment} />
                ))
              ) : (
                <div style={{ padding: '40px 20px', textAlign: 'center', color: colors.textSecondary }}>
                  <Icons.MessageCircle style={{ width: 32, height: 32, marginBottom: '12px', opacity: 0.4 }} />
                  <p style={{ margin: 0, fontSize: '14px' }}>Aucun commentaire pour le moment</p>
                  <p style={{ margin: '4px 0 0', fontSize: '12px' }}>Soyez le premier à commenter</p>
                </div>
              )}
            </div>
          </div>
        )}
        
        {activeTab === 'history' && (
          <div style={{ padding: '16px 20px' }}>
            <HistoryTimeline events={historyEvents} />
          </div>
        )}
      </div>

      {/* Zone du bas selon l'onglet */}
      {activeTab === 'discussion' && (
        <CommentModule onPost={handlePostComment} />
      )}
    </div>
  );
};

// Contenu page FRA
const FRAContent = ({ userRole = 'qualite' }) => {
  const [selectedFS, setSelectedFS] = useState(null);
  const [validationStatus, setValidationStatus] = useState('draft'); // Pour la démo, FRA est en rédaction
  const [viewMode, setViewMode] = useState('list'); // 'list' | 'map'
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilters, setActiveFilters] = useState({});
  const [showDetailPanel, setShowDetailPanel] = useState(false);
  const [showReopenModal, setShowReopenModal] = useState(false);
  const [showGenerateModal, setShowGenerateModal] = useState(false);

  const fraGenerationResults = fraData.map(fs => {
    const maxP = (() => { let m = 'L'; fs.risks.forEach(r => { const rc = calculateRiskClass(r.aiSeverity || r.severity, r.aiLikelihood || r.likelihood); const p = calculateRiskPriority(rc, r.aiDetectability || r.detectability); if (p === 'H') m = 'H'; else if (p === 'M' && m !== 'H') m = 'M'; }); return m; })();
    return {
      id: fs.id,
      title: fs.title,
      detail: `${fs.risks.length} risque(s) • S:${fs.risks[0]?.aiSeverity || 'M'} L:${fs.risks[0]?.aiLikelihood || 'M'} D:${fs.risks[0]?.aiDetectability || 'M'} → Priorité ${maxP}`,
      confidence: maxP === 'H' ? 88 : maxP === 'M' ? 76 : 92,
      badge: `Priorité ${maxP}`,
    };
  });

  const getMaxPriority = (risks) => {
    let max = 'L';
    risks.forEach(r => {
      const rc = calculateRiskClass(r.severity, r.likelihood);
      const p = calculateRiskPriority(rc, r.detectability);
      if (p === 'H') max = 'H';
      else if (p === 'M' && max !== 'H') max = 'M';
    });
    return max;
  };

  const stats = {
    high: fraData.filter(fs => getMaxPriority(fs.risks) === 'H').length,
    medium: fraData.filter(fs => getMaxPriority(fs.risks) === 'M').length,
    low: fraData.filter(fs => getMaxPriority(fs.risks) === 'L').length,
    validated: fraData.filter(fs => fs.status === 'validated').length,
  };

  const getFilteredFRA = () => {
    let items = fraData;
    if (selectedCategory !== 'all') items = items.filter(fs => fs.risks.some(r => r.category === selectedCategory));
    if (searchQuery) items = items.filter(fs => fs.title.toLowerCase().includes(searchQuery.toLowerCase()) || fs.id.toLowerCase().includes(searchQuery.toLowerCase()));
    if (activeFilters.priority === 'H') items = items.filter(fs => getMaxPriority(fs.risks) === 'H');
    if (activeFilters.priority === 'M') items = items.filter(fs => getMaxPriority(fs.risks) === 'M');
    if (activeFilters.priority === 'L') items = items.filter(fs => getMaxPriority(fs.risks) === 'L');
    if (activeFilters.status === 'validated') items = items.filter(fs => fs.status === 'validated');
    if (activeFilters.status === 'pending') items = items.filter(fs => fs.status !== 'validated');
    return items;
  };

  const fraCategoryTabs = [
    { id: 'all', label: 'Tous les risques', count: fraData.length },
    ...riskCategories.map(c => ({ ...c, label: c.shortLabel || c.label, count: fraData.filter(fs => fs.risks.some(r => r.category === c.id)).length }))
  ];

  const fraFilters = [
    { id: 'priority', label: 'Priorité', options: [{ value: 'H', label: 'High' }, { value: 'M', label: 'Medium' }, { value: 'L', label: 'Low' }] },
    { id: 'status', label: 'Statut', options: [{ value: 'validated', label: 'Validé' }, { value: 'pending', label: 'En attente' }] }
  ];

  const fraValidationData = validationData.fra;
  const isApprover = userRole === 'qualite'; // QA est approbateur FRA

  const handleReopen = (reason) => {
    console.log('Réouverture FRA avec motif:', reason);
    setValidationStatus('draft');
    setShowReopenModal(false);
    setShowDetailPanel(false);
    // FRA est le dernier de la chaîne, pas de cascade
  };

  const handleApprove = () => {
    setValidationStatus('validated');
  };

  return (
    <div style={{ flex: 1, padding: '24px', overflow: 'auto', backgroundColor: colors.background, height: 'calc(100vh - 56px)' }}>
      {/* Header */}
      <div style={{ marginBottom: '24px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', color: colors.textSecondary, marginBottom: '8px' }}>
          <span>Fonctionnalités et risques</span>
          <Icons.ChevronRight />
          <span style={{ color: colors.textPrimary }}>Analyse des risques (FRA)</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
          <div>
            <h1 style={{ fontSize: '24px', fontWeight: 700, color: colors.textPrimary, margin: '0 0 4px 0' }}>Analyse des risques (FRA)</h1>
            <p style={{ fontSize: '14px', color: colors.textSecondary, margin: 0 }}>{fraData.length} spécifications • <span style={{ color: colors.error, fontWeight: 600 }}>{stats.high} High</span> • <span style={{ color: colors.warning, fontWeight: 600 }}>{stats.medium} Medium</span> • <span style={{ color: colors.success, fontWeight: 600 }}>{stats.low} Low</span> • <span style={{ fontWeight: 600 }}>{stats.validated}/{fraData.length} validées</span></p>
          </div>
          <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
            <button style={{ padding: '10px 16px', borderRadius: '8px', border: `1px solid ${colors.border}`, backgroundColor: 'white', cursor: 'pointer', fontSize: '13px', fontWeight: 500, color: colors.textPrimary, display: 'flex', alignItems: 'center', gap: '8px' }}><Icons.Download /> Exporter</button>
            <button onClick={() => setShowGenerateModal(true)} style={{ padding: '10px 16px', borderRadius: '8px', border: `1px solid ${colors.accent}`, backgroundColor: colors.accentLight, cursor: 'pointer', fontSize: '13px', fontWeight: 500, color: colors.primaryDark, display: 'flex', alignItems: 'center', gap: '8px' }}><Icons.Sparkles /> Pré-évaluer les risques</button>
          </div>
        </div>
      </div>

      {/* Workflow de validation compact */}
      <ValidationWorkflowCompact 
        stepId="fra"
        status={validationStatus}
        approver={fraValidationData.approver}
        signatures={fraValidationData.signatures}
        userRole={userRole}
        isApprover={isApprover}
        onApprove={handleApprove}
        onRequestApproval={() => console.log('Demande de validation envoyée')}
        onOpenDetails={() => setShowDetailPanel(true)}
      />

      {/* FilterBar */}
      <FilterBar
        categories={fraCategoryTabs}
        selectedCategory={selectedCategory}
        onSelectCategory={setSelectedCategory}
        viewMode={viewMode}
        onViewModeChange={setViewMode}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        filters={fraFilters}
        activeFilters={activeFilters}
        onFilterChange={(id, val) => setActiveFilters(prev => ({ ...prev, [id]: val }))}
      />

      {/* Vue Liste */}
      {viewMode === 'list' && (
        <>
          {/* Tableau */}
          <div style={{ backgroundColor: 'white', borderRadius: '12px', border: `1px solid ${colors.border}`, overflow: 'hidden' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '80px 1fr 100px 100px 120px', padding: '14px 20px', backgroundColor: colors.background, borderBottom: `1px solid ${colors.border}`, fontSize: '11px', fontWeight: 600, color: colors.textSecondary, textTransform: 'uppercase', letterSpacing: '0.5px' }}>
              <div>ID</div>
              <div>Spécification</div>
              <div>Nb Risques</div>
              <div>Priorité max</div>
              <div>Statut</div>
            </div>
            {getFilteredFRA().map(fs => (
              <FRARow key={fs.id} fs={fs} maxPriority={getMaxPriority(fs.risks)} onClick={() => setSelectedFS(fs)} isSelected={selectedFS?.id === fs.id} />
            ))}
            {getFilteredFRA().length === 0 && (
              <div style={{ padding: '40px', textAlign: 'center', color: colors.textSecondary, fontSize: '14px' }}>Aucune analyse ne correspond aux filtres sélectionnés</div>
            )}
          </div>
        </>
      )}

      {/* Vue Carte */}
      {viewMode === 'map' && (
        <FRAFeatureMap 
          data={fraData}
          selectedFS={selectedFS}
          onSelectFS={setSelectedFS}
          calculatePriority={getMaxPriority}
        />
      )}

      {/* Side Panel */}
      <SidePanel isOpen={!!selectedFS} onClose={() => setSelectedFS(null)} title={`Scoring ${selectedFS?.id || ''}`} width="480px">
        {selectedFS && <FRADetailContent fs={selectedFS} userRole={userRole} />}
      </SidePanel>
      
      {/* Panel détails workflow */}
      <ValidationDetailPanel
        isOpen={showDetailPanel}
        onClose={() => setShowDetailPanel(false)}
        stepData={fraValidationData}
        userRole={userRole}
        onReopen={() => { setShowDetailPanel(false); setShowReopenModal(true); }}
      />
      
      {/* Modal réouverture */}
      <ReopenConfirmModal
        isOpen={showReopenModal}
        onClose={() => setShowReopenModal(false)}
        onConfirm={handleReopen}
        stepName="Analyse des Risques (FRA)"
        cascadeSteps={[]}
      />

      {/* Modale génération IA */}
      <AIGenerationModal
        isOpen={showGenerateModal}
        onClose={() => setShowGenerateModal(false)}
        title="Pré-évaluation des risques"
        subtitle="Scoring automatique Severity / Likelihood / Detectability"
        sourceLabel={`${fsData.length} FS, ${ursData.length} URS, Plan de validation (SVP)`}
        results={fraGenerationResults}
        onApply={(ids) => console.log('Risques évalués:', ids)}
      />
    </div>
  );
};
// =============================================================================
// PAGE D'ACCUEIL - DONNÉES
// =============================================================================

// Projets mockés
// Données projets pour la page d'accueil
// Projet du Métier (1 seul projet visible)
const metierProjectData = { 
  id: 'lims-v3.2', 
  name: 'LIMS v3.2', 
  client: 'Laboratoire Central',
  progress: 35, 
  status: 'in_progress',
  phase: 'Qualification',
  dueDate: '15 déc. 2024',
  team: ['JD', 'ML', 'PT'],
  // Nouveautés depuis dernière consultation
  lastVisited: '2024-12-01',
  newURS: 3,
  newFS: 2,
  modifications: 1,
  newComments: 2,
  // Validations en attente pour ce profil
  pendingValidations: { urs: 2, fs: 1 },
};

// Projets du QA (7 projets)
const qaProjectsData = [
  { 
    id: 'lims-v3.2', 
    name: 'LIMS v3.2', 
    client: 'Laboratoire Central',
    department: 'R&D',
    progress: 35, 
    status: 'in_progress',
    phase: 'Qualification',
    dueDate: '15 déc. 2024',
    lastVisited: '2024-12-02',
    newURS: 2,
    newFS: 1,
    modifications: 3,
    newComments: 4,
    pendingValidations: { fra: 1 },
  },
  { 
    id: 'erp-mfg', 
    name: 'ERP Manufacturing', 
    client: 'Site Production Lyon',
    department: 'Industrie',
    progress: 60, 
    status: 'review',
    phase: 'Revue QA',
    dueDate: '20 déc. 2024',
    lastVisited: '2024-12-03',
    newURS: 0,
    newFS: 2,
    modifications: 0,
    newComments: 1,
    pendingValidations: { fra: 2 },
  },
  { 
    id: 'mes-prod', 
    name: 'MES Production', 
    client: 'Site Production Nantes',
    department: 'Industrie',
    progress: 15, 
    status: 'starting',
    phase: 'Démarrage',
    dueDate: '15 jan. 2025',
    lastVisited: '2024-12-01',
    newURS: 5,
    newFS: 0,
    modifications: 2,
    newComments: 0,
    pendingValidations: {},
  },
  { 
    id: 'qms-v2', 
    name: 'QMS v2.0', 
    client: 'Direction Qualité',
    department: 'DDSI',
    progress: 45, 
    status: 'in_progress',
    phase: 'Spécifications',
    dueDate: '10 jan. 2025',
    lastVisited: '2024-11-28',
    newURS: 1,
    newFS: 4,
    modifications: 1,
    newComments: 3,
    pendingValidations: { fra: 1 },
  },
  { 
    id: 'scada-upgrade', 
    name: 'SCADA Upgrade', 
    client: 'Maintenance Centrale',
    department: 'Industrie',
    progress: 80, 
    status: 'review',
    phase: 'Tests OQ',
    dueDate: '05 déc. 2024',
    lastVisited: '2024-12-03',
    newURS: 0,
    newFS: 0,
    modifications: 1,
    newComments: 0,
    pendingValidations: {},
  },
  { 
    id: 'dms-archive', 
    name: 'DMS Archive', 
    client: 'Direction Réglementaire',
    department: 'R&D',
    progress: 25, 
    status: 'in_progress',
    phase: 'URS',
    dueDate: '30 jan. 2025',
    lastVisited: '2024-12-02',
    newURS: 0,
    newFS: 0,
    modifications: 0,
    newComments: 2,
    pendingValidations: { fra: 1 },
  },
  { 
    id: 'bi-reporting', 
    name: 'BI Reporting', 
    client: 'Direction Financière',
    department: 'DDSI',
    progress: 55, 
    status: 'in_progress',
    phase: 'FS',
    dueDate: '20 déc. 2024',
    lastVisited: '2024-11-30',
    newURS: 0,
    newFS: 3,
    modifications: 2,
    newComments: 1,
    pendingValidations: {},
  },
];

// =============================================================================
// DONNÉES DASHBOARD ADMIN (Phase 3)
// =============================================================================

// 30 projets pour le dashboard admin
const adminProjectsData = [
  { id: 'lims-v3.2', name: 'LIMS v3.2', client: 'Laboratoire Central', department: 'R&D', qa: 'Marie L.', phase: 'Qualification', progress: 35, targetDate: '15 déc. 2024', planningStatus: 'ok', size: 'gros', gxpType: 'direct' },
  { id: 'erp-mfg', name: 'ERP Manufacturing', client: 'Production', department: 'Industrie', qa: 'Thomas B.', phase: 'FRA', progress: 60, targetDate: '10 déc. 2024', planningStatus: 'risk', size: 'gros', gxpType: 'direct' },
  { id: 'mes-prod', name: 'MES Production', client: 'Usine Lyon', department: 'Industrie', qa: 'Sophie M.', phase: 'URS', progress: 15, targetDate: '28 fév. 2025', planningStatus: 'ok', size: 'moyen', gxpType: 'direct' },
  { id: 'qms-v2', name: 'QMS v2.0', client: 'Qualité Groupe', department: 'DDSI', qa: 'Pierre D.', phase: 'FS', progress: 45, targetDate: '20 jan. 2025', planningStatus: 'ok', size: 'gros', gxpType: 'indirect' },
  { id: 'scada-upgrade', name: 'SCADA Upgrade', client: 'Maintenance', department: 'Industrie', qa: 'Marie L.', phase: 'Tests OQ', progress: 80, targetDate: '05 déc. 2024', planningStatus: 'late', size: 'moyen', gxpType: 'direct' },
  { id: 'dms-archive', name: 'DMS Archive', client: 'Réglementaire', department: 'R&D', qa: 'Julie R.', phase: 'URS', progress: 25, targetDate: '30 jan. 2025', planningStatus: 'ok', size: 'petit', gxpType: 'indirect' },
  { id: 'bi-reporting', name: 'BI Reporting', client: 'Direction Fin.', department: 'DDSI', qa: 'Thomas B.', phase: 'FS', progress: 55, targetDate: '20 déc. 2024', planningStatus: 'risk', size: 'moyen', gxpType: 'data' },
  { id: 'crm-pharma', name: 'CRM Pharma', client: 'Commercial', department: 'DDSI', qa: 'Emma V.', phase: 'SVP', progress: 10, targetDate: '15 mars 2025', planningStatus: 'ok', size: 'moyen', gxpType: 'data' },
  { id: 'ems-energy', name: 'EMS Energy', client: 'Facilities', department: 'Industrie', qa: 'Lucas P.', phase: 'FRA', progress: 70, targetDate: '12 déc. 2024', planningStatus: 'ok', size: 'petit', gxpType: 'indirect' },
  { id: 'wms-logistic', name: 'WMS Logistic', client: 'Supply Chain', department: 'Industrie', qa: 'Sophie M.', phase: 'Tests IQ', progress: 75, targetDate: '08 déc. 2024', planningStatus: 'late', size: 'gros', gxpType: 'direct' },
  { id: 'edms-v4', name: 'EDMS v4', client: 'Documentation', department: 'R&D', qa: 'Pierre D.', phase: 'FS', progress: 50, targetDate: '25 jan. 2025', planningStatus: 'ok', size: 'moyen', gxpType: 'indirect' },
  { id: 'lims-biotech', name: 'LIMS Biotech', client: 'Labo Biotech', department: 'R&D', qa: 'Marie L.', phase: 'URS', progress: 20, targetDate: '10 fév. 2025', planningStatus: 'ok', size: 'gros', gxpType: 'direct' },
  { id: 'batch-record', name: 'Batch Record', client: 'Production', department: 'Industrie', qa: 'Thomas B.', phase: 'Qualification', progress: 40, targetDate: '18 déc. 2024', planningStatus: 'ok', size: 'moyen', gxpType: 'direct' },
  { id: 'audit-trail', name: 'Audit Trail Sys', client: 'IT Sécurité', department: 'DDSI', qa: 'Julie R.', phase: 'FRA', progress: 65, targetDate: '15 déc. 2024', planningStatus: 'ok', size: 'petit', gxpType: 'direct' },
  { id: 'calibration', name: 'Calibration Mgmt', client: 'Métrologie', department: 'Industrie', qa: 'Emma V.', phase: 'Tests OQ', progress: 85, targetDate: '06 déc. 2024', planningStatus: 'ok', size: 'petit', gxpType: 'indirect' },
  { id: 'sap-qm', name: 'SAP QM Module', client: 'Qualité', department: 'DDSI', qa: 'Lucas P.', phase: 'FS', progress: 35, targetDate: '30 déc. 2024', planningStatus: 'risk', size: 'gros', gxpType: 'direct' },
  { id: 'pharma-erp', name: 'Pharma ERP', client: 'Operations', department: 'DDSI', qa: 'Sophie M.', phase: 'SVP', progress: 5, targetDate: '20 avril 2025', planningStatus: 'ok', size: 'gros', gxpType: 'direct' },
  { id: 'deviation-mgmt', name: 'Deviation Mgmt', client: 'Qualité Ops', department: 'Industrie', qa: 'Pierre D.', phase: 'URS', progress: 30, targetDate: '05 fév. 2025', planningStatus: 'ok', size: 'moyen', gxpType: 'direct' },
  { id: 'training-lms', name: 'Training LMS', client: 'RH', department: 'DDSI', qa: 'Julie R.', phase: 'Qualification', progress: 55, targetDate: '22 déc. 2024', planningStatus: 'ok', size: 'moyen', gxpType: 'indirect' },
  { id: 'env-monitor', name: 'Env Monitoring', client: 'Facilities', department: 'Industrie', qa: 'Marie L.', phase: 'Tests PQ', progress: 90, targetDate: '04 déc. 2024', planningStatus: 'ok', size: 'moyen', gxpType: 'direct' },
  { id: 'lab-notebook', name: 'Electronic LN', client: 'R&D Labs', department: 'R&D', qa: 'Thomas B.', phase: 'FRA', progress: 50, targetDate: '10 jan. 2025', planningStatus: 'ok', size: 'moyen', gxpType: 'direct' },
  { id: 'spec-mgmt', name: 'Spec Management', client: 'Qualité', department: 'R&D', qa: 'Emma V.', phase: 'FS', progress: 40, targetDate: '18 jan. 2025', planningStatus: 'ok', size: 'petit', gxpType: 'indirect' },
  { id: 'stability-sys', name: 'Stability System', client: 'Labo Stabilité', department: 'R&D', qa: 'Lucas P.', phase: 'URS', progress: 15, targetDate: '28 fév. 2025', planningStatus: 'ok', size: 'moyen', gxpType: 'direct' },
  { id: 'supplier-qual', name: 'Supplier Qual', client: 'Achats', department: 'Industrie', qa: 'Sophie M.', phase: 'Qualification', progress: 60, targetDate: '14 déc. 2024', planningStatus: 'late', size: 'petit', gxpType: 'indirect' },
];

// Équipe QA (15 personnes)
const qaTeamData = [
  { id: 'qa1', name: 'Marie L.', initials: 'ML', projects: 4, workload: 32, capacity: 35, status: 'ok' },
  { id: 'qa2', name: 'Thomas B.', initials: 'TB', projects: 4, workload: 38, capacity: 35, status: 'overload' },
  { id: 'qa3', name: 'Sophie M.', initials: 'SM', projects: 4, workload: 30, capacity: 35, status: 'ok' },
  { id: 'qa4', name: 'Pierre D.', initials: 'PD', projects: 3, workload: 28, capacity: 35, status: 'ok' },
  { id: 'qa5', name: 'Julie R.', initials: 'JR', projects: 3, workload: 25, capacity: 35, status: 'underload' },
  { id: 'qa6', name: 'Emma V.', initials: 'EV', projects: 3, workload: 26, capacity: 35, status: 'underload' },
  { id: 'qa7', name: 'Lucas P.', initials: 'LP', projects: 3, workload: 30, capacity: 35, status: 'ok' },
  { id: 'qa8', name: 'Camille D.', initials: 'CD', projects: 0, workload: 0, capacity: 35, status: 'available' },
  { id: 'qa9', name: 'Antoine M.', initials: 'AM', projects: 0, workload: 0, capacity: 35, status: 'available' },
  { id: 'qa10', name: 'Laura B.', initials: 'LB', projects: 0, workload: 5, capacity: 35, status: 'underload' },
  { id: 'qa11', name: 'Nicolas R.', initials: 'NR', projects: 0, workload: 8, capacity: 35, status: 'underload' },
  { id: 'qa12', name: 'Pauline G.', initials: 'PG', projects: 0, workload: 0, capacity: 35, status: 'available' },
  { id: 'qa13', name: 'Marc T.', initials: 'MT', projects: 0, workload: 12, capacity: 35, status: 'underload' },
  { id: 'qa14', name: 'Céline F.', initials: 'CF', projects: 0, workload: 0, capacity: 35, status: 'available' },
  { id: 'qa15', name: 'David L.', initials: 'DL', projects: 0, workload: 10, capacity: 35, status: 'underload' },
];

// Projets à venir (pipeline)
const upcomingProjectsData = [
  { id: 'up1', name: 'LIMS v4.0', client: 'Labo Central', department: 'R&D', estimatedStart: 'Jan. 2025', estimatedWorkload: 45, size: 'gros', gxpType: 'direct', qaAssigned: null },
  { id: 'up2', name: 'MES v2 Upgrade', client: 'Production', department: 'Industrie', estimatedStart: 'Fév. 2025', estimatedWorkload: 35, size: 'gros', gxpType: 'direct', qaAssigned: null },
  { id: 'up3', name: 'QMS Mobile', client: 'Qualité', department: 'DDSI', estimatedStart: 'Fév. 2025', estimatedWorkload: 20, size: 'moyen', gxpType: 'indirect', qaAssigned: 'Camille D.' },
  { id: 'up4', name: 'Serialization', client: 'Packaging', department: 'Industrie', estimatedStart: 'Mars 2025', estimatedWorkload: 40, size: 'gros', gxpType: 'direct', qaAssigned: null },
  { id: 'up5', name: 'Data Lake', client: 'Data Science', department: 'DDSI', estimatedStart: 'Mars 2025', estimatedWorkload: 25, size: 'moyen', gxpType: 'data', qaAssigned: 'Antoine M.' },
  { id: 'up6', name: 'Chromatography', client: 'Labo Analytique', department: 'R&D', estimatedStart: 'Avril 2025', estimatedWorkload: 30, size: 'moyen', gxpType: 'direct', qaAssigned: null },
];

// Données graphiques - Validations par semaine (8 dernières semaines)
const weeklyValidationsData = [
  { week: 'S44', validations: 12 },
  { week: 'S45', validations: 18 },
  { week: 'S46', validations: 15 },
  { week: 'S47', validations: 22 },
  { week: 'S48', validations: 8 },
  { week: 'S49', validations: 25 },
  { week: 'S50', validations: 19 },
  { week: 'S51', validations: 14 },
];

// Données graphiques - Projets créés par mois (6 derniers mois)  
const monthlyProjectsData = [
  { month: 'Juil.', created: 3, completed: 2 },
  { month: 'Août', created: 2, completed: 1 },
  { month: 'Sept.', created: 5, completed: 3 },
  { month: 'Oct.', created: 4, completed: 2 },
  { month: 'Nov.', created: 6, completed: 4 },
  { month: 'Déc.', created: 4, completed: 1 },
];

// Données pour compatibilité avec les autres pages
const projectsData = [
  { 
    id: 'lims-v3.2', 
    name: 'LIMS v3.2', 
    client: 'Laboratoire Central',
    progress: 35, 
    status: 'in_progress',
    phase: 'Qualification',
    nextAction: 'Valider 3 URS en attente',
    dueDate: '15 déc. 2024',
    team: ['JD', 'ML', 'PT'],
    urgentTasks: 2,
  },
];

// Tâches mockées
const tasksData = [
  { id: 1, title: 'Valider URS-003 "Politique mots de passe"', project: 'LIMS v3.2', projectId: 'lims-v3.2', type: 'validation', priority: 'urgent', dueDate: 'Aujourd\'hui', completed: false },
  { id: 2, title: 'Revue QA des spécifications FS-002', project: 'ERP Manufacturing', projectId: 'erp-mfg', type: 'review', priority: 'urgent', dueDate: 'Demain', completed: false },
  { id: 3, title: 'Compléter le scoring FRA', project: 'LIMS v3.2', projectId: 'lims-v3.2', type: 'scoring', priority: 'high', dueDate: 'Cette semaine', completed: false },
  { id: 4, title: 'Approuver le Plan de Validation (SVP)', project: 'MES Production v1', projectId: 'mes-prod', type: 'approval', priority: 'normal', dueDate: '10 déc.', completed: false },
  { id: 5, title: 'Ajouter documents techniques', project: 'ERP Manufacturing', projectId: 'erp-mfg', type: 'documentation', priority: 'normal', dueDate: '12 déc.', completed: false },
  { id: 6, title: 'Finaliser rapport de tests OQ', project: 'CRM Pharma v2.1', projectId: 'crm-pharma', type: 'report', priority: 'low', dueDate: 'Terminé', completed: true },
];

// Activité récente
const activityData = [
  { id: 1, user: 'Jean Dupont', avatar: 'JD', action: 'a validé', target: 'URS-001 "Authentification"', project: 'LIMS v3.2', time: 'Il y a 2h' },
  { id: 2, user: 'Marie Lambert', avatar: 'ML', action: 'a commenté', target: 'FS-003 "Journalisation"', project: 'ERP Manufacturing', time: 'Il y a 4h' },
  { id: 3, user: 'Pierre Thomas', avatar: 'PT', action: 'a soumis pour revue', target: 'FRA complet', project: 'LIMS v3.2', time: 'Il y a 6h' },
  { id: 4, user: 'Sophie Laurent', avatar: 'SL', action: 'a finalisé', target: 'Rapport VSR', project: 'CRM Pharma v2.1', time: 'Hier' },
  { id: 5, user: 'Alain Bernard', avatar: 'AB', action: 'a créé', target: 'Nouveau projet', project: 'MES Production v1', time: 'Hier' },
];

// Ressources partagées QA
const sharedResources = [
  { id: 1, name: 'Template URS', type: 'template', icon: '📄', downloads: 234 },
  { id: 2, name: 'Checklist Validation', type: 'checklist', icon: '✅', downloads: 189 },
  { id: 3, name: 'Matrice de Traçabilité', type: 'matrix', icon: '🔗', downloads: 156 },
  { id: 4, name: 'SOP Qualification Systèmes', type: 'sop', icon: '📋', downloads: 312 },
  { id: 5, name: 'Guide FRA GxP', type: 'guide', icon: '📚', downloads: 98 },
];

// Stats admin
const adminStats = {
  totalProjects: 12,
  activeProjects: 8,
  completedThisMonth: 2,
  avgCompletionTime: '45 jours',
  complianceRate: 94,
  pendingValidations: 15,
  overdueItems: 3,
};

// =============================================================================
// BACKOFFICE - DONNÉES
// =============================================================================

// Définition des rôles projet
const backofficeRoles = [
  { id: 'upm', abbr: 'UPM', name: 'User Project Manager', description: 'Représente les utilisateurs métier. Coordonne les activités côté utilisateur et facilite la communication.', category: 'Métier', required: false },
  { id: 'qc', abbr: 'QC', name: 'Quality Champion', description: 'Responsable des activités de validation au quotidien. Point de contact principal pour les questions qualité du projet.', category: 'Qualité', required: true },
  { id: 'itpm', abbr: 'ITPM', name: 'IT Project Manager', description: 'Gère le projet côté IT. Planifie les ressources, suit les délais et coordonne les équipes techniques.', category: 'IT', required: false },
  { id: 'solo', abbr: 'SolO', name: 'Solution Owner', description: 'Expert technique et fonctionnel du système. Fait le lien entre les besoins métier et les solutions techniques.', category: 'IT', required: true },
  { id: 'qa', abbr: 'QA', name: 'QA Expert', description: 'Assure la conformité qualité et réglementaire. Valide les documents de qualification et supervise les activités de test.', category: 'Qualité', required: true },
  { id: 'so', abbr: 'SO', name: 'System Owner', description: 'Responsable de la disponibilité, maintenance et évolution du système. Assure le bon fonctionnement technique.', category: 'IT', required: true },
  { id: 'po', abbr: 'PO', name: 'Process Owner', description: 'Responsable du processus métier supporté par le système. Définit les besoins fonctionnels et valide que le système répond aux exigences.', category: 'Métier', required: true },
];

// Livrables pour la matrice RACI
const raciDeliverables = [
  { id: 'svp', name: 'System Validation Plan (SVP)', phase: 'Planification', description: 'Plan de validation du système' },
  { id: 'urs', name: 'User Requirements (URS)', phase: 'Spécifications', description: 'Spécification des besoins utilisateurs' },
  { id: 'fs', name: 'Functional Specifications (FS)', phase: 'Spécifications', description: 'Spécifications fonctionnelles du système' },
  { id: 'fra', name: 'Functional Risk Assessment (FRA)', phase: 'Analyse', description: 'Analyse des risques fonctionnels' },
  { id: 'protocols', name: 'Protocoles de test (IQ/OQ/PQ)', phase: 'Tests', description: 'Protocoles de qualification' },
  { id: 'scripts', name: 'Scripts de test', phase: 'Tests', description: 'Scripts d\'exécution des tests' },
  { id: 'reports', name: 'Rapports de test', phase: 'Tests', description: 'Rapports d\'exécution et résultats' },
  { id: 'vsr', name: 'Validation Summary Report (VSR)', phase: 'Validation', description: 'Rapport final de validation' },
];

// Matrice RACI par défaut (rôle -> livrable -> valeur)
const defaultRaciMatrix = {
  svp: { upm: 'C', qc: 'R', itpm: '-', solo: 'C', qa: 'A/R', so: '-', po: 'C' },
  urs: { upm: 'R', qc: 'R', itpm: '-', solo: 'C', qa: 'C', so: '-', po: 'A' },
  fs: { upm: 'C', qc: 'R', itpm: '-', solo: 'R', qa: 'C', so: 'A', po: 'C' },
  fra: { upm: 'C', qc: 'R', itpm: '-', solo: 'C', qa: 'A/R', so: '-', po: 'I' },
  protocols: { upm: 'I', qc: 'R', itpm: '-', solo: 'C', qa: 'A', so: 'C', po: 'I' },
  scripts: { upm: 'I', qc: 'R', itpm: '-', solo: 'R', qa: 'A', so: 'C', po: 'I' },
  reports: { upm: 'I', qc: 'R', itpm: '-', solo: 'C', qa: 'A', so: 'C', po: 'I' },
  vsr: { upm: 'C', qc: 'R', itpm: '-', solo: 'C', qa: 'A/R', so: 'C', po: 'C' },
};

// Permissions RACI
const raciPermissions = {
  R: { label: 'Responsible', color: colors.primary, bg: colors.primaryLight, permissions: ['Modifier', 'Commenter', 'Transférer/Ajouter intervenants'] },
  A: { label: 'Accountable', color: '#F59E0B', bg: '#FEF3C7', permissions: ['Modifier', 'Commenter', 'Valider/Approuver'] },
  C: { label: 'Consulted', color: '#8B5CF6', bg: '#EDE9FE', permissions: ['Modifier', 'Commenter'] },
  I: { label: 'Informed', color: colors.textSecondary, bg: colors.background, permissions: ['Commenter'] },
  '-': { label: 'Non impliqué', color: colors.border, bg: 'transparent', permissions: [] },
  'A/R': { label: 'Accountable & Responsible', color: '#F59E0B', bg: '#FEF3C7', permissions: ['Modifier', 'Commenter', 'Valider', 'Transférer'] },
  'R/A': { label: 'Responsible & Accountable', color: '#F59E0B', bg: '#FEF3C7', permissions: ['Modifier', 'Commenter', 'Valider', 'Transférer'] },
  'C/I': { label: 'Consulted & Informed', color: '#8B5CF6', bg: '#EDE9FE', permissions: ['Modifier', 'Commenter'] },
};

// Utilisateurs système
const systemUsers = [
  { id: 1, name: 'Jean Dupont', email: 'jean.dupont@company.com', department: 'QA R&D', role: 'UPM', status: 'active', lastLogin: '2024-12-01 14:30', projects: 3 },
  { id: 2, name: 'Marie Lambert', email: 'marie.lambert@company.com', department: 'Contrôle Qualité', role: 'QA', status: 'active', lastLogin: '2024-12-02 09:15', projects: 5 },
  { id: 3, name: 'Pierre Thomas', email: 'pierre.thomas@company.com', department: 'Production', role: 'PO', status: 'active', lastLogin: '2024-11-30 16:45', projects: 2 },
  { id: 4, name: 'Sophie Laurent', email: 'sophie.laurent@company.com', department: 'DDIS', role: 'SolO', status: 'active', lastLogin: '2024-12-01 11:00', projects: 4 },
  { id: 5, name: 'Alain Bernard', email: 'alain.bernard@company.com', department: 'DDIS', role: 'SO', status: 'active', lastLogin: '2024-12-02 08:30', projects: 3 },
  { id: 6, name: 'Claire Moreau', email: 'claire.moreau@company.com', department: 'Laboratoire', role: 'QC', status: 'inactive', lastLogin: '2024-10-15 10:20', projects: 1 },
];

// Templates documents
const documentTemplates = [
  { id: 1, name: 'System Validation Plan', abbr: 'SVP', version: '3.2', updatedAt: '2024-10-15', sections: 12, status: 'published' },
  { id: 2, name: 'User Requirements Specification', abbr: 'URS', version: '2.1', updatedAt: '2024-09-20', sections: 8, status: 'published' },
  { id: 3, name: 'Functional Specifications', abbr: 'FS', version: '2.0', updatedAt: '2024-08-10', sections: 10, status: 'published' },
  { id: 4, name: 'Functional Risk Assessment', abbr: 'FRA', version: '1.5', updatedAt: '2024-11-01', sections: 6, status: 'published' },
  { id: 5, name: 'Test Protocol IQ', abbr: 'IQ', version: '2.0', updatedAt: '2024-07-25', sections: 15, status: 'draft' },
  { id: 6, name: 'Validation Summary Report', abbr: 'VSR', version: '1.8', updatedAt: '2024-06-30', sections: 9, status: 'published' },
];

// Logs d'audit
const auditLogs = [
  { id: 1, timestamp: '2024-12-02 10:45:23', user: 'Jean Dupont', action: 'Validation', target: 'URS-001', project: 'LIMS v3.2', details: 'Document validé avec succès' },
  { id: 2, timestamp: '2024-12-02 10:30:15', user: 'Marie Lambert', action: 'Modification', target: 'FS-003', project: 'LIMS v3.2', details: 'Description mise à jour' },
  { id: 3, timestamp: '2024-12-02 09:15:42', user: 'Sophie Laurent', action: 'Création', target: 'FS-006', project: 'LIMS v3.2', details: 'Nouvelle spécification créée' },
  { id: 4, timestamp: '2024-12-01 16:22:08', user: 'Pierre Thomas', action: 'Commentaire', target: 'FRA', project: 'LIMS v3.2', details: 'Ajout commentaire sur risque R-002' },
  { id: 5, timestamp: '2024-12-01 14:05:33', user: 'Alain Bernard', action: 'Export', target: 'SVP', project: 'ERP Mfg', details: 'Export PDF généré' },
  { id: 6, timestamp: '2024-12-01 11:30:00', user: 'Marie Lambert', action: 'Signature', target: 'URS', project: 'LIMS v3.2', details: 'Document signé via DocuSign' },
  { id: 7, timestamp: '2024-11-30 17:45:12', user: 'Jean Dupont', action: 'Attribution', target: 'Équipe', project: 'LIMS v3.2', details: 'Rôle QC assigné à Claire Moreau' },
  { id: 8, timestamp: '2024-11-30 15:20:55', user: 'Sophie Laurent', action: 'Suppression', target: 'FS-007', project: 'CRM v2.1', details: 'Spécification supprimée (doublon)' },
];

// =============================================================================
// BACKOFFICE - COMPOSANTS
// =============================================================================

// Header Backoffice
const BackofficeHeader = ({ onBackToHome }) => (
  <header style={{ height: '64px', backgroundColor: colors.primaryDark, display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 32px', position: 'sticky', top: 0, zIndex: 100 }}>
    <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
      <button onClick={onBackToHome} style={{ display: 'flex', alignItems: 'center', gap: '6px', padding: '8px 12px', borderRadius: '8px', border: 'none', backgroundColor: 'rgba(255,255,255,0.1)', cursor: 'pointer', fontSize: '13px', color: 'white', fontWeight: 500 }}>
        <Icons.ArrowLeft /> Retour
      </button>
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
        <div style={{ width: '36px', height: '36px', background: 'rgba(255,255,255,0.2)', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <Icons.Settings style={{ color: 'white' }} />
        </div>
        <div>
          <span style={{ fontWeight: 700, fontSize: '17px', color: 'white', display: 'block', lineHeight: 1.2 }}>Administration</span>
          <span style={{ fontSize: '11px', color: 'rgba(255,255,255,0.7)' }}>Configuration GxPDoc</span>
        </div>
      </div>
    </div>
    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
      <span style={{ fontSize: '13px', color: 'rgba(255,255,255,0.7)' }}>Administrateur</span>
      <div style={{ width: '36px', height: '36px', borderRadius: '50%', backgroundColor: colors.accent, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <span style={{ fontSize: '13px', fontWeight: 600, color: colors.primaryDark }}>JD</span>
      </div>
    </div>
  </header>
);

// Sidebar Backoffice
const BackofficeSidebar = ({ activeSection, onSectionChange }) => {
  const menuItems = [
    { id: 'raci', label: 'Rôles & RACI', icon: Icons.Users, badge: null },
    { id: 'users', label: 'Utilisateurs', icon: Icons.User, badge: systemUsers.length },
    { id: 'templates', label: 'Templates', icon: Icons.FileText, badge: documentTemplates.length },
    { id: 'audit', label: 'Logs d\'audit', icon: Icons.Shield, badge: null },
    { id: 'settings', label: 'Paramètres', icon: Icons.Settings, badge: null },
  ];

  return (
    <div style={{ width: '240px', minWidth: '240px', backgroundColor: 'white', borderRight: `1px solid ${colors.border}`, height: 'calc(100vh - 64px)', padding: '16px 12px' }}>
      <div style={{ fontSize: '11px', fontWeight: 600, color: colors.textSecondary, textTransform: 'uppercase', letterSpacing: '0.5px', padding: '8px 12px', marginBottom: '8px' }}>Configuration</div>
      {menuItems.map(item => {
        const Icon = item.icon;
        const isActive = activeSection === item.id;
        return (
          <button key={item.id} onClick={() => onSectionChange(item.id)} style={{ width: '100%', padding: '12px 14px', border: 'none', borderRadius: '8px', backgroundColor: isActive ? colors.primaryLight : 'transparent', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '12px', fontSize: '14px', fontWeight: isActive ? 600 : 400, color: isActive ? colors.primary : colors.textSecondary, textAlign: 'left', marginBottom: '4px' }}>
            <Icon />
            <span style={{ flex: 1 }}>{item.label}</span>
            {item.badge && <span style={{ padding: '2px 8px', borderRadius: '10px', fontSize: '11px', fontWeight: 600, backgroundColor: colors.background, color: colors.textSecondary }}>{item.badge}</span>}
          </button>
        );
      })}
    </div>
  );
};

// Badge RACI cliquable
const RaciBadge = ({ value, onChange, deliverableId, roleId }) => {
  const [isOpen, setIsOpen] = useState(false);
  const config = raciPermissions[value] || raciPermissions['-'];
  const options = ['-', 'R', 'A', 'C', 'I', 'R/A', 'A/R', 'C/I'];

  return (
    <div style={{ position: 'relative' }}>
      <button onClick={() => setIsOpen(!isOpen)} style={{ width: '48px', height: '36px', borderRadius: '6px', border: value === '-' ? `2px dashed ${colors.border}` : 'none', backgroundColor: config.bg, color: config.color, fontSize: '13px', fontWeight: 700, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        {value === '-' ? '—' : value}
      </button>
      {isOpen && (
        <>
          <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, zIndex: 99 }} onClick={() => setIsOpen(false)} />
          <div style={{ position: 'absolute', top: '100%', left: '50%', transform: 'translateX(-50%)', marginTop: '4px', backgroundColor: 'white', borderRadius: '8px', boxShadow: '0 4px 20px rgba(0,0,0,0.15)', padding: '6px', zIndex: 100, minWidth: '60px' }}>
            {options.map(opt => {
              const optConfig = raciPermissions[opt];
              return (
                <button key={opt} onClick={() => { onChange(deliverableId, roleId, opt); setIsOpen(false); }} style={{ width: '100%', padding: '6px 10px', border: 'none', borderRadius: '4px', backgroundColor: opt === value ? optConfig.bg : 'transparent', color: optConfig.color, fontSize: '13px', fontWeight: 600, cursor: 'pointer', marginBottom: '2px', textAlign: 'center' }}>
                  {opt === '-' ? '—' : opt}
                </button>
              );
            })}
          </div>
        </>
      )}
    </div>
  );
};

// Modal édition de rôle
const RoleEditorModal = ({ role, onSave, onClose, existingAbbrs }) => {
  const [formData, setFormData] = useState(role || {
    id: '',
    abbr: '',
    name: '',
    description: '',
    category: 'Métier',
    required: false
  });
  const [errors, setErrors] = useState({});

  const categories = ['Métier', 'IT', 'Qualité'];

  const validate = () => {
    const newErrors = {};
    if (!formData.abbr.trim()) newErrors.abbr = 'Abréviation requise';
    else if (formData.abbr.length > 5) newErrors.abbr = 'Max 5 caractères';
    else if (!role && existingAbbrs.includes(formData.abbr.toUpperCase())) newErrors.abbr = 'Cette abréviation existe déjà';
    if (!formData.name.trim()) newErrors.name = 'Nom requis';
    if (!formData.description.trim()) newErrors.description = 'Description requise';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (validate()) {
      const savedRole = {
        ...formData,
        id: formData.id || formData.abbr.toLowerCase().replace(/[^a-z0-9]/g, ''),
        abbr: formData.abbr.toUpperCase()
      };
      onSave(savedRole);
    }
  };

  return (
    <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000 }}>
      <div style={{ backgroundColor: 'white', borderRadius: '16px', width: '100%', maxWidth: '520px', maxHeight: '90vh', overflow: 'auto', boxShadow: '0 20px 60px rgba(0,0,0,0.3)' }}>
        {/* Header */}
        <div style={{ padding: '24px 24px 0', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <h2 style={{ margin: 0, fontSize: '20px', fontWeight: 700, color: colors.textPrimary }}>{role ? 'Modifier le rôle' : 'Nouveau rôle'}</h2>
          <button onClick={onClose} style={{ width: '36px', height: '36px', borderRadius: '8px', border: 'none', backgroundColor: colors.background, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', color: colors.textSecondary }}><Icons.X /></button>
        </div>

        {/* Form */}
        <div style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {/* Abréviation et Catégorie */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
            <div>
              <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: colors.textSecondary, marginBottom: '8px' }}>Abréviation *</label>
              <input type="text" value={formData.abbr} onChange={(e) => setFormData(prev => ({ ...prev, abbr: e.target.value.toUpperCase() }))} placeholder="Ex: QA" maxLength={5} style={{ width: '100%', padding: '12px 14px', borderRadius: '8px', border: `1px solid ${errors.abbr ? colors.error : colors.border}`, fontSize: '14px', outline: 'none', fontWeight: 600, textTransform: 'uppercase' }} />
              {errors.abbr && <span style={{ fontSize: '11px', color: colors.error, marginTop: '4px', display: 'block' }}>{errors.abbr}</span>}
            </div>
            <div>
              <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: colors.textSecondary, marginBottom: '8px' }}>Catégorie *</label>
              <select value={formData.category} onChange={(e) => setFormData(prev => ({ ...prev, category: e.target.value }))} style={{ width: '100%', padding: '12px 14px', borderRadius: '8px', border: `1px solid ${colors.border}`, fontSize: '14px', outline: 'none', cursor: 'pointer', backgroundColor: 'white' }}>
                {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
              </select>
            </div>
          </div>

          {/* Nom complet */}
          <div>
            <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: colors.textSecondary, marginBottom: '8px' }}>Nom complet *</label>
            <input type="text" value={formData.name} onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))} placeholder="Ex: Quality Assurance Expert" style={{ width: '100%', padding: '12px 14px', borderRadius: '8px', border: `1px solid ${errors.name ? colors.error : colors.border}`, fontSize: '14px', outline: 'none' }} />
            {errors.name && <span style={{ fontSize: '11px', color: colors.error, marginTop: '4px', display: 'block' }}>{errors.name}</span>}
          </div>

          {/* Description */}
          <div>
            <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: colors.textSecondary, marginBottom: '8px' }}>Description *</label>
            <textarea value={formData.description} onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))} placeholder="Décrivez les responsabilités de ce rôle..." rows={4} style={{ width: '100%', padding: '12px 14px', borderRadius: '8px', border: `1px solid ${errors.description ? colors.error : colors.border}`, fontSize: '14px', outline: 'none', resize: 'vertical', fontFamily: 'inherit' }} />
            {errors.description && <span style={{ fontSize: '11px', color: colors.error, marginTop: '4px', display: 'block' }}>{errors.description}</span>}
          </div>

          {/* Rôle requis */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '16px', backgroundColor: colors.background, borderRadius: '10px' }}>
            <button onClick={() => setFormData(prev => ({ ...prev, required: !prev.required }))} style={{ width: '44px', height: '24px', borderRadius: '12px', backgroundColor: formData.required ? colors.primary : colors.border, padding: '2px', border: 'none', cursor: 'pointer', transition: 'background-color 0.2s' }}>
              <div style={{ width: '20px', height: '20px', borderRadius: '50%', backgroundColor: 'white', marginLeft: formData.required ? 'auto' : '0', transition: 'margin-left 0.2s' }} />
            </button>
            <div>
              <div style={{ fontSize: '14px', fontWeight: 500, color: colors.textPrimary }}>Rôle requis</div>
              <div style={{ fontSize: '12px', color: colors.textSecondary }}>Ce rôle doit obligatoirement être assigné pour chaque projet</div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div style={{ padding: '16px 24px 24px', display: 'flex', justifyContent: 'flex-end', gap: '12px', borderTop: `1px solid ${colors.border}` }}>
          <button onClick={onClose} style={{ padding: '10px 20px', borderRadius: '8px', border: `1px solid ${colors.border}`, backgroundColor: 'white', cursor: 'pointer', fontSize: '14px', fontWeight: 500, color: colors.textSecondary }}>Annuler</button>
          <button onClick={handleSubmit} style={{ padding: '10px 24px', borderRadius: '8px', border: 'none', backgroundColor: colors.primary, color: 'white', cursor: 'pointer', fontSize: '14px', fontWeight: 600 }}>{role ? 'Enregistrer' : 'Créer le rôle'}</button>
        </div>
      </div>
    </div>
  );
};

// Modal de confirmation de suppression
const DeleteConfirmModal = ({ role, onConfirm, onCancel }) => (
  <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000 }}>
    <div style={{ backgroundColor: 'white', borderRadius: '16px', width: '100%', maxWidth: '420px', padding: '24px', boxShadow: '0 20px 60px rgba(0,0,0,0.3)' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '16px' }}>
        <div style={{ width: '48px', height: '48px', borderRadius: '12px', backgroundColor: colors.errorLight, display: 'flex', alignItems: 'center', justifyContent: 'center', color: colors.error }}><Icons.AlertTriangle /></div>
        <div>
          <h3 style={{ margin: 0, fontSize: '18px', fontWeight: 700, color: colors.textPrimary }}>Supprimer le rôle</h3>
          <p style={{ margin: '4px 0 0', fontSize: '13px', color: colors.textSecondary }}>Cette action est irréversible</p>
        </div>
      </div>
      <p style={{ margin: '0 0 24px', fontSize: '14px', color: colors.textSecondary, lineHeight: 1.6 }}>
        Êtes-vous sûr de vouloir supprimer le rôle <strong style={{ color: colors.textPrimary }}>{role.abbr} ({role.name})</strong> ? 
        Ce rôle sera retiré de la matrice RACI et des projets existants.
      </p>
      <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px' }}>
        <button onClick={onCancel} style={{ padding: '10px 20px', borderRadius: '8px', border: `1px solid ${colors.border}`, backgroundColor: 'white', cursor: 'pointer', fontSize: '14px', fontWeight: 500, color: colors.textSecondary }}>Annuler</button>
        <button onClick={() => onConfirm(role.id)} style={{ padding: '10px 20px', borderRadius: '8px', border: 'none', backgroundColor: colors.error, color: 'white', cursor: 'pointer', fontSize: '14px', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '8px' }}><Icons.Trash /> Supprimer</button>
      </div>
    </div>
  </div>
);

// Page Rôles & RACI
const BackofficeRaciContent = () => {
  const [roles, setRoles] = useState(backofficeRoles);
  const [raciMatrix, setRaciMatrix] = useState(defaultRaciMatrix);
  const [isEditingMatrix, setIsEditingMatrix] = useState(false);
  const [editingRole, setEditingRole] = useState(null); // null = fermé, {} = nouveau, {role} = édition
  const [deletingRole, setDeletingRole] = useState(null);

  const handleRaciChange = (deliverableId, roleId, value) => {
    setRaciMatrix(prev => ({
      ...prev,
      [deliverableId]: { ...prev[deliverableId], [roleId]: value }
    }));
  };

  const handleSaveRole = (savedRole) => {
    const isNew = !roles.find(r => r.id === savedRole.id);
    if (isNew) {
      // Ajouter le nouveau rôle
      setRoles(prev => [...prev, savedRole]);
      // Ajouter une colonne à la matrice RACI
      setRaciMatrix(prev => {
        const updated = { ...prev };
        Object.keys(updated).forEach(deliverableId => {
          updated[deliverableId] = { ...updated[deliverableId], [savedRole.id]: '-' };
        });
        return updated;
      });
    } else {
      // Mettre à jour le rôle existant
      setRoles(prev => prev.map(r => r.id === savedRole.id ? savedRole : r));
    }
    setEditingRole(null);
  };

  const handleDeleteRole = (roleId) => {
    // Supprimer le rôle
    setRoles(prev => prev.filter(r => r.id !== roleId));
    // Supprimer de la matrice RACI
    setRaciMatrix(prev => {
      const updated = { ...prev };
      Object.keys(updated).forEach(deliverableId => {
        const { [roleId]: removed, ...rest } = updated[deliverableId];
        updated[deliverableId] = rest;
      });
      return updated;
    });
    setDeletingRole(null);
  };

  const existingAbbrs = roles.map(r => r.abbr.toUpperCase());

  return (
    <div style={{ flex: 1, padding: '32px', overflow: 'auto', backgroundColor: colors.background, height: 'calc(100vh - 64px)' }}>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '32px' }}>
        <div>
          <h1 style={{ margin: '0 0 8px 0', fontSize: '24px', fontWeight: 700, color: colors.textPrimary }}>Matrice RACI</h1>
          <p style={{ margin: 0, fontSize: '14px', color: colors.textSecondary }}>Définition des responsabilités pour chaque livrable du projet de validation</p>
        </div>
        <div style={{ display: 'flex', gap: '12px' }}>
          <button onClick={() => setIsEditingMatrix(!isEditingMatrix)} style={{ padding: '10px 20px', borderRadius: '8px', border: 'none', backgroundColor: isEditingMatrix ? colors.success : colors.primary, color: 'white', cursor: 'pointer', fontSize: '14px', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '8px' }}>
            {isEditingMatrix ? <><Icons.Check /> Terminer</> : <><Icons.Edit /> Modifier</>}
          </button>
          <button style={{ padding: '10px 20px', borderRadius: '8px', border: `1px solid ${colors.border}`, backgroundColor: 'white', cursor: 'pointer', fontSize: '14px', fontWeight: 500, color: colors.textPrimary, display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Icons.Download /> Exporter
          </button>
        </div>
      </div>

      {/* Légende */}
      <div style={{ padding: '20px 24px', backgroundColor: 'white', borderRadius: '12px', border: `1px solid ${colors.border}`, marginBottom: '24px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
          <span style={{ fontSize: '13px', fontWeight: 600, color: colors.textSecondary }}>Légende :</span>
        </div>
        <div style={{ display: 'flex', gap: '32px', flexWrap: 'wrap' }}>
          {['R', 'A', 'C', 'I'].map(key => {
            const p = raciPermissions[key];
            return (
              <div key={key} style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
                <span style={{ width: '32px', height: '28px', borderRadius: '6px', backgroundColor: p.bg, color: p.color, fontSize: '13px', fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{key}</span>
                <div>
                  <div style={{ fontSize: '13px', fontWeight: 600, color: colors.textPrimary }}>{p.label}</div>
                  <div style={{ fontSize: '11px', color: colors.textSecondary }}>{p.permissions.join(', ')}</div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Matrice */}
      <div style={{ backgroundColor: 'white', borderRadius: '12px', border: `1px solid ${colors.border}`, overflow: 'hidden' }}>
        {/* Header tableau */}
        <div style={{ display: 'grid', gridTemplateColumns: `280px repeat(${roles.length}, 1fr)`, backgroundColor: colors.background, borderBottom: `1px solid ${colors.border}` }}>
          <div style={{ padding: '16px 20px', fontWeight: 600, fontSize: '13px', color: colors.textSecondary }}>LIVRABLE</div>
          {roles.map(role => (
            <div key={role.id} style={{ padding: '16px 12px', textAlign: 'center', cursor: 'pointer' }} onClick={() => setEditingRole(role)}>
              <div style={{ fontSize: '14px', fontWeight: 700, color: colors.primary }}>{role.abbr}</div>
              <div style={{ fontSize: '10px', color: colors.textSecondary, marginTop: '2px' }}>{role.name.split(' ').slice(-2).join(' ')}</div>
            </div>
          ))}
        </div>

        {/* Lignes */}
        {raciDeliverables.map((deliverable, idx) => (
          <div key={deliverable.id} style={{ display: 'grid', gridTemplateColumns: `280px repeat(${roles.length}, 1fr)`, borderBottom: idx < raciDeliverables.length - 1 ? `1px solid ${colors.border}` : 'none', backgroundColor: idx % 2 === 0 ? 'white' : colors.background }}>
            <div style={{ padding: '16px 20px' }}>
              <div style={{ fontSize: '14px', fontWeight: 600, color: colors.textPrimary }}>{deliverable.name}</div>
              <div style={{ fontSize: '12px', color: colors.textSecondary, marginTop: '2px' }}>{deliverable.description}</div>
            </div>
            {roles.map(role => (
              <div key={role.id} style={{ padding: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                {isEditingMatrix ? (
                  <RaciBadge value={raciMatrix[deliverable.id]?.[role.id] || '-'} onChange={handleRaciChange} deliverableId={deliverable.id} roleId={role.id} />
                ) : (
                  <span style={{ width: '48px', height: '36px', borderRadius: '6px', border: (raciMatrix[deliverable.id]?.[role.id] || '-') === '-' ? `2px dashed ${colors.border}` : 'none', backgroundColor: raciPermissions[raciMatrix[deliverable.id]?.[role.id]]?.bg || 'transparent', color: raciPermissions[raciMatrix[deliverable.id]?.[role.id]]?.color || colors.border, fontSize: '13px', fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    {(raciMatrix[deliverable.id]?.[role.id] || '-') === '-' ? '—' : raciMatrix[deliverable.id]?.[role.id]}
                  </span>
                )}
              </div>
            ))}
          </div>
        ))}
      </div>

      {/* Section Rôles */}
      <div style={{ marginTop: '32px' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
          <h2 style={{ margin: 0, fontSize: '18px', fontWeight: 600, color: colors.textPrimary }}>Définition des rôles ({roles.length})</h2>
          <button onClick={() => setEditingRole({})} style={{ padding: '10px 20px', borderRadius: '8px', border: 'none', backgroundColor: colors.primary, color: 'white', cursor: 'pointer', fontSize: '14px', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Icons.Plus /> Nouveau rôle
          </button>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '16px' }}>
          {roles.map(role => (
            <div key={role.id} style={{ padding: '20px', backgroundColor: 'white', borderRadius: '12px', border: `1px solid ${colors.border}`, position: 'relative' }}>
              {/* Actions */}
              <div style={{ position: 'absolute', top: '12px', right: '12px', display: 'flex', gap: '4px' }}>
                <button onClick={() => setEditingRole(role)} style={{ width: '32px', height: '32px', borderRadius: '6px', border: 'none', backgroundColor: colors.background, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', color: colors.textSecondary }} title="Modifier">
                  <Icons.Edit />
                </button>
                <button onClick={() => setDeletingRole(role)} style={{ width: '32px', height: '32px', borderRadius: '6px', border: 'none', backgroundColor: colors.errorLight, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', color: colors.error }} title="Supprimer">
                  <Icons.Trash />
                </button>
              </div>
              
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px', paddingRight: '80px' }}>
                <div style={{ width: '44px', height: '44px', borderRadius: '10px', backgroundColor: colors.primaryLight, display: 'flex', alignItems: 'center', justifyContent: 'center', color: colors.primary, fontSize: '15px', fontWeight: 700 }}>{role.abbr}</div>
                <div>
                  <div style={{ fontSize: '15px', fontWeight: 600, color: colors.textPrimary }}>{role.name}</div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: '2px' }}>
                    <span style={{ fontSize: '11px', color: colors.textSecondary }}>{role.category}</span>
                    {role.required && <span style={{ padding: '2px 6px', borderRadius: '4px', backgroundColor: colors.errorLight, fontSize: '10px', fontWeight: 600, color: colors.error }}>Requis</span>}
                  </div>
                </div>
              </div>
              <p style={{ margin: 0, fontSize: '13px', color: colors.textSecondary, lineHeight: 1.5 }}>{role.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Modals */}
      {editingRole !== null && (
        <RoleEditorModal 
          role={editingRole.id ? editingRole : null} 
          onSave={handleSaveRole} 
          onClose={() => setEditingRole(null)}
          existingAbbrs={editingRole.id ? existingAbbrs.filter(a => a !== editingRole.abbr) : existingAbbrs}
        />
      )}
      {deletingRole && (
        <DeleteConfirmModal 
          role={deletingRole} 
          onConfirm={handleDeleteRole} 
          onCancel={() => setDeletingRole(null)} 
        />
      )}
    </div>
  );
};

// Page Utilisateurs
const UsersContent = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const filteredUsers = systemUsers.filter(u => u.name.toLowerCase().includes(searchQuery.toLowerCase()) || u.email.toLowerCase().includes(searchQuery.toLowerCase()));

  return (
    <div style={{ flex: 1, padding: '32px', overflow: 'auto', backgroundColor: colors.background, height: 'calc(100vh - 64px)' }}>
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '24px' }}>
        <div>
          <h1 style={{ margin: '0 0 8px 0', fontSize: '24px', fontWeight: 700, color: colors.textPrimary }}>Utilisateurs</h1>
          <p style={{ margin: 0, fontSize: '14px', color: colors.textSecondary }}>{systemUsers.length} utilisateurs • {systemUsers.filter(u => u.status === 'active').length} actifs</p>
        </div>
        <button style={{ padding: '10px 20px', borderRadius: '8px', border: 'none', backgroundColor: colors.primary, color: 'white', cursor: 'pointer', fontSize: '14px', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '8px' }}><Icons.Plus /> Nouvel utilisateur</button>
      </div>

      {/* Recherche */}
      <div style={{ marginBottom: '20px', position: 'relative', maxWidth: '400px' }}>
        <span style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', color: colors.textSecondary, display: 'flex', alignItems: 'center' }}><Icons.Search /></span>
        <input type="text" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} placeholder="Rechercher un utilisateur..." style={{ width: '100%', padding: '12px 12px 12px 44px', borderRadius: '10px', border: `1px solid ${colors.border}`, fontSize: '14px', outline: 'none', backgroundColor: 'white' }} />
      </div>

      {/* Tableau */}
      <div style={{ backgroundColor: 'white', borderRadius: '12px', border: `1px solid ${colors.border}`, overflow: 'hidden' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '2fr 2fr 1fr 1fr 140px 100px', padding: '14px 20px', backgroundColor: colors.background, borderBottom: `1px solid ${colors.border}`, fontSize: '11px', fontWeight: 600, color: colors.textSecondary, textTransform: 'uppercase' }}>
          <div>Utilisateur</div>
          <div>Email</div>
          <div>Département</div>
          <div>Rôle par défaut</div>
          <div>Dernière connexion</div>
          <div>Statut</div>
        </div>
        {filteredUsers.map((user, idx) => (
          <div key={user.id} style={{ display: 'grid', gridTemplateColumns: '2fr 2fr 1fr 1fr 140px 100px', padding: '16px 20px', borderBottom: idx < filteredUsers.length - 1 ? `1px solid ${colors.border}` : 'none', alignItems: 'center' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div style={{ width: '36px', height: '36px', borderRadius: '50%', backgroundColor: colors.primaryLight, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '13px', fontWeight: 600, color: colors.primary }}>{user.name.split(' ').map(n => n[0]).join('')}</div>
              <span style={{ fontSize: '14px', fontWeight: 500, color: colors.textPrimary }}>{user.name}</span>
            </div>
            <div style={{ fontSize: '13px', color: colors.textSecondary }}>{user.email}</div>
            <div style={{ fontSize: '13px', color: colors.textSecondary }}>{user.department}</div>
            <div><span style={{ padding: '4px 10px', borderRadius: '6px', fontSize: '12px', fontWeight: 600, backgroundColor: colors.primaryLight, color: colors.primary }}>{user.role}</span></div>
            <div style={{ fontSize: '12px', color: colors.textSecondary }}>{user.lastLogin.split(' ')[0]}</div>
            <div><span style={{ padding: '4px 10px', borderRadius: '6px', fontSize: '11px', fontWeight: 600, backgroundColor: user.status === 'active' ? colors.successLight : colors.background, color: user.status === 'active' ? colors.success : colors.textSecondary }}>{user.status === 'active' ? 'Actif' : 'Inactif'}</span></div>
          </div>
        ))}
      </div>
    </div>
  );
};

// Page Templates
const TemplatesContent = () => (
  <div style={{ flex: 1, padding: '32px', overflow: 'auto', backgroundColor: colors.background, height: 'calc(100vh - 64px)' }}>
    <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '24px' }}>
      <div>
        <h1 style={{ margin: '0 0 8px 0', fontSize: '24px', fontWeight: 700, color: colors.textPrimary }}>Templates de documents</h1>
        <p style={{ margin: 0, fontSize: '14px', color: colors.textSecondary }}>Modèles de documents utilisés pour les projets de validation</p>
      </div>
      <button style={{ padding: '10px 20px', borderRadius: '8px', border: 'none', backgroundColor: colors.primary, color: 'white', cursor: 'pointer', fontSize: '14px', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '8px' }}><Icons.Plus /> Nouveau template</button>
    </div>

    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '16px' }}>
      {documentTemplates.map(template => (
        <div key={template.id} style={{ padding: '20px', backgroundColor: 'white', borderRadius: '12px', border: `1px solid ${colors.border}` }}>
          <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '12px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div style={{ width: '44px', height: '44px', borderRadius: '10px', backgroundColor: colors.accentLight, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '13px', fontWeight: 700, color: colors.primaryDark }}>{template.abbr}</div>
              <div>
                <div style={{ fontSize: '14px', fontWeight: 600, color: colors.textPrimary }}>{template.name}</div>
                <div style={{ fontSize: '12px', color: colors.textSecondary }}>v{template.version} • {template.sections} sections</div>
              </div>
            </div>
            <span style={{ padding: '4px 8px', borderRadius: '4px', fontSize: '10px', fontWeight: 600, backgroundColor: template.status === 'published' ? colors.successLight : colors.warningLight, color: template.status === 'published' ? colors.success : colors.warning }}>{template.status === 'published' ? 'Publié' : 'Brouillon'}</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingTop: '12px', borderTop: `1px solid ${colors.border}` }}>
            <span style={{ fontSize: '12px', color: colors.textSecondary }}>Mis à jour le {template.updatedAt}</span>
            <div style={{ display: 'flex', gap: '8px' }}>
              <button style={{ padding: '6px 12px', borderRadius: '6px', border: `1px solid ${colors.border}`, backgroundColor: 'white', cursor: 'pointer', fontSize: '12px', color: colors.textSecondary }}>Voir</button>
              <button style={{ padding: '6px 12px', borderRadius: '6px', border: 'none', backgroundColor: colors.primaryLight, cursor: 'pointer', fontSize: '12px', fontWeight: 500, color: colors.primary }}>Modifier</button>
            </div>
          </div>
        </div>
      ))}
    </div>
  </div>
);

// Page Audit Logs
const AuditLogsContent = () => {
  const [filterAction, setFilterAction] = useState('all');
  const actions = ['all', 'Validation', 'Modification', 'Création', 'Commentaire', 'Export', 'Signature', 'Attribution', 'Suppression'];
  const filteredLogs = filterAction === 'all' ? auditLogs : auditLogs.filter(l => l.action === filterAction);

  const actionColors = {
    Validation: { bg: colors.successLight, color: colors.success },
    Modification: { bg: colors.primaryLight, color: colors.primary },
    Création: { bg: colors.accentLight, color: colors.primaryDark },
    Commentaire: { bg: '#EDE9FE', color: '#8B5CF6' },
    Export: { bg: colors.background, color: colors.textSecondary },
    Signature: { bg: '#FEF3C7', color: '#F59E0B' },
    Attribution: { bg: colors.primaryLight, color: colors.primary },
    Suppression: { bg: colors.errorLight, color: colors.error },
  };

  return (
    <div style={{ flex: 1, padding: '32px', overflow: 'auto', backgroundColor: colors.background, height: 'calc(100vh - 64px)' }}>
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '24px' }}>
        <div>
          <h1 style={{ margin: '0 0 8px 0', fontSize: '24px', fontWeight: 700, color: colors.textPrimary }}>Logs d'audit</h1>
          <p style={{ margin: 0, fontSize: '14px', color: colors.textSecondary }}>Historique des actions utilisateurs</p>
        </div>
        <button style={{ padding: '10px 20px', borderRadius: '8px', border: `1px solid ${colors.border}`, backgroundColor: 'white', cursor: 'pointer', fontSize: '14px', fontWeight: 500, color: colors.textPrimary, display: 'flex', alignItems: 'center', gap: '8px' }}><Icons.Download /> Exporter</button>
      </div>

      {/* Filtres */}
      <div style={{ display: 'flex', gap: '8px', marginBottom: '20px', flexWrap: 'wrap' }}>
        {actions.map(action => (
          <button key={action} onClick={() => setFilterAction(action)} style={{ padding: '8px 16px', borderRadius: '20px', border: filterAction === action ? 'none' : `1px solid ${colors.border}`, backgroundColor: filterAction === action ? colors.primary : 'white', color: filterAction === action ? 'white' : colors.textSecondary, cursor: 'pointer', fontSize: '13px', fontWeight: filterAction === action ? 600 : 400 }}>
            {action === 'all' ? 'Tous' : action}
          </button>
        ))}
      </div>

      {/* Tableau */}
      <div style={{ backgroundColor: 'white', borderRadius: '12px', border: `1px solid ${colors.border}`, overflow: 'hidden' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '180px 150px 120px 150px 150px 1fr', padding: '14px 20px', backgroundColor: colors.background, borderBottom: `1px solid ${colors.border}`, fontSize: '11px', fontWeight: 600, color: colors.textSecondary, textTransform: 'uppercase' }}>
          <div>Date/Heure</div>
          <div>Utilisateur</div>
          <div>Action</div>
          <div>Cible</div>
          <div>Projet</div>
          <div>Détails</div>
        </div>
        {filteredLogs.map((log, idx) => {
          const ac = actionColors[log.action] || actionColors.Modification;
          return (
            <div key={log.id} style={{ display: 'grid', gridTemplateColumns: '180px 150px 120px 150px 150px 1fr', padding: '14px 20px', borderBottom: idx < filteredLogs.length - 1 ? `1px solid ${colors.border}` : 'none', alignItems: 'center' }}>
              <div style={{ fontSize: '13px', color: colors.textSecondary, fontFamily: 'monospace' }}>{log.timestamp}</div>
              <div style={{ fontSize: '13px', fontWeight: 500, color: colors.textPrimary }}>{log.user}</div>
              <div><span style={{ padding: '4px 10px', borderRadius: '6px', fontSize: '11px', fontWeight: 600, backgroundColor: ac.bg, color: ac.color }}>{log.action}</span></div>
              <div style={{ fontSize: '13px', color: colors.textPrimary }}>{log.target}</div>
              <div style={{ fontSize: '13px', color: colors.textSecondary }}>{log.project}</div>
              <div style={{ fontSize: '12px', color: colors.textSecondary }}>{log.details}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

// Page Paramètres
const SettingsContent = () => (
  <div style={{ flex: 1, padding: '32px', overflow: 'auto', backgroundColor: colors.background, height: 'calc(100vh - 64px)' }}>
    <div style={{ marginBottom: '24px' }}>
      <h1 style={{ margin: '0 0 8px 0', fontSize: '24px', fontWeight: 700, color: colors.textPrimary }}>Paramètres</h1>
      <p style={{ margin: 0, fontSize: '14px', color: colors.textSecondary }}>Configuration générale de la plateforme</p>
    </div>

    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', maxWidth: '800px' }}>
      {/* Workflow */}
      <div style={{ padding: '24px', backgroundColor: 'white', borderRadius: '12px', border: `1px solid ${colors.border}` }}>
        <h3 style={{ margin: '0 0 16px 0', fontSize: '16px', fontWeight: 600, color: colors.textPrimary }}>Workflow de validation</h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px 16px', backgroundColor: colors.background, borderRadius: '8px' }}>
            <div>
              <div style={{ fontSize: '14px', fontWeight: 500, color: colors.textPrimary }}>Revue QA obligatoire</div>
              <div style={{ fontSize: '12px', color: colors.textSecondary }}>Exiger une revue QA pour URS et FS</div>
            </div>
            <div style={{ width: '44px', height: '24px', borderRadius: '12px', backgroundColor: colors.success, padding: '2px', cursor: 'pointer' }}><div style={{ width: '20px', height: '20px', borderRadius: '50%', backgroundColor: 'white', marginLeft: 'auto' }} /></div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px 16px', backgroundColor: colors.background, borderRadius: '8px' }}>
            <div>
              <div style={{ fontSize: '14px', fontWeight: 500, color: colors.textPrimary }}>Signatures multiples</div>
              <div style={{ fontSize: '12px', color: colors.textSecondary }}>Exiger plusieurs signatures pour validation</div>
            </div>
            <div style={{ width: '44px', height: '24px', borderRadius: '12px', backgroundColor: colors.success, padding: '2px', cursor: 'pointer' }}><div style={{ width: '20px', height: '20px', borderRadius: '50%', backgroundColor: 'white', marginLeft: 'auto' }} /></div>
          </div>
        </div>
      </div>

      {/* DocuSign */}
      <div style={{ padding: '24px', backgroundColor: 'white', borderRadius: '12px', border: `1px solid ${colors.border}` }}>
        <h3 style={{ margin: '0 0 16px 0', fontSize: '16px', fontWeight: 600, color: colors.textPrimary }}>Intégration DocuSign</h3>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '16px', backgroundColor: colors.successLight, borderRadius: '8px', marginBottom: '16px' }}>
          <Icons.Check style={{ color: colors.success }} />
          <span style={{ fontSize: '14px', color: colors.success, fontWeight: 500 }}>Connecté</span>
        </div>
        <div style={{ display: 'flex', gap: '12px' }}>
          <button style={{ padding: '10px 20px', borderRadius: '8px', border: `1px solid ${colors.border}`, backgroundColor: 'white', cursor: 'pointer', fontSize: '13px', fontWeight: 500, color: colors.textPrimary }}>Tester la connexion</button>
          <button style={{ padding: '10px 20px', borderRadius: '8px', border: `1px solid ${colors.error}`, backgroundColor: colors.errorLight, cursor: 'pointer', fontSize: '13px', fontWeight: 500, color: colors.error }}>Déconnecter</button>
        </div>
      </div>

      {/* Notifications */}
      <div style={{ padding: '24px', backgroundColor: 'white', borderRadius: '12px', border: `1px solid ${colors.border}` }}>
        <h3 style={{ margin: '0 0 16px 0', fontSize: '16px', fontWeight: 600, color: colors.textPrimary }}>Notifications</h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px 16px', backgroundColor: colors.background, borderRadius: '8px' }}>
            <span style={{ fontSize: '14px', color: colors.textPrimary }}>Email lors de validation</span>
            <div style={{ width: '44px', height: '24px', borderRadius: '12px', backgroundColor: colors.success, padding: '2px', cursor: 'pointer' }}><div style={{ width: '20px', height: '20px', borderRadius: '50%', backgroundColor: 'white', marginLeft: 'auto' }} /></div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px 16px', backgroundColor: colors.background, borderRadius: '8px' }}>
            <span style={{ fontSize: '14px', color: colors.textPrimary }}>Email lors de commentaire</span>
            <div style={{ width: '44px', height: '24px', borderRadius: '12px', backgroundColor: colors.border, padding: '2px', cursor: 'pointer' }}><div style={{ width: '20px', height: '20px', borderRadius: '50%', backgroundColor: 'white' }} /></div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px 16px', backgroundColor: colors.background, borderRadius: '8px' }}>
            <span style={{ fontSize: '14px', color: colors.textPrimary }}>Rappel signature en attente</span>
            <div style={{ width: '44px', height: '24px', borderRadius: '12px', backgroundColor: colors.success, padding: '2px', cursor: 'pointer' }}><div style={{ width: '20px', height: '20px', borderRadius: '50%', backgroundColor: 'white', marginLeft: 'auto' }} /></div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

// Page Backoffice principale
const BackofficePage = ({ onBackToHome }) => {
  const [activeSection, setActiveSection] = useState('raci');

  const renderContent = () => {
    switch (activeSection) {
      case 'raci': return <BackofficeRaciContent />;
      case 'users': return <UsersContent />;
      case 'templates': return <TemplatesContent />;
      case 'audit': return <AuditLogsContent />;
      case 'settings': return <SettingsContent />;
      default: return <BackofficeRaciContent />;
    }
  };

  return (
    <div style={{ fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif", backgroundColor: colors.background, minHeight: '100vh' }}>
      <BackofficeHeader onBackToHome={onBackToHome} />
      <div style={{ display: 'flex' }}>
        <BackofficeSidebar activeSection={activeSection} onSectionChange={setActiveSection} />
        {renderContent()}
      </div>
    </div>
  );
};

// =============================================================================
// PAGE D'ACCUEIL - COMPOSANTS
// =============================================================================

// Header page d'accueil
const HomeHeader = ({ userRole, onRoleChange, onOpenBackoffice, onOpenHelp, wireframe, onToggleWireframe }) => (
  <header style={{ height: '64px', backgroundColor: 'white', borderBottom: `1px solid ${colors.border}`, display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 32px', position: 'sticky', top: 0, zIndex: 100 }}>
    <AppLogo />
    
    {/* Recherche globale */}
    <div style={{ flex: 1, maxWidth: '480px', margin: '0 40px' }}>
      <div style={{ position: 'relative' }}>
        <span style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', color: colors.textSecondary, display: 'flex', alignItems: 'center' }}><Icons.Search /></span>
        <input type="text" placeholder="Rechercher un projet, une tâche, un document..." style={{ width: '100%', padding: '10px 14px 10px 44px', borderRadius: '10px', border: `1px solid ${colors.border}`, fontSize: '14px', outline: 'none', backgroundColor: colors.background }} />
      </div>
    </div>
    
    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
      {/* Bouton Aide et Ressources (visible pour tous) */}
      <button onClick={onOpenHelp} style={{ padding: '8px 16px', borderRadius: '8px', border: `1px solid ${colors.border}`, backgroundColor: 'white', color: colors.textPrimary, cursor: 'pointer', fontSize: '13px', fontWeight: 500, display: 'flex', alignItems: 'center', gap: '8px' }}>
        <Icons.HelpCircle /> Aide et Ressources
      </button>
      
      {/* Bouton Administration (visible pour admin) */}
      {userRole === 'admin' && (
        <button onClick={onOpenBackoffice} style={{ padding: '8px 16px', borderRadius: '8px', border: 'none', backgroundColor: colors.primaryDark, color: 'white', cursor: 'pointer', fontSize: '13px', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Icons.Settings /> Administration
        </button>
      )}
      
      {/* Sélecteur de rôle */}
      <select value={userRole} onChange={(e) => onRoleChange(e.target.value)} style={{ padding: '8px 12px', borderRadius: '8px', border: `1px solid ${colors.border}`, fontSize: '13px', backgroundColor: userRole === 'admin' ? colors.primaryLight : userRole === 'qualite' ? '#F0ABFC20' : colors.accentLight, color: colors.textPrimary, fontWeight: 500, cursor: 'pointer' }}>
        <option value="metier">👤 Métier (UPM)</option>
        <option value="qualite">🔬 Qualité (QA)</option>
        <option value="admin">⚙️ Admin / Gestion</option>
      </select>
      
      <button style={{ width: '40px', height: '40px', borderRadius: '8px', border: 'none', backgroundColor: 'transparent', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', color: colors.textSecondary, position: 'relative' }}>
        <Icons.Bell />
        <span style={{ position: 'absolute', top: '8px', right: '8px', width: '8px', height: '8px', backgroundColor: colors.error, borderRadius: '50%', border: '2px solid white' }} />
      </button>
      {/* Toggle wireframe */}
      <button onClick={onToggleWireframe} title={wireframe ? 'Mode couleur' : 'Mode wireframe'} style={{ display: 'flex', alignItems: 'center', gap: '6px', padding: '6px 10px', borderRadius: '6px', cursor: 'pointer', border: `1px solid ${wireframe ? colors.textPrimary : colors.border}`, backgroundColor: wireframe ? colors.textPrimary : 'transparent', color: wireframe ? 'white' : colors.textSecondary, fontSize: '11px', fontWeight: 500 }}>
        <Icons.Eye /> WF
      </button>
      <div style={{ width: '40px', height: '40px', borderRadius: '50%', backgroundColor: colors.primary, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
        <span style={{ fontSize: '14px', fontWeight: 600, color: 'white' }}>JD</span>
      </div>
    </div>
  </header>
);

// Card projet
const ProjectCard = ({ project, onClick }) => {
  const statusConfig = {
    in_progress: { bg: colors.primaryLight, color: colors.primary, label: 'En cours' },
    review: { bg: '#F0ABFC20', color: '#A855F7', label: 'Revue QA' },
    completed: { bg: colors.successLight, color: colors.success, label: 'Terminé' },
    starting: { bg: colors.warningLight, color: colors.warning, label: 'Démarrage' },
  };
  const status = statusConfig[project.status] || statusConfig.in_progress;
  
  return (
    <div onClick={onClick} style={{ padding: '20px', backgroundColor: 'white', borderRadius: '12px', border: `1px solid ${colors.border}`, cursor: 'pointer', transition: 'all 0.2s', position: 'relative' }}>
      {project.urgentTasks > 0 && (
        <span style={{ position: 'absolute', top: '-8px', right: '-8px', width: '22px', height: '22px', borderRadius: '50%', backgroundColor: colors.error, color: 'white', fontSize: '11px', fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center', border: '2px solid white' }}>{project.urgentTasks}</span>
      )}
      
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '12px' }}>
        <div>
          <h3 style={{ margin: '0 0 4px 0', fontSize: '16px', fontWeight: 600, color: colors.textPrimary }}>{project.name}</h3>
          <p style={{ margin: 0, fontSize: '12px', color: colors.textSecondary }}>{project.client}</p>
        </div>
        <span style={{ padding: '4px 10px', borderRadius: '6px', fontSize: '11px', fontWeight: 600, backgroundColor: status.bg, color: status.color }}>{status.label}</span>
      </div>
      
      {/* Barre de progression */}
      <div style={{ marginBottom: '12px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
          <span style={{ fontSize: '12px', color: colors.textSecondary }}>{project.phase}</span>
          <span style={{ fontSize: '12px', fontWeight: 600, color: colors.textPrimary }}>{project.progress}%</span>
        </div>
        <div style={{ height: '6px', backgroundColor: colors.background, borderRadius: '3px', overflow: 'hidden' }}>
          <div style={{ width: `${project.progress}%`, height: '100%', backgroundColor: project.progress === 100 ? colors.success : colors.primary, borderRadius: '3px' }} />
        </div>
      </div>
      
      {/* Prochaine action */}
      {project.nextAction && (
        <div style={{ padding: '10px 12px', backgroundColor: colors.background, borderRadius: '8px', marginBottom: '12px' }}>
          <div style={{ fontSize: '11px', color: colors.textSecondary, marginBottom: '4px' }}>Prochaine action</div>
          <div style={{ fontSize: '13px', color: colors.textPrimary }}>{project.nextAction}</div>
        </div>
      )}
      
      {/* Footer */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex' }}>
          {project.team.slice(0, 3).map((initials, i) => (
            <div key={i} style={{ width: '28px', height: '28px', borderRadius: '50%', backgroundColor: colors.primaryLight, border: '2px solid white', display: 'flex', alignItems: 'center', justifyContent: 'center', marginLeft: i > 0 ? '-8px' : 0, fontSize: '10px', fontWeight: 600, color: colors.primary }}>{initials}</div>
          ))}
          {project.team.length > 3 && (
            <div style={{ width: '28px', height: '28px', borderRadius: '50%', backgroundColor: colors.background, border: '2px solid white', display: 'flex', alignItems: 'center', justifyContent: 'center', marginLeft: '-8px', fontSize: '10px', color: colors.textSecondary }}>+{project.team.length - 3}</div>
          )}
        </div>
        <span style={{ fontSize: '11px', color: colors.textSecondary, display: 'flex', alignItems: 'center', gap: '4px' }}><Icons.Calendar /> {project.dueDate}</span>
      </div>
    </div>
  );
};

// Item tâche
const TaskItem = ({ task, onToggle }) => {
  const priorityConfig = {
    urgent: { bg: colors.errorLight, color: colors.error, label: 'Urgent' },
    high: { bg: colors.warningLight, color: colors.warning, label: 'Important' },
    normal: { bg: colors.background, color: colors.textSecondary, label: '' },
    low: { bg: colors.background, color: colors.textSecondary, label: '' },
  };
  const priority = priorityConfig[task.priority] || priorityConfig.normal;
  
  return (
    <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px', padding: '12px 16px', backgroundColor: task.completed ? colors.background : 'white', borderRadius: '8px', marginBottom: '8px', border: `1px solid ${task.priority === 'urgent' ? colors.error + '30' : colors.border}`, opacity: task.completed ? 0.6 : 1 }}>
      <button onClick={() => onToggle(task.id)} style={{ width: '20px', height: '20px', borderRadius: '6px', border: `2px solid ${task.completed ? colors.success : colors.border}`, backgroundColor: task.completed ? colors.success : 'white', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', flexShrink: 0, marginTop: '2px' }}>
        {task.completed && <Icons.Check />}
      </button>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ fontSize: '14px', color: colors.textPrimary, marginBottom: '4px', textDecoration: task.completed ? 'line-through' : 'none' }}>{task.title}</div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
          <span style={{ fontSize: '12px', color: colors.primary, fontWeight: 500 }}>{task.project}</span>
          {priority.label && <span style={{ fontSize: '10px', padding: '2px 6px', borderRadius: '4px', backgroundColor: priority.bg, color: priority.color, fontWeight: 600 }}>{priority.label}</span>}
          <span style={{ fontSize: '11px', color: colors.textSecondary }}>{task.dueDate}</span>
        </div>
      </div>
    </div>
  );
};

// =============================================================================
// CARDS PROJET POUR PAGE D'ACCUEIL (Métier et QA)
// =============================================================================

// Card projet LARGE pour Métier (1 projet, vue détaillée, aérée)
const MetierProjectCard = ({ project, onClick }) => {
  const statusConfig = {
    in_progress: { bg: colors.primaryLight, color: colors.primary, label: 'En cours' },
    review: { bg: '#F0ABFC20', color: '#A855F7', label: 'Revue QA' },
    starting: { bg: colors.warningLight, color: colors.warning, label: 'Démarrage' },
  };
  const status = statusConfig[project.status] || statusConfig.in_progress;
  
  const totalNew = project.newURS + project.newFS + project.modifications;
  const totalPending = (project.pendingValidations?.urs || 0) + (project.pendingValidations?.fs || 0);
  const hasNotifications = totalNew > 0 || project.newComments > 0 || totalPending > 0;
  
  return (
    <div 
      onClick={onClick} 
      style={{ 
        padding: '28px 32px', 
        backgroundColor: 'white', 
        borderRadius: '16px', 
        border: `1px solid ${colors.border}`, 
        cursor: 'pointer', 
        transition: 'all 0.2s',
        maxWidth: '600px',
        margin: '0 auto',
      }}
    >
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '20px' }}>
        <div>
          <h3 style={{ margin: '0 0 6px 0', fontSize: '22px', fontWeight: 700, color: colors.textPrimary }}>{project.name}</h3>
          <p style={{ margin: 0, fontSize: '14px', color: colors.textSecondary }}>{project.client}</p>
        </div>
        <span style={{ padding: '6px 14px', borderRadius: '8px', fontSize: '13px', fontWeight: 600, backgroundColor: status.bg, color: status.color }}>{status.label}</span>
      </div>
      
      {/* Barre de progression */}
      <div style={{ marginBottom: '24px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
          <span style={{ fontSize: '14px', color: colors.textSecondary }}>{project.phase}</span>
          <span style={{ fontSize: '14px', fontWeight: 600, color: colors.textPrimary }}>{project.progress}%</span>
        </div>
        <div style={{ height: '8px', backgroundColor: colors.background, borderRadius: '4px', overflow: 'hidden' }}>
          <div style={{ width: `${project.progress}%`, height: '100%', backgroundColor: colors.primary, borderRadius: '4px', transition: 'width 0.3s' }} />
        </div>
      </div>
      
      {/* Notifications */}
      {hasNotifications && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', padding: '16px 20px', backgroundColor: colors.background, borderRadius: '12px' }}>
          {/* Nouveautés */}
          {totalNew > 0 && (
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <span style={{ fontSize: '16px' }}>🆕</span>
              <span style={{ fontSize: '14px', color: colors.textPrimary }}>
                <strong>Nouveautés :</strong>{' '}
                {[
                  project.newURS > 0 && `${project.newURS} URS`,
                  project.newFS > 0 && `${project.newFS} FS`,
                  project.modifications > 0 && `${project.modifications} modification${project.modifications > 1 ? 's' : ''}`,
                ].filter(Boolean).join(' • ')}
              </span>
            </div>
          )}
          
          {/* Commentaires */}
          {project.newComments > 0 && (
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <span style={{ fontSize: '16px' }}>💬</span>
              <span style={{ fontSize: '14px', color: colors.textPrimary }}>
                <strong>{project.newComments}</strong> nouveau{project.newComments > 1 ? 'x' : ''} commentaire{project.newComments > 1 ? 's' : ''}
              </span>
            </div>
          )}
          
          {/* Validations en attente */}
          {totalPending > 0 && (
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <span style={{ fontSize: '16px' }}>⏳</span>
              <span style={{ fontSize: '14px', color: colors.warning, fontWeight: 500 }}>
                <strong>En attente :</strong>{' '}
                {[
                  project.pendingValidations?.urs > 0 && `${project.pendingValidations.urs} URS à valider`,
                  project.pendingValidations?.fs > 0 && `${project.pendingValidations.fs} FS à valider`,
                ].filter(Boolean).join(' • ')}
              </span>
            </div>
          )}
        </div>
      )}
      
      {/* Footer */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '20px', paddingTop: '16px', borderTop: `1px solid ${colors.border}` }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Icons.Calendar style={{ color: colors.textSecondary, width: 16, height: 16 }} />
          <span style={{ fontSize: '13px', color: colors.textSecondary }}>Échéance : {project.dueDate}</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: colors.primary, fontSize: '14px', fontWeight: 500 }}>
          Accéder au projet <Icons.ArrowRight style={{ width: 16, height: 16 }} />
        </div>
      </div>
    </div>
  );
};

// Card projet COMPACT pour QA (plusieurs projets, essentiel uniquement)
const QAProjectCard = ({ project, onClick }) => {
  const statusConfig = {
    in_progress: { bg: colors.primaryLight, color: colors.primary, label: 'En cours' },
    review: { bg: '#F0ABFC20', color: '#A855F7', label: 'Revue QA' },
    starting: { bg: colors.warningLight, color: colors.warning, label: 'Démarrage' },
  };
  const status = statusConfig[project.status] || statusConfig.in_progress;
  
  const totalNew = project.newURS + project.newFS + project.modifications;
  const pendingFRA = project.pendingValidations?.fra || 0;
  const hasNotifications = totalNew > 0 || project.newComments > 0;
  
  // Badge département
  const deptConfig = {
    'R&D': { bg: '#DBEAFE', color: '#1D4ED8' },
    'Industrie': { bg: '#FEF3C7', color: '#B45309' },
    'DDSI': { bg: '#E0E7FF', color: '#4338CA' },
  };
  const dept = deptConfig[project.department] || { bg: colors.background, color: colors.textSecondary };
  
  return (
    <div 
      onClick={onClick} 
      style={{ 
        padding: '16px 18px', 
        backgroundColor: 'white', 
        borderRadius: '12px', 
        border: `1px solid ${colors.border}`, 
        cursor: 'pointer', 
        transition: 'all 0.2s',
        position: 'relative',
      }}
    >
      {/* Badge notifications */}
      {hasNotifications && (
        <span style={{ 
          position: 'absolute', 
          top: '-6px', 
          right: '-6px', 
          width: '20px', 
          height: '20px', 
          borderRadius: '50%', 
          backgroundColor: colors.primary, 
          color: 'white', 
          fontSize: '10px', 
          fontWeight: 700, 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center',
          border: '2px solid white',
        }}>
          {totalNew + project.newComments}
        </span>
      )}
      
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '10px' }}>
        <div style={{ flex: 1, minWidth: 0 }}>
          <h4 style={{ margin: '0 0 4px 0', fontSize: '14px', fontWeight: 600, color: colors.textPrimary, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{project.name}</h4>
          <p style={{ margin: 0, fontSize: '11px', color: colors.textSecondary, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{project.client}</p>
        </div>
        <span style={{ padding: '2px 8px', borderRadius: '4px', fontSize: '10px', fontWeight: 600, backgroundColor: dept.bg, color: dept.color, marginLeft: '8px', flexShrink: 0 }}>{project.department}</span>
      </div>
      
      {/* Progression mini */}
      <div style={{ marginBottom: '10px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
          <span style={{ fontSize: '11px', color: colors.textSecondary }}>{project.phase}</span>
          <span style={{ fontSize: '11px', fontWeight: 600, color: colors.textPrimary }}>{project.progress}%</span>
        </div>
        <div style={{ height: '4px', backgroundColor: colors.background, borderRadius: '2px', overflow: 'hidden' }}>
          <div style={{ width: `${project.progress}%`, height: '100%', backgroundColor: colors.primary, borderRadius: '2px' }} />
        </div>
      </div>
      
      {/* Infos rapides */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', fontSize: '12px' }}>
        {/* Nouveautés condensées */}
        {hasNotifications && (
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: colors.textSecondary }}>
            <span>🆕</span>
            <span>
              {[
                totalNew > 0 && `${totalNew} modif${totalNew > 1 ? 's' : ''}`,
                project.newComments > 0 && `${project.newComments} com.`,
              ].filter(Boolean).join(', ')}
            </span>
          </div>
        )}
        
        {/* FRA en attente */}
        {pendingFRA > 0 && (
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: colors.warning, fontWeight: 500 }}>
            <span>⏳</span>
            <span>{pendingFRA} FRA en attente</span>
          </div>
        )}
        
        {/* Date */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: colors.textSecondary }}>
          <Icons.Calendar style={{ width: 12, height: 12 }} />
          <span>{project.dueDate}</span>
        </div>
      </div>
    </div>
  );
};

// Section activité
const ActivityItem = ({ activity }) => (
  <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px', padding: '12px 0', borderBottom: `1px solid ${colors.border}` }}>
    <div style={{ width: '32px', height: '32px', borderRadius: '50%', backgroundColor: colors.primaryLight, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '11px', fontWeight: 600, color: colors.primary, flexShrink: 0 }}>{activity.avatar}</div>
    <div style={{ flex: 1 }}>
      <div style={{ fontSize: '13px', color: colors.textPrimary }}><strong>{activity.user}</strong> {activity.action} <span style={{ color: colors.primary }}>{activity.target}</span></div>
      <div style={{ fontSize: '12px', color: colors.textSecondary, marginTop: '2px' }}>{activity.project} • {activity.time}</div>
    </div>
  </div>
);

// Quick Actions selon rôle
const QuickActionsSection = ({ userRole, onAction }) => {
  const metierActions = [
    { id: 'onboarding', icon: '🎓', label: 'Revoir l\'onboarding', description: 'Tutoriel de prise en main' },
    { id: 'help', icon: '❓', label: 'Centre d\'aide', description: 'FAQ et documentation' },
    { id: 'videos', icon: '🎬', label: 'Tutoriels vidéo', description: 'Guides pas à pas' },
  ];
  
  const qaActions = [
    { id: 'new-project', icon: '➕', label: 'Créer un projet', description: 'Démarrer une nouvelle validation' },
    { id: 'resources', icon: '📁', label: 'Ressources partagées', description: 'Templates, SOPs, checklists' },
    { id: 'dashboard', icon: '📊', label: 'Tableau de bord QA', description: 'Vue consolidée qualité' },
  ];
  
  const actions = userRole === 'qualite' ? qaActions : metierActions;
  
  return (
    <div>
      <h3 style={{ fontSize: '14px', fontWeight: 600, color: colors.textPrimary, margin: '0 0 12px 0' }}>Actions rapides</h3>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        {actions.map(action => (
          <button key={action.id} onClick={() => onAction(action.id)} style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '12px 16px', backgroundColor: 'white', border: `1px solid ${colors.border}`, borderRadius: '10px', cursor: 'pointer', textAlign: 'left', transition: 'all 0.15s' }}>
            <span style={{ fontSize: '24px' }}>{action.icon}</span>
            <div>
              <div style={{ fontSize: '14px', fontWeight: 500, color: colors.textPrimary }}>{action.label}</div>
              <div style={{ fontSize: '12px', color: colors.textSecondary }}>{action.description}</div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

// Stats Admin
const AdminStatsSection = () => (
  <div style={{ marginBottom: '24px' }}>
    <h3 style={{ fontSize: '16px', fontWeight: 600, color: colors.textPrimary, margin: '0 0 16px 0', display: 'flex', alignItems: 'center', gap: '8px' }}><Icons.Activity /> Tableau de bord administrateur</h3>
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '12px', marginBottom: '16px' }}>
      <div style={{ padding: '16px', backgroundColor: 'white', borderRadius: '10px', border: `1px solid ${colors.border}` }}>
        <div style={{ fontSize: '24px', fontWeight: 700, color: colors.primary }}>{adminStats.totalProjects}</div>
        <div style={{ fontSize: '12px', color: colors.textSecondary }}>Projets totaux</div>
      </div>
      <div style={{ padding: '16px', backgroundColor: 'white', borderRadius: '10px', border: `1px solid ${colors.border}` }}>
        <div style={{ fontSize: '24px', fontWeight: 700, color: colors.success }}>{adminStats.activeProjects}</div>
        <div style={{ fontSize: '12px', color: colors.textSecondary }}>Projets actifs</div>
      </div>
      <div style={{ padding: '16px', backgroundColor: 'white', borderRadius: '10px', border: `1px solid ${colors.border}` }}>
        <div style={{ fontSize: '24px', fontWeight: 700, color: colors.textPrimary }}>{adminStats.complianceRate}%</div>
        <div style={{ fontSize: '12px', color: colors.textSecondary }}>Taux conformité</div>
      </div>
      <div style={{ padding: '16px', backgroundColor: colors.errorLight, borderRadius: '10px', border: `1px solid ${colors.error}30` }}>
        <div style={{ fontSize: '24px', fontWeight: 700, color: colors.error }}>{adminStats.overdueItems}</div>
        <div style={{ fontSize: '12px', color: colors.textSecondary }}>Éléments en retard</div>
      </div>
    </div>
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px' }}>
      <div style={{ padding: '16px', backgroundColor: 'white', borderRadius: '10px', border: `1px solid ${colors.border}`, display: 'flex', alignItems: 'center', gap: '12px' }}>
        <div style={{ width: '40px', height: '40px', borderRadius: '10px', backgroundColor: colors.primaryLight, display: 'flex', alignItems: 'center', justifyContent: 'center', color: colors.primary }}><Icons.Clock /></div>
        <div>
          <div style={{ fontSize: '16px', fontWeight: 600, color: colors.textPrimary }}>{adminStats.avgCompletionTime}</div>
          <div style={{ fontSize: '12px', color: colors.textSecondary }}>Durée moyenne projet</div>
        </div>
      </div>
      <div style={{ padding: '16px', backgroundColor: 'white', borderRadius: '10px', border: `1px solid ${colors.border}`, display: 'flex', alignItems: 'center', gap: '12px' }}>
        <div style={{ width: '40px', height: '40px', borderRadius: '10px', backgroundColor: colors.warningLight, display: 'flex', alignItems: 'center', justifyContent: 'center', color: colors.warning }}><Icons.AlertCircle /></div>
        <div>
          <div style={{ fontSize: '16px', fontWeight: 600, color: colors.textPrimary }}>{adminStats.pendingValidations}</div>
          <div style={{ fontSize: '12px', color: colors.textSecondary }}>Validations en attente</div>
        </div>
      </div>
      <div style={{ padding: '16px', backgroundColor: 'white', borderRadius: '10px', border: `1px solid ${colors.border}`, display: 'flex', alignItems: 'center', gap: '12px' }}>
        <div style={{ width: '40px', height: '40px', borderRadius: '10px', backgroundColor: colors.successLight, display: 'flex', alignItems: 'center', justifyContent: 'center', color: colors.success }}><Icons.CheckCircle /></div>
        <div>
          <div style={{ fontSize: '16px', fontWeight: 600, color: colors.textPrimary }}>{adminStats.completedThisMonth}</div>
          <div style={{ fontSize: '12px', color: colors.textSecondary }}>Terminés ce mois</div>
        </div>
      </div>
    </div>
  </div>
);

// Ressources partagées QA
const SharedResourcesSection = () => (
  <div style={{ marginTop: '24px' }}>
    <h3 style={{ fontSize: '14px', fontWeight: 600, color: colors.textPrimary, margin: '0 0 12px 0', display: 'flex', alignItems: 'center', gap: '8px' }}><Icons.Folder /> Ressources partagées</h3>
    <div style={{ backgroundColor: 'white', borderRadius: '10px', border: `1px solid ${colors.border}`, overflow: 'hidden' }}>
      {sharedResources.slice(0, 4).map((resource, i) => (
        <div key={resource.id} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px 16px', borderBottom: i < 3 ? `1px solid ${colors.border}` : 'none', cursor: 'pointer' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <span style={{ fontSize: '18px' }}>{resource.icon}</span>
            <span style={{ fontSize: '13px', color: colors.textPrimary }}>{resource.name}</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ fontSize: '11px', color: colors.textSecondary }}>{resource.downloads} téléch.</span>
            <Icons.Download style={{ color: colors.textSecondary, width: 14, height: 14 }} />
          </div>
        </div>
      ))}
    </div>
    <button style={{ width: '100%', padding: '10px', marginTop: '8px', backgroundColor: 'transparent', border: `1px dashed ${colors.border}`, borderRadius: '8px', cursor: 'pointer', fontSize: '13px', color: colors.primary, fontWeight: 500 }}>Voir toutes les ressources →</button>
  </div>
);

// =============================================================================
// PAGE AIDE ET RESSOURCES (Phase 2)
// =============================================================================

// Données FAQ par profil
const faqMetier = [
  { q: "Comment valider une URS ?", a: "Depuis la page URS, cliquez sur l'exigence à valider. Dans le panneau de détail, vous pouvez approuver ou demander des modifications via l'onglet Discussion. Une fois satisfait, cliquez sur \"Approuver\" dans le bandeau de validation." },
  { q: "Que signifie le statut 'En attente de validation' ?", a: "Ce statut indique qu'une exigence a été rédigée et soumise pour revue. Elle attend votre validation en tant que représentant métier pour confirmer qu'elle correspond bien au besoin exprimé." },
  { q: "Comment ajouter un commentaire ?", a: "Ouvrez le détail de n'importe quel élément (URS, FS, etc.), puis allez dans l'onglet \"Discussion\". Vous pouvez y ajouter des commentaires, mentionner des collègues avec @, et joindre des fichiers." },
  { q: "Puis-je modifier une URS déjà validée ?", a: "Une URS validée peut être réouverte si nécessaire (bouton dans le panneau de détail). Attention : cela invalidera également les FS et FRA associés qui devront être revalidés." },
  { q: "Comment voir l'historique des modifications ?", a: "Dans le panneau de détail de chaque élément, l'onglet \"Historique\" affiche toutes les modifications avec les différences (diffs), les auteurs et les dates." },
];

const faqQA = [
  { q: "Comment créer un nouveau projet de validation ?", a: "Depuis la page d'accueil, cliquez sur \"+ Nouveau projet\". Renseignez les informations projet (nom, client, type GxP, criticité) puis configurez l'équipe RACI. Le SVP sera automatiquement initialisé." },
  { q: "Quelle est la différence entre GxP Direct et Indirect ?", a: "GxP Direct : le système a un impact direct sur la qualité du produit ou la sécurité patient. GxP Indirect : le système supporte des processus GxP mais n'a pas d'impact direct. Données stratégiques : données business critiques hors GxP." },
  { q: "Comment fonctionne l'analyse critique ?", a: "L'analyse critique utilise l'IA pour détecter les incohérences, doublons et exigences incomplètes. Lancez-la depuis le bandeau sur les pages URS ou FS. Les findings sont catégorisés et vous pouvez les traiter un par un." },
  { q: "Quand dois-je lancer une analyse de risques (FRA) ?", a: "La FRA doit être réalisée après validation des FS. Elle permet d'identifier les risques liés à chaque spécification et de définir les contrôles appropriés (tests, procédures, etc.)." },
  { q: "Comment gérer la matrice RACI d'un projet ?", a: "Accédez à la page \"RACI\" depuis le menu projet. Vous pouvez y définir les rôles (Responsible, Accountable, Consulted, Informed) pour chaque livrable et chaque membre de l'équipe." },
];

const faqAdmin = [
  { q: "Comment ajouter un nouvel utilisateur ?", a: "Dans Administration > Utilisateurs, cliquez sur \"Ajouter un utilisateur\". Renseignez les informations et attribuez un rôle global (Admin, QA, ou Métier). L'utilisateur recevra un email d'invitation." },
  { q: "Comment configurer les workflows de validation ?", a: "Dans Administration > Paramètres > Workflows, vous pouvez personnaliser les étapes de validation, les signatures requises et les règles de cascade entre livrables." },
  { q: "Puis-je personnaliser les templates de documents ?", a: "Oui, dans Administration > Templates. Vous pouvez modifier les modèles Word/PDF générés pour chaque type de livrable (URS, FS, FRA, protocoles, etc.)." },
  { q: "Comment voir les statistiques d'utilisation ?", a: "Le tableau de bord Admin (en cours de développement) affichera les KPIs : nombre de projets, taux de conformité, temps moyen par phase, charge équipe, etc." },
];

// Données Glossaire GxP
const glossaryTerms = [
  { term: "GxP", definition: "Good Practice - Ensemble des bonnes pratiques réglementaires (GMP, GLP, GCP, GDP, etc.) applicables aux industries de la santé." },
  { term: "21 CFR Part 11", definition: "Réglementation FDA définissant les critères pour les enregistrements électroniques et signatures électroniques dans l'industrie pharmaceutique américaine." },
  { term: "Annexe 11", definition: "Guide européen des bonnes pratiques de fabrication pour les systèmes informatisés, définissant les exigences de validation et de contrôle." },
  { term: "URS", definition: "User Requirements Specification - Document décrivant les besoins utilisateurs auxquels le système doit répondre." },
  { term: "FS", definition: "Functional Specification - Document décrivant comment le système répond aux exigences utilisateurs (fonctionnalités techniques)." },
  { term: "FRA", definition: "Functional Risk Assessment - Analyse des risques associés aux fonctionnalités du système et définition des contrôles." },
  { term: "SVP", definition: "System Validation Plan - Plan définissant la stratégie, le périmètre et les ressources pour la validation d'un système." },
  { term: "IQ/OQ/PQ", definition: "Installation/Operational/Performance Qualification - Phases de tests vérifiant l'installation, le fonctionnement et les performances du système." },
  { term: "RACI", definition: "Responsible, Accountable, Consulted, Informed - Matrice définissant les rôles et responsabilités dans un projet." },
  { term: "GAMP 5", definition: "Good Automated Manufacturing Practice - Guide ISPE pour la validation des systèmes informatisés dans l'industrie pharmaceutique." },
  { term: "Audit Trail", definition: "Piste d'audit - Enregistrement chronologique et sécurisé de toutes les actions et modifications effectuées dans un système." },
  { term: "CSV", definition: "Computer System Validation - Processus documenté prouvant qu'un système informatisé fait ce qu'il est censé faire de manière cohérente et reproductible." },
];

// Données Templates QA
const qaTemplates = [
  { name: "Template URS", type: "Word", category: "Livrables", downloads: 234, description: "Modèle standard pour la rédaction des User Requirements" },
  { name: "Template FS", type: "Word", category: "Livrables", downloads: 198, description: "Modèle standard pour les Functional Specifications" },
  { name: "Matrice de traçabilité", type: "Excel", category: "Outils", downloads: 156, description: "Template pour le suivi URS → FS → Tests" },
  { name: "Checklist revue documentaire", type: "PDF", category: "Qualité", downloads: 89, description: "Points de contrôle pour la revue QA des livrables" },
  { name: "Template FRA", type: "Word", category: "Livrables", downloads: 145, description: "Modèle d'analyse de risques fonctionnels" },
  { name: "Plan de validation type", type: "Word", category: "Livrables", downloads: 112, description: "Structure standard pour le SVP" },
  { name: "Protocole IQ générique", type: "Word", category: "Tests", downloads: 78, description: "Template pour les tests d'installation" },
  { name: "Protocole OQ générique", type: "Word", category: "Tests", downloads: 92, description: "Template pour les tests opérationnels" },
];

// Données vidéos tutoriels
const tutorialVideos = [
  { title: "Prise en main de GxPDoc", duration: "5:30", level: "Débutant", category: "Introduction", views: 1234 },
  { title: "Créer et gérer un projet", duration: "8:15", level: "Débutant", category: "Projets", views: 892 },
  { title: "Rédiger des URS efficaces", duration: "12:00", level: "Intermédiaire", category: "URS", views: 756 },
  { title: "Utiliser l'analyse critique IA", duration: "6:45", level: "Intermédiaire", category: "IA", views: 543 },
  { title: "Workflow de validation complet", duration: "15:20", level: "Avancé", category: "Validation", views: 421 },
  { title: "Configurer la matrice RACI", duration: "7:00", level: "Intermédiaire", category: "Projets", views: 389 },
];

// Composant FAQ Item
const FAQItem = ({ question, answer, isOpen, onToggle }) => (
  <div style={{ backgroundColor: 'white', borderRadius: '10px', border: `1px solid ${colors.border}`, marginBottom: '12px', overflow: 'hidden' }}>
    <button 
      onClick={onToggle}
      style={{ 
        width: '100%', 
        padding: '16px 20px', 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'space-between',
        backgroundColor: 'transparent',
        border: 'none',
        cursor: 'pointer',
        textAlign: 'left',
      }}
    >
      <span style={{ fontSize: '14px', fontWeight: 500, color: colors.textPrimary }}>{question}</span>
      <span style={{ color: colors.textSecondary, transform: isOpen ? 'rotate(180deg)' : 'rotate(0)', transition: 'transform 0.2s' }}>
        <Icons.ChevronDown />
      </span>
    </button>
    {isOpen && (
      <div style={{ padding: '0 20px 16px', fontSize: '14px', color: colors.textSecondary, lineHeight: 1.6 }}>
        {answer}
      </div>
    )}
  </div>
);

// Composant contenu Onboarding
const OnboardingContent = ({ userRole }) => {
  const [currentStep, setCurrentStep] = useState(0);
  
  const metierSteps = [
    { title: "Bienvenue sur GxPDoc", icon: "👋", content: "GxPDoc vous accompagne dans la validation de vos systèmes informatisés. En tant que représentant métier, vous êtes au cœur du processus : vos besoins guident toute la validation.", tips: ["Votre rôle principal : exprimer et valider les besoins", "Vous n'avez pas besoin de compétences techniques", "L'équipe QA vous accompagne à chaque étape"] },
    { title: "Votre tableau de bord", icon: "🏠", content: "La page d'accueil affiche votre projet en cours avec les éléments nécessitant votre attention : nouvelles URS, modifications, et validations en attente.", tips: ["Les notifications 🆕 indiquent les nouveautés", "Les éléments ⏳ attendent votre action", "Cliquez sur le projet pour y accéder"] },
    { title: "Exprimer vos besoins (URS)", icon: "📝", content: "Les URS (User Requirements) décrivent ce que le système doit faire pour vous. Rédigez-les en langage simple, l'équipe QA les traduira en spécifications techniques.", tips: ["Décrivez le QUOI, pas le COMMENT", "Soyez précis et mesurable", "Une URS = un besoin unique"] },
    { title: "Valider les livrables", icon: "✅", content: "Vous validez que les URS et FS correspondent bien à vos besoins. Utilisez les commentaires pour demander des clarifications avant d'approuver.", tips: ["Lisez attentivement chaque élément", "N'hésitez pas à poser des questions", "Votre validation engage votre responsabilité"] },
  ];
  
  const qaSteps = [
    { title: "Bienvenue sur GxPDoc", icon: "👋", content: "GxPDoc centralise tout le cycle de validation de vos systèmes informatisés GxP. En tant que QA, vous pilotez les projets et garantissez la conformité.", tips: ["Vous créez et configurez les projets", "Vous rédigez les FS et pilotez la FRA", "Vous accompagnez les métiers dans leurs validations"] },
    { title: "Créer un projet", icon: "➕", content: "Depuis l'accueil, créez un nouveau projet en définissant sa classification GxP, sa criticité et l'équipe. Le SVP est automatiquement initialisé.", tips: ["Choisissez bien la classification GxP", "Configurez la matrice RACI dès le départ", "Importez les documents source si disponibles"] },
    { title: "Analyse critique IA", icon: "🤖", content: "L'IA analyse vos URS et FS pour détecter incohérences, doublons et éléments manquants. Lancez l'analyse régulièrement pour maintenir la qualité.", tips: ["Lancez l'analyse avant chaque jalon", "Traitez les findings avant validation", "L'analyse devient 'Obsolète' après modification"] },
    { title: "Workflow de validation", icon: "📋", content: "Chaque livrable suit un workflow : Rédaction → Validation → Signature. La réouverture déclenche une cascade sur les livrables dépendants.", tips: ["URS → FS → FRA : respectez l'ordre", "La signature finalise et verrouille", "Documentez les motifs de réouverture"] },
  ];
  
  const steps = userRole === 'metier' ? metierSteps : qaSteps;
  
  return (
    <div>
      <h2 style={{ fontSize: '22px', fontWeight: 700, color: colors.textPrimary, margin: '0 0 8px' }}>
        {userRole === 'metier' ? 'Prise en main' : 'Guide de démarrage'}
      </h2>
      <p style={{ fontSize: '14px', color: colors.textSecondary, margin: '0 0 32px' }}>
        Suivez ce parcours pour maîtriser les fonctionnalités essentielles
      </p>
      
      {/* Progress bar */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '32px' }}>
        {steps.map((_, i) => (
          <React.Fragment key={i}>
            <button
              onClick={() => setCurrentStep(i)}
              style={{
                width: '32px',
                height: '32px',
                borderRadius: '50%',
                border: 'none',
                backgroundColor: i <= currentStep ? colors.primary : colors.background,
                color: i <= currentStep ? 'white' : colors.textSecondary,
                fontSize: '14px',
                fontWeight: 600,
                cursor: 'pointer',
                transition: 'all 0.2s',
              }}
            >
              {i + 1}
            </button>
            {i < steps.length - 1 && (
              <div style={{ flex: 1, height: '2px', backgroundColor: i < currentStep ? colors.primary : colors.border }} />
            )}
          </React.Fragment>
        ))}
      </div>
      
      {/* Step content */}
      <div style={{ backgroundColor: 'white', borderRadius: '16px', border: `1px solid ${colors.border}`, padding: '32px', marginBottom: '24px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '20px' }}>
          <div style={{ width: '56px', height: '56px', borderRadius: '14px', backgroundColor: colors.primaryLight, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '28px' }}>
            {steps[currentStep].icon}
          </div>
          <h3 style={{ margin: 0, fontSize: '18px', fontWeight: 600, color: colors.textPrimary }}>{steps[currentStep].title}</h3>
        </div>
        
        <p style={{ fontSize: '15px', color: colors.textPrimary, lineHeight: 1.7, margin: '0 0 24px' }}>
          {steps[currentStep].content}
        </p>
        
        <div style={{ backgroundColor: colors.accentLight, borderRadius: '10px', padding: '16px 20px' }}>
          <div style={{ fontSize: '12px', fontWeight: 600, color: colors.accent, marginBottom: '10px', textTransform: 'uppercase' }}>💡 À retenir</div>
          <ul style={{ margin: 0, paddingLeft: '20px' }}>
            {steps[currentStep].tips.map((tip, i) => (
              <li key={i} style={{ fontSize: '13px', color: colors.textPrimary, marginBottom: '6px' }}>{tip}</li>
            ))}
          </ul>
        </div>
      </div>
      
      {/* Navigation */}
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <button
          onClick={() => setCurrentStep(Math.max(0, currentStep - 1))}
          disabled={currentStep === 0}
          style={{
            padding: '10px 20px',
            borderRadius: '8px',
            border: `1px solid ${colors.border}`,
            backgroundColor: 'white',
            color: currentStep === 0 ? colors.textSecondary : colors.textPrimary,
            fontSize: '14px',
            fontWeight: 500,
            cursor: currentStep === 0 ? 'not-allowed' : 'pointer',
            opacity: currentStep === 0 ? 0.5 : 1,
          }}
        >
          ← Précédent
        </button>
        <button
          onClick={() => setCurrentStep(Math.min(steps.length - 1, currentStep + 1))}
          disabled={currentStep === steps.length - 1}
          style={{
            padding: '10px 20px',
            borderRadius: '8px',
            border: 'none',
            backgroundColor: currentStep === steps.length - 1 ? colors.success : colors.primary,
            color: 'white',
            fontSize: '14px',
            fontWeight: 500,
            cursor: currentStep === steps.length - 1 ? 'default' : 'pointer',
          }}
        >
          {currentStep === steps.length - 1 ? '✓ Terminé' : 'Suivant →'}
        </button>
      </div>
    </div>
  );
};

// Composant contenu FAQ
const FAQContent = ({ userRole }) => {
  const [openIndex, setOpenIndex] = useState(0);
  const faqs = userRole === 'metier' ? faqMetier : userRole === 'qualite' ? faqQA : faqAdmin;
  
  return (
    <div>
      <h2 style={{ fontSize: '22px', fontWeight: 700, color: colors.textPrimary, margin: '0 0 8px' }}>Foire aux questions</h2>
      <p style={{ fontSize: '14px', color: colors.textSecondary, margin: '0 0 32px' }}>
        Retrouvez les réponses aux questions les plus fréquentes
      </p>
      
      {faqs.map((faq, i) => (
        <FAQItem 
          key={i} 
          question={faq.q} 
          answer={faq.a} 
          isOpen={openIndex === i}
          onToggle={() => setOpenIndex(openIndex === i ? -1 : i)}
        />
      ))}
      
      <div style={{ marginTop: '32px', padding: '20px', backgroundColor: colors.primaryLight, borderRadius: '12px', textAlign: 'center' }}>
        <p style={{ margin: '0 0 12px', fontSize: '14px', color: colors.textPrimary }}>Vous ne trouvez pas la réponse à votre question ?</p>
        <button style={{ padding: '10px 20px', borderRadius: '8px', border: 'none', backgroundColor: colors.primary, color: 'white', fontSize: '14px', fontWeight: 500, cursor: 'pointer' }}>
          Contacter le support
        </button>
      </div>
    </div>
  );
};

// Composant Glossaire
const GlossaryContent = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const filtered = glossaryTerms.filter(t => 
    t.term.toLowerCase().includes(searchTerm.toLowerCase()) ||
    t.definition.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  return (
    <div>
      <h2 style={{ fontSize: '22px', fontWeight: 700, color: colors.textPrimary, margin: '0 0 8px' }}>Glossaire GxP</h2>
      <p style={{ fontSize: '14px', color: colors.textSecondary, margin: '0 0 24px' }}>
        Définitions des termes et acronymes utilisés en validation
      </p>
      
      {/* Recherche */}
      <div style={{ position: 'relative', marginBottom: '24px' }}>
        <span style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', color: colors.textSecondary, display: 'flex', alignItems: 'center' }}><Icons.Search /></span>
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Rechercher un terme..."
          style={{ width: '100%', padding: '12px 14px 12px 44px', borderRadius: '10px', border: `1px solid ${colors.border}`, fontSize: '14px', outline: 'none' }}
        />
      </div>
      
      {/* Liste */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        {filtered.map((item, i) => (
          <div key={i} style={{ backgroundColor: 'white', borderRadius: '10px', border: `1px solid ${colors.border}`, padding: '16px 20px' }}>
            <div style={{ fontSize: '15px', fontWeight: 600, color: colors.primary, marginBottom: '6px' }}>{item.term}</div>
            <div style={{ fontSize: '14px', color: colors.textPrimary, lineHeight: 1.6 }}>{item.definition}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

// Composant Templates QA
const HelpTemplatesContent = () => {
  const [categoryFilter, setCategoryFilter] = useState('all');
  const categories = ['all', 'Livrables', 'Outils', 'Qualité', 'Tests'];
  const filtered = categoryFilter === 'all' ? qaTemplates : qaTemplates.filter(t => t.category === categoryFilter);
  
  return (
    <div>
      <h2 style={{ fontSize: '22px', fontWeight: 700, color: colors.textPrimary, margin: '0 0 8px' }}>Templates & SOPs</h2>
      <p style={{ fontSize: '14px', color: colors.textSecondary, margin: '0 0 24px' }}>
        Documents modèles et procédures standard pour vos projets
      </p>
      
      {/* Filtres */}
      <div style={{ display: 'flex', gap: '8px', marginBottom: '24px', flexWrap: 'wrap' }}>
        {categories.map(cat => (
          <button
            key={cat}
            onClick={() => setCategoryFilter(cat)}
            style={{
              padding: '8px 16px',
              borderRadius: '8px',
              border: categoryFilter === cat ? `1px solid ${colors.primary}` : `1px solid ${colors.border}`,
              backgroundColor: categoryFilter === cat ? colors.primaryLight : 'white',
              color: categoryFilter === cat ? colors.primary : colors.textSecondary,
              fontSize: '13px',
              fontWeight: 500,
              cursor: 'pointer',
            }}
          >
            {cat === 'all' ? 'Tous' : cat}
          </button>
        ))}
      </div>
      
      {/* Liste */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        {filtered.map((template, i) => (
          <div key={i} style={{ backgroundColor: 'white', borderRadius: '10px', border: `1px solid ${colors.border}`, padding: '16px 20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
              <div style={{ width: '44px', height: '44px', borderRadius: '10px', backgroundColor: template.type === 'Word' ? '#DBEAFE' : template.type === 'Excel' ? '#D1FAE5' : '#FEE2E2', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '12px', fontWeight: 600, color: template.type === 'Word' ? '#1D4ED8' : template.type === 'Excel' ? '#059669' : '#DC2626' }}>
                {template.type}
              </div>
              <div>
                <div style={{ fontSize: '14px', fontWeight: 500, color: colors.textPrimary }}>{template.name}</div>
                <div style={{ fontSize: '12px', color: colors.textSecondary }}>{template.description}</div>
              </div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
              <span style={{ fontSize: '12px', color: colors.textSecondary }}>{template.downloads} téléch.</span>
              <button style={{ padding: '8px 16px', borderRadius: '6px', border: 'none', backgroundColor: colors.primary, color: 'white', fontSize: '12px', fontWeight: 500, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px' }}>
                <Icons.Download style={{ width: 14, height: 14 }} /> Télécharger
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// Composant Vidéos
const VideosContent = () => {
  const [levelFilter, setLevelFilter] = useState('all');
  const levels = ['all', 'Débutant', 'Intermédiaire', 'Avancé'];
  const filtered = levelFilter === 'all' ? tutorialVideos : tutorialVideos.filter(v => v.level === levelFilter);
  
  return (
    <div>
      <h2 style={{ fontSize: '22px', fontWeight: 700, color: colors.textPrimary, margin: '0 0 8px' }}>Tutoriels vidéo</h2>
      <p style={{ fontSize: '14px', color: colors.textSecondary, margin: '0 0 24px' }}>
        Apprenez à utiliser GxPDoc avec nos guides vidéo
      </p>
      
      {/* Filtres niveau */}
      <div style={{ display: 'flex', gap: '8px', marginBottom: '24px' }}>
        {levels.map(level => (
          <button
            key={level}
            onClick={() => setLevelFilter(level)}
            style={{
              padding: '8px 16px',
              borderRadius: '8px',
              border: levelFilter === level ? `1px solid ${colors.primary}` : `1px solid ${colors.border}`,
              backgroundColor: levelFilter === level ? colors.primaryLight : 'white',
              color: levelFilter === level ? colors.primary : colors.textSecondary,
              fontSize: '13px',
              fontWeight: 500,
              cursor: 'pointer',
            }}
          >
            {level === 'all' ? 'Tous les niveaux' : level}
          </button>
        ))}
      </div>
      
      {/* Grille vidéos */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '16px' }}>
        {filtered.map((video, i) => (
          <div key={i} style={{ backgroundColor: 'white', borderRadius: '12px', border: `1px solid ${colors.border}`, overflow: 'hidden', cursor: 'pointer' }}>
            {/* Thumbnail placeholder */}
            <div style={{ height: '140px', backgroundColor: colors.primaryDark, display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
              <div style={{ width: '56px', height: '56px', borderRadius: '50%', backgroundColor: 'rgba(255,255,255,0.9)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <div style={{ width: 0, height: 0, borderTop: '10px solid transparent', borderBottom: '10px solid transparent', borderLeft: '16px solid ' + colors.primary, marginLeft: '4px' }} />
              </div>
              <span style={{ position: 'absolute', bottom: '10px', right: '10px', padding: '4px 8px', backgroundColor: 'rgba(0,0,0,0.7)', borderRadius: '4px', fontSize: '12px', color: 'white' }}>{video.duration}</span>
            </div>
            <div style={{ padding: '16px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                <span style={{ padding: '3px 8px', borderRadius: '4px', backgroundColor: video.level === 'Débutant' ? colors.successLight : video.level === 'Intermédiaire' ? colors.warningLight : colors.errorLight, color: video.level === 'Débutant' ? colors.success : video.level === 'Intermédiaire' ? colors.warning : colors.error, fontSize: '10px', fontWeight: 600 }}>{video.level}</span>
                <span style={{ fontSize: '11px', color: colors.textSecondary }}>{video.category}</span>
              </div>
              <div style={{ fontSize: '14px', fontWeight: 500, color: colors.textPrimary, marginBottom: '4px' }}>{video.title}</div>
              <div style={{ fontSize: '12px', color: colors.textSecondary }}>{video.views} vues</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// Composant Process Validation (QA)
const ProcessContent = () => (
  <div>
    <h2 style={{ fontSize: '22px', fontWeight: 700, color: colors.textPrimary, margin: '0 0 8px' }}>Process de validation</h2>
    <p style={{ fontSize: '14px', color: colors.textSecondary, margin: '0 0 32px' }}>
      Vue d'ensemble du cycle de validation dans GxPDoc
    </p>
    
    {/* Workflow visuel */}
    <div style={{ backgroundColor: 'white', borderRadius: '16px', border: `1px solid ${colors.border}`, padding: '32px', marginBottom: '24px' }}>
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
        {[
          { step: '1', title: 'SVP', desc: 'Plan de validation', color: colors.primary },
          { step: '2', title: 'URS', desc: 'Besoins utilisateurs', color: colors.primary },
          { step: '3', title: 'FS', desc: 'Spécifications', color: colors.primary },
          { step: '4', title: 'FRA', desc: 'Analyse risques', color: colors.primary },
          { step: '5', title: 'Tests', desc: 'IQ/OQ/PQ', color: colors.textSecondary },
          { step: '6', title: 'VSR', desc: 'Rapport final', color: colors.textSecondary },
        ].map((item, i) => (
          <React.Fragment key={i}>
            <div style={{ textAlign: 'center', flex: '0 0 auto' }}>
              <div style={{ width: '48px', height: '48px', borderRadius: '50%', backgroundColor: item.color === colors.textSecondary ? colors.background : colors.primaryLight, color: item.color, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '18px', fontWeight: 700, margin: '0 auto 12px', border: item.color === colors.textSecondary ? `2px dashed ${colors.border}` : 'none' }}>
                {item.step}
              </div>
              <div style={{ fontSize: '14px', fontWeight: 600, color: item.color === colors.textSecondary ? colors.textSecondary : colors.textPrimary }}>{item.title}</div>
              <div style={{ fontSize: '11px', color: colors.textSecondary }}>{item.desc}</div>
            </div>
            {i < 5 && (
              <div style={{ flex: 1, height: '2px', backgroundColor: i < 3 ? colors.primary : colors.border, marginTop: '24px', opacity: i < 3 ? 1 : 0.5 }} />
            )}
          </React.Fragment>
        ))}
      </div>
      <div style={{ marginTop: '24px', padding: '12px 16px', backgroundColor: colors.accentLight, borderRadius: '8px', fontSize: '13px', color: colors.textPrimary }}>
        <strong>💡 Note :</strong> Les étapes Tests et VSR sont en cours de développement dans GxPDoc.
      </div>
    </div>
    
    {/* Cascade de dépendances */}
    <h3 style={{ fontSize: '16px', fontWeight: 600, color: colors.textPrimary, margin: '0 0 16px' }}>Chaîne de dépendance</h3>
    <div style={{ backgroundColor: 'white', borderRadius: '12px', border: `1px solid ${colors.border}`, padding: '20px' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
        <span style={{ padding: '6px 12px', borderRadius: '6px', backgroundColor: colors.primaryLight, color: colors.primary, fontSize: '13px', fontWeight: 600 }}>URS</span>
        <Icons.ArrowRight style={{ color: colors.textSecondary }} />
        <span style={{ padding: '6px 12px', borderRadius: '6px', backgroundColor: colors.primaryLight, color: colors.primary, fontSize: '13px', fontWeight: 600 }}>FS</span>
        <Icons.ArrowRight style={{ color: colors.textSecondary }} />
        <span style={{ padding: '6px 12px', borderRadius: '6px', backgroundColor: colors.primaryLight, color: colors.primary, fontSize: '13px', fontWeight: 600 }}>FRA</span>
      </div>
      <p style={{ margin: 0, fontSize: '13px', color: colors.textSecondary, lineHeight: 1.6 }}>
        La réouverture d'un livrable entraîne automatiquement la réouverture des livrables dépendants.<br/>
        Exemple : réouvrir une URS signée → les FS et FRA associés repassent en rédaction.
      </p>
    </div>
  </div>
);

// Composant Contact Support
const ContactContent = () => (
  <div style={{ textAlign: 'center', padding: '40px' }}>
    <div style={{ width: '80px', height: '80px', borderRadius: '20px', backgroundColor: colors.primaryLight, display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 24px', fontSize: '40px' }}>
      💬
    </div>
    <h2 style={{ fontSize: '22px', fontWeight: 700, color: colors.textPrimary, margin: '0 0 12px' }}>Besoin d'aide ?</h2>
    <p style={{ fontSize: '15px', color: colors.textSecondary, margin: '0 0 32px', maxWidth: '400px', marginLeft: 'auto', marginRight: 'auto' }}>
      Notre équipe support est disponible pour répondre à vos questions du lundi au vendredi, 9h-18h.
    </p>
    
    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', maxWidth: '300px', margin: '0 auto' }}>
      <button style={{ padding: '14px 24px', borderRadius: '10px', border: 'none', backgroundColor: colors.primary, color: 'white', fontSize: '14px', fontWeight: 600, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px' }}>
        <Icons.MessageSquare /> Ouvrir un ticket
      </button>
      <button style={{ padding: '14px 24px', borderRadius: '10px', border: `1px solid ${colors.border}`, backgroundColor: 'white', color: colors.textPrimary, fontSize: '14px', fontWeight: 500, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px' }}>
        <Icons.Mail /> support@gxpdoc.com
      </button>
    </div>
  </div>
);

// Page principale Aide et Ressources
const HelpPage = ({ userRole, onBackToHome }) => {
  const [activeSection, setActiveSection] = useState('onboarding');
  
  // Sections différenciées par profil
  const metierSections = [
    { id: 'onboarding', label: 'Prise en main', icon: '🎓' },
    { id: 'faq', label: 'FAQ', icon: '❓' },
    { id: 'glossary', label: 'Glossaire GxP', icon: '📖' },
    { id: 'videos', label: 'Tutoriels vidéo', icon: '🎬' },
    { id: 'contact', label: 'Contact support', icon: '💬' },
  ];
  
  const qaSections = [
    { id: 'onboarding', label: 'Guide démarrage', icon: '🎓' },
    { id: 'process', label: 'Process validation', icon: '📋' },
    { id: 'templates', label: 'Templates & SOPs', icon: '📄' },
    { id: 'faq', label: 'FAQ', icon: '❓' },
    { id: 'videos', label: 'Tutoriels vidéo', icon: '🎬' },
  ];
  
  const adminSections = [
    { id: 'onboarding', label: 'Guide admin', icon: '🎓' },
    { id: 'process', label: 'Process & workflows', icon: '📋' },
    { id: 'faq', label: 'FAQ', icon: '❓' },
  ];
  
  const sections = userRole === 'metier' ? metierSections : userRole === 'qualite' ? qaSections : adminSections;
  
  // Rendu du contenu selon la section
  const renderContent = () => {
    switch (activeSection) {
      case 'onboarding':
        return <OnboardingContent userRole={userRole} />;
      case 'faq':
        return <FAQContent userRole={userRole} />;
      case 'glossary':
        return <GlossaryContent />;
      case 'videos':
        return <VideosContent />;
      case 'templates':
        return <HelpTemplatesContent />;
      case 'process':
        return <ProcessContent />;
      case 'contact':
        return <ContactContent />;
      default:
        return <OnboardingContent userRole={userRole} />;
    }
  };
  
  return (
    <div style={{ fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif", backgroundColor: colors.background, minHeight: '100vh' }}>
      {/* Header */}
      <header style={{ height: '64px', backgroundColor: 'white', borderBottom: `1px solid ${colors.border}`, display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 32px', position: 'sticky', top: 0, zIndex: 100 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <button onClick={onBackToHome} style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '8px 16px', backgroundColor: 'transparent', border: `1px solid ${colors.border}`, borderRadius: '8px', cursor: 'pointer', fontSize: '13px', color: colors.textSecondary, fontWeight: 500 }}>
            <Icons.ArrowLeft /> Retour
          </button>
          <div style={{ width: '1px', height: '32px', backgroundColor: colors.border }} />
          <h1 style={{ margin: 0, fontSize: '18px', fontWeight: 600, color: colors.textPrimary, display: 'flex', alignItems: 'center', gap: '10px' }}>
            <Icons.HelpCircle style={{ color: colors.primary }} /> Aide et Ressources
          </h1>
        </div>
      </header>
      
      <div style={{ display: 'flex' }}>
        {/* Sidebar */}
        <aside style={{ width: '260px', backgroundColor: 'white', borderRight: `1px solid ${colors.border}`, height: 'calc(100vh - 64px)', position: 'sticky', top: '64px', padding: '24px 16px' }}>
          <nav style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
            {sections.map(section => (
              <button
                key={section.id}
                onClick={() => setActiveSection(section.id)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  padding: '12px 16px',
                  backgroundColor: activeSection === section.id ? colors.primaryLight : 'transparent',
                  border: 'none',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  textAlign: 'left',
                  color: activeSection === section.id ? colors.primary : colors.textSecondary,
                  fontWeight: activeSection === section.id ? 600 : 400,
                  fontSize: '14px',
                  transition: 'all 0.15s',
                }}
              >
                <span style={{ fontSize: '18px' }}>{section.icon}</span>
                {section.label}
              </button>
            ))}
          </nav>
        </aside>
        
        {/* Contenu principal */}
        <main style={{ flex: 1, padding: '32px', maxWidth: '900px' }}>
          {renderContent()}
        </main>
      </div>
    </div>
  );
};

// =============================================================================
// DASHBOARD ADMIN (Phase 3)
// =============================================================================

const AdminDashboard = ({ onOpenBackoffice, onOpenProject }) => {
  const [deptFilter, setDeptFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [activeTab, setActiveTab] = useState('projects'); // 'projects' | 'team' | 'pipeline'
  
  // KPIs calculés
  const totalProjects = adminProjectsData.length;
  const inProgressProjects = adminProjectsData.filter(p => p.progress < 100).length;
  const lateProjects = adminProjectsData.filter(p => p.planningStatus === 'late').length;
  const upcomingCount = upcomingProjectsData.length;
  
  // Filtrage des projets
  const filteredProjects = adminProjectsData.filter(p => {
    if (deptFilter !== 'all' && p.department !== deptFilter) return false;
    if (statusFilter !== 'all' && p.planningStatus !== statusFilter) return false;
    return true;
  });
  
  // Max pour les graphiques
  const maxValidations = Math.max(...weeklyValidationsData.map(d => d.validations));
  const maxMonthly = Math.max(...monthlyProjectsData.map(d => Math.max(d.created, d.completed)));
  
  return (
    <div>
      {/* KPIs Row */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px', marginBottom: '24px' }}>
        <div style={{ padding: '20px', backgroundColor: 'white', borderRadius: '12px', border: `1px solid ${colors.border}` }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
            <span style={{ fontSize: '13px', color: colors.textSecondary }}>Total projets</span>
            <div style={{ width: '36px', height: '36px', borderRadius: '10px', backgroundColor: colors.primaryLight, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Icons.Folder style={{ color: colors.primary, width: 18, height: 18 }} />
            </div>
          </div>
          <div style={{ fontSize: '32px', fontWeight: 700, color: colors.textPrimary }}>{totalProjects}</div>
        </div>
        
        <div style={{ padding: '20px', backgroundColor: 'white', borderRadius: '12px', border: `1px solid ${colors.border}` }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
            <span style={{ fontSize: '13px', color: colors.textSecondary }}>En cours</span>
            <div style={{ width: '36px', height: '36px', borderRadius: '10px', backgroundColor: colors.successLight, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Icons.Activity style={{ color: colors.success, width: 18, height: 18 }} />
            </div>
          </div>
          <div style={{ fontSize: '32px', fontWeight: 700, color: colors.success }}>{inProgressProjects}</div>
        </div>
        
        <div style={{ padding: '20px', backgroundColor: colors.errorLight, borderRadius: '12px', border: `1px solid ${colors.error}30` }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
            <span style={{ fontSize: '13px', color: colors.error }}>En retard</span>
            <div style={{ width: '36px', height: '36px', borderRadius: '10px', backgroundColor: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Icons.AlertTriangle style={{ color: colors.error, width: 18, height: 18 }} />
            </div>
          </div>
          <div style={{ fontSize: '32px', fontWeight: 700, color: colors.error }}>{lateProjects}</div>
        </div>
        
        <div style={{ padding: '20px', backgroundColor: 'white', borderRadius: '12px', border: `1px solid ${colors.border}` }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
            <span style={{ fontSize: '13px', color: colors.textSecondary }}>À venir</span>
            <div style={{ width: '36px', height: '36px', borderRadius: '10px', backgroundColor: colors.accentLight, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Icons.Calendar style={{ color: colors.accent, width: 18, height: 18 }} />
            </div>
          </div>
          <div style={{ fontSize: '32px', fontWeight: 700, color: colors.accent }}>{upcomingCount}</div>
        </div>
      </div>
      
      {/* Graphiques Row */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '24px' }}>
        {/* Validations par semaine */}
        <div style={{ padding: '20px', backgroundColor: 'white', borderRadius: '12px', border: `1px solid ${colors.border}` }}>
          <h3 style={{ margin: '0 0 16px', fontSize: '14px', fontWeight: 600, color: colors.textPrimary }}>Validations par semaine</h3>
          <div style={{ display: 'flex', alignItems: 'flex-end', gap: '8px', height: '120px' }}>
            {weeklyValidationsData.map((d, i) => (
              <div key={i} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '6px' }}>
                <span style={{ fontSize: '11px', fontWeight: 500, color: colors.textPrimary }}>{d.validations}</span>
                <div style={{ width: '100%', height: `${(d.validations / maxValidations) * 80}px`, backgroundColor: colors.primary, borderRadius: '4px 4px 0 0', minHeight: '4px' }} />
                <span style={{ fontSize: '10px', color: colors.textSecondary }}>{d.week}</span>
              </div>
            ))}
          </div>
        </div>
        
        {/* Projets créés/terminés par mois */}
        <div style={{ padding: '20px', backgroundColor: 'white', borderRadius: '12px', border: `1px solid ${colors.border}` }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
            <h3 style={{ margin: 0, fontSize: '14px', fontWeight: 600, color: colors.textPrimary }}>Projets par mois</h3>
            <div style={{ display: 'flex', gap: '12px', fontSize: '11px' }}>
              <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><span style={{ width: '8px', height: '8px', borderRadius: '2px', backgroundColor: colors.primary }} /> Créés</span>
              <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><span style={{ width: '8px', height: '8px', borderRadius: '2px', backgroundColor: colors.success }} /> Terminés</span>
            </div>
          </div>
          <div style={{ display: 'flex', alignItems: 'flex-end', gap: '12px', height: '120px' }}>
            {monthlyProjectsData.map((d, i) => (
              <div key={i} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '6px' }}>
                <div style={{ display: 'flex', gap: '3px', alignItems: 'flex-end' }}>
                  <div style={{ width: '14px', height: `${(d.created / maxMonthly) * 70}px`, backgroundColor: colors.primary, borderRadius: '3px 3px 0 0', minHeight: '4px' }} />
                  <div style={{ width: '14px', height: `${(d.completed / maxMonthly) * 70}px`, backgroundColor: colors.success, borderRadius: '3px 3px 0 0', minHeight: '4px' }} />
                </div>
                <span style={{ fontSize: '10px', color: colors.textSecondary }}>{d.month}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      {/* Tabs Navigation */}
      <div style={{ display: 'flex', gap: '4px', marginBottom: '20px', backgroundColor: colors.background, padding: '4px', borderRadius: '10px', width: 'fit-content' }}>
        {[
          { id: 'projects', label: 'Projets en cours', count: inProgressProjects },
          { id: 'team', label: 'Charge équipe QA', count: qaTeamData.filter(q => q.projects > 0).length },
          { id: 'pipeline', label: 'Projets à venir', count: upcomingCount },
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            style={{
              padding: '10px 20px',
              borderRadius: '8px',
              border: 'none',
              backgroundColor: activeTab === tab.id ? 'white' : 'transparent',
              color: activeTab === tab.id ? colors.textPrimary : colors.textSecondary,
              fontSize: '13px',
              fontWeight: activeTab === tab.id ? 600 : 400,
              cursor: 'pointer',
              boxShadow: activeTab === tab.id ? '0 1px 3px rgba(0,0,0,0.1)' : 'none',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
            }}
          >
            {tab.label}
            <span style={{ padding: '2px 8px', borderRadius: '10px', backgroundColor: activeTab === tab.id ? colors.primaryLight : colors.background, color: activeTab === tab.id ? colors.primary : colors.textSecondary, fontSize: '11px', fontWeight: 600 }}>{tab.count}</span>
          </button>
        ))}
      </div>
      
      {/* Tab Content: Projets */}
      {activeTab === 'projects' && (
        <div style={{ backgroundColor: 'white', borderRadius: '12px', border: `1px solid ${colors.border}`, overflow: 'hidden' }}>
          {/* Filtres */}
          <div style={{ padding: '16px 20px', borderBottom: `1px solid ${colors.border}`, display: 'flex', gap: '12px', alignItems: 'center' }}>
            <span style={{ fontSize: '13px', color: colors.textSecondary }}>Filtrer :</span>
            <select value={deptFilter} onChange={e => setDeptFilter(e.target.value)} style={{ padding: '6px 12px', borderRadius: '6px', border: `1px solid ${colors.border}`, fontSize: '13px', color: colors.textPrimary, cursor: 'pointer' }}>
              <option value="all">Tous les départements</option>
              <option value="R&D">R&D</option>
              <option value="Industrie">Industrie</option>
              <option value="DDSI">DDSI</option>
            </select>
            <select value={statusFilter} onChange={e => setStatusFilter(e.target.value)} style={{ padding: '6px 12px', borderRadius: '6px', border: `1px solid ${colors.border}`, fontSize: '13px', color: colors.textPrimary, cursor: 'pointer' }}>
              <option value="all">Tous les statuts</option>
              <option value="ok">🟢 OK</option>
              <option value="risk">🟡 Risque</option>
              <option value="late">🔴 Retard</option>
            </select>
            <span style={{ marginLeft: 'auto', fontSize: '12px', color: colors.textSecondary }}>{filteredProjects.length} projet(s)</span>
          </div>
          
          {/* Table Header */}
          <div style={{ display: 'grid', gridTemplateColumns: '2fr 1.5fr 1fr 1fr 1fr 0.8fr 1fr', padding: '12px 20px', backgroundColor: colors.background, fontSize: '11px', fontWeight: 600, color: colors.textSecondary, textTransform: 'uppercase', letterSpacing: '0.5px' }}>
            <span>Projet</span>
            <span>Client</span>
            <span>Dépt.</span>
            <span>QA</span>
            <span>Phase</span>
            <span>Statut</span>
            <span>Échéance</span>
          </div>
          
          {/* Table Body */}
          <div style={{ maxHeight: '400px', overflow: 'auto' }}>
            {filteredProjects.map((project, i) => (
              <div 
                key={project.id} 
                onClick={() => onOpenProject(project.id)}
                style={{ 
                  display: 'grid', 
                  gridTemplateColumns: '2fr 1.5fr 1fr 1fr 1fr 0.8fr 1fr', 
                  padding: '14px 20px', 
                  borderBottom: i < filteredProjects.length - 1 ? `1px solid ${colors.border}` : 'none',
                  cursor: 'pointer',
                  transition: 'background-color 0.15s',
                  alignItems: 'center',
                }}
                onMouseEnter={e => e.currentTarget.style.backgroundColor = colors.background}
                onMouseLeave={e => e.currentTarget.style.backgroundColor = 'white'}
              >
                <div>
                  <div style={{ fontSize: '13px', fontWeight: 500, color: colors.textPrimary }}>{project.name}</div>
                  <div style={{ fontSize: '11px', color: colors.textSecondary }}>{project.progress}% complété</div>
                </div>
                <span style={{ fontSize: '13px', color: colors.textSecondary }}>{project.client}</span>
                <span style={{ 
                  padding: '4px 8px', 
                  borderRadius: '4px', 
                  fontSize: '11px', 
                  fontWeight: 500,
                  backgroundColor: project.department === 'R&D' ? '#DBEAFE' : project.department === 'Industrie' ? '#FEF3C7' : '#E9D5FF',
                  color: project.department === 'R&D' ? '#1D4ED8' : project.department === 'Industrie' ? '#D97706' : '#7C3AED',
                  width: 'fit-content'
                }}>{project.department}</span>
                <span style={{ fontSize: '13px', color: colors.textPrimary }}>{project.qa}</span>
                <span style={{ fontSize: '12px', color: colors.textSecondary }}>{project.phase}</span>
                <span style={{ fontSize: '16px' }}>
                  {project.planningStatus === 'ok' ? '🟢' : project.planningStatus === 'risk' ? '🟡' : '🔴'}
                </span>
                <span style={{ fontSize: '12px', color: project.planningStatus === 'late' ? colors.error : colors.textSecondary, fontWeight: project.planningStatus === 'late' ? 500 : 400 }}>{project.targetDate}</span>
              </div>
            ))}
          </div>
        </div>
      )}
      
      {/* Tab Content: Équipe QA */}
      {activeTab === 'team' && (
        <div style={{ backgroundColor: 'white', borderRadius: '12px', border: `1px solid ${colors.border}`, overflow: 'hidden' }}>
          <div style={{ padding: '16px 20px', borderBottom: `1px solid ${colors.border}`, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <span style={{ fontSize: '14px', fontWeight: 600, color: colors.textPrimary }}>Charge de travail équipe QA</span>
            <div style={{ display: 'flex', gap: '16px', fontSize: '11px' }}>
              <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: colors.success }} /> OK</span>
              <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: colors.warning }} /> Sous-charge</span>
              <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: colors.error }} /> Surcharge</span>
              <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: colors.primary }} /> Disponible</span>
            </div>
          </div>
          
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1px', backgroundColor: colors.border }}>
            {qaTeamData.map(qa => (
              <div key={qa.id} style={{ padding: '16px', backgroundColor: 'white' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
                  <div style={{ 
                    width: '40px', 
                    height: '40px', 
                    borderRadius: '50%', 
                    backgroundColor: qa.status === 'available' ? colors.primaryLight : qa.status === 'ok' ? colors.successLight : qa.status === 'underload' ? colors.warningLight : colors.errorLight,
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'center', 
                    fontSize: '13px', 
                    fontWeight: 600, 
                    color: qa.status === 'available' ? colors.primary : qa.status === 'ok' ? colors.success : qa.status === 'underload' ? colors.warning : colors.error
                  }}>{qa.initials}</div>
                  <div>
                    <div style={{ fontSize: '14px', fontWeight: 500, color: colors.textPrimary }}>{qa.name}</div>
                    <div style={{ fontSize: '12px', color: colors.textSecondary }}>{qa.projects} projet(s)</div>
                  </div>
                </div>
                <div style={{ marginBottom: '6px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', marginBottom: '4px' }}>
                    <span style={{ color: colors.textSecondary }}>Charge</span>
                    <span style={{ fontWeight: 500, color: qa.workload > qa.capacity ? colors.error : colors.textPrimary }}>{qa.workload}/{qa.capacity} j/h</span>
                  </div>
                  <div style={{ height: '6px', backgroundColor: colors.background, borderRadius: '3px', overflow: 'hidden' }}>
                    <div style={{ 
                      width: `${Math.min((qa.workload / qa.capacity) * 100, 100)}%`, 
                      height: '100%', 
                      backgroundColor: qa.workload > qa.capacity ? colors.error : qa.workload > qa.capacity * 0.8 ? colors.success : qa.workload > qa.capacity * 0.5 ? colors.warning : colors.primary,
                      borderRadius: '3px',
                    }} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
      
      {/* Tab Content: Pipeline */}
      {activeTab === 'pipeline' && (
        <div style={{ backgroundColor: 'white', borderRadius: '12px', border: `1px solid ${colors.border}`, overflow: 'hidden' }}>
          <div style={{ padding: '16px 20px', borderBottom: `1px solid ${colors.border}` }}>
            <span style={{ fontSize: '14px', fontWeight: 600, color: colors.textPrimary }}>Projets à venir</span>
          </div>
          
          {/* Table Header */}
          <div style={{ display: 'grid', gridTemplateColumns: '2fr 1.5fr 1fr 1fr 1fr 1.5fr', padding: '12px 20px', backgroundColor: colors.background, fontSize: '11px', fontWeight: 600, color: colors.textSecondary, textTransform: 'uppercase', letterSpacing: '0.5px' }}>
            <span>Projet</span>
            <span>Client</span>
            <span>Dépt.</span>
            <span>Démarrage</span>
            <span>Charge est.</span>
            <span>QA assigné</span>
          </div>
          
          {/* Table Body */}
          {upcomingProjectsData.map((project, i) => (
            <div 
              key={project.id} 
              style={{ 
                display: 'grid', 
                gridTemplateColumns: '2fr 1.5fr 1fr 1fr 1fr 1.5fr', 
                padding: '14px 20px', 
                borderBottom: i < upcomingProjectsData.length - 1 ? `1px solid ${colors.border}` : 'none',
                alignItems: 'center',
              }}
            >
              <div>
                <div style={{ fontSize: '13px', fontWeight: 500, color: colors.textPrimary }}>{project.name}</div>
                <div style={{ fontSize: '11px', color: colors.textSecondary }}>
                  {project.gxpType === 'direct' ? 'GxP Direct' : project.gxpType === 'indirect' ? 'GxP Indirect' : 'Données strat.'} • {project.size}
                </div>
              </div>
              <span style={{ fontSize: '13px', color: colors.textSecondary }}>{project.client}</span>
              <span style={{ 
                padding: '4px 8px', 
                borderRadius: '4px', 
                fontSize: '11px', 
                fontWeight: 500,
                backgroundColor: project.department === 'R&D' ? '#DBEAFE' : project.department === 'Industrie' ? '#FEF3C7' : '#E9D5FF',
                color: project.department === 'R&D' ? '#1D4ED8' : project.department === 'Industrie' ? '#D97706' : '#7C3AED',
                width: 'fit-content'
              }}>{project.department}</span>
              <span style={{ fontSize: '12px', color: colors.textPrimary }}>{project.estimatedStart}</span>
              <span style={{ fontSize: '12px', color: colors.textSecondary }}>{project.estimatedWorkload} j/h</span>
              <div>
                {project.qaAssigned ? (
                  <span style={{ padding: '4px 10px', borderRadius: '12px', backgroundColor: colors.successLight, color: colors.success, fontSize: '12px', fontWeight: 500 }}>{project.qaAssigned}</span>
                ) : (
                  <button style={{ padding: '4px 10px', borderRadius: '12px', backgroundColor: colors.primaryLight, color: colors.primary, fontSize: '12px', fontWeight: 500, border: 'none', cursor: 'pointer' }}>+ Assigner</button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
      
      {/* Lien vers Administration */}
      <div style={{ marginTop: '24px', textAlign: 'center' }}>
        <button onClick={onOpenBackoffice} style={{ padding: '12px 24px', backgroundColor: 'transparent', border: `1px solid ${colors.border}`, borderRadius: '8px', cursor: 'pointer', fontSize: '13px', color: colors.textSecondary, fontWeight: 500, display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
          <Icons.Settings /> Accéder à l'administration complète
        </button>
      </div>
    </div>
  );
};

// Page d'accueil complète
const HomePage = ({ userRole, onRoleChange, onOpenProject, onCreateProject, onOpenBackoffice, onOpenHelp, wireframe, onToggleWireframe }) => {
  
  // Noms selon le rôle
  const userName = userRole === 'metier' ? 'Jean' : userRole === 'qualite' ? 'Marie' : 'Admin';

  return (
    <div style={{ fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif", backgroundColor: colors.background, minHeight: '100vh' }}>
      <HomeHeader userRole={userRole} onRoleChange={onRoleChange} onOpenBackoffice={onOpenBackoffice} onOpenHelp={onOpenHelp} wireframe={wireframe} onToggleWireframe={onToggleWireframe} />
      
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '32px' }}>
        {/* Welcome section */}
        <div style={{ marginBottom: '32px' }}>
          <h1 style={{ fontSize: '28px', fontWeight: 700, color: colors.textPrimary, margin: 0 }}>Bonjour, {userName} ! 👋</h1>
        </div>
        
        {/* ============== VUE MÉTIER ============== */}
        {userRole === 'metier' && (
          <div>
            {/* Header section */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '24px' }}>
              <h2 style={{ fontSize: '18px', fontWeight: 600, color: colors.textPrimary, margin: 0 }}>Mon projet en cours</h2>
              <button style={{ padding: '8px 16px', backgroundColor: 'transparent', border: `1px solid ${colors.border}`, borderRadius: '8px', cursor: 'pointer', fontSize: '13px', color: colors.textSecondary, fontWeight: 500 }}>
                Voir tous les projets →
              </button>
            </div>
            
            {/* Card projet unique centrée */}
            <MetierProjectCard project={metierProjectData} onClick={() => onOpenProject(metierProjectData.id)} />
          </div>
        )}
        
        {/* ============== VUE QA ============== */}
        {userRole === 'qualite' && (
          <div>
            {/* Header section */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '24px' }}>
              <h2 style={{ fontSize: '18px', fontWeight: 600, color: colors.textPrimary, margin: 0 }}>
                Mes projets en cours <span style={{ fontWeight: 400, color: colors.textSecondary }}>({qaProjectsData.length})</span>
              </h2>
              <div style={{ display: 'flex', gap: '12px' }}>
                <button style={{ padding: '8px 16px', backgroundColor: 'transparent', border: `1px solid ${colors.border}`, borderRadius: '8px', cursor: 'pointer', fontSize: '13px', color: colors.textSecondary, fontWeight: 500 }}>
                  Voir tous les projets →
                </button>
                <button onClick={onCreateProject} style={{ padding: '8px 16px', backgroundColor: colors.primary, border: 'none', borderRadius: '8px', cursor: 'pointer', fontSize: '13px', color: 'white', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <Icons.Plus /> Nouveau projet
                </button>
              </div>
            </div>
            
            {/* Grille projets */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px' }}>
              {qaProjectsData.map(project => (
                <QAProjectCard key={project.id} project={project} onClick={() => onOpenProject(project.id)} />
              ))}
            </div>
          </div>
        )}
        
        {/* ============== VUE ADMIN (Dashboard) ============== */}
        {userRole === 'admin' && (
          <AdminDashboard onOpenBackoffice={onOpenBackoffice} onOpenProject={onOpenProject} />
        )}
      </div>
    </div>
  );
};

// =============================================================================
// DONNÉES PROJET LIMS (pour la page Informations)
// =============================================================================
const limsProjectData = {
  name: 'LIMS v3.2',
  client: 'Laboratoire Central',
  department: 'R&D Analytique',
  systemType: 'lims',
  version: '3.2.1',
  description: 'Système de gestion des informations de laboratoire pour le suivi des échantillons, analyses et résultats. Intégration avec les équipements analytiques (HPLC, spectromètres) et le système ERP.',
  gxpCategory: 'gmp',
  criticality: 'high',
  regulations: ['21cfr11', 'annexe11', 'ich-q7'],
  startDate: '2024-10-15',
  targetDate: '2025-02-15',
  milestones: [
    { id: 1, name: 'Kick-off projet', date: '2024-10-15', status: 'completed' },
    { id: 2, name: 'Fin qualification', date: '2025-01-31', status: 'in-progress' },
    { id: 3, name: 'Go-live production', date: '2025-02-15', status: 'pending' },
  ],
  supplier: 'LabWare Inc.',
  supplierContact: 'support@labware.com',
  supplierPhone: '+1 (302) 658-8444',
  documentation: ['user-manual', 'tech-specs', 'validation-pack'],
  workflow: 'reinforced',
  notifications: ['email'],
};

// Options pour les formulaires
// =============================================================================
// DONNÉES FORMULAIRE PROJET (Phase 4 - Refonte)
// =============================================================================

// Départements (structure pharma classique)
const departmentsData = [
  { value: 'dir-generale', label: 'Direction Générale', category: 'Corporate' },
  { value: 'dir-qualite', label: 'Direction Qualité', category: 'Qualité' },
  { value: 'dir-rd', label: 'Direction R&D', category: 'R&D' },
  { value: 'dir-industrielle', label: 'Direction Industrielle', category: 'Industrie' },
  { value: 'dir-it', label: 'Direction IT/DDSI', category: 'DDSI' },
  { value: 'prod-lyon', label: 'Production Lyon', category: 'Industrie' },
  { value: 'prod-paris', label: 'Production Paris', category: 'Industrie' },
  { value: 'labo-central', label: 'Laboratoire Central', category: 'R&D' },
  { value: 'labo-analytique', label: 'Laboratoire Analytique', category: 'R&D' },
  { value: 'metrologie', label: 'Métrologie', category: 'Qualité' },
  { value: 'supply-chain', label: 'Supply Chain', category: 'Industrie' },
  { value: 'achats', label: 'Achats', category: 'Corporate' },
  { value: 'rh', label: 'Ressources Humaines', category: 'Corporate' },
  { value: 'finance', label: 'Finance', category: 'Corporate' },
  { value: 'affaires-reg', label: 'Affaires Réglementaires', category: 'Qualité' },
  { value: 'commercial', label: 'Commercial', category: 'Corporate' },
  { value: 'maintenance', label: 'Maintenance', category: 'Industrie' },
];

// Pays
const countriesData = [
  { value: 'global', label: 'Global (Multi-sites)' },
  { value: 'france', label: 'France' },
  { value: 'germany', label: 'Allemagne' },
  { value: 'usa', label: 'États-Unis' },
  { value: 'uk', label: 'Royaume-Uni' },
  { value: 'spain', label: 'Espagne' },
  { value: 'italy', label: 'Italie' },
  { value: 'belgium', label: 'Belgique' },
  { value: 'switzerland', label: 'Suisse' },
  { value: 'netherlands', label: 'Pays-Bas' },
  { value: 'japan', label: 'Japon' },
  { value: 'china', label: 'Chine' },
  { value: 'brazil', label: 'Brésil' },
  { value: 'mexico', label: 'Mexique' },
  { value: 'india', label: 'Inde' },
  { value: 'canada', label: 'Canada' },
];

// Sites (liés aux pays)
const sitesData = [
  { value: 'global', label: 'Global', country: 'global' },
  { value: 'lyon', label: 'Lyon - Site de production', country: 'france' },
  { value: 'paris-hq', label: 'Paris - Siège social', country: 'france' },
  { value: 'marseille', label: 'Marseille - Centre R&D', country: 'france' },
  { value: 'frankfurt', label: 'Frankfurt - Hub logistique', country: 'germany' },
  { value: 'munich', label: 'Munich - Centre technique', country: 'germany' },
  { value: 'boston', label: 'Boston - R&D Americas', country: 'usa' },
  { value: 'new-jersey', label: 'New Jersey - Production', country: 'usa' },
  { value: 'london', label: 'Londres - Commercial UK', country: 'uk' },
  { value: 'madrid', label: 'Madrid - Iberia HQ', country: 'spain' },
  { value: 'milan', label: 'Milan - Production Italie', country: 'italy' },
  { value: 'brussels', label: 'Bruxelles - Affaires réglementaires EU', country: 'belgium' },
  { value: 'zurich', label: 'Zurich - Finance', country: 'switzerland' },
  { value: 'tokyo', label: 'Tokyo - Asia Pacific HQ', country: 'japan' },
  { value: 'shanghai', label: 'Shanghai - Production Chine', country: 'china' },
  { value: 'sao-paulo', label: 'São Paulo - LATAM HQ', country: 'brazil' },
];

// Périmètres
const perimetersData = [
  { value: 'ddsi', label: 'DDSI', description: 'Direction des Systèmes d\'Information' },
  { value: 'rd', label: 'R&D', description: 'Recherche & Développement' },
  { value: 'industrie', label: 'Industrie', description: 'Production & Operations' },
];

// Catégories GAMP 5
const gamp5Categories = [
  { value: '1', label: 'Catégorie 1 - Infrastructure', description: 'Systèmes d\'exploitation, bases de données, réseaux' },
  { value: '2', label: 'Catégorie 2 - Équipement', description: 'Firmware embarqué, automates de base' },
  { value: '3', label: 'Catégorie 3 - Non configurable', description: 'Logiciels COTS sans configuration' },
  { value: '4', label: 'Catégorie 4 - Configurable', description: 'Logiciels COTS configurables (ERP, LIMS...)' },
  { value: '5', label: 'Catégorie 5 - Personnalisé', description: 'Développements spécifiques, customisations' },
];

// Criticité GxP (remplace criticalityLevels)
const gxpCriticalityLevels = [
  { value: 'direct', label: 'GxP Direct', color: colors.error, description: 'Impact direct sur qualité produit ou sécurité patient' },
  { value: 'indirect', label: 'GxP Indirect', color: colors.warning, description: 'Support aux processus GxP, pas d\'impact direct' },
  { value: 'data', label: 'Données critiques', color: colors.primary, description: 'Données business stratégiques, hors GxP' },
];

// Réglementations (sans GAMP5)
const regulationOptions = [
  { value: '21cfr11', label: '21 CFR Part 11', description: 'FDA - Enregistrements électroniques' },
  { value: 'annexe11', label: 'Annexe 11', description: 'EU GMP - Systèmes informatisés' },
  { value: 'ich-q7', label: 'ICH Q7', description: 'BPF pour principes actifs' },
  { value: 'iso13485', label: 'ISO 13485', description: 'Dispositifs médicaux' },
  { value: 'ich-e6', label: 'ICH E6 (GCP)', description: 'Bonnes pratiques cliniques' },
  { value: 'data-integrity', label: 'Data Integrity', description: 'ALCOA+ / Intégrité des données' },
];

// Fournisseurs (base fictive avec statut audit)
const suppliersDatabase = [
  { id: 'sap', name: 'SAP SE', audited: true, pharmaExperience: 'forte', marketPosition: 'leader', auditHistory: 'satisfaisant', recentlyAcquired: false, intlCertification: true },
  { id: 'oracle', name: 'Oracle Corporation', audited: true, pharmaExperience: 'forte', marketPosition: 'leader', auditHistory: 'satisfaisant', recentlyAcquired: false, intlCertification: true },
  { id: 'siemens', name: 'Siemens Healthineers', audited: true, pharmaExperience: 'forte', marketPosition: 'leader', auditHistory: 'satisfaisant', recentlyAcquired: false, intlCertification: true },
  { id: 'microsoft', name: 'Microsoft Corporation', audited: true, pharmaExperience: 'forte', marketPosition: 'leader', auditHistory: 'satisfaisant', recentlyAcquired: false, intlCertification: true },
  { id: 'veeva', name: 'Veeva Systems', audited: true, pharmaExperience: 'forte', marketPosition: 'leader', auditHistory: 'satisfaisant', recentlyAcquired: false, intlCertification: true },
  { id: 'emerson', name: 'Emerson Electric', audited: true, pharmaExperience: 'forte', marketPosition: 'competiteur', auditHistory: 'satisfaisant', recentlyAcquired: false, intlCertification: true },
  { id: 'rockwell', name: 'Rockwell Automation', audited: true, pharmaExperience: 'forte', marketPosition: 'competiteur', auditHistory: 'audit-supplementaire', recentlyAcquired: false, intlCertification: true },
  { id: 'abb', name: 'ABB Ltd', audited: true, pharmaExperience: 'faible', marketPosition: 'competiteur', auditHistory: 'satisfaisant', recentlyAcquired: true, intlCertification: true },
  { id: 'waters', name: 'Waters Corporation', audited: true, pharmaExperience: 'forte', marketPosition: 'leader', auditHistory: 'satisfaisant', recentlyAcquired: false, intlCertification: true },
  { id: 'thermo-fisher', name: 'Thermo Fisher Scientific', audited: true, pharmaExperience: 'forte', marketPosition: 'leader', auditHistory: 'satisfaisant', recentlyAcquired: false, intlCertification: true },
  { id: 'labware', name: 'LabWare Inc', audited: false, pharmaExperience: '', marketPosition: '', auditHistory: 'aucun', recentlyAcquired: false, intlCertification: false },
  { id: 'custom-soft', name: 'Custom Software Ltd', audited: false, pharmaExperience: '', marketPosition: '', auditHistory: 'aucun', recentlyAcquired: false, intlCertification: false },
  { id: 'techpharma', name: 'TechPharma Solutions', audited: false, pharmaExperience: '', marketPosition: '', auditHistory: 'aucun', recentlyAcquired: false, intlCertification: false },
  { id: 'datamed', name: 'DataMed Systems', audited: true, pharmaExperience: 'faible', marketPosition: 'competiteur', auditHistory: 'insatisfaisant', recentlyAcquired: true, intlCertification: false },
  { id: 'pharmatech', name: 'PharmaTech Inc', audited: true, pharmaExperience: 'forte', marketPosition: 'competiteur', auditHistory: 'satisfaisant', recentlyAcquired: false, intlCertification: true },
];

// Projets SPRITE mockés
const spriteProjectsData = [
  { id: 'SPR-2024-0142', name: 'LIMS Upgrade v3.2', department: 'labo-central', country: 'france', site: 'lyon', perimeter: 'rd' },
  { id: 'SPR-2024-0156', name: 'ERP Manufacturing Module', department: 'prod-lyon', country: 'france', site: 'lyon', perimeter: 'industrie' },
  { id: 'SPR-2024-0178', name: 'QMS Cloud Migration', department: 'dir-qualite', country: 'global', site: 'global', perimeter: 'ddsi' },
  { id: 'SPR-2024-0189', name: 'MES Production v2', department: 'prod-paris', country: 'france', site: 'paris-hq', perimeter: 'industrie' },
  { id: 'SPR-2024-0201', name: 'Data Lake Analytics', department: 'dir-it', country: 'global', site: 'global', perimeter: 'ddsi' },
];

// Documents projet requis
const projectDocuments = [
  { id: 'architecture', label: 'Architecture technique', category: 'documentation' },
  { id: 'pmco', label: 'PMCO (Plan de Maintien en Conditions Opérationnelles)', category: 'documentation' },
  { id: 'user-manual', label: 'Manuel utilisateur', category: 'documentation' },
  { id: 'sop', label: 'SOP (Procédure opératoire)', category: 'documentation' },
];

// Étapes de validation
const validationSteps = [
  { id: 'svp', label: 'SVP (System Validation Plan)', category: 'validation' },
  { id: 'urs', label: 'URS (User Requirements)', category: 'validation' },
  { id: 'fs', label: 'FS (Functional Specifications)', category: 'validation' },
  { id: 'iq', label: 'Tests IQ (Installation)', category: 'tests' },
  { id: 'oq', label: 'Tests OQ (Opérationnel)', category: 'tests' },
  { id: 'pq', label: 'Tests PQ (Performance)', category: 'tests' },
  { id: 'vsr', label: 'VSR (Validation Summary Report)', category: 'validation' },
];

// Anciennes données conservées pour compatibilité
const criticalityLevels = gxpCriticalityLevels;

// =============================================================================
// COMPOSANTS FORMULAIRE PROJET
// =============================================================================

// Input avec label
const FormInput = ({ label, value, onChange, placeholder, type = 'text', required, disabled }) => (
  <div style={{ marginBottom: '16px' }}>
    <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: colors.textPrimary, marginBottom: '6px' }}>
      {label} {required && <span style={{ color: colors.error }}>*</span>}
    </label>
    <input
      type={type}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      disabled={disabled}
      style={{
        width: '100%',
        padding: '10px 14px',
        borderRadius: '8px',
        border: `1px solid ${colors.border}`,
        fontSize: '14px',
        color: colors.textPrimary,
        backgroundColor: disabled ? colors.background : 'white',
        outline: 'none',
        boxSizing: 'border-box',
      }}
    />
  </div>
);

// Textarea avec label
const FormTextarea = ({ label, value, onChange, placeholder, rows = 3, disabled }) => (
  <div style={{ marginBottom: '16px' }}>
    <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: colors.textPrimary, marginBottom: '6px' }}>{label}</label>
    <textarea
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      rows={rows}
      disabled={disabled}
      style={{
        width: '100%',
        padding: '10px 14px',
        borderRadius: '8px',
        border: `1px solid ${colors.border}`,
        fontSize: '14px',
        color: colors.textPrimary,
        backgroundColor: disabled ? colors.background : 'white',
        outline: 'none',
        resize: 'vertical',
        fontFamily: 'inherit',
        boxSizing: 'border-box',
      }}
    />
  </div>
);

// Select avec label
const FormSelect = ({ label, value, onChange, options, required, disabled }) => (
  <div style={{ marginBottom: '16px' }}>
    <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: colors.textPrimary, marginBottom: '6px' }}>
      {label} {required && <span style={{ color: colors.error }}>*</span>}
    </label>
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      disabled={disabled}
      style={{
        width: '100%',
        padding: '10px 14px',
        borderRadius: '8px',
        border: `1px solid ${colors.border}`,
        fontSize: '14px',
        color: colors.textPrimary,
        backgroundColor: disabled ? colors.background : 'white',
        cursor: disabled ? 'not-allowed' : 'pointer',
        outline: 'none',
      }}
    >
      <option value="">Sélectionner...</option>
      {options.map(opt => <option key={opt.value} value={opt.value}>{opt.label}</option>)}
    </select>
  </div>
);

// Groupe de checkboxes
const FormCheckboxGroup = ({ label, options, values, onChange, disabled }) => (
  <div style={{ marginBottom: '16px' }}>
    <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: colors.textPrimary, marginBottom: '10px' }}>{label}</label>
    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
      {options.map(opt => (
        <label key={opt.value} style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', cursor: disabled ? 'not-allowed' : 'pointer' }}>
          <input
            type="checkbox"
            checked={values.includes(opt.value)}
            onChange={(e) => {
              if (disabled) return;
              if (e.target.checked) onChange([...values, opt.value]);
              else onChange(values.filter(v => v !== opt.value));
            }}
            disabled={disabled}
            style={{ marginTop: '2px', width: '16px', height: '16px', accentColor: colors.primary }}
          />
          <div>
            <span style={{ fontSize: '14px', color: colors.textPrimary }}>{opt.label}</span>
            {opt.description && <span style={{ fontSize: '12px', color: colors.textSecondary, display: 'block' }}>{opt.description}</span>}
          </div>
        </label>
      ))}
    </div>
  </div>
);

// Groupe de radios
const FormRadioGroup = ({ label, options, value, onChange, disabled }) => (
  <div style={{ marginBottom: '16px' }}>
    <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: colors.textPrimary, marginBottom: '10px' }}>{label}</label>
    <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
      {options.map(opt => (
        <label key={opt.value} style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', padding: '12px 14px', borderRadius: '8px', border: `2px solid ${value === opt.value ? colors.primary : colors.border}`, backgroundColor: value === opt.value ? colors.primaryLight : 'white', cursor: disabled ? 'not-allowed' : 'pointer', transition: 'all 0.15s' }}>
          <input
            type="radio"
            name={label}
            checked={value === opt.value}
            onChange={() => !disabled && onChange(opt.value)}
            disabled={disabled}
            style={{ marginTop: '2px', width: '16px', height: '16px', accentColor: colors.primary }}
          />
          <div>
            <span style={{ fontSize: '14px', fontWeight: 500, color: colors.textPrimary }}>{opt.label}</span>
            {opt.description && <span style={{ fontSize: '12px', color: colors.textSecondary, display: 'block', marginTop: '2px' }}>{opt.description}</span>}
          </div>
        </label>
      ))}
    </div>
  </div>
);

// Sélecteur de criticité visuel
const CriticalitySelector = ({ value, onChange, disabled }) => (
  <div style={{ marginBottom: '16px' }}>
    <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: colors.textPrimary, marginBottom: '10px' }}>
      Criticité du système <span style={{ color: colors.error }}>*</span>
    </label>
    <div style={{ display: 'flex', gap: '12px' }}>
      {criticalityLevels.map(level => (
        <button
          key={level.value}
          onClick={() => !disabled && onChange(level.value)}
          disabled={disabled}
          style={{
            flex: 1,
            padding: '16px 12px',
            borderRadius: '10px',
            border: value === level.value ? `2px solid ${level.color}` : `2px solid ${colors.border}`,
            backgroundColor: value === level.value ? `${level.color}15` : 'white',
            cursor: disabled ? 'not-allowed' : 'pointer',
            textAlign: 'center',
            transition: 'all 0.15s',
          }}
        >
          <div style={{ fontSize: '18px', fontWeight: 700, color: level.color, marginBottom: '4px' }}>{level.label}</div>
          <div style={{ fontSize: '11px', color: colors.textSecondary, lineHeight: 1.3 }}>{level.description}</div>
        </button>
      ))}
    </div>
  </div>
);

// Section de formulaire
const FormSection = ({ title, icon, children }) => (
  <div style={{ backgroundColor: 'white', borderRadius: '12px', border: `1px solid ${colors.border}`, padding: '20px', marginBottom: '20px' }}>
    <h3 style={{ fontSize: '15px', fontWeight: 600, color: colors.textPrimary, margin: '0 0 16px 0', display: 'flex', alignItems: 'center', gap: '8px' }}>
      {icon} {title}
    </h3>
    {children}
  </div>
);

// Jalon (milestone)
const MilestoneItem = ({ milestone, onUpdate, onDelete, disabled }) => (
  <div style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '10px 12px', backgroundColor: colors.background, borderRadius: '8px', marginBottom: '8px' }}>
    <div style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: milestone.status === 'completed' ? colors.success : milestone.status === 'in-progress' ? colors.primary : colors.border }} />
    <input
      type="text"
      value={milestone.name}
      onChange={(e) => onUpdate({ ...milestone, name: e.target.value })}
      disabled={disabled}
      style={{ flex: 1, padding: '6px 10px', borderRadius: '6px', border: `1px solid ${colors.border}`, fontSize: '13px', backgroundColor: disabled ? 'transparent' : 'white' }}
    />
    <input
      type="date"
      value={milestone.date}
      onChange={(e) => onUpdate({ ...milestone, date: e.target.value })}
      disabled={disabled}
      style={{ padding: '6px 10px', borderRadius: '6px', border: `1px solid ${colors.border}`, fontSize: '13px', backgroundColor: disabled ? 'transparent' : 'white' }}
    />
    {!disabled && (
      <button onClick={onDelete} style={{ padding: '6px', borderRadius: '6px', border: 'none', backgroundColor: 'transparent', cursor: 'pointer', color: colors.textSecondary }}>
        <Icons.Trash />
      </button>
    )}
  </div>
);

// =============================================================================
// PAGE CRÉATION DE PROJET (Phase 4 - Refonte complète)
// =============================================================================

// Composant Autocomplete pour départements/fournisseurs
const AutocompleteInput = ({ label, value, onChange, options, placeholder, required, disabled, onSelect }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState(value || '');
  
  const filtered = options.filter(opt => 
    opt.label.toLowerCase().includes(searchTerm.toLowerCase())
  ).slice(0, 8);
  
  return (
    <div style={{ marginBottom: '16px', position: 'relative' }}>
      <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: colors.textPrimary, marginBottom: '6px' }}>
        {label} {required && <span style={{ color: colors.error }}>*</span>}
      </label>
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => { setSearchTerm(e.target.value); setIsOpen(true); onChange(e.target.value); }}
        onFocus={() => setIsOpen(true)}
        onBlur={() => setTimeout(() => setIsOpen(false), 200)}
        placeholder={placeholder}
        disabled={disabled}
        style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', border: `1px solid ${colors.border}`, fontSize: '14px', color: colors.textPrimary, backgroundColor: disabled ? colors.background : 'white', outline: 'none', boxSizing: 'border-box' }}
      />
      {isOpen && filtered.length > 0 && (
        <div style={{ position: 'absolute', top: '100%', left: 0, right: 0, backgroundColor: 'white', border: `1px solid ${colors.border}`, borderRadius: '8px', boxShadow: '0 4px 12px rgba(0,0,0,0.1)', zIndex: 100, maxHeight: '200px', overflow: 'auto', marginTop: '4px' }}>
          {filtered.map(opt => (
            <div
              key={opt.value}
              onClick={() => { setSearchTerm(opt.label); onSelect(opt); setIsOpen(false); }}
              style={{ padding: '10px 14px', cursor: 'pointer', fontSize: '14px', color: colors.textPrimary, borderBottom: `1px solid ${colors.border}` }}
              onMouseEnter={e => e.currentTarget.style.backgroundColor = colors.background}
              onMouseLeave={e => e.currentTarget.style.backgroundColor = 'white'}
            >
              {opt.label}
              {opt.category && <span style={{ fontSize: '11px', color: colors.textSecondary, marginLeft: '8px' }}>({opt.category})</span>}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

// Composant Card Fournisseur
const SupplierCard = ({ supplier, onUpdate, onRemove, disabled }) => {
  const [isExpanded, setIsExpanded] = useState(true);
  
  const pharmaOptions = [
    { value: 'faible', label: 'Faible' },
    { value: 'forte', label: 'Forte' },
  ];
  
  const positionOptions = [
    { value: 'leader', label: 'Leader' },
    { value: 'competiteur', label: 'Compétiteur' },
  ];
  
  const auditOptions = [
    { value: 'aucun', label: 'Aucun' },
    { value: 'insatisfaisant', label: 'Insatisfaisant' },
    { value: 'audit-supplementaire', label: 'Nécessite un audit supplémentaire' },
    { value: 'satisfaisant', label: 'Satisfaisant' },
  ];
  
  return (
    <div style={{ backgroundColor: 'white', borderRadius: '10px', border: `1px solid ${colors.border}`, marginBottom: '12px', overflow: 'hidden' }}>
      {/* Header */}
      <div 
        onClick={() => setIsExpanded(!isExpanded)}
        style={{ padding: '14px 16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', cursor: 'pointer', backgroundColor: colors.background }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <Icons.Building style={{ color: colors.textSecondary }} />
          <span style={{ fontSize: '14px', fontWeight: 500, color: colors.textPrimary }}>{supplier.name || 'Nouveau fournisseur'}</span>
          {supplier.audited && (
            <span style={{ padding: '2px 8px', borderRadius: '4px', backgroundColor: colors.successLight, color: colors.success, fontSize: '11px', fontWeight: 500 }}>✓ Audité</span>
          )}
          {!supplier.audited && supplier.name && (
            <span style={{ padding: '2px 8px', borderRadius: '4px', backgroundColor: colors.warningLight, color: colors.warning, fontSize: '11px', fontWeight: 500 }}>Non audité</span>
          )}
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          {!disabled && (
            <button onClick={(e) => { e.stopPropagation(); onRemove(); }} style={{ padding: '4px 8px', borderRadius: '4px', border: 'none', backgroundColor: colors.errorLight, color: colors.error, fontSize: '12px', cursor: 'pointer' }}>
              Supprimer
            </button>
          )}
          <Icons.ChevronDown style={{ color: colors.textSecondary, transform: isExpanded ? 'rotate(180deg)' : 'rotate(0)', transition: 'transform 0.2s' }} />
        </div>
      </div>
      
      {/* Content */}
      {isExpanded && (
        <div style={{ padding: '16px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
            <div>
              <label style={{ display: 'block', fontSize: '12px', fontWeight: 500, color: colors.textSecondary, marginBottom: '6px' }}>Expérience pharma</label>
              <div style={{ display: 'flex', gap: '8px' }}>
                {pharmaOptions.map(opt => (
                  <button
                    key={opt.value}
                    onClick={() => !disabled && onUpdate({ ...supplier, pharmaExperience: opt.value })}
                    disabled={disabled}
                    style={{ flex: 1, padding: '8px', borderRadius: '6px', border: supplier.pharmaExperience === opt.value ? `2px solid ${colors.primary}` : `1px solid ${colors.border}`, backgroundColor: supplier.pharmaExperience === opt.value ? colors.primaryLight : 'white', color: supplier.pharmaExperience === opt.value ? colors.primary : colors.textPrimary, fontSize: '13px', cursor: disabled ? 'not-allowed' : 'pointer' }}
                  >{opt.label}</button>
                ))}
              </div>
            </div>
            <div>
              <label style={{ display: 'block', fontSize: '12px', fontWeight: 500, color: colors.textSecondary, marginBottom: '6px' }}>Position marché</label>
              <div style={{ display: 'flex', gap: '8px' }}>
                {positionOptions.map(opt => (
                  <button
                    key={opt.value}
                    onClick={() => !disabled && onUpdate({ ...supplier, marketPosition: opt.value })}
                    disabled={disabled}
                    style={{ flex: 1, padding: '8px', borderRadius: '6px', border: supplier.marketPosition === opt.value ? `2px solid ${colors.primary}` : `1px solid ${colors.border}`, backgroundColor: supplier.marketPosition === opt.value ? colors.primaryLight : 'white', color: supplier.marketPosition === opt.value ? colors.primary : colors.textPrimary, fontSize: '13px', cursor: disabled ? 'not-allowed' : 'pointer' }}
                  >{opt.label}</button>
                ))}
              </div>
            </div>
            <div style={{ gridColumn: '1 / -1' }}>
              <label style={{ display: 'block', fontSize: '12px', fontWeight: 500, color: colors.textSecondary, marginBottom: '6px' }}>Historique d'audits</label>
              <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                {auditOptions.map(opt => (
                  <button
                    key={opt.value}
                    onClick={() => !disabled && onUpdate({ ...supplier, auditHistory: opt.value })}
                    disabled={disabled}
                    style={{ padding: '8px 12px', borderRadius: '6px', border: supplier.auditHistory === opt.value ? `2px solid ${colors.primary}` : `1px solid ${colors.border}`, backgroundColor: supplier.auditHistory === opt.value ? colors.primaryLight : 'white', color: supplier.auditHistory === opt.value ? colors.primary : colors.textPrimary, fontSize: '12px', cursor: disabled ? 'not-allowed' : 'pointer' }}
                  >{opt.label}</button>
                ))}
              </div>
            </div>
            <div>
              <label style={{ display: 'block', fontSize: '12px', fontWeight: 500, color: colors.textSecondary, marginBottom: '6px' }}>Récemment racheté</label>
              <div style={{ display: 'flex', gap: '8px' }}>
                {[{ value: false, label: 'Non' }, { value: true, label: 'Oui' }].map(opt => (
                  <button
                    key={String(opt.value)}
                    onClick={() => !disabled && onUpdate({ ...supplier, recentlyAcquired: opt.value })}
                    disabled={disabled}
                    style={{ flex: 1, padding: '8px', borderRadius: '6px', border: supplier.recentlyAcquired === opt.value ? `2px solid ${colors.primary}` : `1px solid ${colors.border}`, backgroundColor: supplier.recentlyAcquired === opt.value ? colors.primaryLight : 'white', color: supplier.recentlyAcquired === opt.value ? colors.primary : colors.textPrimary, fontSize: '13px', cursor: disabled ? 'not-allowed' : 'pointer' }}
                  >{opt.label}</button>
                ))}
              </div>
            </div>
            <div>
              <label style={{ display: 'block', fontSize: '12px', fontWeight: 500, color: colors.textSecondary, marginBottom: '6px' }}>Certification internationale</label>
              <div style={{ display: 'flex', gap: '8px' }}>
                {[{ value: false, label: 'Non' }, { value: true, label: 'Oui' }].map(opt => (
                  <button
                    key={String(opt.value)}
                    onClick={() => !disabled && onUpdate({ ...supplier, intlCertification: opt.value })}
                    disabled={disabled}
                    style={{ flex: 1, padding: '8px', borderRadius: '6px', border: supplier.intlCertification === opt.value ? `2px solid ${colors.primary}` : `1px solid ${colors.border}`, backgroundColor: supplier.intlCertification === opt.value ? colors.primaryLight : 'white', color: supplier.intlCertification === opt.value ? colors.primary : colors.textPrimary, fontSize: '13px', cursor: disabled ? 'not-allowed' : 'pointer' }}
                  >{opt.label}</button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// Composant ligne Document/Étape requis
const RequiredItemRow = ({ item, required, justification, onToggle, onJustificationChange, disabled }) => {
  const [showJustification, setShowJustification] = useState(false);
  
  const handleToggle = () => {
    if (disabled) return;
    if (required) {
      // Désactiver = demander justification
      setShowJustification(true);
    } else {
      // Activer = pas de justification nécessaire
      onToggle(true, '');
      setShowJustification(false);
    }
  };
  
  const confirmToggle = () => {
    if (justification.trim()) {
      onToggle(false, justification);
      setShowJustification(false);
    }
  };
  
  return (
    <div style={{ padding: '12px 0', borderBottom: `1px solid ${colors.border}` }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <span style={{ fontSize: '14px', color: colors.textPrimary }}>{item.label}</span>
        <button
          onClick={handleToggle}
          disabled={disabled}
          style={{
            padding: '6px 16px',
            borderRadius: '20px',
            border: 'none',
            backgroundColor: required ? colors.successLight : colors.background,
            color: required ? colors.success : colors.textSecondary,
            fontSize: '12px',
            fontWeight: 500,
            cursor: disabled ? 'not-allowed' : 'pointer',
          }}
        >
          {required ? '✓ Requis' : '○ Non requis'}
        </button>
      </div>
      {showJustification && (
        <div style={{ marginTop: '12px', padding: '12px', backgroundColor: colors.warningLight, borderRadius: '8px' }}>
          <label style={{ display: 'block', fontSize: '12px', fontWeight: 500, color: colors.warning, marginBottom: '6px' }}>
            Justification requise pour désactiver cet élément :
          </label>
          <textarea
            value={justification}
            onChange={(e) => onJustificationChange(e.target.value)}
            placeholder="Expliquez pourquoi cet élément n'est pas nécessaire..."
            style={{ width: '100%', padding: '8px', borderRadius: '6px', border: `1px solid ${colors.warning}`, fontSize: '13px', resize: 'none', boxSizing: 'border-box' }}
            rows={2}
          />
          <div style={{ display: 'flex', gap: '8px', marginTop: '8px' }}>
            <button onClick={() => setShowJustification(false)} style={{ padding: '6px 12px', borderRadius: '6px', border: `1px solid ${colors.border}`, backgroundColor: 'white', color: colors.textSecondary, fontSize: '12px', cursor: 'pointer' }}>Annuler</button>
            <button onClick={confirmToggle} disabled={!justification.trim()} style={{ padding: '6px 12px', borderRadius: '6px', border: 'none', backgroundColor: justification.trim() ? colors.warning : colors.border, color: 'white', fontSize: '12px', cursor: justification.trim() ? 'pointer' : 'not-allowed' }}>Confirmer</button>
          </div>
        </div>
      )}
      {!required && justification && !showJustification && (
        <div style={{ marginTop: '8px', padding: '8px 12px', backgroundColor: colors.background, borderRadius: '6px', fontSize: '12px', color: colors.textSecondary }}>
          <strong>Justification :</strong> {justification}
        </div>
      )}
    </div>
  );
};

// Modale SPRITE
const SpriteModal = ({ isOpen, onClose, onSelect }) => {
  const [searchTerm, setSearchTerm] = useState('');
  
  if (!isOpen) return null;
  
  const filtered = spriteProjectsData.filter(p => 
    p.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.name.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  return (
    <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000 }}>
      <div style={{ backgroundColor: 'white', borderRadius: '16px', width: '500px', maxHeight: '80vh', overflow: 'hidden', boxShadow: '0 20px 60px rgba(0,0,0,0.3)' }}>
        <div style={{ padding: '20px', borderBottom: `1px solid ${colors.border}` }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
            <h3 style={{ margin: 0, fontSize: '18px', fontWeight: 600, color: colors.textPrimary }}>Récupérer depuis SPRITE</h3>
            <button onClick={onClose} style={{ padding: '8px', borderRadius: '8px', border: 'none', backgroundColor: colors.background, cursor: 'pointer' }}>
              <Icons.X />
            </button>
          </div>
          <div style={{ position: 'relative' }}>
            <span style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: colors.textSecondary, display: 'flex', alignItems: 'center' }}><Icons.Search /></span>
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Rechercher par ID ou nom de projet..."
              autoFocus
              style={{ width: '100%', padding: '12px 12px 12px 44px', borderRadius: '10px', border: `1px solid ${colors.border}`, fontSize: '14px', outline: 'none', boxSizing: 'border-box' }}
            />
          </div>
        </div>
        <div style={{ maxHeight: '400px', overflow: 'auto' }}>
          {filtered.length === 0 ? (
            <div style={{ padding: '40px', textAlign: 'center', color: colors.textSecondary }}>Aucun projet trouvé</div>
          ) : (
            filtered.map(project => (
              <div
                key={project.id}
                onClick={() => { onSelect(project); onClose(); }}
                style={{ padding: '16px 20px', borderBottom: `1px solid ${colors.border}`, cursor: 'pointer', transition: 'background-color 0.15s' }}
                onMouseEnter={e => e.currentTarget.style.backgroundColor = colors.background}
                onMouseLeave={e => e.currentTarget.style.backgroundColor = 'white'}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '4px' }}>
                  <span style={{ padding: '2px 8px', borderRadius: '4px', backgroundColor: colors.primaryLight, color: colors.primary, fontSize: '11px', fontWeight: 600 }}>{project.id}</span>
                  <span style={{ fontSize: '14px', fontWeight: 500, color: colors.textPrimary }}>{project.name}</span>
                </div>
                <div style={{ fontSize: '12px', color: colors.textSecondary }}>
                  {departmentsData.find(d => d.value === project.department)?.label} • {sitesData.find(s => s.value === project.site)?.label}
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

// Fonction de calcul des étapes requises
const calculateRequiredSteps = (formData) => {
  const { perimeter, gamp5Category, criticality } = formData;
  const requirements = {};
  
  // Par défaut, tout est requis pour GxP Direct
  const isGxPDirect = criticality === 'direct';
  const isHighGamp = ['4', '5'].includes(gamp5Category);
  const isIndustrie = perimeter === 'industrie';
  
  // Documents
  requirements.architecture = isHighGamp;
  requirements.pmco = true;
  requirements['user-manual'] = true;
  requirements.sop = isGxPDirect || isIndustrie;
  
  // Validation
  requirements.svp = true;
  requirements.urs = true;
  requirements.fs = isHighGamp || isGxPDirect;
  requirements.iq = isIndustrie || isHighGamp;
  requirements.oq = isGxPDirect || isHighGamp;
  requirements.pq = isGxPDirect && isIndustrie;
  requirements.vsr = true;
  
  return requirements;
};

const CreateProjectPage = ({ userRole, onRoleChange, onCancel, onCreate, wireframe, onToggleWireframe }) => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    department: '',
    departmentLabel: '',
    country: '',
    site: '',
    perimeter: '',
    dataMigration: false,
    gamp5Category: '',
    criticality: '',
    regulations: [],
    startDate: '',
    targetDate: '',
    milestones: [
      { id: 1, name: 'Kick-off projet', date: '', status: 'pending' },
      { id: 2, name: 'Fin qualification', date: '', status: 'pending' },
      { id: 3, name: 'Go-live production', date: '', status: 'pending' },
    ],
    suppliers: [],
    requiredItems: {},
    justifications: {},
  });

  const [showSpriteModal, setShowSpriteModal] = useState(false);
  const [supplierSearch, setSupplierSearch] = useState('');
  const [showSupplierDropdown, setShowSupplierDropdown] = useState(false);
  const [createStep, setCreateStep] = useState(1); // 1 = config, 2 = documents & steps

  const updateField = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const updateMilestone = (index, milestone) => {
    const newMilestones = [...formData.milestones];
    newMilestones[index] = milestone;
    setFormData(prev => ({ ...prev, milestones: newMilestones }));
  };

  const addMilestone = () => {
    setFormData(prev => ({
      ...prev,
      milestones: [...prev.milestones, { id: Date.now(), name: '', date: '', status: 'pending' }]
    }));
  };

  const deleteMilestone = (index) => {
    setFormData(prev => ({
      ...prev,
      milestones: prev.milestones.filter((_, i) => i !== index)
    }));
  };

  // Fournisseurs
  const addSupplier = (supplierData) => {
    const newSupplier = supplierData || {
      id: Date.now(),
      name: '',
      audited: false,
      pharmaExperience: '',
      marketPosition: '',
      auditHistory: 'aucun',
      recentlyAcquired: false,
      intlCertification: false,
    };
    setFormData(prev => ({ ...prev, suppliers: [...prev.suppliers, newSupplier] }));
    setSupplierSearch('');
  };

  const updateSupplier = (index, supplier) => {
    const newSuppliers = [...formData.suppliers];
    newSuppliers[index] = supplier;
    setFormData(prev => ({ ...prev, suppliers: newSuppliers }));
  };

  const removeSupplier = (index) => {
    setFormData(prev => ({ ...prev, suppliers: prev.suppliers.filter((_, i) => i !== index) }));
  };

  // SPRITE import
  const handleSpriteSelect = (project) => {
    const dept = departmentsData.find(d => d.value === project.department);
    setFormData(prev => ({
      ...prev,
      name: project.name,
      department: project.department,
      departmentLabel: dept?.label || '',
      country: project.country,
      site: project.site,
      perimeter: project.perimeter,
    }));
  };

  // Required items toggle
  const toggleRequiredItem = (itemId, required, justification) => {
    setFormData(prev => ({
      ...prev,
      requiredItems: { ...prev.requiredItems, [itemId]: required },
      justifications: { ...prev.justifications, [itemId]: justification },
    }));
  };

  // Calcul automatique des étapes requises quand les champs changent
  const calculatedRequirements = calculateRequiredSteps(formData);
  
  // Merge avec les overrides manuels
  const getRequiredStatus = (itemId) => {
    if (formData.requiredItems.hasOwnProperty(itemId)) {
      return formData.requiredItems[itemId];
    }
    return calculatedRequirements[itemId] ?? true;
  };

  // Sites filtrés par pays
  const filteredSites = formData.country === 'global' 
    ? sitesData 
    : sitesData.filter(s => s.country === formData.country || s.value === 'global');

  // Validation
  const isFormValid = formData.name && formData.perimeter && formData.gamp5Category && formData.criticality;
  
  // Recherche fournisseurs
  const filteredSuppliers = suppliersDatabase.filter(s => 
    s.name.toLowerCase().includes(supplierSearch.toLowerCase()) &&
    !formData.suppliers.find(fs => fs.id === s.id)
  );

  return (
    <div style={{ fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif", backgroundColor: colors.background, minHeight: '100vh' }}>
      <HomeHeader userRole={userRole} onRoleChange={onRoleChange} wireframe={wireframe} onToggleWireframe={onToggleWireframe} />
      
      <div style={{ maxWidth: '800px', margin: '0 auto', padding: '32px' }}>
        {/* Header */}
        <div style={{ marginBottom: '24px' }}>
          <button onClick={onCancel} style={{ display: 'flex', alignItems: 'center', gap: '6px', padding: '8px 0', backgroundColor: 'transparent', border: 'none', cursor: 'pointer', fontSize: '13px', color: colors.textSecondary, marginBottom: '8px' }}>
            <Icons.ArrowLeft /> Retour à l'accueil
          </button>
          <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
            <div>
              <h1 style={{ fontSize: '28px', fontWeight: 700, color: colors.textPrimary, margin: '0 0 8px 0' }}>Créer un nouveau projet</h1>
              <p style={{ fontSize: '15px', color: colors.textSecondary, margin: 0 }}>Configurez les informations de base pour démarrer la validation.</p>
            </div>
            {createStep === 1 && <button
              onClick={() => setShowSpriteModal(true)}
              style={{ padding: '10px 20px', backgroundColor: colors.accentLight, border: `1px solid ${colors.accent}`, borderRadius: '8px', cursor: 'pointer', fontSize: '13px', color: colors.accent, fontWeight: 600, display: 'flex', alignItems: 'center', gap: '8px' }}
            >
              <Icons.Download /> Récupérer depuis SPRITE
            </button>}
          </div>
        </div>

        {/* Stepper */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '24px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <div style={{ width: '28px', height: '28px', borderRadius: '50%', backgroundColor: colors.primary, color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '13px', fontWeight: 600 }}>1</div>
            <span style={{ fontSize: '13px', fontWeight: createStep === 1 ? 600 : 400, color: createStep === 1 ? colors.textPrimary : colors.textSecondary }}>Configuration</span>
          </div>
          <div style={{ width: '40px', height: '2px', backgroundColor: createStep >= 2 ? colors.primary : colors.border }} />
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <div style={{ width: '28px', height: '28px', borderRadius: '50%', backgroundColor: createStep >= 2 ? colors.primary : colors.border, color: createStep >= 2 ? 'white' : colors.textSecondary, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '13px', fontWeight: 600 }}>2</div>
            <span style={{ fontSize: '13px', fontWeight: createStep === 2 ? 600 : 400, color: createStep === 2 ? colors.textPrimary : colors.textSecondary }}>Documents & Étapes</span>
          </div>
        </div>

        {/* Étape 1 : Configuration */}
        {createStep === 1 && <>
        {/* 1. Informations générales */}
        <FormSection title="Informations générales" icon="📋">
          <FormInput label="Nom du projet" value={formData.name} onChange={(v) => updateField('name', v)} placeholder="Ex: LIMS v3.2" required />
          <FormTextarea label="Description" value={formData.description} onChange={(v) => updateField('description', v)} placeholder="Décrivez brièvement le système et son utilisation..." rows={3} />
          
          <AutocompleteInput 
            label="Département" 
            value={formData.departmentLabel}
            onChange={(v) => updateField('departmentLabel', v)}
            onSelect={(opt) => { updateField('department', opt.value); updateField('departmentLabel', opt.label); }}
            options={departmentsData}
            placeholder="Rechercher un département..."
          />
          
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
            <FormSelect label="Pays" value={formData.country} onChange={(v) => { updateField('country', v); updateField('site', ''); }} options={countriesData} />
            <FormSelect label="Site" value={formData.site} onChange={(v) => updateField('site', v)} options={filteredSites} />
          </div>
          
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
            <FormSelect label="Périmètre" value={formData.perimeter} onChange={(v) => updateField('perimeter', v)} options={perimetersData} required />
            <div style={{ marginBottom: '16px' }}>
              <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: colors.textPrimary, marginBottom: '10px' }}>Migration de données nécessaire</label>
              <div style={{ display: 'flex', gap: '12px' }}>
                {[{ value: false, label: 'Non' }, { value: true, label: 'Oui' }].map(opt => (
                  <button
                    key={String(opt.value)}
                    onClick={() => updateField('dataMigration', opt.value)}
                    style={{ flex: 1, padding: '10px', borderRadius: '8px', border: formData.dataMigration === opt.value ? `2px solid ${colors.primary}` : `1px solid ${colors.border}`, backgroundColor: formData.dataMigration === opt.value ? colors.primaryLight : 'white', color: formData.dataMigration === opt.value ? colors.primary : colors.textPrimary, fontSize: '14px', fontWeight: 500, cursor: 'pointer' }}
                  >{opt.label}</button>
                ))}
              </div>
            </div>
          </div>
        </FormSection>

        {/* 2. Classification GxP */}
        <FormSection title="Classification GxP" icon="🔬">
          <FormSelect label="Catégorie GAMP 5" value={formData.gamp5Category} onChange={(v) => updateField('gamp5Category', v)} options={gamp5Categories} required />
          
          <div style={{ marginBottom: '16px' }}>
            <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: colors.textPrimary, marginBottom: '10px' }}>
              Criticité du système <span style={{ color: colors.error }}>*</span>
            </label>
            <div style={{ display: 'flex', gap: '12px' }}>
              {gxpCriticalityLevels.map(level => (
                <button
                  key={level.value}
                  onClick={() => updateField('criticality', level.value)}
                  style={{
                    flex: 1,
                    padding: '16px 12px',
                    borderRadius: '10px',
                    border: formData.criticality === level.value ? `2px solid ${level.color}` : `2px solid ${colors.border}`,
                    backgroundColor: formData.criticality === level.value ? `${level.color}15` : 'white',
                    cursor: 'pointer',
                    textAlign: 'center',
                  }}
                >
                  <div style={{ fontSize: '14px', fontWeight: 600, color: level.color, marginBottom: '4px' }}>{level.label}</div>
                  <div style={{ fontSize: '11px', color: colors.textSecondary, lineHeight: 1.3 }}>{level.description}</div>
                </button>
              ))}
            </div>
          </div>
          
          <FormCheckboxGroup label="Réglementations applicables" options={regulationOptions} values={formData.regulations} onChange={(v) => updateField('regulations', v)} />
        </FormSection>

        {/* 3. Planning */}
        <FormSection title="Planning" icon="📅">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
            <FormInput label="Date de début" type="date" value={formData.startDate} onChange={(v) => updateField('startDate', v)} />
            <FormInput label="Date cible (Go-live)" type="date" value={formData.targetDate} onChange={(v) => updateField('targetDate', v)} />
          </div>
          <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: colors.textPrimary, marginBottom: '10px' }}>Jalons clés</label>
          {formData.milestones.map((m, i) => (
            <MilestoneItem key={m.id} milestone={m} onUpdate={(milestone) => updateMilestone(i, milestone)} onDelete={() => deleteMilestone(i)} />
          ))}
          <button onClick={addMilestone} style={{ display: 'flex', alignItems: 'center', gap: '6px', padding: '8px 12px', backgroundColor: 'transparent', border: `1px dashed ${colors.border}`, borderRadius: '8px', cursor: 'pointer', fontSize: '13px', color: colors.textSecondary, width: '100%', justifyContent: 'center' }}>
            <Icons.Plus /> Ajouter un jalon
          </button>
        </FormSection>

        {/* 4. Fournisseurs */}
        <FormSection title="Fournisseurs" icon="🏢">
          {/* Recherche fournisseur */}
          <div style={{ marginBottom: '16px', position: 'relative' }}>
            <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: colors.textPrimary, marginBottom: '6px' }}>Ajouter un fournisseur</label>
            <div style={{ display: 'flex', gap: '8px' }}>
              <div style={{ flex: 1, position: 'relative' }}>
                <input
                  type="text"
                  value={supplierSearch}
                  onChange={(e) => { setSupplierSearch(e.target.value); setShowSupplierDropdown(true); }}
                  onFocus={() => setShowSupplierDropdown(true)}
                  onBlur={() => setTimeout(() => setShowSupplierDropdown(false), 200)}
                  placeholder="Rechercher un fournisseur..."
                  style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', border: `1px solid ${colors.border}`, fontSize: '14px', outline: 'none', boxSizing: 'border-box' }}
                />
                {showSupplierDropdown && supplierSearch && (
                  <div style={{ position: 'absolute', top: '100%', left: 0, right: 0, backgroundColor: 'white', border: `1px solid ${colors.border}`, borderRadius: '8px', boxShadow: '0 4px 12px rgba(0,0,0,0.1)', zIndex: 100, maxHeight: '200px', overflow: 'auto', marginTop: '4px' }}>
                    {filteredSuppliers.map(s => (
                      <div
                        key={s.id}
                        onClick={() => addSupplier({ ...s })}
                        style={{ padding: '10px 14px', cursor: 'pointer', fontSize: '14px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}
                        onMouseEnter={e => e.currentTarget.style.backgroundColor = colors.background}
                        onMouseLeave={e => e.currentTarget.style.backgroundColor = 'white'}
                      >
                        <span>{s.name}</span>
                        {s.audited && <span style={{ fontSize: '11px', color: colors.success }}>✓ Audité</span>}
                      </div>
                    ))}
                    {filteredSuppliers.length === 0 && (
                      <div 
                        onClick={() => addSupplier({ id: Date.now(), name: supplierSearch, audited: false, pharmaExperience: '', marketPosition: '', auditHistory: 'aucun', recentlyAcquired: false, intlCertification: false })}
                        style={{ padding: '10px 14px', cursor: 'pointer', fontSize: '14px', color: colors.primary, fontWeight: 500 }}
                        onMouseEnter={e => e.currentTarget.style.backgroundColor = colors.background}
                        onMouseLeave={e => e.currentTarget.style.backgroundColor = 'white'}
                      >
                        + Ajouter "{supplierSearch}" comme nouveau fournisseur
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
          
          {/* Liste des fournisseurs */}
          {formData.suppliers.length === 0 ? (
            <div style={{ padding: '24px', backgroundColor: colors.background, borderRadius: '10px', textAlign: 'center', color: colors.textSecondary, fontSize: '14px' }}>
              Aucun fournisseur ajouté. Utilisez la recherche ci-dessus pour en ajouter.
            </div>
          ) : (
            formData.suppliers.map((supplier, i) => (
              <SupplierCard key={supplier.id} supplier={supplier} onUpdate={(s) => updateSupplier(i, s)} onRemove={() => removeSupplier(i)} />
            ))
          )}
        </FormSection>

        </>}

        {/* Étape 2 : Documents & Étapes requis */}
        {createStep === 2 && <>
          <FormSection title="Documents & Étapes requis" icon="📑">
            <p style={{ fontSize: '13px', color: colors.textSecondary, margin: '0 0 16px', padding: '12px', backgroundColor: colors.primaryLight, borderRadius: '8px' }}>
              <Icons.Info style={{ width: 14, height: 14, verticalAlign: 'middle', marginRight: '6px' }} />
              Pré-calculé selon votre configuration. Vous pouvez ajuster avec justification.
            </p>
            
            <h4 style={{ fontSize: '13px', fontWeight: 600, color: colors.textSecondary, margin: '0 0 8px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Documentation projet</h4>
            {projectDocuments.map(item => (
              <RequiredItemRow 
                key={item.id}
                item={item}
                required={getRequiredStatus(item.id)}
                justification={formData.justifications[item.id] || ''}
                onToggle={(req, just) => toggleRequiredItem(item.id, req, just)}
                onJustificationChange={(just) => setFormData(prev => ({ ...prev, justifications: { ...prev.justifications, [item.id]: just } }))}
              />
            ))}
            
            <h4 style={{ fontSize: '13px', fontWeight: 600, color: colors.textSecondary, margin: '24px 0 8px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Étapes de validation</h4>
            {validationSteps.map(item => (
              <RequiredItemRow 
                key={item.id}
                item={item}
                required={getRequiredStatus(item.id)}
                justification={formData.justifications[item.id] || ''}
                onToggle={(req, just) => toggleRequiredItem(item.id, req, just)}
                onJustificationChange={(just) => setFormData(prev => ({ ...prev, justifications: { ...prev.justifications, [item.id]: just } }))}
              />
            ))}
          </FormSection>
        </>}

        {/* Actions */}
        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px', marginTop: '24px', paddingTop: '24px', borderTop: `1px solid ${colors.border}` }}>
          <button onClick={onCancel} style={{ padding: '12px 24px', backgroundColor: 'white', border: `1px solid ${colors.border}`, borderRadius: '8px', cursor: 'pointer', fontSize: '14px', color: colors.textSecondary, fontWeight: 500 }}>
            Annuler
          </button>
          {createStep === 1 && (
            <button onClick={() => setCreateStep(2)} disabled={!isFormValid} style={{ padding: '12px 32px', backgroundColor: isFormValid ? colors.primary : colors.border, border: 'none', borderRadius: '8px', cursor: isFormValid ? 'pointer' : 'not-allowed', fontSize: '14px', color: 'white', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '8px' }}>
              Calculer les Documents & Étapes requis <Icons.ArrowRight />
            </button>
          )}
          {createStep === 2 && <>
            <button onClick={() => setCreateStep(1)} style={{ padding: '12px 24px', backgroundColor: 'white', border: `1px solid ${colors.border}`, borderRadius: '8px', cursor: 'pointer', fontSize: '14px', color: colors.textSecondary, fontWeight: 500, display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Icons.ArrowLeft /> Retour
            </button>
            <button onClick={onCreate} style={{ padding: '12px 32px', backgroundColor: colors.primary, border: 'none', borderRadius: '8px', cursor: 'pointer', fontSize: '14px', color: 'white', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Icons.Plus /> Créer le projet
            </button>
          </>}
        </div>
      </div>
      
      {/* Modale SPRITE */}
      <SpriteModal isOpen={showSpriteModal} onClose={() => setShowSpriteModal(false)} onSelect={handleSpriteSelect} />
    </div>
  );
};

// =============================================================================
// PAGE INFORMATIONS PROJET (dans vue projet)
// =============================================================================
const ProjectInfoContent = ({ onNavigate }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [supplierSearch, setSupplierSearch] = useState('');
  const [showSupplierDropdown, setShowSupplierDropdown] = useState(false);
  
  // Données du projet LIMS avec la nouvelle structure
  const [formData, setFormData] = useState({
    name: 'LIMS v3.2',
    description: 'Système de gestion des informations de laboratoire pour le Laboratoire Central. Mise à jour majeure incluant nouveaux workflows et intégration instruments.',
    department: 'labo-central',
    departmentLabel: 'Laboratoire Central',
    country: 'france',
    site: 'lyon',
    perimeter: 'rd',
    dataMigration: true,
    gamp5Category: '4',
    criticality: 'direct',
    regulations: ['21cfr11', 'annexe11', 'data-integrity'],
    startDate: '2024-10-15',
    targetDate: '2025-02-15',
    milestones: [
      { id: 1, name: 'Kick-off projet', date: '2024-10-15', status: 'completed' },
      { id: 2, name: 'Validation URS', date: '2024-11-30', status: 'completed' },
      { id: 3, name: 'Fin qualification', date: '2025-01-15', status: 'in-progress' },
      { id: 4, name: 'Go-live production', date: '2025-02-15', status: 'pending' },
    ],
    suppliers: [
      { id: 'labware', name: 'LabWare Inc', audited: true, pharmaExperience: 'forte', marketPosition: 'leader', auditHistory: 'satisfaisant', recentlyAcquired: false, intlCertification: true },
    ],
    requiredItems: {
      architecture: true,
      pmco: true,
      'user-manual': true,
      sop: true,
      svp: true,
      urs: true,
      fs: true,
      iq: true,
      oq: true,
      pq: true,
      vsr: true,
    },
    justifications: {},
  });

  const updateField = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const updateMilestone = (index, milestone) => {
    const newMilestones = [...formData.milestones];
    newMilestones[index] = milestone;
    setFormData(prev => ({ ...prev, milestones: newMilestones }));
  };

  const addMilestone = () => {
    setFormData(prev => ({
      ...prev,
      milestones: [...prev.milestones, { id: Date.now(), name: '', date: '', status: 'pending' }]
    }));
  };

  const deleteMilestone = (index) => {
    setFormData(prev => ({
      ...prev,
      milestones: prev.milestones.filter((_, i) => i !== index)
    }));
  };

  // Fournisseurs
  const addSupplier = (supplierData) => {
    const newSupplier = supplierData || {
      id: Date.now(),
      name: '',
      audited: false,
      pharmaExperience: '',
      marketPosition: '',
      auditHistory: 'aucun',
      recentlyAcquired: false,
      intlCertification: false,
    };
    setFormData(prev => ({ ...prev, suppliers: [...prev.suppliers, newSupplier] }));
    setSupplierSearch('');
  };

  const updateSupplier = (index, supplier) => {
    const newSuppliers = [...formData.suppliers];
    newSuppliers[index] = supplier;
    setFormData(prev => ({ ...prev, suppliers: newSuppliers }));
  };

  const removeSupplier = (index) => {
    setFormData(prev => ({ ...prev, suppliers: prev.suppliers.filter((_, i) => i !== index) }));
  };

  // Required items toggle
  const toggleRequiredItem = (itemId, required, justification) => {
    setFormData(prev => ({
      ...prev,
      requiredItems: { ...prev.requiredItems, [itemId]: required },
      justifications: { ...prev.justifications, [itemId]: justification },
    }));
  };

  const getRequiredStatus = (itemId) => {
    return formData.requiredItems[itemId] ?? true;
  };

  // Sites filtrés par pays
  const filteredSites = formData.country === 'global' 
    ? sitesData 
    : sitesData.filter(s => s.country === formData.country || s.value === 'global');

  // Recherche fournisseurs
  const filteredSuppliers = suppliersDatabase.filter(s => 
    s.name.toLowerCase().includes(supplierSearch.toLowerCase()) &&
    !formData.suppliers.find(fs => fs.id === s.id)
  );

  const handleSave = () => {
    setIsEditing(false);
  };

  const handleCancel = () => {
    setIsEditing(false);
  };

  const currentCriticality = gxpCriticalityLevels.find(c => c.value === formData.criticality);

  return (
    <div style={{ flex: 1, padding: '24px', overflow: 'auto', backgroundColor: colors.background, height: 'calc(100vh - 56px)' }}>
      {/* Header */}
      <div style={{ marginBottom: '24px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', color: colors.textSecondary, marginBottom: '8px' }}>
          <span>Projet</span>
          <Icons.ChevronRight />
          <span style={{ color: colors.textPrimary }}>Informations projet</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
          <div>
            <h1 style={{ fontSize: '24px', fontWeight: 700, color: colors.textPrimary, margin: '0 0 4px 0' }}>Informations projet</h1>
            <p style={{ fontSize: '14px', color: colors.textSecondary, margin: 0 }}>Configuration et paramètres du projet {formData.name}</p>
          </div>
          {!isEditing ? (
            <button onClick={() => setIsEditing(true)} style={{ padding: '10px 20px', backgroundColor: colors.primary, border: 'none', borderRadius: '8px', cursor: 'pointer', fontSize: '13px', color: 'white', fontWeight: 500, display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Icons.Edit3 /> Modifier
            </button>
          ) : (
            <div style={{ display: 'flex', gap: '10px' }}>
              <button onClick={handleCancel} style={{ padding: '10px 20px', backgroundColor: 'white', border: `1px solid ${colors.border}`, borderRadius: '8px', cursor: 'pointer', fontSize: '13px', color: colors.textSecondary, fontWeight: 500 }}>
                Annuler
              </button>
              <button onClick={handleSave} style={{ padding: '10px 20px', backgroundColor: colors.success, border: 'none', borderRadius: '8px', cursor: 'pointer', fontSize: '13px', color: 'white', fontWeight: 500, display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Icons.CheckCircle /> Enregistrer
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Statut projet */}
      <div style={{ display: 'flex', gap: '16px', marginBottom: '24px' }}>
        <div style={{ flex: 1, padding: '16px 20px', backgroundColor: 'white', borderRadius: '12px', border: `1px solid ${colors.border}`, display: 'flex', alignItems: 'center', gap: '16px' }}>
          <div style={{ width: '48px', height: '48px', borderRadius: '12px', backgroundColor: colors.primaryLight, display: 'flex', alignItems: 'center', justifyContent: 'center', color: colors.primary }}><Icons.Activity /></div>
          <div>
            <div style={{ fontSize: '12px', color: colors.textSecondary }}>Statut</div>
            <div style={{ fontSize: '16px', fontWeight: 600, color: colors.primary }}>En cours - Qualification</div>
          </div>
        </div>
        <div style={{ flex: 1, padding: '16px 20px', backgroundColor: 'white', borderRadius: '12px', border: `1px solid ${colors.border}`, display: 'flex', alignItems: 'center', gap: '16px' }}>
          <div style={{ width: '48px', height: '48px', borderRadius: '12px', backgroundColor: colors.warningLight, display: 'flex', alignItems: 'center', justifyContent: 'center', color: colors.warning }}><Icons.Calendar /></div>
          <div>
            <div style={{ fontSize: '12px', color: colors.textSecondary }}>Go-live prévu</div>
            <div style={{ fontSize: '16px', fontWeight: 600, color: colors.textPrimary }}>15 février 2025</div>
          </div>
        </div>
        <div style={{ flex: 1, padding: '16px 20px', backgroundColor: 'white', borderRadius: '12px', border: `1px solid ${colors.border}`, display: 'flex', alignItems: 'center', gap: '16px' }}>
          <div style={{ width: '48px', height: '48px', borderRadius: '12px', backgroundColor: currentCriticality ? `${currentCriticality.color}20` : colors.background, display: 'flex', alignItems: 'center', justifyContent: 'center', color: currentCriticality?.color }}><Icons.AlertTriangle /></div>
          <div>
            <div style={{ fontSize: '12px', color: colors.textSecondary }}>Criticité</div>
            <div style={{ fontSize: '16px', fontWeight: 600, color: currentCriticality?.color }}>{currentCriticality?.label}</div>
          </div>
        </div>
      </div>

      {/* Formulaire en blocs pleine largeur */}
      <div style={{ maxWidth: '800px' }}>
        
        {/* 1. Informations générales */}
        <FormSection title="Informations générales" icon="📋">
          <FormInput label="Nom du projet" value={formData.name} onChange={(v) => updateField('name', v)} disabled={!isEditing} required />
          <FormTextarea label="Description" value={formData.description} onChange={(v) => updateField('description', v)} disabled={!isEditing} rows={3} />
          
          {isEditing ? (
            <AutocompleteInput 
              label="Département" 
              value={formData.departmentLabel}
              onChange={(v) => updateField('departmentLabel', v)}
              onSelect={(opt) => { updateField('department', opt.value); updateField('departmentLabel', opt.label); }}
              options={departmentsData}
              placeholder="Rechercher un département..."
              disabled={!isEditing}
            />
          ) : (
            <FormInput label="Département" value={formData.departmentLabel} onChange={() => {}} disabled={true} />
          )}
          
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
            <FormSelect label="Pays" value={formData.country} onChange={(v) => { updateField('country', v); updateField('site', ''); }} options={countriesData} disabled={!isEditing} />
            <FormSelect label="Site" value={formData.site} onChange={(v) => updateField('site', v)} options={filteredSites} disabled={!isEditing} />
          </div>
          
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
            <FormSelect label="Périmètre" value={formData.perimeter} onChange={(v) => updateField('perimeter', v)} options={perimetersData} disabled={!isEditing} required />
            <div style={{ marginBottom: '16px' }}>
              <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: colors.textPrimary, marginBottom: '10px' }}>Migration de données nécessaire</label>
              <div style={{ display: 'flex', gap: '12px' }}>
                {[{ value: false, label: 'Non' }, { value: true, label: 'Oui' }].map(opt => (
                  <button
                    key={String(opt.value)}
                    onClick={() => isEditing && updateField('dataMigration', opt.value)}
                    disabled={!isEditing}
                    style={{ flex: 1, padding: '10px', borderRadius: '8px', border: formData.dataMigration === opt.value ? `2px solid ${colors.primary}` : `1px solid ${colors.border}`, backgroundColor: formData.dataMigration === opt.value ? colors.primaryLight : 'white', color: formData.dataMigration === opt.value ? colors.primary : colors.textPrimary, fontSize: '14px', fontWeight: 500, cursor: isEditing ? 'pointer' : 'not-allowed', opacity: !isEditing ? 0.7 : 1 }}
                  >{opt.label}</button>
                ))}
              </div>
            </div>
          </div>
        </FormSection>

        {/* 2. Classification GxP */}
        <FormSection title="Classification GxP" icon="🔬">
          <FormSelect label="Catégorie GAMP 5" value={formData.gamp5Category} onChange={(v) => updateField('gamp5Category', v)} options={gamp5Categories} disabled={!isEditing} required />
          
          <div style={{ marginBottom: '16px' }}>
            <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: colors.textPrimary, marginBottom: '10px' }}>
              Criticité du système <span style={{ color: colors.error }}>*</span>
            </label>
            <div style={{ display: 'flex', gap: '12px' }}>
              {gxpCriticalityLevels.map(level => (
                <button
                  key={level.value}
                  onClick={() => isEditing && updateField('criticality', level.value)}
                  disabled={!isEditing}
                  style={{
                    flex: 1,
                    padding: '16px 12px',
                    borderRadius: '10px',
                    border: formData.criticality === level.value ? `2px solid ${level.color}` : `2px solid ${colors.border}`,
                    backgroundColor: formData.criticality === level.value ? `${level.color}15` : 'white',
                    cursor: isEditing ? 'pointer' : 'not-allowed',
                    textAlign: 'center',
                    opacity: !isEditing ? 0.7 : 1,
                  }}
                >
                  <div style={{ fontSize: '14px', fontWeight: 600, color: level.color, marginBottom: '4px' }}>{level.label}</div>
                  <div style={{ fontSize: '11px', color: colors.textSecondary, lineHeight: 1.3 }}>{level.description}</div>
                </button>
              ))}
            </div>
          </div>
          
          <FormCheckboxGroup label="Réglementations applicables" options={regulationOptions} values={formData.regulations} onChange={(v) => updateField('regulations', v)} disabled={!isEditing} />
        </FormSection>

        {/* 3. Planning */}
        <FormSection title="Planning" icon="📅">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
            <FormInput label="Date de début" type="date" value={formData.startDate} onChange={(v) => updateField('startDate', v)} disabled={!isEditing} />
            <FormInput label="Date cible (Go-live)" type="date" value={formData.targetDate} onChange={(v) => updateField('targetDate', v)} disabled={!isEditing} />
          </div>
          <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: colors.textPrimary, marginBottom: '10px' }}>Jalons clés</label>
          {formData.milestones.map((m, i) => (
            <MilestoneItem key={m.id} milestone={m} onUpdate={(milestone) => updateMilestone(i, milestone)} onDelete={() => deleteMilestone(i)} disabled={!isEditing} />
          ))}
          {isEditing && (
            <button onClick={addMilestone} style={{ display: 'flex', alignItems: 'center', gap: '6px', padding: '8px 12px', backgroundColor: 'transparent', border: `1px dashed ${colors.border}`, borderRadius: '8px', cursor: 'pointer', fontSize: '13px', color: colors.textSecondary, width: '100%', justifyContent: 'center' }}>
              <Icons.Plus /> Ajouter un jalon
            </button>
          )}
        </FormSection>

        {/* 4. Fournisseurs */}
        <FormSection title="Fournisseurs" icon="🏢">
          {isEditing && (
            <div style={{ marginBottom: '16px', position: 'relative' }}>
              <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: colors.textPrimary, marginBottom: '6px' }}>Ajouter un fournisseur</label>
              <div style={{ flex: 1, position: 'relative' }}>
                <input
                  type="text"
                  value={supplierSearch}
                  onChange={(e) => { setSupplierSearch(e.target.value); setShowSupplierDropdown(true); }}
                  onFocus={() => setShowSupplierDropdown(true)}
                  onBlur={() => setTimeout(() => setShowSupplierDropdown(false), 200)}
                  placeholder="Rechercher un fournisseur..."
                  style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', border: `1px solid ${colors.border}`, fontSize: '14px', outline: 'none', boxSizing: 'border-box' }}
                />
                {showSupplierDropdown && supplierSearch && (
                  <div style={{ position: 'absolute', top: '100%', left: 0, right: 0, backgroundColor: 'white', border: `1px solid ${colors.border}`, borderRadius: '8px', boxShadow: '0 4px 12px rgba(0,0,0,0.1)', zIndex: 100, maxHeight: '200px', overflow: 'auto', marginTop: '4px' }}>
                    {filteredSuppliers.map(s => (
                      <div
                        key={s.id}
                        onClick={() => addSupplier({ ...s })}
                        style={{ padding: '10px 14px', cursor: 'pointer', fontSize: '14px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}
                        onMouseEnter={e => e.currentTarget.style.backgroundColor = colors.background}
                        onMouseLeave={e => e.currentTarget.style.backgroundColor = 'white'}
                      >
                        <span>{s.name}</span>
                        {s.audited && <span style={{ fontSize: '11px', color: colors.success }}>✓ Audité</span>}
                      </div>
                    ))}
                    {filteredSuppliers.length === 0 && (
                      <div 
                        onClick={() => addSupplier({ id: Date.now(), name: supplierSearch, audited: false, pharmaExperience: '', marketPosition: '', auditHistory: 'aucun', recentlyAcquired: false, intlCertification: false })}
                        style={{ padding: '10px 14px', cursor: 'pointer', fontSize: '14px', color: colors.primary, fontWeight: 500 }}
                        onMouseEnter={e => e.currentTarget.style.backgroundColor = colors.background}
                        onMouseLeave={e => e.currentTarget.style.backgroundColor = 'white'}
                      >
                        + Ajouter "{supplierSearch}" comme nouveau fournisseur
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          )}
          
          {formData.suppliers.length === 0 ? (
            <div style={{ padding: '24px', backgroundColor: colors.background, borderRadius: '10px', textAlign: 'center', color: colors.textSecondary, fontSize: '14px' }}>
              Aucun fournisseur ajouté.
            </div>
          ) : (
            formData.suppliers.map((supplier, i) => (
              <SupplierCard key={supplier.id} supplier={supplier} onUpdate={(s) => updateSupplier(i, s)} onRemove={() => removeSupplier(i)} disabled={!isEditing} />
            ))
          )}
        </FormSection>

        {/* 5. Documents & Étapes requis */}
        <FormSection title="Documents & Étapes requis" icon="📑">
          <h4 style={{ fontSize: '13px', fontWeight: 600, color: colors.textSecondary, margin: '0 0 8px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Documentation projet</h4>
          {projectDocuments.map(item => (
            <RequiredItemRow 
              key={item.id}
              item={item}
              required={getRequiredStatus(item.id)}
              justification={formData.justifications[item.id] || ''}
              onToggle={(req, just) => toggleRequiredItem(item.id, req, just)}
              onJustificationChange={(just) => setFormData(prev => ({ ...prev, justifications: { ...prev.justifications, [item.id]: just } }))}
              disabled={!isEditing}
            />
          ))}
          
          <h4 style={{ fontSize: '13px', fontWeight: 600, color: colors.textSecondary, margin: '24px 0 8px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Étapes de validation</h4>
          {validationSteps.map(item => (
            <RequiredItemRow 
              key={item.id}
              item={item}
              required={getRequiredStatus(item.id)}
              justification={formData.justifications[item.id] || ''}
              onToggle={(req, just) => toggleRequiredItem(item.id, req, just)}
              onJustificationChange={(just) => setFormData(prev => ({ ...prev, justifications: { ...prev.justifications, [item.id]: just } }))}
              disabled={!isEditing}
            />
          ))}
        </FormSection>

      </div>
    </div>
  );
};

// =============================================================================
// APP PRINCIPALE
// =============================================================================
export default function GxPDocApp() {
  const [currentView, setCurrentView] = useState('home'); // 'home' | 'project' | 'create-project' | 'backoffice' | 'help'
  const [currentProjectId, setCurrentProjectId] = useState(null);
  const [userRole, setUserRole] = useState('metier'); // Défaut métier pour la démo
  const [activeSection, setActiveSection] = useState('info');
  const [criticalAnalysisType, setCriticalAnalysisType] = useState(null); // null | 'docs' | 'urs' | 'fs'
  const [wireframe, setWireframe] = useState(false);
  
  // Ouvrir un projet
  const handleOpenProject = (projectId) => {
    setCurrentProjectId(projectId);
    setCurrentView('project');
    setActiveSection('info');
  };
  
  // Créer un projet
  const handleCreateProject = () => {
    setCurrentView('create-project');
  };
  
  // Ouvrir le backoffice
  const handleOpenBackoffice = () => {
    setCurrentView('backoffice');
  };
  
  // Ouvrir l'aide
  const handleOpenHelp = () => {
    setCurrentView('help');
  };
  
  // Après création, ouvrir le projet LIMS (simulation)
  const handleProjectCreated = () => {
    setCurrentProjectId('lims-v3.2');
    setCurrentView('project');
    setActiveSection('info');
  };
  
  // Retour à l'accueil
  const handleBackToHome = () => {
    setCurrentView('home');
    setCurrentProjectId(null);
  };
  
  // Rendu du contenu projet selon la section active
  const renderProjectContent = () => {
    // Pages d'analyse critique
    if (criticalAnalysisType === 'docs') {
      return <CriticalAnalysisContent onBack={() => setCriticalAnalysisType(null)} />;
    }
    if (criticalAnalysisType === 'urs') {
      return <URSCriticalAnalysisContent onBack={() => setCriticalAnalysisType(null)} />;
    }
    if (criticalAnalysisType === 'fs') {
      return <FSCriticalAnalysisContent onBack={() => setCriticalAnalysisType(null)} />;
    }
    
    switch (activeSection) {
      case 'info':
        return <ProjectInfoContent onNavigate={handleSectionChange} />;
      case 'raci':
        return <ProjectRaciContent />;
      case 'documents':
        return <DocumentsContent onNavigateToAnalysis={() => setCriticalAnalysisType('docs')} />;
      case 'exports':
        return <ExportsContent />;
      case 'svp':
        return <SVPContent onNavigate={handleSectionChange} />;
      case 'urs':
        return <URSContent userRole={userRole} onNavigateToAnalysis={() => setCriticalAnalysisType('urs')} />;
      case 'fs':
        return <FSContent userRole={userRole} onNavigateToAnalysis={() => setCriticalAnalysisType('fs')} />;
      case 'fra':
        return <FRAContent userRole={userRole} />;
      default:
        return <ProjectInfoContent onNavigate={handleSectionChange} />;
    }
  };
  
  // Reset de l'analyse critique quand on change de section
  const handleSectionChange = (section) => {
    setCriticalAnalysisType(null);
    setActiveSection(section);
  };
  
  const wfStyle = wireframe ? { filter: 'grayscale(1)', WebkitFilter: 'grayscale(1)' } : {};

  // Vue Backoffice
  if (currentView === 'backoffice') {
    return <div style={wfStyle}><BackofficePage onBackToHome={handleBackToHome} /></div>;
  }

  // Vue Aide et Ressources
  if (currentView === 'help') {
    return <div style={wfStyle}><HelpPage userRole={userRole} onBackToHome={handleBackToHome} /></div>;
  }

  // Vue Création de projet
  if (currentView === 'create-project') {
    return (
      <div style={wfStyle}>
        <CreateProjectPage
          userRole={userRole}
          onRoleChange={setUserRole}
          onCancel={handleBackToHome}
          onCreate={handleProjectCreated}
          wireframe={wireframe}
          onToggleWireframe={() => setWireframe(w => !w)}
        />
      </div>
    );
  }

  // Vue Accueil
  if (currentView === 'home') {
    return (
      <div style={wfStyle}>
        <HomePage
          userRole={userRole}
          onRoleChange={setUserRole}
          onOpenProject={handleOpenProject}
          onCreateProject={handleCreateProject}
          onOpenBackoffice={handleOpenBackoffice}
          onOpenHelp={handleOpenHelp}
          wireframe={wireframe}
          onToggleWireframe={() => setWireframe(w => !w)}
        />
      </div>
    );
  }

  // Vue Projet
  return (
    <div style={{ fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif", backgroundColor: colors.background, minHeight: '100vh', ...wfStyle }}>
      <Header
        projectName="LIMS v3.2"
        userRole={userRole}
        onRoleChange={setUserRole}
        onBackToHome={handleBackToHome}
        wireframe={wireframe}
        onToggleWireframe={() => setWireframe(w => !w)}
      />
      <div style={{ display: 'flex' }}>
        <SidebarNavigation
          activeSection={activeSection}
          onSectionChange={handleSectionChange}
          onBackToHome={handleBackToHome}
        />
        {renderProjectContent()}
      </div>
    </div>
  );
}
