// 🔑 функция для локальной даты (исправляет баг с UTC)
function getDateKey(d) {
  return d.getFullYear() + "-" +
         String(d.getMonth()+1).padStart(2,"0") + "-" +
         String(d.getDate()).padStart(2,"0");
}

// Генерация расписания дежурств
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
    const key = getDateKey(d);

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

// Получение расписания
function getRoster() {
  const raw = localStorage.getItem('duty_roster');
  if (raw) return JSON.parse(raw);
  // 🔑 теперь берём актуальных студентов, а не defaultStudents
  return generateRoster(getStudents());
}

// Получение студентов
function getStudents() {
  const raw = localStorage.getItem('duty_students');
  return raw ? JSON.parse(raw) : defaultStudents;
}
