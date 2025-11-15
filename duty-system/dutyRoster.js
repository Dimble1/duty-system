function generateRoster(students) {
  const DUTY_WEEKDAYS = [1,3,5]; // Пн, Ср, Пт
  const roster = {};
  const active = students.filter(s => s.status === "Активен");
  let groupIndex = 0;

  const today = new Date();
  for (let i=0; i<14; i++) {
    const d = new Date(today);
    d.setDate(today.getDate()+i);
    const day = d.getDay(); // 0=Вс,1=Пн...
    const key = d.toISOString().split('T')[0];

    if (DUTY_WEEKDAYS.includes(day)) {
      const group = active.slice(groupIndex, groupIndex+4);
      roster[key] = group.map(s=>s.name);
      groupIndex += 4;
      if (groupIndex >= active.length) groupIndex = 0; // цикл
    } else {
      roster[key] = [];
    }
  }
  localStorage.setItem('duty_roster', JSON.stringify(roster));
  return roster;
}

function getRoster() {
  const raw = localStorage.getItem('duty_roster');
  if (raw) return JSON.parse(raw);
  return generateRoster(defaultStudents);
}

