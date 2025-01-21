export const eventTypes = {
    white: { label: 'Academic Event', color: 'bg-white border-gray-200 text-gray-800' },
    red: { label: 'National Holiday', color: 'bg-red-100 border-red-300 text-red-800' },
    purple: { label: 'College Event', color: 'bg-purple-100 border-purple-300 text-purple-800' },
    blue: { label: 'Examination', color: 'bg-blue-100 border-blue-300 text-blue-800' },
    yellow: { label: 'Restricted Holiday', color: 'bg-yellow-100 border-yellow-300 text-yellow-800' }
  };
  
  export const initialEvents = [
    { id: 1, name: 'Republic Day', date: '2025-01-26', type: 'red' },
    { id: 2, name: 'Last Date to add full semester UG courses', date: '2025-01-27', type: 'white' },
    { id: 3, name: 'Last Date to Drop half semester UG courses', date: '2025-01-27', type: 'white' },
    { id: 4, name: 'Last date to drop full semester UG courses', date: '2025-02-03', type: 'white' },
    { id: 5, name: 'Breeze', startDate: '2025-02-14', endDate: '2025-02-16', type: 'purple' },
    { id: 6, name: 'Registration open for Second half CCC\'s', date: '2025-02-21', type: 'white' },
    { id: 7, name: 'Mid Term Examinations', startDate: '2025-02-27', endDate: '2025-03-05', type: 'blue' },
    { id: 8, name: 'Last date to add second half CCC courses', date: '2025-03-13', type: 'white' },
    { id: 9, name: 'Holi', date: '2025-03-14', type: 'red' },
    { id: 10, name: 'No Class Day', date: '2025-03-15', type: 'purple' },
    { id: 11, name: 'Last date to drop second half CCC courses', date: '2025-03-20', type: 'white' },
    { id: 12, name: 'SNU Day/ No Class Day', date: '2025-04-04', type: 'purple' },
    { id: 13, name: 'Last Teaching Day', date: '2025-04-25', type: 'white' },
    { id: 14, name: 'End Term Examinations', startDate: '2025-04-29', endDate: '2025-05-09', type: 'blue' },
    { id: 15, name: 'Last Day for Viewing Answer Sheets', date: '2025-05-14', type: 'white' },
    { id: 16, name: 'Result Submission Day', date: '2025-05-15', type: 'white' },
    { id: 17, name: 'Result Declaration Day', date: '2025-05-17', type: 'white' },
    { id: 18, name: 'Eid', date: '2025-03-31', type: 'red' }
  ];
  