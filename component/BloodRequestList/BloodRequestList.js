import React from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import { colors } from '../../component/config/config'; // optional theme

const BloodRequestList = ({ data, onViewPress }) => {
  const renderItem = ({ item }) => {
    const urgencyColor = getUrgencyColor(item.urgency);

    return (
      <View style={[styles.card, { borderLeftColor: urgencyColor }]}>
        {/* Left Section */}
        <View style={[styles.leftSection, { backgroundColor: hexWithAlpha(urgencyColor, 0.08) }]}>
          <Text style={[styles.bloodType, { color: urgencyColor }]}>{item.bloodType}</Text>

          <TouchableOpacity
            style={[styles.viewButton, { backgroundColor: urgencyColor }]}
            onPress={() => onViewPress && onViewPress(item)}
            activeOpacity={0.85}
          >
            <Text style={styles.viewText}>View</Text>
          </TouchableOpacity>
        </View>

        {/* Right Section */}
        <View style={styles.detailsSection}>
          <View style={styles.detailRow}>
            <View style={styles.columnLeft}>
              <Text style={styles.label}>City</Text>
              <Text style={styles.label}>Hospital</Text>
              <Text style={styles.label}>Urgency</Text>
              <Text style={styles.label}>Units Needed</Text>
              <Text style={styles.label}>Posted On</Text>
            </View>

            <View style={styles.columnRight}>
              <Text style={styles.value}>{item.city}</Text>
              <Text style={styles.value}>{item.hospital}</Text>
              <Text style={[styles.value, { color: urgencyColor }]}>{item.urgency}</Text>
              <Text style={styles.value}>{item.unitsNeeded}</Text>
              <Text style={styles.value}>{item.postedOn}</Text>
            </View>
          </View>
        </View>
      </View>
    );
  };

  return (
    <FlatList
      data={data}
      renderItem={renderItem}
      keyExtractor={(_, index) => index.toString()}
      contentContainerStyle={styles.container}
      showsVerticalScrollIndicator={false}
    />
  );
};

/* ---------- Utilities ---------- */

// Return a hex color string based on urgency. ALWAYS returns a string.
const getUrgencyColor = (urgency) => {
  if (!urgency) return '#1976d2'; // fallback
  const u = String(urgency).trim().toLowerCase();
  if (u === 'high' || u === 'urgent') return '#e53935';   // strong red
  if (u === 'medium' || u === 'moderate') return '#f57c00'; // orange
  if (u === 'low' || u === 'normal') return '#2e7d32';    // green
  // allow direct hex or css color names passed in data
  if (/^#([0-9A-F]{3}){1,2}$/i.test(u)) return u;
  return '#1976d2'; // default accent (blue)
};

// create a translucent background from a hex color and alpha (0..1)
const hexWithAlpha = (hex, alpha = 0.08) => {
  // strip #
  const c = hex.replace('#', '');
  // expand short form (#abc -> #aabbcc)
  const full = c.length === 3 ? c.split('').map(ch => ch + ch).join('') : c;
  const r = parseInt(full.substr(0, 2), 16);
  const g = parseInt(full.substr(2, 2), 16);
  const b = parseInt(full.substr(4, 2), 16);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
};

/* ---------- Styles ---------- */

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#f4f5f7',
  },
  card: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 14,
    marginBottom: 16,
    borderLeftWidth: 4,
    borderLeftColor: '#1976d2', // will be overridden per-item
    shadowColor: '#000',
    shadowOpacity: 0.06,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    elevation: 3,
  },
  leftSection: {
    width: 88,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 14,
    paddingVertical: 10,
    borderRadius: 12,
  },
  bloodType: {
    fontSize: 22,
    fontWeight: '800',
    marginBottom: 8,
  },
  detailsSection: {
    flex: 1,
    justifyContent: 'center',
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  columnLeft: {
    flex: 1,
  },
  columnRight: {
    flex: 1.4,
  },
  label: {
    fontSize: 13,
    color: '#7a7a7a',
    marginBottom: 6,
    fontWeight: '500',
  },
  value: {
    fontSize: 14,
    color: '#222',
    marginBottom: 6,
    fontWeight: '600',
  },
  viewButton: {
    paddingVertical: 6,
    paddingHorizontal: 14,
    borderRadius: 8,
  },
  viewText: {
    color: '#fff',
    fontSize: 13,
    fontWeight: '700',
  },
});

export default BloodRequestList;
