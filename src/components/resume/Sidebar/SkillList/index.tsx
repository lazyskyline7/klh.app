import type { SkillLevel } from '@/types/resume';
import { FC } from 'react';
import SkillTag from './SkillTag';

const SKILL_LEVEL_MAP: Record<SkillLevel, string> = {
  proficiency: 'Proficient in',
  familiar: 'Familiar with',
  knowledge: 'Knowledge of',
} as const;

interface SkillListProps {
  level: SkillLevel;
  skills: string[];
}
const SkillList: FC<SkillListProps> = ({ level, skills }) => (
  <div className="flex-1 break-inside-avoid">
    <div className="mb-2 text-sm font-semibold text-slate-700 capitalize dark:text-slate-200 print:text-xs print:font-bold print:text-slate-600">
      {SKILL_LEVEL_MAP[level]}
    </div>
    <div className="flex flex-wrap gap-1.5 print:gap-1">
      {skills.map((skill, i) => (
        <SkillTag key={i} level={level} skill={skill} />
      ))}
    </div>
  </div>
);

export default SkillList;
