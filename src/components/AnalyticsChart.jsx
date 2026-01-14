
import React, { useState } from 'react';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const AnalyticsChart = ({ data, topPages }) => {
    const [timeGrouping, setTimeGrouping] = useState('day');
    const [selectedMetrics, setSelectedMetrics] = useState(['totalPageViews']); // Array of selected keys

    // Colors for different lines
    const COLORS = ['#4a90e2', '#e24a4a', '#4ae266', '#e2a94a', '#9e4ae2', '#4ae2d4'];

    // Helper to get week number/label
    const getWeekLabel = (date) => {
        const d = new Date(date);
        d.setHours(0, 0, 0, 0);
        d.setDate(d.getDate() + 4 - (d.getDay() || 7));
        const yearStart = new Date(d.getFullYear(), 0, 1);
        const weekNo = Math.ceil((((d - yearStart) / 86400000) + 1) / 7);
        return `${d.getFullYear()}-W${weekNo}`;
    };

    const getMetricValue = (day, metricKey) => {
        if (metricKey === 'totalPageViews') return day.totalPageViews || 0;
        if (metricKey === 'dailyActiveUsers') return day.dailyActiveUsers || 0;
        if (metricKey === 'totalSessions') return day.totalSessions || 0;

        // Specific page logic
        if (day.pageViews && day.pageViews[metricKey]) return day.pageViews[metricKey];

        // Fallback for flattened keys (old data support)
        const flatKey = `pageViews.${metricKey}`;
        if (day[flatKey]) return day[flatKey];

        return 0;
    };

    const processData = () => {
        if (!data || data.length === 0) return [];

        const sourceData = [...data].sort((a, b) => new Date(a.id) - new Date(b.id)); // Ensure ASC

        if (timeGrouping === 'day') {
            return sourceData.map(day => {
                const point = {
                    name: new Date(day.id).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })
                };
                selectedMetrics.forEach(m => {
                    point[m] = getMetricValue(day, m);
                });
                return point;
            });
        }

        // Aggregate
        const aggregated = {};
        const keys = [];

        sourceData.forEach(day => {
            let key;
            const dateObj = new Date(day.id);
            if (timeGrouping === 'week') key = getWeekLabel(day.id);
            else if (timeGrouping === 'month') key = `${dateObj.getFullYear()}-${String(dateObj.getMonth() + 1).padStart(2, '0')}`;
            else if (timeGrouping === 'year') key = `${dateObj.getFullYear()}`;

            if (!aggregated[key]) {
                aggregated[key] = { name: key };
                keys.push(key);
            }

            selectedMetrics.forEach(m => {
                if (!aggregated[key][m]) aggregated[key][m] = 0;
                aggregated[key][m] += getMetricValue(day, m);
            });
        });

        return keys.map(key => aggregated[key]);
    };

    const toggleMetric = (metricKey) => {
        if (selectedMetrics.includes(metricKey)) {
            // Prevent deselecting the last one if you want at least one? Or allow empty.
            if (selectedMetrics.length === 1) return; // Keep at least one
            setSelectedMetrics(selectedMetrics.filter(m => m !== metricKey));
        } else {
            if (selectedMetrics.length >= 5) {
                alert("Max 5 metrics allow for clarity.");
                return;
            }
            setSelectedMetrics([...selectedMetrics, metricKey]);
        }
    };

    // Available options
    const coreMetrics = [
        { key: 'totalPageViews', label: 'Page Views' },
        { key: 'dailyActiveUsers', label: 'Active Users' },
        { key: 'totalSessions', label: 'Sessions' }
    ];

    const chartData = processData();

    return (
        <div className="card chart-section" style={{ padding: '20px', marginBottom: '20px' }}>
            <div className="chart-header" style={{ marginBottom: '20px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '15px' }}>
                    <h3 style={{ margin: 0 }}>Traffic Trends</h3>

                    <select
                        value={timeGrouping}
                        onChange={(e) => setTimeGrouping(e.target.value)}
                        className="form-select"
                        style={{ padding: '8px', borderRadius: '4px', border: '1px solid var(--border-light)', background: 'var(--bg-tertiary)', color: 'var(--text-primary)' }}
                    >
                        <option value="day">Daily</option>
                        <option value="week">Weekly</option>
                        <option value="month">Monthly</option>
                        <option value="year">Yearly</option>
                    </select>
                </div>

                <div className="metric-toggles" style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                    {coreMetrics.map((m, idx) => (
                        <button
                            key={m.key}
                            onClick={() => toggleMetric(m.key)}
                            style={{
                                padding: '6px 12px',
                                borderRadius: '20px',
                                border: '1px solid var(--border-light)',
                                background: selectedMetrics.includes(m.key) ? COLORS[idx % COLORS.length] : 'var(--bg-tertiary)',
                                color: selectedMetrics.includes(m.key) ? '#fff' : 'var(--text-secondary)',
                                cursor: 'pointer',
                                fontSize: '0.9em'
                            }}
                        >
                            {m.label}
                        </button>
                    ))}

                    {/* Page selector styled as a dropdown that adds to the list */}
                    <div style={{ position: 'relative', display: 'inline-block' }}>
                        <select
                            onChange={(e) => {
                                if (e.target.value) {
                                    toggleMetric(e.target.value);
                                    e.target.value = ''; // Reset
                                }
                            }}
                            style={{
                                padding: '6px 12px',
                                borderRadius: '20px',
                                border: '1px solid var(--border-light)',
                                background: 'var(--bg-tertiary)',
                                color: 'var(--text-primary)',
                                maxWidth: '150px'
                            }}
                        >
                            <option value="">+ Add Page</option>
                            {topPages && topPages.map(p => (
                                <option
                                    key={p.page}
                                    value={p.page}
                                    disabled={selectedMetrics.includes(p.page)}
                                >
                                    {p.page.replace(/_/g, '/')}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* Show selected pages as removable chips */}
                    {selectedMetrics.filter(m => !coreMetrics.find(cm => cm.key === m)).map((pageKey, i) => {
                        const colorIndex = (coreMetrics.length + i) % COLORS.length;
                        return (
                            <button
                                key={pageKey}
                                onClick={() => toggleMetric(pageKey)}
                                style={{
                                    padding: '6px 12px',
                                    borderRadius: '20px',
                                    border: '1px solid ' + COLORS[colorIndex],
                                    background: COLORS[colorIndex],
                                    color: '#fff',
                                    cursor: 'pointer',
                                    fontSize: '0.9em',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '6px'
                                }}
                            >
                                {pageKey.replace(/_/g, '/')} ×
                            </button>
                        );
                    })}
                </div>
            </div>

            <div style={{ width: '100%', height: 350 }}>
                {chartData.length > 0 ? (
                    <ResponsiveContainer>
                        <LineChart data={chartData}>
                            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--border-light)" strokeOpacity={0.6} />
                            <XAxis dataKey="name" stroke="var(--text-secondary)" fontSize={12} tickMargin={10} />
                            <YAxis stroke="var(--text-secondary)" fontSize={12} />
                            <Tooltip
                                contentStyle={{
                                    backgroundColor: 'var(--bg-card)',
                                    borderRadius: '8px',
                                    boxShadow: 'var(--shadow-md)',
                                    border: '1px solid var(--border-light)',
                                    color: 'var(--text-primary)'
                                }}
                            />
                            <Legend />
                            {selectedMetrics.map((m, index) => {
                                // Deterministic color based on metric
                                let color;
                                const coreIndex = coreMetrics.findIndex(cm => cm.key === m);
                                if (coreIndex !== -1) {
                                    color = COLORS[coreIndex % COLORS.length];
                                } else {
                                    // Find index among ALL pages in selectedMetrics to keep specific pages distinct if possible
                                    // But simpler: just hash the string or simple cycle?
                                    // Let's use position in selected array + offset
                                    const pageMetrics = selectedMetrics.filter(sm => !coreMetrics.find(cm => cm.key === sm));
                                    const pageIndex = pageMetrics.indexOf(m);
                                    color = COLORS[(coreMetrics.length + pageIndex) % COLORS.length];
                                }

                                return (
                                    <Line
                                        key={m}
                                        type="monotone"
                                        dataKey={m}
                                        name={coreMetrics.find(cm => cm.key === m)?.label || m.replace(/_/g, '/')}
                                        stroke={color}
                                        strokeWidth={3}
                                        dot={{ r: 4, fill: color, strokeWidth: 2 }}
                                        activeDot={{ r: 8 }}
                                        animationDuration={1000}
                                    />
                                );
                            })}
                        </LineChart>
                    </ResponsiveContainer>
                ) : (
                    <div style={{ height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#999' }}>
                        No data available for this range
                    </div>
                )}
            </div>
        </div>
    );
};

export default AnalyticsChart;
