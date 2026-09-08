import React from 'react';
import { Edit3 } from 'lucide-react';
import { useCms } from '../../context/CmsContext';
import { useCommerce } from '../../context/CommerceContext';
import { CmsEditorTarget } from '../../types/cms';

interface EditableTextProps {
  target: CmsEditorTarget;
  children: React.ReactNode;
  label?: string;
  className?: string;
  inline?: boolean;
}

export const EditableText: React.FC<EditableTextProps> = ({
  target,
  children,
  label = 'Edit Text',
  className = '',
  inline = false,
}) => {
  const { isCmsInPlaceMode, openCmsEditor } = useCms();
  const { isAdminLoggedIn } = useCommerce();

  // If not logged in as admin or not in In-Place CMS mode, render directly without wrapper artifacts
  if (!isAdminLoggedIn || !isCmsInPlaceMode) {
    return <>{children}</>;
  }

  const Tag = inline ? 'span' : 'div';

  return (
    <Tag
      onClick={(e) => {
        e.stopPropagation();
        openCmsEditor(target);
      }}
      className={`relative group/cms cursor-pointer transition-all outline-1 outline-dashed outline-amber-400/60 hover:outline-amber-500 hover:bg-amber-400/5 rounded-xs ${className}`}
      title={`Click to edit: ${label}`}
    >
      {children}
      <span className="absolute -top-2.5 -right-2 opacity-0 group-hover/cms:opacity-100 transition-opacity z-30 inline-flex items-center gap-1 px-1.5 py-0.5 rounded-full bg-stone-900 text-amber-300 border border-amber-400 text-[10px] font-mono shadow-md pointer-events-none whitespace-nowrap">
        <Edit3 className="w-2.5 h-2.5 text-amber-400" />
        <span>{label}</span>
      </span>
    </Tag>
  );
};
