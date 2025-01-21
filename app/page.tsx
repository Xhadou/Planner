"use client";

import React, { useState, useEffect } from 'react';
import { Calendar, Clock, CalendarDays } from 'lucide-react';
import { Button } from '@/components/ui/button';
import AcademicCalendar from '@/app/calender/page';
import { EventsToday } from '@/app/calender/page';
import { initialEvents } from '@/constants/events';

// Define interfaces at the top level
interface ClassData {
  course: string;
  code: string;
  type: string;
  time: string;
  location: string;
  color: string;
}

interface ScheduleData {
  [key: string]: ClassData[];
}

interface ClassCardProps {
  class_: ClassData;
  currentTime: Date;
  isOngoing: boolean;
  showTimeStatus?: boolean;
}

const scheduleData: ScheduleData = {
  Monday: [
    { 
      course: "Cloud Computing",
      code: "CSD462",
      type: "Lecture",
      time: "10:00AM-11:00AM",
      location: "D022",
      color: "bg-purple-100 border-purple-300"
    },
    {
      course: "Cloud Computing",
      code: "CSD462",
      type: "Practicum",
      time: "3:00PM-5:00PM",
      location: "D313",
      color: "bg-purple-100 border-purple-300"
    }
  ],
  Tuesday: [
    {
      course: "Reinforcement Learning",
      code: "CSD336",
      type: "Lecture",
      time: "9:00AM-10:30AM",
      location: "B016",
      color: "bg-yellow-100 border-yellow-300"
    },
    {
      course: "Theory of Computation",
      code: "CSD334",
      type: "Lecture",
      time: "10:30AM-12:00PM",
      location: "B108",
      color: "bg-green-100 border-green-300"
    },
    {
      course: "Leadership Principles and Practices",
      code: "OHM301",
      type: "Practical",
      time: "12:00PM-1:00PM",
      location: "B012",
      color: "bg-teal-100 border-teal-300"
    },
    {
      course: "Information Security",
      code: "CSD356",
      type: "Lecture",
      time: "2:00PM-3:30PM",
      location: "C309",
      color: "bg-gray-100 border-gray-300"
    },
    {
      course: "Software Engineering",
      code: "CSD326",
      type: "Lecture",
      time: "3:30PM-5:00PM",
      location: "B016",
      color: "bg-pink-100 border-pink-300"
    }
  ],
  Wednesday: [
    {
      course: "Cloud Computing",
      code: "CSD462",
      type: "Lecture",
      time: "10:00AM-11:00AM",
      location: "D022",
      color: "bg-purple-100 border-purple-300"
    },
    {
      course: "Social Networks",
      code: "CSD363",
      type: "Practicum",
      time: "3:00PM-5:00PM",
      location: "C309",
      color: "bg-cyan-100 border-cyan-300"
    },
    {
      course: "Reinforcement Learning",
      code: "CSD336",
      type: "Tutorial",
      time: "5:00PM-6:00PM",
      location: "D202",
      color: "bg-yellow-100 border-yellow-300"
    }
  ],
  Thursday: [
    {
      course: "Reinforcement Learning",
      code: "CSD336",
      type: "Lecture",
      time: "9:00AM-10:30AM",
      location: "B016",
      color: "bg-yellow-100 border-yellow-300"
    },
    {
      course: "Theory of Computation",
      code: "CSD334",
      type: "Lecture",
      time: "10:30AM-12:00PM",
      location: "B108",
      color: "bg-green-100 border-green-300"
    },
    {
      course: "Information Security",
      code: "CSD356",
      type: "Lecture",
      time: "2:00PM-3:30PM",
      location: "C309",
      color: "bg-gray-100 border-gray-300"
    },
    {
      course: "Software Engineering",
      code: "CSD326",
      type: "Lecture",
      time: "3:30PM-5:00PM",
      location: "B016",
      color: "bg-pink-100 border-pink-300"
    }
  ],
  Friday: [
    {
      course: "Social Networks",
      code: "CSD363",
      type: "Lecture",
      time: "9:00AM-11:00AM",
      location: "C309",
      color: "bg-cyan-100 border-cyan-300"
    },
    {
      course: "Leadership Principles and Practices",
      code: "OHM301",
      type: "Lecture",
      time: "1:00PM-3:00PM",
      location: "D022",
      color: "bg-teal-100 border-teal-300"
    },
    {
      course: "Software Engineering",
      code: "CSD326",
      type: "Practicum",
      time: "3:00PM-5:00PM",
      location: "D317",
      color: "bg-pink-100 border-pink-300"
    }
  ]
};

const parseTime = (timeStr: string): number => {
  const [time, modifier] = timeStr.split(/(?=[AP]M)/);
  let [hours, minutes] = time.split(':');
  let hoursNum = parseInt(hours);
  if (modifier === 'PM' && hoursNum < 12) hoursNum += 12;
  if (modifier === 'AM' && hoursNum === 12) hoursNum = 0;
  return hoursNum * 60 + parseInt(minutes);
};

const formatTime = (date: Date): string => {
  return date.toLocaleTimeString('en-US', { 
    hour: 'numeric', 
    minute: '2-digit', 
    hour12: true 
  });
};

const getTimeStatus = (class_: ClassData, currentMinutes: number): string => {
  const [startTime, endTime] = class_.time.split('-');
  const startMinutes = parseTime(startTime);
  const endMinutes = parseTime(endTime);
  
  if (currentMinutes >= startMinutes && currentMinutes <= endMinutes) {
    const remainingMinutes = endMinutes - currentMinutes;
    const hours = Math.floor(remainingMinutes / 60);
    const minutes = remainingMinutes % 60;
    return `Ends in ${hours > 0 ? `${hours}h ` : ''}${minutes}m`;
  } else if (currentMinutes < startMinutes) {
    const waitMinutes = startMinutes - currentMinutes;
    const hours = Math.floor(waitMinutes / 60);
    const minutes = waitMinutes % 60;
    return `Starts in ${hours > 0 ? `${hours}h ` : ''}${minutes}m`;
  }
  return '';
};

const ClassCard: React.FC<ClassCardProps> = ({ 
  class_, 
  currentTime, 
  isOngoing, 
  showTimeStatus = false 
}) => {
  const currentMinutes = currentTime.getHours() * 60 + currentTime.getMinutes();
  const timeStatus = showTimeStatus ? getTimeStatus(class_, currentMinutes) : '';

  return (
    <div className={`p-3 md:p-4 rounded-lg border-l-4 ${class_.color} transition-all hover:shadow-md`}>
      <div className="flex flex-col sm:flex-row justify-between items-start gap-2">
        <div className="w-full sm:w-auto">
          <h2 className="text-base md:text-lg font-semibold text-gray-800 flex flex-wrap items-center gap-2">
            <span className="break-words">{class_.course}</span>
            {isOngoing && (
              <span className="bg-green-500 text-white text-xs px-2 py-1 rounded-full whitespace-nowrap">
                In Progress
              </span>
            )}
          </h2>
          <p className="text-xs md:text-sm text-gray-600 mb-1">
            {class_.code} • {class_.type}
          </p>
          {showTimeStatus && timeStatus && (
            <p className="text-xs md:text-sm font-medium text-blue-600">
              {timeStatus}
            </p>
          )}
        </div>
        <div className="text-left sm:text-right w-full sm:w-auto">
          <p className="text-xs md:text-sm font-medium text-gray-700">{class_.time}</p>
          <p className="text-xs md:text-sm text-gray-600">Room {class_.location}</p>
        </div>
      </div>
    </div>
  );
};

const DailySchedule: React.FC = () => {
  const getCurrentDay = () => {
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const currentDay = days[new Date().getDay()];
    return scheduleData[currentDay] ? currentDay : 'Monday';
  };

  const [showCalendar, setShowCalendar] = useState(false);
  const [selectedDay, setSelectedDay] = useState(getCurrentDay());
  const [currentTime, setCurrentTime] = useState(new Date());
  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 30000);

    return () => clearInterval(timer);
  }, []);

  const getCurrentClasses = () => {
    const today = getCurrentDay();
    if (!scheduleData[today]) return { ongoing: [], upcoming: [] };

    const currentMinutes = currentTime.getHours() * 60 + currentTime.getMinutes();
    
    const classified = scheduleData[today].reduce((acc: { ongoing: ClassData[]; upcoming: ClassData[] }, class_) => {
      const [startTime, endTime] = class_.time.split('-');
      const startMinutes = parseTime(startTime);
      const endMinutes = parseTime(endTime);

      if (currentMinutes >= startMinutes && currentMinutes <= endMinutes) {
        acc.ongoing.push(class_);
      } else if (currentMinutes < startMinutes) {
        acc.upcoming.push(class_);
      }
      return acc;
    }, { ongoing: [], upcoming: [] });

    classified.upcoming.sort((a, b) => parseTime(a.time.split('-')[0]) - parseTime(b.time.split('-')[0]));
    return classified;
  };

  const { ongoing, upcoming } = getCurrentClasses();

  return (
    <div className="min-h-screen bg-gray-50 w-full">
      <div className="w-full max-w-4xl mx-auto p-3 md:p-6">
        <div className="bg-white rounded-lg shadow-lg p-4 md:p-6">
          <div className="mb-4 flex justify-end">
            <Button
              onClick={() => setShowCalendar(!showCalendar)}
              className="flex items-center gap-2"
            >
              <CalendarDays className="w-4 h-4" />
              {showCalendar ? 'Show Schedule' : 'Show Calendar'}
            </Button>
          </div>
  
          {showCalendar ? (
            <AcademicCalendar />
          ) : (
            <>
              <div className="mb-6 md:mb-8 p-3 md:p-4 bg-gray-50 rounded-lg">
                <h2 className="text-xl md:text-2xl font-bold text-gray-800 mb-4 flex flex-wrap items-center gap-2">
                  <Clock className="w-5 h-5 md:w-6 md:h-6 flex-shrink-0" />
                  <span className="w-full sm:w-auto">
                    Today • {currentTime.toLocaleDateString()}
                  </span>
                  <span className="text-lg md:text-xl">
                    {formatTime(currentTime)}
                  </span>
                </h2>
  
                <EventsToday 
                  events={initialEvents} 
                  currentDate={currentTime} 
                />
                
                <div className="mb-4 md:mb-6">
                  <h3 className="text-base md:text-lg font-semibold text-gray-700 mb-3 flex items-center">
                    <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                    Ongoing Classes
                  </h3>
                  <div className="space-y-2 md:space-y-3">
                    {ongoing.length > 0 ? (
                      ongoing.map((class_, index) => (
                        <ClassCard 
                          key={index} 
                          class_={class_} 
                          currentTime={currentTime}
                          isOngoing={true}
                          showTimeStatus={true}
                        />
                      ))
                    ) : (
                      <p className="text-sm md:text-base text-gray-500">No ongoing classes</p>
                    )}
                  </div>
                </div>
  
                <div>
                  <h3 className="text-base md:text-lg font-semibold text-gray-700 mb-3 flex items-center">
                    <div className="w-2 h-2 bg-blue-500 rounded-full mr-2"></div>
                    Upcoming Classes
                  </h3>
                  <div className="space-y-2 md:space-y-3">
                    {upcoming.length > 0 ? (
                      upcoming.map((class_, index) => (
                        <ClassCard 
                          key={index} 
                          class_={class_} 
                          currentTime={currentTime}
                          isOngoing={false}
                          showTimeStatus={true}
                        />
                      ))
                    ) : (
                      <p className="text-sm md:text-base text-gray-500">No more classes today</p>
                    )}
                  </div>
                </div>
              </div>
  
              <div className="mb-6 md:mb-8">
                <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4 flex flex-wrap items-center gap-2">
                  <Calendar className="w-6 h-6 md:w-8 md:h-8 flex-shrink-0" />
                  <span className="break-words">Spring 2025 Schedule</span>
                </h1>
                <div className="flex flex-wrap gap-2">
                  {days.map((day) => (
                    <button
                      key={day}
                      onClick={() => setSelectedDay(day)}
                      className={`px-3 md:px-4 py-2 rounded-lg transition-all text-sm md:text-base ${
                        selectedDay === day
                          ? 'bg-blue-500 text-white'
                          : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                      }`}
                    >
                      {day}
                    </button>
                  ))}
                </div>
              </div>
  
              <div className="space-y-2 md:space-y-4">
                {scheduleData[selectedDay]?.map((class_, index) => (
                  <ClassCard 
                    key={index} 
                    class_={class_} 
                    currentTime={currentTime}
                    isOngoing={false}
                    showTimeStatus={false}
                  />
                ))}
                
                {scheduleData[selectedDay]?.length === 0 && (
                  <div className="text-center py-6 md:py-8 text-sm md:text-base text-gray-500">
                    No classes scheduled for {selectedDay}
                  </div>
                )}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default DailySchedule;
