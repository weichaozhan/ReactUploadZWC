import React from 'react';

export interface IDemoCxt {
  hashActive?: string;
}

export const DemoCxt = React.createContext<IDemoCxt>({
  hashActive: ''
});