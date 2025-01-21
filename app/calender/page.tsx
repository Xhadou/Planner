"use client";

import React, { useState, useRef, useEffect, useCallback } from 'react';
import { Calendar as CalendarIcon, Plus, X, Clock } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select } from '@/components/ui/select';

interface EventType {
  label: string;
  color: string;
  legendColor: string;
}

interface Event {
  id: number;
  name: string;
  date?: string;
  startDate?: string;
  endDate?: string;
  type: string;
}

const eventTypes: Record<string, EventType> = {
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

const initialEvents: Event[] = [
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

const EventCard: React.FC<{ event: Event }> = ({ event }) => (
  <div className={`p-4 rounded-lg border transition-colors ${eventTypes[event.type].color}`}>
    <h3 className="font-semibold">{event.name}</h3>
    <p className="text-sm mt-1">
      {event.date 
        ? new Date(event.date).toLocaleDateString()
        : `${new Date(event.startDate!).toLocaleDateString()} - ${new Date(event.endDate!).toLocaleDateString()}`
      }
    </p>
    <p className="text-xs mt-1 opacity-75">{eventTypes[event.type].label}</p>
  </div>
);

interface AddEventModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (event: Event) => void;
}

const AddEventModal: React.FC<AddEventModalProps> = ({ isOpen, onClose, onAdd }) => {
  const [isDuration, setIsDuration] = useState(false);
  const [eventName, setEventName] = useState('');
  const [date, setDate] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [eventType, setEventType] = useState('white');
  const [isClosing, setIsClosing] = useState(false);
  const [isOpening, setIsOpening] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      setIsOpening(true);
      const timer = setTimeout(() => setIsOpening(false), 300);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  const handleClose = useCallback(() => {
    setIsClosing(true);
    setTimeout(() => {
      setIsClosing(false);
      onClose();
      // Reset form
      setEventName('');
      setDate('');
      setStartDate('');
      setEndDate('');
      setEventType('white');
      setIsDuration(false);
    }, 300);
  }, [onClose]);

  const handleClickOutside = useCallback((event: MouseEvent) => {
    if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
      handleClose();
    }
  }, [handleClose]);

  useEffect(() => {
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, handleClickOutside]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newEvent: Event = {
      id: Date.now(),
      name: eventName,
      type: eventType,
      ...(isDuration ? { startDate, endDate } : { date })
    };
    onAdd(newEvent);
    handleClose();
  };

  if (!isOpen) return null;

  return (
    <div 
      className={`fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50 transition-all duration-300
        ${isClosing ? 'opacity-0' : 'opacity-100'}
        ${isOpening ? 'scale-95 opacity-0' : 'scale-100 opacity-100'}`}
    >
      <div 
        ref={modalRef}
        className={`bg-white rounded-xl p-6 w-full max-w-md shadow-lg transition-all duration-300
          ${isClosing ? 'scale-95 opacity-0' : 'scale-100 opacity-100'}
          ${isOpening ? 'scale-95 opacity-0' : 'scale-100 opacity-100'}
          transform motion-reduce:transition-none`}
      >
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold text-gray-900">Add New Event</h2>
          <button 
            onClick={handleClose}
            className="text-gray-500 hover:text-gray-700 transition-colors p-1 hover:bg-gray-100 rounded-full"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Event Name
            </label>
            <Input
              value={eventName}
              onChange={(e) => setEventName(e.target.value)}
              className="w-full"
              required
            />
          </div>

          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={isDuration}
              onChange={(e) => setIsDuration(e.target.checked)}
              id="isDuration"
              className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
            />
            <label htmlFor="isDuration" className="text-sm text-gray-700">
              Duration Event
            </label>
          </div>

          {isDuration ? (
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Start Date
                </label>
                <Input
                  type="date"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  End Date
                </label>
                <Input
                  type="date"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                  required
                />
              </div>
            </div>
          ) : (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Date
              </label>
              <Input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                required
              />
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Event Type
            </label>
            <Select
              value={eventType}
              onChange={(e) => setEventType(e.target.value)}
              className="w-full"
            >
              {Object.entries(eventTypes).map(([key, { label }]) => (
                <option key={key} value={key}>{label}</option>
              ))}
            </Select>
          </div>

          <Button type="submit" className="w-full">
            Add Event
          </Button>
        </form>
      </div>
    </div>
  );
};

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

const Legend: React.FC = () => (
  <div className="mt-6 p-4 bg-gray-50/80 rounded-lg border border-gray-100">
    <h3 className="font-semibold mb-3 text-gray-900">Legend</h3>
    <div className="grid grid-cols-2 gap-3">
      {Object.entries(eventTypes).map(([key, { label, legendColor }]) => (
        <div key={key} className="flex items-center gap-2">
          <div className={`w-5 h-5 rounded ${legendColor}`}></div>
          <span className="text-sm text-gray-700">{label}</span>
        </div>
      ))}
    </div>
  </div>
);

const AcademicCalendar: React.FC = () => {
  const [events, setEvents] = useState<Event[]>(initialEvents);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [currentDate] = useState(new Date());
  const [selectedMonth, setSelectedMonth] = useState(currentDate.getMonth());
  const [selectedYear] = useState(currentDate.getFullYear());

  const months = ['January', 'February', 'March', 'April', 'May'];

  const getMonthEvents = useCallback(() => {
    return events.filter(event => {
      if (event.date) {
        const eventDate = new Date(event.date);
        return eventDate.getMonth() === selectedMonth && 
               eventDate.getFullYear() === selectedYear &&
               eventDate >= currentDate;
      } else {
        const startDate = new Date(event.startDate!);
        const endDate = new Date(event.endDate!);
        
        // Check if the event spans the selected month
        const monthStart = new Date(selectedYear, selectedMonth, 1);
        const monthEnd = new Date(selectedYear, selectedMonth + 1, 0);
        
        return (
          // Event starts before or during the selected month AND ends after or during the selected month
          (startDate <= monthEnd && endDate >= monthStart) &&
          // Event hasn't completely passed
          endDate >= currentDate
        );
      }
    });
  }, [events, selectedMonth, selectedYear, currentDate]);

  return (
    <div className="min-h-screen bg-gray-50 w-full">
      <div className="w-full max-w-4xl mx-auto p-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
            <CardTitle className="text-2xl font-bold flex items-center gap-2">
              <CalendarIcon className="w-6 h-6" />
              Academic Calendar Spring 2025
            </CardTitle>
            <Button onClick={() => setIsAddModalOpen(true)} variant="outline">
              <Plus className="w-4 h-4 mr-2" />
              Add Event
            </Button>
          </CardHeader>
          <CardContent>
            <EventsToday events={events} currentDate={currentDate} />
            
            <div className="mb-6">
              <div className="flex gap-2 mb-6 flex-wrap">
                {months.map((month, index) => (
                  <button
                    key={month}
                    onClick={() => setSelectedMonth(index)}
                    className={`px-4 py-2 rounded-lg transition-all ${
                      selectedMonth === index
                        ? 'bg-blue-500 text-white'
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                  >
                    {month}
                  </button>
                ))}
              </div>
              
              <div className="grid gap-4">
                {getMonthEvents().map(event => (
                  <EventCard key={event.id} event={event} />
                ))}
              </div>
            </div>

            <Legend />
          </CardContent>
        </Card>

        <AddEventModal
          isOpen={isAddModalOpen}
          onClose={() => setIsAddModalOpen(false)}
          onAdd={(newEvent) => setEvents([...events, newEvent])}
        />
      </div>
    </div>
  );
};

export { EventsToday };
export default AcademicCalendar;
