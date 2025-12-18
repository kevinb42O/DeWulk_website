
import React from 'react';

export interface Offering {
  id: string;
  title: string;
  icon: React.ReactNode;
  description: string;
}

export interface GalleryItem {
  id: number;
  url: string;
  alt: string;
}

export interface OpeningHour {
  day: string;
  hours: string;
}

export interface MenuItem {
  name: string;
  price: string;
  unit?: string;
}

export interface MenuCategory {
  title: string;
  items: MenuItem[];
}
