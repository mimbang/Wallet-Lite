// fillMissingPeriods.js

export function formatLabel(label, period) {
  if (period === 'week') {
    const dayNames = ['Dim', 'Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam'];
    const d = new Date(label);
    return dayNames[d.getDay()];
  }

  if (period === 'month') {
    return `S${Number(label)}`;
  }

  if (period === 'year') {
    const months = ['Jan', 'Fév', 'Mar', 'Avr', 'Mai', 'Juin',
                    'Juil', 'Août', 'Sep', 'Oct', 'Nov', 'Déc'];
    return months[Number(label) - 1];
  }

  return label;
}

export default function fillMissingPeriods(stats, period) {
  if (period === 'week') {
    const dayNames = ['Dim', 'Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam'];

    return dayNames.map(day => {
      // chercher la transaction dont le jour correspond au slot
      const row = stats.find(r => {
        const dayLabel = new Date(r.label).getDay(); // 0 = Dim, 1 = Lun ...
        return dayNames[dayLabel] === day;
      });

      return {
        label: day,
        income: row?.income ?? 0,
        expense: row?.expense ?? 0
      };
    });
  }

  if (period === 'month') {
    const weeksInMonth = ['S1', 'S2', 'S3', 'S4', 'S5'];

    return weeksInMonth.map((week, i) => {
      const row = stats[i]; // on prend la ième semaine si existante
      return {
        label: week,
        income: row?.income ?? 0,
        expense: row?.expense ?? 0
      };
    });
  }

  if (period === 'year') {
    const months = ['Jan', 'Fév', 'Mar', 'Avr', 'Mai', 'Juin',
                    'Juil', 'Août', 'Sep', 'Oct', 'Nov', 'Déc'];

    return months.map((month, i) => {
      // r.label = SQL brut ('01', '02', etc)
      const row = stats.find(r => Number(r.label) === i + 1);
      return {
        label: month,
        income: row?.income ?? 0,
        expense: row?.expense ?? 0
      };
    });
  }

  return stats;
}
