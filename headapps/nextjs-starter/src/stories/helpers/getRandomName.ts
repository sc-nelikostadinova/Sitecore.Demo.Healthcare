export const getRandomName = (): string => {
  const firstNames = [
    'Alice',
    'Bob',
    'Charlie',
    'Diana',
    'Ethan',
    'Fiona',
    'George',
    'Hannah',
    'Isaac',
    'Julia',
    'Kevin',
    'Laura',
    'Michael',
    'Nina',
    'Oliver',
    'Paula',
    'Quentin',
    'Rachel',
    'Samuel',
    'Tina',
    'Victor',
    'Wendy',
    'Xavier',
    'Yasmine',
    'Zachary',
  ];

  const lastNames = [
    'Johnson',
    'Smith',
    'Davis',
    'Garcia',
    'Miller',
    'Thompson',
    'Brown',
    'Wilson',
    'Clark',
    'Martinez',
    'Lee',
    'Scott',
    'Turner',
    'Adams',
    'Young',
    'Hall',
    'Baker',
    'Reed',
    'Price',
    'Morgan',
    'Hughes',
    'Simmons',
    'Coleman',
    'Rivera',
    'Bennett',
  ];

  const first = firstNames[Math.floor(Math.random() * firstNames.length)];
  const last = lastNames[Math.floor(Math.random() * lastNames.length)];

  return `${first} ${last}`;
};
