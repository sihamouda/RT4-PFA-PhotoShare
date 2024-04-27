import React from 'react'

interface ButtonProps {
  label: string;
  icon?: string; // Optional icon to display next to the label
  onClick: () => void;
}

export const Interaction: React.FC<ButtonProps> = ({ label, icon, onClick })=> {
  return (
    <button type="button" className="like-button" onClick={onClick}>
      {icon && <span className="like-button__icon">{icon}</span>}
      {label}
    </button>
  );
}
