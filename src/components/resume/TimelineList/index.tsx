import { FC } from 'react';
import { ExperienceInfo } from '@/types/resume';
import TimelineListTitle from './TimelineListTitle';
import TimelineListItem from './TimelineListItem';

interface TimelineListProps {
  title: string;
  data: Record<string, ExperienceInfo>;
  nameMap?: Record<string, string>;
  compact?: boolean;
}

const TimelineList: FC<TimelineListProps> = ({
  title,
  data,
  nameMap,
  compact,
}) => {
  return (
    <div
      className={compact ? 'flex flex-col print:break-inside-avoid' : ''}
    >
      <TimelineListTitle compact={compact}>{title}</TimelineListTitle>
      {Object.entries(data).map(([key, info], index, array) => {
        const displayTitle = nameMap ? nameMap[key] || key : key;
        const isFirst = index === 0;
        const isLast = index === array.length - 1;
        return (
          <TimelineListItem
            key={key}
            title={displayTitle}
            info={info}
            compact={compact}
            isFirst={isFirst}
            isLast={isLast}
          />
        );
      })}
    </div>
  );
};

export default TimelineList;
