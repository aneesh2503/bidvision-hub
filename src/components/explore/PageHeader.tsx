
import React from 'react';

interface PageHeaderProps {
  title: string;
  description: string;
}

const PageHeader = ({ title, description }: PageHeaderProps) => {
  return (
    <div className="max-w-2xl mx-auto text-center mb-10">
      <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-3">
        {title}
      </h1>
      <p className="text-muted-foreground">
        {description}
      </p>
    </div>
  );
};

export default PageHeader;
