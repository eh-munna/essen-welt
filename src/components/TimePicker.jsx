import { Button } from '@/components/ui/button';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { cn } from '@/lib/utils';
import { Clock } from 'lucide-react';
import PropTypes from 'prop-types';
import { useState } from 'react';
import { ScrollArea } from './ui/scroll-area';

const times = Array.from({ length: 24 }, (_, hour) =>
  ['00', '15', '30', '45'].map(
    (min) => `${String(hour).padStart(2, '0')}:${min}`
  )
).flat();

export const TimePicker = ({ value, onChange, timeInstruction }) => {
  const [open, setOpen] = useState(false);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className={cn(
            `w-full flex justify-between border-gray-300 shadow-sm focus:ring-[#2D6A4F] focus:border-[#2D6A4F] h-12 md:h-14 mt-0`,
            {
              'text-gray-900': value,
              'text-gray-400': !value,
            }
          )}
        >
          {value || timeInstruction}
          <Clock className="ml-auto h-4 w-4 opacity-50" />{' '}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-32 p-0">
        <ScrollArea className="h-48">
          {times.map((time) => (
            <Button
              key={time}
              variant="ghost"
              className={cn('w-full', value === time && 'bg-gray-200')}
              onClick={() => {
                onChange(time);
                setOpen(false);
              }}
            >
              {time}
            </Button>
          ))}
        </ScrollArea>
      </PopoverContent>
    </Popover>
  );
};

TimePicker.propTypes = {
  value: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  timeInstruction: PropTypes.string,
};
