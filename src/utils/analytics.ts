export interface RealAnalyticsData {
  totalRuns: number;
  toolRuns: Record<string, number>;
  lastUpdated: string | null;
}

const STORAGE_KEY = 'aitoolshub_real_analytics';

export function getRealAnalytics(): RealAnalyticsData {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      return JSON.parse(raw);
    }
  } catch (e) {
    console.error('Failed to read analytics from localStorage', e);
  }

  return {
    totalRuns: 0,
    toolRuns: {},
    lastUpdated: null,
  };
}

export function recordCalculatorRun(toolId: string): RealAnalyticsData {
  try {
    const current = getRealAnalytics();
    const updated: RealAnalyticsData = {
      totalRuns: current.totalRuns + 1,
      toolRuns: {
        ...current.toolRuns,
        [toolId]: (current.toolRuns[toolId] || 0) + 1,
      },
      lastUpdated: new Date().toISOString(),
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    return updated;
  } catch (e) {
    console.error('Failed to record calculator run', e);
    return { totalRuns: 0, toolRuns: {}, lastUpdated: null };
  }
}

export function resetRealAnalytics(): RealAnalyticsData {
  const fresh: RealAnalyticsData = {
    totalRuns: 0,
    toolRuns: {},
    lastUpdated: null,
  };
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(fresh));
  } catch (e) {
    console.error('Failed to reset analytics', e);
  }
  return fresh;
}
