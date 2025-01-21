
  export interface Event {
    id: number;
    name: string;
    date?: string;
    startDate?: string;
    endDate?: string;
    type: string;
  }

  export interface EventType {
    label: string;
    color: string;
    legendColor: string;
  }

  export const EventTypes: Record<string, EventType> = {
    white: { 
      label: 'Academic Event', 
      color: 'bg-white border-gray-200 text-gray-800',
      legendColor: 'bg-white border-2 border-gray-200'
    },
    red: { 
      label: 'National Holiday', 
      color: 'bg-red-50 border-red-200 text-red-800',
      legendColor: 'bg-red-50 border-2 border-red-200'
    },
    purple: { 
      label: 'College Event', 
      color: 'bg-purple-50 border-purple-200 text-purple-800',
      legendColor: 'bg-purple-50 border-2 border-purple-200'
    },
    blue: { 
      label: 'Examination', 
      color: 'bg-blue-50 border-blue-200 text-blue-800',
      legendColor: 'bg-blue-50 border-2 border-blue-200'
    },
    yellow: { 
      label: 'Restricted Holiday', 
      color: 'bg-yellow-50 border-yellow-200 text-yellow-800',
      legendColor: 'bg-yellow-50 border-2 border-yellow-200'
    }
  };