import React from 'react';
import { Clock } from 'lucide-react';
import { Event, EventTypes } from '@/types/calendar';

interface EventCardProps {
  event: Event;
}

const EventCard: React.FC<EventCardProps> = ({ event }) => (
  <div className={`p-4 rounded-lg border transition-colors ${EventTypes[event.type].color}`}>
    <h3 className="font-semibold">{event.name}</h3>
    <p className="text-sm mt-1">
      {event.date 
        ? new Date(event.date).toLocaleDateString()
        : `${new Date(event.startDate!).toLocaleDateString()} - ${new Date(event.endDate!).toLocaleDateString()}`
      }
    </p>
    <p className="text-xs mt-1 opacity-75">{EventTypes[event.type].label}</p>
  </div>
);

interface EventsTodayProps {
  events: Event[];
  currentDate: Date;
}

const EventsToday: React.FC<EventsTodayProps> = ({ events, currentDate }) => {
  const todayEvents = events.filter(event => {
    if (event.date) {
      return new Date(event.date).toDateString() === currentDate.toDateString();
    }
    const startDate = new Date(event.startDate!);
    const endDate = new Date(event.endDate!);
    return currentDate >= startDate && currentDate <= endDate;
  });

  if (todayEvents.length === 0) return null;

  return (
    <div className="mb-6 p-4 bg-gray-50/80 rounded-lg border border-gray-100">
      <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
        <Clock className="w-5 h-5" />
        Events Today
      </h2>
      <div className="space-y-3">
        {todayEvents.map(event => (
          <EventCard key={event.id} event={event} />
        ))}
      </div>
    </div>
  );
};

export { EventCard, EventsToday };